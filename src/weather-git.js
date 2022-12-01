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
  let current = `Today is ${weekDay}, ${timeH}:${timeM} `;
  return current;
}
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate();

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
  document.querySelector("#displayTemp").innerHTML = Math.round(
    response.data.main.temp
  );
}
function cityInput(submitEvent) {
  submitEvent.preventDefault();
  let apiKey = `8cac06f7ab6c10287cd06a316ff84a57`;
  let city = document.querySelector("h1").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(condtions);
}
let city = document.querySelector("#search");
city.addEventListener("submitEvent", cityInput);
