#!/usr/bin/env node
/* This is part of rocrate schema tools, a node library for implementing the RO-Crate data
packaging spec. Copyright (C) 2023 University of Queensland

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const yargs = require("yargs");
const fs = require("fs-extra");
const path = require("path");
const { ROCrate } = require("ro-crate");

console.log("Starting sossplus-to-mode converter");

const argv = yargs(process.argv.slice(2))
  .scriptName("sossplus-to-mode")
  .option("s", {
    alias: "sossplus-crate",
    describe: "Path to a SOSSplus RO-Crate file",
    type: "string",
    demandOption: true
  })
  .option("o", {
    alias: "output-file",
    describe: "Output file path for the generated mode file",
    type: "string",
    demandOption: true
  })
  .option("h", {
    alias: "ui-hints-file",
    describe: "Path to the UI hints file (mode-with-ui-hints.json)",
    type: "string"
  })
  .help()
  .argv;

/**
 * SOSSPlusToMode class to convert RO-Crate with SOSSplus profile back to a mode file
 */
class SOSSPlusToMode {
  constructor(socratePath, outputPath, uiHintsPath) {
    console.log(`Initializing converter with:
    - SOSSplus file: ${socratePath}
    - Output file: ${outputPath}${uiHintsPath ? '\n    - UI hints file: ' + uiHintsPath : ''}`);
    
    this.socratePath = socratePath;
    this.outputPath = outputPath;
    this.uiHintsPath = uiHintsPath;
    this.uiHints = null;
    this.mode = {
      metadata: {},
      classes: {}
    };
  }

  /**
   * Load the RO-Crate file
   */
  loadCrate() {
    console.log(`Loading RO-Crate from: ${this.socratePath}`);
    try {
      const crateData = fs.readJSONSync(this.socratePath);
      this.crate = new ROCrate(crateData);
      console.log("RO-Crate loaded successfully");
      return this.crate;
    } catch (error) {
      console.error(`Error loading RO-Crate: ${error}`);
      throw error;
    }
  }

  /**
   * Load the UI hints file if available
   */
  loadUIHints() {
    if (!this.uiHintsPath) {
      // Try to find the UI hints file in the same directory as the RO-Crate
      const dirname = path.dirname(this.socratePath);
      const potentialHintsPath = path.join(dirname, '..', 'mode-with-ui-hints.json');
      
      if (fs.existsSync(potentialHintsPath)) {
        this.uiHintsPath = potentialHintsPath;
        console.log(`Found UI hints file at: ${potentialHintsPath}`);
      } else {
        console.log("No UI hints file provided or found");
        return;
      }
    }

    try {
      console.log(`Loading UI hints file: ${this.uiHintsPath}`);
      this.uiHints = fs.readJSONSync(this.uiHintsPath);
      console.log("UI hints loaded successfully");
    } catch (error) {
      console.error(`Error loading UI hints file: ${error}`);
      this.uiHints = null;
    }
  }

  /**
   * Check if a property should be a TextArea based on UI hints
   * @param {string} className - The class name
   * @param {string} propertyName - The property name
   * @returns {boolean} - True if the property should be a TextArea
   */
  isTextArea(className, propertyName) {
    if (!this.uiHints || !this.uiHints['ui-hints'] || !this.uiHints['ui-hints'].textAreas) {
      return false;
    }
    
    return this.uiHints['ui-hints'].textAreas[className]?.[propertyName] === true;
  }

  /**
   * Extract metadata from the RO-Crate
   */
  extractMetadata() {
    console.log("Extracting metadata from RO-Crate");
    
    const rootDataset = this.crate.rootDataset;
    
    if (rootDataset.name) {
      this.mode.metadata.name = rootDataset.name.replace(' Schema', '');
    }
    
    if (rootDataset.description) {
      // Extract just the description part after the colon if it exists
      const descParts = rootDataset.description.split(/: (.+)/);
      if (descParts.length > 1) {
        this.mode.metadata.description = descParts[1];
      } else {
        this.mode.metadata.description = rootDataset.description;
      }
    }
    
    if (rootDataset.author && rootDataset.author[0] && typeof rootDataset.author[0] === 'object') {
      const authorEntity = this.crate.getEntity(rootDataset.author[0]['@id']);
      if (authorEntity && authorEntity.name) {
        this.mode.metadata.author = authorEntity.name;
      }
    }
    
    if (rootDataset.license) {
      this.mode.metadata.license = rootDataset.license;
    }
    
    // If UI hints file has additional metadata, merge it in
    if (this.uiHints && this.uiHints.metadata) {
      this.mode.metadata = { ...this.mode.metadata, ...this.uiHints.metadata };
    }
    
    console.log("Metadata extracted");
  }

