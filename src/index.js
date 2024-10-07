const apiKey = ${{ secrets.apiKey }}; // Replace 'your_api_key' with your OpenWeatherMap API key
const getWeatherButton = document.getElementById('get-weather');
const cityNameElem = document.getElementById('city-name');
const currentDateElem = document.getElementById('current-date');
const temperatureElem = document.getElementById('temperature');
const descriptionElem = document.getElementById('description');

getWeatherButton.addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  if (city) {
    getWeather(city);
  } else {
    alert('Please enter a city name.');
  }
});

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city+',in'}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      alert(error.message);
    });
}

function displayWeather(data) {
  const { name } = data;
  const { temp } = data.main;
  const { description } = data.weather[0];

  cityNameElem.textContent = name;
  currentDateElem.textContent = new Date().toLocaleDateString();
  temperatureElem.textContent = `${temp} °C`;
  descriptionElem.textContent = description;
}
