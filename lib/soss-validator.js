#!/usr/bin/env node
/**
 * SoSS+ Validator - Validates RO-Crates against SoSS+ profiles
 * 
 * This validator follows the SoSS+ validation algorithm to check if a target crate
 * conforms to a SoSS+ profile.
 */

const fs = require('fs');
const { range } = require('lodash');
const path = require('path');
const { ROCrate } = require('ro-crate');

class SossValidator {
  constructor(profileCratePathOrObject) {
    this.profileCrate = null;
    this.profileCratePath = null;
    this.clearResults()
     // Keep track of entities we've already validated to avoid circular validation
    this.validatedEntities = {}; // Will hold the validated entities and the rules they have been tested against already
    this.rulesDone = new Set();

    // Configure logging level - can be set to false to disable or true for verbose
    this.verbose = true;

    // Handle both path string or direct ROCrate object
    if (typeof profileCratePathOrObject === 'string') {
      this.profileCratePath = profileCratePathOrObject;
    } else if (profileCratePathOrObject instanceof ROCrate) {
      this.profileCrate = profileCratePathOrObject;
      console.log('SoSS+ profile loaded from provided object');
    } else {
      throw new Error('Profile must be a path to a crate file or an ROCrate object');
    }
  }

  clearResults() {
    this.results = {
        error: [],
        warning: [],
        info: []
      };
}

  /**
   * Helper method for logging with different verbosity levels
   * @param {string} message - Message to log
   * @param {string} level - Log level (debug, info, warn, error)
   */
  log(message, level = 'info') {
    if (!this.verbose) return;
    
    const prefix = level === 'debug' ? '🔍 DEBUG:' : 
                   level === 'info' ? '📋 INFO:' : 
                   level === 'warn' ? '⚠️ WARNING:' : 
                   level === 'error' ? '❌ ERROR:' : '';
    
    console.log(`${prefix} ${message}`);
  }

  /**
   * Load the SoSS+ profile crate from path if not already loaded
   */
  loadProfileCrate() {
    // If already loaded, return true
    if (this.profileCrate) {
      return true;
    }

    try {
      console.log(`Loading SoSS+ profile from: ${this.profileCratePath}`);
      const crateData = fs.readFileSync(this.profileCratePath, 'utf8');
      const crateJson = JSON.parse(crateData);
      this.profileCrate = new ROCrate(crateJson, { array: true, link: true });
      console.log('SoSS+ profile loaded successfully');
      return true;
    } catch (error) {
      console.error(`Error loading SoSS+ profile: ${error.message}`);
      return false;
    }
  }

  /**
   * Validate a target crate against the SoSS+ profile
   * @param {ROCrate|string} targetCrate - The target crate object or path to validate
   */
  async validateCrate(targetCrate) {
    this.targetCrate = targetCrate;
    await this.targetCrate.resolveContext()
    try {
      let crate;
      
      // Handle different input types
      if (typeof targetCrate === 'string') {
        // If a string is provided, treat as a file path
        console.log(`Loading target crate from path: ${targetCrate}`);
        const targetData = fs.readFileSync(targetCrate, 'utf8');
        const targetJson = JSON.parse(targetData);
        crate = new ROCrate(targetJson, { array: true, link: true });
        console.log('Target crate loaded successfully from path');
      } else if (targetCrate instanceof ROCrate) {
        // If an ROCrate object is provided, use it directly
        crate = targetCrate;
        console.log('Using provided target crate object');
      } else {
        throw new Error('Target crate must be a path or an ROCrate object');
      }

      // Ensure the profile crate is loaded
      if (!this.profileCrate && !this.loadProfileCrate()) {
        throw new Error('Failed to load profile crate');
      }

      // Reset validation state
      this.validatedEntities = {};
      this.rulesDone.clear();
      this.clearResults();
      
      // Validate the target crate against the SoSS+ profile
      this.validateTargetCrateGraph(crate);

      return this.results;
    } catch (error) {
      console.error(`Validation error: ${error.message}`);
      this.addResult('error', `Validation failed: ${error.message}`);
      return this.results;
    }
  }

