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

    // Extract the access token from the response
    token = loginResponse.data.data.access_token;

    expect(loginResponse.status).toBe(200);
    expect(token).toBeDefined();

    console.log("Token retrieved successfully:", token);
  });

  test('Fetch to-do list using token', async () => {
    const todosEndpoint = 'http://localhost:8000/api/v1/todos/';

    const todosResponse = await axios.get(todosEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("To-Do List Response Data:", todosResponse.data);

    // Verify the response structure
    expect(todosResponse.status).toBe(200);
    expect(Array.isArray(todosResponse.data)).toBe(true);
    if (todosResponse.data.length > 0) {
      expect(todosResponse.data[0]).toMatchObject({
        id: expect.any(Number),
        created_by: {
          id: expect.any(Number),
          username: expect.any(String)
        },
        updated_by: {
          id: expect.any(Number),
          username: expect.any(String)
        },
        title: expect.any(String),
        description: expect.any(String),
        completed: expect.any(Boolean),
        created_at: expect.any(String),
        updated_at: expect.any(String)
      });
    }
  });
});
