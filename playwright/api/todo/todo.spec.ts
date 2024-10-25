import { test, expect } from '@playwright/test';
import axios from 'axios';

let token: string;

test.describe.serial('Login API Test with Basic Authentication', () => {
  
  test('Login and retrieve token', async () => {
    // Replace with the actual login endpoint
    const loginEndpoint = 'http://localhost:8000/api/v1/accounts/login'; 

    // Define credentials
    const username = 'admin';
    const password = 'test1234';

    // Encode the credentials in Base64 for Basic Authentication
    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

    try {
      const loginResponse = await axios.post(
        loginEndpoint,
        { username, password }, // Include username and password in the body
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json'
          }
        }
      );

      // Log the response to inspect the structure
      console.log("Login Response Data:", loginResponse.data);

      // Extract the access token from the response
      token = loginResponse.data.data.access_token;

      // Verify the login was successful and the token was received
      expect(loginResponse.status).toBe(200);
      expect(token).toBeDefined();

      console.log("Token retrieved successfully:", token);

    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Login failed. Please check the login endpoint and response structure.");
    }
  });
});
