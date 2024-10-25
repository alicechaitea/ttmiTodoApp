import { test, expect } from '@playwright/test';
import axios from 'axios';

let uniqueUsername: string;
let password = 'password123';
let email: string;
let accessToken: string;

test.describe.serial('User Sign-Up, Login, and Delete API Test with Basic Authentication', () => {
  
  test('Sign up a new user, log in to retrieve token, and delete account', async () => {
    const signupEndpoint = 'http://localhost:8000/api/v1/accounts/signup';
    const loginEndpoint = 'http://localhost:8000/api/v1/accounts/login';
    const deleteEndpoint = 'http://localhost:8000/api/v1/accounts/delete';

    // Generate unique username and email for the test
    uniqueUsername = `newUser_${Date.now()}`;
    email = `${uniqueUsername}@example.com`;

    const signupData = {
      username: uniqueUsername,
      password: password,
      email: email
    };

    // Step 1: Sign up the user
    try {
      const signupResponse = await axios.post(
        signupEndpoint,
        signupData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Sign-Up Response Data:", signupResponse.data);

      expect(signupResponse.status).toBe(200);
      expect(signupResponse.data).toMatchObject({
        Success: 'User created successfully',
        data: {
          access_token: expect.any(String),
          refresh_token: expect.any(String),
        }
      });

    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error during sign-up:", error.response.data);
        if (error.response.data.error === 'Username already exists') {
          console.error("Skipping account deletion since user already exists.");
          return;
        }
      } else {
        console.error("Error during sign-up:", error.message);
      }
      throw new Error("Sign-up failed. Please check the sign-up endpoint and response structure.");
    }

    // Step 2: Log in to retrieve token
    const authHeader = `Basic ${Buffer.from(`${uniqueUsername}:${password}`).toString('base64')}`;
    try {
      const loginResponse = await axios.post(
        loginEndpoint,
        { username: uniqueUsername, password: password },
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Login Response Data:", loginResponse.data);

      // Extract the access token from login response
      accessToken = loginResponse.data.data.access_token;
      expect(accessToken).toBeDefined();
      console.log("Token retrieved successfully:", accessToken);

    } catch (error) {
      console.error("Error during login:", error.message);
      throw new Error("Login failed. Please check the login endpoint and response structure.");
    }

    // Step 3: Delete the user account
    try {
      const deleteResponse = await axios.delete(deleteEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("Account Deletion Response Data:", deleteResponse.data);

      // Check for successful deletion with updated response structure
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.data).toMatchObject({
        success: 'User deleted successfully',  // Updated to match actual response
      });

    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error during account deletion:", error.response.data);
      } else {
        console.error("Error during account deletion:", error.message);
      }
      throw new Error("Account deletion failed. Please check the delete endpoint and response structure.");
    }
  });
});
