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
  
  // If The User Use the Search Bar
  
  let searchInput = document.querySelector("#search-input");
  let searchButton = document.querySelector(".fa-magnifying-glass");
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      let city = searchInput.value;
      searchCity(city);
    }
  });
  searchButton.addEventListener("click", function () {
    let city = searchInput.value;
    searchCity(city);
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

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeatherData(lat, lon);
  
  }
  
  getLocation();