---
title: RO-Crate 1.1 Core Profile
---

This document in an experimental SoSS+ profile for RO-Crate 1.1 - for the core, mandated metadata only


A conformant RO-Crate:

- MUST be of type(s): http://schema.org/Dataset
- MUST include the following properties:
  * name
  * description
  * datePublished
  * license


## Defined Term Sets



## Classes and Properties

### <a id="_RO_Crate_Metadata_Descriptor"></a>RO-Crate Metadadata Descriptor



Specialization of: http://schema.org/CreativeWork

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_RO_Crate_Metadata_Descriptor_unnamed_c84by"></a>@id | Yes | The RO-Crate Metadata  | [Root Data Entity](#_Root_Data_Entity) | ro-crate-metadata.json |
| <a id="_RO_Crate_Metadata_Descriptor_unnamed_nuzyc"></a>about | Yes | This property on the RO-Crate Metadata Descriptor references the Root Data Entity. I a SoSS+ profile there may be Schemas present for more than one 'flavour' of Root Data Enitty with different @type arrays or `@conformsTo` references (or other specializations). In this example there is a single reference. | [Root Data Entity](#_Root_Data_Entity) |  |

### <a id="_Root_Data_Entity"></a>Root Data Entity

The Root Data Entity for an RO-Crate. This is the main entity of the RO-Crate and is the one that is referenced by the RO-Crate Metadata Descriptor.

Specialization of: http://schema.org/Dataset

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| <a id="_Root_Data_Entity_unnamed_nm29f"></a>datePublished | Yes | A date that this collection was published. This should be the date that the collection was first made available eg by being put online or into an access controlled system. | schema:Date |  |
| <a id="_Root_Data_Entity_unnamed_3alts"></a>description | Yes | An abstract of the collection. Include as much detail as possible about the motivation and use of the collection. | Text |  |
| <a id="_Root_Data_Entity_unnamed_z3p8n"></a>license | Yes | A license document that applies to this content, typically indicated by URL. | #class_CreativeWork, schema:URL, schema:Text |  |
| <a id="_Root_Data_Entity_unnamed_r98kq"></a>name | Yes | The name of this Schema. | Text |  |


