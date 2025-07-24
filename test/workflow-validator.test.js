const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const { ROCrate } = require("ro-crate");
const { SossValidator } = require("../lib/soss-validator");

describe("Worlflow Profile Tests", function () {
  this.timeout(10000); // Allow enough time for file operations

  // Profile crate paths
  const wfProfileCratePath = path.join(
    __dirname,
    "../profiles/workflow/profile-crate/ro-crate-metadata.json"
  );

  // Sample target crate path for testing
  const sampleCratePath = path.join(
    __dirname,
    "../profiles/workflow/examples/minimal-examples/ro-crate-metadata.json"
  );

  let workflowProfileCrate;
  let sampleCrate;

  // Load the crates before running tests
  before(function () {
    try {
      // Load RO-Crate profile crate
      console.log("Loading Workflow profile crate from:", wfProfileCratePath);
      const profileData = fs.readFileSync(wfProfileCratePath, "utf8");
      const profileJson = JSON.parse(profileData);
      workflowProfileCrate = new ROCrate(profileJson, {
        array: true,
        link: true,
      });

      // Load sample target crate
      const sampleCrateData = fs.readFileSync(sampleCratePath, "utf8");
      const targetJson = JSON.parse(sampleCrateData);
      sampleCrate = new ROCrate(targetJson, { array: true, link: true });
    } catch (error) {
      console.error("Error loading test crates:", error);
    }
  });

  it("It should be able to validate a workflow crate built up piece by piece", async function () {
    // Create a validator with the profile crate
    const validator = new SossValidator(workflowProfileCrate);
    const targetCrate = new ROCrate({ array: true, link: true });
    var results = await validator.validateCrate(targetCrate);
    expect(results).to.have.property("error");
  
    console.log("Initial validation results:", JSON.stringify(results,null,2));
    expect(results.error.length).to.equal(3);
    expect(results.rules["http://schema.org/name"]["./"].info).to.deep.include({
      message: "Entity ./ is missing required property name",
    });
    expect(results.rules["#prop_conformsTo_Root_Data_Entity"]["./"].info).to.deep.include({
      message: "Entity ./ is missing required property conformsTo",
    });
    // TODO Need to work out how to add back in the type CreativeWork without triggering the rootDatat error
    targetCrate.pushValue(targetCrate.root, "conformsTo", {
      "@id": "https://w3id.org/workflowhub/workflow-ro-crate/1.0",
      "@type": ["CreativeWork", "Profile"],
      name: "Workflow RO-Crate Profile (experimental)",
      version: "0.4.0",
      description:
        "This is a profile for RO-Crates that are used to describe workflows -- NOTE have moved the conformsTo to the ROOT Data Entity",
    });
    var results = await validator.validateCrate(targetCrate);
    //console.log("Validation results after adding conformsTo:", JSON.stringify(results,null,2));
    expect(results.rules["#prop_conformsTo_Root_Data_Entity"]).to.be.undefined;
  ;
  

    expect(results.error.length).to.equal(3);
   


    targetCrate.rootDataset.name = "Test Dataset";
    results = await validator.validateCrate(targetCrate);
    expect(results.error.length).to.equal(3);

    // The _Crate_ MUST specify a `license`. The license is assumed to apply to any content of the crate, unless overriden by `license` on individual `File` entities.
    // TODO - add the list of licenses from the profile to the schema

    targetCrate.rootDataset.license = "CC By-NC 4.0";
    results = await validator.validateCrate(targetCrate);
   
    targetCrate.rootDataset.datePublished = "2023-07-01";
    results = await validator.validateCrate(targetCrate);
  
    targetCrate.rootDataset.description = "This is a test workflow dataset";
    results = await validator.validateCrate(targetCrate);
    
    // PROFILE TEXT:
    // The _Crate_ MUST contain a data entity of type `["File", "SoftwareSourceCode", "ComputationalWorkflow"]` as the _Main Workflow_.
    // The _Crate_ MUST refer to the _Main Workflow_ via `mainEntity`. ]
    const mainWorkflow = {
      "@id": "workflow.txt",
      "@type": ["File", "SoftwareSourceCode", "ComputationalWorkflow"],
      name: "Test Workflow",
      description: "This is a test workflow",
    };
    targetCrate.rootDataset.mainEntity = mainWorkflow;
    results = await validator.validateCrate(targetCrate);

    //console.log("Validation results after adding mainworkflow", JSON.stringify(results,null,2));
    expect(results.rules["#Property_programmingLanguage_Workflow"]["workflow.txt"].info).to.deep.include({
      message:
        "Entity workflow.txt is missing required property programmingLanguage",
    });

    // "The Main Workflow MUST refer to its type via programmingLanguage.""
    // "To ensure compatibility, please include one of the following in the RO-Crate metadata, and refer to it from the Main Workflow’s programmingLanguage."
    targetCrate.pushValue(mainWorkflow, "programmingLanguage", {
      "@id": "https://w3id.org/workflowhub/workflow-ro-crate#nextflow",
      "@type": "ComputerLanguage",
      name: "Nextflow",
      identifier: {
        "@id": "https://www.nextflow.io/",
      },
      url: {
        "@id": "https://www.nextflow.io/",
      },
    });

    results = await validator.validateCrate(targetCrate);
    expect(results.success).to.deep.include({
      "message": "Found 0 valid instances of http://schema.org/CreativeWork, http://schema.org/MediaObject",
      "rule": "#class_CreativeWork_README"
    });


    // The _Crate_ SHOULD contain a File `README.md` at the root level. If present, it SHOULD be `about` the _Crate_ `./` and SHOULD have `text/markdown` as its `encodingFormat`.
    const readmeFile = {
      "@id": "README.md",
      "about": {"@id": "./" },
      "@type": ["File", 'CreativeWork'],
      name: "Readme file for the workflow crate",
      encodingFormat: "text/markdown",
      description: "This is a test README file for the workflow crate.",
    };
    targetCrate.pushValue(targetCrate.root, "about", readmeFile);
    results = await validator.validateCrate(targetCrate);
    expect(results.success).to.deep.include({
      "message": "Found 1 valid instances of http://schema.org/CreativeWork, http://schema.org/MediaObject",
      "rule": "#class_CreativeWork_README"
    });

    expect(results.success).to.deep.include({
      "message": "Found 0 valid instances of http://schema.org/Dataset",
      "rule": "#class_Dataset_Test_Directory"
    });

    // The _Crate_ COULD contain a Dataset (directory) data entity of type `["Dataset"]` with identifier `examples/` to hold examples.
     const examplesDataset = {
      "@id": "examples/",
      "@type": ["Dataset"],
      name: "Examples Dataset",
      description: "This is a test dataset for examples.",
    };
    targetCrate.pushValue(targetCrate.root, "hasPart", examplesDataset);
    results = await validator.validateCrate(targetCrate);
    console.log(JSON.stringify(results, null, 2));

    expect(results.success).to.deep.include({
      "message": "Found 1 valid instances of http://schema.org/Dataset",
      "rule": "#class_Dataset_Examples_Directory"
    });

    targetCrate.pushValue(targetCrate.root, "hasPart", readmeFile);
    results = await validator.validateCrate(targetCrate);

  


    // The _Crate_ COULD contain a Dataset (directory) data entity of type `["Dataset"]` with identifier `test/` to hold tests.
    const testDataset = {
      "@id": "test/",
      "@type": ["Dataset"],
      name: "Test Dataset",
      description: "This is a test directory in the RO-Crate for tests.",
    };
    targetCrate.pushValue(targetCrate.root, "hasPart", testDataset);
    results = await validator.validateCrate(targetCrate);   

    expect(results.success).to.deep.include({
      "message": "Found 1 valid instances of http://schema.org/Dataset",
      "rule": "#class_Dataset_Test_Directory"
    });



    console.log(JSON.stringify(results, null, 2));

    expect(results.error.length).to.equal(0);
  });
});