  /**
   * Validate the target crate graph against the SoSS+ profile
   * @param {ROCrate} targetCrate - The target crate to validate
   */
  validateTargetCrateGraph(targetCrate) {
    // Get all entities in the profile crate
    const profileEntities = this.profileCrate.getGraph();
    
    // Find all class rules (rdfs:Class entities) in the profile
    const classRules = profileEntities.filter(entity => 
      entity['@type'] && 
      (Array.isArray(entity['@type']) ? 
        entity['@type'].includes('rdfs:Class') : 
        entity['@type'] === 'rdfs:Class')
    );

    // Create a lookup table for class rules by ID for easier access
    this.classRulesById = {};

   

    this.log(`Found ${classRules.length} class rules in the SoSS+ profile`);
    
    // Build some lookups 
    classRules.forEach(rule => {
       
     this.classRulesById[rule['@id']] = rule;

      const name = rule['rdfs:label'] || rule['name'] || rule['@id'];
      this.log(`Class Rule: ${name} (${rule['@id']})`, 'debug');
      
      if (rule['prov:specializationOf']) {
        const types = this.extractTypes(rule['prov:specializationOf']);
        rule.__resolvedTypes = [];
        for (const type of types) {
            const resolvedType = this.profileCrate.resolveTerm(type);
            this.log(`Resolved type: ${type} to ${resolvedType}`, 'debug');
            this.log(`Adding type ${resolvedType} to class rule ${name}`, 'debug');
            rule.__resolvedTypes.push(resolvedType);
        }
      }
      
      if (rule['sh:minCount'] || rule['sh:maxCount']) {
        this.log(`   Count constraints: min=${rule['sh:minCount'] || 'none'}, max=${rule['sh:maxCount'] || 'none'}`, 'debug');
      }


    });


    // Process all class rules
    for (const classRule of classRules) {
      const ruleName = classRule['rdfs:label'] || classRule['name'] || classRule['@id'];
      this.log(`Processing class rule: ${ruleName}`, 'info');

      
      if (!classRule.__resolvedTypes || classRule.__resolvedTypes.length === 0) {
        this.log(`Class rule ${classRule['@id']} does not specify any types via prov:specializationOf`, 'warn');
        this.addResult('warning', `Class rule ${classRule['@id']} does not specify any types via prov:specializationOf`);
        continue;
      }

      // Count how many entities in the target crate match these types
      let classMatches = 0;
      this.log(`Looking for entities with types: ${classRule.__resolvedTypes.join(', ')}`, 'debug');
      
      // For each entity in the target crate, validate against the types
      for (const t1 of targetCrate.getGraph()) {
        const entityId = t1['@id'];
        const entityTypes = t1['@type'];
        
        this.log(`Examining entity: ${entityId} with types: ${entityTypes.join(', ')}`, 'debug');
        
        if (this.validateEntityTypes(t1, classRule.__resolvedTypes)) {
          
          this.log(`Entity ${entityId} matches required types ${classRule.__resolvedTypes.join(', ')}`, 'info');
          
          // This entity matches the required types, validate it against the class rule
          const entityValid = this.validateEntity(t1, classRule)
          if (entityValid === true) {
            classMatches++;
            this.log(`Entity ${entityId} is valid for class rule ${ruleName}`, 'info');
          } else if (entityValid === false) {
            this.log(`Entity ${entityId} failed validation for class rule ${ruleName}`, 'warn');
          } else {
            this.log(`Entity ${entityId} has already been validated against class rule ${ruleName}`, 'debug');
          }
        } else {
          this.log(`Entity ${entityId} does not match types ${classRule.__resolvedTypes.join(', ')}`, 'debug');
        }
      }

      // Check if the number of matches is within the required range
      const minCount = classRule['sh:minCount'] ? parseInt(classRule['sh:minCount']) : 0;
      const maxCount = classRule['sh:maxCount'] ? parseInt(classRule['sh.maxCount']) : Number.MAX_SAFE_INTEGER;

      this.log(`Found ${classMatches} matches for class rule ${ruleName} (min: ${minCount}, max: ${maxCount || 'unlimited'})`, 'info');

      if (classMatches < minCount) {
        this.log(`Expected at least ${minCount} instances of ${ruleName} :  ${classRule.__resolvedTypes.join(', ')}, found ${classMatches}`, 'error');
        this.addResult('error', `Expected at least ${minCount} instances of ${ruleName} :  ${classRule.__resolvedTypes.join(', ')}, found ${classMatches}`);
      } else if (classMatches > maxCount) {
        this.log(`Expected at most ${maxCount} instances of ${classRule.__resolvedTypes.join(', ')}, found ${classMatches}`, 'error');
        this.addResult('error', `Expected at most ${maxCount} instances of ${classRule.__resolvedTypes.join(', ')}, found ${classMatches}`);
      } else {
        this.log(`Found ${classMatches} valid instances of ${classRule.__resolvedTypes.join(', ')}`, 'info');
        this.addResult('info', `Found ${classMatches} valid instances of ${classRule.__resolvedTypes.join(', ')}`);
      }
    }
  }

