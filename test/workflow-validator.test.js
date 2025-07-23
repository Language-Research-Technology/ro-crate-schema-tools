const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const { ROCrate } = require('ro-crate');
const { SossValidator } = require('../lib/soss-validator');

describe('Worlflow Profile Tests', function() {
  this.timeout(10000); // Allow enough time for file operations

  // Profile crate paths
  const wfProfileCratePath = path.join(
    __dirname, 
    '../profiles/workflow/profile-crate/ro-crate-metadata.json'
  );


  // Sample target crate path for testing
  const sampleCratePath = path.join(
    __dirname, 
    '../profiles/workflow/examples/minimal-examples/ro-crate-metadata.json'
  );

  let workflowProfileCrate;
  let sampleCrate;

  // Load the crates before running tests
  before(function() {
    try {
      // Load RO-Crate profile crate
      console.log('Loading Workflow profile crate from:', wfProfileCratePath);
      const profileData = fs.readFileSync(wfProfileCratePath, 'utf8');
      const profileJson = JSON.parse(profileData);
      workflowProfileCrate = new ROCrate(profileJson, { array: true, link: true });
      
      // Load sample target crate
      const sampleCrateData = fs.readFileSync(sampleCratePath, 'utf8');
      const targetJson = JSON.parse(sampleCrateData);
      sampleCrate = new ROCrate(targetJson, { array: true, link: true });
    } catch (error) {
      console.error('Error loading test crates:', error);
    }
  });


  
  it('It should be able to validate a workflow crate built up piece by piece', async function() {
    // Create a validator with the profile crate
    const validator = new SossValidator(workflowProfileCrate);
    const targetCrate = new ROCrate({ array: true, link: true });
    var results = await validator.validateCrate(targetCrate);
    expect(results).to.have.property('error');
    console.log(results);

    expect(results.error.length).to.equal(9);

    expect(results.error).to.deep.include({ 
        message: 'Entity ./ is missing required property name' 
      });

    targetCrate.rootDataset.name = 'Test Dataset';
    results = await validator.validateCrate(targetCrate);
    expect(results.error.length).to.equal(8);


    // The _Crate_ MUST specify a `license`. The license is assumed to apply to any content of the crate, unless overriden by `license` on individual `File` entities.
    // TODO - add the list of licenses from the profile to the schema

    targetCrate.rootDataset.license = 'CC By-NC 4.0';
    results = await validator.validateCrate(targetCrate);
    console.log(results);
    expect(results.error.length).to.equal(7);


    targetCrate.rootDataset.datePublished = '2023-07-01';
    results = await validator.validateCrate(targetCrate);
    console.log(results);
    expect(results.error.length).to.equal(6);


    targetCrate.rootDataset.description = 'This is a test workflow dataset';
    results = await 
    validator.validateCrate(targetCrate);
    expect(results.error.length).to.equal(5);
    console.log(results);

    // PROFILE TEXT:
    // The _Crate_ MUST contain a data entity of type `["File", "SoftwareSourceCode", "ComputationalWorkflow"]` as the _Main Workflow_. 
    // The _Crate_ MUST refer to the _Main Workflow_ via `mainEntity`. ]
    const mainWorkflow = {
      "@id": "workflow.txt",
      "@type": [
        "File",
        "SoftwareSourceCode",
        "ComputationalWorkflow"
      ],
      "name": "Test Workflow",
      "description": "This is a test workflow",
      };
    targetCrate.rootDataset.mainEntity =  mainWorkflow;
    results = await validator.validateCrate(targetCrate);
    console.log(results);

    expect(results.error).to.deep.include({
      message: 'Entity workflow.txt is missing required property programmingLanguage'
    })



   
    // "The Main Workflow MUST refer to its type via programmingLanguage.""
    // "To ensure compatibility, please include one of the following in the RO-Crate metadata, and refer to it from the Main Workflow’s programmingLanguage."
    targetCrate.pushValue(mainWorkflow, 'programmingLanguage', {
      "@id": "https://w3id.org/workflowhub/workflow-ro-crate#nextflow",
      "@type": "ComputerLanguage",
      "name": "Nextflow",
      "identifier": {
        "@id": "https://www.nextflow.io/"
      },
      "url": {
        "@id": "https://www.nextflow.io/"
      }
    });
   
    results = await validator.validateCrate(targetCrate);
    console.log(results);

    expect(results.error.length).to.equal(0);

    
    // The _Crate_ SHOULD contain a File `README.md` at the root level. If present, it SHOULD be `about` the _Crate_ `./` and SHOULD have `text/markdown` as its `encodingFormat`.

    // The _Crate_ COULD contain a Dataset (directory) data entity of type `["Dataset"]` with identifier `test/` to hold tests.

    // The _Crate_ COULD contain a Dataset (directory) data entity of type `["Dataset"]` with identifier `examples/` to hold examples.




    console.log(results);
    expect(results.error.length).to.equal(0);

  });







});