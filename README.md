# ro-crate-schema-tools

This repository contains node-based tools for Research Object Crate ([RO-Crate](https://www.researchobject.org/ro-crate/)) to be used for creating and distributing Schema.org Style Schemas (SOSSs) and Mode Files for configuring the [Crate-O editor](https://github.com/Language-Research-Technology/crate-o).

## Install

```bash
npm install
```

This project uses Git submodules for test data and schema definitions. The `npm install` command will automatically initialize the submodules.

### Manual submodule initialization

If you need to manually initialize the submodules:

```bash
git submodule update --init
```

### Submodules included

The submodules include:
- Test data: `test_data/UDHR-Translations` (locked to commit db6467c)
- Schema definitions: `schemas/danala-schema`

### For developers: Adding submodules

To add the test data submodule:

```bash
git submodule add https://github.com/Language-Research-Technology/test-collections.git test_data/UDHR-Translations
cd test_data/UDHR-Translations
git checkout db6467c
cd ../..
```

To add the schema definitions submodule:

```bash
git submodule add https://github.com/Language-Research-Technology/danala-schema.git schemas/danala-schema
```


## Background: What's a Schema.org Style Schema?

Schema.org is available in schema.org [JSON-LD format](https://schema.org/version/latest/schemaorg-current-https.jsonld).

For example, `schema:Dataset` has the following definition:

```
   {
      "@id": "schema:Dataset",
      "@type": "rdfs:Class",
      "owl:equivalentClass": [
        {
          "@id": "dcmitype:Dataset"
        },
        {
          "@id": "dcat:Dataset"
        },
        {
          "@id": "void:Dataset"
        }
      ],
      "rdfs:comment": "A body of structured information describing some topic(s) of interest.",
      "rdfs:label": "Dataset",
      "rdfs:subClassOf": {
        "@id": "schema:CreativeWork"
      },
      "schema:source": {
        "@id": "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_DatasetClass"
      }
   }
```

Note that while there is a `schema:Class` Class, we follow Schema.org practice and use `rdfs:Class` and `rdf:Property` for describing classes and schemas.


## About the tools

These tools:

-  Create SOSSs from example RO-Crates.
-  Create (and soon, incrementally update) RO-Crate Editor Mode Files that can be used to drive editors such as Crate-O.
-  Produce static markdown and HTML documentation for SOSSs. You can put this on the web and use it to provide resolution to human-readable definitions of your linked data terms.


## To generate documentation for a SOSS Crate

To see the usage, type `>> node roc-schema.js  -h`

 ```
Usage: roc-schema [options] <d>

Extracts a markdown or HTML page from an RO-Crate that contains Schema.org style Classes and Properties.

Options:
  -V, --version            output the version number
  -c, --config [conf]      configuration file
  --html                   Output HTML (default is markdown)
  -t,  --ro-crate-terms    Output vocabulary and context file for terms
  -u,  --url [url]         URL for the final result (so links can be made relative)
  -o, --output-path [rep]  Directory into which to write output (default: null)
  -h, --help               display help for command
```


## To generate or update a SOSS Crate from one or more examples

The Makefile contains some examples.

To make a generic RO-Crate Editor Mode File:

```make generic```

To make a base Mode File that includes ALL of schema.org plus the RO-Crate add-ins:

```make base```

For usage:

```rocsoss --help```