  /**
   * Extract types from specializationOf property
   * @param {Object|Array|string} specializationOf - The specializationOf property value
   * @returns {Array} Array of type strings
   */
  extractTypes(specializationOf) {
    if (!specializationOf) {
      return [];
    }

    if (Array.isArray(specializationOf)) {
      return specializationOf.map(s => typeof s === 'object' ? s['@id'] : s);
    } else if (typeof specializationOf === 'object') {
      return [specializationOf['@id']];
    } else {
      return [specializationOf];
    }
  }

 
  /**
   * Check if an entity has all the required types
   * @param {Object} entity - The entity to check
   * @param {Array} requiredTypes - Array of required type strings
   * @returns {boolean} True if entity has all required types
   */
  validateEntityTypes(entity, requiredTypes) {
    if (!entity['@type']) {
      return false;
    }

    // Get the entity types and resolve them
    const rawEntityTypes = Array.isArray(entity['@type']) ? entity['@type'] : [entity['@type']];
    const entityTypes = rawEntityTypes.map(type => {
      const resolvedType = this.targetCrate.resolveTerm(type);
      this.log(`Resolving entity type ${type} to ${resolvedType}`, 'debug');
      return resolvedType;
    });
    console.log(`Resolved entity types: ${entityTypes.join(', ')}`, 'debug');
    
    // Check if all required types are present in the resolved entity types
    return requiredTypes.every(type => {
      this.log(`Checking if entity has required type: ${type}`, 'debug');
      return entityTypes.includes(type);
    });
  }
  
