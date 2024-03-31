'use strict';

async function getStuff() {
  try {
    const response = await fetch('https://reqres.in/api/users/1');
    const data = await response.json();
    console.log(response);
    console.log('data:', data);
  } catch (error) {
    console.log(error);
  }
}

getStuff();
