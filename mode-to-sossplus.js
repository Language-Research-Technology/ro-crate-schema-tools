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
const { ROCrate } = require("ro-crate");
const path = require("path");

console.log("Starting mode-to-sossplus converter");

const argv = yargs(process.argv.slice(2))
  .scriptName("mode-to-sossplus")
  .option("m", {
    alias: "mode-file",
    describe: "Path to a mode file to convert",
    type: "string",
    demandOption: true
  })
  .option("o", {
    alias: "output-dir",
    describe: "Output directory for the generated RO-Crate",
    type: "string",
    default: "./output/mode-sossplus"
  })
  .option("p", {
    alias: "profile-crate",
    describe: "Output directory for the profile-crate (e.g., profiles/ldac/profile-crate)",
    type: "string"
  })
  .option("n", {
    alias: "namespace",
    describe: "Namespace for the generated entities",
    type: "string",
    default: "https://language-research-technology.github.io/terms#"
  })
  .help()
  .argv;

/**
 * ModeConverter class to convert mode files to RO-Crate with SOSSPlus profile
 */
class ModeConverter {
  constructor(modeFilePath, outputDir, namespace) {
    console.log(`Initializing converter with:
    - Mode file: ${modeFilePath}
    - Output directory: ${outputDir}
    - Namespace: ${namespace}`);
    
    this.modeFilePath = modeFilePath;
    this.outputDir = outputDir;
    this.namespace = namespace;
    
    // Map to track properties by ID to avoid duplication
    this.propertyMap = new Map();
    
    // Create the RO-Crate object
    this.crate = new ROCrate();
  }
  
  /**
   * Load the mode file from disk
   */
  loadModeFile() {
    console.log(`Loading mode file: ${this.modeFilePath}`);
    try {
      // Read the file as text
      const fileContent = fs.readFileSync(this.modeFilePath, 'utf8');
      console.log("File read successfully");
      
      // Remove any comment lines that start with //
      const contentWithoutComments = fileContent
        .split('\n')
        .filter(line => !line.trim().startsWith('//'))
        .join('\n');
      console.log("Removed any comment lines from file");
      
      // Parse the JSON
      const modeData = JSON.parse(contentWithoutComments);
      console.log("JSON parsed successfully");

      // Store the original mode file
      this.modeData = modeData;
      
      // Create a copy with UI hints
      this.createModeWithUIHints();
      
      console.log("Mode file loaded");
      
      // Log the structure of the mode file
      console.log("\nMode file structure:");
      console.log(`- Metadata: ${modeData.metadata ? 'Present' : 'Not present'}`);
      console.log(`- Root Data Entity: ${modeData.rootDataEntity ? 'Present' : 'Not present'}`);
      console.log(`- Classes: ${modeData.classes ? Object.keys(modeData.classes).length : 0} defined`);
      console.log(`- Lookups: ${modeData.lookups ? Object.keys(modeData.lookups).length : 0} defined`);
      
      return modeData;
    } catch (error) {
      console.error(`Error loading mode file: ${error}`);
      throw error;
    }
  }

  /**
   * Create a copy of the mode file with UI hints
   */
  createModeWithUIHints() {
    // Create a deep copy of the mode data
    const modeWithHints = JSON.parse(JSON.stringify(this.modeData));
    
    // Add a ui-hints section
    modeWithHints['ui-hints'] = {
      textAreas: {},
      textFields: {},  // Add this to explicitly track Text fields
      lookups: {}
    };
    
    // Process all classes to extract UI hints
    if (modeWithHints.classes) {
      Object.entries(modeWithHints.classes).forEach(([className, classData]) => {
        if (classData.inputs) {
          classData.inputs.forEach(input => {
            // Handle field types - check both array and string types
            const types = Array.isArray(input.type) ? input.type : [input.type];
            
            // Store TextArea hints
            if (types.includes('TextArea')) {
              if (!modeWithHints['ui-hints'].textAreas[className]) {
                modeWithHints['ui-hints'].textAreas[className] = {};
              }
              modeWithHints['ui-hints'].textAreas[className][input.name] = true;
            }
            
            // Explicitly store Text fields to prevent them from being converted to TextArea
            if (types.includes('Text')) {
              if (!modeWithHints['ui-hints'].textFields[className]) {
                modeWithHints['ui-hints'].textFields[className] = {};
              }
              modeWithHints['ui-hints'].textFields[className][input.name] = true;
            }
          });
        }
      });
    }
    
    // Process all lookups to store their information
    if (modeWithHints.lookups) {
      modeWithHints['ui-hints'].lookups = { ...modeWithHints.lookups };
    }
    
    // Save the mode file with UI hints
    const hintsFilePath = path.join(this.outputDir, 'mode-with-ui-hints.json');
    fs.ensureDirSync(path.dirname(hintsFilePath));
    fs.writeJSONSync(hintsFilePath, modeWithHints, { spaces: 2 });
    console.log(`Saved mode file with UI hints to ${hintsFilePath}`);
    
    // Store reference to the hints file path
    this.hintsFilePath = hintsFilePath;
  }

