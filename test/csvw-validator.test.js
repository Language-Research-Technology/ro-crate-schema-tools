const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const { ROCrate } = require('ro-crate');
const { SossValidator } = require('../lib/soss-validator');

describe('SoSS+ Validator Tests', function() {
  this.timeout(10000); // Allow enough time for file operations

  // Profile crate paths
  const csvwProfileCratePath = path.join(
    __dirname, 
    '../profiles/csvw-crate/profile-crate/ro-crate-metadata.json'
  );

  // Sample target crate path for testing
  const sampleCratePath = path.join(
    __dirname, 
    '../test_data/test-collections/ldaca-ro-crate-excel-template/ro-crate-metadata.json'
  );

  let csvwProfileCrate;
  let sampleCrate;

  // Load the crates before running tests
  before(function() {
    try {
      // Load RO-Crate profile crate
      console.log('Loading RO-Crate profile crate from:', csvwProfileCratePath);
      const profileData = fs.readFileSync(csvwProfileCratePath, 'utf8');
      const profileJson = JSON.parse(profileData);
      csvwProfileCrate = new ROCrate(profileJson, { array: true, link: true });

      // Load sample target crate
      console.log('Loading sample crate from:', sampleCratePath);
      const sampleCrateData = fs.readFileSync(sampleCratePath, 'utf8');
      const targetJson = JSON.parse(sampleCrateData);
      sampleCrate = new ROCrate(targetJson, { array: true, link: true });
    } catch (error) {
      console.error('Error loading test crates:', error);
      throw error; // Re-throw to fail the test if files can't be loaded
    }
  });

  it('should be able to validate a CSVW crate', async function() {
    // Create a validator with the profile crate
    console.log('Creating SossValidator with profile crate');
    const validator = new SossValidator(csvwProfileCrate);
    
    var results = await validator.validateCrate(sampleCrate);

    expect(results).to.have.property('error');
    expect(results).to.have.property('warning');
    expect(results).to.have.property('info');
    console.log(results);
  });
});