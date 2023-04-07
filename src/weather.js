function currentDayTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

let dayTime = document.querySelector("#day-time");
let date = new Date();
dayTime.innerHTML = currentDayTime(date);

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  temperatureElement.innerHTML = Math.round(response.temperature.current);
  cityElement.innerHTML = response.data[0].city;
  descriptionElement.innerHTML = response.condition;
  humidityElement.innerHTML = response.temperature.humidity;
  windElement.innerHTML = Math.round(response.wind.speed);
}

let apiKey = `e9tb1630o25a4f01cebc66c9ef1df31c`;

let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