  /**
   * Initialize the RO-Crate with metadata
   */
  initializeCrate() {
    console.log("Initializing RO-Crate structure");
    this.crate.resolveContext();
    
    // Add metadata based on the mode file
    const metadata = this.modeData.metadata || {};
    
    // Set root dataset properties
    this.crate.rootDataset.name = `${metadata.name || "Converted Mode"} Schema`;
    this.crate.rootDataset.description = 
      `Schema derived from ${metadata.name || "mode file"}: ${metadata.description || ""}`;
    
    if (metadata.author) {
      this.crate.rootDataset.author = [{ "@id": "#author" }];
      this.crate.addEntity({
        "@id": "#author",
        "@type": "Organization",
        "name": metadata.author
      });
      console.log(`Added author: ${metadata.author}`);
    }
    
    if (metadata.license) {
      this.crate.rootDataset.license = metadata.license;
      console.log(`Added license: ${metadata.license}`);
    }
    
    // Add conformsTo for SOSSplus-profile
    this.crate.rootDataset.conformsTo = [{ 
      "@id": "https://github.com/Language-Research-Technology/ro-crate-schema-tools/blob/main/profiles/sossplus-profile.md" 
    }];
    console.log("Added conformsTo reference to SOSSplus profile");
    
    // Add RO-Crate Metadata Descriptor early to ensure it appears at top of @graph
    this.crate.addEntity({
      "@id": "ro-crate-metadata.json",
      "@type": "CreativeWork",
      "identifier": "ro-crate-metadata.json",
      "about": { "@id": "./" }
    });
    console.log("Added RO-Crate Metadata Descriptor at top level");
  }

  /**
   * Process a class from the mode file
   * @param {string} className - Name of the class
   * @param {object} classData - Class definition data
   */
  processClass(className, classData) {
    console.log(`Processing class: ${className}`);
    
    // Get class ID from data or generate from namespace
    const classId = classData.id || `${this.namespace}${className}`;
    
    // Create class entity
    const classEntity = {
      "@id": `#class_${className}`,
      "@type": "rdfs:Class",
      "rdfs:label": className,
      "name": className,
      "prov:specializationOf": { "@id": classId }
    };
    
    // Add description if available
    if (classData.description) {
      classEntity["rdfs:comment"] = classData.description;
    }
    
    // Add subClassOf if available
    if (classData.subClassOf && classData.subClassOf.length > 0) {
      classEntity["rdfs:subClassOf"] = classData.subClassOf.map(superClass => {
        return { "@id": superClass };
      });
    }
    
    this.crate.addEntity(classEntity);
    console.log(`Added class entity: ${className} with ID ${classEntity["@id"]}`);
    
    // Process inputs/properties for this class
    if (classData.inputs && classData.inputs.length > 0) {
      console.log(`Processing ${classData.inputs.length} properties for class ${className}`);
      classData.inputs.forEach(input => {
        this.processProperty(className, input);
      });
    } else {
      console.log(`No properties defined for class ${className}`);
    }
  }

