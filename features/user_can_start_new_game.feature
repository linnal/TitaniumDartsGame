Feature: A user can start a new game

  Scenario: As a user I can start a new game
    When I press "New"
    Then I see "Who is playing?"
    Then I enter text "Christian" into field with id "NoResourceEntry-25"
    When I press "NoResourceEntry-26"
    Then I see "Christian"
    When I press "Christian"
    When I press "Next"
    Then I see "How many rounds?"
    When I press "Start"
    Then I see "Round 1"
    Then I press "NoResourceEntry-67"
    Then I press "NoResourceEntry-67"
    Then I press "NoResourceEntry-67"
    Then I press "Finish"
    Then I see "Christian"
    Then I see "15"
