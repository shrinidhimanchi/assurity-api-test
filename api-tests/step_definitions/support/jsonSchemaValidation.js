const validator = require('jsonschema').Validator
const jsonSchemaValidator = new validator()
const expect = require('chai').expect

class jsonSchemaValidation {

    constructor(attach, log, parameters){
        this.attach = attach,
        this.log = log
        this.parameters = parameters
        this.jsonSchemaInput = require(__dirname + '/../../requests/json-schema/jsonSchema.json')
    }

    validateJsonSchema(apiResponse){
        console.log(`Onto Method :: validateJsonSchema`)
        console.log(`JSON Schema Input Is :  ${JSON.stringify(this.jsonSchemaInput)}`)
        const validateOutputObject = jsonSchemaValidator.validate(apiResponse, this.jsonSchemaInput)
        console.log(`Output Returned Is : ${JSON.stringify(validateOutputObject)}`)
        expect(validateOutputObject.valid).to.equal(true)
    }
}
module.exports = jsonSchemaValidation