  /**
   * Process a property from a class
   * @param {string} className - Name of the class this property belongs to
   * @param {object} inputData - Input/property definition
   */
  processProperty(className, inputData) {
    console.log(`Processing property: ${inputData.name} for class ${className}`);
    
    const propertyId = inputData.id || `${this.namespace}${inputData.name}`;
    const propertyName = inputData.name;
    
    // Create a unique key to check for existing properties
    const propertyKey = `${propertyId}_${propertyName}_${JSON.stringify(inputData.type)}`;
    
    // Check if we already have this property
    if (this.propertyMap.has(propertyKey)) {
      const existingProperty = this.propertyMap.get(propertyKey);
      console.log(`Found existing property: ${propertyName} - reusing and adding domain`);
      
      // Add this class to the domain of the existing property
      if (!existingProperty["domainIncludes"]) {
        existingProperty["domainIncludes"] = [];
      } else if (!Array.isArray(existingProperty["domainIncludes"])) {
        // Convert to array if it's not already
        existingProperty["domainIncludes"] = [existingProperty["domainIncludes"]];
      }
      
      // Add the new class to the domain if not already present
      const domainClassId = `#class_${className}`;
      const alreadyInDomain = existingProperty["domainIncludes"].some(domain => 
        domain["@id"] === domainClassId
      );
      
      if (!alreadyInDomain) {
        existingProperty["domainIncludes"].push({ "@id": domainClassId });
        
        // Update the entity in the crate to ensure changes are saved
        this.crate.addEntity(existingProperty);
        console.log(`Updated domain for property ${propertyName} to include ${className}`);
      }
      
      return existingProperty;
    }
    
    // Create a new property entity
    const propertyEntity = {
      "@id": `#prop_${propertyName}_${className}`,
      "@type": "rdf:Property",
      "rdfs:label": propertyName,
      "name": propertyName,
      "prov:specializationOf": { "@id": propertyId },
      "domainIncludes": [
        { "@id": `#class_${className}` }
      ]
    };
    
    // Add description/help if available
    if (inputData.help) {
      propertyEntity["rdfs:comment"] = inputData.help;
    }
    
    // Process values array first if it exists - these are predefined values for the property
    if (inputData.values && inputData.values.length > 0) {
      console.log(`Processing ${inputData.values.length} predefined values for property: ${propertyName}`);
      
      // Check if all values are DefinedTerms
      const allDefinedTerms = inputData.values.every(value => value["@type"] === "DefinedTerm");
      
      // Check if they all belong to the same DefinedTermSet
      let definedTermSetId = null;
      if (allDefinedTerms) {
        const termSets = new Set(inputData.values
          .filter(value => value.inDefinedTermSet && value.inDefinedTermSet["@id"])
          .map(value => value.inDefinedTermSet["@id"]));
        
        if (termSets.size === 1) {
          definedTermSetId = Array.from(termSets)[0];
          console.log(`All values belong to the same DefinedTermSet: ${definedTermSetId}`);
        }
      }
      
      if (allDefinedTerms && definedTermSetId) {
        // Handle as a DefinedTermSet
        console.log(`Creating DefinedTermSet for property: ${propertyName}`);
        
        // Create the DefinedTermSet if not already exists
        const termSetEntity = {
          "@id": definedTermSetId,
          "@type": "DefinedTermSet",
          "name": definedTermSetId.split(':').pop(),
          "description": `Set of defined terms for ${propertyName}`
        };
        
        // Add each value as a DefinedTerm and add to the DefinedTermSet
        const termReferences = [];
        inputData.values.forEach((value) => {
          // If the value already has an @id, use it; otherwise, create one
          const valueId = value["@id"];
          
          // Create a copy of the value object to avoid modifying the original
          const valueEntity = JSON.parse(JSON.stringify(value));
          
          // Add the DefinedTerm to the crate
          this.crate.addEntity(valueEntity);
          console.log(`Added DefinedTerm: ${valueId} for property ${propertyName}`);
          
          // Add reference to the value
          termReferences.push({ "@id": valueId });
        });
        
        // Add hasDefinedTerm property to DefinedTermSet
        termSetEntity.hasDefinedTerm = termReferences;
        
        // Add the DefinedTermSet to the crate
        this.crate.addEntity(termSetEntity);
        console.log(`Added DefinedTermSet: ${definedTermSetId} for property ${propertyName}`);
        
        // Link the property to the DefinedTermSet
        propertyEntity["rangeIncludes"] = { "@id": definedTermSetId };
      } else {
        // Handle as a regular ItemList
        // Create an ItemList to hold the values
        const itemListId = `#itemlist_${propertyName}_${className}`;
        const itemList = {
          "@id": itemListId,
          "@type": "ItemList",
          "name": `Values for ${propertyName}`,
          "description": `Predefined values for the ${propertyName} property`,
          "itemListElement": []
        };
        
        // Add each value as an entity and reference it in the ItemList
        inputData.values.forEach((value, index) => {
          // If the value already has an @id, use it; otherwise, create one
          const valueId = value["@id"] || `#value_${propertyName}_${index}_${className}`;
          
          // Create a copy of the value object to avoid modifying the original
          const valueEntity = JSON.parse(JSON.stringify(value));
          valueEntity["@id"] = valueId;
          
          // Add the value to the crate
          this.crate.addEntity(valueEntity);
          console.log(`Added value entity: ${valueId} for property ${propertyName}`);
          
          // Add reference to the value in the ItemList
          itemList.itemListElement.push({ "@id": valueId });
        });
        
        // Add the ItemList to the crate
        this.crate.addEntity(itemList);
        console.log(`Added ItemList: ${itemListId} for property ${propertyName}`);
        
        // Link the property to the ItemList
        propertyEntity["itemListElement"] = { "@id": itemListId };
        
        // Set the range to the ItemList
        propertyEntity["rangeIncludes"] = { "@id": itemListId };
      }
    } 
    // Add range types only if no values were defined
    else if (inputData.type && inputData.type.length > 0) {
      // Handle both array and non-array type specifications
      const types = Array.isArray(inputData.type) ? inputData.type : [inputData.type];
      
      propertyEntity["rangeIncludes"] = types.map(type => {
        // Handle primitive types and class references
        if (["Text", "TextArea", "URL", "Date", "DateTime", "Boolean", "Number", "Select", "SelectObject"].includes(type)) {
          // Map UI types to schema types
          const typeMap = {
            "Text": "Text",
            "TextArea": "Text",
            "URL": "URL",
            "Date": "Date",
            "DateTime": "DateTime",
            "Boolean": "Boolean",
            "Number": "Number",
            "Select": "Text",
            "SelectObject": "Thing"
          };
          return { "@id": typeMap[type] || `${type}` };
        } else {
          // This is a reference to another class
          return { "@id": `#class_${type}` };
        }
      });
    }
    
    // Add cardinality constraints
    if (inputData.required) {
      propertyEntity["sh:minCount"] = 1;
    }
    
    if (inputData.multiple === false) {
      propertyEntity["sh:maxCount"] = 1;
    }
    
    // Save to property map and add to crate
    this.propertyMap.set(propertyKey, propertyEntity);
    this.crate.addEntity(propertyEntity);
    
    console.log(`Added property entity: ${propertyName} with ID ${propertyEntity["@id"]}`);
    
    return propertyEntity;
  }

