Feature: Loading the app
  As a user loading the app 
  I want to check the different usecases

  Scenario: Loading the app for the first time
    Given the app has loaded
    Given I am on the home page
    Then I should see a "h1" containing "Chattee! Chat happy!"
    And I should see a "RaisedButton" containing "with google!"