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
    definedTermSets: {},  // Will contain DefinedTermSet documentation
    itemLists: {},  // Will contain item lists documentation
  };


  // Index entities by @type using native RO-Crate methods
  const entitiesByType = {};

  for (let entity of profileCrate.entities()) { 
    for (let type of entity['@type'] || []) {
      if (!entitiesByType[type]) {
        entitiesByType[type] = [];
      }
      entitiesByType[type].push(entity);
    }
  }

 /*  

  TODO: Deal with class inheritance at some point -- maybe later
  // Create a class hierarchy map for inheritance support
  const classHierarchy = {};
  entitiesByType["rdfs:Class"].forEach(classRule => {
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
   */
  // Group properties by class

  const classPropMap = {};
  (entitiesByType["rdf:Property"] || []).forEach(prop => {
    
    prop['domainIncludes'].forEach(domain => {
      const classId = typeof domain === 'object' ? domain['@id'] : domain;
      if (!classPropMap[classId]) {
        classPropMap[classId] = [];
      }
      classPropMap[classId].push(prop);
    });
  });

  // Find the Root Data Entity class
  // TODO this is a bad HACK that should be fixed later
  //  -- need to look for the ro-crate-metadata.json metadata descriptor class and find root(s) from there
  const rootDataEntityClass = profileCrate.getEntity("#Root_Data_Entity");
  
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

  (entitiesByType["DefinedTermSet"] || []).forEach(termSet => {
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

  // Generate documentation for each ItemList
  let allItemLists = "## Item Lists\n\n";

  (entitiesByType["ItemList"] || []).forEach(list => {
    const listId = list['@id'];
    const listName = list['name'] || listId;
    const listDescription = list['description'] || '';
    
    let listSummary = `### <a id="${listId}"></a>${listName}\n\n`;
    listSummary += `${listDescription}\n\n`;
    
    // Add terms table if there are terms in this set
    const items = list.itemListElement || [];
    if (items.length > 0) {
      
      // Sort terms alphabetically by name
      items.sort((a, b) => {
        const aName = String(a['name']  || a['@id'] || '');
        const bName = String(b['name']  || b['@id'] || '');
        return aName.localeCompare(bName);
      });
      
      items.forEach(item => {
        const itemName = item['name']  || item['@id'];
        const ItemDesc = item['description']  || '';
        listSummary += `-  [${itemName}](#${item["@id"]})\n `;
      });

      listSummary += "<hr/>\n\n";

      items.forEach(item => {
        listSummary += `\n\n <a id="${item["@id"]}"></a><pre>\n ${JSON.stringify(item, null, 2)}\n</pre>\n\n`;
      });
    } else {
      listSummary += `*No terms defined for this term set*\n\n`;
    }
    
    
    // Add DefinedTermSet to rules structure
    rules[listId] = listSummary;
    rules.itemLists[listId] = listSummary;
    allItemLists += listSummary;
  });
  
  // Add all defined term sets summary to rules
  rules.allItemLists = allItemLists;


  // Generate class documentation
  let allClasses = "## Types of entities (specializations of Classes) and expected Properties\n\n";
  
  entitiesByType["rdfs:Class"].forEach(classRule => {
    const classId = classRule['@id'];
    const className = classRule['name'] || classRule['rdfs:label'] || classId;
    const classDesc = classRule['description'] || classRule['rdfs:comment'] || '';
    const specialized = classRule['prov:specializationOf'] || [];
    var classSummary = `### <a id="${classRule['@id']}"></a> ${className}\n\n`;


    classSummary += `${classDesc}\n\n`;

    const min = classRule["sh:minCount"] !== undefined ? String(classRule["sh:minCount"]) : undefined;
    const max = classRule["sh:maxCount"] !== undefined ? String(classRule["sh:maxCount"]) : undefined;
    
    if (min === undefined) {
      classSummary += `Instances of this type MAY be present in the crate.\n\n`;
    } else if  (min === "0") {
      classSummary += `Instances of this type SHOULD be present in the crate.\n\n`;
    } else {
      classSummary += `At least ${min} instances of this type MUST be present in the crate.\n\n`;
    }
    if (max !== undefined && max > 0) {
      classSummary += ` A maximum of ${max} instances of this type  MAY be present in the crate.\n\n`;
    }

    classSummary += `| Min Count | Max Count |\n`;
    classSummary += `| --------- | --------- |\n`;
    classSummary += `| ${min !== undefined ? min : 'N/A'} | ${max !== undefined ? max : 'N/A'} |\n\n`;

  
    

     classSummary += `| Property | Required | Description | Range | Value |\n`;
     classSummary += `| -------- | -------- | ----------- | ----- | ----- |\n`;
    
    if (specialized) {
      const specializedArray = Array.isArray(specialized) ? specialized : [specialized];
      const specializedStr = specializedArray.map(s => 
        typeof s === 'object' ? s['@id'] : s).join(', ');
      classSummary += `| @type | yes |  |  | ${specializedStr} |\n`;

    }
    
    // Get all properties for this class (no inheritence support ATM)
    const props = classRule["@reverse"].domainIncludes
    
    if (props.length > 0) {
      
      
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
        const anchorId = `${classRule["@id"]}_${prop["@id"]}`;
        // Make a link to the 'main' definition of the property
        const propBaseId = prop?.["prov:specializationOf"]?.[0]?.['@id'];
        const link = propBaseId && propBaseId.match(/^http(s)?:/i) ? `[?](${propBaseId})` : "";
        const isRequired = prop['sh:minCount'] && parseInt(prop['sh:minCount']) > 0 ? "Yes" : "No";
        const propDesc = prop['description'] || prop['rdfs:comment'] || '';
        
        const rangesArray = prop['rangeIncludes'] || [];
      
        // Create links to range classes that are defined in the profile
        const rangeLinks = rangesArray.map(r => {
          const rangeId = typeof r === 'object' ? r['@id'] : r;
          if (!rangeId) return 'Text'; // Default to Text if no range is specified
          const rangeDefiniton = profileCrate.getEntity(rangeId);
          if(rangeDefiniton) {
            const rangeName = rangeDefiniton['name'] || rangeDefiniton['rdfs:label'] || rangeId;
            return `<a href="#${rangeId}">${rangeName}</a>`;
          }
          return `${rangeId}`
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
    // Special case for itemLists
    if (key === 'allItemLists') {
      return rules.allItemLists || '';
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