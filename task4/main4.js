'use strict';

async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error.message);
  }
}

async function test() {
  try {
    const user = {
      name: 'John Doe',
      job: 'Developer',
    };
    const url = 'https://reqres.in/api/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    const userData = await fetchData(url, options);
    console.log(userData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

test();