  /**
   * Validate an entity against a set of class rules
   * @param {Object} entity - The entity to validate
   * @param {Array} classRules - Array of class rule entities
   * @returns {boolean} True if validation passes
   */
  validateEntity(entity, classRule) {
    // If this entity has already been validated, return true
    const entityId = entity['@id'];


    this.log(`Validating entity: ${entityId}`, 'debug');
    
    // Mark this entity as validated to avoid circular validation

    let isValid = true;

        // Check if the class rule is already validated   
     this.log(`ZZZZZ  ZZZZZ Checking if entity ${entityId} has already been validated against class rule ${classRule['@id']} -- ${this.validatedEntities[entityId]}`, 'debug');
     if (this.validatedEntities[entityId] && classRule['@id'] in this.validatedEntities[entityId]) {
        this.log(`Entity ${entityId} has ***** ALREADY ******* been validated against class rule ${classRule['@id']}`, 'debug');
        return this.validatedEntities[entityId][classRule['@id']]

      } else {
        this.validatedEntities[entityId] = this.validatedEntities[entityId] || {};
    }


      const ruleName = classRule['rdfs:label'] || classRule['name'] || classRule['@id'];
      this.log(`Checking class rule: ${ruleName} for entity ${entityId}`, 'debug');
      
      // Check for properties that reference this class via rangeIncludes
      const propertyRules = this.findPropertyRulesForClass(classRule);
      this.log(`Found ${propertyRules.length} property rules for class ${ruleName}`, 'debug');

      for (const propertyRule of propertyRules) {
        const propName = propertyRule['http://schema.org/name'] || propertyRule['name'] || propertyRule['@id'];
        this.log(`Validating property rule: ${propName} for entity ${entityId}`, 'debug');
        
        // Validate each property rule against this entity
        if (!this.validateProperty(entity, propertyRule)) {
          isValid = false;
          this.log(`Property ${propName} validation failed for entity ${entityId}`, 'warn');
        } else {
          this.log(`Property ${propName} is valid for entity ${entityId}`, 'debug');
        }
      }
    

    this.log(`Entity ${entityId} validation result: ${isValid ? 'valid' : 'invalid'}`, 'info');
    this.validatedEntities[entityId][classRule['@id']] = isValid;

    return isValid;
  }

  /**
   * Find property rules that reference a class via rangeIncludes
   * @param {string} classId - The class ID to find property rules for
   * @returns {Array} Array of property rule entities
   */
  findPropertyRulesForClass(classRule) {
    // Check if there are @reverse domainIncludes references
    if (classRule && classRule['@reverse'] && classRule['@reverse']['domainIncludes']) {
     return classRule['@reverse']['domainIncludes'];
    }
  }

  /**
   * Validate a property rule against an entity
   * @param {Object} entity - The entity to validate
   * @param {Object} propertyRule - The property rule entity
   * @returns {boolean} True if validation passes
   */
  validateProperty(entity, propertyRule){
    // Get the property name
    const propertyName = propertyRule['http://schema.org/name'] || propertyRule['name'];
    if (!propertyName) {
      this.log(`Property rule ${propertyRule['@id']} does not have a name`, 'warn');
      this.addResult('warning', `Property rule ${propertyRule['@id']} does not have a name`);
      return false;
    }

    const entityId = entity['@id'];
    this.log(`Validating property ${propertyName} for entity ${entityId}`, 'debug');

    // Check if the property exists in the entity
    const propertyValues = entity[propertyName];
    if (!propertyValues && propertyRule['sh:minCount'] && parseInt(propertyRule['sh:minCount']) > 0) {
      this.log(`Entity ${entityId} is missing required property ${propertyName}`, 'error');
      this.addResult('error', `Entity ${entityId} is missing required property ${propertyName}`);
      return false;
    }

    // If property doesn't exist but is not required, it's valid
    if (!propertyValues) {
      this.log(`Property ${propertyName} not present in entity ${entityId} but not required`, 'debug');
      return true;
    }
    this.log(`Property ${propertyName} has ${propertyValues.length} values in entity ${entityId}`, 'debug');

    // Check min and max count constraints
    const minCount = propertyRule['sh:minCount'] ? parseInt(propertyRule['sh:minCount']) : 0;
    const maxCount = propertyRule['sh:maxCount'] ? parseInt(propertyRule['sh:maxCount']) : Number.MAX_SAFE_INTEGER;
    this.log(`Property ${propertyName} constraints: min=${minCount}, max=${maxCount || 'unlimited'}`, 'debug');

    if (propertyValues.length < minCount) {
      this.log(`Entity ${entityId} has ${propertyValues.length} values for property ${propertyName}, but at least ${minCount} are required`, 'error');
      this.addResult('error', `Entity ${entityId} has ${propertyValues.length} values for property ${propertyName}, but at least ${minCount} are required`);
      return false;
    }

    if (propertyValues.length > maxCount) {
      this.log(`Entity ${entityId} has ${propertyValues.length} values for property ${propertyName}, but at most ${maxCount} are allowed`, 'error');
      this.addResult('error', `Entity ${entityId} has ${propertyValues.length} values for property ${propertyName}, but at most ${maxCount} are allowed`);
      return false;
    }

    // Check the range constraints
    const rangeIncludes = propertyRule['http://schema.org/rangeIncludes'] || propertyRule['rangeIncludes'];
    if (!rangeIncludes) {
      // No range constraints, so it's valid
      this.log(`No range constraints for property ${propertyName}`, 'debug');
      return true;
    }

 
    // Check each value against the rang
    // e constraints
    for (const value of propertyValues) {
      this.log(`Validating value ${JSON.stringify(value)} against range constraints`, 'debug');
      if (!this.validatePropertyValue(value, rangeIncludes)) {
        this.log(`Entity ${entityId} has an invalid value for property ${propertyName}: ${JSON.stringify(value)}`, 'error');
        this.addResult('error', `Entity ${entityId} has an invalid value for property ${propertyName}`);
        return false;
      }
    }

    this.log(`Property ${propertyName} in entity ${entityId} is valid`, 'debug');
    return true;
  }