  /**
   * Extract classes from the RO-Crate
   */
  extractClasses() {
    console.log("Extracting classes from RO-Crate");
    
    // Get entities using the get method and filter them manually
    const allEntities = this.crate.getGraph();
    const classEntities = allEntities.filter(entity => 
      entity['@type'] === 'rdfs:Class' && 
      entity['@id']?.startsWith('#class_')
    );
    
    console.log(`Found ${classEntities.length} class entities`);

    // First pass - create the basic class structure
    classEntities.forEach(classEntity => {
      // Extract the class name from the @id (remove #class_ prefix)
      const className = classEntity['@id'].replace('#class_', '');
      
      // Create a new class entry
      const classObject = {
        id: classEntity.prov$specializationOf?.['@id'] || `http://schema.org/${className}`,
      };
      
      // Add description if available
      if (classEntity['rdfs:comment']) {
        classObject.description = classEntity['rdfs:comment'];
      }
      
      // Initialize empty inputs array
      classObject.inputs = [];
      
      // Store the class info
      this.mode.classes[className] = classObject;
    });

    // Second pass - extract properties and handle relationships
    // This approach lets us find all properties that should be associated with each class
    const allProperties = allEntities.filter(entity => entity['@type'] === 'rdf:Property');
    
    // Build a map of class to properties
    const classPropertyMap = new Map();
    
    // For each property, identify the classes it applies to
    allProperties.forEach(property => {
      if (property['schema:domainIncludes']) {
        // Get all the domains this property applies to
        const domains = Array.isArray(property['schema:domainIncludes']) 
          ? property['schema:domainIncludes'] 
          : [property['schema:domainIncludes']];
        
        domains.forEach(domain => {
          const domainId = domain['@id'];
          
          // If this is a class in our model, add the property to it
          if (domainId.startsWith('#class_')) {
            const className = domainId.replace('#class_', '');
            
            if (!classPropertyMap.has(className)) {
              classPropertyMap.set(className, []);
            }
            
            classPropertyMap.get(className).push(property);
          }
        });
      }
    });
    
    // Now extract the inputs for each class
    Object.keys(this.mode.classes).forEach(className => {
      console.log(`Processing properties for class: ${className}`);
      
      const classProperties = classPropertyMap.get(className) || [];
      this.extractInputsFromProperties(className, this.mode.classes[className], classProperties);
    });
    
    console.log("Classes extracted");
  }

