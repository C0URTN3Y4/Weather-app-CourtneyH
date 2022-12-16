function formatDate() {
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();

  let day = now.getDay();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[day];
  let monthNumber = now.getUTCDate();
  let month = now.getMonth();
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
    "December",
  ];
  let yearMonth = months[month];
  let timeH = now.getHours();
  let timeM = now.getMinutes();
  let current = `Weather refreshed: ${weekDay} ${yearMonth} ${monthNumber}, ${timeH}:${timeM} `;
  return current;
}
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHtml =
      forecastHtml +
      `<div class="col">
          <div class="forecast date">${formatDay(forecastDay.time)}</div>
          <img src="${forecastDay.condition.icon_url}"/>
          <div class="forecastTemps">
          <div class="tempHigh">${Math.round(
            forecastDay.temperature.maximum
          )}°</div>
          <div class="tempLow">${Math.round(
            forecastDay.temperature.minimum
          )}°</div>
          </div>
        </div>`;
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}
//current location
function weather(response) {
  let temp = Math.round(response.data.main.temp);
  let small = document.querySelector("small");
  small.innerHTML = `${temp}°F`;
}

function weatherLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = `8cac06f7ab6c10287cd06a316ff84a57`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lat=${lat}&lon=${long}&units=imperial`;
  axios.get(`${apiUrl}`).then(weather);
}

function clicked(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(weatherLocation);
}

let position = document.querySelector("#coordinates");
position.addEventListener("click", clicked);

function condtions(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  fahrenheitTemp = response.data.main.temp;
  document.querySelector("#displayTemp").innerHTML = Math.round(fahrenheitTemp);
  document.querySelector("#wind").innerHTML =
    "Current windspeed: " + Math.round(response.data.wind.speed) + " mph";
  document.querySelector("h5").innerHTML = response.data.weather[0].description;
  document.querySelector("#feels").innerHTML =
    "Feels like: " + Math.round(response.data.main.feels_like) + "°F";
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function cityInput(city) {
  let apiKey = `8cac06f7ab6c10287cd06a316ff84a57`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(condtions);

  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=7133a7c1b7e259ct80aa4378ddfb7f9o&units=imperial`;
  axios.get(`${forecastUrl}`).then(displayForecast);
}
function userSubmit(event) {
  event.preventDefault();
  cityInput(document.querySelector("#name").value);
}
let citySearch = document.querySelector("#search");
citySearch.addEventListener("submit", userSubmit);

let fahrenheitTemp = null;

function showOriginal(event) {
  event.preventDefault();
  let celsius = document.querySelector("#displayTemp");
  original.classList.add("active");
  metric.classList.remove("active");
  celsius.innerHTML = Math.round(fahrenheitTemp);
}

function showConversion(event) {
  event.preventDefault();
  let celsius = document.querySelector("#displayTemp");
  let conversion = (fahrenheitTemp * 5) / 9 - 32;
  metric.classList.add("active");
  original.classList.remove("active");
  celsius.innerHTML = Math.round(conversion);
}

let metric = document.querySelector("#celsius");
metric.addEventListener("click", showConversion);

let original = document.querySelector("#fahrenheit");
original.addEventListener("click", showOriginal);

cityInput("Miami");

displayForecast("Miami");
