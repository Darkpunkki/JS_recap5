'use strict';

async function postStuff() {
  try {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'morpheus',
        job: 'leader',
      }),
    });
    const data = await response.json();
    console.log(response);
    console.log('data:', data);
  } catch (error) {
    console.log(error);
  }
}

postStuff();