  /**
   * Validate a property value against range constraints
   * @param {any} value - The property value to validate
   * @param {Array} rangeArray - Array of range constraint entities
   * @returns {boolean} True if validation passes
   */
  validatePropertyValue(value, rangeArray) {
    // If value is an object with @id, it's a reference to another entity
     for (const range of rangeArray) {
        this.log(`Checking range constraint: ${JSON.stringify(range)}`, 'debug');
        if (typeof value === 'object' && value['@id']) {
            const valueId = value['@id'];
            this.log(`Validating reference value with @id: ${valueId}`, 'debug');
            
            // Get the referenced entity
            const referencedEntity = this.targetCrate.getEntity(valueId);
            if (referencedEntity)  {
                this.log(`Found referenced entity ${valueId} in profile crate`, 'debug');
                // Validate the referenced entity against the range -- 
                // need to loook up if there is a class rule for it
                const referencedClassRule = this.classRulesById[range['@id']];

                if (referencedClassRule) {
                    this.log(`Validating referenced entity ${valueId} against class rules`, 'debug');
                    return this.validateEntity(referencedEntity, referencedClassRule);
                } else {
                    this.log(`No class rules found for referenced entity ${valueId}`, 'warn');
                    return false;
                }

            } else {
                this.log(`Referenced entity ${valueId} not found in profile crate, assuming valid external reference`, 'debug');
                // Referenced entity not found in the profile crate
                // It might be a reference to an entity in the target crate
                // or a URL, which we consider valid
                return true;
              } 

     } else {
         // Handle primitive type checks
      const rangeId = this.targetCrate.resolveTerm(typeof range === 'object' ? range['@id'] : range);
      const valueType = typeof value;
      console.log("Range ID:", rangeId);
      if (rangeId === 'http://schema.org/Text' && valueType === 'string') {
        this.log(`Value ${value} is valid as http://schema.org/Text`, 'debug');
        return true;
      } else if (rangeId === 'http://schema.org/Number' && (valueType === 'number' || !isNaN(Number(value)))) {
        this.log(`Value ${value} is valid as http://schema.org/Number`, 'debug');
        return true;
      } else if (rangeId === 'http://schema.org/Boolean' && valueType === 'boolean') {
        this.log(`Value ${value} is valid as http://schema.org/Boolean`, 'debug');
        return true;
      } else if (rangeId === 'http://schema.org/Date' && this.isValidDate(value)) {
        this.log(`Value ${value} is valid as http://schema.org/Date`, 'debug');
        return true;
      }
    }
     }


      /*  HDING THIS CODE FOR NOW

    
    if (typeof value === 'object' && value['@id']) {
      const valueId = value['@id'];
      this.log(`Validating reference value with @id: ${valueId}`, 'debug');
      
      // Get the referenced entity
      const referencedEntity = this.profileCrate.getEntity(valueId);
      
      if (!referencedEntity) {
        this.log(`Referenced entity ${valueId} not found in profile crate, assuming valid external reference`, 'debug');
        // Referenced entity not found in the profile crate
        // It might be a reference to an entity in the target crate
        // or a URL, which we consider valid
        return true;
      } else {
        this.log(`Found referenced entity ${valueId} in profile crate`, 'debug');
        //
      }
    
      // Check if the referenced entity is a defined term list
      if (this.isDefinedTermList(referencedEntity)) {
        this.log(`Value ${valueId} references a DefinedTermSet, validating against defined terms`, 'debug');
        // Check if the value is one of the defined terms
        const isValid = this.validateAgainstDefinedTermList(value, referencedEntity);
        this.log(`Value ${valueId} validation against defined term list: ${isValid ? 'valid' : 'invalid'}`, 'debug');
        return isValid;
      }

      // Check if the referenced entity is an rdfs:Class
      if (this.isClass(referencedEntity)) {
        this.log(`Value ${valueId} references an rdfs:Class, validating recursively`, 'debug');
        // Validate the value against the class
        return this.validateEntity(value, [referencedEntity]);
      }

      this.log(`Referenced entity ${valueId} is neither a DefinedTermSet nor rdfs:Class, assuming valid`, 'debug');
      return true;
    }

    // For primitive values, check if any of the range constraints allow for the value type
    const valueType = typeof value;
    this.log(`Validating primitive value of type ${valueType}: ${value}`, 'debug');
    
    for (const range of rangeArray) {
      const rangeId = typeof range === 'object' ? range['@id'] : range;
      
     
    */

    this.log(`Value ${value} does not match any of the range constraints`, 'error');
    return false;  
}

