const apiKey = "0213b1bb4c8a990acc10f591a6bad2ca";
const cityInput = document.getElementById("cityInput");
const findButton = document.getElementById("findButton");

findButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

function fetchWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => updateWeather(data))
    .catch((error) => alert("Error: " + error.message));
}

function updateWeather(data) {
  const today = new Date();
  const options = { weekday: "long" };

  document.querySelector(
    "#today .date"
  ).innerText = `${today.getDate()} ${today.toLocaleString("default", {
    month: "long",
  })}`;
  document.querySelector("#today .day").innerText = new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(today);

  document.getElementById("city").innerText = data.city.name;
  document.getElementById(
    "temp1"
  ).innerHTML = `${data.list[0].main.temp.toFixed(1)}<sup>°C</sup>`;
  document.getElementById("desc1").innerText =
    data.list[0].weather[0].description;
  document.getElementById(
    "icon1"
  ).src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
  document.getElementById(
    "humidity1"
  ).innerText = `${data.list[0].main.humidity}%`;
  document.getElementById(
    "wind1"
  ).innerText = `${data.list[0].wind.speed} km/h`;

  const secondDay = new Date(today);
  secondDay.setDate(today.getDate() + 1);
  document.querySelector(
    "#temp2"
  ).innerHTML = `${data.list[8].main.temp.toFixed(1)}<sup>°C</sup>`;
  document.querySelector("#desc2").innerText =
    data.list[8].weather[0].description;
  document.querySelector(
    "#icon2"
  ).src = `https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`;
  document.querySelector(".forecast:nth-child(2) .day").innerText =
    new Intl.DateTimeFormat("en-US", options).format(secondDay);

  const thirdDay = new Date(today);
  thirdDay.setDate(today.getDate() + 2);
  document.querySelector(
    "#temp3"
  ).innerHTML = `${data.list[16].main.temp.toFixed(1)}<sup>°C</sup>`;
  document.querySelector("#desc3").innerText =
    data.list[16].weather[0].description;
  document.querySelector(
    "#icon3"
  ).src = `https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`;
  document.querySelector(".forecast:nth-child(3) .day").innerText =
    new Intl.DateTimeFormat("en-US", options).format(thirdDay);
}
