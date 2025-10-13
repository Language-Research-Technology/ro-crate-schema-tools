---
title: RO-Crate 1.1 Core Profile
---

This document in an experimental SoSS+ profile for Service-Oriented Architecture Ontology - using a profile Crate prepared by Stian


A conformant Service Ortiented Architecture:



## Defined Term Sets

### <a id="defined-term-set-service-oriented-architecture-ontology"></a>Defined Term Set: Service-Oriented Architecture Ontology

ID: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl

OWL ontology with definitions of SOA Ontology. The terms referenced from hasDefinedTerm represents equivalent Schema.org-like-Schema definitions without using OWL constraints.

*No terms defined for this term set*




## Types of entities (specializations of Classes) and expected Properties


### <a id="class-schema-organization"></a> Class: schema:Organization

#### IRI: undefined  



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
*No properties defined for this class*


#### Examples 
-  [Example-1: #AutomatedCarWash](#example-1-automatedcarwash)
-  [Example-1: #AutomatedCarWashProcess](#example-1-automatedcarwashprocess)
-  [Example-1: #BasicWash](#example-1-basicwash)
-  [Example-1: #CarWashBusiness](#example-1-carwashbusiness)
-  [Example-1: #GoldWash](#example-1-goldwash)
-  [Example-1: #InitiateAutomatedWash](#example-1-initiateautomatedwash)
-  [Example-1: #Jack](#example-1-jack)
-  [Example-1: #Joe](#example-1-joe)
-  [Example-1: #John](#example-1-john)
-  [Example-1: #Judy](#example-1-judy)
-  [Example-1: #Mary](#example-1-mary)
-  [Example-1: #Owner](#example-1-owner)
-  [Example-1: #PreWash](#example-1-prewash)
-  [Example-1: #PreWashGuy](#example-1-prewashguy)
-  [Example-1: #Secretary](#example-1-secretary)
-  [Example-1: #TypeOfWash](#example-1-typeofwash)
-  [Example-1: #WashManager](#example-1-washmanager)
-  [Example-1: #WashOperator](#example-1-washoperator)
-  [Example-2: #Jill](#example-2-jill)
-  [Example-2: #BuyTVOnline](#example-2-buytvonline)
-  [Example-2: #OnlineSalesComponent](#example-2-onlinesalescomponent)
-  [Example-2: #OnlineTVSales](#example-2-onlinetvsales)
-  [Example-2: #SelectWhatToBuyComponent](#example-2-selectwhattobuycomponent)
-  [Example-2: #SelectWhatToBuyService](#example-2-selectwhattobuyservice)
-  [Example-2: #PayComponent](#example-2-paycomponent)
-  [Example-2: #PayService](#example-2-payservice)


### <a id="class-human-actor"></a> Class: Human actor

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#HumanActor  

A human actor is a person or an organization. (...) HumanActor is specifically not defined as disjoint with System since an organization in many cases is in fact just a particular kind of system

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#property-does">does</a> | No | Inverse of property soa:doneBy | <a href="#class-task">Task</a> |  |
| <a href="#property-is-party-to">is party to</a> | No | In addition to the rules and regulations that intrinsically apply to any interaction with a service (the interaction aspect of service contracts captured in the interactionAspect datatype property) there may be additional legal agreements that apply to certain human actors and their use of services. The involvesParty property, and its inverse isPartyTo, capture the abstract notion of a service contract specifying legal obligations between human actors in the context of using the one or more services for which the service contract is a contract. | <a href="#class-service-contract">Service contract</a> |  |
| <a href="#property-sets-policy">sets policy</a> | No | The setsPolicy property, and its inverse isSetBy, capture the abstract notion that a policy can be set by one or more human actors.<p> In one direction, a policy can be set by zero (in the case where actors setting the policy by choice are not defined or captured), one, or more human actors. Note specifically that some policies are set by multiple human actors in conjunction, meaning that all these human actors need to discuss and agree on the policy before it can take effect. A real-world example would be two parents in conjunction setting policies for acceptable child behavior. In the other direction, a human actor may potentially set (or be part of setting) multiple policies.<p> The SOA ontology purposefully separates the setting of the policy itself and the application of the policy to one or more instances of Thing. In some cases these two acts may be inseparably bound together, yet in other cases they are definitely not. One such example is an overall compliance policy that is formulated at the corporate level yet applied by the compliance officer in each line of business.<p> Also, while a particular case of interest for this ontology is that where the provider of a service has a policy for the service, a policy for a service is not necessarily owned by the provider. For example, government food and hygiene regulations (a policy that is law) cover restaurant services independently of anything desired or defined by the restaurant owner. | <a href="#class-policy">Policy</a> |  |

#### Examples 
-  [Example-1: #Administration](#example-1-administration)
-  [Example-1: #CarWash](#example-1-carwash)
-  [Example-1: #CarWashBusiness](#example-1-carwashbusiness)
-  [Example-1: #Jack](#example-1-jack)
-  [Example-1: #Joe](#example-1-joe)
-  [Example-1: #John](#example-1-john)
-  [Example-1: #Judy](#example-1-judy)
-  [Example-1: #Mary](#example-1-mary)
-  [Example-2: #Jill](#example-2-jill)
-  [Example-2: #OnlineTVSales](#example-2-onlinetvsales)


### <a id="class-schema-person"></a> Class: schema:Person

#### IRI: undefined  



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
*No properties defined for this class*


#### Examples 
-  [Example-1: #AutomatedCarWash](#example-1-automatedcarwash)
-  [Example-1: #AutomatedCarWashProcess](#example-1-automatedcarwashprocess)
-  [Example-1: #BasicWash](#example-1-basicwash)
-  [Example-1: #CarWashBusiness](#example-1-carwashbusiness)
-  [Example-1: #GoldWash](#example-1-goldwash)
-  [Example-1: #InitiateAutomatedWash](#example-1-initiateautomatedwash)
-  [Example-1: #Jack](#example-1-jack)
-  [Example-1: #Joe](#example-1-joe)
-  [Example-1: #John](#example-1-john)
-  [Example-1: #Judy](#example-1-judy)
-  [Example-1: #Mary](#example-1-mary)
-  [Example-1: #Owner](#example-1-owner)
-  [Example-1: #PreWash](#example-1-prewash)
-  [Example-1: #PreWashGuy](#example-1-prewashguy)
-  [Example-1: #Secretary](#example-1-secretary)
-  [Example-1: #TypeOfWash](#example-1-typeofwash)
-  [Example-1: #WashManager](#example-1-washmanager)
-  [Example-1: #WashOperator](#example-1-washoperator)
-  [Example-2: #Jill](#example-2-jill)
-  [Example-2: #BuyTVOnline](#example-2-buytvonline)
-  [Example-2: #OnlineSalesComponent](#example-2-onlinesalescomponent)
-  [Example-2: #OnlineTVSales](#example-2-onlinetvsales)
-  [Example-2: #SelectWhatToBuyComponent](#example-2-selectwhattobuycomponent)
-  [Example-2: #SelectWhatToBuyService](#example-2-selectwhattobuyservice)
-  [Example-2: #PayComponent](#example-2-paycomponent)
-  [Example-2: #PayService](#example-2-payservice)


### <a id="class-composition"></a> Class: Composition

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#Composition  

A composition is the result of assembling a collection of things for a particular purpose. Note in particular that we have purposefully distinguished between the act of composing and the resulting composition as a thing, and that it is in the latter sense we are using the concept of composition here.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#property-composition-pattern">composition pattern</a> | Yes | As discussed above, any composition must have associated with it a specific composition pattern, that pattern describing the way in which a collection of elements is assembled to a result. The concept of a composition pattern is captured by the compositionPattern datatype property. Note that even though certain kinds of composition patterns are of special interest within SOA (see below), the compositionPattern datatype property may take any value as long as that value describes how to assemble the elements used by the composition with which it is associated. | schema:Text |  |
| <a href="#property-orchestrated-by">orchestrated by</a> | No | An orchestration has one particular element that oversees and directs the other elements used by the composition. This type of relationship is important enough that we have chosen to capture the abstract notion in the orchestrates property and its inverse orchestratedBy.<p>In one direction, a composition has at most one element that orchestrates it, and the cardinality can only be one (1) if in fact the composition pattern of that composition is an orchestration. In the other direction, an element can orchestrate at most one composition which then must have an orchestration as its composition pattern.<p>Note that in practical applications of the ontology, even though Service is a subclass of Element, a service (as a purely logical representation) is not expected to orchestrate a composition. | <a href="#class-element">Element</a> |  |


### <a id="class-effect"></a> Class: Effect

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#Effect  

Interacting with something performing a service has effects. These comprise the outcome of that interaction, and are how a service (through the element that performs it) delivers value to its consumers.<p>Note that the Effect class purely represents how results or value is delivered to someone interacting with a service. Any possible internal side-effects are explicitly not covered by the Effect class.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#property-is-specified-by">is specified by</a> | Yes | Inverse of soa:specifies | <a href="#class-service-contract">Service contract</a> |  |


### <a id="class-element"></a> Class: Element

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#Element  

An element is an opaque entity that is indivisible at a given level of abstraction. The element has a clearly defined boundary.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#property-generates">generates</a> | No | Events can, but need not necessarily, be generated by elements. The generates property, and its inverse generatedBy, capture the abstract notion that an element generates an event. <p> Note that the same event may be generated by many different elements. Similarly, the same element may generate many different events. | <a href="#class-soaevent">SOAEvent</a> |  |
| <a href="#property-orchestrates">orchestrates</a> | No | Inverse of property soa:orchestratedBy | <a href="#class-composition">Composition</a> |  |
| <a href="#property-performs">performs</a> | No | As a service itself is only a logical representation, any service is performed by something. The something that performs a service must be opaque to anyone interacting with it, an opaqueness which is the exact nature of the Element class. This concept is captured by the performs and performedBy properties. This also captures the fact that services can be performed by elements of other types than systems. This includes elements such as software components, human actors, and tasks. | <a href="#class-soaservice">SOAService</a> |  |
| <a href="#property-represented-by">represented By</a> | No | Inverse of property soa:represents | <a href="#class-element">Element</a> |  |
| <a href="#property-represents">represents</a> | No | The environment described by an SOA is intrinsically hierarchically composite (see also Section 5.2 for a definition of the Composition class); in other words, the elements of SOA systems can be repeatedly composed to ever higher levels of abstraction. One aspect of this has already been addressed by the uses and usedBy properties in that we can use these to express the notion of systems of systems. This is still a very concrete relationship though, and does not express the concept of architectural abstraction. We find the need for architectural abstraction in various places such as a role representing the people playing that role, an organizational unit representing the people within it (subtly different from that same organizational unit using the people within it, as the represents relationship indicates the organizational unit as a substitute interaction point), an architectural building block representing an underlying construct (for instance, important to enterprise architects wanting to explicitly distinguish between constructs and building blocks), and an Enterprise Service Bus (ESB) representing the services that are accessible through it (for instance, relevant when explicitly modeling operational interaction and dependencies). The concept of such an explicitly changing viewpoint, or level of abstraction, is captured by the represents and representedBy properties. | <a href="#class-element">Element</a> |  |
| <a href="#property-responds-to">responds to</a> | No | Events can, but need not necessarily, be responded to by elements. The respondsTo property, and its inverse respondedToBy, capture the abstract notion that an element responds to an event.<p>Note that the same event may be responded to by many different elements. Similarly, the same element may respond to many different events. | <a href="#class-soaevent">SOAEvent</a> |  |
| <a href="#property-used-by">used by</a> | No | Inverse of property soa:uses | <a href="#class-element">Element</a> |  |
| <a href="#property-uses">uses</a> | No | Elements may use other elements in various ways. In general, the notion of some element using another element is applied by practitioners for all of models, executables, and physical objects. What differs from domain to domain is the way in which such use is perceived. <p>An element uses another element if it interacts with it in some fashion. Interacts here is interpreted very broadly ranging through, for example, an element simply being a member of (used by) some system (see later for a formal definition of the System class), an element interacting with (using) another element (such as a service; see later for a formal definition of the Service class) in an ad hoc fashion, or even a strongly coupled dependency in a composition (see Section 5.2 for a formal definition of the Composition class). The uses property, and its inverse usedBy, capture the abstract notion of an element using another. These properties capture not just transient relations. Instantiations of the property can include “uses at this instant”, “has used”, and “may in future use”. <p>For the purposes of this ontology we have chosen not to attempt to enumerate and formally define the multitude of different possible semantics of a uses relationship. We leave the semantic interpretations to a particular sub-domain, application, or even design approach. | <a href="#class-element">Element</a> |  |


### <a id="class-soaevent"></a> Class: SOAEvent

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#Event  

An event is something that happens, to which an element may choose to respond. Events can be responded to by any element. Similarly, events may be generated (emitted) by any element. Knowing the events generated or responded to by an element makes it easier and more transparent to interact with that element. Note that some events may occur whether generated or responded to by an element or not.<p>Event as a concept is generic and has relevance to the domain of SOA as well as many other domains. For the purposes of this ontology, event is used in its generic sense. <p>From a design perspective events may have more granular parts or may be expressed and made operational through specific syntax or semantics. We have chosen to stay at the concept level and not include such design aspects in the ontology.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#property-generated-by">generated by</a> | No | Inverse of property soa:generates | <a href="#class-element">Element</a> |  |
| <a href="#property-responded-to-by">responded to by</a> | No | Inverse of property soa:respondsTo | <a href="#class-element">Element</a> |  |


### <a id="class-information-type"></a> Class: Information type

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#InformationType  

A service interface can enable another element to give information to or receive information from a service (when it uses that service); specifically the types of information given or received.<p>In any concrete interaction through a service interface the information types on that interface are instantiated by information items, yet for the service interface itself it is the types that are important. Note that the constraints datatype property on ServiceInterface, if necessary, can be used to express constraints on allowed values for certain information types.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#property-is-input-at">is input at</a> | No | Inverse of property soa:hasInput | <a href="#class-service-interface">Service interface</a> |  |
| <a href="#property-is-output-at">is output at</a> | No | Inverse of property soa:hasOutput | <a href="#class-service-interface">Service interface</a> |  |

#### Examples 
-  [Example-1: #TypeOfWash](#example-1-typeofwash)


### <a id="class-policy"></a> Class: Policy

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#Policy  

A policy is a statement of direction that a human actor may intend to follow or may intend that another human actor should follow. Knowing the policies that apply to something makes it easier and more transparent to interact with that something.<p>Policy as a concept is generic and has relevance outside the domain of SOA. For the purposes of this SOA ontology it has not been necessary or relevant to restrict the generic nature of the Policy class itself. The relationships between Policy and HumanActor are of course bound by the SOA-specific restrictions that have been applied on the definition of HumanActor.<p>From a design perspective policies may have more granular parts or may be expressed and made operational through specific rules. We have chosen to stay at the concept level and not include such design aspects in the ontology.<p>Policy is distinct from all other concepts in this ontology, hence the Policy class is defined as disjoint with all other defined classes. In particular, Policy is disjoint with ServiceContract. While policies may apply to service contracts – such as security policies on who may change a given service contract – or conversely be referred to by service contracts as part of the terms, conditions, and interaction rules that interacting participants must agree to, service contracts are themselves not policies as they do not describe an intended course of action.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#property-applies-to">applies to</a> | No | Policies can apply to things other than elements; in fact, policies can apply to anything at all, including other policies. For instance, a security policy might specify which actors have the authority to change some other policy. The appliesTo property, and its inverse isSubjectTo, capture the abstract notion that a policy can apply to any instance of Thing. Note specifically that Element is a subclass of Thing, hence policies by inference can apply to any instance of Element.<p>In one direction, a policy can apply to zero (in the case where a policy has been formulated but not yet explicitly applied to anything), one, or more instances of Thing. Note that having a policy apply to multiple things does not mean that these things are the same, only that they are (partly) regulated by the same intent. In the other direction, an instance of Thing may be subject to zero, one, or more policies. Note that where multiple policies apply to the same instance of Thing this is often because the multiple policies are from multiple different policy domains (such as security and governance).<p>The SOA ontology does not attempt to enumerate different policy domains; such policy-focused details are deemed more appropriate for a policy ontology. It is worth pointing out that a particular policy ontology may also restrict (if desired) the kinds of things that policies can apply to. | schema:Thing |  |
| <a href="#property-is-set-by">is set by</a> | No | Inverse of property soa:setsPolicy | <a href="#class-human-actor">Human actor</a> |  |

#### Examples 
-  [Example-1: #PaymentUpFront](#example-1-paymentupfront)


### <a id="class-process"></a> Class: Process

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#Process  

Another key SOA concept is the notion of process. A process is a composition whose elements are composed into a sequence or flow of activities and interactions with the objective of carrying out certain work. This definition is consistent with, for instance, the Business Process Modeling Notation (BPMN) 2.0 definition of a process. <p> Elements in process compositions can be things like human actors, tasks, services, other processes, etc. A process always adds logic via the composition pattern; the result is more than the parts

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
*No properties defined for this class*


#### Examples 
-  [Example-1: #AutomatedCarWashProcess](#example-1-automatedcarwashprocess)
-  [Example-1: #CarWashProcess](#example-1-carwashprocess)
-  [Example-2: #OnlineTVSalesProcess](#example-2-onlinetvsalesprocess)


### <a id="class-soaservice"></a> Class: SOAService

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#Service  

A service is a logical representation of a repeatable activity that has a specified outcome. It is self-contained and is a ‘black box’ to its consumers. In the context of the SOA ontology we consider only SOA-based services.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#property-has-interface">has interface</a> | Yes | The hasInterface property, and its inverse isInterfaceOf, capture the abstract notion of a service having a particular service interface. In one direction, any service must have at least one service interface; anything else would be contrary to the definition of a service as a representation of a repeatable activity that has a specified outcome and is a ‘black box’ to its consumers. In the other direction, there can be service interfaces that are not yet interfaces of any defined services. Also, the same service interface can be an interface of multiple services. The latter does not mean that these services are the same, nor even that they have the same effect; it only means that it is possible to interact with all these services in the manner defined by the service interface in question. | <a href="#class-service-interface">Service interface</a> |  |
| <a href="#property-has-contract">has contract</a> | No | Inverse of property soa:isContractFor | <a href="#class-service-contract">Service contract</a> |  |
| <a href="#property-performed-by">performed by</a> | No | Inverse of property soa:performs | <a href="#class-element">Element</a> |  |


### <a id="class-service-composition"></a> Class: Service composition

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#ServiceComposition  

A key SOA concept is the notion of service composition, the result of assembling a collection of services in order to perform a new higher-level service. As a service composition is the result of assembling a collection of services, ServiceComposition is naturally a subclass of Composition.<p>A service composition may, and typically will, add logic (or even “code”) via the composition pattern. Note that a service composition is not the new higher-level service itself (due to the System and Service classes being disjoint); rather it performs (as an element) that higher-level service.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
*No properties defined for this class*



### <a id="class-service-contract"></a> Class: Service contract

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#ServiceContract  

In many cases, specific agreements are needed in order to define how to use a service. This can either be because of a desire to regulate such use or can simply be because the service will not function properly unless interaction with it is done in a certain sequence. A service contract defines the terms, conditions, and interaction rules that interacting participants must agree to (directly or indirectly). A service contract is binding on all participants in the interaction, including the service itself and the element that provides it for the particular interaction in question

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#property-interaction-aspect">interaction aspect</a> | Yes | Service contracts explicitly regulate both the interaction aspects (see the hasContract and isContractFor properties) and the legal agreement aspects (see the involvedParty and isPartyTo properties) of using a service. The two types of aspects are formally captured by defining the interactionAspect and legalAspect datatype properties on the ServiceContract class. | schema:Text |  |
| <a href="#property-is-contract-for">is contract for</a> | Yes | The hasContract property, and its inverse isContractFor, capture the abstract notion of a service having a service contract. Anyone wanting to use a service must obey the interaction aspects (as defined in the interactionAspect datatype property) of any service contract applying to that interaction. In that fashion, the interaction aspects of a service contract are context-independent; they capture the defined or intrinsic ways in which a service may be used.<p>By definition, any service contract must be a contract for at least one service. It is possible that the same service contract can be a contract for more than one service; for instance, in cases where a group of services share the same interaction pattern or where a service contract (legally – see the involvesParty and isPartyTo properties below) regulates the providing and consuming of multiple services. | <a href="#class-soaservice">SOAService</a> |  |
| <a href="#property-legal-aspect">legal aspect</a> | Yes | Service contracts explicitly regulate both the interaction aspects (see the hasContract and isContractFor properties) and the legal agreement aspects (see the involvedParty and isPartyTo properties) of using a service. The two types of aspects are formally captured by defining the interactionAspect and legalAspect datatype properties on the ServiceContract class. Note that the second of these attributes, the legal agreement aspects, includes concepts such as Service-Level Agreements (SLAs). | schema:Text |  |
| <a href="#property-specifies">specifies</a> | Yes | While a service intrinsically has an effect every time someone interacts with it, in order to trust the effect to be something in particular, the effect needs to be specified as part of a service contract. The specifies property, and its inverse isSpecifiedBy, capture the abstract notion of a service contract specifying a particular effect as part of the agreement for using a service. Note that the specified effect can apply to both the interactionAspect datatype property (simply specifying what will happen when interacting with the service according to the service contract) and the legalAspect datatype property (specifying a contractually promised effect).<p>Anyone wanting a guaranteed effect of the interaction with a given service must ensure that the desired effect is specified in a service contract applying to that interaction. By definition, any service contract must specify at least one effect. In the other direction, an effect must be an effect of at least one service contract; this represents that fact that we have chosen only to formalize those effects that are specified by service contracts (and not all intrinsic effects of all services). | <a href="#class-effect">Effect</a> |  |
| <a href="#property-involves-party">involves party</a> | No | Inverse of property soa:isPartyTo | <a href="#class-human-actor">Human actor</a> |  |

#### Examples 
-  [Example-1: #BasicWashContract](#example-1-basicwashcontract)
-  [Example-2: #BuyTVOnlineContract](#example-2-buytvonlinecontract)


### <a id="class-service-interface"></a> Class: Service interface

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#ServiceInterface  

An important characteristic of services is that they have simple, well-defined interfaces. This makes it easy to interact with them, and enables other elements to use them in a structured manner. A service interface defines the way in which other elements can interact and exchange information with a service.<p>The concept of an interface is in general well understood by practitioners, including the notion that interfaces define the parameters for information passing in and out of them when invoked. What differs from domain to domain is the specific nature of how an interface is invoked and how information is passed back and forth. Service interfaces are typically, but not necessarily, message-based (to support loose-coupling). Furthermore, service interfaces are always defined independently from any service implementing them (to support loose-coupling and service mediation).

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#property-constraints">constraints</a> | Yes | The constraints datatype property on ServiceInterface captures the notion that there can be constraints on the allowed interaction such as only certain value ranges allowed on given parameters. Depending on the nature of the service and the service interface in question, these constraints may be defined either formally or informally (the informal case being relevant at a minimum for certain types of real-world services). | schema:Text |  |
| <a href="#property-has-input">has input</a> | No | The hasInput property, and its inverse isInputAt, capture the abstract notion of a particular type of information being given when interacting with a service through a service interface.<p>Note that there is a many-to-many relationship between service interfaces and input information types. A given information type may be input at many service interfaces or none at all. Similarly, a given service interface may have many information types as input or none at all. It is important to realize that some services may have only inputs (triggering an asynchronous action without a defined response) and other services may have only outputs (elements performing these services execute independently yet may provide output that is used by other elements). | <a href="#class-information-type">Information type</a> |  |
| <a href="#property-has-output">has output</a> | No | The hasOutput property, and its inverse isOutputAt, capture the abstract notion of a particular type of information being received when interacting with a service through a service interface.<p>Note that there is a many-to-many relationship between service interfaces and output information types. A given information type may be output at many service interfaces or none at all. Similarly, a given service interface may have many information types as output or none at all. It is important to realize that some services may have only inputs (triggering an asynchronous action without a defined response) and other services may have only outputs (elements performing these services execute independently yet may provide output that is used by other elements). | <a href="#class-information-type">Information type</a> |  |
| <a href="#property-is-interface-of">is interface of</a> | No | Inverse of property soa:hasInterface | <a href="#class-soaservice">SOAService</a> |  |

#### Examples 
-  [Example-1: #WashingMachineInterface](#example-1-washingmachineinterface)


### <a id="class-system"></a> Class: System

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#System  

A system is an organized collection of other things. Specifically things in a system collection are instances of Element, each such instance being used by the system.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
*No properties defined for this class*


#### Examples 
-  [Example-1: #AdministrativeSystem](#example-1-administrativesystem)
-  [Example-1: #CarWashBusiness](#example-1-carwashbusiness)
-  [Example-1: #CarWashSystem](#example-1-carwashsystem)


### <a id="class-task"></a> Class: Task

#### IRI: http://www.semanticweb.org/ontologies/2010/01/core-soa.owl#Task  

A task is an atomic action which accomplishes a defined result. Tasks are done by people or organizations, specifically by instances of HumanActor.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Required | Description | Range | Value |
| -------- | -------- | ----------- | ----- | ----- |
| @type | Yes |  |  |  |
| <a href="#property-done-by">done by</a> | No | Tasks are naturally thought of as being done by people or organizations. If we think of tasks as being the actual things done, then the natural cardinality is that each instance of Task is done by at most one instance of HumanActor. Due to the atomic nature of instances of Task we rule out the case where such an instance is done jointly by multiple instances of HumanActor. The cardinality can be zero if someone chooses not to instantiate all possible human actors. On the other hand, the same instance of HumanActor can (over time) easily do more than one instance of Task. The does property, and its inverse doneBy, capture the relation between a human actor and the tasks it performs. | <a href="#class-human-actor">Human actor</a> |  |

#### Examples 
-  [Example-1: #Dry](#example-1-dry)
-  [Example-1: #PushWashButton](#example-1-pushwashbutton)
-  [Example-1: #Wash](#example-1-wash)
-  [Example-1: #WashWindows](#example-1-washwindows)
-  [Example-2: #PurchaseTV](#example-2-purchasetv)
-  [Example-2: #PayForTV](#example-2-payfortv)
-  [Example-2: #DeliverTV](#example-2-delivertv)

## All Properties

### <a id="property-applies-to"></a> Property: applies to

ID: soa:appliesTo

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Policies can apply to things other than elements; in fact, policies can apply to anything at all, including other policies. For instance, a security policy might specify which actors have the authority to change some other policy. The appliesTo property, and its inverse isSubjectTo, capture the abstract notion that a policy can apply to any instance of Thing. Note specifically that Element is a subclass of Thing, hence policies by inference can apply to any instance of Element.<p>In one direction, a policy can apply to zero (in the case where a policy has been formulated but not yet explicitly applied to anything), one, or more instances of Thing. Note that having a policy apply to multiple things does not mean that these things are the same, only that they are (partly) regulated by the same intent. In the other direction, an instance of Thing may be subject to zero, one, or more policies. Note that where multiple policies apply to the same instance of Thing this is often because the multiple policies are from multiple different policy domains (such as security and governance).<p>The SOA ontology does not attempt to enumerate different policy domains; such policy-focused details are deemed more appropriate for a policy ontology. It is worth pointing out that a particular policy ontology may also restrict (if desired) the kinds of things that policies can apply to. | schema:Thing | <a href="#class-policy">Policy</a> |
### <a id="property-composition-pattern"></a> Property: composition pattern

ID: soa:compositionPattern

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| As discussed above, any composition must have associated with it a specific composition pattern, that pattern describing the way in which a collection of elements is assembled to a result. The concept of a composition pattern is captured by the compositionPattern datatype property. Note that even though certain kinds of composition patterns are of special interest within SOA (see below), the compositionPattern datatype property may take any value as long as that value describes how to assemble the elements used by the composition with which it is associated. | schema:Text | <a href="#class-composition">Composition</a> |
### <a id="property-constraints"></a> Property: constraints

ID: soa:constraints

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The constraints datatype property on ServiceInterface captures the notion that there can be constraints on the allowed interaction such as only certain value ranges allowed on given parameters. Depending on the nature of the service and the service interface in question, these constraints may be defined either formally or informally (the informal case being relevant at a minimum for certain types of real-world services). | schema:Text | <a href="#class-service-interface">Service interface</a> |
### <a id="property-does"></a> Property: does

ID: soa:does

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:doneBy | <a href="#class-task">Task</a> | <a href="#class-human-actor">Human actor</a> |
### <a id="property-done-by"></a> Property: done by

ID: soa:doneBy

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Tasks are naturally thought of as being done by people or organizations. If we think of tasks as being the actual things done, then the natural cardinality is that each instance of Task is done by at most one instance of HumanActor. Due to the atomic nature of instances of Task we rule out the case where such an instance is done jointly by multiple instances of HumanActor. The cardinality can be zero if someone chooses not to instantiate all possible human actors. On the other hand, the same instance of HumanActor can (over time) easily do more than one instance of Task. The does property, and its inverse doneBy, capture the relation between a human actor and the tasks it performs. | <a href="#class-human-actor">Human actor</a> | <a href="#class-task">Task</a> |
### <a id="property-generated-by"></a> Property: generated by

ID: soa:generatedBy

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:generates | <a href="#class-element">Element</a> | <a href="#class-soaevent">SOAEvent</a> |
### <a id="property-generates"></a> Property: generates

ID: soa:generates

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Events can, but need not necessarily, be generated by elements. The generates property, and its inverse generatedBy, capture the abstract notion that an element generates an event. <p> Note that the same event may be generated by many different elements. Similarly, the same element may generate many different events. | <a href="#class-soaevent">SOAEvent</a> | <a href="#class-element">Element</a> |
### <a id="property-has-contract"></a> Property: has contract

ID: soa:hasContract

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:isContractFor | <a href="#class-service-contract">Service contract</a> | <a href="#class-soaservice">SOAService</a> |
### <a id="property-has-input"></a> Property: has input

ID: soa:hasInput

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The hasInput property, and its inverse isInputAt, capture the abstract notion of a particular type of information being given when interacting with a service through a service interface.<p>Note that there is a many-to-many relationship between service interfaces and input information types. A given information type may be input at many service interfaces or none at all. Similarly, a given service interface may have many information types as input or none at all. It is important to realize that some services may have only inputs (triggering an asynchronous action without a defined response) and other services may have only outputs (elements performing these services execute independently yet may provide output that is used by other elements). | <a href="#class-information-type">Information type</a> | <a href="#class-service-interface">Service interface</a> |
### <a id="property-has-interface"></a> Property: has interface

ID: soa:hasInterface

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The hasInterface property, and its inverse isInterfaceOf, capture the abstract notion of a service having a particular service interface. In one direction, any service must have at least one service interface; anything else would be contrary to the definition of a service as a representation of a repeatable activity that has a specified outcome and is a ‘black box’ to its consumers. In the other direction, there can be service interfaces that are not yet interfaces of any defined services. Also, the same service interface can be an interface of multiple services. The latter does not mean that these services are the same, nor even that they have the same effect; it only means that it is possible to interact with all these services in the manner defined by the service interface in question. | <a href="#class-service-interface">Service interface</a> | <a href="#class-soaservice">SOAService</a> |
### <a id="property-has-output"></a> Property: has output

ID: soa:hasOutput

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The hasOutput property, and its inverse isOutputAt, capture the abstract notion of a particular type of information being received when interacting with a service through a service interface.<p>Note that there is a many-to-many relationship between service interfaces and output information types. A given information type may be output at many service interfaces or none at all. Similarly, a given service interface may have many information types as output or none at all. It is important to realize that some services may have only inputs (triggering an asynchronous action without a defined response) and other services may have only outputs (elements performing these services execute independently yet may provide output that is used by other elements). | <a href="#class-information-type">Information type</a> | <a href="#class-service-interface">Service interface</a> |
### <a id="property-interaction-aspect"></a> Property: interaction aspect

ID: soa:interactionAspect

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Service contracts explicitly regulate both the interaction aspects (see the hasContract and isContractFor properties) and the legal agreement aspects (see the involvedParty and isPartyTo properties) of using a service. The two types of aspects are formally captured by defining the interactionAspect and legalAspect datatype properties on the ServiceContract class. | schema:Text | <a href="#class-service-contract">Service contract</a> |
### <a id="property-involves-party"></a> Property: involves party

ID: soa:involvesParty

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:isPartyTo | <a href="#class-human-actor">Human actor</a> | <a href="#class-service-contract">Service contract</a> |
### <a id="property-is-contract-for"></a> Property: is contract for

ID: soa:isContractFor

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The hasContract property, and its inverse isContractFor, capture the abstract notion of a service having a service contract. Anyone wanting to use a service must obey the interaction aspects (as defined in the interactionAspect datatype property) of any service contract applying to that interaction. In that fashion, the interaction aspects of a service contract are context-independent; they capture the defined or intrinsic ways in which a service may be used.<p>By definition, any service contract must be a contract for at least one service. It is possible that the same service contract can be a contract for more than one service; for instance, in cases where a group of services share the same interaction pattern or where a service contract (legally – see the involvesParty and isPartyTo properties below) regulates the providing and consuming of multiple services. | <a href="#class-soaservice">SOAService</a> | <a href="#class-service-contract">Service contract</a> |
### <a id="property-is-input-at"></a> Property: is input at

ID: soa:isInputAt

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:hasInput | <a href="#class-service-interface">Service interface</a> | <a href="#class-information-type">Information type</a> |
### <a id="property-is-interface-of"></a> Property: is interface of

ID: soa:isInterfaceOf

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:hasInterface | <a href="#class-soaservice">SOAService</a> | <a href="#class-service-interface">Service interface</a> |
### <a id="property-is-output-at"></a> Property: is output at

ID: soa:isOutputAt

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:hasOutput | <a href="#class-service-interface">Service interface</a> | <a href="#class-information-type">Information type</a> |
### <a id="property-is-party-to"></a> Property: is party to

ID: soa:isPartyTo

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| In addition to the rules and regulations that intrinsically apply to any interaction with a service (the interaction aspect of service contracts captured in the interactionAspect datatype property) there may be additional legal agreements that apply to certain human actors and their use of services. The involvesParty property, and its inverse isPartyTo, capture the abstract notion of a service contract specifying legal obligations between human actors in the context of using the one or more services for which the service contract is a contract. | <a href="#class-service-contract">Service contract</a> | <a href="#class-human-actor">Human actor</a> |
### <a id="property-is-set-by"></a> Property: is set by

ID: soa:isSetBy

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:setsPolicy | <a href="#class-human-actor">Human actor</a> | <a href="#class-policy">Policy</a> |
### <a id="property-is-specified-by"></a> Property: is specified by

ID: soa:isSpecifiedBy

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of soa:specifies | <a href="#class-service-contract">Service contract</a> | <a href="#class-effect">Effect</a> |
### <a id="property-is-subject-to"></a> Property: is subject to

ID: soa:isSubjectTo

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:appliesTo | <a href="#class-policy">Policy</a> | schema:Thing |
### <a id="property-legal-aspect"></a> Property: legal aspect

ID: soa:legalAspect

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Service contracts explicitly regulate both the interaction aspects (see the hasContract and isContractFor properties) and the legal agreement aspects (see the involvedParty and isPartyTo properties) of using a service. The two types of aspects are formally captured by defining the interactionAspect and legalAspect datatype properties on the ServiceContract class. Note that the second of these attributes, the legal agreement aspects, includes concepts such as Service-Level Agreements (SLAs). | schema:Text | <a href="#class-service-contract">Service contract</a> |
### <a id="property-orchestrated-by"></a> Property: orchestrated by

ID: soa:orchestratedBy

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| An orchestration has one particular element that oversees and directs the other elements used by the composition. This type of relationship is important enough that we have chosen to capture the abstract notion in the orchestrates property and its inverse orchestratedBy.<p>In one direction, a composition has at most one element that orchestrates it, and the cardinality can only be one (1) if in fact the composition pattern of that composition is an orchestration. In the other direction, an element can orchestrate at most one composition which then must have an orchestration as its composition pattern.<p>Note that in practical applications of the ontology, even though Service is a subclass of Element, a service (as a purely logical representation) is not expected to orchestrate a composition. | <a href="#class-element">Element</a> | <a href="#class-composition">Composition</a> |
### <a id="property-orchestrates"></a> Property: orchestrates

ID: soa:orchestrates

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:orchestratedBy | <a href="#class-composition">Composition</a> | <a href="#class-element">Element</a> |
### <a id="property-performed-by"></a> Property: performed by

ID: soa:performedBy

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:performs | <a href="#class-element">Element</a> | <a href="#class-soaservice">SOAService</a> |
### <a id="property-performs"></a> Property: performs

ID: soa:performs

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| As a service itself is only a logical representation, any service is performed by something. The something that performs a service must be opaque to anyone interacting with it, an opaqueness which is the exact nature of the Element class. This concept is captured by the performs and performedBy properties. This also captures the fact that services can be performed by elements of other types than systems. This includes elements such as software components, human actors, and tasks. | <a href="#class-soaservice">SOAService</a> | <a href="#class-element">Element</a> |
### <a id="property-represented-by"></a> Property: represented By

ID: soa:representedBy

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:represents | <a href="#class-element">Element</a> | <a href="#class-element">Element</a> |
### <a id="property-represents"></a> Property: represents

ID: soa:represents

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The environment described by an SOA is intrinsically hierarchically composite (see also Section 5.2 for a definition of the Composition class); in other words, the elements of SOA systems can be repeatedly composed to ever higher levels of abstraction. One aspect of this has already been addressed by the uses and usedBy properties in that we can use these to express the notion of systems of systems. This is still a very concrete relationship though, and does not express the concept of architectural abstraction. We find the need for architectural abstraction in various places such as a role representing the people playing that role, an organizational unit representing the people within it (subtly different from that same organizational unit using the people within it, as the represents relationship indicates the organizational unit as a substitute interaction point), an architectural building block representing an underlying construct (for instance, important to enterprise architects wanting to explicitly distinguish between constructs and building blocks), and an Enterprise Service Bus (ESB) representing the services that are accessible through it (for instance, relevant when explicitly modeling operational interaction and dependencies). The concept of such an explicitly changing viewpoint, or level of abstraction, is captured by the represents and representedBy properties. | <a href="#class-element">Element</a> | <a href="#class-element">Element</a> |
### <a id="property-responded-to-by"></a> Property: responded to by

ID: soa:respondedToBy

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:respondsTo | <a href="#class-element">Element</a> | <a href="#class-soaevent">SOAEvent</a> |
### <a id="property-responds-to"></a> Property: responds to

ID: soa:respondsTo

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Events can, but need not necessarily, be responded to by elements. The respondsTo property, and its inverse respondedToBy, capture the abstract notion that an element responds to an event.<p>Note that the same event may be responded to by many different elements. Similarly, the same element may respond to many different events. | <a href="#class-soaevent">SOAEvent</a> | <a href="#class-element">Element</a> |
### <a id="property-sets-policy"></a> Property: sets policy

ID: soa:setsPolicy

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| The setsPolicy property, and its inverse isSetBy, capture the abstract notion that a policy can be set by one or more human actors.<p> In one direction, a policy can be set by zero (in the case where actors setting the policy by choice are not defined or captured), one, or more human actors. Note specifically that some policies are set by multiple human actors in conjunction, meaning that all these human actors need to discuss and agree on the policy before it can take effect. A real-world example would be two parents in conjunction setting policies for acceptable child behavior. In the other direction, a human actor may potentially set (or be part of setting) multiple policies.<p> The SOA ontology purposefully separates the setting of the policy itself and the application of the policy to one or more instances of Thing. In some cases these two acts may be inseparably bound together, yet in other cases they are definitely not. One such example is an overall compliance policy that is formulated at the corporate level yet applied by the compliance officer in each line of business.<p> Also, while a particular case of interest for this ontology is that where the provider of a service has a policy for the service, a policy for a service is not necessarily owned by the provider. For example, government food and hygiene regulations (a policy that is law) cover restaurant services independently of anything desired or defined by the restaurant owner. | <a href="#class-policy">Policy</a> | <a href="#class-human-actor">Human actor</a> |
### <a id="property-specifies"></a> Property: specifies

ID: soa:specifies

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| While a service intrinsically has an effect every time someone interacts with it, in order to trust the effect to be something in particular, the effect needs to be specified as part of a service contract. The specifies property, and its inverse isSpecifiedBy, capture the abstract notion of a service contract specifying a particular effect as part of the agreement for using a service. Note that the specified effect can apply to both the interactionAspect datatype property (simply specifying what will happen when interacting with the service according to the service contract) and the legalAspect datatype property (specifying a contractually promised effect).<p>Anyone wanting a guaranteed effect of the interaction with a given service must ensure that the desired effect is specified in a service contract applying to that interaction. By definition, any service contract must specify at least one effect. In the other direction, an effect must be an effect of at least one service contract; this represents that fact that we have chosen only to formalize those effects that are specified by service contracts (and not all intrinsic effects of all services). | <a href="#class-effect">Effect</a> | <a href="#class-service-contract">Service contract</a> |
### <a id="property-used-by"></a> Property: used by

ID: soa:usedBy

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Inverse of property soa:uses | <a href="#class-element">Element</a> | <a href="#class-element">Element</a> |
### <a id="property-uses"></a> Property: uses

ID: soa:uses

| Description | Range | Occurs in Domain(s) |
| ----------- | ----------- | ----------- |
| Elements may use other elements in various ways. In general, the notion of some element using another element is applied by practitioners for all of models, executables, and physical objects. What differs from domain to domain is the way in which such use is perceived. <p>An element uses another element if it interacts with it in some fashion. Interacts here is interpreted very broadly ranging through, for example, an element simply being a member of (used by) some system (see later for a formal definition of the System class), an element interacting with (using) another element (such as a service; see later for a formal definition of the Service class) in an ad hoc fashion, or even a strongly coupled dependency in a composition (see Section 5.2 for a formal definition of the Composition class). The uses property, and its inverse usedBy, capture the abstract notion of an element using another. These properties capture not just transient relations. Instantiations of the property can include “uses at this instant”, “has used”, and “may in future use”. <p>For the purposes of this ontology we have chosen not to attempt to enumerate and formally define the multitude of different possible semantics of a uses relationship. We leave the semantic interpretations to a particular sub-domain, application, or even design approach. | <a href="#class-element">Element</a> | <a href="#class-element">Element</a> |


## Provenance

This document was compiled using [generate-soss-docs.js](https://github.com/Language-Research-Technology/ro-crate-schema-tools/blob/sossplus/generate-soss-docs.js), based on [profiles/soa/profile-text.md](https://github.com/Language-Research-Technology/ro-crate-schema-tools/blob/sossplus/profiles/soa/profile-text.md) using a SoSS+ Schema defined in [profiles/soa/profile-crate/ro-crate-metadata.json](https://github.com/Language-Research-Technology/ro-crate-schema-tools/blob/sossplus/profiles/soa/profile-crate/ro-crate-metadata.json).

## Examples

<a id="example-1-example-car-wash"></a>

## Example-1: Example: Car wash

### <a id="artifact-car-wash-business-represented-using-soa"></a> Artifact: Car wash business represented using SOA

<pre>
 {
  "@id": "#CarWashExample",
  "@type": "LearningResource",
  "name": "Car wash business represented using SOA",
  "isBasedOn": {
    "@id": "http://www.opengroup.org/soa/source-book/ontologyv2/p8.htm"
  },
  "mainEntity": {
    "@id": "#CarWashBusiness"
  },
  "hasPart": [
    {
      "@id": "#Administration"
    },
    {
      "@id": "#AdministrativeSystem"
    },
    {
      "@id": "#AutomatedCarWash"
    },
    {
      "@id": "#AutomatedCarWashProcess"
    },
    {
      "@id": "#BasicWash"
    },
    {
      "@id": "#BasicWashContract"
    },
    {
      "@id": "#CarWash"
    },
    {
      "@id": "#CarWashBusiness"
    },
    {
      "@id": "#CarWashProcess"
    },
    {
      "@id": "#CarWashSystem"
    },
    {
      "@id": "#Dry"
    },
    {
      "@id": "#GoldWash"
    },
    {
      "@id": "#InitiateAutomatedWash"
    },
    {
      "@id": "#Jack"
    },
    {
      "@id": "#Joe"
    },
    {
      "@id": "#John"
    },
    {
      "@id": "#Judy"
    },
    {
      "@id": "#Mary"
    },
    {
      "@id": "#Owner"
    },
    {
      "@id": "#PaymentUpFront"
    },
    {
      "@id": "#PreWash"
    },
    {
      "@id": "#PreWashGuy"
    },
    {
      "@id": "#PushWashButton"
    },
    {
      "@id": "#Secretary"
    },
    {
      "@id": "#TypeOfWash"
    },
    {
      "@id": "#Wash"
    },
    {
      "@id": "#WashingMachineInterface"
    },
    {
      "@id": "#WashManager"
    },
    {
      "@id": "#WashOperator"
    },
    {
      "@id": "#WashWindows"
    }
  ]
}
</pre>

#### <a id="example-1-administration"></a>Example-1: #Administration

<pre>
 {
  "@id": "#Administration",
  "@type": "HumanActor",
  "name": "Administration",
  "represents": {
    "@id": "#AdministrativeSystem"
  },
  "uses": [
    {
      "@id": "#Owner"
    },
    {
      "@id": "#Secretary"
    }
  ]
}
</pre>

#### <a id="example-1-administrativesystem"></a>Example-1: #AdministrativeSystem

<pre>
 {
  "@id": "#AdministrativeSystem",
  "@type": "System",
  "name": "Administrative system"
}
</pre>

#### <a id="example-1-automatedcarwash"></a>Example-1: #AutomatedCarWash

<pre>
 {
  "@id": "#AutomatedCarWash",
  "@type": "Element",
  "name": "Automated car wash",
  "represents": {
    "@id": "#AutomatedCarWashProcess"
  },
  "orchestrates": {
    "@id": "#AutomatedCarWashProcess"
  }
}
</pre>

#### <a id="example-1-automatedcarwashprocess"></a>Example-1: #AutomatedCarWashProcess

<pre>
 {
  "@id": "#AutomatedCarWashProcess",
  "@type": [
    "Process",
    "Orchestration"
  ],
  "name": "Automated car wash process",
  "uses": [
    {
      "@id": "#Wash"
    },
    {
      "@id": "#Dry"
    }
  ]
}
</pre>

#### <a id="example-1-basicwash"></a>Example-1: #BasicWash

<pre>
 {
  "@id": "#BasicWash",
  "@type": "Service",
  "name": "Basic wash",
  "hasContract": {
    "@id": "#BasicWashContract"
  },
  "hasInterface": {
    "@id": "#WashingMachineInterface"
  },
  "representedBy": {
    "@id": "#WashManager"
  }
}
</pre>

#### <a id="example-1-basicwashcontract"></a>Example-1: #BasicWashContract

<pre>
 {
  "@id": "#BasicWashContract",
  "@type": "ServiceContract",
  "name": "Basic wash contract",
  "interactionAspect": "Car returned clean after 2 hours",
  "involvesParty": [
    {
      "@id": "#CarWashBusiness"
    },
    {
      "@id": "#Judy"
    }
  ],
  "legalAspect": "$10 for one basic wash"
}
</pre>

#### <a id="example-1-carwash"></a>Example-1: #CarWash

<pre>
 {
  "@id": "#CarWash",
  "@type": "HumanActor",
  "name": "Car wash",
  "represents": {
    "@id": "#CarWashSystem"
  }
}
</pre>

#### <a id="example-1-carwashbusiness"></a>Example-1: #CarWashBusiness

<pre>
 {
  "@id": "#CarWashBusiness",
  "@type": [
    "HumanActor",
    "System",
    "LocalBusiness"
  ],
  "name": "Car wash business (example)",
  "uses": [
    {
      "@id": "#CarWash"
    },
    {
      "@id": "#Administration"
    }
  ]
}
</pre>

#### <a id="example-1-carwashprocess"></a>Example-1: #CarWashProcess

<pre>
 {
  "@id": "#CarWashProcess",
  "@type": "Process",
  "name": "Car wash process",
  "uses": [
    {
      "@id": "#AutomatedCarWash"
    },
    {
      "@id": "#PreWash"
    },
    {
      "@id": "#PreWashGuy"
    },
    {
      "@id": "#InitiateAutomatedWash"
    },
    {
      "@id": "#WashOperator"
    }
  ]
}
</pre>

#### <a id="example-1-carwashsystem"></a>Example-1: #CarWashSystem

<pre>
 {
  "@id": "#CarWashSystem",
  "@type": "System",
  "name": "Car wash system",
  "performs": [
    {
      "@id": "#BasicWash"
    },
    {
      "@id": "#GoldWash"
    }
  ],
  "uses": [
    {
      "@id": "#PreWashGuy"
    },
    {
      "@id": "#WashOperator"
    },
    {
      "@id": "#WashManager"
    },
    {
      "@id": "#CarWashProcess"
    }
  ]
}
</pre>

#### <a id="example-1-dry"></a>Example-1: #Dry

<pre>
 {
  "@id": "#Dry",
  "@type": "Task",
  "name": "Dry"
}
</pre>

#### <a id="example-1-goldwash"></a>Example-1: #GoldWash

<pre>
 {
  "@id": "#GoldWash",
  "@type": "Service",
  "name": "Gold wash",
  "hasInterface": {
    "@id": "#WashingMachineInterface"
  },
  "representedBy": {
    "@id": "#WashManager"
  }
}
</pre>

#### <a id="example-1-initiateautomatedwash"></a>Example-1: #InitiateAutomatedWash

<pre>
 {
  "@id": "#InitiateAutomatedWash",
  "@type": "Element",
  "name": "Initiate automated wash",
  "represents": {
    "@id": "#PushWashButton"
  }
}
</pre>

#### <a id="example-1-jack"></a>Example-1: #Jack

<pre>
 {
  "@id": "#Jack",
  "@type": [
    "HumanActor",
    "Person"
  ],
  "name": "Jack"
}
</pre>

#### <a id="example-1-joe"></a>Example-1: #Joe

<pre>
 {
  "@id": "#Joe",
  "@type": [
    "HumanActor",
    "Person"
  ],
  "name": "Joe"
}
</pre>

#### <a id="example-1-john"></a>Example-1: #John

<pre>
 {
  "@id": "#John",
  "@type": [
    "HumanActor",
    "Person"
  ],
  "name": "John"
}
</pre>

#### <a id="example-1-judy"></a>Example-1: #Judy

<pre>
 {
  "@id": "#Judy",
  "@type": [
    "HumanActor",
    "Person"
  ],
  "name": "Judy",
  "uses": {
    "@id": "#WashManager"
  }
}
</pre>

#### <a id="example-1-mary"></a>Example-1: #Mary

<pre>
 {
  "@id": "#Mary",
  "@type": [
    "HumanActor",
    "Person"
  ],
  "name": "Mary"
}
</pre>

#### <a id="example-1-owner"></a>Example-1: #Owner

<pre>
 {
  "@id": "#Owner",
  "@type": "Element",
  "name": "Owner",
  "representedBy": {
    "@id": "#Joe"
  }
}
</pre>

#### <a id="example-1-paymentupfront"></a>Example-1: #PaymentUpFront

<pre>
 {
  "@id": "#PaymentUpFront",
  "@type": "Policy",
  "name": "Payment up front",
  "isSetBy": {
    "@id": "#Joe"
  },
  "appliesTo": [
    {
      "@id": "#GoldWash"
    },
    {
      "@id": "#BasicWash"
    }
  ]
}
</pre>

#### <a id="example-1-prewash"></a>Example-1: #PreWash

<pre>
 {
  "@id": "#PreWash",
  "@type": "Element",
  "name": "Pre wash",
  "represents": {
    "@id": "#WashWindows"
  }
}
</pre>

#### <a id="example-1-prewashguy"></a>Example-1: #PreWashGuy

<pre>
 {
  "@id": "#PreWashGuy",
  "@type": "Element",
  "name": "Pre wash guy",
  "representedBy": {
    "@id": "#John"
  }
}
</pre>

#### <a id="example-1-pushwashbutton"></a>Example-1: #PushWashButton

<pre>
 {
  "@id": "#PushWashButton",
  "@type": "Task",
  "name": "Push wash button",
  "doneBy": {
    "@id": "#Jack"
  }
}
</pre>

#### <a id="example-1-secretary"></a>Example-1: #Secretary

<pre>
 {
  "@id": "#Secretary",
  "@type": "Element",
  "name": "Wash operator",
  "representedBy": {
    "@id": "#Mary"
  }
}
</pre>

#### <a id="example-1-typeofwash"></a>Example-1: #TypeOfWash

<pre>
 {
  "@id": "#TypeOfWash",
  "@type": [
    "InformationType",
    "Enumeration"
  ],
  "name": "Type of wash"
}
</pre>

#### <a id="example-1-wash"></a>Example-1: #Wash

<pre>
 {
  "@id": "#Wash",
  "@type": "Task",
  "name": "Wash"
}
</pre>

#### <a id="example-1-washingmachineinterface"></a>Example-1: #WashingMachineInterface

<pre>
 {
  "@id": "#WashingMachineInterface",
  "@type": "ServiceInterface",
  "name": "Washing machine interface",
  "hasInput": {
    "@id": "#TypeOfWash"
  }
}
</pre>

#### <a id="example-1-washmanager"></a>Example-1: #WashManager

<pre>
 {
  "@id": "#WashManager",
  "@type": "Element",
  "name": "Wash manager",
  "representedBy": {
    "@id": "#Jack"
  }
}
</pre>

#### <a id="example-1-washoperator"></a>Example-1: #WashOperator

<pre>
 {
  "@id": "#WashOperator",
  "@type": "Element",
  "name": "Wash operator",
  "representedBy": {
    "@id": "#Jack"
  }
}
</pre>

#### <a id="example-1-washwindows"></a>Example-1: #WashWindows

<pre>
 {
  "@id": "#WashWindows",
  "@type": "Task",
  "name": "Wash windows",
  "doneBy": {
    "@id": "#John"
  }
}
</pre>

<a id="example-2-example-internet-purchase"></a>

## Example-2: Example: Internet Purchase

### <a id="artifact-internet-purchase-example-represented-using-soa"></a> Artifact: Internet Purchase example represented using SOA

<pre>
 {
  "@id": "#InternetPurchaseExample",
  "@type": "LearningResource",
  "name": "Internet Purchase example represented using SOA",
  "isBasedOn": {
    "@id": "http://www.opengroup.org/soa/source-book/ontologyv2/p9.htm"
  },
  "mainEntity": {
    "@id": "#OnlineTVSales"
  },
  "hasPart": [
    {
      "@id": "#Jill"
    },
    {
      "@id": "#PurchaseTV"
    },
    {
      "@id": "#BuyTVOnline"
    },
    {
      "@id": "#BuyTVOnlineContract"
    },
    {
      "@id": "#OnlineSalesComponent"
    },
    {
      "@id": "#OnlineTVSales"
    },
    {
      "@id": "#SelectWhatToBuyComponent"
    },
    {
      "@id": "#SelectWhatToBuyService"
    },
    {
      "@id": "#PayComponent"
    },
    {
      "@id": "#PayService"
    },
    {
      "@id": "#PayForTV"
    },
    {
      "@id": "#DeliverTV"
    },
    {
      "@id": "#OnlineTVSalesProcess"
    }
  ]
}
</pre>

#### <a id="example-2-jill"></a>Example-2: #Jill

<pre>
 {
  "@id": "#Jill",
  "@type": [
    "HumanActor",
    "Person"
  ],
  "name": "Jill",
  "does": [
    {
      "@id": "#PurchaseTV"
    },
    {
      "@id": "#PayForTV"
    }
  ]
}
</pre>

#### <a id="example-2-purchasetv"></a>Example-2: #PurchaseTV

<pre>
 {
  "@id": "#PurchaseTV",
  "@type": "Task",
  "name": "Purchase TV",
  "uses": {
    "@id": "#BuyTVOnline"
  }
}
</pre>

#### <a id="example-2-buytvonline"></a>Example-2: #BuyTVOnline

<pre>
 {
  "@id": "#BuyTVOnline",
  "@type": "Service",
  "name": "Buy TV online"
}
</pre>

#### <a id="example-2-buytvonlinecontract"></a>Example-2: #BuyTVOnlineContract

<pre>
 {
  "@id": "#BuyTVOnlineContract",
  "@type": "ServiceContract",
  "name": "Buy TV Online contract",
  "interactionAspect": "Click the Buy button after reviewing basket",
  "legalAspect": "Will deliver in 5 working days"
}
</pre>

#### <a id="example-2-onlinesalescomponent"></a>Example-2: #OnlineSalesComponent

<pre>
 {
  "@id": "#OnlineSalesComponent",
  "@type": "Element",
  "name": "Online Sales component",
  "performs": {
    "@id": "#OnlineTVSales"
  },
  "uses": [
    {
      "@id": "#SelectWhatToBuyService"
    },
    {
      "@id": "#PayService"
    }
  ]
}
</pre>

#### <a id="example-2-onlinetvsales"></a>Example-2: #OnlineTVSales

<pre>
 {
  "@id": "#OnlineTVSales",
  "@type": [
    "HumanActor",
    "Organization"
  ],
  "name": "Online TV Sales"
}
</pre>

#### <a id="example-2-selectwhattobuycomponent"></a>Example-2: #SelectWhatToBuyComponent

<pre>
 {
  "@id": "#SelectWhatToBuyComponent",
  "@type": "Element",
  "name": "Select what to buy component",
  "performs": {
    "@id": "#SelectWhatToBuyService"
  }
}
</pre>

#### <a id="example-2-selectwhattobuyservice"></a>Example-2: #SelectWhatToBuyService

<pre>
 {
  "@id": "#SelectWhatToBuyService",
  "@type": "Service",
  "name": "Select what to buy service"
}
</pre>

#### <a id="example-2-paycomponent"></a>Example-2: #PayComponent

<pre>
 {
  "@id": "#PayComponent",
  "@type": "Element",
  "name": "Pay component",
  "performs": {
    "@id": "#PayService"
  }
}
</pre>

#### <a id="example-2-payservice"></a>Example-2: #PayService

<pre>
 {
  "@id": "#PayService",
  "@type": "Service",
  "name": "Pay service"
}
</pre>

#### <a id="example-2-payfortv"></a>Example-2: #PayForTV

<pre>
 {
  "@id": "#PayForTV",
  "@type": "Task",
  "name": "Pay for TV",
  "uses": {
    "@id": "#BuyTVOnline"
  }
}
</pre>

#### <a id="example-2-delivertv"></a>Example-2: #DeliverTV

<pre>
 {
  "@id": "#DeliverTV",
  "@type": "Task",
  "name": "Deliver TV"
}
</pre>

#### <a id="example-2-onlinetvsalesprocess"></a>Example-2: #OnlineTVSalesProcess

<pre>
 {
  "@id": "#OnlineTVSalesProcess",
  "@type": "Process",
  "name": "OnlineTVSalesProces",
  "uses": [
    {
      "@id": "#Jill"
    },
    {
      "@id": "#OnlineTVSales"
    },
    {
      "@id": "#PurchaseTV"
    },
    {
      "@id": "#PayForTV"
    },
    {
      "@id": "#DeliverTV"
    }
  ]
}
</pre>


