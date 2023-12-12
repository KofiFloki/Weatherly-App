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