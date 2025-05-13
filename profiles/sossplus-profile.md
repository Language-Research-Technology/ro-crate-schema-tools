# RO-Crate Profile SoSS+ (experimental) for Schema.org style schemas plus additional features for validation




# Explainer: From SoSS to SoSS+

Schema.org describes its "Schema" using RDF Properties (rdf:Property) and RDF Schema Classes (rdfs:Class). We will refer to this a *Schema.org Style Schema* - a SoSS for short. This section of the SoSS+ profile explains step by step the SoSS+ approach, starting from the simple SoSS approach.


For example here is the definition of Schema.org's Person class.

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

This profile is not CURRENTLY dealing with class and property inheritance in the examples. This is not because inheritance is not important -- to validate or configure and editor for Schema.org it is absolutely necessary to calculate the domains of properties, for example. In Crate-O we pre-calculate property domains and bake them in to a (huge) mode file. The reasoning for not including them. There are two reasons not to include inheritance in this profile:

1. The Schemas, (including things that might be called ontologies and vocabularies) that implementers use in RO-Crate are not all available in SoSS format -- so calculating inheritance paths could be very difficult and involve multiple RDF or other approaches.
2. In  a typical profile context, in most cases the aim is to provide a small set of Class and Properties that users are encouraged to use in the interests of findability and interoperability. 

That said -- there are use cases where inheritance might be useful, a community discussion will be needed to determine whether it is included in this profile and implementation notes or not.

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

To use this property in an RO-Crate profile you might want to finesse this definition. It is likely that don't have  `schema:Rating` and it is likely also that you would want to be referencing a subclass of `CreativeWork`, such as `ScholarlyWork`. In SoSS+ this can be achieved by defining a local property that does *exactly* what is required in the context of a profile. That is, there is a specialized set of definitions for the more general Schema.org and other schema terms which can be combined in useful ways without creating confusion or extra calculation for agents (people and machines).

```
{
      "@id": "#prop_authorOfScholarlyWork",
      "@type": "rdf:Property",
      "prov:specializationOf" : {"@id": "https://schema.org/author"},
      "rdfs:comment": "The author(s) of this scholarly work.",
      "rdfs:label": "author",
      "schema:domainIncludes": [
        {
          "@id": "#class_ScholarlyWork"
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

- The use of locally defined properties and classes with local IDs. The IDs chosen here have names following a convention (this is not part of the profile semantics). The property `#prop_authorOfScholarlyWork` defined above is a profile-specific version the Schema property *in a particular context of use*. Note that there may be more than one local definition of these specialized properties in a profile.
- The use of `prov:specializationOf` to show that a rdf:Property (or an rdfs:Class as we will show below) is related to the a schema.org or other definition and is some sense a refinement of that class. Note that no class or property inheritance is implied it is *not* expected that this property definition inherits the range or domain of the general one.
- `sh:minCount` (from the SHACL spec) says that there must be at least on 'Author prop'

The above property example implies two more specialized Classes, shown below

```
{
      "@id": "#class_ScholarlyArticle",
      "@type": "rdfs:Class",
      "prov:specializationOf" : {"@id": "https://schema.org/ScholarlyArticle"},
      "rdfs:comment": "A scholarly article in the context of this profile.",
      "rdfs:label": "ScholarlyArticle"
},

{
      "@id": "#class_Person",
      "@type": "rdfs:Class",
      "prov:specializationOf" : {"@id": "https://schema.org/Person"},
      "rdfs:comment": "A person in the context of a scholarly work author.",
      "rdfs:label": "Person"
}
```

Continuing this chain of examples, a profile may mandate that the *Root Data Entity* of crates that conform to this profile must have a `schema:citation` property that links to a 

By convention the RO-Crate Root Data Entity in a `SoSS+` schema will be `#class_RootDataEntity` 

(Note: This is a work in progress but I think using a 'magic' term will be necessary - implementors can use and RO-Crate library or perform RDF gymnastics to find the root)

Here is an example of another specialized Class.

```
{
      "@id": "#class_RootDataEntity",
      "@type": "rdfs:Class",
      "prov:specializationOf" : {"@id": "https://schema.org/Dataset"},
      "rdfs:comment": "The Root Data Entity for an RO-Crate that conforms to this profile.",
      "rdfs:label": "RootDataEntity"
}
```

And here's an example of a citation property that connects the Root Data Entity to a scholarly work - this is equivalent to saying "the Root Data Entity MUST reference at least one Scholarly Work with a citation property".

```
{
      "@id": "#prop_rootCitation",
      "@type": "rdf:Property",
      "prov:specializationOf" : {"@id": "https://schema.org/citation"},
      "rdfs:comment": "A citation or reference to a scholarly work.",
      "rdfs:label": "citation",
      "schema:domainIncludes": [
        {
          "@id": "#class_RootDataEntity"
        }
      ],
      "schema:rangeIncludes": [
        {
          "@id": "schema:ScholarlyArticle"
        }
      ],
      "sh:minCount": 1
}
```

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



