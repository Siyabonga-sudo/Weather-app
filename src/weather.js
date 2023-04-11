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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAjdJREFUeNrtmsGtgzAMhjtCRmAERsgIHYFjjx2BERiBEToCI+TaG2+DbJBnKj8pD1Eaiv8AwpX+C1Ap/hzHjpNLCOFyZl0UgAJQAApAASgABaAAFIACODEA9C/83AypIrUkRwpv5Pib4dsCNp5cAMgIS3rMGPxJw3/t4QDQoEtSt8LwsTpJEFAAAONjNUM4HSIEOO7vJC8Mwa2FkHURZBDSM2KAWu4CwPP5LEgtyZMCy/OzIgKBgGA2BUAGliPDxxreldFM2EU4JAOgwRtSPeHdmj0/Z3z8fcEQasTCiATgEgxMURvNAkR2sOIA2MtBSH60KNbC4dAhAHhBACFDdrBiADj2A0DI7PA4AgB0dihWAaBBXUk92Hhkdqi+BsDGh8ySzg7tGgD9BgC88FrgvgKQIeY/ZgepxXB3m6EFm6bm7ADqQwDggSLUHQVA2KG6P50JQJ+a96UBuC08OwqRerOWGPftkUa7Oc/GrTBKo5b0mEivwzOLAlABjb8v6EY1CXVGgwCAampUqZ5NNP5fuS1aB6w87Zn1PG+XpStOKw3AIro5IONfM0e8EhRsZFxz7EYRACRmgQc0YPMAENrAdJk6UBgAKwojz/W/yQUgXgilARguS5dUd2Yir+foPzSQ7TAfifdLOjZvzhSzQID0A3gmuJTDzIQzRXg4IC9IvFsY68jzWxr/qgvQV2TsRJ1gwMXOIuW+JNWhjtx2DWCDE6fvAOhNUQWgABSAAlAACkABKAAFoABOp1+6Bd0LJ+BorgAAAABJRU5ErkJggg=="
                  alt="Mostly cloudy"
                  id="icon"
                  width="40"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-temperature-max">18°</span>
                  <span class="weather-temperature-min">15°</span>
                </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.condition.icon;

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function search(city) {
  let apiKey = `e9tb1630o25a4f01cebc66c9ef1df31c`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let inputCity = searchInput.value;

  search(inputCity);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Cape Town");
displayForecast();
