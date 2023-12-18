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
  