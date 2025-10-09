const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const { ROCrate } = require('ro-crate');
const { SossValidator } = require('../lib/soss-validator');

describe('SoSS+ Validator Tests for SOA profile', function() {
  this.timeout(10000); // Allow enough time for file operations

  // Profile crate paths
  const soaProfileCratePath = path.join(
    __dirname, 
    '../profiles/soa/profile-crate/ro-crate-metadata.json'
  );


  let soaProfileCrate;
  let sampleCrate;

  // Load the crates before running tests
  before(async function() {
      // Load RO-Crate profile crate
      console.log('Loading RO-Crate profile crate from:', soaProfileCratePath);
      const profileData = fs.readFileSync(soaProfileCratePath, 'utf8');
      const profileJson = JSON.parse(profileData);
      soaProfileCrate = new ROCrate(profileJson, { array: true, link: true });
      await soaProfileCrate.resolveContext()
  
     sampleCrate = new ROCrate( { array: true, link: true });
     await sampleCrate.resolveContext();

  });

  it('should be able to validate a soa crate', async function() {
    // Create a validator with the profile crate
    console.log('Creating SossValidator with profile crate');
    const validator = new SossValidator(soaProfileCrate);
    sampleCrate.addContext({})
    var results = await validator.validateCrate(sampleCrate);

    expect(results).to.have.property('error');

    expect(results).to.have.property('success');
    console.log(results);

    sampleCrate.addContext(

      {
        "soa": "http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#"
      }
    )


    sampleCrate.addEntity({
      "@id": "#Aservice",
      "@type": "soa:Service",
      "name": "Example Service"
    });

    var results = await validator.validateCrate(sampleCrate);
    console.log(results);

  });
});