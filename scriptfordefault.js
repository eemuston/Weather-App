import { config } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
const apiKey = config.apiKey;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const weatherIcon = document.querySelector(".weather-icon");

const defaultCities = ["Helsinki", "New York", "Frankfurt"];

defaultCities.forEach(city => {
    getWeather(city);
});

async function getWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        const cityCard = document.querySelector(`.${city.replace(" ", "-")} .card`);
        const weatherIcon = cityCard.querySelector(".weather-icon");

        const timezoneOffset = data.timezone; 
        
        const utcTime = new Date(Date.now() + new Date().getTimezoneOffset() * 60000); 
        
        const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);

        const weekday = localTime.toLocaleString("en-US", { weekday: "long" });

        cityCard.querySelector(".city").innerHTML = data.name;
        cityCard.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        cityCard.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        cityCard.querySelector(".wind").innerHTML = data.wind.speed + " m/s";
        cityCard.querySelector(".weekday").innerHTML = weekday;
        cityCard.querySelector(".time").innerHTML = localTime.toLocaleTimeString("en-UK", { timeStyle: "short" });
        cityCard.querySelector(".date").innerHTML = localTime.toLocaleDateString("en-UK", { dateStyle: "full" });

        if(data.weather[0].main == "Clouds")
        {
            weatherIcon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Clear" && (localTime.getHours() >= 21 && localTime.getHours <= 24 || localTime.getHours() >= 0 && localTime.getHours() <= 6))
        {
                weatherIcon.src = "images/night.png";
        }
        else if (data.weather[0].main == "Clear")
        {
            weatherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Rain")
        {
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Snow")
        {
            weatherIcon.src = "images/snow.png";
        }
        else if (data.weather[0].main == "Drizzle")
        {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist")
        {
            weatherIcon.src = "images/mist.png";
        }
        else
        {
            weatherIcon.src = "images/default.png";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
    }
}
});
