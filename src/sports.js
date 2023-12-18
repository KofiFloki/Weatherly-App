function getSportsData(lat, lon) {
    let apiKey = "f31a01d49b3646afb8d84815231212";
    let apiUrl = `https://api.weatherapi.com/v1/sports.json?key=${apiKey}&q=${lat},${lon}`;
  
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displaySports(data.football);
      }); 
  }

  function displaySports(sportsData) {
    const sportsContainer = document.getElementById("forecast2");
    sportsContainer.innerHTML = "";
  
    if (!sportsData || sportsData.length === 0) {
      const noSportsMessage = document.createElement("p");
      noSportsMessage.textContent = "No upcoming sports available for this location.";
      sportsContainer.appendChild(noSportsMessage);
      return;
    }
  
    const daysOfsport = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    for (let a = 0; a < 5; a++) {
      const sport = sportsData[a];
  
      // Check if sport or necessary properties are undefined
      if (!sport || !sport.stadium || !sport.start || !sport.match) {
        // Handle missing or undefined values here, e.g., skip this iteration
        console.error("Missing or undefined data for sport at index " + i);
        continue; // Skip this iteration if necessary data is missing
      }
  
      const sportsCard = document.createElement("div");
      sportsCard.classList.add("sport");
  
      const tournament = sport.tournament;
      const start = sport.start;
      const match = sport.match;
  
      const sportsContent = `
        <h1 class="sport-stadium">${tournament}</h1>
        <h6 class="sport-date">${start}</h6>
        <h6 class="sport-match">${match}</h6>
        `;
  
      sportsCard.innerHTML = sportsContent;
      sportsContainer.appendChild(sportsCard);
    }
  }
  