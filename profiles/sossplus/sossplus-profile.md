# "*RO-Crate Schema*" (experimental) for Schema.org style schemas plus additional features for validation

This is a work in progress draft implementing the ideas in [Issue 14 in this repository](https://github.com/Language-Research-Technology/ro-crate-schema-tools/issues/14).

Note: Previous drafts of this work used the term "SoSS+ or SoSS Plus".

There is no standard RO-Crate way to specify the rules in an RO-Crate profile apart from the inclusion of Schema.org Style Schema definitions (rdf:Property with range and domain and rdfs:Class) and these are not sufficient for implementing profile validation or for driving an editor like Crate-O. This work is an exploration of whether this existing approach used in RO-Crate for extending RO-Crate semantics at the crate level could be extended.



## Aims

The following requirements were used for this work. The requirements are copied from [a document which is available for comment](https://docs.google.com/document/d/17WRkGPIGtoQoSPlTbStBKUyHTzjrOZb620S1gdk0ei8/edit?tab=t.0) as of 2025-08-04.



> # Draft Requirements
> 
> The following are some draft requirements for a [[Schema
> Language]](#schema-language) which can be used for General
> Purpose Schemas and Profile Specific Schemas:
> 
> 1.  MUST follow the RO-Crate design approach of **implementation neutral
>     JSON-LD in a graph** so that **declarative, implementation neutral
>     machine-actionable profiles** may be included in Profile Crates.
>     This should be:
> 
>     a.  **Declarative** - that is, a [[Schema
>         language]](#schema-language) for expressing Class
>         and Property definitions
> 
>     b.  **Implementation neutral** - not tied to tools available ina
>         limited range of environments
> 
>     c.  **Easily implementable** in a general purpose programming
>         language
> 
> 2.  MUST allow for communities to "RO-Crate-ize" heterogeneous
>     **existing vocabularies** which may use terms specified in RDF
>     schema languages (OWL, etc) by providing a normalized [[General
>     Purpose Schema]](#general-purpose-schema) and/or
>     particular [[Profile Specific
>     Schema]](#profile-specific-schema) which may combine
>     terms from a variety of Schemas. (RO-Crate itself uses a core of
>     [[Schema.org]](http://schema.org) with terms from other
>     schemas).
> 
> 3.  MUST allow a Profile Crate containing [[Profile Specific
>     Schema]](#profile-specific-schema) to be self-contained
>     with schema definitions, sufficient for validation purposes
> 
>     a.  May be "compiled" or "composed" from multiple sources.
> 
>     b.  Should not require fetching of resources from outside the
>         profile crate
> 
> 4.  MUST be expressed in RO-Crate friendly JSON-LD (this will allow for
>     making schemas with existing RO-Crate editors, libraries and other
>     tools).
> 
> > Remember, here we are talking here about a potential RO-Crate
> > compatible way of describing Schemas -- there is nothing stopping
> > communities using OTHER Schema Languages or validation methods and
> > referencing them from a profile crate if this does not suit).
> 
> 5.  SHOULD build on or MAY replace (if there is a compelling reason) the
>     existing approach to external vocabs which is based on,
>     [[SoSS]](#soss-schema.org-style-schema) which implements
>     [[Schema.org]](http://schema.org) Data Model (That is,
>     the solution MUST NOT require, say, an rdf:Property element as per
>     the existing spec AND an additional constraint which is an
>     additional entity to specify extra constraints)
> 
> 6.  MAY reference external parts? (this was raised in recent
>     consultations)
> 
>     a.  External resources like SHACL using a typing/profile mechanism
> 
>     b.  Consider inheritance of profiles or schemas, against #2
> 
> 7.  **In a General Purpose Schema context**:
> 
>     a.  MUST allow for a community to create their own SoSS if needed
>         (after due diligence),
> 
>         i.  If there are terms that are **not defined elsewhere**
> 
>         ii. Or to create a **normalized vocabulary that combines terms
>             from different schemas** which may not be natively 'RO-Crate
>             friendly'.
> 
>     b.  MUST allow for inheritance (subClasses and subProperties) for
>         compactness
> 
>     c.  MUST allow for inclusion of Defined Terms and other boilerplate
>         entities that are part of the vocabulary of a domain
> 
>     d.  MAY not be self-contained
> 
> > NOTE: RO-crate can already be used for this, as the Language Data
> > Commons Schema demonstrates.
> > [[https://w3id.org/ldac/terms]](https://w3id.org/ldac/terms)
> 
> 8.  **In a Profile Specific Schema context**:
> 
>     a.  MUST allow for Classes and Properties to be specialized
>         (typically more tightly constrained than a definition in a
>         General Purpose Schema) for use in particular contexts. For
>         example, the name property MAY have different descriptions and
>         validation rules when used on a Person vs being used on a
>         CreativeWork within a profile - and of course profile specific
>         definitions are more tightly specified than in a general schema.
> 
>     b.  MUST be self-contained - if a property has a range of potential
>         type values then the Class definitions for each type must be
>         included.
> 
>         i.  MUST NOT require validators to process inheritance -- this
>             should be compiled into a set of specific expectations about
>             which properties are allowed/required on particular types of
>             entity. (this is based on the assumption that in a typical
>             repository or other environment which specifies a profile -
>             the aim is interoperability and mutual intelligibility)
> 
>     c.  MUST support machine validation of the following:
> 
>         i.  Range / domain constraints for classes and properties by
>             type (values could be JSON-LD entities such as defined terms
>             (in sets), standard values (such as ways of representing
>             programming or natural languages) or scalar types such as
>             strings or dates, see next point)
> 
>         ii. Support for a range of non-entity scalar values such as
>             dates, integers, booleans, URIs., patterns (eg Regex) (we
>             could borrow a type system from JSON-Schema / XML or
>             similar)
> 
>         iii. Special rules for one or more types of Root Data entity (eg
>              in the Language Data Commons profile has two possible
>              levels of granularity for RO-Crates; the Root Data Entity
>              may have \@type \["Dataset", "RepositoryCollection"\] or
>              \["Dataset", "RepositoryObject"\])
> 
>         iv. Support for Crate-fragment profiles - eg a conformsTo on a
>             CSVW table schema that might apply to part of a crate
> 
>         v.  Range / domain cardinality (relates to existing support for
>             MUST SHOULD COULD etc)
> 
>         vi. Occurrence of entities in the graph without other
>             constraints - eg "there must be exactly one image entity in
>             a crate" but not important what prop links to it
> 
>         vii. Support for complex chaining? eg the hasPart requirement
>              that File entities are linked from the root? (NOTE, IMO
>              This is something that (a) may need to be coded
>              procedurally in validators rather than expressed in a
>              declarative way and (b) could be dropped in RO-Crate 2 --
>              if we have clear definitions for attached and Detached
>              entities then what is the point the requirements that they
>              be listed? Validators and visualizers can find them.)
> 
>     d.  MUST allow for generation of human readable documentation for
>         inclusion in profile documents (combined with explanatory text
>         and examples) from the schema.
> 
>     e.  MUST have a demonstrated ability to drive an RO-Crate editor
>         such as Crate-O, Nova-Crate either directly of via
>         transformations of Schema terms into an editor-specific
>         configuration


NOTE: If you are a profile or RO-Crate tool developer and you have specific requirements for things you would like to be able to express then [comment on the requirements document](https://docs.google.com/document/d/17WRkGPIGtoQoSPlTbStBKUyHTzjrOZb620S1gdk0ei8/edit?tab=t.0).


# Explainer: extending Schema.org Style Schemas into a full "RO-Crate schema language"


Schema.org describes its "Schema" using RDF Properties (rdf:Property) and RDF Schema Classes (rdfs:Class), the conventions are described in the Schema.org [Data Model](https://schema.org/docs/datamodel.html). We will refer to this approach a *Schema.org Style Schema* - a SoSS for short. This section of the *RO-Crate Schema * profile explains step by step the *RO-Crate Schema * approach, starting from the simple SoSS approach.
ain.

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

This class definition indicates that it is a sub-class of `schema:Thing`, as are all things in Schema.org and thus in a [General Purpose Schema] for Schema.org, properties from Thing would be allowed on Person.

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

There is an mix of terms from different namespaces here, from RDF, RDF Schema and schema.org -- we won't go into this in detail here but follow Schema.org's approach as RO-Crate has done since its inception. 


## Profile Specific Schemas

This section looks at how the SoSS approach can be extended to provide profile-specific schema definitions which meet the requirements set out above.

In summary, the approach builds on existing RO-Crate practice with a few extensions (REQ5):

- Use the same conventions as Schema.org, expressed as RO-Crate entities (as per existing RO-Crate practice)
- Add `minCount` and `maxCount` properties to *Property* and *Class* definitions to allow for the expression of constraints such as "CreativeWork entities must have at least one Author which MUST be a Person or Organization" or "Crates adhering to this profile MUST have at least one entity with with `SoftwareApplication` as one of its `@type` values"
- Introduce the concept of profile-specific definitions which are specializations of properties and classes (which may also be defined in General Purpose Schemas)
- Allow for a property to have a specific scalar value via the `schema:value` property -- this is useful for profiles which want to enforce contstraints at this level for example in RO-Crate there is a rule that the *RO-Crate Metadata Descriptor* MUST have an `@id` of 

Continuing the example above, to use the property, `author` in an RO-Crate profile a more tightly constrained usage for the property is likely needed; for example in most academic contexts the Class  `schema:Rating`is not likely to be included in a profile and it is likely also that you would want to be referencing one or more of the subclass of `CreativeWork`, such as `ScholarlyArticle` and `Book`. In *RO-Crate Schema * this can be achieved by defining a special local property that does *exactly* what is required in the context of a profile. That is, there is a specialized set of definitions for the more general Schema.org and other schema terms which can be combined in useful ways without creating confusion or extra calculation of inheritance for agents (people and machines).

```
{
      "@id": "#prop_authorOfScholarlyWork", <--- Has an arbitrary local ID which
      "@type": "rdf:Property", <--- Following Schema.org's model this represents an RDF property
      "prov:specializationOf" : {"@id": "https://schema.org/author"}, <--- This is the property that instances of this rule will have
      "rdfs:comment": "The author(s) of this scholarly work.", <---- The 'definition' of the property is context specific to its domain of use (see below)
      "rdfs:label": "author",
      "schema:domainIncludes": [
        {
          "@id": "#class_MainArticle"  <---- This specialized `schema:author` property is found in the context of a specialized class
        }
      ],
      "schema:rangeIncludes": [
        {
          "@id": "#class_Person" <---- The range of values for this is another specialized class
        }
      ],
       "sh:minCount": 1.   <---- This 'minCount' property is borrowed from SHACL it is saying that there MUST be at least one `schema:author` property that meets this property definiton 
    }

```

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
      "rdfs:comment": "The Root Data Entity for a crate",
      "rdfs:label": "Root_Data_Entity,"  
      "sh:minCount": 1,
      "sh:maxCount": 1,
},

```

Finally, to conclude this example, we need to link the definition of the *RO-Crate Root Data Entity* to the *RO-Crate Metadata Descriptor*.



```
 {
      "@id": "#RO-Crate_Metadata_Descriptor", <-- This is a definition for the RO-Crate Metadata Descriptor which is the "magic" ID for RO-Crate
      "@type": "rdfs:Class",
      "rdfs:label": "RO-Crate Metadadata Descriptor",
      "prov:specializationOf": { "@id": "http://schema.org/CreativeWork" }, <-- This is the required @type for an RO-Crate Metadata Descriptor
      "Description": "An RO-Crate @graph must contain an entity of Type @CreativeWork which is known as the RO-Crate Metadata descriptor.",
      "sh:minCount": 1,
      "sh:maxCount": 1 <-- Max and min count of 1 means MUST have exactly ONE instance of an entity that meets the criteria
    },
    {
        "@id": "#RO-Crate_Metadata_Descriptor.id",
        "@type": "rdf:Property",
        "value": "ro-crate-metadata.json", <--- Using schema.org's `value` property here to express that the id 
        "description": "The RO-Crate Metadata ",
        "rdfs:label": "@id", <--- Strictly speaking JSON-LD @id does not have a URI but this is a way so this property is not a specializtion of anything
        "domainIncludes": [
          {
            "@id": "#RO-Crate_Metadata_Descriptor" <-- This property MUST be present on the Metadata Descriptors see the max and min count props below
          }
        ],
        "rangeIncludes": {"@id": "#Root_Data_Entity"},
        "sh:minCount": 1,
        "sh:maxCount": 1
   },
    {
      "@id": "#RO-Crate_Metadata_Descriptor.about",
      "@type": "rdf:Property",
      "prov:specializationOf": { "@id": "http://schema.org/about" },
      "description": "This property on the RO-Crate Metadata Descriptor references the Root Data Entity. In a SoSS+ profile there may be Schemas present for more than one 'flavour' of Root Data Enitty with different @type arrays or `@conformsTo` references (or other specializations). In this example there is a single reference.",
      "name": "about",
      "domainIncludes": [
        {
          "@id": "#RO-Crate_Metadata_Descriptor"
        }
      ],
      "rangeIncludes": { "@id": "#Root_Data_Entity" },
      "sh:minCount": 1,
      "sh:maxCount": 1
    },
```

The draft Profile Specific RO-Crate schema for RO-Crate itself goes into more detail about this.


# Algorithms for validation / configuring an editor

This section describes the process of validating a Target Crate with a *RO-Crate Schema* Crate, based on the implementation in the `soss-validator.js` library.

## Validation Process Overview

The validation process follows these high-level steps:

1. Load both the Profile Crate (containing schema definitions) and the Target Crate (to be validated)
2. Extract all schema definitions from the Profile Crate, organizing them by type (Classes, Properties, ItemLists)
3. Validate the Target Crate against these schema definitions
4. Generate structured validation results with error, warning, and info messages

### Key Concepts Implemented in the Validator

The current implementation in `soss-validator.js` uses these techniques:

1. **Entity Type Resolution**: The validator resolves entity types through the `prov:specializationOf` property, creating a mapping between specialized types in the profile and their schema.org (or other) base types.

2. **Bidirectional Property Validation**: Properties are validated both from the domain perspective (checking if entities have required properties) and from the range perspective (checking if property values have the correct types).

3. **Cardinality Checking**: The validator enforces `sh:minCount` and `sh:maxCount` constraints for both classes and properties.

4. **Value Validation**: Property values are validated against their specified ranges, which can include:
   - Primitive types (Text, Number, Boolean, Date)
   - Entity references (validated recursively)
   - ItemLists (for enumerated valid values)
   - Fixed values (using `schema:value`)

5. **Both Recursive and iterative Validation**  Entities are validated recursively, following references to ensure that relationships as well as an exhaustive pass of the `@graph` being conducted to make sure unconnected entities are also validated, keeping track of which entities have already been validated against a given rule and only performing validation once.

### Detailed Validation Algorithm

### Handling Multiple Types and Inheritance

The validator handles multiple type values in entities and class inheritance:

1. When an entity has multiple type values, the validator checks it against all matching class definitions
2. Through `prov:specializationOf`, the validator can map specialized classes to their parent classes
3. The validator ensures an entity satisfies all required properties for all of its types

### Editor Configuration Generation

Based on the validator's approach, an editor configuration can be generated that:

1. Creates form sections for each class type
2. Creates form fields for each property within its appropriate section
3. Enforces required fields based on `sh:minCount` values
4. Provides appropriate input controls based on range types:
   - Text inputs for string values
   - Numeric inputs for numbers
   - Date pickers for dates
   - Dropdown selectors for ItemList values
   - Entity reference selectors for object references

This mapping between validation schema and editor configuration allows for dynamic generation of editing interfaces that enforce the same constraints as the validator.

### Special Validation Cases

1. **ItemList Validation**: When a property's range includes an ItemList, the validator checks if the property value matches one of the items in the list:
2. **Fixed Value Validation**: When a property has a `schema:value` constraint, the validator checks if the property value exactly matches the specified value:
3. **Scalar Type Validation**: The validator supports different scalar types including string, number, boolean, and date TODO: This needs to be extended, see REQ8.ii
