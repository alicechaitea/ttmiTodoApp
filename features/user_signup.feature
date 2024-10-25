Feature: User Sign-Up
    As a new user
    I want to sign up for an account
    So that I can access the application

    Scenario: Successful sign-up
        Given I am on the sign-up page
        When I enter a valid email address
        And I enter a valid password
        And I confirm the password
        And I click on the "Sign Up" button
        Then I should see a message "Sign up successful"
        And I should be redirected to the home page

    Scenario: Sign-up with an already registered email
        Given I am on the sign-up page
        When I enter an email address that is already registered
        And I enter a valid password
        And I confirm the password
        And I click on the "Sign Up" button
        Then I should see an error message "Email already in use"

    Scenario: Sign-up with invalid email format
        Given I am on the sign-up page
        When I enter an invalid email format
        And I enter a valid password
        And I confirm the password
        And I click on the "Sign Up" button
        Then I should see an error message "Please enter a valid email address"

    Scenario: Password and confirm password do not match
        Given I am on the sign-up page
        When I enter a valid email address
        And I enter a password
        And I confirm a different password
        And I click on the "Sign Up" button
        Then I should see an error message "Passwords do not match"

Additional Test Cases:

    Scenario: Sign up with a duplicate email
        Given I am on the sign-up page
        And an account with the email "duplicate@example.com" already exists
        When I attempt to sign up with the email "duplicate@example.com" and a unique username
        Then I should see an error message saying "Email already exists"
        And the sign-up should be prevented

    Scenario: Sign up with a duplicate username
        Given I am on the sign-up page
        And an account with the username "existingUser" already exists
        When I attempt to sign up with the username "existingUser" and a unique email
        Then I should see an error message saying "Username already exists"
        And the sign-up should be prevented

    Scenario: Test functionality of "Show/Hide Password" toggle button on the sign-up page
        Given I am on the sign-up page
        When I enter a password and click the "Show Password" button
        Then the password should become visible in plain text
        When I click the "Hide Password" button
        Then the password should be hidden as dots or asterisks

    Scenario: Check "Already signed up? Go to login" link redirects to the login page
        Given I am on the sign-up page
        When I click on the link "Already signed up? Go to login"
        Then I should be redirected to the login page

    Scenario: Sign up with mismatched passwords
        Given I am on the sign-up page
        When I enter a password in the "Password" field
        And I enter a different password in the "Confirm Password" field
        And I submit the form
        Then I should see an error message saying "Passwords do not match"
        And the sign-up should be prevented

    Scenario: Sign up with a password in foreign languages
        Given I am on the sign-up page
        When I enter a password containing foreign language characters (e.g., "パスワード123" or "密碼测试")
        And I submit the form
        Then the form should accept the password if foreign characters are allowed
        Or I should see an error message if foreign characters are not allowed
