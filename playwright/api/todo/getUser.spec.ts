import { test, expect } from '@playwright/test';
import axios from 'axios';

let token: string;

test.describe.serial('User Profile API Test', () => {
  
  test('Login and retrieve token', async () => {
    const loginEndpoint = 'http://localhost:8000/api/v1/accounts/login';

    const username = 'admin';
    const password = 'test1234';

    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

    try {
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
    } catch (error) {
      console.error("Error during login:", error.message);
      throw new Error("Login failed. Please check the login endpoint and response structure.");
    }
  });

  test('Basic check for user profile response', async () => {
    const profileEndpoint = 'http://localhost:8000/api/v1/profile/user';

    try {
      const profileResponse = await axios.get(profileEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Log the response status and data to inspect if anything is returned
      console.log("Profile Response Status:", profileResponse.status);
      console.log("User Profile Response Data:", profileResponse.data);

      // Check if the response status is 200
      expect(profileResponse.status).toBe(200);

      // Optional: You may add specific checks for properties if the response succeeds
      // expect(profileResponse.data).toMatchObject({
      //   id: expect.any(Number),
      //   username: expect.any(String),
      //   email: expect.any(String),
      // });

    } catch (error) {
      // Enhanced error logging
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        console.error("Status code:", error.response.status);
      } else {
        console.error("Error fetching user profile:", error.message);
      }
      throw new Error("Failed to fetch user profile. Check backend logs and configurations.");
    }
  });
});
