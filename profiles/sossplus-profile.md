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

To use this property in an RO-Crate profile you might want to finesse this definition. It is likely that don't have  `schema:Rating` and it is likely also that you would want to be referencing a subclass of `CreativeWork`, such as `ScholarlyWork`. In SoSS+ this can be achieved by defining a local property that does *exactly* what is required in the context of a profile.

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

- The use of locally defined properties and classes with local IDs. The IDs chosen here have names following a convention (this is not part of the profile semantics). The property `#prop_authorOfScholarlyWork` defined above is a profile-specific version the Schema property *in a particular context of use*. Not that there may be more than one local definition of these specialized properties in a profile.
- The use of `prov:specializationOf` to show that a rdf:Property (or an rdfs:Class as we will show below) is related to the a schema.org or other definition and is some sense a refinement of that class. Note that no class or property inheritance is implied it is *not* expected that this property definition inherits the range or domain of the general one.
- `sh:minCount` (from the SHACL spec) says that there must be at least on 'Author prop'

The above property example implies two more specialized Classes, shown below

```
{
      "@id": "#class_ScholarlyWork",
      "@type": "rdfs:Class",
      "prov:specializationOf" : {"@id": "https://schema.org/ScholarlyArticle"},
      "rdfs:comment": "A scholarly article in the context of this profile.",
      "rdfs:label": "ScholarlyWork"
},

{
      "@id": "#class_Person",
      "@type": "rdfs:Class",
      "prov:specializationOf" : {"@id": "https://schema.org/Person"},
      "rdfs:comment": "A person in the context of a scholarly work author.",
      "rdfs:label": "Person"
}
```

Continuing this chain of examples, a profile may mandate that the *Root Data Entity* of crates that conform to this profile must have a `schema:citation` property that

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





