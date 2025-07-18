---
title: CSV for the Web RO-Crate Profile
---

This document in an experimental SoSS+ profile for packaging tabular data using the CSV for the Web specification.


A conformant RO-Crate:

- MUST be of type(s): http://schema.org/Dataset
- MUST include the following properties:
  * name
  * description
  * datePublished
  * hasPart
  * license


## Defined Term Sets



## Classes and Properties

### <a id="_Root_Data_Entity"></a>CSVW Dataset 

The main entity that is use to package tabular data, conforming to the CSV for the Web specification.

Specialization of: http://schema.org/Dataset

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Root_Data_Entity_unnamed_28h13"></a>datePublished[?](http://schema.org/datePubished) | Yes | MUST be a string in ISO 8601 date format and SHOULD be specified to at least the precision of a day, MAY be a timestamp down to the millisecond. | schema:Date |  |
| <a id="_Root_Data_Entity_unnamed_q2bkj"></a>description[?](http://schema.org/description) | Yes | (In addition to the name) SHOULD further elaborate on the name to provide a summary of the context in which the dataset is important. | Text |  |
| <a id="_Root_Data_Entity_unnamed_fkpys"></a>hasPart[?](http://schema.org/hasPart) | Yes | A 'CSVW Table File' must be included in the RO-Crate via a hasPart relationship. This is the main payload of the RO-Crate. | [CSVW Table File](#_classTableFile) |  |
| <a id="_Root_Data_Entity_unnamed_dh2oj"></a>license[?](http://schema.org/license) | Yes | SHOULD link to a Contextual Entity in the RO-Crate Metadata File with a name and description. MAY have a URI (eg for Creative Commons or Open Source licenses). MAY if necessary be a textual description of how the RO-Crate may be used | #class_CreativeWork, schema:URL, schema:Text |  |
| <a id="_Root_Data_Entity_unnamed_bn859"></a>name[?](http://schema.org/name) | Yes | SHOULD identify the root data entity (dataset) to humans well enough to disambiguate it from other RO-Crates | Text |  |

### <a id="_Class_Dataset"></a>File Directory

A directory which is part of the RO-Crate which warrants its own description

Specialization of: http://schema.org/Dataset

*No properties defined for this class*


### <a id="_classTableFile"></a>CSVW Table File

A table containing tabular data, which is a CSV file or similar.

Specialization of: http://schema.org/Dataset, http://www.w3.org/ns/csvw#Table

*No properties defined for this class*


### <a id="_Class_Cell"></a>Cell

A Cell represents a cell at the intersection of a Row and a Column within a Table.

Specialization of: http://www.w3.org/ns/csvw#Cell

*No properties defined for this class*


### <a id="_Class_Column"></a>Column Description

A Column represents a vertical arrangement of Cells within a Table.

Specialization of: http://www.w3.org/ns/csvw#Column

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Class_Column_unnamed_bvoet"></a>about URL[?](http://www.w3.org/ns/csvw#aboutUrl) | No | A URI template property that MAY be used to indicate what a cell contains information about. | [URI Template](#_Class_uriTemplate) |  |
| <a id="_Class_Column_unnamed_rl9ct"></a>datatype[?](http://www.w3.org/ns/csvw#datatype) | No | An object property that contains either a single string that is the main datatype of the values of the cell or a datatype description object. If the value of this property is a string, it MUST be one of the built-in datatypes defined in section 5.11.1 Built-in Datatypes or an absolute URL; if it is an object then it describes a more specialised datatype. | [Datatype](#_Class_Datatype), http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Column_unnamed_z5lc1"></a>default[?](http://www.w3.org/ns/csvw#default) | No | An atomic property holding a single string that is used to create a default value for the cell in cases where the original string value is an empty string. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Column_unnamed_9w5rw"></a>language[?](http://www.w3.org/ns/csvw#lang) | No | An atomic property giving a single string language code as defined by BCP47. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Column_unnamed_h0tgb"></a>name[?](http://www.w3.org/ns/csvw#name) | No | An atomic property that gives a single canonical name for the column. The value of this property becomes the name annotation for the described column. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Column_unnamed_wa2i0"></a>null[?](http://www.w3.org/ns/csvw#null) | No | An atomic property giving the string or strings used for null values within the data. If the string value of the cell is equal to any one of these values, the cell value is `null`. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Column_unnamed_vzhin"></a>ordered[?](http://www.w3.org/ns/csvw#ordered) | No | A boolean atomic property taking a single value which indicates whether a list that is the value of the cell is ordered (if `true`) or unordered (if `false`). | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_Column_unnamed_fjvov"></a>property URL[?](http://www.w3.org/ns/csvw#propertyUrl) | No | An URI template property that MAY be used to create a URI for a property if the table is mapped to another format. | [URI Template](#_Class_uriTemplate) |  |
| <a id="_Class_Column_unnamed_zz9lm"></a>required[?](http://www.w3.org/ns/csvw#required) | No | A boolean atomic property taking a single value which indicates whether the cell must have a non-null value. The default is `false`. | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_Column_unnamed_npi5f"></a>separator[?](http://www.w3.org/ns/csvw#separator) | No | An atomic property that MUST have a single string value that is the character used to separate items in the string value of the cell. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Column_unnamed_f9crn"></a>suppress output[?](http://www.w3.org/ns/csvw#suppressOutput) | No | A boolean atomic property. If `true`, suppresses any output that would be generated when converting a table or cells within a column. | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_Column_unnamed_tkfkq"></a>text direction[?](http://www.w3.org/ns/csvw#textDirection) | No | An atomic property that must have a single value that is one of `rtl` or `ltr` (the default). | [Direction](#_Class_Direction) |  |
| <a id="_Class_Column_unnamed_h3qde"></a>title[?](http://www.w3.org/ns/csvw#title) | No | For a Transformation: A natural language property that describes the format that will be generated from the transformation. For a Column: A natural language property that provides possible alternative names for the column. |  |  |
| <a id="_Class_Column_unnamed_o1my4"></a>transformations[?](http://www.w3.org/ns/csvw#transformations) | No | An array property of transformation definitions that provide mechanisms to transform the tabular data into other formats. | [Transformation Definition](#_Class_Transformation) |  |
| <a id="_Class_Column_unnamed_6foeg"></a>valueUrl[?](http://www.w3.org/ns/csvw#valueUrl) | No | An URI template property that is used to map the values of cells into URLs. | [URI Template](#_Class_uriTemplate) |  |
| <a id="_Class_Column_unnamed_cqoq1"></a>virtual[?](http://www.w3.org/ns/csvw#virtual) | No | A boolean atomic property taking a single value which indicates whether the column is a virtual column not present in the original source | http://www.w3.org/2001/XMLSchema#boolean |  |

### <a id="_Class_Datatype"></a>Datatype

Describes facets of a datatype.

Specialization of: http://www.w3.org/ns/csvw#Datatype

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Class_Datatype_unnamed_50drc"></a>base[?](http://www.w3.org/ns/csvw#base) | No | An atomic property that contains a single string: a term defined in the default context representing a built-in datatype URL, as listed above. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Datatype_unnamed_t2l5r"></a>format[?](http://www.w3.org/ns/csvw#format) | No | An atomic property that contains either a single string or an object that defines the format of a value of this type, used when parsing a string value. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Datatype_unnamed_gq18x"></a>length[?](http://www.w3.org/ns/csvw#length) | No | The exact length of the value of the cell. | http://www.w3.org/2001/XMLSchema#nonNegativeInteger |  |
| <a id="_Class_Datatype_unnamed_dnjxh"></a>max exclusive[?](http://www.w3.org/ns/csvw#maxExclusive) | No | An atomic property that contains a single number that is the maximum valid value (exclusive). | http://www.w3.org/2001/XMLSchema#integer |  |
| <a id="_Class_Datatype_unnamed_nlej4"></a>max inclusive[?](http://www.w3.org/ns/csvw#maxInclusive) | No | An atomic property that contains a single number that is the maximum valid value (inclusive). | http://www.w3.org/2001/XMLSchema#integer |  |
| <a id="_Class_Datatype_unnamed_gkp8j"></a>max length[?](http://www.w3.org/ns/csvw#maxLength) | No | A numeric atomic property that contains a single integer that is the maximum length of the value. | http://www.w3.org/2001/XMLSchema#nonNegativeInteger |  |
| <a id="_Class_Datatype_unnamed_nmei5"></a>min exclusive[?](http://www.w3.org/ns/csvw#minExclusive) | No | An atomic property that contains a single number that is the minimum valid value (exclusive). | http://www.w3.org/2001/XMLSchema#integer |  |
| <a id="_Class_Datatype_unnamed_k3ibg"></a>min inclusive[?](http://www.w3.org/ns/csvw#minInclusive) | No | An atomic property that contains a single number that is the minimum valid value (inclusive). | http://www.w3.org/2001/XMLSchema#integer |  |
| <a id="_Class_Datatype_unnamed_ojz2m"></a>min length[?](http://www.w3.org/ns/csvw#minLength) | No | An atomic property that contains a single integer that is the minimum length of the value. | http://www.w3.org/2001/XMLSchema#nonNegativeInteger |  |

### <a id="_Class_Dialect"></a>Dialect Description

A Dialect Description provides hints to parsers about how to parse a linked file.

Specialization of: http://www.w3.org/ns/csvw#Dialect

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Class_Dialect_unnamed_bxxb4"></a>comment prefix[?](http://www.w3.org/ns/csvw#commentPrefix) | No | An atomic property that sets the comment prefix flag to the single provided value, which MUST be a string. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Dialect_unnamed_0rx5t"></a>delimiter[?](http://www.w3.org/ns/csvw#delimiter) | No | An atomic property that sets the delimiter flag to the single provided value, which MUST be a string. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Dialect_unnamed_6ox09"></a>double quote[?](http://www.w3.org/ns/csvw#doubleQuote) | No | A boolean atomic property that, if `true`, sets the escape character flag to `"`. | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_Dialect_unnamed_zdrn9"></a>encoding[?](http://www.w3.org/ns/csvw#encoding) | No | An atomic property that sets the encoding flag to the single provided string value, which MUST be defined in encoding. The default is "utf-8". | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Dialect_unnamed_knhg1"></a>header[?](http://www.w3.org/ns/csvw#header) | No | A boolean atomic property that, if `true`, sets the header row count flag to `1`, and if `false` to `0`, unless headerRowCount is provided, in which case the value provided for the header property is ignored. | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_Dialect_unnamed_wudj0"></a>header row count[?](http://www.w3.org/ns/csvw#headerRowCount) | No | An numeric atomic property that sets the header row count flag to the single provided value, which must be a non-negative integer. | http://www.w3.org/2001/XMLSchema#nonNegativeInteger |  |
| <a id="_Class_Dialect_unnamed_278li"></a>line terminators[?](http://www.w3.org/ns/csvw#lineTerminators) | No | An atomic property that sets the line terminators flag to either an array containing the single provided string value, or the provided array. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Dialect_unnamed_9vuz3"></a>quote char[?](http://www.w3.org/ns/csvw#quoteChar) | No | An atomic property that sets the quote character flag to the single provided value, which must be a string or `null`. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Dialect_unnamed_bykrl"></a>skip blank rows[?](http://www.w3.org/ns/csvw#skipBlankRows) | No | An boolean atomic property that sets the `skip blank rows` flag to the single provided boolean value. | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_Dialect_unnamed_4dqak"></a>skip columns[?](http://www.w3.org/ns/csvw#skipColumns) | No | An numeric atomic property that sets the `skip columns` flag to the single provided numeric value, which MUST be a non-negative integer. | http://www.w3.org/2001/XMLSchema#nonNegativeInteger |  |
| <a id="_Class_Dialect_unnamed_1vbag"></a>skip initial space[?](http://www.w3.org/ns/csvw#skipInitialSpace) | No | A boolean atomic property that, if `true`, sets the trim flag to "start". If `false`, to `false`. | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_Dialect_unnamed_f517l"></a>skip rows[?](http://www.w3.org/ns/csvw#skipRows) | No | An numeric atomic property that sets the `skip rows` flag to the single provided numeric value, which MUST be a non-negative integer. | http://www.w3.org/2001/XMLSchema#nonNegativeInteger |  |
| <a id="_Class_Dialect_unnamed_235u5"></a>trim[?](http://www.w3.org/ns/csvw#trim) | No | An atomic property that, if the boolean `true`, sets the trim flag to `true` and if the boolean `false` to `false`. If the value provided is a string, sets the trim flag to the provided value, which must be one of "true", "false", "start" or "end". | http://www.w3.org/2001/XMLSchema#boolean |  |

### <a id="_Class_Direction"></a>Direction

The class of table/text directions.

Specialization of: http://www.w3.org/ns/csvw#Direction

*No properties defined for this class*


### <a id="_Class_ForeignKey"></a>Foreign Key Definition

Describes relationships between Columns in one or more Tables.

Specialization of: http://www.w3.org/ns/csvw#ForeignKey

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Class_ForeignKey_unnamed_uruxc"></a>column reference[?](http://www.w3.org/ns/csvw#columnReference) | No | A column reference property that holds either a single reference to a column description object within this schema, or an array of references. These form the referencing columns for the foreign key definition. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_ForeignKey_unnamed_edty9"></a>reference[?](http://www.w3.org/ns/csvw#reference) | No | An object property that identifies a **referenced table** and a set of **referenced columns** within that table. | [Table Reference](#_Class_TableReference) |  |

### <a id="_Class_NumericFormat"></a>Numeric Format

If the datatype is a numeric type, the format property indicates the expected format for that number. Its value must be either a single string or an object with one or more properties.

Specialization of: http://www.w3.org/ns/csvw#NumericFormat

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Class_NumericFormat_unnamed_gm9eg"></a>decimal character[?](http://www.w3.org/ns/csvw#decimalChar) | No | A string whose value is used to represent a decimal point within the number. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_NumericFormat_unnamed_sxyq1"></a>group character[?](http://www.w3.org/ns/csvw#groupChar) | No | A string whose value is used to group digits within the number. | [Numeric Format](#_Class_NumericFormat), http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_NumericFormat_unnamed_7lofc"></a>pattern[?](http://www.w3.org/ns/csvw#pattern) | No | A regular expression string, in the syntax and interpreted as defined by ECMASCRIPT. | http://www.w3.org/2001/XMLSchema#string |  |

### <a id="_Class_Row"></a>Row

A Row represents a horizontal arrangement of cells within a Table.

Specialization of: http://www.w3.org/ns/csvw#Row

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Class_Row_unnamed_abeb7"></a>describes[?](http://www.w3.org/ns/csvw#describes) | No | From IANA describes: The relationship A 'describes' B asserts that resource A provides a description of resource B. There are no constraints on the format or representation of either A or B, neither are there any further constraints on either resource. |  |  |
| <a id="_Class_Row_unnamed_wna19"></a>primary key[?](http://www.w3.org/ns/csvw#primaryKey) | No | For Schema: A column reference property that holds either a single reference to a column description object or an array of references. For Row: a possibly empty list of cells whose values together provide a unique identifier for this row. This is similar to the name of a column. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Row_unnamed_6v35h"></a>referenced rows[?](http://www.w3.org/ns/csvw#referencedRow) | No | A possibly empty list of pairs of a foreign key and a row in a table within the same group of tables. |  |  |
| <a id="_Class_Row_unnamed_zzhza"></a>title[?](http://www.w3.org/ns/csvw#title) | No | For a Transformation: A natural language property that describes the format that will be generated from the transformation. For a Column: A natural language property that provides possible alternative names for the column. |  |  |

### <a id="_Class_Schema"></a>Schema

A Schema is a definition of a tabular format that may be common to multiple tables.

Specialization of: http://www.w3.org/ns/csvw#Schema

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Class_Schema_unnamed_l0toc"></a>about URL[?](http://www.w3.org/ns/csvw#aboutUrl) | No | A URI template property that MAY be used to indicate what a cell contains information about. | [URI Template](#_Class_uriTemplate) |  |
| <a id="_Class_Schema_unnamed_nruc5"></a>column[?](http://www.w3.org/ns/csvw#column) | No | An array property of column descriptions as described in section 5.6 Columns. | [Column Description](#_Class_Column) |  |
| <a id="_Class_Schema_unnamed_1tnj0"></a>datatype[?](http://www.w3.org/ns/csvw#datatype) | No | An object property that contains either a single string that is the main datatype of the values of the cell or a datatype description object. If the value of this property is a string, it MUST be one of the built-in datatypes defined in section 5.11.1 Built-in Datatypes or an absolute URL; if it is an object then it describes a more specialised datatype. | [Datatype](#_Class_Datatype), http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Schema_unnamed_v91xm"></a>default[?](http://www.w3.org/ns/csvw#default) | No | An atomic property holding a single string that is used to create a default value for the cell in cases where the original string value is an empty string. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Schema_unnamed_5u8li"></a>foreign key[?](http://www.w3.org/ns/csvw#foreignKey) | No | For a Table: a list of foreign keys on the table. For a Schema: an array property of foreign key definitions that define how the values from specified columns within this table link to rows within this table or other tables. | [Foreign Key Definition](#_Class_ForeignKey) |  |
| <a id="_Class_Schema_unnamed_j7197"></a>language[?](http://www.w3.org/ns/csvw#lang) | No | An atomic property giving a single string language code as defined by BCP47. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Schema_unnamed_qhr4c"></a>null[?](http://www.w3.org/ns/csvw#null) | No | An atomic property giving the string or strings used for null values within the data. If the string value of the cell is equal to any one of these values, the cell value is `null`. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Schema_unnamed_e5dv8"></a>ordered[?](http://www.w3.org/ns/csvw#ordered) | No | A boolean atomic property taking a single value which indicates whether a list that is the value of the cell is ordered (if `true`) or unordered (if `false`). | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_Schema_unnamed_03irw"></a>primary key[?](http://www.w3.org/ns/csvw#primaryKey) | No | For Schema: A column reference property that holds either a single reference to a column description object or an array of references. For Row: a possibly empty list of cells whose values together provide a unique identifier for this row. This is similar to the name of a column. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Schema_unnamed_n3o00"></a>property URL[?](http://www.w3.org/ns/csvw#propertyUrl) | No | An URI template property that MAY be used to create a URI for a property if the table is mapped to another format. | [URI Template](#_Class_uriTemplate) |  |
| <a id="_Class_Schema_unnamed_8oykd"></a>required[?](http://www.w3.org/ns/csvw#required) | No | A boolean atomic property taking a single value which indicates whether the cell must have a non-null value. The default is `false`. | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_Schema_unnamed_9bdhe"></a>row titles[?](http://www.w3.org/ns/csvw#rowTitle) | No | A column reference property that holds either a single reference to a column description object or an array of references. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Schema_unnamed_qbcym"></a>separator[?](http://www.w3.org/ns/csvw#separator) | No | An atomic property that MUST have a single string value that is the character used to separate items in the string value of the cell. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Schema_unnamed_llzsl"></a>text direction[?](http://www.w3.org/ns/csvw#textDirection) | No | An atomic property that must have a single value that is one of `rtl` or `ltr` (the default). | [Direction](#_Class_Direction) |  |
| <a id="_Class_Schema_unnamed_13hfc"></a>transformations[?](http://www.w3.org/ns/csvw#transformations) | No | An array property of transformation definitions that provide mechanisms to transform the tabular data into other formats. | [Transformation Definition](#_Class_Transformation) |  |
| <a id="_Class_Schema_unnamed_u5oo1"></a>valueUrl[?](http://www.w3.org/ns/csvw#valueUrl) | No | An URI template property that is used to map the values of cells into URLs. | [URI Template](#_Class_uriTemplate) |  |

### <a id="_Class_Table"></a>Annotated Table

An annotated table is a table that is annotated with additional metadata.

Specialization of: http://www.w3.org/ns/csvw#Table

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Class_Table_unnamed_t4yf4"></a>about URL[?](http://www.w3.org/ns/csvw#aboutUrl) | No | A URI template property that MAY be used to indicate what a cell contains information about. | [URI Template](#_Class_uriTemplate) |  |
| <a id="_Class_Table_unnamed_kpvay"></a>datatype[?](http://www.w3.org/ns/csvw#datatype) | No | An object property that contains either a single string that is the main datatype of the values of the cell or a datatype description object. If the value of this property is a string, it MUST be one of the built-in datatypes defined in section 5.11.1 Built-in Datatypes or an absolute URL; if it is an object then it describes a more specialised datatype. | [Datatype](#_Class_Datatype), http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Table_unnamed_grnwm"></a>default[?](http://www.w3.org/ns/csvw#default) | No | An atomic property holding a single string that is used to create a default value for the cell in cases where the original string value is an empty string. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Table_unnamed_a5kv4"></a>dialect[?](http://www.w3.org/ns/csvw#dialect) | No | An object property that provides a single dialect description. If provided, dialect provides hints to processors about how to parse the referenced files to create tabular data models for the tables in the group. | [Dialect Description](#_Class_Dialect) |  |
| <a id="_Class_Table_unnamed_mzqwn"></a>foreign key[?](http://www.w3.org/ns/csvw#foreignKey) | No | For a Table: a list of foreign keys on the table. For a Schema: an array property of foreign key definitions that define how the values from specified columns within this table link to rows within this table or other tables. | [Foreign Key Definition](#_Class_ForeignKey) |  |
| <a id="_Class_Table_unnamed_j9een"></a>language[?](http://www.w3.org/ns/csvw#lang) | No | An atomic property giving a single string language code as defined by BCP47. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Table_unnamed_2idx5"></a>note[?](http://www.w3.org/ns/csvw#note) | No | An array property that provides an array of objects representing arbitrary annotations on the annotated tabular data model. |  |  |
| <a id="_Class_Table_unnamed_nxo6d"></a>null[?](http://www.w3.org/ns/csvw#null) | No | An atomic property giving the string or strings used for null values within the data. If the string value of the cell is equal to any one of these values, the cell value is `null`. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Table_unnamed_ffr2b"></a>ordered[?](http://www.w3.org/ns/csvw#ordered) | No | A boolean atomic property taking a single value which indicates whether a list that is the value of the cell is ordered (if `true`) or unordered (if `false`). | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_Table_unnamed_vtl5r"></a>property URL[?](http://www.w3.org/ns/csvw#propertyUrl) | No | An URI template property that MAY be used to create a URI for a property if the table is mapped to another format. | [URI Template](#_Class_uriTemplate) |  |
| <a id="_Class_Table_unnamed_3lhol"></a>required[?](http://www.w3.org/ns/csvw#required) | No | A boolean atomic property taking a single value which indicates whether the cell must have a non-null value. The default is `false`. | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_Table_unnamed_gvopk"></a>row[?](http://www.w3.org/ns/csvw#row) | No | Relates a Table to each Row output. | [Row](#_Class_Row) |  |
| <a id="_Class_Table_unnamed_yjlki"></a>separator[?](http://www.w3.org/ns/csvw#separator) | No | An atomic property that MUST have a single string value that is the character used to separate items in the string value of the cell. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Table_unnamed_calzy"></a>suppress output[?](http://www.w3.org/ns/csvw#suppressOutput) | No | A boolean atomic property. If `true`, suppresses any output that would be generated when converting a table or cells within a column. | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_Table_unnamed_4y4lh"></a>table direction[?](http://www.w3.org/ns/csvw#tableDirection) | No | One of `rtl`, `ltr` or `auto`. Indicates whether the tables in the group should be displayed with the first column on the right, on the left, or based on the first character in the table that has a specific direction. | [Direction](#_Class_Direction) |  |
| <a id="_Class_Table_unnamed_ozj6t"></a>table schema[?](http://www.w3.org/ns/csvw#tableSchema) | No | An object property that provides a single schema description as described in section 5.5 Schemas, used as the default for all the tables in the group | [Schema](#_Class_Schema) |  |
| <a id="_Class_Table_unnamed_vrng7"></a>text direction[?](http://www.w3.org/ns/csvw#textDirection) | No | An atomic property that must have a single value that is one of `rtl` or `ltr` (the default). | [Direction](#_Class_Direction) |  |
| <a id="_Class_Table_unnamed_yj9q9"></a>transformations[?](http://www.w3.org/ns/csvw#transformations) | No | An array property of transformation definitions that provide mechanisms to transform the tabular data into other formats. | [Transformation Definition](#_Class_Transformation) |  |
| <a id="_Class_Table_unnamed_koxrs"></a>url[?](http://www.w3.org/ns/csvw#url) | No | For a Table: This link property gives the single URL of the CSV file that the table is held in, relative to the location of the metadata document. For a Transformation: A link property giving the single URL of the file that the script or template is held in, relative to the location of the metadata document. | http://www.w3.org/2001/XMLSchema#anyURI |  |
| <a id="_Class_Table_unnamed_us1h7"></a>valueUrl[?](http://www.w3.org/ns/csvw#valueUrl) | No | An URI template property that is used to map the values of cells into URLs. | [URI Template](#_Class_uriTemplate) |  |

### <a id="_Class_TableGroup"></a>Group of Tables

A Group of Tables comprises a set of Annotated Tables and a set of annotations that relate to those Tables.

Specialization of: http://www.w3.org/ns/csvw#TableGroup

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Class_TableGroup_unnamed_4wams"></a>about URL[?](http://www.w3.org/ns/csvw#aboutUrl) | No | A URI template property that MAY be used to indicate what a cell contains information about. | [URI Template](#_Class_uriTemplate) |  |
| <a id="_Class_TableGroup_unnamed_1fapk"></a>datatype[?](http://www.w3.org/ns/csvw#datatype) | No | An object property that contains either a single string that is the main datatype of the values of the cell or a datatype description object. If the value of this property is a string, it MUST be one of the built-in datatypes defined in section 5.11.1 Built-in Datatypes or an absolute URL; if it is an object then it describes a more specialised datatype. | [Datatype](#_Class_Datatype), http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_TableGroup_unnamed_ls2vu"></a>default[?](http://www.w3.org/ns/csvw#default) | No | An atomic property holding a single string that is used to create a default value for the cell in cases where the original string value is an empty string. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_TableGroup_unnamed_q3kfm"></a>dialect[?](http://www.w3.org/ns/csvw#dialect) | No | An object property that provides a single dialect description. If provided, dialect provides hints to processors about how to parse the referenced files to create tabular data models for the tables in the group. | [Dialect Description](#_Class_Dialect) |  |
| <a id="_Class_TableGroup_unnamed_8gcui"></a>language[?](http://www.w3.org/ns/csvw#lang) | No | An atomic property giving a single string language code as defined by BCP47. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_TableGroup_unnamed_6ipxt"></a>note[?](http://www.w3.org/ns/csvw#note) | No | An array property that provides an array of objects representing arbitrary annotations on the annotated tabular data model. |  |  |
| <a id="_Class_TableGroup_unnamed_tqj6k"></a>null[?](http://www.w3.org/ns/csvw#null) | No | An atomic property giving the string or strings used for null values within the data. If the string value of the cell is equal to any one of these values, the cell value is `null`. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_TableGroup_unnamed_vecdo"></a>ordered[?](http://www.w3.org/ns/csvw#ordered) | No | A boolean atomic property taking a single value which indicates whether a list that is the value of the cell is ordered (if `true`) or unordered (if `false`). | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_TableGroup_unnamed_tahec"></a>property URL[?](http://www.w3.org/ns/csvw#propertyUrl) | No | An URI template property that MAY be used to create a URI for a property if the table is mapped to another format. | [URI Template](#_Class_uriTemplate) |  |
| <a id="_Class_TableGroup_unnamed_rreje"></a>required[?](http://www.w3.org/ns/csvw#required) | No | A boolean atomic property taking a single value which indicates whether the cell must have a non-null value. The default is `false`. | http://www.w3.org/2001/XMLSchema#boolean |  |
| <a id="_Class_TableGroup_unnamed_26nhe"></a>separator[?](http://www.w3.org/ns/csvw#separator) | No | An atomic property that MUST have a single string value that is the character used to separate items in the string value of the cell. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_TableGroup_unnamed_tbd6v"></a>table[?](http://www.w3.org/ns/csvw#table) | No | Relates an Table group to annotated tables. | [Annotated Table](#_Class_Table) |  |
| <a id="_Class_TableGroup_unnamed_tkteo"></a>table direction[?](http://www.w3.org/ns/csvw#tableDirection) | No | One of `rtl`, `ltr` or `auto`. Indicates whether the tables in the group should be displayed with the first column on the right, on the left, or based on the first character in the table that has a specific direction. | [Direction](#_Class_Direction) |  |
| <a id="_Class_TableGroup_unnamed_iazvk"></a>table schema[?](http://www.w3.org/ns/csvw#tableSchema) | No | An object property that provides a single schema description as described in section 5.5 Schemas, used as the default for all the tables in the group | [Schema](#_Class_Schema) |  |
| <a id="_Class_TableGroup_unnamed_xd5hp"></a>text direction[?](http://www.w3.org/ns/csvw#textDirection) | No | An atomic property that must have a single value that is one of `rtl` or `ltr` (the default). | [Direction](#_Class_Direction) |  |
| <a id="_Class_TableGroup_unnamed_983za"></a>transformations[?](http://www.w3.org/ns/csvw#transformations) | No | An array property of transformation definitions that provide mechanisms to transform the tabular data into other formats. | [Transformation Definition](#_Class_Transformation) |  |
| <a id="_Class_TableGroup_unnamed_o6mm0"></a>valueUrl[?](http://www.w3.org/ns/csvw#valueUrl) | No | An URI template property that is used to map the values of cells into URLs. | [URI Template](#_Class_uriTemplate) |  |

### <a id="_Class_TableReference"></a>Table Reference

An object property that identifies a referenced table and a set of referenced columns within that table.

Specialization of: http://www.w3.org/ns/csvw#TableReference

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Class_TableReference_unnamed_9h2f2"></a>column reference[?](http://www.w3.org/ns/csvw#columnReference) | No | A column reference property that holds either a single reference to a column description object within this schema, or an array of references. These form the referencing columns for the foreign key definition. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_TableReference_unnamed_vvg79"></a>resource[?](http://www.w3.org/ns/csvw#resource) | No | A link property holding a URL that is the identifier for a specific table that is being referenced. | http://www.w3.org/2001/XMLSchema#anyURI |  |
| <a id="_Class_TableReference_unnamed_0p28y"></a>schema reference[?](http://www.w3.org/ns/csvw#schemaReference) | No | A link property holding a URL that is the identifier for a schema that is being referenced. | http://www.w3.org/2001/XMLSchema#anyURI |  |

### <a id="_Class_Transformation"></a>Transformation Definition

A Transformation Definition is a definition of how tabular data can be transformed into another format.

Specialization of: http://www.w3.org/ns/csvw#Transformation

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Class_Transformation_unnamed_uyslr"></a>script format[?](http://www.w3.org/ns/csvw#scriptFormat) | No | A link property giving the single URL for the format that is used by the script or template. | http://www.w3.org/2001/XMLSchema#anyURI |  |
| <a id="_Class_Transformation_unnamed_f238j"></a>source[?](http://www.w3.org/ns/csvw#source) | No | A single string atomic property that provides, if specified, the format to which the tabular data should be transformed prior to the transformation using the script or template. | http://www.w3.org/2001/XMLSchema#string |  |
| <a id="_Class_Transformation_unnamed_bo3zo"></a>target format[?](http://www.w3.org/ns/csvw#targetFormat) | No | A link property giving the single URL for the format that will be created through the transformation. | http://www.w3.org/2001/XMLSchema#anyURI |  |
| <a id="_Class_Transformation_unnamed_v5a7z"></a>title[?](http://www.w3.org/ns/csvw#title) | No | For a Transformation: A natural language property that describes the format that will be generated from the transformation. For a Column: A natural language property that provides possible alternative names for the column. |  |  |
| <a id="_Class_Transformation_unnamed_70e42"></a>url[?](http://www.w3.org/ns/csvw#url) | No | For a Table: This link property gives the single URL of the CSV file that the table is held in, relative to the location of the metadata document. For a Transformation: A link property giving the single URL of the file that the script or template is held in, relative to the location of the metadata document. | http://www.w3.org/2001/XMLSchema#anyURI |  |

### <a id="_Class_uriTemplate"></a>URI Template

A URI template as defined in RFC6570.

Specialization of: http://www.w3.org/ns/csvw#uriTemplate

*No properties defined for this class*




## Provenance

This document was compiled using [generate-soss-docs.js](https://github.com/Language-Research-Technology/ro-crate-schema-tools/blob/sossplus/generate-soss-docs.js), based on [profiles/csvw-crate/profile-text.md](https://github.com/Language-Research-Technology/ro-crate-schema-tools/blob/sossplus/profiles/csvw-crate/profile-text.md) using a SoSS+ Schema defined in [profiles/csvw-crate/profile-crate/ro-crate-metadata.json](https://github.com/Language-Research-Technology/ro-crate-schema-tools/blob/sossplus/profiles/csvw-crate/profile-crate/ro-crate-metadata.json).
