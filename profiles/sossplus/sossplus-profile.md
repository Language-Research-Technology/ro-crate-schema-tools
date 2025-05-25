# RO-Crate Profile SoSS+ (experimental) for Schema.org style schemas plus additional features for validation

This is a work in progress draft implementing the ideas in [Issue 14 in this repository](https://github.com/Language-Research-Technology/ro-crate-schema-tools/issues/14).


## Background

There is no standard RO-Crate way to specify the rules in an RO-Crate profile apart from the inclusion of Schema.org Style Schema definitions (rdf:Property with range and domain and rdfs:Class) and these are not sufficient for implementing profile validation or for driving an editor like Crate-O. This work is an exploration of whether this existing approach used in RO-Crate for extending RO-Crate semantics at the crate level could be extended.

## Aims

The aim of the new experimental *SoSS+*  profile  will be to:
- If possible, provide a single-source declarative approach for: validators, editing applications and documentation tool chains. That is a the profile should be able to be used to configure an editor such as Crate-O, validate RO-Crate Metadata Documents and to generate the syntactic summary for a profile document.
  - Examples so far:
     - A simple, incomplete RO-Crate [SoSS+ Schema](../ro-crate/profile-crate/ro-crate-metadata.json) which covers the *RO-Crate Metadata Descriptor* and the *Root Data Entity* (minus conforms to ATM cos I have not had time) and a [human readable version](../ro-crate/profile-crate/profile-documentation.md) of it. NOTE: the documentation link has details at the bottom that link to the script that created it. There is also a start on a validation engine for SoSS+ in Javascript see the tests `npx mocha test/soss-validator.test.js -g basic`
     - An attempt at expressing the *Language Data Commons Profile* <http://w3id.org/ldac/profile>. The profile, generated from a [Crate-O mode file](../ldac/comprehensive-ldac-mode.json) (a tree-shaped JSON file used to configure the Crate-O editor and for validation) is [here](../ldac/profile-crate/ro-crate-metadata.json), and the generated profile doc (with some bugs) is [here](../ldac/profile-crate/ro-crate-metadata.json).

- Add as little as possible to the existing Schema.org Style Schema components Class & Property we already adopted
- Allow for "schemas" that represent constraints/opportunities for combining entities in an RO-Crate so it has profile conformance
- Use standard properties eg from SHACL or OWL wherever possible (There is an (undocumented???) reason that Schema.org did not adopt Owls properties for the range and domain of a class -- they are not simply statements of relationships in a schema they are 'infectious' -- ie if this property points to something then that means it has a particular type -- TODO more research on this.)
-  Align with the RO-Crate implementation approach of keeping things simple for programmers and avoid *requiring* direct use of complex RDF tools

- Add the following features to the SoSS approach:
  -  Minimum and maximum numbers of properties expected on an instance of a Class (I (@ptsefton) think this is the most often cited limitation)
  - Custom property definitions per context (domain) - allow a variant description (and min/max occurrences) by having local property definitions specialized to a particular context. Eg a property like `schema:name` which can be use just about anywhere can be specialized to say #name-Person_speaker and have a very specific range which maybe one Virtual Class 
  - A convention for representing the RO-Crate Root Data Entity
  - Deal with compound types in two ways:
     - Multiple @type values on an entity as per RO-Crate, in which case editors and validators *SoSS+*
     - "Virtual Classes" to be defined in a profile by creating a local identifier eg in the worfklow run crate which have multiple types.
  - Constraints such as this from [Workflow Run Crate](https://www.researchobject.org/workflow-run-crate/profiles/workflow_run_crate/) "Array MUST reference a CreativeWork entity with an @id URI that is consistent with the versioned Permalink of this document, and SHOULD also reference versioned permalinks for [Process Run Crate](https://w3id.org/ro/wfrun/process/0.5) and [Workflow RO-Crate](https://w3id.org/workflowhub/workflow-ro-crate/1.0)." (NOTE: Having SHOULD in specifications for machine validation leaves room for variation that can't be relied on in various uses cases -- need to establish why teams have taken this approach instead of mandating the structure they *need* and making optional things possible).
- Provide some guidance to RO-Crate adopters on how to work with linked data, design and document useful profiles

- Demonstrate prototype implementations that interoperate with existing tools and profiles including the Crate-O editor, it's mode files, the use of these mode files for validation and an existing tool that creates human-readable profile documents from text and mode files.


NOTE: If you are a profile or RO-Crate tool developer and you have specific requirements for things you would like to be able to express then please comment here or raise an issue on this repo.
# Implementation approach

This work is intended to follow the spirit of RO-Crate design and be something that is easy to implement, possible to code by hand if necessary and which does not depend on RDF-implementations which can be complex to understand and adopt and may not be available in all languages. Here are a couple of quotes from our article [Packaging research artefacts with RO-Crate](https://journals.sagepub.com/doi/10.3233/DS-210053)

> ### 2.3. Technical implementation of the RO-Crate model
> The RO-Crate conceptual model has been realised using JSON-LD and Schema.org in a prescriptive form as discussed in Section 2.2. The technical choices were made to cater for simplicity from a developer perspective (as introduced in Section 2.1). JSON-LD [112] provides a way to express Linked Data as a JSON structure, where a context provides mapping to RDF properties and classes. While JSON-LD cannot map arbitrary JSON structures to RDF, we found that it does lower the barrier compared to other RDF syntaxes, as the JSON syntax nowadays is a common and popular format for data exchange on the Web. However, JSON-LD alone has too many degrees of freedom and hidden complexities for software developers to reliably produce and consume without specialised expertise or large RDF software frameworks. A large part of the RO-Crate specification is therefore dedicated to describing the acceptable subset of JSON structures.


> A core norm of RO-Crate is that of simplicity, which sets the scene for how we guide developers to structure metadata with RO-Crate. We focus mainly on documenting simple approaches to the most common use cases, such as authors having an affiliation. This norm also influences our take on developer friendliness; for instance, we are using the Web-native JSON format, allowing only a few of JSON-LD’s flexible Linked Data features. Moreover, the RO-Crate documentation is largely built up by examples showcasing best practices, rather than rigorous specifications. We build on existing Web standards that themselves are defined rigorously, which we utilise “just enough” in order to benefit from the advantages of Linked Data (e.g., extensions by namespaced vocabularies), without imposing too many developer choices or uncertainties (e.g., having to choose between the many RDF syntaxes).

# Related work

There are a number of related projects going on to solve this issue taking various approaches; all of which may, of course be useful to some groups

- A couple of groups worked on using LinkML to express schemas - this was promising but appears to have failed as an approach at this stage
- RO-Crate Validator https://github.com/crs4/rocrate-validator based on hand-compiled SHACL shapes for a number of profiles. This approach is still a work in progress and it looks like all the SHACL must be hand-written and is independent of the profile text and validation (could be wrong on this)
- Michael Milton is working on another SHACL based proposal which is more aligned with RO-Crate practice in that the proposed rules are crate-compatible: https://github.com/WEHI-SODA-Hub/RoCrateProfileProposal  -- examples from this work look VERY similar in structure to some of the SoSS plus but use SHACL terms. If we were to adopt and approach like this it would only be a subset of SHACL that was included in an RO-Crate profile language drawing the line on what is and is not supported, and reasonable for for projects to implement in non SHACL environments would be crucial.
- This proposal https://github.com/crs4/rocrate-validator covers some of the same ground -- see the discussion on [this issue](https://github.com/ResearchObject/ro-crate/issues/399) for more context about its status

# Explainer: From SoSS to SoSS+ with examples


Schema.org describes its "Schema" using RDF Properties (rdf:Property) and RDF Schema Classes (rdfs:Class), the conventions are described in the Schema.org [Data Model](https://schema.org/docs/datamodel.html). We will refer to this approach a *Schema.org Style Schema* - a SoSS for short. This section of the SoSS+ profile explains step by step the SoSS+ approach, starting from the simple SoSS approach.


TODO: Expand on "Not all RDF Classes and properties are readily available in the SoSS format". In this profile we will use Schema to refer to all the ontology-like things.

TODO: Explain relationship between a base Schema / Ontology and the specific USE of that. In general, RO-Crate profiles are guides for how to create Data / Metadata  Packages FOR PARTICULAR PURPOSES. A profile draws on Schema.org, the handful of terms that RO-Crate adds to Schema.org, and when that is not sufficient, possibly a community-driven Schema for a particular domain.



For example here is the definition of Schema.org's Person class in the Schema.org Style Schema for Schema.org itself:

```
{
      "@id": "schema:Person",
      "@type": "rdfs:Class",
      "owl:equivalentClass": {
        "@id": "foaf:Person"
      },
      "rdfs:comment": "A person (alive, dead, undead, or fictional).",
      "rdfs:label": "Person",
      "rdfs:subClassOf": {
        "@id": "schema:Thing"
      },
      "schema:source": {
        "@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews"
      }
    },

```



## Inheritance

This class definition indicates that it is a sub-class of `schema:Thing`, as are all things in Schema.org and thus in a general purpose profile for Schema.org, properties from Thing would be allowed on Person.

This profile is not CURRENTLY dealing with class and property inheritance in the examples. This is not because inheritance is not important -- to validate or configure and editor for Schema.org it is absolutely necessary to calculate the domains of properties, for example. For example in the Crate-O editor, to generate the range of options for authoring Schema.org documents we pre-calculate property domains and bake them in to a (huge)'mode file' which defines an editing mode for Schema.org.  It is expected that in designing SoSS+ profiles this work will need to happen, but inheritance is not currently in this sprofile  specification.

There are two reasons not to include inheritance in this profile:

1. The Schemas, (including things that might be called ontologies and vocabularies) that implementers use in RO-Crate are not all available in SoSS format -- so calculating inheritance paths could be very difficult and involve multiple RDF or other approaches.
2. In  a typical profile context, in most cases the aim is to provide a small set of Class and Properties that users are encouraged to use in the interests of findability and interoperability. SoSS+ schemas allow for highly standardized potential structures to be expressed. 


NOTE:  -- there are use cases where inheritance might be useful, a community discussion will be needed to determine whether it is included in this profile and implementation notes or not.

And a property which references this class.

```
{
      "@id": "schema:author",
      "@type": "rdf:Property",
      "rdfs:comment": "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably.",
      "rdfs:label": "author",
      "schema:domainIncludes": [
        {
          "@id": "schema:Rating"
        },
        {
          "@id": "schema:CreativeWork"
        }
      ],
      "schema:rangeIncludes": [
        {
          "@id": "schema:Organization"
        },
        {
          "@id": "schema:Person"
        }
      ]
    }

```

There is an mix of terms from different namespaces here, from RDF, RDF Schema and schema.org -- we won't go into this in detail here but follow Schema.org's approach as per the RO-Crate approach. 

To use this property, `author` in an RO-Crate profile a more tightly constrained usage for the property is likely needed; for example in most academic contexts the Class  `schema:Rating`is not likely to be included in a profile and it is likely also that you would want to be referencing one or more of the subclass of `CreativeWork`, such as `ScholarlyArticle` and `Book`. In SoSS+ this can be achieved by defining a local property that does *exactly* what is required in the context of a profile. That is, there is a specialized set of definitions for the more general Schema.org and other schema terms which can be combined in useful ways without creating confusion or extra calculation of inheritance for agents (people and machines).

```
{
      "@id": "#prop_authorOfScholarlyWork",
      "@type": "rdf:Property",
      "prov:specializationOf" : {"@id": "https://schema.org/author"},
      "rdfs:comment": "The author(s) of this scholarly work.",
      "rdfs:label": "author",
      "schema:domainIncludes": [
        {
          "@id": "#class_MainArticle"
        }
      ],
      "schema:rangeIncludes": [
        {
          "@id": "#class_Person"
        }
      ],
       "sh:minCount": 1
    }

```

There are a couple of refinements in *SoSS+* that build on the basic SoSS approach.

- The use of OPTIONAL *SoSS+ Specialized Properties* and *SoSS+ Specialized Classes* with local IDs (TODO: Define these in terminology section). The IDs chosen here have names following a convention conventions (this is not part of the profile semantics). The property `#prop_authorOfScholarlyWork` defined above is a profile-specific version the Schema property *in a particular context of use*. Note that there may be more than one local definition of base class or property. (Base class definitons as show above MAY be included in a profile if specialization is not required)
- The use of `prov:specializationOf` to show that a rdf:Property (or an rdfs:Class as we will show below) is related to the a schema.org or other definition and is some sense a refinement of that class. Note that no class or property inheritance is implied it is *not* expected that this property definition inherits the range or domain of the general one.
- `sh:minCount` (from the SHACL spec) says that there must be at least on 'Author prop'



The above property example implies two more specialized Classes, shown below

```
{
      "@id": "#class_MainArticle",
      "@type": "rdfs:Class",
      "prov:specializationOf" : {"@id": "https://schema.org/ScholarlyArticle"},
      "rdfs:comment": "A scholarly article in the context of this profile.",
      "rdfs:label": "ScholarlyArticle"
},

{
      "@id": "#class_AuthorPerson",
      "@type": "rdfs:Class",
      "prov:specializationOf" : {"@id": "https://schema.org/Person"},
      "rdfs:comment": "A person in the context of a scholarly work author.",
      "rdfs:label": "Person"
}
```

Continuing this chain of examples, a profile may mandate that the *Root Data Entity* of crates that conform to this profile must have a `schema:citation` property that links to ScholarlyArticle, specifically, in the Profile definition a particular specialized version: `#class_ScholarlyArticle` as shown in the example above.

This is accomplished with a (proposed, experimental) RO-Crate Profile property `inRange` which specifies a list of specific profile-specialized classes.


```
{
      "@id": "#prop_rootCitation",
      "@type": "rdf:Property",
      "prov:specializationOf" : {"@id": "https://schema.org/citation"},
      "rdfs:comment": "A citation or reference to a scholarly work.",
      "rdfs:label": "citation",
      "schema:domainIncludes": [
        {
          "@id": "#Root_Data_entity"
        }
      ],
      "schema:rangeIncludes": [
        {
          "@id": "schema:ScholarlyArticle"
        }
      ],
      "sh:minCount": 1,
},
{
      "@id": "#Root_Data_Entity", 
      "@type": "rdfs:Class",
      "prov:specializationOf" : {"@id": "https://schema.org/Dataset"},
      "rdfs:comment": "A potential Root Data Entity for an RO-Crate that conforms to this profile (there may be more than one of these, with different @ids and different).",
      "rdfs:label": "Root_Data_Entity,"  
      "sh:minCount": 1,
      "sh:maxCount": 1,
},


```

# Algorithms for validation / configuring an editor

This section described the process of validating a Target Crate with a SoSS+ Crate. 

Note: in a typical profile these definitions for the RO-Crate Metadata Descriptor for could be taken as read -- possibly via the use of a conformsTo relationship/

It assumes that software is used that can find entities by their ID and calculate the JSON-LD @reverse properties for an entity. Eg the software can add a @reverse property to the example above to find items that reference. Represented as JSON-LD this look like
```
{
      "@id": "#RO-Crate_Metadata_Descriptor", 
      "@type": "rdfs:Class",
      "name": "RO-Crate Metadadata Description",
      "prov:specializationOf" : {"@id": "https://schema.org/CreativeWork"},
      "Description": "An RO-Crate @graph must contain an entity of Type @CreativeWork which is known as the RO-Crate Metadata descriptor.",
      "@reverse" : {
        "domainIncludes": {"@id": "#RO-Crate_Metadata_Descriptor.about"},
        "domainIncludes": {"@id": "#RO-Crate_Metadata_Descriptor.id"}
      } 
      "sh:minCount": 1,
      "sh:maxCount": 1,
     
}
```

The above is saying that the "  RO-Crate Metadata Descriptor is in a class of its own". This *Soss+ Specialized Class* describes a single  `CreativeWork` entity which must occur once within the RO-Crate graph.\ with two SoSS+ Specialized Properties.

The below example introduces two more conventions which illustrate how a  `SoSS+ Specialized Property` may have a fixed, mandatory value - via the `schema:value` keyword. 


```
  {
        "@id": "#RO-Crate_Metadata_Descriptor.id",
        "@type": "rdf:Property",
        "value": "ro-crate-metadata.json",
        "description": "The RO-Crate Metadata ",
        "rdfs:label": "@id",
        "domainIncludes": [
          {
            "@id": "#RO-Crate_Metadata_Descriptor"
          }
        ],
        "rangeIncludes": {"@id": "#Root_Data_Entity"},
        "sh:minCount": 1,
        "sh:maxCount": 1
   },
```





```
{
      "@id": "#ro-crate-metadata.json.about",
      "@type": "rdf:Property",
      "prov:specializationOf" : {"@id": "https://schema.org/about"},
      "description": "This property on the RO-Crate Metadata Descriptor references the Root Data Entity. I a SoSS+ profile there may be Schemas present for more than one 'flavour' of Root Data Enitty with different @type arrays or `@conformsTo` references (or other specializations). In this example there is a single reference.",
      "name": "about",
      "domainIncludes": [
        {
          "@id": "#ro-crate-metadata.json"
        }
      ]
      "rangeIncludes": {"@id": "#Root_Data_Entity"}
       "sh:minCount": 1,
       "sh:maxCount": 1
},

{
      "@id": "#Root_Data_Entity", 
      "@type": "rdfs:Class",
      "prov:specializationOf" : {"@id": "https://schema.org/Dataset"}, 
      "description": "The Root Data Entity for an RO-Crate that conforms to this profile.",
      "name": "Root_Data_Entity,"    
      "sh:minCount": 1, 
      "sh:maxCount": 1,
}
```


## Validate a Target Crate

(Assuming I got this right, which we won't know until we test it the rules for locating the RO-Crate Metadata will mean that this algorithm should work on a @graph -- I think)

## Validate the target Crate Graph

Keep a list of entities already validated so we don't go round in circles
- For each entity `s1` in the SoSS+ Crate with `@type` of `rdfs:Class`:
    - If `s1.@id` is `#ro-crate-metadata.json` fetch the entity `desc` with `@id` `ro-crate-metadata.json` if `desc` is not found or does not have a single type value of `rdfs:Class` and a single `prov:Specialization` of `http://schema.org/CreativeWork` then report an error  and stop execution
       - Validate the `desc`
    - Get the `@type` values `types` from  `s1.specializationOf` 
    - For each entity `t1` in the Target Crate Validate the entity and count the number of valid entities found as `classMatches`
    - Check that `classMatches` is in the range of sh:minCount and sh:maxCount specified on the *SoSS+ Specialized Class Definiton*
    
## Validate an entity (`t1` against the set of `types`)
       -- if this entity has already been validated then return
       
       - if `t1` has a `@type` array when expanded according the JSON-LD context which has all the types in `types`
         - Now look in @reverse to see if this this Class is referened to via rangeIncludes from an rdf:Property - if so check that the propery validates for this entity (does it occur the right number of times COULD BE maxCount 0 BTW) do the values match up with what is specified?
        
      remember that this entity has been validated

        
### Validate a property `p1` in the context ot a type `t1`
   We got here because the property schema was referenced (via @reverse) from a Class Rule - but check that the expectedDomain constrints are valid
  - Check the `rangeIncludes` - for each value
     - If `rangeIncludes` is an internal reference that is not to `rdfs:Class` 
        -- Check if it's a List or a Defined term list and if so does one of the values apply
        - If an rangeIncludes references a Class check that the right class is there by validating that entity - recursive call
  - Check the max and min constraints if an exact range for the number of expected value is specified and not present then report an error

## NOTES

### How this system finds the root data entity and checks that the RO-Crate has a metadata descriptor

When this process comes across the required *SoSS+ Specialized Class Definition* for "#ro-crate-metadata.json" it will:
    - Look in the Target Crate for the "magic" `ro-crate-metadata.json` elements of `@type` CreativeWork
      - Check each CreativeWork to see if it has all the required constraints - in this case that there is an entity in the SoSS+ crate of @type `rdf:Property` which specializes `http://schema.org/about` - which in turn references the `SoSS+ Specialized Class Definion` (`#Root_Data_Entity` in the example above) -- 


For each entity in the Target Crate's @graph.

Validate the entity (see below)









## Locate the RO-Crate Profile Specific Class(es) for the Root Data Entity

As with RO-Crate itself, SoSS+ uses a convention for finding schema definitions for the *Root Data Entity* in a profile.

With the  `@graph` from the SoSS+ Crate:

Find the entity `#ro-crate-metadata.json` known as the 'RO-Crate Metadata Identifier Profile' -- this @id is the *only* @id in the SoSS+ specification which is specific - all other names are local identifiers starting with # or IRIs for terms defined elsewhere.

If there is no entity or it does not have a single type value of "rdfs:Class" and a single prov:Specialization of "http://schema.org/CreativeWork" then report an error  and stop execution.

Find a reverse reference from  about property and get that entity -known as the *\Root Data Entity Profile Locator*. (The example here has an id of "#ro-crate-metadata.json.about" but any unique local ID could be used) if the entity does not have a single `@type ` value of "rdf:Property" and a single `prov:Specialization` value of "http://schema.org/about" return an error.

On *Root Data Entity Profile Locator* get the `rangeIncludes` property. Check -- each of the values references a Profile definition for the Root data entity (NOTE: for now we will deal with jsut one)


From the Target Crate get the Root Data Entity.






## Validate an entity





## Lists of specific values for properties Defined terms & conformsTo

When adding schema terms for use in a specific domain, one approach is to use DefinedTerms rather than classes, for example in the Language Data Commons Profile (https://w3id.org/ldac/profile) which uses a set of metadata terms derived from an previous vocabulary (OLAC), a lot  of language-specific terms are included using this method. 

Here are two defined terms which are part of a DefinedTermSet (NOTE: as this was generated from a mode file the actual)
```
{
    "@id": "ldac:ElicitationTask",
    "@type": "DefinedTerm",
    "description": "The collection protocol includes a task-based prompt to participants.",
    "inDefinedTermSet": {
    "@id": "ldac:CollectionProtocolTypeTerms"
    },
    "name": "ElicitationTask"
},
{
    "@id": "ldac:TextSelectionCriteria",
    "@type": "DefinedTerm",
    "description": "A description of the criteria used to select texts in a collection.",
    "inDefinedTermSet": {
    "@id": "ldac:CollectionProtocolTypeTerms"
    },
    "name": "TextSelectionCriteria"
},
```



{
    "@id": "#itemlist_collectionProtocolType_CollectionProtocol",
    "@type": "schema:ItemList",
    "name": "Values for collectionProtocolType",
    "description": "Predefined values for the collectionProtocolType property",
    "itemListElement": [
    {
        "@id": "ldac:ElicitationTask"
    },
    {
        "@id": "ldac:TextSelectionCriteria"
    }
    ]
},
{
      "@id": "#prop_collectionProtocolType_CollectionProtocol",
      "@type": "rdf:Property",
      "rdfs:label": "collectionProtocolType",
      "name": "collectionProtocolType",
      "prov:specializationOf": {
        "@id": "http://purl.archive.org/language-data-commons/terms#CollectionProtocolType"
      },
      "schema:domainIncludes": {
        "@id": "#class_CollectionProtocol"
      },
      "rdfs:comment": "The kind of collection protocol this is.",
      "schema:itemListElement": {
        "@id": "#itemlist_collectionProtocolType_CollectionProtocol"
      },
      "schema:rangeIncludes": {
        "@id": "#itemlist_collectionProtocolType_CollectionProtocol"
      },
      "sh:maxCount": 1
    },


```