  /**
   * Process root data entity definitions
   */
  processRootDataEntity() {
    if (!this.modeData.rootDataEntity) {
      console.log("No rootDataEntity defined in mode file");
      return;
    }
    
    const rootEntities = Array.isArray(this.modeData.rootDataEntity) ? 
                        this.modeData.rootDataEntity : 
                        [this.modeData.rootDataEntity];
    
    console.log(`Processing ${rootEntities.length} root data entities`);
    
    rootEntities.forEach((rootEntity, index) => {
      const rootClassName = rootEntity.type ? 
        (Array.isArray(rootEntity.type) ? rootEntity.type[0] : rootEntity.type) : 
        `RootDataEntity${index}`;
      
      console.log(`Processing root data entity of type: ${rootClassName}`);
      
      const rootClassEntity = {
        "@id": `#class_RootDataEntity_${rootClassName}`,
        "@type": "rdfs:Class",
        "rdfs:label": `${rootClassName}`,
        "name": `${rootClassName}`,
        "prov:specializationOf": { "@id": `${rootClassName}` },
        "rdfs:comment": rootEntity.description || `Root Data Entity of type ${rootClassName}`
      };
      
      this.crate.addEntity(rootClassEntity);
      console.log(`Added root data entity class: ${rootClassName}`);
    });
  }

