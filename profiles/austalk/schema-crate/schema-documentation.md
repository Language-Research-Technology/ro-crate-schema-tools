---
title: Austalk Vocabulary Terms
---

# Austalk Vocabulary Terms

All Rules:

## Types of entities (specializations of Classes) and expected Properties


### <a id="class-ausncobject"></a> Class: AusNCObject

#### IRI: ausnc:AusNCObject  

An individual item in the corpus - one recording of a prompt/interview/maptask

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#property-age-from">age from</a> | No | age from | schema:Text |  |
| <a href="#property-age-to">age to</a> | No | age to | schema:Text |  |
| <a href="#property-basename">basename</a> | No | basename | schema:Text |  |
| <a href="#property-camerasn0">cameraSN0</a> | No | cameraSN0 | schema:Text |  |
| <a href="#property-camerasn1">cameraSN1</a> | No | cameraSN1 | schema:Text |  |
| <a href="#property-channel">channel</a> | No | channel | schema:Text |  |
| <a href="#property-checksum">checksum</a> | No | checksum | schema:Text |  |
| <a href="#property-city">city</a> | No | city | schema:Text |  |
| <a href="#property-country">country</a> | No | country | schema:Text |  |
| <a href="#property-frequency">frequency</a> | No | frequency | schema:Text |  |
| <a href="#property-id">id</a> | No | numerical identifier for a session/component/item | schema:Text |  |
| <a href="#property-information-follower">information follower</a> | No | information follower | schema:Text |  |
| <a href="#property-information-giver">information giver</a> | No | information giver | schema:Text |  |
| <a href="#property-institution">institution</a> | No | institution | schema:Text |  |
| <a href="#property-less-than-a-year">less than a year</a> | No | less than a year | schema:Text |  |
| <a href="#property-map">map</a> | No | map | schema:Text |  |
| <a href="#property-maptaskcomment">maptaskcomment</a> | No | maptaskcomment | schema:Text |  |
| <a href="#property-mothers-birth-state">mothers birth state</a> | No | the state where the mother of this person was born | schema:Text |  |
| <a href="#property-prompt">prompt</a> | No | the prompt text shown when recording an item | schema:Text |  |
| <a href="#property-recording-site">recording site</a> | No | recording site | <a href="#class-recordingsite">RecordingSite</a> |  |
| <a href="#property-regenerated">regenerated</a> | No | regenerated | schema:Text |  |
| <a href="#property-research-assistant">research assistant</a> | No | the RA who ran the recording session | foaf:Person |  |
| <a href="#property-shortname">shortname</a> | No | short name for a component | schema:Text |  |
| <a href="#property-state">state</a> | No | state | schema:Text |  |
| <a href="#property-timestamp">timestamp</a> | No | timestamp | schema:Text |  |
| <a href="#property-town">town</a> | No | town | schema:Text |  |
| <a href="#property-type">type</a> | No | type | schema:Text |  |
| <a href="#property-version">version</a> | No | version | schema:Text |  |


### <a id="class-component"></a> Class: Component

#### IRI: austalk:Component  

Prototype of a Component

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
*No properties defined for this class*



### <a id="class-item"></a> Class: Item

#### IRI: austalk:Item  

Prototype of an Item

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
*No properties defined for this class*



### <a id="class-media-file"></a> Class: Media File

#### IRI: austalk:MediaFile  

A Media File containing audio or video

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
*No properties defined for this class*



### <a id="class-recorded-component"></a> Class: Recorded Component

#### IRI: austalk:RecordedComponent  

An instance of a component for one participant

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#property-audio-rating">audio rating</a> | No | a rating of audio quality A-D | schema:Text |  |
| <a href="#property-comment">comment</a> | No | a comment on the recording quality  | schema:Text |  |
| <a href="#property-video-rating">video rating</a> | No | a rating of video quality A-D | schema:Text |  |


### <a id="class-recorded-session"></a> Class: Recorded Session

#### IRI: austalk:RecordedSession  

