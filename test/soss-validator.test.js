const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const { ROCrate } = require('ro-crate');
const { SossValidator } = require('../lib/soss-validator');

describe('SoSS+ Validator Tests', function() {
  this.timeout(10000); // Allow enough time for file operations

  // Profile crate paths
  const rocProfileCratePath = path.join(
    __dirname, 
    '../profiles/ro-crate/profile-crate/ro-crate-metadata.json'
  );

  const ldacProfileCratePath = path.join(
    __dirname, 
    '../profiles/ldac/profile-crate/ro-crate-metadata.json'
  );


  // Sample target crate path for testing
  const sampleCratePath = path.join(
    __dirname, 
    '../test_data/sample-ro-crate-metadata.json'
  );

  let rocrateProfileCrate;
  let sampleCrate;

  // Load the crates before running tests
  before(function() {
    try {
      // Load RO-Crate profile crate
      console.log('Loading RO-Crate profile crate from:', rocProfileCratePath);
      const profileData = fs.readFileSync(rocProfileCratePath, 'utf8');
      const profileJson = JSON.parse(profileData);
      rocrateProfileCrate = new ROCrate(profileJson, { array: true, link: true });


    rocrateProfileCrate = new ROCrate(profileJson, { array: true, link: true });
      
      // Load sample target crate
      const sampleCrateData = fs.readFileSync(sampleCratePath, 'utf8');
      const targetJson = JSON.parse(sampleCrateData);
      sampleCrate = new ROCrate(targetJson, { array: true, link: true });
    } catch (error) {
      console.error('Error loading test crates:', error);
    }
  });

  it('should load the SoSS+ profile crate from path', function() {
    const validator = new SossValidator(rocProfileCratePath);
    const result = validator.loadProfileCrate();
    expect(result).to.be.true;
  });
  
  it('should accept a crate object in constructor', function() {
    const validator = new SossValidator(rocrateProfileCrate);
    expect(validator.profileCrate).to.equal(rocrateProfileCrate);
  });

  it('should validate using a crate path', async function() {
    const validator = new SossValidator(rocProfileCratePath);
    const loadResult = validator.loadProfileCrate();
    expect(loadResult).to.be.true;
    
    const results = await validator.validateCrate(sampleCratePath);
    
    expect(results).to.have.property('errors');
    expect(results).to.have.property('warnings');
    expect(results).to.have.property('info');
  });
  
  it('should be able to follow the basic RO-Crate rules', async function() {
    // Create a validator with the profile crate
    const validator = new SossValidator(rocrateProfileCrate);
    const targetCrate = new ROCrate({ array: true, link: true });
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
    expect(results.error.length).to.equal(0);

    expect(results).to.have.property('warning');
    expect(results).to.have.property('info');
  });

  it('should be able to deal with multiple required types on Root Data Entity', async function() {
    // Create a validator with the profile crate
    let validator = new SossValidator(rocrateProfileCrate);
    const targetCrate = new ROCrate({ array: true, link: true });
    var results = await validator.validateCrate(targetCrate);
    targetCrate.rootDataset.name = 'Test Dataset';
    targetCrate.rootDataset.license = 'CC By-NC 4.0';
    targetCrate.rootDataset.datePublished = '2023-07-01';
    targetCrate.rootDataset.description = 'This is an RO-Crate';
    results = await validator.validateCrate(targetCrate);
    expect(results.error.length).to.equal(0);
    // Now modify the Root Data Entity in the profile crate
    const rootDataEntity = rocrateProfileCrate.getEntity('#Root_Data_Entity');
    console.log('Root Data Entity:', rootDataEntity);
    rocrateProfileCrate.addValues(rootDataEntity, 'prov:specializationOf', 'https://schema.org/HairSalon');
    // New validator with the modified profile crate
    validator = new SossValidator(rocrateProfileCrate);
    results = await validator.validateCrate(targetCrate);
    expect(results.error.length).to.equal(1);

    expect(results.error).to.deep.include({ 
        message: 'Expected at least 1 instances of Root Data Entity :  http://schema.org/Dataset, https://schema.org/HairSalon, found 0' 
      });
    // Add the required types to the target crate
    targetCrate.rootDataset['@type'] = ["https://schema.org/HairSalon", "Dataset"]
    results = await validator.validateCrate(targetCrate);

    expect(results.error.length).to.equal(0);

    // Add the required types to the target crate
    targetCrate.rootDataset['@type'] = ["AnimalShelter", "Dataset"];
    results = await validator.validateCrate(targetCrate);
    expect(results.error.length).to.equal(1);

    // Add the more than the required type to the target crate
    targetCrate.rootDataset['@type'] = ["https://schema.org/HairSalon", "Dataset"];
    results = await validator.validateCrate(targetCrate);
    console.log(results);

    expect(results.error.length).to.equal(0);

    console.log(results);

  });

  it('AnimalShelter: should be able to deal with multiple "entry points', async function() {
    // Create a validator with the profile crate
    let validator = new SossValidator(rocrateProfileCrate);
    const targetCrate = new ROCrate({ array: true, link: true });
    var results = await validator.validateCrate(targetCrate);
    targetCrate.rootDataset.name = 'Test Dataset';
    targetCrate.rootDataset.license = 'CC By-NC 4.0';
    targetCrate.rootDataset.datePublished = '2023-07-01';
    targetCrate.rootDataset.description = 'This is an RO-Crate';
    results = await validator.validateCrate(targetCrate);
    expect(results.error.length).to.equal(0);
    // Now modify the Root Data Entity in the profile crate
    const rootDataEntity = rocrateProfileCrate.getEntity('#Root_Data_Entity');
    const rootDatEntity2_template =
    {
        "@id": "#Root_Data_Entity_too",
        "@type": "rdfs:Class",
        "rdfs:label": "Dataset",
        "name": "Dataset",
        "prov:specializationOf": [{
          "@id": "http://schema.org/Dataset"
  
        },
        {
          "@id": "http://schema.org/animalShelter"
        }]
      }
    rocrateProfileCrate.addEntity(rootDatEntity2_template);
    const metadataDesciptorAbout =  rocrateProfileCrate.getEntity('#RO-Crate_Metadata_Descriptor.about');
    rocrateProfileCrate.addValues(metadataDesciptorAbout, 'rangeIncludes', '#Root_Data_Entity_too');
    rocrateProfileCrate.addValues(rootDataEntity, 'prov:specializationOf', 'https://schema.org/HairSalon');

    // Now we have TWO potential signatures for the root data entity -- one that is a specialization of HairSalon and one that is a specialization of Animal Shelter
    // New validator with the modified profile crate
    validator = new SossValidator(rocrateProfileCrate);
    results = await validator.validateCrate(targetCrate);
    console.log('Results:', results);
    expect(results.error.length).to.equal(1);

    expect(results.error).to.deep.include({ 
        message: 'Expected at least 1 instances of Root Data Entity :  http://schema.org/Dataset, https://schema.org/HairSalon, found 0' 
      });
    // Add the required type to the target crate
     // Add the required types to the target crate
      // Add the required types to the target crate
    targetCrate.rootDataset['@type'] = ["HairSalon", "Dataset"]
    results = await validator.validateCrate(targetCrate);
    console.log(results);

    expect(results.error.length).to.equal(0);

     targetCrate.rootDataset['@type'] = ["AnimalShelter", "Dataset"];
     results = await validator.validateCrate(targetCrate);
     expect(results.error.length).to.equal(0);
 
     // Add the more than the required type to the target crate
     targetCrate.rootDataset['@type'] = ["AnimalShelter", "HairSalon", "Dataset"];
     results = await validator.validateCrate(targetCrate);
     expect(results.error.length).to.equal(0);
 
     console.log(results);

  });

  it('should be able to deal with the LDAC profile', async function() {
    // Create a validator with the ldac crate
    // Load profile crate
    const profileData = fs.readFileSync(ldacProfileCratePath, 'utf8');
    const profileJson = JSON.parse(profileData);
    const ldacProfileCrate = new ROCrate(profileJson, { array: true, link: true });
    const validator = new SossValidator(ldacProfileCrate);

    // Empty RO-Crate for testing
    const targetCrate = new ROCrate({ array: true, link: true });
    var results = await validator.validateCrate(targetCrate);
    expect(results).to.have.property('error');
    expect(results.error.length).to.equal(11);

    expect(results.error).to.deep.include({ 
        message: 'Entity ./ is missing required property name' 
      });

    // Add required properties
    targetCrate.rootDataset.name = 'Test Dataset';
    targetCrate.rootDataset.license =  {"@id": "https://creativecommons.org/licenses/by-nc/4.0/", "@type": "CreativeWork", "name": "CC By-NC 4.0"};
    targetCrate.rootDataset.datePublished = '2023-07-01';
    targetCrate.rootDataset.description = 'This is an RO-Crate';
    targetCrate.rootDataset['author'] = {"@type": "Person", "name": "John Doe", "@id": "https://orcid.org/0000-0002-1825-XXXX"};
    targetCrate.rootDataset['accountablePerson'] = {"@id": "https://orcid.org/0000-0002-1825-XXXX"};
    targetCrate.rootDataset['publisher'] = {"@id": "https://ror.org/0000-0002-1825-XXXX", "name": "Test Publisher", "@type": "Organization"};
    targetCrate.rootDataset['dc:rightsHolder'] = {"@id": "https://orcid.org/0000-0002-1825-XXXX"};

    results = await validator.validateCrate(targetCrate);
    //console.log(results);
    
  });

/*
This is a legacy test written for PARADISEC data when we were testing RO-Crate generation with the LDAC profile

The approach is to load the example PARADISEC data provided, show how it fails validation, and then fix the errors one by one

*/
  it('should be able to deal with PARADISEC Collections', async function() {
    // Create a validator with the ldac crate

    // Load profile crate
    const profileData = fs.readFileSync(ldacProfileCratePath, 'utf8');
    const profileJson = JSON.parse(profileData);
    const ldacProfileCrate = new ROCrate(profileJson, { array: true, link: true });
    const validator = new SossValidator(ldacProfileCrate);

    // PARADISEC Collection Crate for testing
    const paraCollectionPath = path.join(
        __dirname, 
        '../test_data/ldac/validator_tests/paradisec/collection/NT1/ro-crate-metadata.json'
      );
    const paraCollectionData = fs.readFileSync(paraCollectionPath, 'utf8');
    const paraCollectionJson = JSON.parse(paraCollectionData);
    const targetCrate = new ROCrate(paraCollectionJson, { array: true, link: true });
    var results = await validator.validateCrate(targetCrate);
    expect(results).to.have.property('error');

    // Check the number of errors 
    expect(results.error.length).to.equal(10);
    results = await validator.validateCrate(targetCrate);
    // Fix the license
    targetCrate.updateEntityId(
        '_:b1',
        '#LICENSE'
      );
      const license = targetCrate.getEntity(
        '#LICENSE'
      );
      license.URL = "https://www.paradisec.org.au/deposit/access-conditions/";
      // I am not a lawyer, but IMO the name on this license is not suitable
      // The term Open should be used for CC or GPL type licenses where data can be used without having to agree via a click-through
      // Also the use of the term "Open" may imply to some people that redistribution is permitted
      license.name = 'PARADISEC Public Access Conditions'; // Or something like that
      license['@type'] = ['File', 'DataReuseLicense'];
      license['Description'] = 'Put a summary of the licence conditions here';
      license['text'] = 'Put the license conditions here ... ';


    // Fix the publisher
    targetCrate.rootDataset.publisher = {
        '@id': 'http://nla.gov.au/nla.party-593909',
      };
    // Fix the datePublished
    targetCrate.rootDataset.datePublished = targetCrate.rootDataset.dateModified;

    // Adding missing author & accountablePerson -- use collector for now
    targetCrate.rootDataset.author = targetCrate.rootDataset.collector;
    targetCrate.rootDataset.accountablePerson = targetCrate.rootDataset.collector;
    // Fix the rightsHolder
    targetCrate.rootDataset['dct:rightsHolder'] = "SOME STRING HERE _ TODO this is probably not right"
    // THIS IS NOT AN ERROR but the subjectLanguage propety should not end with an "s"
    targetCrate.rootDataset.subjectLanguage = targetCrate.rootDataset.subjectLanguages;
    targetCrate.rootDataset.inLanguage = targetCrate.rootDataset.subjectLanguages;


    var results = await validator.validateCrate(targetCrate);

    //console.log(results);
    expect(results.error.length).to.equal(0);

    
  });




  /*
SOME OLD TESTS ON PARADISEC FROM THE OLD VALIDATOR

 const crate = new ROCrate(
      JSON.parse(
        fs.readFileSync(
          'test-data/paradisec/collection/NT1/ro-crate-metadata.json'
        )
      ),
      opt
    );
    var result = LdacProfile.validate(crate);

    // No conforms to indicating that the collection conforms to this profile we're validating here
    assert(hasClause(result.errors, rules.RepositoryCollection.conformsTo)); // Fails to conform

    // so add it
    crate.rootDataset.conformsTo = [{ '@id': constants.CollectionProfileUrl }];
    result = LdacProfile.validate(crate);
    assert(!hasClause(result.errors, rules.RepositoryCollection.conformsTo)); // Conforms (no error)



    result = LdacProfile.validate(crate);











  */
});