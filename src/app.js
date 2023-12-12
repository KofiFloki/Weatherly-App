// Displaying Current Date

function currentDate() {
  let now = new Date();
  let date = now.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[now.getMonth()];

  let year = now.getFullYear();

  let newDate = document.querySelector(".date");
  newDate.innerHTML = `${day}, ${date} ${month} ${year}`;
}
currentDate();

// Displaying Current Time

function currentTime() {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;
  minute = minute < 10 ? "0" + minute : minute;
  let newTime = document.querySelector(".time");
  newTime.innerHTML = `${hour}:${minute} ${ampm}`;
}
currentTime();

// If The User Allow the Browser to Access the Location

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

function getWeatherData(lat, lon) {
  let apiKey = "f31a01d49b3646afb8d84815231212";
  let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
  axios
    .get(apiUrl)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      displayWeather(data);
    });
}

// If The User Use the Search Bar

let searchInput = document.querySelector("#search-input");
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let city = searchInput.value;
    searchCity(city);
  }
});

function searchCity(city) {
  let apiKey = "f31a01d49b3646afb8d84815231212";
  let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    });
}

// Displaying Current Weather Data

function displayWeather(data) {
  let city = data.location.name;
  let state = data.location.region;
  let country = data.location.country;
  let temp = Math.round(data.current.temp_c);
  let description = data.current.condition.text;
  let iconUrl = data.current.condition.icon;

  let location = document.querySelector(".location");
  location.innerHTML = `${city}, ${country}`;

  let weatherTemp = document.querySelector("#temp-display");
  weatherTemp.innerHTML = `${temp}°`;

  let weatherType = document.querySelector(".weather-type");
  weatherType.innerHTML = `${description}`;

  let weatherIcon = document.querySelector(".weather-icon");
  weatherIcon.innerHTML = `<img src="${iconUrl}" alt="weather icon">`;
  
  getHourlyData(data.location.lat, data.location.lon);
  getForecastData(data.location.lat, data.location.lon);
  getHistoryData(data.location.lat, data.location.lon);

}

// Hourly Forecast

function getHourlyData(lat, lon) {
  let apiKey = "f31a01d49b3646afb8d84815231212";
  let api_url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1&aqi=no&alerts=no`;
  console.log(api_url);

  fetch(api_url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayHourly(data.forecast.forecastday[0].hour);
    });
}

function displayHourly(data) {
  let hourlyContainer = document.querySelector("#hourly-forecast");
  let hoursToShow = 24;
  hourlyContainer.innerHTML = "";
  
  let i = 0;
  while (i < hoursToShow) {
    let hourly = data[i];
    let hourlyTemp = hourly.temp_c;
    let tempCelsius = Math.round(hourlyTemp);
    let hourlyIcon = hourly.condition.icon;
    let hourlyTime = new Date(hourly.time_epoch * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    i += 4;
      let hourlyCard = document.createElement("div");
      hourlyCard.classList.add("forecast");

      hourlyCard.innerHTML = `
        <h6 class="forecast-time">${hourlyTime}</h6>
        <img src="${hourlyIcon}" alt="weather icon" class="forecast-icon">
        <h6 class="forecast-temp">${tempCelsius}°</h6>
      `;
      hourlyContainer.appendChild(hourlyCard);
  }
}

// 3 Day Forecast 

function getForecastData(lat, lon) {
  let apiKey = "f31a01d49b3646afb8d84815231212";
  let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=4&aqi=no&alerts=no`;

  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayForecast(data.forecast.forecastday);
    }); 
}