  /**
   * Check if a string is a valid date
   * @param {string} dateString - The date string to check
   * @returns {boolean} True if string is a valid date
   */
  isValidDate(dateString) {
    if (typeof dateString !== 'string') {
      return false;
    }

    // Check for ISO 8601 date format
    // This is a simple check, can be made more robust
    return /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/.test(dateString);
  }

  /**
   * Add a validation result
   * @param {string} level - 'error', 'warning', or 'info'
   * @param {string} message - The validation message
   * @param {Object} details - Additional details
   */
  addResult(level, message, details) {
    if (!details) details = {};
    this.results[level].push({
      message,
      ...details
    });
  }
}


// Export the validator
module.exports = { SossValidator };

// If run directly from command line
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node soss-validator.js <profile-crate-path> <target-crate-path>');
    process.exit(1);
  }

  const profilePath = args[0];
  const targetPath = args[1];
  
  const validator = new SossValidator(profilePath);
  if (validator.loadProfileCrate()) {
    validator.validateCrate(targetPath)
      .then(results => {
        console.log('\nValidation complete.');
        if (results.errors.length > 0) {
          console.log(`\nErrors (${results.errors.length}):`);
          results.errors.forEach(err => console.log(`- ${err.message}`));
        }
        if (results.warnings.length > 0) {
          console.log(`\nWarnings (${results.warnings.length}):`);
          results.warnings.forEach(warn => console.log(`- ${warn.message}`));
        }
        if (results.info.length > 0) {
          console.log(`\nInfo (${results.info.length}):`);
          results.info.forEach(info => console.log(`- ${info.message}`));
        }
      })
      .catch(error => {
        console.error('Validation failed:', error);
        process.exit(1);
      });
  } else {
    console.error('Failed to load profile crate.');
    process.exit(1);
  }
}