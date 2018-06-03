  @createtestchain
  Feature: create basic Blockchain with 3 blocks
  
  Scenario: create a Trusted Trade Blockchain
  Given I am at Trusted Trade
  When I initialize the Trusted Trade speeltuin Blockchain
  When transfering
     | from | amount | to   |
     | Joop | 25     | Kees |
     | Ans  | 30     | Jan  |
     | Ans  | 20     | Kees |
     
  When Joop mines a block
  
  When transfering
     | from | amount | to   |
     | Joop | 25     | Jaap |
     | Kees | 15     | Jaap |
     | Jan  | 30     | Jan  |
     | Jaap | 20     | Kees |
     
  When Kees mines a block
  
  When transfering
     | from | amount | to   |
     | Jaap | 25     | Kees |
     | Joop | 15     | Ans  |
     
  When I show the current chain
  Then I want to leave the browser open
  
