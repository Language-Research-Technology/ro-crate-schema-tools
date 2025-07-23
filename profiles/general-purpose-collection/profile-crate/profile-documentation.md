# General Purpose Collection RO-Crate Profile

This document is an RO-Crate profile for general purpose collection resources. The
profile specifies the contents of RO-Crate Metadata Documents for 
resources not specific to a particular domain and gives guidance on how to structure collections both
at the RO-Crate package level and in a repository containing multiple packages.

This profile assumes that the principles and standards set out in the [PILARS protocols](https://w3id.org/ldac/pilars), or similar compatible approaches, are being used.

The core metadata vocabularies for this profile are:

- RO-Crate recommendations for data packaging and basic discoverability metadata,
  which is mostly [Schema.org](https://schema.org/) terms with a handful of additions. Following
  RO-Crate practice, basic metadata terms such as "who, what, where" and
  bibliographic-style descriptions are chosen from Schema.org where possible.
- Several terms from [Language Data Commons Schema Terms](https://w3id.org/ldac/terms), [Portland Common Data Model (PCDM)](https://pcdm.org/models), [Dublin Core](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/) and [GeoSPARQL](https://www.ogc.org/standards/geosparql/) are used for structural, licensing and geospatial metadata.

<br>

# Audience

This document is primarily for use by tool developers, data scientists
and metadata specialists developing scripts or systems for user
communities. It is not intended for use by non-specialists.

Just as we would not expect repository users to type Dublin Core
metadata in XML format by hand, we do not expect our users to have to
deal directly with the JSON-LD presented here. This document is for tool
developers to build systems that crosswalk data from existing systems,
or allow for user-friendly data entry.

<br>

# About this Profile

This profile covers various kinds of crate metadata:

- **Structural RO-Crate metadata**: how the root dataset links to files, and
  the abstract structure of nested collections (e.g. collections/corpora or other
  curated datasets) and objects of study.
  This profile assumes that a repository (for example, an OCFL storage root,
  with an API for accessing it) exists and that it can at a minimum support

  (a) listing all items of the repository and returning their RO-Crate metadata, and

  (b) retrieving an item given its ID.

- **Contextual metadata**: how to link people and organisations who had authoring, publishing and collection roles, as well as places, subjects.

<br>

# Structural Metadata

The structural elements of a General Purpose Collection RO-Crate are:

- **A Collection / Object hierarchy** to allow data to be
  grouped. For example, a corpus with sub-corpora, or collections of
  items (objects) from a particular region.

- **Dataset and File entities** (as per RO-Crate). Files may be referenced
  locally or via URI, for example, from an API. If an RO-Crate contains files, they MUST be linked to the root dataset as per the RO-Crate specification using either:
  - \`hasPart\` relationships on the object(s), or
  - \`isPartOf\` relationships on the file(s).

NOTE: The terms Collection and Object
are encoded in RO-Crate metadata using \`RepositoryCollection\` and
\`RepositoryObject\` types respectively. These in turn are re-named versions
of the Portland Common Data Model types,
[pcdm:Collection](http://pcdm.org/models#Collection)
and
[pcdm:Object](http://pcdm.org/models#Object).

A conformant RO-Crate:

- MUST be of type(s): http://schema.org/Dataset, http://pcdm.org/models#Collection
- MUST include the following properties:
  * name
  * description
  * datePublished
  * license


<br>

![Structure of collections that conform to the Language Data Commons Profile](media/structure.svg) TODO update for non-linguistic data

A collection such as a corpus may be stored in a repository or
transmitted either as:

- A **distributed** collection: a set of individual RO-Crates which
  reference separate collection records with one Object and one
  Collection per crate.

- A **bundled** single crate: contains all the Collection and
  Object data.

Distributed collections may reference member collections or Objects in the 
\`pcdm:hasMember\` property but should not include descriptions of Objects that
are stored elsewhere in the repository.

<br>

## Classes

In linked data, a class is a resource that represents a concept or entity. Several classes from the Language Data Commons Schema are also applicable to the General Purpose Collection Profile:

| Class                                                                | Description                                                                                                                                                      |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CollectionEvent](https://w3id.org/ldac/terms#CollectionEvent)       | A description of an event at which one or more PrimaryMaterials were captured, e.g. as video or audio.                                                           |
| [CollectionProtocol](https://w3id.org/ldac/terms#CollectionProtocol) | A description of how this Object or Collection was obtained, such as the strategy used for selecting written source texts, or the prompts given to participants. |
| [DataDepositLicense](https://w3id.org/ldac/terms#DataDepositLicense) | A license document setting out terms for deposit into a repository.                                                                                              |
| [DataLicense](https://w3id.org/ldac/terms#DataLicense)               | A license document for data licensing. This is a superclass of DataReuseLicense and DataDepositLicense.                                                          |
| [DataReuseLicense](https://w3id.org/ldac/terms#DataReuseLicense)     | A license document, setting out terms for reuse of data.                                                                                                         |

<br>

## Bidirectional Relationships

The relational hierachy between Collections, Objects and Files are represented bidirectionally in an RO-Crate by the terms \`hasPart\`/\`isPartOf\` and \`pcdm:hasMember\`/\`pcdm:memberOf\`.

| Superset Term      | Inverse Of | Subset Term       |
| ------------------ | ---------- | ----------------- |
| \`pcdm:hasMember\` | ⟷          | \`pcdm:memberOf\` |
| \`hasPart\`        | ⟷          | \`isPartOf\`      |

Objects are placed in a Collection using the \`pcdm:memberOf\` property, which is required. The inverse will be encoded automatically using the \`pcdm:hasMember\` property on a Collection. Similarly, if using \`pcdm:hasMember\`, \`pcdm:memberOf\` will also be automatically encoded.

The same relationship applies for \`hasPart\` and \`isPartOf\` at the Object and File levels.

| Superset Level |     | Relationship       |     | Subset Level |
| -------------- | --- | ------------------ | --- | ------------ |
| Collection     | →   | \`pcdm:hasMember\` | →   | Object       |
| Collection     | ←   | \`pcdm:memberOf\`  | ←   | Object       |
| Object         | →   | \`hasPart\`        | →   | File         |
| Object         | ←   | \`isPartOf\`       | ←   | File         |

Depending on the data, using one term over another may be preferable when creating the hierarchical relationship. For example, if you are describing multiple files in a spreadsheet, it is easier to use \`isPartOf\` at the File level referencing the Object it belongs to, rather than listing all the \`hasPart\` entries at the Object level.

The following diagram shows how these relationships are encoded in a single "bundled" RO-Crate.

![Self-contained collection crate with all resources](media/bundled-crate.svg)

The next diagram shows how distributed crates (with one RO-Crate per Object and Collection) are linked.

![Distributed crate with links to object crates](media/distributed-crates.svg)

Which linking strategy is used is an implementation choice for
repository developers.

<br>

## When to choose collection-as-crate ("bundled") vs collection-in-multiple-crates ("distributed")

- Use a single **bundled crate** for a collection when all of these conditions are true:

  - The collection is final and is expected to be stable, i.e. there is
    negligible chance of having to withdraw any of its contents or
    files.

  - The collection and all its files can easily be transferred in a
    single transaction - say 20 GB total.

  - All the material in the corpus shares the same license for reuse.

- Split a collection into **distributed RepositoryCollection and
  RepositoryObject crates**, with one crate per repository object,
  when any of these conditions are true:

  - The collection is not yet stable:

    - New items are being added or changed.

    - There is a chance that some data may have to be taken down or withdrawn at the request of participants.

  - The total size of the collection will present challenges for
    data transfer.

  - There is more than one data reuse license applicable.

<br>

## Collection

A collection is a group of related Objects. Examples of collections
include corpora, and sub-corpora, as well as aggregations of cultural
objects which bring together items collected in a region or on a session with informants.

When an RO-Crate is used to package a collection that is part of
another Collection, it has a \`pcdm:memberOf\` property which references a
resolvable ID (within the context of a repository or service) of the
parent Collection. The Collection may also list its members in a \`pcdm:hasMember\`
property, but this is not required.

The root dataset must have at least these \`@type\` values: \`["Dataset",
"RepositoryCollection"]\`

### A RepositoryCollection:

### <a id="_class_RepositoryCollection"></a>RepositoryCollection



Specialization of: http://pcdm.org/models#Collection

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_RepositoryCollection_unnamed_d0aoy"></a>inLanguage[?](http://schema.org/inLanguage) | Yes | The language in which the resource is written. | Text |  |
| <a id="_class_RepositoryCollection_unnamed_0qz34"></a>conformsTo[?](http://purl.org/dc/terms/conformsTo) | No | A link to the RO-Crate profile for collections. | Text |  |
| <a id="_class_RepositoryCollection_unnamed_qv4d1"></a>contentLocation[?](http://schema.org/contentLocation) | No | The location depicted or described in the content. For example, the location in a photograph or painting. | [Place](#_class_Place) |  |
| <a id="_class_RepositoryCollection_unnamed_m00nc"></a>dateCreated[?](http://schema.org/dateCreated) | No | The (earliest) date the data in this dataset were created. | Date |  |
| <a id="_class_RepositoryCollection_unnamed_ppv93"></a>holdingArchive[?](http://schema.org/holdingArchive) | No | Organisation where the original of this work or collection is housed. | [Organization](#_class_Organization), Text |  |



<br>

## Object

An Object is a single unit linked to tightly related files, for example,
a session in a study, or a work (document) in a written corpus.

The definition of an object is necessarily loose and needs to reflect
what data owners have chosen to do with their collections in the past.

If an RO-Crate contains a single Object, the Root Dataset would have a
\`@type\` property of \`["Dataset", "RepositoryObject"]\` with a
\`conformsTo\` property pointing to the General Purpose Collection Object profile 
<https://w3id.org/ldac/profile#Object> (this document). TODO w3id needed

If an RO-Crate contains an entire collection, each Object has a
\`@type\` property of \`["Dataset", "RepositoryObject"]\` and a \`conformsTo\`
property referencing this document. For example:

Objects SHOULD have files (which may be included in an RO-Crate for the
object, or as part of a collection crate).

In this example, the Object in question is an interview from a speech
corpus with three files. The diagram shows the relationships between
the object and its files, and the contextual metadata of a Person who
takes the role of the speaker/informant (discussed in more detail
below). TODO update for non-linguistic data

![Structure of an Object crate](media/object-structure.svg)

There are a number of terms that can be used to characterise resources -
these use the Schema.org mechanism of \`DefinedTerm\` and \`DefinedTermSet\`.

### A RepositoryObject:

### <a id="_class_RepositoryObject"></a>RepositoryObject



Specialization of: http://pcdm.org/models#Object

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_RepositoryObject_unnamed_m99p6"></a>creator[?](http://schema.org/creator) | No | The creator/author of this CreativeWork. This is the same as the Author property for CreativeWork. | [Person](#_class_Person) |  |
| <a id="_class_RepositoryObject_unnamed_tszj0"></a>dateCreated[?](http://schema.org/dateCreated) | No | The date on which the CreativeWork was created or the item was added to a DataFeed. | Text |  |
| <a id="_class_RepositoryObject_unnamed_0826u"></a>description[?](http://schema.org/description) | No | A description of the item. | Text |  |
| <a id="_class_RepositoryObject_unnamed_0mcg8"></a>identifier[?](http://schema.org/identifier) | No | The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.
         | #class_PropertyValue, Text, URL |  |
| <a id="_class_RepositoryObject_unnamed_lemnr"></a>license[?](http://schema.org/license) | No | A license document that applies to this content, typically indicated by URL. | #class_OrganizationReuseLicense |  |
| <a id="_class_RepositoryObject_unnamed_q7eif"></a>temporalCoverage[?](http://schema.org/temporalCoverage) | No | The temporalCoverage of a CreativeWork indicates the period that the content applies to, i.e. that it describes, either as a DateTime or as a textual string indicating a time period in [ISO 8601 time interval format](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals). In
      the case of a Dataset it will typically indicate the relevant time period in a precise notation (e.g. for a 2011 census dataset, the year 2011 would be written "2011/2012"). Other forms of content, e.g. ScholarlyArticle, Book, TVSeries or TVEpisode, may indicate their temporalCoverage in broader terms - textually or via well-known URL.
      Written works such as books may sometimes have precise temporal coverage too, e.g. a work set in 1939 - 1945 can be indicated in ISO 8601 interval format format via "1939/1945".

Open-ended date ranges can be written with ".." in place of the end date. For example, "2015-11/.." indicates a range beginning in November 2015 and with no specified final date. This is tentative and might be updated in future when ISO 8601 is officially updated. | Text |  |



<br>

## Files

There are three important types of files (or references to other
works) that may be included from the Language Data Commons Schema: \`ldac:PrimaryMaterial\` which an
original object of study, such as a literary work, film, or recording, \`ldac:DerivedMaterial\` which
has been generated or sampled from primary material by a process such as format
conversion or digitization, and \`ldac:Annotation\`, which contains one or more types of
analysis of the \`ldac:PrimaryMaterial\` or \`ldac:DerivedMaterial\`.

### A File:



### ldac:PrimaryMaterial

\`ldac:PrimaryMaterial\` may be a video or audio file if it is available, or may be a ContextualEntity referencing a primary text such as a book.

### ldac:DerivedMaterial

\`ldac:DerivedMaterial\` is a non-analytical derivation from \`ldac:PrimaryMaterial\`, for example, downsampled video or excerpted text.

### ldac:Annotation

\`ldac:Annotation\` is a description or analysis of other material. More than one type of annotation may be present in a file.

#### Describing the columns in CSV or other tabular data

CSV or similar tabular files are often used to represent data. To enable
automated location of which column is which, use a [CSVW](https://csvw.org/) tableSchema described by a \`File\` entity in the crate.

For example: TODO update for csvw
${exampleEntities('art', ['art_schema.json'])}

<br>

## Places

The place in which data was collected may be indicated using the \`contentLocation\` property.

<br>

# Identifiers

Identifiers for Objects and Collections MUST be URIs.

Internally, identifiers for all entities that do not have their own URIs
may use the Archive and Packaging identifier scheme (ARCP), which allows for a DNS-like namespacing of identifiers. For example, the Sydney Speaks corpus top-level
collection would have the ID: TODO update for non-linguistic data

    arcp://name,http://www.dynamicsoflanguage.edu.au/sydney-speaks/corpus/

A sub-corpus (collection) would have an ID like:

    arcp://name,http://www.dynamicsoflanguage.edu.au/sydney-speaks/corpus/collection/SSP

An object:

    arcp://name,http://www.dynamicsoflanguage.edu.au/sydney-speaks/corpus/object/331

A person:

    arcp://name,http://www.dynamicsoflanguage.edu.au/sydney-speaks/corpus/person/54

<br>

## How to record people's contributions

Some corpora express ages and other demographics of participants - this
presents a data modelling challenge, as age and some other variables change
over time, so if the same person appears over time then we need to have a
base \`Person\` with date of birth etc. as well as time-based instances of the person
with an age, social status, gender etc. _at that time_.

There are three levels at which contributions to an object can be
modelled:

1.  Include one or more \`Person\` items as context in a crate and reference
    them with properties such as [creator](http://schema.org/creator). The \`@id\` of the person MUST be a URI and SHOULD be re-used where the same person appears in multiple objects in a collection or repository.

2.  For longitudinal studies where it is important to record changing
    demographic information for a \`Person\`, or where precision is
    required in listing contributions to a work use
    [prov:specializationOf](http://www.w3.org/ns/prov#specializationOf).

3.  If it is important to record lots of contributions to a work (e.g. in
    analysis of a joint work) use [Action](http://schema.org/Action). If more precision is
    required in describing the provenance of items, e.g. this work on
    [The Declaration of Rights of Man and of the
    Citizen](https://www.uts.edu.au/about/faculty-design-architecture-and-building/staff-showcase/writing-rights)
    (Lorber-Kasunic & Sweetapple). TODO

    NOTE: If this approach is used, special care will have to be taken in
    developing user interfaces and/or training communities to use this way
    of modelling metadata; the user need not see the underlying
    structure. This profile does not give advice about how to do this as
    we have not seen a use case that requires it.

<br>