  /**
   * Extract inputs from a list of properties
   * @param {string} className - Name of the class
   * @param {object} classObject - Class object to add inputs to
   * @param {Array} properties - Array of properties to extract inputs from
   */
  extractInputsFromProperties(className, classObject, properties) {
    console.log(`Extracting ${properties.length} inputs for class: ${className}`);
    
    properties.forEach(property => {
      const input = {
        name: property.name
      };

      // Try different ways to extract the property ID
      if (property.prov$specializationOf && property.prov$specializationOf['@id']) {
        input.id = property.prov$specializationOf['@id'];
      } else if (property['prov:specializationOf'] && property['prov:specializationOf']['@id']) {
        input.id = property['prov:specializationOf']['@id'];
      }
      
      // Add description/help text
      if (property['rdfs:comment']) {
        input.help = property['rdfs:comment'];
      }

      // Set cardinality constraints
      if (property['sh:minCount'] === 1) {
        input.required = true;
      }
      
      if (property['sh:maxCount'] === 1) {
        input.multiple = false;
      } else {
        // If maxCount is not 1, it's multiple
        input.multiple = true;
      }
      
      // Add type based on rangeIncludes
      if (property['schema:rangeIncludes']) {
        const ranges = Array.isArray(property['schema:rangeIncludes']) ? 
                     property['schema:rangeIncludes'] : 
                     [property['schema:rangeIncludes']];
        
        input.type = ranges.map(range => {
          const rangeId = range['@id'];
          
          // Check if this is a simple type like Text, URL, etc.
          if (rangeId.startsWith('schema:')) {
            const schemaType = rangeId.replace('schema:', '');
            
            // Special handling for TextArea vs Text
            if (schemaType === 'Text') {
              // Check UI hints first
              if (this.isTextArea(className, input.name)) {
                return 'TextArea';
              }
              
              // Otherwise use heuristics
              const textAreaFields = ['description', 'abstract', 'notes', 'details', 'comment'];
              if (textAreaFields.includes(input.name) || (input.help && input.help.length > 100)) {
                return 'TextArea';
              } else {
                return 'Text';
              }
            }
            
            switch (schemaType) {
              case 'URL': return 'URL';
              case 'Date': return 'Date';
              case 'DateTime': return 'DateTime';
              case 'Boolean': return 'Boolean';
              case 'Number': return 'Number';
              case 'Text': return 'Text';
              default: return 'Text'; // Default fallback
            }
          } else if (rangeId.startsWith('#class_')) {
            // This is a reference to another class
            return rangeId.replace('#class_', '');
          } else if (rangeId.startsWith('#itemlist_')) {
            // This is a reference to an ItemList - handle as a selective input
            return 'SelectObject';
          } else if (rangeId.includes('DefinedTermSet')) {
            // This is a reference to a DefinedTermSet - handle as a selective input
            return 'SelectObject';
          }
          
          return 'Text'; // Default fallback
        });
      } else {
        input.type = ['Text']; // Default fallback
      }
      
      // Handle values (from ItemList or DefinedTermSet)
      if ((property['schema:rangeIncludes'] && property['schema:rangeIncludes']['@id']?.includes('itemlist_')) || 
          property['schema:itemListElement']) {
        
        const itemListId = property['schema:itemListElement']?.['@id'] || 
                         (property['schema:rangeIncludes'] && property['schema:rangeIncludes']['@id']);
        
        if (itemListId) {
          const itemList = this.crate.getEntity(itemListId);
          
          if (itemList && itemList.itemListElement) {
            const itemElements = Array.isArray(itemList.itemListElement) ? 
                               itemList.itemListElement : 
                               [itemList.itemListElement];
            
            input.values = itemElements.map(item => {
              const valueEntity = this.crate.getEntity(item['@id']);
              if (valueEntity) {
                return {
                  '@id': valueEntity['@id'],
                  '@type': valueEntity['@type'] || 'Thing',
                  'name': valueEntity.name,
                  'description': valueEntity.description,
                  'inDefinedTermSet': valueEntity.inDefinedTermSet
                };
              }
              return null;
            }).filter(v => v !== null);
            
            // If we have values, ensure this is a SelectObject
            if (input.values && input.values.length > 0) {
              const typeIndex = input.type.findIndex(t => t === 'Text');
              if (typeIndex >= 0) {
                input.type[typeIndex] = 'SelectObject';
              }
            }
          }
        }
      }
      
      // Special case for DefinedTermSet directly in rangeIncludes
      if (property['schema:rangeIncludes'] && 
          property['schema:rangeIncludes']['@id'] && 
          !property['schema:rangeIncludes']['@id'].startsWith('schema:') &&
          !property['schema:rangeIncludes']['@id'].startsWith('#class_') &&
          !property['schema:rangeIncludes']['@id'].startsWith('#itemlist_')) {
        
        const termSetId = property['schema:rangeIncludes']['@id'];
        const termSet = this.crate.getEntity(termSetId);
        
        if ((termSet && (termSet['@type'] === 'schema:DefinedTermSet' || termSet['@type'] === 'DefinedTermSet')) ||
            (typeof termSetId === 'string' && termSetId.includes('DefinedTermSet'))) {
          
          // Get all the terms in this set
          const termRefs = termSet && termSet.hasDefinedTerm ? 
                         (Array.isArray(termSet.hasDefinedTerm) ? termSet.hasDefinedTerm : [termSet.hasDefinedTerm]) : 
                         [];
          
          input.values = termRefs.map(termRef => {
            const termEntity = this.crate.getEntity(termRef['@id']);
            if (termEntity) {
              return {
                '@id': termEntity['@id'],
                '@type': 'DefinedTerm',
                'name': termEntity.name,
                'description': termEntity.description,
                'inDefinedTermSet': { '@id': termSetId }
              };
            }
            return null;
          }).filter(v => v !== null);
          
          // Try to get values from UI hints if we couldn't find them in the crate
          if ((!input.values || input.values.length === 0) && 
              this.uiHints && this.uiHints.classes && this.uiHints.classes[className]) {
            
            const originalInput = this.uiHints.classes[className].inputs.find(i => i.name === input.name);
            if (originalInput && originalInput.values) {
              input.values = originalInput.values;
              console.log(`Restored ${input.values.length} predefined values for ${input.name} from UI hints`);
            }
          }
          
          if (input.values && input.values.length > 0) {
            // It's a SelectObject since it references predefined values
            input.type = ['SelectObject'];
          }
        }
      }

      // Check if we have any lookup information for this property
      if (this.uiHints && this.uiHints['ui-hints'] && this.uiHints['ui-hints'].lookups) {
        // If the property type is a class that matches a lookup name
        const typeName = Array.isArray(input.type) ? input.type[0] : input.type;
        if (typeName && this.uiHints['ui-hints'].lookups[typeName]) {
          // Restore the lookup reference
          console.log(`Found lookup information for ${input.name} (${typeName})`);
        }
      }
      
      classObject.inputs.push(input);
    });

    // Check UI hints for any missing inputs that should be included
    if (this.uiHints && this.uiHints.classes && this.uiHints.classes[className]) {
      const originalInputs = this.uiHints.classes[className].inputs || [];
      
      // Find inputs that are in the original but not in our reconstructed inputs
      const reconstructedInputNames = new Set(classObject.inputs.map(input => input.name));
      
      originalInputs.forEach(originalInput => {
        if (!reconstructedInputNames.has(originalInput.name)) {
          console.log(`Restoring missing input ${originalInput.name} for class ${className} from UI hints`);
          classObject.inputs.push(originalInput);
        }
      });
    }
  }