An instance of a Session for one participant

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
*No properties defined for this class*



### <a id="class-recordingsite"></a> Class: RecordingSite

#### IRI: austalk:RecordingSite  

A physical location where recordings were made

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
*No properties defined for this class*



### <a id="class-session"></a> Class: Session

#### IRI: austalk:Session  

Prototype of a Recording Session

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
*No properties defined for this class*


## All Properties

### <a id="property-age-from"></a> Property: age from

ID: austalk:age_from

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| age from | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-age-to"></a> Property: age to

ID: austalk:age_to

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| age to | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-audio-rating"></a> Property: audio rating

ID: austalk:audiorating

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| a rating of audio quality A-D | schema:Text | <a href="#class-recorded-component">Recorded Component</a> |
### <a id="property-basename"></a> Property: basename

ID: austalk:basename

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| basename | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-birthplace"></a> Property: birthPlace

ID: austalk:birthPlace

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| place of birth of this person (geolocated) | geo:Feature | schema:Person |
### <a id="property-camerasn0"></a> Property: cameraSN0

ID: austalk:cameraSN0

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| cameraSN0 | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-camerasn1"></a> Property: cameraSN1

ID: austalk:cameraSN1

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| cameraSN1 | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-channel"></a> Property: channel

ID: austalk:channel

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| channel | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-checksum"></a> Property: checksum

ID: austalk:checksum

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| checksum | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-city"></a> Property: city

ID: austalk:city

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| city | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-comment"></a> Property: comment

ID: austalk:comment

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| a comment on the recording quality  | schema:Text | <a href="#class-recorded-component">Recorded Component</a> |
### <a id="property-consent"></a> Property: consent

ID: austalk:consent

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| consent | schema:Text | schema:Person |
### <a id="property-country"></a> Property: country

ID: austalk:country

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| country | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-country-of-birth"></a> Property: country of birth

ID: austalk:pob_country

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| the country where this person was born | schema:Text | schema:Person |
### <a id="property-cultural-heritage"></a> Property: cultural heritage

ID: austalk:cultural_heritage

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| the cultural heritage of this person | schema:Text | schema:Person |
### <a id="property-education-level"></a> Property: education level

ID: austalk:education_level

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| education level | schema:Text | schema:Person |
### <a id="property-father-accent"></a> Property: father accent

ID: austalk:father_accent

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| father accent | schema:Text | schema:Person |
### <a id="property-father-cultural-heritage"></a> Property: father cultural heritage

ID: austalk:father_cultural_heritage

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| father cultural heritage | schema:Text | schema:Person |
### <a id="property-father-education-level"></a> Property: father education level

ID: austalk:father_education_level

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| the highest level of education of the father of this person | schema:Text | schema:Person |
### <a id="property-father-first-language"></a> Property: father first language

ID: austalk:father_first_language

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| father first language | schema:Text | schema:Person |
### <a id="property-father-pob-country"></a> Property: father pob country

ID: austalk:father_pob_country

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| father pob country | schema:Text | schema:Person |
### <a id="property-father-pob-town"></a> Property: father pob town

ID: austalk:father_pob_town

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| father pob town | schema:Text | schema:Person |
### <a id="property-father-professional-category"></a> Property: father professional category

ID: austalk:father_professional_category

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| father professional category | schema:Text | schema:Person |
### <a id="property-first-language"></a> Property: first language

ID: austalk:first_language

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| first language | schema:Text | schema:Person |
### <a id="property-frequency"></a> Property: frequency

ID: austalk:frequency

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| frequency | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-has-dentures"></a> Property: has dentures

ID: austalk:has_dentures

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| has dentures | schema:Boolean | schema:Person |
### <a id="property-has-health-problems"></a> Property: has health problems

ID: austalk:has_health_problems

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| has health problems | schema:Boolean | schema:Person |
### <a id="property-has-hearing-problems"></a> Property: has hearing problems

ID: austalk:has_hearing_problems

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| has hearing problems | schema:Text | schema:Person |
### <a id="property-has-hobbies"></a> Property: has hobbies

