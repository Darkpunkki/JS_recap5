'use strict';

async function getStuff() {
  try {
    const response = await fetch('https://reqres.in/api/unknown/2332');
    const data = await response.json();
    console.log('get response', response);
    console.log('data:', data);
    if (response.status < 200 || response.status >= 300) {
      console.log('Not found');
    }
  } catch (error) {
    console.log('Error', error);
  }
}

async function postStuff() {
  try {
    const response = await fetch('https://reqres.in/api/unknown/2332', {
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
    console.log('post response', response);
    console.log('data:', data);
  } catch (error) {
    console.log('error:', error);
  }
}

//getStuff();
postStuff();
