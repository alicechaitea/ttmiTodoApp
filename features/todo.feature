    Feature: To-Do List Management
        As a user, I want to manage my to-do list so that I can keep track of my tasks.

        Scenario: Add a new task to the to-do list
            Given I am on the home page
            When I add a new task with the my title
            Then I should see the task in the to-do list

        Scenario: Mark a task as completed
            Given I have a task "my task 1" in the to-do list
            When I mark the task "my task 1" as completed
            Then the status of the task "my task 1" should be "Completed"

        Scenario: Delete a task from the to-do list
            Given I have a task "my task 1" in the to-do list
            When I delete the task "my task 1"
            Then I should not see the task "my task 1" in the to-do list

        Scenario: Prevent adding a task without a title
            Given I am on the home page
            When I try to add a task without a title
            Then I should see an error message

Additional Test Cases:

        Scenario: Delete the entire to-do list
            Given I have multiple tasks in the to-do list
            When I delete the entire to-do list
            Then I should see a message saying "All tasks deleted"
            And I should see an empty to-do list

        Scenario: Save the to-do list after making changes
            Given I have a modified task in the to-do list
            When I save the to-do list
            Then I should see a confirmation message saying "To-do list saved successfully"
            And I should see the changes in the to-do list

        Scenario: Add a new task with a blank description
            Given I am on the home page
            When I add a new task with the title "Task without description" and leave the description blank
            Then I should see the task "Task without description" in the to-do list
            And the description should be displayed as empty or "No description"

        Scenario: Handle unsaved changes when navigating away
            Given I have made unsaved changes to a task in the to-do list
            When I click on the to-do list icon on the left menu
            Then I should see a dialog with the message "Unsaved changes"
            And the dialog should contain options for "Cancel" and "Leave"

        Scenario: Confirm navigating away with unsaved changes
            Given I see the "Unsaved changes" dialog
            When I click "Leave"
            Then I should be navigated away from the to-do list
            And my changes should not be saved

        Scenario: Cancel navigating away with unsaved changes
            Given I see the "Unsaved changes" dialog
            When I click "Cancel"
            Then I should remain on the to-do list page
            And my changes should be preserved