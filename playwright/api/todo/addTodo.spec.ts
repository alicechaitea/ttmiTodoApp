import { test, expect } from '@playwright/test';
import axios from 'axios';

let token: string;

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

  test('Add a new to-do item using token', async () => {
    const addTodoEndpoint = 'http://localhost:8000/api/v1/todos/';

    const newTodo = {
      title: 'New Task',
      description: 'This is a new task to complete.',
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

    // Verify the response structure and status
    expect(addTodoResponse.status).toBe(201);
    expect(addTodoResponse.data).toMatchObject({
      title: 'New Task',
      description: 'This is a new task to complete.',
      completed: false
    });
  });
});
