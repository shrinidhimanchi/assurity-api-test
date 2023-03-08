@assureTest
Feature: Test Assurity End-Point

    Background: Set Mandatory Headers & Parameters
        Given the mandatory request headers are set
        And the mandatory request queryParams are set

    Scenario: Assurity Test - Validate Attribute Name Should Have Value Carbon credits
        When I send GET Request with URI "6327/Details.json"
        Then http status returned from the server should be "OK"
        Then I Validate JSON Schema
        And Validate Attribute Name "Name" Should Have Value "Carbon credits"
        Then response body should have "CategoryId"
        And response body should have "Name"
        And response body should have "Path"
        And response body should have "Promotions"

    Scenario: Assurity Test - Validate Attribute CanRelist Should Have Value true
        When I send GET Request with URI "6327/Details.json"
        Then http status returned from the server should be "OK"
        Then I Validate JSON Schema
        And Validate Attribute Name "CanRelist" Should Have Value true
        Then response body should have "CategoryId"
        And response body should have "Name"
        And response body should have "Path"
        And response body should have "Promotions"

    Scenario: Assurity Test - Validate Promotions Object Should Have Appropriate Description
        When I send GET Request with URI "6327/Details.json"
        Then http status returned from the server should be "OK"
        Then I Validate JSON Schema
        Then Validate Promotions Object Having Attribute "Name" And Value "Gallery" Should Have Attribute "Description" Containing Text "Good position in category"
        Then response body should have "CategoryId"
        And response body should have "Name"
        And response body should have "Path"
        And response body should have "Promotions"