  /**
   * Process lookup definitions
   */
  processLookups() {
    const lookups = this.modeData.lookup || {};
    
    console.log(`Processing ${Object.keys(lookups).length} lookup definitions`);
    
    for (const lookupName in lookups) {
      console.log(`Processing lookup: ${lookupName}`);
      const lookupData = lookups[lookupName];
      
      // Create a class for the lookup
      const lookupEntity = {
        "@id": `#class_${lookupName}`,
        "@type": "rdfs:Class",
        "rdfs:label": lookupName,
        "name": lookupName,
        "rdfs:comment": `Lookup for ${lookupName} from ${lookupData.module || 'unspecified module'}`
      };
      
      this.crate.addEntity(lookupEntity);
      console.log(`Added lookup class: ${lookupName}`);
      
      // If fields are defined, create properties for them
      if (lookupData.fields && lookupData.fields.length > 0) {
        console.log(`Processing ${lookupData.fields.length} fields for lookup: ${lookupName}`);
        lookupData.fields.forEach(field => {
          // Skip @id as it's handled automatically
          if (field !== '@id') {
            const fieldEntity = {
              "@id": `#prop_${field}_${lookupName}`,
              "@type": "rdf:Property",
              "rdfs:label": field,
              "name": field,
              "prov:specializationOf": { "@id": `${field}` },
              "domainIncludes": [
                { "@id": `#class_${lookupName}` }
              ],
              "rangeIncludes": [
                { "@id": "Text" }
              ],
              "rdfs:comment": `Field ${field} for ${lookupName} lookup`
            };
            
            this.crate.addEntity(fieldEntity);
            console.log(`Added field property: ${field} for lookup ${lookupName}`);
          }
        });
      }
    }
  }

  /**
   * Add RO-Crate Metadata Descriptor class and properties to the SOSS+ RO-Crate
   * These elements should always be included in generated SOSS+ crates
   */
  addROCrateMetadataDescriptor() {
    console.log("Adding RO-Crate Metadata Descriptor class and properties");
    
    // Add RO-Crate Metadata Descriptor Class
    const metadataDescriptorClass = {
      "@id": "#RO-Crate_Metadata_Descriptor",
      "@type": "rdfs:Class",
      "name": "RO-Crate Metadata Descriptor",
      "prov:specializationOf": { "@id": "http://schema.org/CreativeWork" },
      "description": "An RO-Crate @graph must contain an entity of Type @CreativeWork which is known as the RO-Crate Metadata descriptor.",
      "sh:minCount": 1,
      "sh:maxCount": 1
    };
    this.crate.addEntity(metadataDescriptorClass);
    console.log("Added RO-Crate Metadata Descriptor class");
    
    // Add RO-Crate Metadata Descriptor ID property
    const metadataDescriptorIdProperty = {
      "@id": "#RO-Crate_Metadata_Descriptor.id",
      "@type": "rdf:Property",
      "value": "ro-crate-metadata.json",
      "description": "The RO-Crate Metadata file identifier",
      "rdfs:label": "@id",
      "domainIncludes": [
        {
          "@id": "#RO-Crate_Metadata_Descriptor"
        }
      ],
      "rangeIncludes": { "@id": "#Root_Data_Entity" },
      "sh:minCount": 1,
      "sh:maxCount": 1
    };
    this.crate.addEntity(metadataDescriptorIdProperty);
    console.log("Added RO-Crate Metadata Descriptor ID property");
    
    // Add RO-Crate Metadata Descriptor 'about' property
    const metadataDescriptorAboutProperty = {
      "@id": "#RO-Crate_Metadata_Descriptor.about",
      "@type": "rdf:Property",
      "prov:specializationOf": { "@id": "http://schema.org/about" },
      "description": "This property on the RO-Crate Metadata Descriptor references the Root Data Entity. In a SoSS+ profile there may be Schemas present for more than one 'flavour' of Root Data Entity with different @type arrays or `@conformsTo` references (or other specializations).",
      "name": "about",
      "domainIncludes": [
        {
          "@id": "#RO-Crate_Metadata_Descriptor"
        }
      ],
      "rangeIncludes": { "@id": "#Root_Data_Entity" },
      "sh:minCount": 1,
      "sh:maxCount": 1
    };
    this.crate.addEntity(metadataDescriptorAboutProperty);
    console.log("Added RO-Crate Metadata Descriptor about property");
    
    // Add Root Data Entity class that matches what's in the mode file
    this.addRootDataEntityClass();
  }

