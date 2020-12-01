Feature: Test Booking a haircut service feature

  Scenario: Test available haircut services
    Given I visit MyTime Consumers page
    Then I see title MyTime Consumer page
    When I type haircut in search text
    And I type Los Angeles, CA in search-location text
    And I click on "search-button" button by class
    Then I'm taken to the haircut search page
    Then I'm able to see multiple available haircut services
    
    #Check available slots and book first one
    When I click on the first available appointment
    Then I'm taken to the specific haircut service page
    When I click on the book button in service page
    Then I'm taken to the appointment page
    Then Minimum two appoitment slots displayed

    #Verifying the timeslot in checkout
    When I select anyone from the staff
    And select the first available slot
    Then verify the dates selected

