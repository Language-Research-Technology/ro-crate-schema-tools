/* This is part of rocrate schema tools, a node library for implementing the RO-Crate data
packaging spec. Copyright (C) 2023 University of Queensland

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const { ROCrate, Utils } = require("ro-crate");
const jsonld = require("jsonld");

const profileCrate =
  "https://raw.githubusercontent.com/ResearchObject/ro-crate/refs/heads/main/docs/_specification/1.2/ro-crate-metadata.json";
const fs = require("fs-extra");
const { union, isArray, camelCase } = require("lodash");

/**
 * Class for Schema.org Style Shcemas AKA SOSSs
 */
class SOSS {
  /**
   * Create a new SOSS object from an existing crate or an empty crate
   * @param {ROCrate} An RO-Crate to contain the new Schema.org Style Schema (SOSS) terms or undefined if there is no starting-crate
   * @param {string} A Namespace
   * @param {object} [config] configuration object
   * @param {boolean} [config.superclass] - Add SuperClasses of classes added to the SOSS
   * @param {boolean} [config.standardTerms] - Add entities for standard terms eg schema:Person to the SOSS
   */
  constructor(soss, ns = "http://example.com/todo#", config = {}) {
    this.backgroundSchema = new ROCrate({ array: true, link: true });
    this.backgroundSchema.resolveContext();
    this.ns = ns;
    this.sossCrate = soss || new ROCrate({ link: true, array: true });
    this.sossCrate.resolveContext();
    this.config = {};
    this.config.addSuperClasses = config?.superclass ?? false;
    this.config.includeStandardROCrateTerms = config?.standardTerms ?? false;
  }

  async setup() {
    // Build a crate from which we can pick Schema.org and RO-Crate core defintions to use in our schema
    const sacrificialCrate = new ROCrate();
    const schemaJsonRaw = fs.readJSONSync("./lib/schema.org.json");
    const schemaJson = await jsonld.compact(
      schemaJsonRaw,
      sacrificialCrate["@context"]
    );

    for (let entity of schemaJson["@graph"]) {
      //entity["@id"] = entity["@id"].replace(/^schema:/, "http://schema.org/");

      this.backgroundSchema.addValues(
        this.backgroundSchema.rootDataset,
        "mentions",
        entity
      );
    }
    

    // Now load in the RO-Crate standard things
    const Response = await fetch(profileCrate);
    const rocJson = await Response.json();
    const extraContext = {};
    extraContext["pcdm"] = "http://pcdm.org/models#";
    extraContext["RepositoryObject"] = "http://pcdm.org/models#Object";
    extraContext["pcdm:RepositoryObject"] = "http://pcdm.org/models#Object";

    this.backgroundSchema.addContext(extraContext);
    this.rocProfileCrate = new ROCrate(rocJson, { link: true, array: true });

    for (const entity of this.rocProfileCrate.entities()) {
      entity["@type"] = entity["@type"].map((t) => {
        return t
          .replace(/^Class$/, "rdfs:Class")
          .replace(/^Property/, "rdf:Property");
      });
      if (
        (entity["@type"].includes("rdfs:Class") ||
          entity["@type"].includes("rdf:Property") ||
          entity["@type"].includes("DefinedTerm") ||
          entity["@type"].includes("DefinedTermSet")) &&
        (entity.name || entity.termCode)
      ) {
        entity["rdfs:label"] =
          entity["termCode"] || camelCase(entity["name"][0]);

        this.backgroundSchema.addEntity(entity);
      }
    }
    for (let entity of this.backgroundSchema.getGraph()) {
      // HACK: 
      if (entity["@id"].match(/^schema:/)) {
        
        this.backgroundSchema.updateEntityId(
          entity,
          entity["@id"].replace(/^schema:/, "http://schema.org/")
        );
      }
    }
    for (let entity of this.sossCrate.entities()) {
      for (let prop of Object.keys(entity)) {
        for (let val of entity[prop] || []) {
          if (val["@id"]) {
            // Reference to something -- lets see if it's in the background schema
            if (!this.sossCrate.getEntity(val["@id"]) && this.backgroundSchema.getEntity(val["@id"])) {
              this.sossCrate.addEntity(this.backgroundSchema.getEntity(val["@id"]));
            }
          }
        }
      }
    }
  }

