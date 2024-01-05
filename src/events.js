function getEventsData(lat, lon) {
    let apiKey = "BF4Ki9GAjibVxHBGf5rAXgetR2RPg8XY";
    let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?latlong=${lat},${lon}&apikey=${apiKey}`;
  
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displayEvents(data._embedded.events);
      }); 
  }

  function displayEvents(eventsData) {
    const eventsContainer = document.getElementById("forecast2");
    eventsContainer.innerHTML = "";
  
    if (!eventsData) {
      const noEventsMessage = document.createElement("p");
      noEventsMessage.textContent = "No upcoming events available for this location.";
      eventsContainer.appendChild(noEventsMessage);
      return;
    }
  
    const daysOfsport = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    for (let a = 0; a < 4; a++) {
      const event = eventsData[a];
  
      // Check if event or necessary properties are undefined
      if (!event || !event.name || !event.dates || !event._embedded) {
        continue; // Skip this iteration if necessary data is missing
      }
  
      const eventsCard = document.createElement("div");
      eventsCard.classList.add("event");
  
      const name = event.name;
      const start = event.dates.start.localDate;
      const venue = event._embedded.venues[0].name;
      const place = event._embedded.venues[0].city.name;
  
      const eventsContent = `
        <h2 class="event-name">${name}</h2>
        <h8 class="event-date">${start}</h8>
        <h8 class="event-venue">${venue}</h8>
        <h8 class="event-place">${place}</h8>
        `;
  
      eventsCard.innerHTML = eventsContent;
      eventsContainer.appendChild(eventsCard);
    }
  }
  