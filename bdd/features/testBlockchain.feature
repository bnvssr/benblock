@TrustedTradeTestBlockchain
Feature: init Blockchain
As a ...
I want to ...
So that ...

Background: the Trusted Trade speeltuin is open
Given I am at Trusted Trade

@init
Scenario: initialize the Trusted Trade Blockchain
  When I initialize the Trusted Trade speeltuin Blockchain
  Then there is only the Genesis block
    And there are no pending transactions
