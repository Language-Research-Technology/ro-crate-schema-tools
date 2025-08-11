# Generic Collection RO-Crate Profile



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

The structural elements of a Generic Collection RO-Crate are:

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

### <a id="#class_Dataset"></a> Dataset



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://schema.org/Dataset |
| <a id="#class_Dataset_#prop_accountablePerson_Dataset"></a>accountablePerson[?](http://schema.org/accountablePerson) | Yes | The person or organisation who is the data steward for this resource. | <a href="##class_Person">Person</a>, <a href="##class_Organization">Organization</a> |  |
| <a id="#class_Dataset_#prop_author_Dataset"></a>author[?](http://schema.org/author) | Yes | The person or organisation responsible for creating this collection of data. Authors should be identified using URIs such as ORCiD or ROR. | <a href="##class_Person">Person</a>, <a href="##class_Organization">Organization</a> |  |
| <a id="#class_Dataset_#prop_dct:rightsHolder_Dataset"></a>dct:rightsHolder[?](http://purl.org/dc/terms/rightsHolder) | Yes | The person or organisation owning or managing rights over the resource. | Text, <a href="##class_Person">Person</a>, <a href="##class_Organization">Organization</a> |  |
| <a id="#class_Dataset_#prop_publisher_Dataset"></a>publisher[?](http://schema.org/publisher) | Yes | The organisation responsible for releasing this dataset. | <a href="##class_Organization">Organization</a> |  |
| <a id="#class_Dataset_#prop_citation_Dataset"></a>citation[?](http://schema.org/citation) | No | Associated publications. | <a href="##class_CreativeWork">CreativeWork</a> |  |
| <a id="#class_Dataset_#prop_creditText_Dataset"></a>creditText[?](http://schema.org/creditText) | No | A free text bibliographic citation for this material, e.g. 'Cite as: Musgrave (2023). Title of work. DOI'. | Text |  |
| <a id="#class_Dataset_#prop_funder_Dataset"></a>funder[?](http://schema.org/funder) | No | The organisation(s) responsible for funding the creation or collection of this dataset. | <a href="##class_Organization">Organization</a> |  |
| <a id="#class_Dataset_#prop_hasPart_Dataset"></a>hasPart[?](http://schema.org/hasPart) | No | An item or CreativeWork that is part of this item, or CreativeWork (in some sense). | <a href="##class_CreativeWork">CreativeWork</a>, <a href="##class_File">File</a>, <a href="##class_Dataset">Dataset</a> |  |
| <a id="#class_Dataset_#prop_isAccessibleForFree_Dataset"></a>isAccessibleForFree[?](http://schema.org/isAccessibleForFree) | No | This is available under an Open Access license. | Boolean |  |
| <a id="#class_Dataset_#prop_isBasedOn_Dataset"></a>isBasedOn[?](http://schema.org/isBasedOn) | No | Link to or description of an original resource. | Text, URL, <a href="##class_CreativeWork">CreativeWork</a>, <a href="##class_Dataset">Dataset</a>, <a href="##class_File">File</a> |  |
| <a id="#class_Dataset_#prop_isPartOf_Dataset"></a>isPartOf[?](http://schema.org/isPartOf) | No | An item or CreativeWork that this item, or CreativeWork (in some sense), is part of. | URL, <a href="##class_CreativeWork">CreativeWork</a> |  |
| <a id="#class_Dataset_#prop_pcdm:hasMember_Dataset"></a>pcdm:hasMember[?](http://pcdm.org/models#hasMember) | No | The sub-collections, if any, associated with this collection. | <a href="##class_RepositoryCollection">RepositoryCollection</a>, <a href="##class_RepositoryObject">RepositoryObject</a> |  |
| <a id="#class_Dataset_#prop_pcdm:memberOf_Dataset"></a>pcdm:memberOf[?](http://pcdm.org/models#memberOf) | No | Links from a Repository Object or Collection to a containing Repository Object or Collection. | <a href="##class_RepositoryCollection">RepositoryCollection</a> |  |
| <a id="#class_Dataset_#prop_spatialCoverage_Dataset"></a>spatialCoverage[?](http://schema.org/spatialCoverage) | No | The place(s) that are the focus of the content. It is a sub-property of contentLocation intended primarily for more technical and detailed materials. For example, with a dataset, it indicates areas that the dataset describes: a dataset Cape York languages would have spatialCoverage which was the place: the outline of the Cape. | <a href="##class_Place">Place</a> |  |
| <a id="#class_Dataset_#prop_temporalCoverage_Dataset"></a>temporalCoverage[?](http://schema.org/temporalCoverage) | No | The range of years of creation for items in this dataset using a slash, e.g. 1900/1945. If there are sub-collections with different coverages put this on the sub-collections not the top-level. | DateTime, Text |  |
| <a id="#class_Dataset_#prop_usageInfo_Dataset"></a>usageInfo[?](http://schema.org/usageInfo) | No | Additional information on licensing options for using the data, e.g. 'Contact the Data Steward to discuss license terms'. | Text |  |



<br>

<!-- ![Structure of collections that conform to the Language Data Commons Profile](media/structure.svg) TODO update for non-linguistic data -->

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

In linked data, a class is a resource that represents a concept or entity. Several classes from the Language Data Commons Schema are also applicable to the Generic Collection Profile:

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

<!-- The following diagram shows how these relationships are encoded in a single "bundled" RO-Crate.

![Self-contained collection crate with all resources](media/bundled-crate.svg)

The next diagram shows how distributed crates (with one RO-Crate per Object and Collection) are linked.

![Distributed crate with links to object crates](media/distributed-crates.svg)

Which linking strategy is used is an implementation choice for
repository developers.
-->
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

A Collection is a group of related resources, which may be contain objects or other collections.

When an RO-Crate is used to package a collection that is part of
another Collection, it has a \`pcdm:memberOf\` property which references a
resolvable ID (within the context of a repository or service) of the
parent Collection. The Collection may also list its members in a \`pcdm:hasMember\`
property, but this is not required.

The root dataset must have at least these \`@type\` values: \`["Dataset",
"RepositoryCollection"]\`

### A RepositoryCollection:

### <a id="#class_RepositoryCollection"></a> RepositoryCollection



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://pcdm.org/models#Collection |
| <a id="#class_RepositoryCollection_#prop_inLanguage_RepositoryCollection"></a>inLanguage[?](http://schema.org/inLanguage) | Yes | The language in which the resource is written. | Text |  |
| <a id="#class_RepositoryCollection_#prop_conformsTo_RepositoryCollection"></a>conformsTo[?](http://purl.org/dc/terms/conformsTo) | No | A link to the RO-Crate profile for collections. | Text |  |
| <a id="#class_RepositoryCollection_#prop_contentLocation_RepositoryCollection"></a>contentLocation[?](http://schema.org/contentLocation) | No | The location depicted or described in the content. For example, the location in a photograph or painting. | <a href="##class_Place">Place</a> |  |
| <a id="#class_RepositoryCollection_#prop_dateCreated_RepositoryCollection"></a>dateCreated[?](http://schema.org/dateCreated) | No | The (earliest) date the data in this dataset were created. | Date |  |
| <a id="#class_RepositoryCollection_#prop_holdingArchive_RepositoryCollection"></a>holdingArchive[?](http://schema.org/holdingArchive) | No | Organisation where the original of this work or collection is housed. | <a href="##class_Organization">Organization</a>, Text |  |



<br>

## Object

An Object is a single unit, work or digital entity which may contain files or other objects as its components.

The definition of an object is necessarily loose and needs to reflect
what data owners have chosen to do with their collections in the past.

If an RO-Crate contains a single Object, the Root Dataset would have a
\`@type\` property of \`["Dataset", "RepositoryObject"]\` with a
\`conformsTo\` property pointing to the Generic Collection Object profile 
<https://w3id.org/ldac/collections-profile#Object> (this document).

If an RO-Crate contains an entire collection, each Object has a
\`@type\` property of \`["Dataset", "RepositoryObject"]\` and a \`conformsTo\`
property referencing this document. For example:

Objects SHOULD have files (which may be included in an RO-Crate for the
object, or as part of a collection crate).

<!-- In this example, the Object in question is an interview from a speech
corpus with three files. The diagram shows the relationships between
the object and its files, and the contextual metadata of a Person who
takes the role of the speaker/informant (discussed in more detail
below). TODO update for non-linguistic data

![Structure of an Object crate](media/object-structure.svg) -->

There are a number of terms that can be used to characterise resources -
these use the Schema.org mechanism of \`DefinedTerm\` and \`DefinedTermSet\`.

### A RepositoryObject:

### <a id="#class_RepositoryObject"></a> RepositoryObject



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://pcdm.org/models#Object |
| <a id="#class_RepositoryObject_#prop_creator_RepositoryObject"></a>creator[?](http://schema.org/creator) | No | The creator/author of this CreativeWork. This is the same as the Author property for CreativeWork. | <a href="##class_Person">Person</a> |  |
| <a id="#class_RepositoryObject_#prop_dateCreated_RepositoryObject"></a>dateCreated[?](http://schema.org/dateCreated) | No | The date on which the CreativeWork was created or the item was added to a DataFeed. | Text |  |
| <a id="#class_RepositoryObject_#prop_description_RepositoryObject"></a>description[?](http://schema.org/description) | No | A description of the item. | Text |  |
| <a id="#class_RepositoryObject_#prop_identifier_RepositoryObject"></a>identifier[?](http://schema.org/identifier) | No | The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.  | <a href="##class_PropertyValue">PropertyValue</a>, Text, URL |  |
| <a id="#class_RepositoryObject_#prop_temporalCoverage_RepositoryObject"></a>temporalCoverage[?](http://schema.org/temporalCoverage) | No | The temporalCoverage of a CreativeWork indicates the period that the content applies to, i.e. that it describes, either as a DateTime or as a textual string indicating a time period in [ISO 8601 time interval format](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals). In the case of a Dataset it will typically indicate the relevant time period in a precise notation (e.g. for a 2011 census dataset, the year 2011 would be written "2011/2012"). Other forms of content, e.g. ScholarlyArticle, Book, TVSeries or TVEpisode, may indicate their temporalCoverage in broader terms - textually or via well-known URL. Written works such as books may sometimes have precise temporal coverage too, e.g. a work set in 1939 - 1945 can be indicated in ISO 8601 interval format format via "1939/1945". Open-ended date ranges can be written with ".." in place of the end date. For example, "2015-11/.." indicates a range beginning in November 2015 and with no specified final date. This is tentative and might be updated in future when ISO 8601 is officially updated. | Text |  |



<br>

## Files

A File is a sequence of binary data, which must be contained by an Object.

There are three important types of files (or references to other
works) that may be included from the Language Data Commons Schema: \`ldac:PrimaryMaterial\` which an
original object of study, such as a literary work, film, or recording, \`ldac:DerivedMaterial\` which
has been generated or sampled from primary material by a process such as format
conversion or digitization, and \`ldac:Annotation\`, which contains one or more types of
analysis of the \`ldac:PrimaryMaterial\` or \`ldac:DerivedMaterial\`.

### A File:

### <a id="#class_File"></a> File



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://schema.org/MediaObject |
| <a id="#class_File_#prop_contentSize_File"></a>contentSize[?](http://schema.org/contentSize) | No | File size in (mega/kilo)bytes. | Text |  |
| <a id="#class_File_#prop_encodingFormat_File"></a>encodingFormat[?](http://schema.org/encodingFormat) | No | The media type typically expressed using a MIME format. | Text, <a href="##class_WebPage">WebPage</a> |  |
| <a id="#class_File_#prop_hasPart_File"></a>hasPart[?](http://schema.org/hasPart) | No | An item or CreativeWork that is part of this item, or CreativeWork (in some sense). | <a href="##class_CreativeWork">CreativeWork</a>, <a href="##class_File">File</a> |  |
| <a id="#class_File_#prop_ldac:derivationOf_File"></a>ldac:derivationOf[?](https://w3id.org/ldac/terms#derivationOf) | No | This property references another resource from which the current resource is derived, e.g. downsampling audio or video files, or extracting text from a PDF. | <a href="##class_CreativeWork">CreativeWork</a> |  |
| <a id="#class_File_#prop_ldac:hasDerivation_File"></a>ldac:hasDerivation[?](https://w3id.org/ldac/terms#hasDerivation) | No | This property references another resource that is derived from it, such as a downsampled audio or video file, or text extracted from a PDF. | <a href="##class_CreativeWork">CreativeWork</a> |  |
| <a id="#class_File_#prop_ldac:materialType_File"></a>ldac:materialType[?](https://w3id.org/ldac/terms#materialType) | No | Indicates whether the material in a file is the original (primary) source or is derived from it or describes it via annotation. | <a href="#ldac:MaterialTypes">MaterialTypes</a> |  |



### ldac:PrimaryMaterial

\`ldac:PrimaryMaterial\` may be a video or audio file if it is available, or may be a ContextualEntity referencing a primary text such as a book.

### ldac:DerivedMaterial

\`ldac:DerivedMaterial\` is a non-analytical derivation from \`ldac:PrimaryMaterial\`, for example, downsampled video or excerpted text.

### ldac:Annotation

\`ldac:Annotation\` is a description or analysis of other material. More than one type of annotation may be present in a file.

#### Describing the columns in CSV or other tabular data

CSV or similar tabular files are often used to represent data. To enable
automated location of which column is which, use a [CSVW](https://csvw.org/) tableSchema described by a \`File\` entity in the crate.

<!-- For example: TODO update for csvw
${exampleEntities('art', ['art_schema.json'])} -->

<br>

## Places

The place in which data was collected may be indicated using the \`contentLocation\` property.

<br>

# Identifiers

Identifiers for Objects and Collections MUST be URIs.

Internally, identifiers for all entities that do not have their own URIs
may use the Archive and Packaging identifier scheme (ARCP), which allows for a DNS-like namespacing of identifiers.
<!-- For example, the Sydney Speaks corpus top-level
collection would have the ID: TODO update for non-linguistic data

    arcp://name,http://www.dynamicsoflanguage.edu.au/sydney-speaks/corpus/

A sub-corpus (collection) would have an ID like:

    arcp://name,http://www.dynamicsoflanguage.edu.au/sydney-speaks/corpus/collection/SSP

An object:

    arcp://name,http://www.dynamicsoflanguage.edu.au/sydney-speaks/corpus/object/331

A person:

    arcp://name,http://www.dynamicsoflanguage.edu.au/sydney-speaks/corpus/person/54 -->

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
    (Lorber-Kasunic & Sweetapple).

    NOTE: If this approach is used, special care will have to be taken in
    developing user interfaces and/or training communities to use this way
    of modelling metadata; the user need not see the underlying
    structure. This profile does not give advice about how to do this as
    we have not seen a use case that requires it.

<br>





## Defined Term Sets

### <a id="ldac:MaterialTypes"></a>MaterialTypes

Set of defined terms for ldac:materialType

| Term | Description |
| ---- | ----------- |
| Annotation | The resource includes material that adds information to some other linguistic record. |
| DerivedMaterial | This is derived from another source, such as a Primary Material, via some process, e.g. a downsampled video or a sample or an abstract of a resource that is not an annotation (an analysis or description). |
| PrimaryMaterial | The object of study, such as a literary work, film, or recording of natural discourse. |

### <a id="ldac:CollectionEventTypeTerms"></a>CollectionEventTypeTerms

Set of defined terms for ldac:collectionEventType

| Term | Description |
| ---- | ----------- |
| Session | A collection event that is a recording or elicitation session with participants. |

### <a id="ldac:CollectionProtocolTypeTerms"></a>CollectionProtocolTypeTerms

Set of defined terms for ldac:collectionProtocolType

| Term | Description |
| ---- | ----------- |
| ElicitationTask | The collection protocol includes a task-based prompt to participants. |
| MaterialSelectionCriteria | A description of the criteria used to select texts in a collection. |

### <a id="ldac:AccessTypes"></a>AccessTypes

Set of defined terms for ldac:access

| Term | Description |
| ---- | ----------- |
| AuthorizedAccess | Indicates that a DataReuseLicense requires some kind of authorization step, from SelfAuthorization (click-through) to processes that require a data steward to grant permission. |
| OpenAccess | Data covered by this license may be accessed as long as the license is served alongside it, and does not require any specific authorization step. |

### <a id="ldac:AuthorizationWorkflows"></a>AuthorizationWorkflows

Set of defined terms for ldac:authorizationWorkflow

| Term | Description |
| ---- | ----------- |
| AccessControlList | License grants access to data based on a list of approved users, specified using the property accessControlList. |
| AgreeToTerms | A user is expected to explicitly agree to a set of license terms, this may be combined with AccessControlList - to note that even if a user has been pre-approved for a license they must agree to license terms. |
| AuthorizationByApplication | Users may apply for a license via some workflow, such as a form, with the decision being made by a DataSteward or their delegate about whether to grant the license. |
| AuthorizationByInvitation | A data steward or administrator is expected to use an access control system to invite users, for example, participants, collaborators or students. |
| SelfAuthorization | A user can be authorised to access data by clicking that they agree to a license, or filling out a form to check their understanding, which can be validated by a machine and does not require human intervention. |



## Types of entities (specializations of Classes) and expected Properties

### <a id="#RO-Crate_Metadata_Descriptor"></a> RO-Crate Metadata Descriptor

An RO-Crate @graph must contain an entity of Type @CreativeWork which is known as the RO-Crate Metadata descriptor.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://schema.org/CreativeWork |
| <a id="#RO-Crate_Metadata_Descriptor_#RO-Crate_Metadata_Descriptor.id"></a>@id | Yes | The RO-Crate Metadata file identifier | <a href="##Root_Data_Entity">Root Data Entity</a> | ro-crate-metadata.json |
| <a id="#RO-Crate_Metadata_Descriptor_#RO-Crate_Metadata_Descriptor.about"></a>about[?](http://schema.org/about) | Yes | This property on the RO-Crate Metadata Descriptor references the Root Data Entity. In a SoSS+ profile there may be Schemas present for more than one 'flavour' of Root Data Entity with different @type arrays or `@conformsTo` references (or other specializations). | <a href="##Root_Data_Entity">Root Data Entity</a> |  |

### <a id="#Root_Data_Entity"></a> Root Data Entity

The Root Data Entity for an RO-Crate. This is the main entity of the RO-Crate and is the one that is referenced by the RO-Crate Metadata Descriptor. In this profile, it is a Dataset and RepositoryCollection.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://schema.org/Dataset, http://pcdm.org/models#Collection |
| <a id="#Root_Data_Entity_#prop_datePublished_Dataset"></a>datePublished[?](http://schema.org/datePublished) | Yes | A date that this collection was published. This should be the date that the collection was first made available. | Date |  |
| <a id="#Root_Data_Entity_#prop_description_Dataset"></a>description[?](http://schema.org/description) | Yes | An abstract of the collection. Include as much detail as possible about the motivation and use of the collection. | Text |  |
| <a id="#Root_Data_Entity_#prop_license_Dataset"></a>license[?](http://schema.org/license) | Yes | A license document that applies to this content, typically indicated by URL. | <a href="##class_CreativeWork">CreativeWork</a>, URL, Text |  |
| <a id="#Root_Data_Entity_#prop_name_Dataset"></a>name[?](http://schema.org/name) | Yes | The name of this data collection. | Text |  |

### <a id="#class_CreativeWork"></a> CreativeWork



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://schema.org/CreativeWork |
| <a id="#class_CreativeWork_#prop_author_CreativeWork"></a>author[?](http://schema.org/author) | No | The person or organisation responsible for creating this work. Authors should be identified using URIs such as ORCiD or ROR. | Text, <a href="##class_Person">Person</a>, <a href="##class_Organization">Organization</a> |  |
| <a id="#class_CreativeWork_#prop_isbn_CreativeWork"></a>isbn[?](http://schema.org/isbn) | No | The ISBN for this work, if applicable. | Text |  |
| <a id="#class_CreativeWork_#prop_issn_CreativeWork"></a>issn[?](http://schema.org/issn) | No | The ISSN for this publication. | Text |  |
| <a id="#class_CreativeWork_#prop_publisher_CreativeWork"></a>publisher[?](http://schema.org/publisher) | No | The organisation that published this work. | Text, <a href="##class_Organization">Organization</a> |  |
| <a id="#class_CreativeWork_#prop_recipient_CreativeWork"></a>recipient[?](http://schema.org/recipient) | No | The person or organisation responsible for creating this work. Authors should be identified using URIs such as ORCiD or ROR. | Text, <a href="##class_Person">Person</a>, <a href="##class_Organization">Organization</a> |  |

### <a id="#class_Dataset"></a> Dataset



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://schema.org/Dataset |
| <a id="#class_Dataset_#prop_accountablePerson_Dataset"></a>accountablePerson[?](http://schema.org/accountablePerson) | Yes | The person or organisation who is the data steward for this resource. | <a href="##class_Person">Person</a>, <a href="##class_Organization">Organization</a> |  |
| <a id="#class_Dataset_#prop_author_Dataset"></a>author[?](http://schema.org/author) | Yes | The person or organisation responsible for creating this collection of data. Authors should be identified using URIs such as ORCiD or ROR. | <a href="##class_Person">Person</a>, <a href="##class_Organization">Organization</a> |  |
| <a id="#class_Dataset_#prop_dct:rightsHolder_Dataset"></a>dct:rightsHolder[?](http://purl.org/dc/terms/rightsHolder) | Yes | The person or organisation owning or managing rights over the resource. | Text, <a href="##class_Person">Person</a>, <a href="##class_Organization">Organization</a> |  |
| <a id="#class_Dataset_#prop_publisher_Dataset"></a>publisher[?](http://schema.org/publisher) | Yes | The organisation responsible for releasing this dataset. | <a href="##class_Organization">Organization</a> |  |
| <a id="#class_Dataset_#prop_citation_Dataset"></a>citation[?](http://schema.org/citation) | No | Associated publications. | <a href="##class_CreativeWork">CreativeWork</a> |  |
| <a id="#class_Dataset_#prop_creditText_Dataset"></a>creditText[?](http://schema.org/creditText) | No | A free text bibliographic citation for this material, e.g. 'Cite as: Musgrave (2023). Title of work. DOI'. | Text |  |
| <a id="#class_Dataset_#prop_funder_Dataset"></a>funder[?](http://schema.org/funder) | No | The organisation(s) responsible for funding the creation or collection of this dataset. | <a href="##class_Organization">Organization</a> |  |
| <a id="#class_Dataset_#prop_hasPart_Dataset"></a>hasPart[?](http://schema.org/hasPart) | No | An item or CreativeWork that is part of this item, or CreativeWork (in some sense). | <a href="##class_CreativeWork">CreativeWork</a>, <a href="##class_File">File</a>, <a href="##class_Dataset">Dataset</a> |  |
| <a id="#class_Dataset_#prop_isAccessibleForFree_Dataset"></a>isAccessibleForFree[?](http://schema.org/isAccessibleForFree) | No | This is available under an Open Access license. | Boolean |  |
| <a id="#class_Dataset_#prop_isBasedOn_Dataset"></a>isBasedOn[?](http://schema.org/isBasedOn) | No | Link to or description of an original resource. | Text, URL, <a href="##class_CreativeWork">CreativeWork</a>, <a href="##class_Dataset">Dataset</a>, <a href="##class_File">File</a> |  |
| <a id="#class_Dataset_#prop_isPartOf_Dataset"></a>isPartOf[?](http://schema.org/isPartOf) | No | An item or CreativeWork that this item, or CreativeWork (in some sense), is part of. | URL, <a href="##class_CreativeWork">CreativeWork</a> |  |
| <a id="#class_Dataset_#prop_pcdm:hasMember_Dataset"></a>pcdm:hasMember[?](http://pcdm.org/models#hasMember) | No | The sub-collections, if any, associated with this collection. | <a href="##class_RepositoryCollection">RepositoryCollection</a>, <a href="##class_RepositoryObject">RepositoryObject</a> |  |
| <a id="#class_Dataset_#prop_pcdm:memberOf_Dataset"></a>pcdm:memberOf[?](http://pcdm.org/models#memberOf) | No | Links from a Repository Object or Collection to a containing Repository Object or Collection. | <a href="##class_RepositoryCollection">RepositoryCollection</a> |  |
| <a id="#class_Dataset_#prop_spatialCoverage_Dataset"></a>spatialCoverage[?](http://schema.org/spatialCoverage) | No | The place(s) that are the focus of the content. It is a sub-property of contentLocation intended primarily for more technical and detailed materials. For example, with a dataset, it indicates areas that the dataset describes: a dataset Cape York languages would have spatialCoverage which was the place: the outline of the Cape. | <a href="##class_Place">Place</a> |  |
| <a id="#class_Dataset_#prop_temporalCoverage_Dataset"></a>temporalCoverage[?](http://schema.org/temporalCoverage) | No | The range of years of creation for items in this dataset using a slash, e.g. 1900/1945. If there are sub-collections with different coverages put this on the sub-collections not the top-level. | DateTime, Text |  |
| <a id="#class_Dataset_#prop_usageInfo_Dataset"></a>usageInfo[?](http://schema.org/usageInfo) | No | Additional information on licensing options for using the data, e.g. 'Contact the Data Steward to discuss license terms'. | Text |  |

### <a id="#class_Person"></a> Person



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://schema.org/Person |
| <a id="#class_Person_#prop_affiliation_Person"></a>affiliation[?](http://schema.org/affiliation) | No | The organisation that this person is affiliated with. For example, a university or school. | <a href="##class_Organization">Organization</a> |  |

### <a id="#class_Organization"></a> Organization



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://schema.org/Organization |
| <a id="#class_Organization_#prop_location_Organization"></a>location[?](http://schema.org/location) | No | A location for the organisation, e.g. a city for a publisher. | Text |  |

### <a id="#class_File"></a> File



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://schema.org/MediaObject |
| <a id="#class_File_#prop_contentSize_File"></a>contentSize[?](http://schema.org/contentSize) | No | File size in (mega/kilo)bytes. | Text |  |
| <a id="#class_File_#prop_encodingFormat_File"></a>encodingFormat[?](http://schema.org/encodingFormat) | No | The media type typically expressed using a MIME format. | Text, <a href="##class_WebPage">WebPage</a> |  |
| <a id="#class_File_#prop_hasPart_File"></a>hasPart[?](http://schema.org/hasPart) | No | An item or CreativeWork that is part of this item, or CreativeWork (in some sense). | <a href="##class_CreativeWork">CreativeWork</a>, <a href="##class_File">File</a> |  |
| <a id="#class_File_#prop_ldac:derivationOf_File"></a>ldac:derivationOf[?](https://w3id.org/ldac/terms#derivationOf) | No | This property references another resource from which the current resource is derived, e.g. downsampling audio or video files, or extracting text from a PDF. | <a href="##class_CreativeWork">CreativeWork</a> |  |
| <a id="#class_File_#prop_ldac:hasDerivation_File"></a>ldac:hasDerivation[?](https://w3id.org/ldac/terms#hasDerivation) | No | This property references another resource that is derived from it, such as a downsampled audio or video file, or text extracted from a PDF. | <a href="##class_CreativeWork">CreativeWork</a> |  |
| <a id="#class_File_#prop_ldac:materialType_File"></a>ldac:materialType[?](https://w3id.org/ldac/terms#materialType) | No | Indicates whether the material in a file is the original (primary) source or is derived from it or describes it via annotation. | <a href="#ldac:MaterialTypes">MaterialTypes</a> |  |

### <a id="#class_Place"></a> Place



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://schema.org/Place |
| <a id="#class_Place_#prop_address_Place"></a>address[?](http://schema.org/address) | No | The physical address of the place. | Text |  |
| <a id="#class_Place_#prop_geo_Place"></a>geo[?](http://schema.org/geo) | No | The geographic coordinates of the place. | <a href="##class_Geometry">Geometry</a> |  |

### <a id="#class_RepositoryCollection"></a> RepositoryCollection



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://pcdm.org/models#Collection |
| <a id="#class_RepositoryCollection_#prop_inLanguage_RepositoryCollection"></a>inLanguage[?](http://schema.org/inLanguage) | Yes | The language in which the resource is written. | Text |  |
| <a id="#class_RepositoryCollection_#prop_conformsTo_RepositoryCollection"></a>conformsTo[?](http://purl.org/dc/terms/conformsTo) | No | A link to the RO-Crate profile for collections. | Text |  |
| <a id="#class_RepositoryCollection_#prop_contentLocation_RepositoryCollection"></a>contentLocation[?](http://schema.org/contentLocation) | No | The location depicted or described in the content. For example, the location in a photograph or painting. | <a href="##class_Place">Place</a> |  |
| <a id="#class_RepositoryCollection_#prop_dateCreated_RepositoryCollection"></a>dateCreated[?](http://schema.org/dateCreated) | No | The (earliest) date the data in this dataset were created. | Date |  |
| <a id="#class_RepositoryCollection_#prop_holdingArchive_RepositoryCollection"></a>holdingArchive[?](http://schema.org/holdingArchive) | No | Organisation where the original of this work or collection is housed. | <a href="##class_Organization">Organization</a>, Text |  |

### <a id="#class_RepositoryObject"></a> RepositoryObject



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://pcdm.org/models#Object |
| <a id="#class_RepositoryObject_#prop_creator_RepositoryObject"></a>creator[?](http://schema.org/creator) | No | The creator/author of this CreativeWork. This is the same as the Author property for CreativeWork. | <a href="##class_Person">Person</a> |  |
| <a id="#class_RepositoryObject_#prop_dateCreated_RepositoryObject"></a>dateCreated[?](http://schema.org/dateCreated) | No | The date on which the CreativeWork was created or the item was added to a DataFeed. | Text |  |
| <a id="#class_RepositoryObject_#prop_description_RepositoryObject"></a>description[?](http://schema.org/description) | No | A description of the item. | Text |  |
| <a id="#class_RepositoryObject_#prop_identifier_RepositoryObject"></a>identifier[?](http://schema.org/identifier) | No | The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.  | <a href="##class_PropertyValue">PropertyValue</a>, Text, URL |  |
| <a id="#class_RepositoryObject_#prop_temporalCoverage_RepositoryObject"></a>temporalCoverage[?](http://schema.org/temporalCoverage) | No | The temporalCoverage of a CreativeWork indicates the period that the content applies to, i.e. that it describes, either as a DateTime or as a textual string indicating a time period in [ISO 8601 time interval format](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals). In the case of a Dataset it will typically indicate the relevant time period in a precise notation (e.g. for a 2011 census dataset, the year 2011 would be written "2011/2012"). Other forms of content, e.g. ScholarlyArticle, Book, TVSeries or TVEpisode, may indicate their temporalCoverage in broader terms - textually or via well-known URL. Written works such as books may sometimes have precise temporal coverage too, e.g. a work set in 1939 - 1945 can be indicated in ISO 8601 interval format format via "1939/1945". Open-ended date ranges can be written with ".." in place of the end date. For example, "2015-11/.." indicates a range beginning in November 2015 and with no specified final date. This is tentative and might be updated in future when ISO 8601 is officially updated. | Text |  |

### <a id="#class_PropertyValue"></a> PropertyValue



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://schema.org/PropertyValue |
*No properties defined for this class*


### <a id="#class_Geometry"></a> Geometry



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://www.opengis.net/ont/geosparql#Geometry |
| <a id="#class_Geometry_#prop_geosparql:asWKT_Geometry"></a>geosparql:asWKT[?](http://www.opengis.net/ont/geosparql#asWKT) | No | The WKT serialisation of the geometry. | Text |  |

### <a id="#class_WebPage"></a> WebPage



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | http://schema.org/WebPage |
*No properties defined for this class*


### <a id="#class_ldac:CollectionEvent"></a> ldac:CollectionEvent



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | https://w3id.org/ldac/terms#CollectionEvent |
| <a id="#class_ldac:CollectionEvent_#prop_ldac:collectionEventType_ldac:CollectionEvent"></a>ldac:collectionEventType[?](https://w3id.org/ldac/terms#collectionEventType) | No | A kind of CollectionEvent characterised by some specific procedures, e.g. a psycholinguistic experiment. | <a href="#ldac:CollectionEventTypeTerms">CollectionEventTypeTerms</a> |  |

### <a id="#class_ldac:CollectionProtocol"></a> ldac:CollectionProtocol



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | https://w3id.org/ldac/terms#CollectionProtocol |
| <a id="#class_ldac:CollectionProtocol_#prop_ldac:collectionProtocolType_ldac:CollectionProtocol"></a>ldac:collectionProtocolType[?](https://w3id.org/ldac/terms#collectionProtocolType) | No | A description of the process used to collect or collate data, such as prompts given to participants, or how texts are selected for inclusion in a collection. | <a href="#ldac:CollectionProtocolTypeTerms">CollectionProtocolTypeTerms</a> |  |

### <a id="#class_ldac:DataLicense"></a> ldac:DataLicense



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | https://w3id.org/ldac/terms#DataLicense |
| <a id="#class_ldac:DataLicense_#prop_ldac:reviewDate_ldac:DataLicense"></a>ldac:reviewDate[?](https://w3id.org/ldac/terms#reviewDate) | No | The date that this license should be reviewed. | Text |  |

### <a id="#class_ldac:DataDepositLicense"></a> ldac:DataDepositLicense



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | https://w3id.org/ldac/terms#DataDepositLicense |
*No properties defined for this class*


### <a id="#class_ldac:DataReuseLicense"></a> ldac:DataReuseLicense



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | yes |  |  | https://w3id.org/ldac/terms#DataReuseLicense |
| <a id="#class_ldac:DataReuseLicense_#prop_ldac:access_ldac:DataReuseLicense"></a>ldac:access[?](https://w3id.org/ldac/terms#access) | No | Whether this is an open or restricted access license. | <a href="#ldac:AccessTypes">AccessTypes</a> |  |
| <a id="#class_ldac:DataReuseLicense_#prop_ldac:accessControlList_ldac:DataReuseLicense"></a>ldac:accessControlList[?](https://w3id.org/ldac/terms#accessControlList) | No | When a license has an authorizationWorkflow property with a value of the DefinedTerm AccessControlList this property has a URI value that points to a list of userIDs. | URL |  |
| <a id="#class_ldac:DataReuseLicense_#prop_ldac:authorizationWorkflow_ldac:DataReuseLicense"></a>ldac:authorizationWorkflow[?](https://w3id.org/ldac/terms#authorizationWorkflow) | No | By what process a user is granted authorization to a license. | <a href="#ldac:AuthorizationWorkflows">AuthorizationWorkflows</a> |  |

## All Properties

| Property | Description | Occurs in Domain(s) |
| ---- | ----------- | ----------- |
| <a id="#RO-Crate_Metadata_Descriptor.id_#RO-Crate_Metadata_Descriptor.id"></a>@id | The RO-Crate Metadata file identifier | <a href="##RO-Crate_Metadata_Descriptor">RO-Crate Metadata Descriptor</a> |
| <a id="#RO-Crate_Metadata_Descriptor.about_#RO-Crate_Metadata_Descriptor.about"></a>about[?](http://schema.org/about) | This property on the RO-Crate Metadata Descriptor references the Root Data Entity. In a SoSS+ profile there may be Schemas present for more than one 'flavour' of Root Data Entity with different @type arrays or `@conformsTo` references (or other specializations). | <a href="##RO-Crate_Metadata_Descriptor">RO-Crate Metadata Descriptor</a> |
| <a id="#prop_accountablePerson_Dataset_#prop_accountablePerson_Dataset"></a>accountablePerson[?](http://schema.org/accountablePerson) | The person or organisation who is the data steward for this resource. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_address_Place_#prop_address_Place"></a>address[?](http://schema.org/address) | The physical address of the place. | <a href="##class_Place">Place</a> |
| <a id="#prop_affiliation_Person_#prop_affiliation_Person"></a>affiliation[?](http://schema.org/affiliation) | The organisation that this person is affiliated with. For example, a university or school. | <a href="##class_Person">Person</a> |
| <a id="#prop_author_Dataset_#prop_author_Dataset"></a>author[?](http://schema.org/author) | The person or organisation responsible for creating this collection of data. Authors should be identified using URIs such as ORCiD or ROR. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_author_CreativeWork_#prop_author_CreativeWork"></a>author[?](http://schema.org/author) | The person or organisation responsible for creating this work. Authors should be identified using URIs such as ORCiD or ROR. | <a href="##class_CreativeWork">CreativeWork</a> |
| <a id="#prop_citation_Dataset_#prop_citation_Dataset"></a>citation[?](http://schema.org/citation) | Associated publications. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_conformsTo_RepositoryCollection_#prop_conformsTo_RepositoryCollection"></a>conformsTo[?](http://purl.org/dc/terms/conformsTo) | A link to the RO-Crate profile for collections. | <a href="##class_RepositoryCollection">RepositoryCollection</a> |
| <a id="#prop_contentLocation_RepositoryCollection_#prop_contentLocation_RepositoryCollection"></a>contentLocation[?](http://schema.org/contentLocation) | The location depicted or described in the content. For example, the location in a photograph or painting. | <a href="##class_RepositoryCollection">RepositoryCollection</a> |
| <a id="#prop_contentSize_File_#prop_contentSize_File"></a>contentSize[?](http://schema.org/contentSize) | File size in (mega/kilo)bytes. | <a href="##class_File">File</a> |
| <a id="#prop_creator_RepositoryObject_#prop_creator_RepositoryObject"></a>creator[?](http://schema.org/creator) | The creator/author of this CreativeWork. This is the same as the Author property for CreativeWork. | <a href="##class_RepositoryObject">RepositoryObject</a> |
| <a id="#prop_creditText_Dataset_#prop_creditText_Dataset"></a>creditText[?](http://schema.org/creditText) | A free text bibliographic citation for this material, e.g. 'Cite as: Musgrave (2023). Title of work. DOI'. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_dateCreated_RepositoryCollection_#prop_dateCreated_RepositoryCollection"></a>dateCreated[?](http://schema.org/dateCreated) | The (earliest) date the data in this dataset were created. | <a href="##class_RepositoryCollection">RepositoryCollection</a> |
| <a id="#prop_dateCreated_RepositoryObject_#prop_dateCreated_RepositoryObject"></a>dateCreated[?](http://schema.org/dateCreated) | The date on which the CreativeWork was created or the item was added to a DataFeed. | <a href="##class_RepositoryObject">RepositoryObject</a> |
| <a id="#prop_datePublished_Dataset_#prop_datePublished_Dataset"></a>datePublished[?](http://schema.org/datePublished) | A date that this collection was published. This should be the date that the collection was first made available. | <a href="##Root_Data_Entity">Root Data Entity</a> |
| <a id="#prop_dct:rightsHolder_Dataset_#prop_dct:rightsHolder_Dataset"></a>dct:rightsHolder[?](http://purl.org/dc/terms/rightsHolder) | The person or organisation owning or managing rights over the resource. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_description_Dataset_#prop_description_Dataset"></a>description[?](http://schema.org/description) | An abstract of the collection. Include as much detail as possible about the motivation and use of the collection. | <a href="##Root_Data_Entity">Root Data Entity</a> |
| <a id="#prop_description_RepositoryObject_#prop_description_RepositoryObject"></a>description[?](http://schema.org/description) | A description of the item. | <a href="##class_RepositoryObject">RepositoryObject</a> |
| <a id="#prop_encodingFormat_File_#prop_encodingFormat_File"></a>encodingFormat[?](http://schema.org/encodingFormat) | The media type typically expressed using a MIME format. | <a href="##class_File">File</a> |
| <a id="#prop_funder_Dataset_#prop_funder_Dataset"></a>funder[?](http://schema.org/funder) | The organisation(s) responsible for funding the creation or collection of this dataset. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_geo_Place_#prop_geo_Place"></a>geo[?](http://schema.org/geo) | The geographic coordinates of the place. | <a href="##class_Place">Place</a> |
| <a id="#prop_geosparql:asWKT_Geometry_#prop_geosparql:asWKT_Geometry"></a>geosparql:asWKT[?](http://www.opengis.net/ont/geosparql#asWKT) | The WKT serialisation of the geometry. | <a href="##class_Geometry">Geometry</a> |
| <a id="#prop_hasPart_Dataset_#prop_hasPart_Dataset"></a>hasPart[?](http://schema.org/hasPart) | An item or CreativeWork that is part of this item, or CreativeWork (in some sense). | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_hasPart_File_#prop_hasPart_File"></a>hasPart[?](http://schema.org/hasPart) | An item or CreativeWork that is part of this item, or CreativeWork (in some sense). | <a href="##class_File">File</a> |
| <a id="#prop_holdingArchive_RepositoryCollection_#prop_holdingArchive_RepositoryCollection"></a>holdingArchive[?](http://schema.org/holdingArchive) | Organisation where the original of this work or collection is housed. | <a href="##class_RepositoryCollection">RepositoryCollection</a> |
| <a id="#prop_identifier_RepositoryObject_#prop_identifier_RepositoryObject"></a>identifier[?](http://schema.org/identifier) | The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.  | <a href="##class_RepositoryObject">RepositoryObject</a> |
| <a id="#prop_inLanguage_RepositoryCollection_#prop_inLanguage_RepositoryCollection"></a>inLanguage[?](http://schema.org/inLanguage) | The language in which the resource is written. | <a href="##class_RepositoryCollection">RepositoryCollection</a> |
| <a id="#prop_isAccessibleForFree_Dataset_#prop_isAccessibleForFree_Dataset"></a>isAccessibleForFree[?](http://schema.org/isAccessibleForFree) | This is available under an Open Access license. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_isBasedOn_Dataset_#prop_isBasedOn_Dataset"></a>isBasedOn[?](http://schema.org/isBasedOn) | Link to or description of an original resource. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_isbn_CreativeWork_#prop_isbn_CreativeWork"></a>isbn[?](http://schema.org/isbn) | The ISBN for this work, if applicable. | <a href="##class_CreativeWork">CreativeWork</a> |
| <a id="#prop_isPartOf_Dataset_#prop_isPartOf_Dataset"></a>isPartOf[?](http://schema.org/isPartOf) | An item or CreativeWork that this item, or CreativeWork (in some sense), is part of. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_issn_CreativeWork_#prop_issn_CreativeWork"></a>issn[?](http://schema.org/issn) | The ISSN for this publication. | <a href="##class_CreativeWork">CreativeWork</a> |
| <a id="#prop_ldac:access_ldac:DataReuseLicense_#prop_ldac:access_ldac:DataReuseLicense"></a>ldac:access[?](https://w3id.org/ldac/terms#access) | Whether this is an open or restricted access license. | <a href="##class_ldac:DataReuseLicense">ldac:DataReuseLicense</a> |
| <a id="#prop_ldac:accessControlList_ldac:DataReuseLicense_#prop_ldac:accessControlList_ldac:DataReuseLicense"></a>ldac:accessControlList[?](https://w3id.org/ldac/terms#accessControlList) | When a license has an authorizationWorkflow property with a value of the DefinedTerm AccessControlList this property has a URI value that points to a list of userIDs. | <a href="##class_ldac:DataReuseLicense">ldac:DataReuseLicense</a> |
| <a id="#prop_ldac:authorizationWorkflow_ldac:DataReuseLicense_#prop_ldac:authorizationWorkflow_ldac:DataReuseLicense"></a>ldac:authorizationWorkflow[?](https://w3id.org/ldac/terms#authorizationWorkflow) | By what process a user is granted authorization to a license. | <a href="##class_ldac:DataReuseLicense">ldac:DataReuseLicense</a> |
| <a id="#prop_ldac:collectionEventType_ldac:CollectionEvent_#prop_ldac:collectionEventType_ldac:CollectionEvent"></a>ldac:collectionEventType[?](https://w3id.org/ldac/terms#collectionEventType) | A kind of CollectionEvent characterised by some specific procedures, e.g. a psycholinguistic experiment. | <a href="##class_ldac:CollectionEvent">ldac:CollectionEvent</a> |
| <a id="#prop_ldac:collectionProtocolType_ldac:CollectionProtocol_#prop_ldac:collectionProtocolType_ldac:CollectionProtocol"></a>ldac:collectionProtocolType[?](https://w3id.org/ldac/terms#collectionProtocolType) | A description of the process used to collect or collate data, such as prompts given to participants, or how texts are selected for inclusion in a collection. | <a href="##class_ldac:CollectionProtocol">ldac:CollectionProtocol</a> |
| <a id="#prop_ldac:derivationOf_File_#prop_ldac:derivationOf_File"></a>ldac:derivationOf[?](https://w3id.org/ldac/terms#derivationOf) | This property references another resource from which the current resource is derived, e.g. downsampling audio or video files, or extracting text from a PDF. | <a href="##class_File">File</a> |
| <a id="#prop_ldac:hasDerivation_File_#prop_ldac:hasDerivation_File"></a>ldac:hasDerivation[?](https://w3id.org/ldac/terms#hasDerivation) | This property references another resource that is derived from it, such as a downsampled audio or video file, or text extracted from a PDF. | <a href="##class_File">File</a> |
| <a id="#prop_ldac:materialType_File_#prop_ldac:materialType_File"></a>ldac:materialType[?](https://w3id.org/ldac/terms#materialType) | Indicates whether the material in a file is the original (primary) source or is derived from it or describes it via annotation. | <a href="##class_File">File</a> |
| <a id="#prop_ldac:reviewDate_ldac:DataLicense_#prop_ldac:reviewDate_ldac:DataLicense"></a>ldac:reviewDate[?](https://w3id.org/ldac/terms#reviewDate) | The date that this license should be reviewed. | <a href="##class_ldac:DataLicense">ldac:DataLicense</a> |
| <a id="#prop_license_Dataset_#prop_license_Dataset"></a>license[?](http://schema.org/license) | A license document that applies to this content, typically indicated by URL. | <a href="##Root_Data_Entity">Root Data Entity</a> |
| <a id="#prop_location_Organization_#prop_location_Organization"></a>location[?](http://schema.org/location) | A location for the organisation, e.g. a city for a publisher. | <a href="##class_Organization">Organization</a> |
| <a id="#prop_name_Dataset_#prop_name_Dataset"></a>name[?](http://schema.org/name) | The name of this data collection. | <a href="##Root_Data_Entity">Root Data Entity</a> |
| <a id="#prop_pcdm:hasMember_Dataset_#prop_pcdm:hasMember_Dataset"></a>pcdm:hasMember[?](http://pcdm.org/models#hasMember) | The sub-collections, if any, associated with this collection. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_pcdm:memberOf_Dataset_#prop_pcdm:memberOf_Dataset"></a>pcdm:memberOf[?](http://pcdm.org/models#memberOf) | Links from a Repository Object or Collection to a containing Repository Object or Collection. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_publisher_Dataset_#prop_publisher_Dataset"></a>publisher[?](http://schema.org/publisher) | The organisation responsible for releasing this dataset. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_publisher_CreativeWork_#prop_publisher_CreativeWork"></a>publisher[?](http://schema.org/publisher) | The organisation that published this work. | <a href="##class_CreativeWork">CreativeWork</a> |
| <a id="#prop_recipient_CreativeWork_#prop_recipient_CreativeWork"></a>recipient[?](http://schema.org/recipient) | The person or organisation responsible for creating this work. Authors should be identified using URIs such as ORCiD or ROR. | <a href="##class_CreativeWork">CreativeWork</a> |
| <a id="#prop_spatialCoverage_Dataset_#prop_spatialCoverage_Dataset"></a>spatialCoverage[?](http://schema.org/spatialCoverage) | The place(s) that are the focus of the content. It is a sub-property of contentLocation intended primarily for more technical and detailed materials. For example, with a dataset, it indicates areas that the dataset describes: a dataset Cape York languages would have spatialCoverage which was the place: the outline of the Cape. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_temporalCoverage_Dataset_#prop_temporalCoverage_Dataset"></a>temporalCoverage[?](http://schema.org/temporalCoverage) | The range of years of creation for items in this dataset using a slash, e.g. 1900/1945. If there are sub-collections with different coverages put this on the sub-collections not the top-level. | <a href="##class_Dataset">Dataset</a> |
| <a id="#prop_temporalCoverage_RepositoryObject_#prop_temporalCoverage_RepositoryObject"></a>temporalCoverage[?](http://schema.org/temporalCoverage) | The temporalCoverage of a CreativeWork indicates the period that the content applies to, i.e. that it describes, either as a DateTime or as a textual string indicating a time period in [ISO 8601 time interval format](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals). In the case of a Dataset it will typically indicate the relevant time period in a precise notation (e.g. for a 2011 census dataset, the year 2011 would be written "2011/2012"). Other forms of content, e.g. ScholarlyArticle, Book, TVSeries or TVEpisode, may indicate their temporalCoverage in broader terms - textually or via well-known URL. Written works such as books may sometimes have precise temporal coverage too, e.g. a work set in 1939 - 1945 can be indicated in ISO 8601 interval format format via "1939/1945". Open-ended date ranges can be written with ".." in place of the end date. For example, "2015-11/.." indicates a range beginning in November 2015 and with no specified final date. This is tentative and might be updated in future when ISO 8601 is officially updated. | <a href="##class_RepositoryObject">RepositoryObject</a> |
| <a id="#prop_usageInfo_Dataset_#prop_usageInfo_Dataset"></a>usageInfo[?](http://schema.org/usageInfo) | Additional information on licensing options for using the data, e.g. 'Contact the Data Steward to discuss license terms'. | <a href="##class_Dataset">Dataset</a> |
