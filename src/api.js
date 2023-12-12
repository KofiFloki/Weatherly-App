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

  // Get Current Weather Data

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
  