function displayForecast(forecastData) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 1; i < 4; i++) {
    const day = forecastData[i];

    const forecastCard = document.createElement("div");
    forecastCard.classList.add("day");

    const date = new Date(day.date_epoch * 1000); 
    const dayOfWeek = daysOfWeek[date.getDay()]; 

    const iconUrl = day.day.condition.icon;
    const description = day.day.condition.text;

    const minTemp = Math.round(day.day.mintemp_c);
    const maxTemp = Math.round(day.day.maxtemp_c);

    const forecastContent = `
      <h6 class="day-name">${dayOfWeek}</h6>
      <img src="${iconUrl}">
      <h6 class="day-weather">${description}</h6>
      <h6 class="day-temp">${minTemp}° / <strong>${maxTemp}°</stronng></h6>
      `;

    forecastCard.innerHTML = forecastContent;
    forecastContainer.appendChild(forecastCard);
  }
}

// A day History
function getHistoryData(lat, lon) {
  let apiKey = "f31a01d49b3646afb8d84815231212";
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  yesterdayFormat = yesterday.toISOString().slice(0, 10);
  let apiUrl = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${lat},${lon}&&dt=${yesterdayFormat}`;

  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayHistory(data.forecast.forecastday);
    }); 
}

function displayHistory(forecastData) {
  const forecastContainer = document.getElementById("forecast1");
  forecastContainer.innerHTML = "";

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const day = forecastData[0];

  const forecastCard = document.createElement("div");
  forecastCard.classList.add("day");

  const date = new Date(day.date_epoch * 1000); 
  const dayOfWeek = daysOfWeek[date.getDay()]; 

  const iconUrl = day.day.condition.icon;
  const description = day.day.condition.text;

  const minTemp = Math.round(day.day.mintemp_c);
  const maxTemp = Math.round(day.day.maxtemp_c);

  const forecastContent = `
    <h6 class="day-name">${dayOfWeek}</h6>
    <img src="${iconUrl}">
    <h6 class="day-weather">${description}</h6>
    <h6 class="day-temp">${minTemp}° / <strong>${maxTemp}°</stronng></h6>
    `;

  forecastCard.innerHTML = forecastContent;
  forecastContainer.appendChild(forecastCard);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  getWeatherData(lat, lon);

}

getLocation();

// Converting Temperature

function toggleTemperature() {
  const temperatureDisplay = document.getElementById("temp-display");
  const tempToggleLink = document.querySelector(".temp-toggle");
  const tempUnit = document.querySelector(".temp-unit");

  if (tempToggleLink.innerText === "| Convert to Fahrenheit") {
    // Convert Celsius to Fahrenheit
    const currentTemperature = parseFloat(temperatureDisplay.innerText);
    const fahrenheitTemperature = (currentTemperature * 9/5) + 32;
    temperatureDisplay.innerText = fahrenheitTemperature.toFixed(0) + "°";
    tempUnit.innerHTML = `Fahrenheit <a href="#" class="temp-toggle">| Convert to Celsius</a>`;
  } else {
    // Convert Fahrenheit to Celsius
    const currentTemperature = parseFloat(temperatureDisplay.innerText);
    const celsiusTemperature = (currentTemperature - 32) * 5/9;
    temperatureDisplay.innerText = celsiusTemperature.toFixed(0) + "°";
    tempUnit.innerHTML = `Celsius <a href="#" class="temp-toggle">| Convert to Fahrenheit</a>`;
  }

  // Add event listener to the new toggle link
  const newToggleLink = document.querySelector(".temp-toggle");
  newToggleLink.addEventListener("click", toggleTemperature);

  // Remove event listener from the old toggle link
  tempToggleLink.removeEventListener("click", toggleTemperature);
}

const tempToggleLink = document.querySelector(".temp-toggle");
tempToggleLink.addEventListener("click", toggleTemperature);

// Activities Carousel  

const carousel = document.querySelector('.activity-carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const activities = document.querySelectorAll('.activity');

let currentSlide = 0;
const numSlides = activities.length;

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + numSlides) % numSlides;
  displaySlide();
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % numSlides;
  displaySlide();
});

function displaySlide() {
  activities.forEach((activity, index) => {
    if (index === currentSlide) {
      activity.style.display = 'flex';
    } else {
      activity.style.display = 'none';
    }
  });
}

displaySlide();

setInterval(() => {
  nextBtn.click();
}, 5000);