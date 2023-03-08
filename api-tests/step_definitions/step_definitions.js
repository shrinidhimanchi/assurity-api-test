var { Given, When, Then } = require('@cucumber/cucumber')
const expect = require('chai').expect

Given(/^the mandatory request headers are set$/, function(){
    let headers = this.dataStore.retrieveRequestHeaders(this.getScenarioName())
    return headers
})

Given(/^the mandatory request queryParams are set$/, function(){
    let queryParams = this.dataStore.retrieveRequestQueryParams(this.getScenarioName())
    return queryParams
})

When(/^I send GET Request with URI (.*)$/, function(uri){
    uri = JSON.parse(uri)
    return this.sendRequest(uri, 'GET')
})

Then(/^response body should have (.*)$/, function(expression){
    let response = JSON.stringify(this.getResponseData())
    this.attach('Response returned from server is : '+JSON.stringify(response))
    expect(response).to.include(expression)
})

Then(/^http status returned from the server should be (.*)$/, function(statusText){
    this.attach('Response returned from server is : '+JSON.stringify(this.getResponseData()))
    return this.parseResponse.validateHttpStatusCode(this.getResponseStatusCode(), statusText)
})

Then(/^I Validate JSON Schema$/, function(){
    this.attach('Response returned from server is : '+JSON.stringify(this.getResponseData()))
    return this.jsonSchemaValidation.validateJsonSchema(this.getResponseData())
})

Then(/^Validate Attribute Name (.*) Should Have Value (.*)$/, function(attributeName, attributeValue){
    attributeName = attributeName.replace(/"/g, "")
    if( attributeValue.toLowerCase() === 'true' || attributeValue.toLowerCase() === 'false'){
        console.log(`AttributeValue retrieved from step-def is : ${attributeValue}`)
        // console.log(`Boolean Value returned is : ${Boolean(attributeValue)}`)
        attributeValue = (attributeValue === 'true')
    } else {
        attributeName = attributeName.replace(/"/g, "")
        attributeValue = attributeValue.replace(/"/g, "")    
    }
    this.attach('Response returned from server is : '+JSON.stringify(this.getResponseData()))
    console.log(`Promotions Length is : ${this.parseResponse.getPromotionsObjectBasedOnAttributeKeyName(this.getResponseData(), 'Name', 'Gallery')}`)
    return this.parseResponse.validateAttributeValueBasedOnAttributeName(this.getResponseData(), attributeName, attributeValue)
})

Then(/^Validate Promotions Object Having Attribute (.*) And Value (.*) Should Have Attribute (.*) Containing Text (.*)$/, function(attributeKeyName1, attributeKeyValue1, attributeKeyName2, attributeKeyValue2){
    attributeKeyName1 = attributeKeyName1.replace(/"/g, "")
    attributeKeyValue1 = attributeKeyValue1.replace(/"/g, "")
    attributeKeyName2 = attributeKeyName2.replace(/"/g, "")
    attributeKeyValue2 = attributeKeyValue2.replace(/"/g, "")
    this.attach('Response returned from server is : '+JSON.stringify(this.getResponseData()))
    return this.parseResponse.getPromotionsObjectBasedOnAttributeKeyName(this.getResponseData(), attributeKeyName1, attributeKeyValue1, attributeKeyName2, attributeKeyValue2)
})
