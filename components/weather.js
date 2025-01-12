const API_KEY = "5aded515df1bcc0a5f689c135db64bc8";

const GEO_PERMISSION_KEY = "geoPermission";
const GEO_LOCATION_KEY = "geoLocation";

function saveGeoLocation(lat, lon) {
    const location = {lat, lon}; 
    localStorage.setItem(GEO_LOCATION_KEY, JSON.stringify(location));
}

function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const city = document.querySelector("#weather span:first-child")
            const weather = document.querySelector("#weather span:last-child")
            city.innerText = `Today's weather in "${data.name}" is `;
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}°C`; 
        });
}

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    saveGeoLocation(lat, lon);
    fetchWeather(lat, lon);
}

function onGeoError() {
    alert("Can't find your location. No weather information is available for you.");
}


function checkGeoPermission() {
    const geoPermission = localStorage.getItem(GEO_PERMISSION_KEY);
    const storedLocation = localStorage.getItem(GEO_LOCATION_KEY);

    if(geoPermission === "granted" && storedLocation) {
        const {lat, lon} = JSON.parse(storedLocation);
        fetchWeather(lat, lon);
    } else {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                onGeoOk(position);
                localStorage.setItem(GEO_PERMISSION_KEY, "granted");
            },
            () => {
                onGeoError();
                localStorage.setItem(GEO_PERMISSION_KEY, "denied");
            }   
        );
    }   
}

checkGeoPermission();
