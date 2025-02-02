document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "ff1095a166ebe73ed14381aeade7dc58";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function getWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            const data = await response.json();

            if (data.cod !== 200) {
                throw new Error(data.message);
            }

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";

            const timezoneOffset = data.timezone; 
            
            const utcTime = new Date(Date.now() + new Date().getTimezoneOffset() * 60000); 
            
            const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);

            const weekday = localTime.toLocaleString("en-US", { weekday: "long" });

            document.querySelector(".weekday").innerHTML = weekday;
            document.querySelector(".time").innerHTML = localTime.toLocaleTimeString("en-UK", { timeStyle: "short" });
            document.querySelector(".date").innerHTML = localTime.toLocaleDateString("en-UK", { dateStyle: "full" });

            console.log(localTime.getHours());
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

    searchBtn.addEventListener("click", () => {
        if (searchBox.value.trim()) {
            getWeather(searchBox.value);
        }
    });

    getWeather("Helsinki");
});

