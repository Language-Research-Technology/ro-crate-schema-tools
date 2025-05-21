---
title: Language Data Commons RO-Crate Profile
---


This document is a DRAFT RO-Crate profile for Language Data resources. The
profile specifies the contents of RO-Crate Metadata Documents for language
resources and gives guidance on how to structure language data collections both
at the RO-Crate package level and in a repository containing multiple packages.

This profile assumes that the principles and standards set out in the Arkisto
platform, or similar compatible approaches are being used.

The core metadata vocabularies for this profile are:

- RO-Crate recommendations for data packaging and basic discoverability metadata
  which is mostly Schema.org terms with a handful of additions. Following
  RO-Crate practice, basic metadata terms such as "who, what, where" and
  bibliographic-style descriptions are chosen from schema.org (in preference to
  other vocabularies such as Dublin Core or FOAF) where possible with domain-specific
  vocabularies used for things which are not common across domains
  (such as types of language).

- An updated version of the Open Language Archives Community (OLAC) vocabularies
  [http://www.language-archives.org](http://www.language-archives.org);
  originally expressed as XML schemas. The new vocabulary is under development
  here:
  [https://purl.archive.org/language-data-commons/terms](https://purl.archive.org/textcommons/terms)

# Audience

This document is primarily for use by tool developers, data scientists
and metadata specialists developing scripts or systems for user
communities. It is not intended for use by non-specialists.

Just as we would not expect repository users to type in Dublin Core
metadata in XML format by hand we do not expect our users to have to
deal directly with the JSON-LD presented here, this document is for tool
developers to build systems that crosswalk data from existing systems,
or allow for user-friendly data entry.

# About this profile

This profile covers various kinds of crate metadata:

- **Structural** RO-Crate metadata - how the root dataset links to files, and
  the abstract structure of nested collections (e.g. collections/corpora or other
  curated datasets) and objects of study; linguistic Items, Sessions or Texts).
  This profile assumes that a repository (for example, an OCFL storage root,
  with an API for accessing it) exists and that it can at a minimum support 
  (a)  listing all items of the repository and returning their RO-Crate metadata, and 
  (b) retrieving an item given its ID.

- **Types of language data** - is this resource a dialogue? A written text? A
  transcript or other annotation - which file has which kind of data in it? What
  is inside CSV and other structured files? The vocabulary used for
  language-specific data is the
  [Language Data Commons vocabulary](http://purl.archive.org/language-data-commons/terms)
  which is being developed alongside this profile. The vocabulary is described
  here: <http://purl.archive.org/language-data-commons/terms>

- **Contextual metadata** - how to link people who had speaking,
  authoring, collection roles, places, subjects.

# Structural metadata

The structural elements of a Language Data Commons RO-Crate are:

- A Collection / Object hierarchy to allow language data to be
  grouped - for example, a corpus with sub-corpora, or collections of
  items (objects) from a particular region.

- Dataset and File entities (as per RO-Crate). Files may be referenced
  locally or via URI - e.g. from an API. If an RO-Crate contains files
  they MUST be linked to the root dataset using \`hasPart\`
  relationships as per the RO-Crate specification.

NOTE: The terms Collection and Object
are encoded in RO-Crate metadata using RepositoryCollection and
RepositoryObject types respectively. These in turn are re-named versions
of the Portland Common Data Model types,
[pcdm:Collection](https://pcdm.org/2016/04/18/models#Collection)
and
[pcdm:Object](https://pcdm.org/2016/04/18/models#Object).

A conformant RO-Crate:

- MUST be of type(s): http://schema.org/Dataset, http://pcdm.org/models#Collection
- MUST include the following properties:
  * name
  * description
  * datePublished
  * license


![](media/structure.svg)

A collection such as a corpus may be stored in a repository or
transmitted either as:

- A **distributed** collection: a set of individual RO-Crates which
  reference separate collection records with ONE Object and one
  Collection per crate

- A **bundled** single crate which contains all the Collection and
  Object data.

Distributed Collections may reference member collections or Objects in
hasMember property but should not include descriptions of Objects that
are stored elsewhere in the repository.

Objects are placed in a Collection using the \`memberOf\` property (\`pcdm:memberOf\`), which is required. The reverse may also be encoded using the \`hasMember\` property on a Collection.

The following diagram shows how these relationships are encoded in a single "bundled" RO-Crate.

![](media/bundled-crate.svg)

The next diagram shows how distributed crates (with one RO-Crate per Object and Collection) are linked.

![](media/distributed-crates.svg)

Which linking strategy is used is an implementation choice for
repository developers.


## When to choose collection-as-crate ("bundled") vs collection-in-multiple crates ("distributed")

- Choose to use a single bundled crate for a collection when all of these conditions are true:

  - The collection is final and is expected to be stable, i.e. there is
    negligible chance of having to withdraw any of its contents or
    files

  - The collection and all its files can easily be transferred in a
    single transaction - say 20Gb total

  - All the material in the corpus shares the same license for reuse

- Split a collection into fragmented RepositoryCollection and
  RepositoryObject crates - with one crate per repository object
  when any of these conditions are true:

  - The collection is not yet stable

    -   New items are being added or changed.

    -   There is a chance that some data may have to be taken down or withdrawn at the request of participants.

  - The total size of the collection will present challenges for
    data transfer.

  - There is more than one data reuse license applicable.

## Collection (#Collection)

A collection is a group of related Objects. Examples of collections
include corpora, and sub-corpora, as well as aggregations of cultural
objects such as PARADISEC collections which bring together items
collected in a region or on a session with informants. This follows the
Alveo usage:

> Items \[*Objects* in this model\] are grouped into collections which might
> correspond to curated corpora such as ACE or informal collections such as a
> sample of documents from the AustLit archive
> ([http://www.austlit.edu.au/](http://www.austlit.edu.au/)).

When an RO-Crate is used to package a collection which is part of
another Collection it has a memberOf property which references a
resolvable ID (within the context of a repository or service) of the
parent Collection. The Collection may also list its members in a hasMember
property, but this is not required.

The root dataset must have at least these \@type values: \["Dataset",
"RepositoryCollection"\]

### A RepositoryCollection:

### <a id="_class_RepositoryCollection"></a>RepositoryCollection



Specialization of: http://pcdm.org/models#Collection

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_RepositoryCollection_unnamed_ogfr7"></a>inLanguage | Yes | The language in which the resource is written. | #class_Language |  |
| <a id="_class_RepositoryCollection_unnamed_52lc4"></a>conformsTo | No | A link to the language data commons RO-Crate profile for collections. | #itemlist_conformsTo_RepositoryCollection |  |
| <a id="_class_RepositoryCollection_unnamed_y6s96"></a>contentLocation | No | The location depicted or described in the content. For example, the location in a photograph or painting. | [Place](#_class_Place) |  |
| <a id="_class_RepositoryCollection_unnamed_vbe3j"></a>dateCreated | No | The (earliest) date the data in this dataset were created. | Date |  |
| <a id="_class_RepositoryCollection_unnamed_5n8ko"></a>holdingArchive | No | Organisation where the original of this work or collection is housed. | [Organization](#_class_Organization), Text |  |
| <a id="_class_RepositoryCollection_unnamed_ogwqb"></a>ldac:dateFreeText | No | Date information which cannot be put in one of the standard date formats, e.g. 'mid-1970s', or it is not clear, for example, if it is a creation or publication date. | Text |  |
| <a id="_class_RepositoryCollection_unnamed_dzzqh"></a>ldac:itemLocation | No | Current location of the item, e.g. where a set of audio tapes are stored. | [Place](#_class_Place), [Organization](#_class_Organization) |  |
| <a id="_class_RepositoryCollection_unnamed_r2qp0"></a>ldac:subjectLanguage | No | The languages that the materials in the collection are about (not the language that it is in). | #class_Language |  |



## Objects (#Object)

An Object is a single unit linked to tightly related files, for example -
a dialogue or session in a speech study, or a work (document) in a written
corpus. This is based on the use of the term _Item_ in Alveo:

>The data model that we have developed for the storage of language
>resources is built around the concept of an item which corresponds
>(loosely) to a record of a single communication event. An item is
>often associated with a single text, audio or video resource but could
>include a number of resources, for example, the different channels of
>audio recording or an audio recording and associated textual
>transcript. Items are grouped into collections which might correspond
>to curated corpora such as ACE or informal collections such as a
>sample of documents from the AustLit archive
>(<http://www.austlit.edu.au/>).
><https://www.researchonline.mq.edu.au/vital/access/services/Download/mq:37347/DS01>

The definition of an object is necessarily loose and needs to reflect
what data owners have chosen to do with their collections in the past.

If an RO-Crate contains a single Object the Root Dataset would have a
\`@type\` property of ["Dataset", "RepositoryObject"] with a
conformsTo property pointing to the language-data-commons Object profile
(this document).

If an RO-Crate contains an entire collection then each Object has a
\`@type\` property of ["Dataset", "RepositoryObject"] and a conformsTo
property referencing this document. For example:

Objects SHOULD have files (which may be included in an RO-Crate for the
object, or as part of a collection crate).

In this example the Object in question is an interview from a speech
corpus with three files - the diagram shows the relationships between
the object and its files (and the contextual metadata of a Person who
takes the role of the speaker/informant (discussed in more detail
below).

![](media/object-structure.svg)

There are a number of terms that can be used to characterise resources -
these use the schema.org mechanism of DefinedTerm and DefinedTermSet.

### A RepositoryObject:

### <a id="_class_RepositoryObject"></a>RepositoryObject



Specialization of: http://pcdm.org/models#Object

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_RepositoryObject_unnamed_326ks"></a>conformsTo | No | A link to the language data commons RO-Crate profile for collections. | Text |  |
| <a id="_class_RepositoryObject_unnamed_z0ksu"></a>creator | No | The creator/author of this CreativeWork. This is the same as the Author property for CreativeWork. | [Person](#_class_Person) |  |
| <a id="_class_RepositoryObject_unnamed_5lxzj"></a>dateCreated | No | The date on which the CreativeWork was created or the item was added to a DataFeed. | Text |  |
| <a id="_class_RepositoryObject_unnamed_ttbop"></a>description | No | A description of the item. | Text |  |
| <a id="_class_RepositoryObject_unnamed_anhiw"></a>identifier | No | The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.
         | #class_PropertyValue, Text, URL |  |
| <a id="_class_RepositoryObject_unnamed_8q7lm"></a>ldac:hasAnnotation | No | This resource is referenced by another resource that adds information to it such as a translation, transcription or other analysis. | #class_Annotation |  |
| <a id="_class_RepositoryObject_unnamed_3xipj"></a>license | No | A license document that applies to this content, typically indicated by URL. | #class_OrganizationReuseLicense |  |
| <a id="_class_RepositoryObject_unnamed_q5rvq"></a>temporalCoverage | No | The temporalCoverage of a CreativeWork indicates the period that the content applies to, i.e. that it describes, either as a DateTime or as a textual string indicating a time period in [ISO 8601 time interval format](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals). In
      the case of a Dataset it will typically indicate the relevant time period in a precise notation (e.g. for a 2011 census dataset, the year 2011 would be written "2011/2012"). Other forms of content, e.g. ScholarlyArticle, Book, TVSeries or TVEpisode, may indicate their temporalCoverage in broader terms - textually or via well-known URL.
      Written works such as books may sometimes have precise temporal coverage too, e.g. a work set in 1939 - 1945 can be indicated in ISO 8601 interval format format via "1939/1945".

Open-ended date ranges can be written with ".." in place of the end date. For example, "2015-11/.." indicates a range beginning in November 2015 and with no specified final date. This is tentative and might be updated in future when ISO 8601 is officially updated. | Text |  |



## Files

There are three important types of files (or references to other
works) that may be included - \`PrimaryMaterial\` - which is a recording or
original text, or a citation of or proxy for it, \`DerivedMaterial\` which
has been generated or sampled from primary material by a process such as format
conversion or digitization, and \`Annotation\`, which contains one or more types of
analysis of the \`PrimaryMaterial\` or \`DerivedMaterial\`.

### PrimaryMaterial

\`PrimaryMaterial\` MAY be a video or audio file if it is available or MAY be a ContextualEntity referencing a primary text such as a book.


#### A [File, PrimaryMaterial]:



### DerivedMaterial

DerivedMaterial is a non-analytical derivation from PrimaryMaterial for example downsampled video or excerpted text.





#### a [File, DerivedMaterial]:



### Annotation

An annotation is a description or analysis of other material. More than one type of annotation may be present in a file.

#### a [File, Annotation]:



#### Describing the columns in CSV or other tabular data Annotation

CSV or similar tabular files are often used to represent transcribed
speech or sign language data, sometimes also with time codes. To enable
automated location of which column is which, use a [frictionless Table
Schema](https://specs.frictionlessdata.io/table-schema/) described by a File entity in the crate. 

For example:
${exampleEntities('art', ['art_schema.json'])}


### Language

#### A [Language] entity:



## Places



The place in which data was collected may be indicated using the \`contentLocation\` property. 


${exampleEntities('paradisec-item-NT1-001', ['./', 'https://www.ethnologue.com/country/VU', '#Vanuatu'])}



# Identifiers

Identifiers for Objects and Collections MUST be URIs.

Internally, identifiers for all entities that do not have their own URIs
MAY use the Archive and Packaging identifier scheme ([ARCP]) - which allows for a DNS-like namespacing of
identifiers. For example, for the Sydney Speaks corpus the top-level
collection would have the ID:

    arcp://name,http://www.dynamicsoflanguage.edu.au/sydney-speaks/corpus/

A sub-corpus (collection) would have an ID like:

    arcp://name,http://www.dynamicsoflanguage.edu.au/sydney-speaks/corpus/collection/SSP

An object:

    arcp://name,http://www.dynamicsoflanguage.edu.au/sydney-speaks/corpus/object/331

A person:

    arcp://name,http://www.dynamicsoflanguage.edu.au/sydney-speaks/corpus/person/54


## How to record people's contributions

Some corpora express ages and other demographics of participants - this
presents a data modelling challenge, as age and some other variables change
over time so if the same person appears over time then we need to have a
base Person with DoB etc and then time-based instances of the person
with an age, social status, gender etc *at that time*.

There are three levels at which contributions to an object can be
modelled:

1.  Include one or more Person items as context in a crate and reference
    them with properties such as schema:creator or the
    language-data-commons contribution properties such as [ldac:compiler]
    or [ldac:depositor]. The \@id of the person MUST be a URI and SHOULD
    be re-used where the same person appears in multiple objects in a
    collection or repository.

2.  For longitudinal studies where it is important to record changing
    demographic information for a Person, or where precision is
    required in listing contributions to a work use
    [ldac:PersonSnapshot].

3.  If it is important to record lots of contributions to a work (e.g. in
    analysis of a joint work) use schema:Action. If more precision is
    required in describing the provenance of items - e.g. this work on
    [The Declaration of Rights of Man and of the
    Citizen](https://www.uts.edu.au/about/faculty-design-architecture-and-building/staff-showcase/writing-rights)
    (Lorber-Kasunic & Sweetapple).

    NOTE: if this approach is used special care will have to be taken in
    developing user interfaces and/or training communities to use this way
    of modelling metadata - the user need not see the underlying
    structure. This profile does not give advice about how to do this as
    we have not seen a use case that requires it.

## Collection events such as "Sessions"

Where data is collected from participants in a speech study with
elicitation tasks such as "sessions" (see this [IMDI
document]](https://www.mpi.nl/ISLE/documents/draft/ISLE_MetaData_2.5.pdf))
or field interviews this can be recorded in metadata via the
CollectionEvent class.

The indirection in this conforms-to relationship is to allow multiple
objects to have a conformsTo property which indicates that they conform
to the _same_ schema while having a local copy of the schema, as per
RO-Crate best practice of having all local context to use a data
packages in the package where possible.

# References

Himmelmann, Nikolaus P. 2012. Linguistic data types and the interface
between language documentation and description. _Language documentation
& conservation_. University of Hawai'i Press 6. 187--207.

Paterson, Hugh Joseph. 2021. _Language Archive Records: Interoperability
of Referencing Practices and Metadata Models_. United States \-- North
Dakota: The University of North Dakota M.A.
[https://www.proquest.com/docview/2550236802/abstract/22686A0E508D4E5CPQ/1](https://www.proquest.com/docview/2550236802/abstract/22686A0E508D4E5CPQ/1)
(3 May 2022).

# EXAMPLES

[https://www.mpi.nl/ISLE/documents/docs_frame.html](https://www.mpi.nl/ISLE/documents/docs_frame.html)




[ldac:PersonSnapshot]: https://purl.archive.org/language-data-commons/terms#PersonSnapshot
[ldac:depositor]: https://purl.archive.org/language-data-commons/terms#depositor
[ldac:compiler]: https://purl.archive.org/language-data-commons/terms#compiler

# Classes and Properties

## Defined Term Sets

### <a id="termset_ldac:AnnotationTypeTerms"></a>AnnotationTypeTerms

Set of defined terms for ldac:annotationType

| Term | Description |
| ---- | ----------- |
| Gestural | The resource describes the gestural content of the resource it annotates. |
| Orthographic | The resource contains annotations using orthography (a writing system) as opposed to a coded representation such as a phonetic transcription. |
| PartOfSpeech | An annotation that assigns lexical elements of language to classes on the basis of their distributional properties (for sign languages, the term 'sign class' is appropriate). |
| Phonemic | An annotation that represents speech in terms of the sound contrasts made in a language. |
| Phonetic | A representation of speech in terms of the sounds produced, typically using the International Phonetic Alphabet. |
| Phonological | An annotation that includes information about the sound system of a language, such as the contrasts between sounds which make up the sound system and the locally conditioned realisations of sounds which characterise speech in the language. |
| Prosodic | An annotation that provides a symbolic record of intonation, stress, tone or other suprasegmental features, which is expressed independently of regular phonetic transcription. |
| Semantic | The resource includes annotation or analysis concerning the encoding of meaning. |
| Syntactic | The resource contains annotation or analysis describing the combinatorial patterns of words in another resource. |
| Transcription | The resource contains a transcription, which is a written representation (orthographic or coded) of an audio or visual signal. |
| Translation | This is a translation of a resource in another language. |

### <a id="termset_ldac:CommunicationModeTerms"></a>CommunicationModeTerms

Set of defined terms for ldac:communicationMode

| Term | Description |
| ---- | ----------- |
| Coded | The resource contains an analysis or annotations represented by a code (such as the International Phonetic Alphabet). |
| Gesture | The resource contains non-linguistic gestural communication (i.e. not sign language). |
| SignedLanguage | The resource contains data for which the medium of interaction was signing. |
| Song | The resource contains data for which the medium of interaction was song. |
| SpokenLanguage | The resource contains data for which the medium of interaction was speech. |
| WhistledLanguage | The resource contains data for which the medium of interaction was whistling. |
| WrittenLanguage | The resource contains data for which the medium of interaction was writing. |

### <a id="termset_ldac:LinguisticGenreTerms"></a>LinguisticGenreTerms

Set of defined terms for ldac:linguisticGenre

| Term | Description |
| ---- | ----------- |
| Dialogue | An interactive discourse with two or more participants. Examples of dialogues include conversations, interviews, correspondence, consultations, greetings and leave-takings. |
| Drama | A planned, creative rendition of discourse with two or more participants intended for presentation to an audience. |
| Formulaic | The resource is a ritually or conventionally structured discourse. |
| Informational | Discourse whose primary purpose is to inform the audience about the natural or social world. |
| Interview | The resource is a conversation where one or more speakers are directing the conversation. |
| Lexicon | The resource includes a systematic listing of lexical items. |
| Ludic | Language whose primary function is to be part of play, or a style of speech that involves a creative manipulation of the structures of the language. Examples of ludic discourse are play languages, jokes, secret languages, and speech disguises. |
| Narrative | A discourse, monologic or co-constructed, which represents temporally organised events. Types of narratives include historical, traditional, and personal narratives, myths, folktales, fables, and humorous stories. |
| Oratory | The art of public speaking, or of speaking eloquently according to rules or conventions. Examples of oratory include sermons, lectures, political speeches, and invocations. |
| Procedural | An explanation or description of a method, process, or situation having ordered steps. |
| Report | A factual account of some event or circumstance. |
| Thesaurus | The resource contains a list or data structure consisting of words or concepts arranged according to sense. |

### <a id="termset_ldac:IndexTypes"></a>IndexTypes

Set of defined terms for ldac:openAccessIndex

| Term | Description |
| ---- | ----------- |
| FullText | A text index that makes the full text of a data resource findable via a search interface. |

### <a id="termset_ldac:WrittenLanguageTypeTerms"></a>WrittenLanguageTypeTerms

Set of defined terms for ldac:writtenLanguageFormat

| Term | Description |
| ---- | ----------- |
| Handwritten | The resource was written using a writing implement such as a pen, pencil, brush or computer stylus (except where the digital handwriting is converted to standard text). |
| Typeset | The resource has been formatted for printing or display. |
| Typewritten | The resource contains text produced on a typewriter. |

### <a id="termset_ldac:CollectionProtocolTypeTerms"></a>CollectionProtocolTypeTerms

Set of defined terms for ldac:collectionProtocolType

| Term | Description |
| ---- | ----------- |
| ElicitationTask | The collection protocol includes a task-based prompt to participants. |
| MaterialSelectionCriteria | A description of the criteria used to select texts in a collection. |

### <a id="termset_ldac:MaterialTypes"></a>MaterialTypes

Set of defined terms for ldac:materialType

| Term | Description |
| ---- | ----------- |
| Annotation | The resource includes material that adds information to some other linguistic record. |
| DerivedMaterial | This is derived from another source, such as a Primary Material, via some process, e.g. a downsampled video or a sample or an abstract of a resource that is not an annotation (an analysis or description). |
| PrimaryMaterial | The object of study, such as a literary work, film, or recording of natural discourse. |

### <a id="termset_ldac:CollectionEventTypeTerms"></a>CollectionEventTypeTerms

Set of defined terms for ldac:collectionEventType

| Term | Description |
| ---- | ----------- |
| Session | A collection event that is a recording or elicitation session with participants. |

### <a id="termset_ldac:AccessTypes"></a>AccessTypes

Set of defined terms for ldac:access

| Term | Description |
| ---- | ----------- |
| AuthorizedAccess | Indicates that a DataReuseLicense requires some kind of authorization step, from SelfAuthorization (click-through) to processes that require a data steward to grant permission. |
| OpenAccess | Data covered by this license may be accessed as long as the license is served alongside it, and does not require any specific authorization step. |

### <a id="termset_ldac:AuthorizationWorkflows"></a>AuthorizationWorkflows

Set of defined terms for ldac:authorizationWorkflow

| Term | Description |
| ---- | ----------- |
| AccessControlList | License grants access to data based on a list of approved users, specified using the property accessControlList. |
| AgreeToTerms | A user is expected to explicitly agree to a set of license terms, this may be combined with AccessControlList - to note that even if a user has been pre-approved for a license they must agree to license terms. |
| AuthorizationByApplication | Users may apply for a license via some workflow, such as a form, with the decision being made by a DataSteward or their delegate about whether to grant the license. |
| AuthorizationByInvitation | A data steward or administrator is expected to use an access control system to invite users, for example, participants, collaborators or students. |
| SelfAuthorization | A user can be authorised to access data by clicking that they agree to a license, or filling out a form to check their understanding, which can be validated by a machine and does not require human intervention. |





## Classes and Properties

### <a id="_RO_Crate_Metadata_Descriptor"></a>RO-Crate Metadata Descriptor

An RO-Crate @graph must contain an entity of Type @CreativeWork which is known as the RO-Crate Metadata descriptor.

Specialization of: http://schema.org/CreativeWork

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_RO_Crate_Metadata_Descriptor_unnamed_jrs3v"></a>@id | Yes | The RO-Crate Metadata file identifier | [Root Data Entity](#_Root_Data_Entity) | ro-crate-metadata.json |
| <a id="_RO_Crate_Metadata_Descriptor_unnamed_hby3g"></a>about | Yes | This property on the RO-Crate Metadata Descriptor references the Root Data Entity. In a SoSS+ profile there may be Schemas present for more than one 'flavour' of Root Data Entity with different @type arrays or `@conformsTo` references (or other specializations). | [Root Data Entity](#_Root_Data_Entity) |  |

### <a id="_Root_Data_Entity"></a>Root Data Entity

The Root Data Entity for an RO-Crate. This is the main entity of the RO-Crate and is the one that is referenced by the RO-Crate Metadata Descriptor. In this profile, it is a Dataset and RepositoryCollection.

Specialization of: http://schema.org/Dataset, http://pcdm.org/models#Collection

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Root_Data_Entity_unnamed_29ps0"></a>datePublished | Yes | A date that this collection was published. This should be the date that the collection was first made available. | Date |  |
| <a id="_Root_Data_Entity_unnamed_x4fzb"></a>description | Yes | An abstract of the collection. Include as much detail as possible about the motivation and use of the collection. | Text |  |
| <a id="_Root_Data_Entity_unnamed_qd7yr"></a>license | Yes | A license document that applies to this content, typically indicated by URL. | [CreativeWork](#_class_CreativeWork), URL, Text |  |
| <a id="_Root_Data_Entity_unnamed_pgeji"></a>name | Yes | The name of this data collection. | Text |  |

### <a id="_class_CreativeWork"></a>CreativeWork



Specialization of: http://schema.org/CreativeWork

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_CreativeWork_unnamed_nzfun"></a>author | No | The person or organisation responsible for creating this work. Authors should be identified using URIs such as ORCiD or ROR. | Text, [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_CreativeWork_unnamed_9dn97"></a>isbn | No | The ISBN for this work, if applicable. | Text |  |
| <a id="_class_CreativeWork_unnamed_3wpmh"></a>issn | No | The ISSN for this publication. | Text |  |
| <a id="_class_CreativeWork_unnamed_aj2jw"></a>ldac:annotationType | No | The type of an Annotation resource. | [AnnotationTypeTerms](#termset_ldac:AnnotationTypeTerms) |  |
| <a id="_class_CreativeWork_unnamed_scdy1"></a>ldac:channels | No | The number of audio channels this resource contains (e.g. 1, 2, 5.1). | Text |  |
| <a id="_class_CreativeWork_unnamed_w7bph"></a>ldac:communicationMode | No | The mode (spoken, written, signed etc.) of this resource. There may be more than one value for this property. | [CommunicationModeTerms](#termset_ldac:CommunicationModeTerms) |  |
| <a id="_class_CreativeWork_unnamed_sbk3p"></a>ldac:indexableText | No | One or more target File(s) that together contain the full text of an item – each file should indicate its language. | #class_MediaObject |  |
| <a id="_class_CreativeWork_unnamed_l9qi1"></a>ldac:isDeIdentified | No | The data in this item has had potentially identifying information removed, which may include replacing names with pseudonyms. | Boolean |  |
| <a id="_class_CreativeWork_unnamed_fqrui"></a>ldac:linguisticGenre | No | A linguistic classification of the genre of this resource. | [LinguisticGenreTerms](#termset_ldac:LinguisticGenreTerms) |  |
| <a id="_class_CreativeWork_unnamed_t8ots"></a>ldac:material | No | Description of the original media, e.g. audio cassette tapes, participant questionnaires, field notes. | Text |  |
| <a id="_class_CreativeWork_unnamed_muv0s"></a>ldac:openAccessIndex | No | One or more public index types allowed by a license, e.g. FullText indexing may be allowed for discovery even when an item is not. | [IndexTypes](#termset_ldac:IndexTypes) |  |
| <a id="_class_CreativeWork_unnamed_2w0cj"></a>ldac:register | No | The type of register (any of the varieties of a language that a speaker uses in a particular social context [Merriam-Webster]) of the contents of a language resource. | Text |  |
| <a id="_class_CreativeWork_unnamed_z6h6i"></a>ldac:writtenLanguageFormat | No | The format of the resource resulting from the way the text was produced (handwritten, typeset, typewritten). | [WrittenLanguageTypeTerms](#termset_ldac:WrittenLanguageTypeTerms) |  |
| <a id="_class_CreativeWork_unnamed_zwuyt"></a>publisher | No | The organisation that published this work. | Text, [Organization](#_class_Organization) |  |
| <a id="_class_CreativeWork_unnamed_p5np6"></a>recipient | No | The person or organisation responsible for creating this work. Authors should be identified using URIs such as ORCiD or ROR. | Text, [Person](#_class_Person), [Organization](#_class_Organization) |  |

### <a id="_class_Dataset"></a>Dataset



Specialization of: http://schema.org/Dataset

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_Dataset_unnamed_6tt7l"></a>accountablePerson | Yes | The person or organisation who is the data steward for this resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_wr15p"></a>author | Yes | The person or organisation responsible for creating this collection of data. Authors should be identified using URIs such as ORCiD or ROR. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_n7nbs"></a>dct:rightsHolder | Yes | The person or organisation owning or managing rights over the resource. | Text, [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_j30y0"></a>publisher | Yes | The organisation responsible for releasing this dataset. | [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_rxfg1"></a>citation | No | Associated publications. | [CreativeWork](#_class_CreativeWork) |  |
| <a id="_class_Dataset_unnamed_rw25k"></a>creditText | No | A free text bibliographic citation for this material, e.g. 'Cite as: Musgrave (2023). Title of work. DOI'. | Text |  |
| <a id="_class_Dataset_unnamed_huj9w"></a>funder | No | The organisation(s) responsible for funding the creation or collection of this dataset. | [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_b1tpi"></a>hasPart | No | An item or CreativeWork that is part of this item, or CreativeWork (in some sense). | [CreativeWork](#_class_CreativeWork), [File](#_class_File), [Dataset](#_class_Dataset) |  |
| <a id="_class_Dataset_unnamed_u8xo3"></a>isAccessibleForFree | No | This is available under an Open Access license. | Boolean |  |
| <a id="_class_Dataset_unnamed_7dzsj"></a>isBasedOn | No | Link to or description of an original resource. | Text, URL, [CreativeWork](#_class_CreativeWork), [Dataset](#_class_Dataset), [File](#_class_File) |  |
| <a id="_class_Dataset_unnamed_njn8o"></a>isPartOf | No | An item or CreativeWork that this item, or CreativeWork (in some sense), is part of. | URL, [CreativeWork](#_class_CreativeWork) |  |
| <a id="_class_Dataset_unnamed_4rncn"></a>ldac:annotationOf | No | This resource contains some kind of description that adds information to the resource it references. | #class_PrimaryMaterial |  |
| <a id="_class_Dataset_unnamed_5x2ad"></a>ldac:annotator | No | The participant produced an annotation of this or a related resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_lf9lh"></a>ldac:compiler | No | The participant is responsible for collecting the sub-parts of the resource together. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_616dd"></a>ldac:consultant | No | The participant contributes expertise to the creation of a work, for example by contributing knowledge of their native language. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_u3i2n"></a>ldac:dataInputter | No | The participant responsible for entering, re-typing, and/or structuring the data contained in the resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_qbbm6"></a>ldac:depositor | No | The participant responsible for depositing the resource in an archive. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_s1ra4"></a>ldac:developer | No | The participant developed the methodology or tools (including software) that constitute the resource, or that were used to create the resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_k7u9a"></a>ldac:doi | No | A Digital Object Identifier, e.g. https://doi.org/10.1000/182. | Text |  |
| <a id="_class_Dataset_unnamed_897e4"></a>ldac:editor | No | The participant reviewed, corrected, and/or tested the resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_2tzqm"></a>ldac:hasCollectionProtocol | No | A link to a CollectionProtocol object with (at least) a summary of how resources were selected or elicited for this collection/sub-collection. | [ldac:CollectionProtocol](#_class_ldac_CollectionProtocol) |  |
| <a id="_class_Dataset_unnamed_qt2mz"></a>ldac:illustrator | No | The participant contributed drawings or other illustrations to the resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_x358z"></a>ldac:interpreter | No | The contributor renders the discourse recorded in the resource into another language in real time, or the contributor explains the discourse recorded in the resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_k63uj"></a>ldac:interviewee | No | The participant was a respondent in an interview. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_lyn2h"></a>ldac:interviewer | No | The participant conducted an interview that forms part of the resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_2qrbk"></a>ldac:participant | No | The participant was present during the creation of the resource, but did not contribute substantially to its content. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_v8nz7"></a>ldac:performer | No | The participant performed some portion of a recorded, filmed, or transcribed resource. It is recommended that this term be used only for creative participants whose role is not better indicated by a more specific term, such as 'speaker', 'signer', or 'singer'. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_91lhu"></a>ldac:photographer | No | The participant took the photograph, or shot the film, that appears in or constitutes the resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_m66iq"></a>ldac:recorder | No | The participant operated the recording machinery used to create the resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_kne8w"></a>ldac:researcher | No | The resource was created as part of the participant's research, or the research presents interim or final results from the participant's research. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_fw6pa"></a>ldac:researchParticipant | No | The participant acted as a research subject or responded to a questionnaire, the results of which study form the basis of the resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_phx3e"></a>ldac:responder | No | The participant was an interlocutor in some sort of discourse event, but only reacted to the contributions of others. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_e8rpn"></a>ldac:signer | No | The contributor was a principal signer in a resource that consists of a recording, a film, or a transcription of a recorded resource. Signers are those whose gestures predominate in a recorded or filmed resource. (The resource may be a transcription of that recording). | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_ez3i5"></a>ldac:singer | No | The participant sang, either individually or as part of a group, in a resource that consists of a recording, a film, or a transcription of a recorded resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_j73ea"></a>ldac:speaker | No | The contributor was a principal speaker in a resource that consists of a recording, a film, or a transcription of a recorded resource. Speakers are those whose voices predominate in a recorded or filmed resource. (The resource may be a transcription of that recording). | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_oieaa"></a>ldac:sponsor | No | The participant contributed financial support to the creation of the resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_t6007"></a>ldac:transcriber | No | The participant produced a transcription of this or a related resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_e2y50"></a>ldac:translator | No | The participant produced a translation of this or a related resource. | [Person](#_class_Person), [Organization](#_class_Organization) |  |
| <a id="_class_Dataset_unnamed_bd673"></a>pcdm:hasMember | No | The sub-collections, if any, associated with this collection. | [RepositoryCollection](#_class_RepositoryCollection), [RepositoryObject](#_class_RepositoryObject) |  |
| <a id="_class_Dataset_unnamed_dmogi"></a>pcdm:memberOf | No | Links from a Repository Object or Collection to a containing Repository Object or Collection. | [RepositoryCollection](#_class_RepositoryCollection) |  |
| <a id="_class_Dataset_unnamed_r7evt"></a>spatialCoverage | No | The place(s) that are the focus of the content. It is a sub-property of contentLocation intended primarily for more technical and detailed materials. For example, with a dataset, it indicates areas that the dataset describes: a dataset Cape York languages would have spatialCoverage which was the place: the outline of the Cape. | [Place](#_class_Place) |  |
| <a id="_class_Dataset_unnamed_coqs1"></a>temporalCoverage | No | The range of years of creation for items in this dataset using a slash, e.g. 1900/1945. If there are sub-collections with different coverages put this on the sub-collections not the top-level. | DateTime, Text |  |
| <a id="_class_Dataset_unnamed_iipxl"></a>usageInfo | No | Additional information on licensing options for using the data, e.g. 'Contact the Data Steward to discuss license terms'. | Text |  |

### <a id="_class_Person"></a>Person



Specialization of: http://schema.org/Person

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_Person_unnamed_1uncp"></a>affiliation | No | The organisation that this person is affiliated with. For example, a university or school. | [Organization](#_class_Organization) |  |
| <a id="_class_Person_unnamed_56o2g"></a>ldac:age | No | The age of a person. If an age is specified, a specializationOf pointing to a 'canonical' ageless version of that Person can also be included. | Text |  |

### <a id="_class_Organization"></a>Organization



Specialization of: http://schema.org/Organization

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_Organization_unnamed_2z5do"></a>location | No | A location for the organisation, e.g. a city for a publisher. | Text |  |

### <a id="_class_File"></a>File



Specialization of: http://schema.org/MediaObject

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_File_unnamed_t8miu"></a>contentSize | No | File size in (mega/kilo)bytes. | Text |  |
| <a id="_class_File_unnamed_lr2oa"></a>encodingFormat | No | The media type typically expressed using a MIME format. | Text, #class_WebPage, #class_Standard |  |
| <a id="_class_File_unnamed_g9nqp"></a>hasPart | No | An item or CreativeWork that is part of this item, or CreativeWork (in some sense). | [CreativeWork](#_class_CreativeWork), [File](#_class_File) |  |
| <a id="_class_File_unnamed_6t9zp"></a>ldac:derivationOf | No | This property references another resource from which the current resource is derived, e.g. downsampling audio or video files, or extracting text from a PDF. | #class_Annotation, #class_PrimaryMaterial |  |
| <a id="_class_File_unnamed_fx6k2"></a>ldac:hasDerivation | No | This property references another resource that is derived from it, such as a downsampled audio or video file, or text extracted from a PDF. | #class_DerivedMaterial |  |
| <a id="_class_File_unnamed_18i5b"></a>ldac:materialType | No | Indicates whether the material in a file is the original (primary) source or is derived from it or describes it via annotation. | [MaterialTypes](#termset_ldac:MaterialTypes) |  |

### <a id="_class_Place"></a>Place



Specialization of: http://schema.org/Place

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_Place_unnamed_nd4q2"></a>address | No | The physical address of the place. | Text |  |
| <a id="_class_Place_unnamed_202e9"></a>geo | No | The geographic coordinates of the place. | [Geometry](#_class_Geometry) |  |

### <a id="_class_ldac_CollectionProtocol"></a>ldac:CollectionProtocol



Specialization of: https://w3id.org/ldac/terms#CollectionProtocol

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_ldac_CollectionProtocol_unnamed_l50iu"></a>ldac:collectionProtocolType | No | A description of the process used to collect or collate data, such as prompts given to participants, or how texts are selected for inclusion in a collection. | [CollectionProtocolTypeTerms](#termset_ldac:CollectionProtocolTypeTerms) |  |

### <a id="_class_RepositoryCollection"></a>RepositoryCollection



Specialization of: http://pcdm.org/models#Collection

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_RepositoryCollection_unnamed_ogfr7"></a>inLanguage | Yes | The language in which the resource is written. | #class_Language |  |
| <a id="_class_RepositoryCollection_unnamed_52lc4"></a>conformsTo | No | A link to the language data commons RO-Crate profile for collections. | #itemlist_conformsTo_RepositoryCollection |  |
| <a id="_class_RepositoryCollection_unnamed_y6s96"></a>contentLocation | No | The location depicted or described in the content. For example, the location in a photograph or painting. | [Place](#_class_Place) |  |
| <a id="_class_RepositoryCollection_unnamed_vbe3j"></a>dateCreated | No | The (earliest) date the data in this dataset were created. | Date |  |
| <a id="_class_RepositoryCollection_unnamed_5n8ko"></a>holdingArchive | No | Organisation where the original of this work or collection is housed. | [Organization](#_class_Organization), Text |  |
| <a id="_class_RepositoryCollection_unnamed_ogwqb"></a>ldac:dateFreeText | No | Date information which cannot be put in one of the standard date formats, e.g. 'mid-1970s', or it is not clear, for example, if it is a creation or publication date. | Text |  |
| <a id="_class_RepositoryCollection_unnamed_dzzqh"></a>ldac:itemLocation | No | Current location of the item, e.g. where a set of audio tapes are stored. | [Place](#_class_Place), [Organization](#_class_Organization) |  |
| <a id="_class_RepositoryCollection_unnamed_r2qp0"></a>ldac:subjectLanguage | No | The languages that the materials in the collection are about (not the language that it is in). | #class_Language |  |

### <a id="_class_RepositoryObject"></a>RepositoryObject



Specialization of: http://pcdm.org/models#Object

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_RepositoryObject_unnamed_326ks"></a>conformsTo | No | A link to the language data commons RO-Crate profile for collections. | Text |  |
| <a id="_class_RepositoryObject_unnamed_z0ksu"></a>creator | No | The creator/author of this CreativeWork. This is the same as the Author property for CreativeWork. | [Person](#_class_Person) |  |
| <a id="_class_RepositoryObject_unnamed_5lxzj"></a>dateCreated | No | The date on which the CreativeWork was created or the item was added to a DataFeed. | Text |  |
| <a id="_class_RepositoryObject_unnamed_ttbop"></a>description | No | A description of the item. | Text |  |
| <a id="_class_RepositoryObject_unnamed_anhiw"></a>identifier | No | The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.
         | #class_PropertyValue, Text, URL |  |
| <a id="_class_RepositoryObject_unnamed_8q7lm"></a>ldac:hasAnnotation | No | This resource is referenced by another resource that adds information to it such as a translation, transcription or other analysis. | #class_Annotation |  |
| <a id="_class_RepositoryObject_unnamed_3xipj"></a>license | No | A license document that applies to this content, typically indicated by URL. | #class_OrganizationReuseLicense |  |
| <a id="_class_RepositoryObject_unnamed_q5rvq"></a>temporalCoverage | No | The temporalCoverage of a CreativeWork indicates the period that the content applies to, i.e. that it describes, either as a DateTime or as a textual string indicating a time period in [ISO 8601 time interval format](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals). In
      the case of a Dataset it will typically indicate the relevant time period in a precise notation (e.g. for a 2011 census dataset, the year 2011 would be written "2011/2012"). Other forms of content, e.g. ScholarlyArticle, Book, TVSeries or TVEpisode, may indicate their temporalCoverage in broader terms - textually or via well-known URL.
      Written works such as books may sometimes have precise temporal coverage too, e.g. a work set in 1939 - 1945 can be indicated in ISO 8601 interval format format via "1939/1945".

Open-ended date ranges can be written with ".." in place of the end date. For example, "2015-11/.." indicates a range beginning in November 2015 and with no specified final date. This is tentative and might be updated in future when ISO 8601 is officially updated. | Text |  |

### <a id="_class_Geometry"></a>Geometry



Specialization of: http://www.opengis.net/ont/geosparql#Geometry

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_Geometry_unnamed_hxplm"></a>geosparql:asWKT | No | The WKT serialisation of the geometry. | Text |  |

### <a id="_class_CollectionEvent"></a>CollectionEvent



Specialization of: https://w3id.org/ldac/terms#CollectionEvent

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_CollectionEvent_unnamed_qkwo8"></a>ldac:collectionEventType | No | A kind of CollectionEvent characterised by some specific procedures, e.g. a psycholinguistic experiment. | [CollectionEventTypeTerms](#termset_ldac:CollectionEventTypeTerms) |  |

### <a id="_class_DataLicense"></a>DataLicense



Specialization of: https://w3id.org/ldac/terms#DataLicense

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_DataLicense_unnamed_ybka3"></a>ldac:reviewDate | No | The date that this license should be reviewed. | Text |  |

### <a id="_class_DataDepositLicense"></a>DataDepositLicense



Specialization of: https://w3id.org/ldac/terms#DataDepositLicense

*No properties defined for this class*


### <a id="_class_DataReuseLicense"></a>DataReuseLicense



Specialization of: https://w3id.org/ldac/terms#DataReuseLicense

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_class_DataReuseLicense_unnamed_8ltfr"></a>ldac:access | No | Whether this is an open or restricted access license. | [AccessTypes](#termset_ldac:AccessTypes) |  |
| <a id="_class_DataReuseLicense_unnamed_dbwaz"></a>ldac:accessControlList | No | When a license has an authorizationWorkflow property with a value of the DefinedTerm AccessControlList this property has a URI value that points to a list of userIDs. | URL |  |
| <a id="_class_DataReuseLicense_unnamed_do7xh"></a>ldac:authorizationWorkflow | No | By what process a user is granted authorization to a license. | [AuthorizationWorkflows](#termset_ldac:AuthorizationWorkflows) |  |

### <a id="_class_dct_Collection"></a>dct:Collection



Specialization of: http://purl.org/dc/terms/Collection

*No properties defined for this class*


### <a id="_class_dct_Dataset"></a>dct:Dataset



Specialization of: http://purl.org/dc/terms/Dataset

*No properties defined for this class*


### <a id="_class_dct_Event"></a>dct:Event



Specialization of: http://purl.org/dc/terms/Event

*No properties defined for this class*


### <a id="_class_dct_Image"></a>dct:Image



Specialization of: http://purl.org/dc/terms/Image

*No properties defined for this class*


### <a id="_class_dct_InteractiveResource"></a>dct:InteractiveResource



Specialization of: http://purl.org/dc/terms/InteractiveResource

*No properties defined for this class*


### <a id="_class_dct_MovingImage"></a>dct:MovingImage



Specialization of: http://purl.org/dc/terms/MovingImage

*No properties defined for this class*


### <a id="_class_dct_PhysicalObject"></a>dct:PhysicalObject



Specialization of: http://purl.org/dc/terms/PhysicalObject

*No properties defined for this class*


### <a id="_class_dct_Service"></a>dct:Service



Specialization of: http://purl.org/dc/terms/Service

*No properties defined for this class*


### <a id="_class_dct_Software"></a>dct:Software



Specialization of: http://purl.org/dc/terms/Software

*No properties defined for this class*


### <a id="_class_dct_Sound"></a>dct:Sound



Specialization of: http://purl.org/dc/terms/Sound

*No properties defined for this class*


### <a id="_class_dct_StillImage"></a>dct:StillImage



Specialization of: http://purl.org/dc/terms/StillImage

*No properties defined for this class*


### <a id="_class_dct_Text"></a>dct:Text



Specialization of: http://purl.org/dc/terms/Text

*No properties defined for this class*