  /**
   * Add Root Data Entity class based on the mode file
   */
  addRootDataEntityClass() {
    console.log("Adding Root Data Entity class from mode file");
    
    // Get the root entity type(s) from the mode file
    const rootDataEntityTypes = [];
    if (this.modeData.rootDataset && this.modeData.rootDataset.type) {
      if (Array.isArray(this.modeData.rootDataset.type)) {
        rootDataEntityTypes.push(...this.modeData.rootDataset.type);
      } else {
        rootDataEntityTypes.push(this.modeData.rootDataset.type);
      }
    } else if (this.modeData.rootDataEntity) {
      const rootEntity = this.modeData.rootDataEntity;
      if (Array.isArray(rootEntity)) {
        rootEntity.forEach(entity => {
          if (entity.type) {
            if (Array.isArray(entity.type)) {
              rootDataEntityTypes.push(...entity.type);
            } else {
              rootDataEntityTypes.push(entity.type);
            }
          }
        });
      } else if (rootEntity.type) {
        if (Array.isArray(rootEntity.type)) {
          rootDataEntityTypes.push(...rootEntity.type);
        } else {
          rootDataEntityTypes.push(rootEntity.type);
        }
      }
    }
    
    // Fallback to Dataset if no type is specified
    if (rootDataEntityTypes.length === 0) {
      rootDataEntityTypes.push("Dataset");
    }
    
    console.log(`Root Data Entity types from mode file: ${rootDataEntityTypes.join(', ')}`);
    
    // Create the Root Data Entity class
    const rootDataEntityClass = {
      "@id": "#Root_Data_Entity",
      "@type": "rdfs:Class",
      "description": `The Root Data Entity for an RO-Crate. This is the main entity of the RO-Crate and is the one that is referenced by the RO-Crate Metadata Descriptor. In this profile, it is a ${rootDataEntityTypes.join(' and ')}.`,
      "name": "Root Data Entity",
      "sh:minCount": 1,
      "sh:maxCount": 1
    };
    
    // Create proper rdfs:subClassOf relationships for all specified types
    if (rootDataEntityTypes.length > 0) {
      rootDataEntityClass["prov:specializationOf"] = rootDataEntityTypes.map(type => {
        const uri = this.crate.resolveTerm(type) || `http://schema.org/${type}`;
        return { "@id": uri };
      });
    }
    
    this.crate.addEntity(rootDataEntityClass);
    console.log(`Added Root Data Entity class with subclass relationships to: ${rootDataEntityTypes.join(', ')}`);
    
    // Now add the required properties for the Root Data Entity
    this.addRootDataEntityProperties(rootDataEntityTypes);
  }

  /**
   * Add common required properties for Root Data Entity
   */
  addRootDataEntityProperties(rootDataEntityTypes) {
    console.log("Adding common properties for Root Data Entity");
    
    // Add name property
    const nameProperty = {
      "@id": "#prop_name_Dataset",
      "@type": "rdf:Property",
      "rdfs:label": "name",
      "name": "name",
      "prov:specializationOf": {
        "@id": "http://schema.org/name"
      },
      "domainIncludes": {
        "@id": "#Root_Data_Entity"
      },
      "rdfs:comment": "The name of this data collection.",
      "rangeIncludes": {
        "@id": "Text"
      },
      "sh:minCount": 1
    };
    this.crate.addEntity(nameProperty);
    console.log("Added name property for Root Data Entity");
    
    // Add description property
    const descriptionProperty = {
      "@id": "#prop_description_Dataset",
      "@type": "rdf:Property",
      "rdfs:label": "description",
      "name": "description",
      "prov:specializationOf": {
        "@id": "http://schema.org/description"
      },
      "domainIncludes": {
        "@id": "#Root_Data_Entity"
      },
      "rdfs:comment": "An abstract of the collection. Include as much detail as possible about the motivation and use of the collection.",
      "rangeIncludes": {
        "@id": "Text"
      },
      "sh:minCount": 1
    };
    this.crate.addEntity(descriptionProperty);
    console.log("Added description property for Root Data Entity");
    
    // Add datePublished property
    const datePublishedProperty = {
      "@id": "#prop_datePublished_Dataset",
      "@type": "rdf:Property",
      "rdfs:label": "datePublished",
      "name": "datePublished",
      "prov:specializationOf": {
        "@id": "http://schema.org/datePublished"
      },
      "domainIncludes": {
        "@id": "#Root_Data_Entity"
      },
      "rdfs:comment": "A date that this collection was published. This should be the date that the collection was first made available.",
      "rangeIncludes": [
        {
          "@id": "Date"
        }
      ],
      "sh:minCount": 1
    };
    this.crate.addEntity(datePublishedProperty);
    console.log("Added datePublished property for Root Data Entity");
    
    // Add license property
    const licenseProperty = {
      "@id": "#prop_license_Dataset",
      "@type": "rdf:Property",
      "rdfs:label": "license",
      "name": "license",
      "prov:specializationOf": {
        "@id": "http://schema.org/license"
      },
      "domainIncludes": {
        "@id": "#Root_Data_Entity"
      },
      "rdfs:comment": "A license document that applies to this content, typically indicated by URL.",
      "rangeIncludes": [
        {
          "@id": "#class_CreativeWork"
        },
        {
          "@id": "URL"
        },
        {
          "@id": "Text"
        }
      ],
      "sh:minCount": 1
    };
    this.crate.addEntity(licenseProperty);
    console.log("Added license property for Root Data Entity");
  }