ID: austalk:has_hobbies

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| has hobbies | schema:Text | schema:Person |
### <a id="property-has-piercings"></a> Property: has piercings

ID: austalk:has_piercings

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| has piercings | schema:Text | schema:Person |
### <a id="property-has-reading-problems"></a> Property: has reading problems

ID: austalk:has_reading_problems

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| boolean value true if this person has reading problems | schema:Boolean | schema:Person |
### <a id="property-has-speech-problems"></a> Property: has speech problems

ID: austalk:has_speech_problems

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| has speech problems | schema:Boolean | schema:Person |
### <a id="property-has-vocal-training"></a> Property: has vocal training

ID: austalk:has_vocal_training

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| has vocal training | schema:Text | schema:Person |
### <a id="property-health-problems-details"></a> Property: health problems details

ID: austalk:health_problems_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| health problems details | schema:Text | schema:Person |
### <a id="property-hearing-problems-details"></a> Property: hearing problems details

ID: austalk:hearing_problems_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| hearing problems details | schema:Text | schema:Person |
### <a id="property-hobbies-details"></a> Property: hobbies details

ID: austalk:hobbies_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| hobbies details | schema:Text | schema:Person |
### <a id="property-id"></a> Property: id

ID: austalk:id

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| numerical identifier for a session/component/item | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-information-follower"></a> Property: information follower

ID: austalk:information_follower

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| information follower | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-information-giver"></a> Property: information giver

ID: austalk:information_giver

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| information giver | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-institution"></a> Property: institution

ID: austalk:institution

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| institution | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-is-left-handed"></a> Property: is left handed

ID: austalk:is_left_handed

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| boolean value tru if this person is left handed | schema:Boolean | schema:Person |
### <a id="property-is-smoker"></a> Property: is smoker

ID: austalk:is_smoker

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| is smoker | schema:Boolean | schema:Person |
### <a id="property-is-student"></a> Property: is student

ID: austalk:is_student

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| boolean value true if this person is a student | schema:Boolean | schema:Person |
### <a id="property-language-usage"></a> Property: language usage

ID: austalk:language_usage

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| language usage | schema:Text | schema:Person |
### <a id="property-less-than-a-year"></a> Property: less than a year

ID: austalk:less_than_a_year

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| less than a year | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-map"></a> Property: map

ID: austalk:map

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| map | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-maptaskcomment"></a> Property: maptaskcomment

ID: austalk:maptaskcomment

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| maptaskcomment | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-media"></a> Property: media

ID: austalk:media

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| media | schema:Text | schema:Person |
### <a id="property-mother-accent"></a> Property: mother accent

ID: austalk:mother_accent

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| mother accent | schema:Text | schema:Person |
### <a id="property-mother-cultural-heritage"></a> Property: mother cultural heritage

ID: austalk:mother_cultural_heritage

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| mother cultural heritage | schema:Text | schema:Person |
### <a id="property-mother-education-level"></a> Property: mother education level

ID: austalk:mother_education_level

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| the highest level of education of the mother of this person | schema:Text | schema:Person |
### <a id="property-mother-first-language"></a> Property: mother first language

ID: austalk:mother_first_language

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| mother first language | schema:Text | schema:Person |
### <a id="property-mother-professional-category"></a> Property: mother professional category

ID: austalk:mother_professional_category

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| the professional category of the mother of this person | schema:Text | schema:Person |
### <a id="property-mother-s-birth-town"></a> Property: mother's birth town

ID: austalk:mother_pob_town

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| the town where the mother of this person was born | schema:Text | schema:Person |
### <a id="property-mother-s-country-of-birth"></a> Property: mother's country of birth

ID: austalk:mother_pob_country

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| the country where the mother of this person was born | schema:Text | schema:Person |
### <a id="property-mothers-birth-state"></a> Property: mothers birth state

ID: austalk:mother_pob_state

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| the state where the mother of this person was born | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-name"></a> Property: name

