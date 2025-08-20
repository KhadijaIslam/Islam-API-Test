/**
 * Disney API Test Suite
 * This script contains tests to verify the functionality of the Disney API's characters endpoint.
 * It checks for :
 * 1. The API call is successful (HTTP status code 200).
 * 2. The data returned is in the correct format (an array of characters).
 * 3. Checks that each character object in the response has a 'name' property.
 * 3. Checks 'Mickey Mouse' character exists.
 * 4. Checks that the pagination works as expected.
 */

// The base URL for the API endpoint.
const API_URL = "https://api.disneyapi.dev/characters";

/**
 * Main function to run all the tests.
 */
async function runTests() {
  console.log("--- Running Disney API Tests ---");
  try {
    // Test 1: Check for a successful HTTP status code (200).
    await testStatusCode();

    // Test 2: Check that the response contains character data.
    await testDataStructure();

    // Test 3: Check that each character object has a 'name' property.
    await testCharactersHaveNames();

    // Test 4: Check if a specific character exists using a query parameter.
    await testSpecificCharacterExists();

    // Test 5: Verify pagination is working correctly.
    await testPagination();

    console.log("\nAll tests completed successfully");
  } catch (error) {
    console.error("\nTests failed!", error.message);
  }
}

/**
 * Test to verify that the API returns a successful status code.
 */
async function testStatusCode() {
  try {
    const response = await fetch(API_URL);
    if (response.status === 200) {
      console.log("Test 1: Status code is 200");
    } else {
      throw new Error(`Expected status code 200, but got ${response.status} ❌`);
    }
  } catch (error) {
    console.error("Test 1: FAILED", error.message);
    throw error;
  }
}

/**
 * Test to verify the structure of the returned data.
 */
async function testDataStructure() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.data && Array.isArray(data.data)) {
      console.log("Test 2: Response 'data' property is an array");

      if (data.data.length > 0) {
        console.log("Test 2: Data array is not empty");
      } else {
        throw new Error("Data array is empty.");
      }
    } else {
      throw new Error("Response body does not have a valid 'data' array.");
    }
  } catch (error) {
    console.error("Test 2: FAILED", error.message);
    throw error;
  }
}

/**
 * Test to check that each character object in the response has a 'name' property.
 */
async function testCharactersHaveNames() {
  try {
    const response = await fetch(API_URL);
    const { data } = await response.json();

    const allHaveNames = data.every(character => character.name);
    if (allHaveNames) {
      console.log("Test 3: All characters have a 'name' property");
    } else {
      throw new Error("Some characters are missing a 'name' property.");
    }
  } catch (error) {
    console.error("Test 3: FAILED", error.message);
    throw error;
  }
}

/**
 * Test to check 'Mickey Mouse' character exists.
 */
async function testSpecificCharacterExists() {
  const specificCharacterUrl = `${API_URL}?name=Mickey Mouse`;
  try {
    const response = await fetch(specificCharacterUrl);
    const { data } = await response.json();

    if (data.some(character => character.name === "Mickey Mouse")) {
      console.log("Test 4: 'Mickey Mouse' character found.");
    } else {
      throw new Error("'Mickey Mouse' character not found.");
    }
  } catch (error) {
    console.error("Test 4: FAILED.", error.message);
    throw error;
  }
}

/**
 * Test to verify that the pagination works as expected.
 */
async function testPagination() {
  try {
    const response = await fetch(API_URL);
    const { data, count, totalPages, nextPage, previousPage } = await response.json();
    // Check if the response contains pagination information.
    const defaultPageSize = 50;
    if (data.length === defaultPageSize) {
      console.log(`Test 5: Pagination returns the correct number of items per page (${defaultPageSize}).`);
    } else {
      throw new Error(`Expected ${defaultPageSize} items per page, but got ${data.length}`);
    }

  } catch (error) {
    console.error("Test 5: FAILED.", error.message);
    throw error;
  }
}

runTests();
