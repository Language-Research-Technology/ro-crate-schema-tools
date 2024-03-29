/**
 * Class for generating RO-Crate editor profiles from sample files or Schema.org Style Schemas
 */
class ModeGenerator {
  /**
   * Create a new SOSS object from an existing crate or an empty crate
   * @param {object} An RO-Crate editor mode (JSON)
   * @param {ROCrate} An RO-Crate with the Schema that this Profile needs to reflect
   * @param {array} An array of conformsTo URL strings
   * @param {object} [options] configuration object
   * @param {boolean} [options.defaultText] - add Text as an option for all Classes
   */

  constructor(vocabCrate, options) {
    this.mode = options.mode || {
      metadata: {
        name: options.name,
        description: options.description,
        version: 0,
        license: "GPLv3.0",
        author: "University of Queensland",
      },
      "rootDataEntity": [{
          "type": [
            "Dataset"
          ],
          "conformsToUri": [],
          "description": ""
        }
      ],
      classes: {},
    };
    this.vocabCrate = vocabCrate;
    this.options = options;
    // TODO: Add rootDataEntities
    // for (let rde of [].concat(options?.rootDataEntities)) {
    // }
    for (let entity of this.vocabCrate["@graph"]) {
      if (entity["@type"].includes("rdfs:Class")) {
        const className =
          entity["rdfs:label"][0]?.["@value"]?.[0] || entity["rdfs:label"][0];

        if (!this.mode.classes[className]) {
          this.mode.classes[className] = {
            hasSubclass: this.getSubClasses(entity),
            inputs: [],
          };
        }

        var inputs = this.mode.classes[className].inputs;

        this.getInputs(this.vocabCrate, entity, inputs);
        //this.mode.classes[className].inputs = newInputs.flat();
      }
    }
  }

  getInputs(vocabCrate, entity, inputs) {
    for (let prop of entity["@reverse"]?.["domainIncludes"] ||
      entity["@reverse"]?.["schema:domainIncludes"] ||
      []) {
      // Hack --

      if (prop["rdfs:label"]) {
        // If we already have this input then just keep it
        var propName =
          prop["rdfs:label"][0]?.["@value"]?.[0] || prop["rdfs:label"][0];

        var input = inputs.find((x) => x.id === prop["@id"]);
        if (!input) {
          input = {
            id: prop["@id"],
            name: propName,
            help:
              prop?.["rdfs:comment"]?.[0]?.["@value"]?.[0] ||
              prop?.["rdfs:comment"]?.[0] ||
              "UNDOCUMENTED",
            multiple: true,
            type: [],
          };
          inputs.push(input);
        }

        if (prop.definedTermSet) {
          input.type = ["SelectObject"];
          input.values = prop.definedTermSet
            .map((dts) => {
              return dts.hasDefinedTerm?.map((dt) => {
                return dt;
              });
            })
            .flat();
        } else if (prop.rangeIncludes) {
          for (let i of prop.rangeIncludes) {
            const label =
              i["rdfs:label"]?.[0]?.["@value"]?.[0] || i["rdfs:label"]?.[0];
            if (!label) {
              console.log("No label for", i);
            } else if (!input.type.includes(label)) {
              input.type.push(label);
            }
          }
        }
        if (input.type.length === 0) input.type = ["Text"];
        if (this.options.defaultText && !input.type.includes("Text")) {
          input.type.push("Text");
        }
      }

    }
    for (let c of entity?.["rdfs:subClassOf"] || []) {
      this.getInputs(vocabCrate, c, inputs);
    }
    return inputs.flat();
  }

  getSubClasses(entity, alreadyGot) {
    if (!alreadyGot) {
      alreadyGot = [];
    }
    for (let sub of entity?.["@reverse"]?.["rdfs:subClassOf"] || []) {
      var className = sub["rdfs:label"][0]?.["@value"] || sub["rdfs:label"][0];
      // Hack: some things are coming out as arrays --- this is weird TODO get to the bottom of
      if (Array.isArray(className)) {
        className = className[0];
      }
      if (!alreadyGot.includes(className)) {
        alreadyGot.push(className);
        this.getSubClasses(sub, alreadyGot);
      }
    }
    return alreadyGot;
  }
}

module.exports = { ModeGenerator };