ID: austalk:name

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| readable name for a thing | schema:Text | owl:Class |
### <a id="property-other-languages"></a> Property: other languages

ID: austalk:other_languages

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| other languages spoken by this person | schema:Text | schema:Person |
### <a id="property-piercings-details"></a> Property: piercings details

ID: austalk:piercings_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| piercings details | schema:Text | schema:Person |
### <a id="property-pob-state"></a> Property: pob state

ID: austalk:pob_state

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| pob state | schema:Text | schema:Person |
### <a id="property-pob-town"></a> Property: pob town

ID: austalk:pob_town

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| town where this person was born | schema:Text | schema:Person |
### <a id="property-professional-category"></a> Property: professional category

ID: austalk:professional_category

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| the professional category of this person | schema:Text | schema:Person |
### <a id="property-professional-occupation"></a> Property: professional occupation

ID: austalk:professional_occupation

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| professional occupation | schema:Text | schema:Person |
### <a id="property-professional-qualification"></a> Property: professional qualification

ID: austalk:professional_qualification

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| professional qualification | schema:Text | schema:Person |
### <a id="property-prompt"></a> Property: prompt

ID: austalk:prompt

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| the prompt text shown when recording an item | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-prototype"></a> Property: prototype

ID: austalk:prototype

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| link to the prototype session/component/item for this thing |  |  |
### <a id="property-reading-problems-details"></a> Property: reading problems details

ID: austalk:reading_problems_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| reading problems details | schema:Text | schema:Person |
### <a id="property-recording-site"></a> Property: recording site

ID: austalk:recording_site

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| recording site | <a href="#class-recordingsite">RecordingSite</a> | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-regenerated"></a> Property: regenerated

ID: austalk:regenerated

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| regenerated | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-research-assistant"></a> Property: research assistant

ID: austalk:research_assistant

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| the RA who ran the recording session | foaf:Person | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-residence-history"></a> Property: residence history

ID: austalk:residence_history

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| residence history | schema:Text | schema:Person |
### <a id="property-residential-history"></a> Property: residential history

ID: austalk:residential_history

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| residential history | schema:Text | schema:Person |
### <a id="property-ses"></a> Property: ses

ID: austalk:ses

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| ses | schema:Text | schema:Person |
### <a id="property-shortname"></a> Property: shortname

ID: austalk:shortname

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| short name for a component | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-situation"></a> Property: situation

ID: austalk:situation

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| situation | schema:Text | schema:Person |
### <a id="property-speech-problems-details"></a> Property: speech problems details

ID: austalk:speech_problems_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| speech problems details | schema:Text | schema:Person |
### <a id="property-state"></a> Property: state

ID: austalk:state

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| state | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-state-of-birth-of-father"></a> Property: state of birth of Father

ID: austalk:father_pob_state

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| the state where the father of this person was born | schema:Text | schema:Person |
### <a id="property-student-aspiration"></a> Property: student aspiration

ID: austalk:student_aspiration

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| career aspirations of this person who is a student | schema:Text | schema:Person |
### <a id="property-student-course"></a> Property: student course

ID: austalk:student_course

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| the course that a student is enrolled in | schema:Text | schema:Person |
### <a id="property-student-enrollment"></a> Property: student enrollment

ID: austalk:student_enrollment

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| student enrollment | schema:Text | schema:Person |
### <a id="property-timestamp"></a> Property: timestamp

ID: austalk:timestamp

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| timestamp | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-town"></a> Property: town

ID: austalk:town

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| town | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-type"></a> Property: type

ID: austalk:type

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| type | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-version"></a> Property: version

ID: austalk:version

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| version | schema:Text | <a href="#class-ausncobject">AusNCObject</a> |
### <a id="property-video-rating"></a> Property: video rating

ID: austalk:videorating

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| a rating of video quality A-D | schema:Text | <a href="#class-recorded-component">Recorded Component</a> |
### <a id="property-vocal-training-details"></a> Property: vocal training details

ID: austalk:vocal_training_details

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| vocal training details | schema:Text | schema:Person |
