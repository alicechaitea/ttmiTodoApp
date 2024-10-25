Scenario: Bulk delete tasks from the to-do list
    Given I have multiple tasks in the to-do list
    When I select multiple tasks and choose "Delete"
    Then I should no longer see those selected tasks in the to-do list
    And I should see a message confirming that the tasks have been deleted

Scenario: Display a notification for task completion
    Given I have a task "my task 1" in the to-do list
    When I mark "my task 1" as completed
    Then I should see a notification saying "Task 'my task 1' marked as completed"

Scenario: Search for a task by title
    Given I have a task "grocery shopping" and a task "homework" in the to-do list
    When I search for the term "grocery"
    Then I should only see the task "grocery shopping" in the search results

Scenario: Sort tasks alphabetically by title
    Given I have multiple tasks with different titles in the to-do list
    When I choose to sort the tasks by title
    Then the tasks should be displayed in alphabetical order

Scenario: Clear completed tasks
    Given I have completed and uncompleted tasks in the to-do list
    When I choose to clear all completed tasks
    Then I should only see uncompleted tasks in the to-do list

Scenario: Toggle task priority status
    Given I have a task "important task" in the to-do list
    When I mark "important task" as high priority
    Then I should see the task "important task" labeled with a priority indicator

Scenario: Receive a confirmation dialog before deleting a task
    Given I have a task "my task 1" in the to-do list
    When I choose to delete "my task 1"
    Then I should see a confirmation dialog asking "Are you sure you want to delete this task?"
    And if I confirm, "my task 1" should be deleted from the to-do list

Scenario: Display task details in a modal
    Given I have a task "my task 1" with details in the to-do list
    When I click on "my task 1"
    Then I should see a modal displaying the title, description, and other details of "my task 1"

Scenario: Set a due date for a task
    Given I am creating a new task
    When I set a due date of "2023-12-31" for the task
    Then I should see the task in the to-do list with a due date of "2023-12-31"

Scenario: Highlight overdue tasks
    Given I have a task "overdue task" with a past due date
    When I view the to-do list
    Then I should see "overdue task" highlighted as overdue

Scenario: Reorder tasks by dragging and dropping
    Given I have multiple tasks in the to-do list
    When I drag a task to a new position in the list
    Then I should see the task moved to that position

Scenario: Set a reminder for a task
    Given I am creating a new task
    When I set a reminder for the task to be notified at "9:00 AM tomorrow"
    Then I should receive a notification at "9:00 AM tomorrow" for the task

Scenario: Edit a task's description only
    Given I have a task "my task 1" in the to-do list with an existing description
    When I edit only the description of "my task 1" to say "updated description"
    Then I should see "my task 1" with the updated description in the to-do list

Scenario: Show a countdown to task due dates
    Given I have a task "due soon" with a due date of "tomorrow"
    When I view the to-do list
    Then I should see a countdown indicating "1 day left" for "due soon"
