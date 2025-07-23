#!/usr/bin/env node
/**
 * Generate documentation from a SOSS+ profile crate
 * 
 * This script loads a SOSS+ profile crate and creates a data structure
 * that can be used by a template to generate documentation.
 */

const { ROCrate } = require('ro-crate');
const fs = require('fs');
const path = require('path');
const { profile } = require('console');
const { range } = require('lodash');

// Parse command line arguments
const profilePath = process.argv[2] || path.join(__dirname, 'profiles', 'ro-crate', 'profile-crate', 'ro-crate-metadata.json');
const templatePath = process.argv[3] || path.join(__dirname, 'profiles', 'ro-crate', 'profile-text.md');
// Save the output in the same directory as the profile crate
const profileDir = path.dirname(profilePath);
const outputPath = process.argv[4] || path.join(profileDir, 'profile-documentation.md');

// Load the profile crate
console.log(`Loading SOSS+ profile from: ${profilePath}`);
try {
  const profileData = fs.readFileSync(profilePath, 'utf8');
  const profileJson = JSON.parse(profileData);
  const profileCrate = new ROCrate(profileJson, { array: true, link: true });

  // Create rules data structure for use by the template
  const rules = { 
    objects: {}, 
    all: "",  // Will contain all classes summary
    definedTermSets: {}  // Will contain DefinedTermSet documentation
  };

  // Extract classes from the profile
  const classRules = profileCrate.getGraph().filter(entity => 
    entity['@type'] && 
    (Array.isArray(entity['@type']) ? 
      entity['@type'].includes('rdfs:Class') : 
      entity['@type'] === 'rdfs:Class')
  );
  
  // Find property rules
  const propertyRules = profileCrate.getGraph().filter(entity =>
    entity['@type'] && 
    (Array.isArray(entity['@type']) ? 
      entity['@type'].includes('rdf:Property') : 
      entity['@type'] === 'rdf:Property')
  );
  
  // Find DefinedTermSet entities
  const definedTermSetEntities = profileCrate.getGraph().filter(entity =>
    entity['@type'] && 
    (Array.isArray(entity['@type']) ? 
      entity['@type'].includes('DefinedTermSet') : 
      entity['@type'] === 'DefinedTermSet')
  );

  // Find DefinedTerm entities
  const definedTermEntities = profileCrate.getGraph().filter(entity =>
    entity['@type'] && 
    (Array.isArray(entity['@type']) ? 
      entity['@type'].includes('DefinedTerm') : 
      entity['@type'] === 'DefinedTerm')
  );
  
  // Create a class hierarchy map for inheritance support
  const classHierarchy = {};
  classRules.forEach(classRule => {
    const classId = classRule['@id'];
    const superClasses = classRule['prov:specializationOf'] || [];
    const superClassesArray = Array.isArray(superClasses) ? superClasses : [superClasses];
    
    classHierarchy[classId] = {
      superClasses: superClassesArray.map(sc => typeof sc === 'object' ? sc['@id'] : sc),
      subClasses: []
    };
  });
  
  // Populate subClasses
  Object.keys(classHierarchy).forEach(classId => {
    classHierarchy[classId].superClasses.forEach(superClass => {
      if (classHierarchy[superClass]) {
        classHierarchy[superClass].subClasses.push(classId);
      }
    });
  });
  
  // Group properties by class
  const classPropMap = {};
  propertyRules.forEach(prop => {
    const domains = prop['domainIncludes'] || [];
    const domainsArray = Array.isArray(domains) ? domains : [domains];
    
    domainsArray.forEach(domain => {
      const classId = typeof domain === 'object' ? domain['@id'] : domain;
      if (!classPropMap[classId]) {
        classPropMap[classId] = [];
      }
      classPropMap[classId].push(prop);
    });
  });

  // Find the Root Data Entity class
  const rootDataEntityClass = classRules.find(rule => rule['@id'] === '#Root_Data_Entity');
  
  if (rootDataEntityClass) {
    const rootTypes = rootDataEntityClass['prov:specializationOf'] || [];
    const rootTypesArray = Array.isArray(rootTypes) ? rootTypes : [rootTypes];
    const rootTypesIds = rootTypesArray.map(t => typeof t === 'object' ? t['@id'] : t);
    
    // Store information about Dataset (Root Data Entity)
    rules.Dataset = `- MUST be of type(s): ${rootTypesIds.join(', ')}\n`;
    
    // Add additional requirements
    const rootProps = classPropMap['#Root_Data_Entity'] || [];
    if (rootProps.length > 0) {
      rules.Dataset += `- MUST include the following properties:\n`;
      
      rootProps.forEach(prop => {
        const propName = prop['name'] || prop['rdfs:label'] || prop['@id'];
        const isRequired = prop['sh:minCount'] && parseInt(prop['sh:minCount']) > 0;
        
        if (isRequired) {
          rules.Dataset += `  * ${propName}\n`;
        }
      });
    }
  }


  // Generate documentation for each DefinedTermSet
  let allDefinedTermSets = "## Defined Term Sets\n\n";
  
  definedTermSetEntities.forEach(termSet => {
    const termSetId = termSet['@id'];
    const termSetName = termSet['name'] || termSet['rdfs:label'] || termSetId;
    const termSetDesc = termSet['description'] || termSet['rdfs:comment'] || '';
    
    let termSetSummary = `### <a id="termset_${termSetId}"></a>${termSetName}\n\n`;
    termSetSummary += `${termSetDesc}\n\n`;
    
    // Add terms table if there are terms in this set
    const terms = termSet["@reverse"]?.["inDefinedTermSet"] || [];
    if (terms.length > 0) {
      termSetSummary += `| Term | Description |\n`;
      termSetSummary += `| ---- | ----------- |\n`;
      
      // Sort terms alphabetically by name
      terms.sort((a, b) => {
        const aName = String(a['name'] || a['rdfs:label'] || a['@id'] || '');
        const bName = String(b['name'] || b['rdfs:label'] || b['@id'] || '');
        return aName.localeCompare(bName);
      });
      
      terms.forEach(term => {
        const termName = term['name'] || term['rdfs:label'] || term['@id'];
        const termDesc = term['description'] || term['rdfs:comment'] || '';
        termSetSummary += `| ${termName} | ${termDesc} |\n`;
      });
    } else {
      termSetSummary += `*No terms defined for this term set*\n\n`;
    }
    
    termSetSummary += `\n`;
    
    // Add DefinedTermSet to rules structure
    rules[termSetId] = termSetSummary;
    rules.definedTermSets[termSetId] = termSetSummary;
    allDefinedTermSets += termSetSummary;
  });
  
  // Add all defined term sets summary to rules
  rules.allDefinedTermSets = allDefinedTermSets;

  // Generate class documentation
  let allClasses = "## Classes and Properties\n\n";
  
  // Create a lookup table for class IDs to their normalized names for consistent cross-references
  const classIdToNormalizedName = {};
  classRules.forEach(classRule => {
    const classId = classRule['@id'];
    const className = classRule['name'] || classRule['rdfs:label'] || classId;
    // Use class ID as basis for normalization to ensure consistency
    classIdToNormalizedName[classId] = normalizeName(classId);
  });

  // TODO __ NOOOOOO!!!!!!! need to get rid of random IDs in class names
  function normalizeName(name) {
    // Handle null, undefined, or non-string values
    if (!name || typeof name !== 'string') {
      return 'unnamed_' + Math.random().toString(36).substring(2, 7); // Generate a random ID
    }
    return name.replace(/[^a-zA-Z0-9]/g, '_');
  }
  
  // Function to get all properties for a class (including inherited)
  function getAllPropertiesForClass(classId) {
    // Start with direct properties
    let props = classPropMap[classId] || [];
    
    // Add properties from superclasses
    if (classHierarchy[classId]) {
      classHierarchy[classId].superClasses.forEach(superClass => {
        // TODO -- WE DO do inheritance if ANY class is locally defined - also this needs to be recursive
        // Check if this is a schema.org class - we don't handle inheritance from external classes
        if (!superClass.startsWith('http:')) {
          const superProps = classPropMap[superClass] || [];
          props = props.concat(superProps);
        }
      });
    }
    
    // Deduplicate properties based on name
    const seen = {};
    return props.filter(prop => {
      const propName = prop['name'] || prop['rdfs:label'] || prop['@id'];
      if (seen[propName]) return false;
      seen[propName] = true;
      return true;
    });
  }

  // Function to check if a range is a DefinedTermSet
  function isDefinedTermSetRange(rangeId) {
    return definedTermSetEntities.some(termSet => termSet['@id'] === rangeId);
  }
  
  classRules.forEach(classRule => {
    const classId = classRule['@id'];
    const className = classRule['name'] || classRule['rdfs:label'] || classId;
    const classDesc = classRule['description'] || classRule['rdfs:comment'] || '';
    const specialized = classRule['prov:specializationOf'] || [];
    
    // Use the consistent ID for this class
    const normalizedClassName = classIdToNormalizedName[classId];
    
    let classSummary = `### <a id="${normalizedClassName}"></a>${className}\n\n`;
    classSummary += `${classDesc}\n\n`;
    
    if (specialized) {
      const specializedArray = Array.isArray(specialized) ? specialized : [specialized];
      const specializedStr = specializedArray.map(s => 
        typeof s === 'object' ? s['@id'] : s).join(', ');
      classSummary += `Specialization of: ${specializedStr}\n\n`;
    }
    
    // Get all properties for this class, including inherited ones
    const props = getAllPropertiesForClass(classId);
    
    if (props.length > 0) {
      classSummary += `| Property | Required | Description | Range | Value |\n`;
      classSummary += `| -------- | -------- | ----------- | ----- | ----- |\n`;
      
      // Sort properties: required first, then alphabetically
      props.sort((a, b) => {
        const aRequired = a['sh:minCount'] && parseInt(a['sh:minCount']) > 0;
        const bRequired = b['sh:minCount'] && parseInt(b['sh:minCount']) > 0;
        
        if (aRequired && !bRequired) return -1;
        if (!aRequired && bRequired) return 1;
        
        const aName = String(a['name'] || a['rdfs:label'] || a['@id'] || '');
        const bName = String(b['name'] || b['rdfs:label'] || b['@id'] || '');
        
        return aName.localeCompare(bName);
      });
      
      props.forEach(prop => {
        const propId = prop['@id'];
        const propName = prop['name'] || prop['rdfs:label'] || prop['@id'];
        const normalizedPropName = normalizeName(propName);
        const anchorId = `${normalizedClassName}_${normalizedPropName}`;
        // Make a link to the 'main' definition of the property
        const propBaseId = prop?.["prov:specializationOf"]?.[0]?.['@id'];
        const link = propBaseId && propBaseId.match(/^http(s)?:/i) ? `[?](${propBaseId})` : "";
        const isRequired = prop['sh:minCount'] && parseInt(prop['sh:minCount']) > 0 ? "Yes" : "No";
        const propDesc = prop['description'] || prop['rdfs:comment'] || '';
        
        const rangeIncludes = prop['rangeIncludes'] || prop['schema:rangeIncludes'] || [];
        const rangesArray = Array.isArray(rangeIncludes) ? rangeIncludes : [rangeIncludes];
        
        // Create links to range classes that are defined in the profile
        const rangeLinks = rangesArray.map(r => {
          const rangeId = typeof r === 'object' ? r['@id'] : r;
          if (!rangeId) return 'Text'; // Default to Text if no range is specified
          
          // Check if this is a DefinedTermSet
          if (isDefinedTermSetRange(rangeId)) {
            termSet = profileCrate.getEntity(rangeId);
            const termSetName = termSet ? (termSet['name'] || termSet['rdfs:label'] || rangeId) : rangeId;
            return `[${termSetName}](#termset_${rangeId})`;
          }
          // Use the consistent normalized ID from our lookup table
          else if (classIdToNormalizedName[rangeId]) {
            const rangeClass = classRules.find(c => c['@id'] === rangeId);
            const rangeName = rangeClass ? (rangeClass['name'] || rangeClass['rdfs:label'] || rangeId) : rangeId;
            return `[${rangeName}](#${classIdToNormalizedName[rangeId]})`;
          } else if (rangeId.startsWith('http://schema.org/')) {
            const shortName = rangeId.replace('http://schema.org/', 'schema:');
            return shortName;
          } else if (rangeId.startsWith('schema:')) {
            return rangeId;
          } else {
            return rangeId;
          }
        }).join(', ');
        
        // Get fixed value if specified
        const fixedValue = prop['schema:value'] || prop['value'] || '';
        
        classSummary += `| <a id="${anchorId}"></a>${propName}${link} | ${isRequired} | ${propDesc} | ${rangeLinks} | ${fixedValue} |\n`;
      });
    } else {
      classSummary += `*No properties defined for this class*\n\n`;
    }
    
    classSummary += `\n`;
    
    // Add class to rules structure
    rules[classId] = classSummary;
    allClasses += classSummary;
  });
  
  // Store all classes summary
  rules.all = allClasses;
  
  // Add specific mappings for common classes to make them easier to reference in templates
  rules.RepositoryCollection = rules['#class_RepositoryCollection'] || '';
  rules.RepositoryObject = rules['#class_RepositoryObject'] || '';
  
  // Add provenance information
  // Get the current Git branch by running git command
  let gitBranch = 'main'; // Default to main
  try {
    const { execSync } = require('child_process');
    const gitCommand = 'git rev-parse --abbrev-ref HEAD';
    gitBranch = execSync(gitCommand, { cwd: __dirname, encoding: 'utf8' }).trim();
    // Handle detached HEAD state
    if (gitBranch === 'HEAD') {
      // Try to get the branch from CI environment variables
      gitBranch = process.env.GITHUB_REF_NAME || 
                  process.env.CI_COMMIT_REF_NAME || 
                  process.env.BRANCH_NAME || 
                  'main';
    }
  } catch (error) {
    console.warn(`Warning: Could not determine Git branch: ${error.message}`);
  }

  const repoUrl = `https://github.com/Language-Research-Technology/ro-crate-schema-tools/blob/${gitBranch}`;
  const scriptPath = path.relative(__dirname, path.resolve(__dirname, 'generate-soss-docs.js'));
  const templateRelPath = path.relative(__dirname, templatePath);
  const profileRelPath = path.relative(__dirname, profilePath);
  
  rules.provenance = `This document was compiled using [generate-soss-docs.js](${repoUrl}/${scriptPath}), ` +
                     `based on [${templateRelPath}](${repoUrl}/${templateRelPath}) ` +
                     `using a SoSS+ Schema defined in [${profileRelPath}](${repoUrl}/${profileRelPath}).`;

  // Read the template file
  console.log(`Reading template from: ${templatePath}`);
  const template = fs.readFileSync(templatePath, 'utf8');
  
  // Simple template engine - add support for including definedTermSets in the template
  const output = template.replace(/\${rules\.([^}]+)}/g, (match, key) => {
    // If the key starts with '#', look it up directly
    if (key.startsWith('#')) {
      return rules[key] || '';
    }
    // Special case for definedTermSets
    if (key === 'allDefinedTermSets') {
      return rules.allDefinedTermSets || '';
    }
    return rules[key] || '';
  });
  
  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the output to file
  fs.writeFileSync(outputPath, output, 'utf8');
  console.log(`Documentation generated successfully: ${outputPath}`);
} catch (error) {
  console.error(`Error generating documentation: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
}