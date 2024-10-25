Feature: User Log-In
    As a registered user
    I want to Log in to my account
    So that I can access the application

    Scenario: Successful log-in
        Given I am on the log-in page
        When I enter a valid email address
        And I enter the correct password
        And I click on the "Log in" button
        Then I should be redirected to the home page

    Scenario: log-in with an incorrect password
        Given I am on the log-in page
        When I enter a valid email address
        And I enter an incorrect password
        And I click on the "Log in" button
        Then I should see an error message "Invalid password"

    Scenario: log-in with a non-registered email
        Given I am on the log-in page
        When I enter a non-registered email address
        And I enter a password
        And I click on the "Log in" button
        Then I should see an error message "Email not found"

    Scenario: log-in with an empty email field
        Given I am on the log-in page
        When I leave the email field empty
        And I enter a password
        And I click on the "Log in" button
        Then I should see an error message "Email is required"

    Scenario: log-in with an empty password field
        Given I am on the log-in page
        When I enter a valid email address
        And I leave the password field empty
        And I click on the "Log in" button
        Then I should see an error message "Password is required"

Additional Test Cases:

    Scenario: Attempt to log in with a deleted account
        Given I have a previously created account that has been deleted
        When I attempt to log in with the deleted account's credentials
        Then I should see an error message saying "Account does not exist" or "Invalid credentials"
        And I should not be granted access to the application

    Scenario: Check functionality of "Show/Hide Password" button on login page
        Given I am on the login page
        When I click on the "Show Password" button
        Then the password should be visible in plain text
        When I click on the "Hide Password" button
        Then the password should be hidden as dots or asterisks

    Scenario: Check visibility toggle for sensitive fields in the to-do list
        Given I have a task in the to-do list with a description or notes field marked as sensitive
        When I click the "Show" button next to the sensitive field
        Then the field should become visible in plain text
        When I click the "Hide" button next to the sensitive field
        Then the field should be hidden or obscured again

    Scenario: Check visibility toggle persists state between tasks
        Given I have multiple tasks with sensitive fields in the to-do list
        When I set the first task's sensitive field to visible
        And I set the second task's sensitive field to hidden
        Then the visibility state of each task's field should be independent of each other
