const apiUrl = 'https://10.120.32.94/restaurant/api/v1/restaurants';

// A utility function to fetch data from the API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Function to create a table row
function createTableRow(restaurant) {
  return `<tr>
            <td>${restaurant.name}</td>
            <td>${restaurant.city}</td>
          </tr>`;
}

// Function to display restaurants
async function fetchAndDisplayRestaurants() {
  const restaurants = await fetchData(apiUrl);
  if (!restaurants) return;

  const tableNode = document.getElementById('table');
  tableNode.innerHTML = restaurants.map(createTableRow).join('');

  // Use delegation for row clicks but ensure correct row identification
  document.querySelectorAll('#table tr').forEach((row, index) => {
    row.addEventListener('click', (event) => {
      // Clear existing highlights
      document.querySelectorAll('#table tr').forEach((tr) => {
        tr.classList.remove('highlight');
      });

      // Highlight the clicked row
      event.currentTarget.classList.add('highlight');

      const restaurant = restaurants[index];
      highlightAndShowDetails(restaurant);
    });
  });
}

function showModal(visible = true) {
  const modalContainer = document.getElementById('customModal');
  if (visible) {
    modalContainer.classList.add('show');
  } else {
    modalContainer.classList.remove('show');
  }
}

// Function to display the restaurant details and daily menu
async function highlightAndShowDetails(restaurant) {
  const phone = restaurant.phone !== '-' ? restaurant.phone : '';
  const modalContainer = document.getElementById('customModal');

  // Update the modal's content first
  const detailsDiv = document.getElementById('restaurantDetails');
  detailsDiv.innerHTML = `
    <h1>${restaurant.name}</h1>
    <p>${restaurant.address}</p>
    <p>${restaurant.city}</p>
    <p>${phone}</p>
    <p>${restaurant.company}</p>
    <p>${restaurant.postalCode}</p>
    <div id="menuContainer"><h2>Daily Menu</h2></div>
    <button id="closeButton" type="button">Close</button>
  `;

  await fetchAndDisplayDailyMenu(restaurant._id);
  showModal(); // Show the modal

  // Correctly attach an event listener to the close button
  document.getElementById('closeButton').addEventListener('click', () => {
    showModal(false); // Explicitly hide the modal
  });
}

// Consolidate fetching and displaying the daily menu
async function fetchAndDisplayDailyMenu(restaurantId) {
  const lang = 'fi';
  const dailyMenuUrl = `${apiUrl}/daily/${restaurantId}/${lang}`;
  const menuData = await fetchData(dailyMenuUrl);
  const menuContainer = document.getElementById('menuContainer');
  if (menuData && menuData.courses) {
    menuContainer.innerHTML =
      '<h2>Daily Menu</h2>' +
      menuData.courses
        .map(
          (course) =>
            `<p><strong>${course.name}</strong> - ${course.price}<br>Diets: ${course.diets}</p>`
        )
        .join('');
  } else {
    menuContainer.innerHTML = '<p>No menu available for today.</p>';
  }
}

fetchAndDisplayRestaurants();
