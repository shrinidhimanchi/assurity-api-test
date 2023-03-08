const statusCode = require('http-status-codes')
const expect = require('chai').expect

class parseResponse {
    constructor(attach, log, parameters){
        this.attach = attach,
        this.log = log
        this.parameters = parameters
    }

    async validateHttpStatusCode(responseStatusCode, statusTextSupplied){
        const statusRetrieved = await statusCode[JSON.parse(statusTextSupplied).toUpperCase().replace(' ', '_')]
        this.attach('Status Retrieved is : '+statusRetrieved)
        expect(responseStatusCode).to.equal(statusRetrieved)
    }

    validateAttributeValueBasedOnAttributeName(apiResponse, attributeName, attributeValue){
        console.log(`Onto Method :: validateAttributeValueBasedOnAttributeName`)
        console.log(`API Response Object Is : ${JSON.stringify(apiResponse)}`)
        console.log(`Attribute Name Retrieved Is : ${attributeName}`)
        console.log(`Attribute Value Retrieved Is : ${attributeValue}`)
        // console.log(`Attribute Value Retrieved Is : ${typeof(attributeValue)}`)
        console.log(`Attribute Value Retrieved From ApiResponse Is : ${apiResponse[attributeName]}`)
        // console.log(`Attribute Value Retrieved From ApiResponse Is : ${typeof(apiResponse[attributeName])}`)
        expect(apiResponse[attributeName]).to.equal(attributeValue)
        return apiResponse[attributeName]
    }

    getListOfPromotionsArray(apiResponse){
        console.log(`Onto method :: getListOfPromotionsObject`)
        console.log(`API Response Object Is : ${JSON.stringify(apiResponse)}`)
        return apiResponse.Promotions
    }

    getPromotionsObjectBasedOnAttributeKeyName(apiResponse, attributeKeyName1, attributeKeyValue1, attributeKeyName2, attributeKeyValue2){
        console.log(`Onto method :: getPromotionsObjectBasedOnAttributeKeyName`)
        let promotionsList = this.getListOfPromotionsArray(apiResponse)
        console.log(`Length Of Promotions List Array Is : ${Object.keys(promotionsList).length}`)
        for(let i=0; i < Object.keys(promotionsList).length; i++){
            let attributeKeyValue = promotionsList[i][`${attributeKeyName1}`]
            console.log('Attribute Value is : '+attributeKeyValue)
            if(attributeKeyValue1 == attributeKeyValue){
                console.log('Value of Description is : '+promotionsList[i][`${attributeKeyName2}`])
                expect(promotionsList[i][`${attributeKeyName2}`]).to.equal(attributeKeyValue2)
                return promotionsList[i][`${attributeKeyName2}`]
            }
        }
    }
}
module.exports = parseResponse;