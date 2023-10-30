const apiKey = "61107d125b01f3f2a26f4e5da43658ec";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "weather_images/images/clouds.png";
      document.querySelector(".card").style.background = "linear-gradient(to top, #87CEEB, #FFD700)";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "weather_images/images/clear.png";
      document.querySelector(".card").style.background = "linear-gradient(to bottom, #87CEEB, #0071BC)";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "weather_images/images/rain.png";
      document.querySelector(".card").classList.add("rain");
    } else if (data.weather[0].main == "Drizzle") {
      document.querySelector(".card").style.background = "linear-gradient(to bottom, #B0E0E6, #87CEEB)";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "weather_images/images/mist.png";
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
