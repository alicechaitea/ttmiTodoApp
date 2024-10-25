import { test, expect } from '@playwright/test';
import axios from 'axios';

let token: string;
let todoId: number; // To store the ID of the to-do item to delete

test.describe.serial('To-Do List API Automation Tests', () => {
  
  test('Login and retrieve token', async () => {
    const loginEndpoint = 'http://localhost:8000/api/v1/accounts/login'; 

    const username = 'admin';
    const password = 'test1234';

    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

    const loginResponse = await axios.post(
      loginEndpoint,
      { username, password },
      {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("Login Response Data:", loginResponse.data);

    token = loginResponse.data.data.access_token;

    expect(loginResponse.status).toBe(200);
    expect(token).toBeDefined();

    console.log("Token retrieved successfully:", token);
  });

  test('Add a new to-do item to get an ID', async () => {
    const addTodoEndpoint = 'http://localhost:8000/api/v1/todos/';

    const newTodo = {
      title: 'Task to Delete',
      description: 'This task will be deleted.',
      completed: false
    };

    const addTodoResponse = await axios.post(
      addTodoEndpoint,
      newTodo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("Add To-Do Response Data:", addTodoResponse.data);

    // Extract the ID of the new to-do item for deletion
    todoId = addTodoResponse.data.id;

    expect(addTodoResponse.status).toBe(201);
    expect(todoId).toBeDefined();
  });

  test('Delete the to-do item by ID', async () => {
    // Make sure `todoId` has been set
    expect(todoId).toBeDefined();

    const deleteTodoEndpoint = `http://localhost:8000/api/v1/todos/${todoId}/`;

    const deleteTodoResponse = await axios.delete(deleteTodoEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Delete To-Do Response Status:", deleteTodoResponse.status);

    // Verify that the deletion was successful
    expect(deleteTodoResponse.status).toBe(204); // 204 No Content typically indicates successful deletion
  });
});