  /**
   * Load more vocab (if there is any from an inputCrate)
   * @param {inputCrate} an RO-Crate with array: true and link: true options
   */
  async load(inputCrate) {
    // Check that all the Properties and Classes needed are included
    const extraContext = {};
    const propTargets = {};

    for (const entity of inputCrate.entities()) {
      // Check that each type is known to the SOSS
      if(entity['@id'] === 'ro-crate-metadata.json') {
        continue;
      }
      for (let t of entity["@type"]) {
        const resolvedTerm = this.sossCrate.resolveTerm(t);
        if (resolvedTerm && !this.sossCrate.getEntity(resolvedTerm)) {
          const termEntity = this.backgroundSchema.getEntity(resolvedTerm)
          if (termEntity)
          {
            this.sossCrate.addEntity(termEntity);
          }
        }
        if (!resolvedTerm) {
          const newClass = {
            "@id": `${this.ns}${t}`,
            "@type": "rdfs:Class",
            name: t,
            "rdfs:label": t,
            "rdfs:comment": "...",
          };
          this.sossCrate.addEntity(newClass);
          extraContext[t] = newClass["@id"];
          this.sossCrate.addValues(
            this.sossCrate.rootDataset,
            "mentions",
            newClass
          );
        }
      }

      for (let p of Object.keys(entity)) {
        // Is this prop known to our vocab crate?
        p = p.replace(/^schema:/, "http://schema.org/");

        var resolvedTerm = this.sossCrate.resolveTerm(p);
        if (resolvedTerm && !this.sossCrate.getEntity(resolvedTerm)) {
          const termEntity = this.backgroundSchema.getEntity(resolvedTerm)
          if (termEntity)
          {
            this.sossCrate.addEntity(termEntity);

          }
        }

        if (
          !p.startsWith("@") &&
          (!resolvedTerm || !this.backgroundSchema.getEntity(resolvedTerm))
        ) {
          // No - make one
          //console.log ("Making a new prop", p)
          
          var id;
          if (!resolvedTerm) {
            id = `${this.ns}${p}`;
          } else {
            id = resolvedTerm;
          }
          const newProp = {
            "@id": id,
            "@type": "rdf:Property",
            name: p,
            "rdfs:label": p,
            "rdfs:comment": "...",
            rangeIncludes: [],
          };
          this.sossCrate.addEntity(newProp);
          extraContext[p] = newProp["@id"];
          this.sossCrate.addValues(
            this.sossCrate.rootDataset,
            "mentions",
            newProp
          );
          resolvedTerm = newProp["@id"];
          // TODO: Add to @context
          //console.log("Resolved:", t, resolvedTerm);
        }

        const propDef = this.sossCrate.getEntity(resolvedTerm);

        if (propDef) {
          if (!propTargets[resolvedTerm]) {
            propTargets[resolvedTerm] = {};
          }

          propDef.domainIncludes = union(
            propDef.domainIncludes,
            entity["@type"].map((t) => {
              const term = this.sossCrate.resolveTerm(t) || `${this.ns}${t}`;
              //if (term.startsWith("http://schema.org") && !this.sossCrate.getEntity(term)) {
              if (!this.sossCrate.getEntity(term)) {
                const newTerm = this.backgroundSchema.getEntity(term);
                if (newTerm) {
                  this.sossCrate.addEntity(newTerm);
                  if (this.config.addSuperClasses)
                    this.addSuperclasses(newTerm);
                }
              }
              return { "@id": term };
            })
          );
          this.sossCrate.utils.asArray(entity[p]).map((val) => {
            if (val["@type"]) {
              return val["@type"].map((t) => {
                //console.log("Adding range @type for", val["@type"], p)
                const term = this.sossCrate.resolveTerm(t) || `${this.ns}${t}`;
                propTargets[resolvedTerm][term] = true;
                if (
                  term.startsWith("http://schema.org") &&
                  !this.sossCrate.getEntity(term)
                ) {
                  //if (!this.sossCrate.getEntity(term)) {
                  const newTerm = this.backgroundSchema.getEntity(term);
                  this.sossCrate.addEntity(newTerm);
                }
              });
            }
          });

        }
      }
    }

    this.sossCrate.addContext(extraContext);

    for (let p of Object.keys(propTargets)) {
      const propDef = this.sossCrate.getEntity(p);
      propDef.rangeIncludes = Object.keys(propTargets[p]).map((term) => {
        return { "@id": term };
      });
    }
  }

  addSuperclasses(classs) {
    const c = this.sossCrate.getEntity(classs["@id"]);
    c.name = c.name || c["rdfs:label"];

    if (c["rdfs:subClassOf"] && isArray(c["rdfs:subClassOf"])) {
      c["rdfs:subClassOf"] = c["rdfs:subClassOf"].map((s) => {
        const superURL = s["@id"]; //.replace(/^schema:/, "http://schema.org/");
        if (!this.sossCrate.getEntity(superURL)) {
          const sc = this.backgroundSchema.getEntity(superURL);
          this.sossCrate.addEntity(sc);
          this.addSuperclasses(sc);
        }
        return { "@id": superURL };
      });
    }
    //console.log(c["rdfs:subClassOf"]);
  }
}

module.exports = { SOSS };