  /**
   * Convert the mode file to an RO-Crate
   */
  async convert() {
    try {
      console.log("Starting conversion process");
      
      // Load the mode file
      this.loadModeFile();
      
      // Initialize the RO-Crate
      this.initializeCrate();
      
      // Add RO-Crate Metadata Descriptor and Root Data Entity classes first
      // to ensure they appear at the top of the generated file
      this.addROCrateMetadataDescriptor();
      console.log("Added RO-Crate Metadata Descriptor and Root Data Entity at the start of the file");
      
      // Process the classes
      const classes = this.modeData.classes;
      if (classes) {
        console.log(`Processing ${Object.keys(classes).length} classes from mode file`);
        Object.entries(classes).forEach(([className, classData]) => {
          this.processClass(className, classData);
        });
      }
      
      // Process root data entity if it exists
      if (this.modeData.rootDataEntity) {
        console.log("Processing root data entity");
        this.processRootDataEntity();
      } else {
        console.log("No rootDataEntity defined in mode file");
      }
      
      // Process lookups if they exist
      if (this.modeData.lookups) {
        console.log(`Processing ${Object.keys(this.modeData.lookups).length} lookup definitions`);
        this.processLookups();
      }
      
      // Write the RO-Crate to disk
      const outputPath = path.join(this.outputDir, 'ro-crate-metadata.json');
      fs.ensureDirSync(this.outputDir);
      fs.writeJSONSync(outputPath, this.crate.toJSON(), { spaces: 2 });
      console.log(`RO-Crate metadata written to: ${outputPath}\n`);
      
      console.log("Conversion completed successfully!");
      
      return this.crate;
    } catch (error) {
      console.error("Error during conversion:", error);
      throw error;
    }
  }
}

// Main function to run the conversion
async function main() {
  try {
    console.log("Starting mode-to-sossplus conversion...");
    
    const modePath = argv.modeFile;
    const outputDir = argv.outputDir;
    const namespace = argv.namespace;
    const profileCrateDir = argv.profileCrate;
    
    console.log(`Converting mode file: ${modePath}`);
    console.log(`Output directory: ${outputDir}`);
    if (profileCrateDir) {
      console.log(`Profile-crate directory: ${profileCrateDir}`);
    }
    
    const converter = new ModeConverter(modePath, outputDir, namespace);
    const crate = await converter.convert();
    
    // If profile-crate directory is specified, copy the output there too
    if (profileCrateDir) {
      console.log(`Writing profile to profile-crate directory: ${profileCrateDir}`);
      const profileCratePath = path.join(profileCrateDir, 'ro-crate-metadata.json');
      fs.ensureDirSync(profileCrateDir);
      fs.writeJSONSync(profileCratePath, crate.toJSON(), { spaces: 2 });
      console.log(`Profile written to: ${profileCratePath}`);
    }
    
    console.log("Conversion completed successfully");
  } catch (error) {
    console.error("Conversion failed:", error.message);
    process.exit(1);
  }
}

// Run the main function
main();