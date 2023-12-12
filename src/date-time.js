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
  