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

  // Displaying Current Weather Data

function displayWeather(data) {
    let city = data.location.name;
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

    const forecastTypeSelect = document.getElementById('forecast-type');

    forecastTypeSelect.addEventListener('change', () => {
      const selectedValue = forecastTypeSelect.value;

      // Check the selected value and execute the respective functions
      if (selectedValue === 'football') {
        // Execute only when 'Upcoming Football' is selected
        getSportsData(data.location.lat, data.location.lon);
      } else if (selectedValue === 'events') {
        // Execute only when 'Upcoming Events' is selected
        getEventsData(data.location.lat, data.location.lon);
      }
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
function displayForecast(forecastData) {
    const forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = "";
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    for (let i = 1; i < 4; i++) {
      const day = forecastData[i];
  
      const forecastCard = document.createElement("div");
      forecastCard.classList.add("day");
      if (!day || !day.date_epoch) {
        continue; // Skip this iteration if necessary data is missing
      }
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