# Mode to SOSS+ Converter

This utility converts a Language Data Commons (LDAC) Mode file into a Schema on a Stick Plus (SOSS+) RO-Crate profile.

## Overview

The `mode-to-sossplus.js` script transforms structured Mode files (a schema representation format) into SOSS+ RO-Crate profiles. The generated profiles include proper RO-Crate Metadata Descriptor and Root Data Entity classes, making them fully compliant with the RO-Crate specification.

## Prerequisites

- Node.js (v14 or higher)
- Required npm packages:
  - yargs
  - fs-extra
  - ro-crate

## Features

- Converts Mode files to SOSS+ RO-Crate profiles
- Maintains class and property hierarchies from the Mode file
- Includes RO-Crate Metadata Descriptor and Root Data Entity classes
- Handles predefined values as DefinedTerms or ItemLists
- Preserves UI hints for display in client applications
- Can write output to a specific profile-crate directory

## Installation

```bash
npm install
```

## Usage

```bash
node mode-to-sossplus.js -m <mode-file-path> [options]
```

### Options

- `-m, --mode-file`: Path to a mode file to convert (required)
- `-o, --output-dir`: Output directory for the generated RO-Crate (default: "./output/mode-sossplus")  
- `-p, --profile-crate`: Output directory for the profile-crate (e.g., "profiles/ldac/profile-crate")
- `-n, --namespace`: Namespace for the generated entities (default: "https://language-research-technology.github.io/terms#")
- `--help`: Show help information

## Example

To convert a comprehensive Language Data Commons mode file to a SOSS+ profile and place it in the designated profile-crate directory:

```bash
node mode-to-sossplus.js -m profiles/ldac/comprehensive-ldac-mode.json -p profiles/ldac/profile-crate
```

This command will:
1. Read the comprehensive LDAC mode file
2. Convert it to a SOSS+ profile with proper RO-Crate Metadata Descriptor and Root Data Entity classes
3. Write the output to both the default output directory and the specified profile-crate directory

## Output

The script produces two main outputs:

1. An RO-Crate metadata file (`ro-crate-metadata.json`) in the output directory
2. A copy of the same file in the profile-crate directory (if specified)
3. A copy of the mode file with UI hints (`mode-with-ui-hints.json`) in the output directory

## Processing Details

The conversion process:

1. Loads the Mode file and extracts its structure
2. Creates UI hints from the Mode file for client applications
3. Initializes an RO-Crate structure with metadata from the Mode file
4. Processes each class in the Mode file, converting it to a SOSS+ class entity
5. Processes properties/inputs for each class
6. Handles property values as DefinedTermSets or ItemLists as appropriate
7. Adds RO-Crate Metadata Descriptor and Root Data Entity classes
8. Writes the resulting RO-Crate profile to disk

## RO-Crate Structure

The generated SOSS+ profile includes:

- RO-Crate Metadata Descriptor class and required properties
- Root Data Entity class based on the Mode file's rootDataEntity (or Dataset as fallback)
- Common required properties for the Root Data Entity:
  - name
  - description
  - datePublished
  - license

## Notes

- The script will detect if a property is already defined and reuse it across multiple classes
- Class hierarchies are preserved through rdfs:subClassOf relationships
- Property ranges are properly mapped from Mode file types to schema.org types