  /**
   * Extract lookups from UI hints
   */
  extractLookups() {
    if (!this.uiHints || !this.uiHints['ui-hints'] || !this.uiHints['ui-hints'].lookups) {
      return;
    }
    
    console.log("Extracting lookups from UI hints");
    this.mode.lookups = { ...this.uiHints['ui-hints'].lookups };
    console.log(`Restored ${Object.keys(this.mode.lookups).length} lookups from UI hints`);
  }

  /**
   * Convert the RO-Crate to a mode file
   */
  async convert() {
    try {
      console.log("Starting conversion process");
      
      // Load the RO-Crate
      this.loadCrate();
      
      // Load UI hints if available
      this.loadUIHints();
      
      // Extract metadata and classes
      this.extractMetadata();
      this.extractClasses();
      
      // Extract lookups from UI hints
      this.extractLookups();
      
      // Write the mode file
      await fs.writeJSON(this.outputPath, this.mode, { spaces: 2 });
      console.log(`Mode file written to: ${this.outputPath}`);
      
      console.log("Conversion completed successfully!");
      
      return this.mode;
    } catch (error) {
      console.error("Error during conversion:", error);
      throw error;
    }
  }
}

// Main function to run the conversion
async function main() {
  try {
    console.log("Starting sossplus-to-mode conversion...");
    
    const socratePath = argv.sossplusCrate;
    const outputPath = argv.outputFile;
    const uiHintsPath = argv.uiHintsFile;
    
    console.log(`Converting SOSSplus RO-Crate: ${socratePath}`);
    console.log(`Output mode file: ${outputPath}`);
    
    const converter = new SOSSPlusToMode(socratePath, outputPath, uiHintsPath);
    await converter.convert();
    
    console.log("Conversion completed successfully");
  } catch (error) {
    console.error("Conversion failed:", error.message);
    process.exit(1);
  }
}

// Run the main function
main();