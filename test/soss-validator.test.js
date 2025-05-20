const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const { ROCrate } = require('ro-crate');
const { SossValidator } = require('../lib/soss-validator');

describe('SoSS+ Validator Tests', function() {
  this.timeout(10000); // Allow enough time for file operations

  // Profile crate path
  const profileCratePath = path.join(
    __dirname, 
    '../profiles/ro-crate/profile-crate/ro-crate-metadata.json'
  );

  // Sample target crate path for testing
  const targetCratePath = path.join(
    __dirname, 
    '../test_data/sample-ro-crate-metadata.json'
  );

  let profileCrate;
  let targetCrate;

  // Load the crates before running tests
  before(function() {
    try {
      // Load profile crate
      console.log('Loading profile crate from:', profileCratePath);
      const profileData = fs.readFileSync(profileCratePath, 'utf8');
      const profileJson = JSON.parse(profileData);
      profileCrate = new ROCrate(profileJson, { array: true, link: true });
      
      // Load target crate
      const targetData = fs.readFileSync(targetCratePath, 'utf8');
      const targetJson = JSON.parse(targetData);
      targetCrate = new ROCrate(targetJson, { array: true, link: true });
    } catch (error) {
      console.error('Error loading test crates:', error);
    }
  });

  it('should load the SoSS+ profile crate from path', function() {
    const validator = new SossValidator(profileCratePath);
    const result = validator.loadProfileCrate();
    expect(result).to.be.true;
  });
  
  it('should accept a crate object in constructor', function() {
    const validator = new SossValidator(profileCrate);
    expect(validator.profileCrate).to.equal(profileCrate);
  });

  it('should validate using a crate path', async function() {
    const validator = new SossValidator(profileCratePath);
    const loadResult = validator.loadProfileCrate();
    expect(loadResult).to.be.true;
    
    const results = await validator.validateCrate(targetCratePath);
    
    expect(results).to.have.property('errors');
    expect(results).to.have.property('warnings');
    expect(results).to.have.property('info');
  });
  
  it('should be able to follow the basic RO-Crate rules', async function() {
    // Create a validator with the profile crate
    const validator = new SossValidator(profileCrate);
    const targetCrate = new ROCrate(targetCratePath, { array: true, link: true });
    var results = await validator.validateCrate(targetCrate);
    expect(results).to.have.property('error');
    console.log(results);

    expect(results.error.length).to.equal(7);

    expect(results.error).to.deep.include({ 
        message: 'Entity ./ is missing required property name' 
      });

    targetCrate.rootDataset.name = 'Test Dataset';
    results = await validator.validateCrate(targetCrate);
    console.log(results);
    expect(results.error.length).to.equal(6);

    targetCrate.rootDataset.license = 'CC By-NC 4.0';
    results = await validator.validateCrate(targetCrate);
    console.log(results);
    expect(results.error.length).to.equal(5);

    targetCrate.rootDataset.datePublished = 'JULY';
    results = await validator.validateCrate(targetCrate);
    console.log(results);
    expect(results.error.length).to.equal(5);

    targetCrate.rootDataset.datePublished = '2023-07-01';
    results = await validator.validateCrate(targetCrate);
    console.log(results);
    expect(results.error.length).to.equal(4);


    targetCrate.rootDataset.description = 'This is an RO-Crate';
    results = await validator.validateCrate(targetCrate);
    console.log(results);
    expect(results.error.length).to.equal(0);

    expect(results).to.have.property('warning');
    expect(results).to.have.property('info');
  });

  
  

  it('It should be able to validate a basic RO-Crate', async function() {

    const validator = new SossValidator(profileCrate);
    const targetCrate = new ROCrate();
    const results = await validator.validateCrate(targetCrate);
    
    expect(results).to.have.property('errors');
    expect(results).to.have.property('warnings');
    expect(results).to.have.property('info');
  });
});