const details = document.querySelector(".details");
details.style.visibility = 'hidden';
details.className = "hidden-property";

const token = "e0e2b14ab8ca45fbdf9b70c2a2abf507";

const loc = document.querySelector(".location");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const wicon = document.querySelector(".wicon");
const description = document.querySelector(".description");
const date = document.querySelector(".date");

if (navigator.geolocation) 
{
    navigator.geolocation.getCurrentPosition((position) => {
    	//console.log(position);
    	const lat = position.coords.latitude;
    	const lon = position.coords.longitude;
    	currentLocation(lat, lon);
    });
} 
else 
{ 
    console.log("Geolocation is not supported by this browser.");
}

async function currentLocation(lat, lon)
{ 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data);
    //console.log(data.name);

    var spinner = document.querySelector(".spinner-div");
    console.log(spinner);
    spinner.remove();

    putData(data);
}

async function requiredWeather()
{
    const place = document.querySelector(".place");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place.value}&appid=${token}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(place.value);
    if(data.cod == "404" || place.value == "")
    {
        alert("Location not found!!");
    }
    else
    {
        putData(data)
    }
}

function putData(data)
{
    loc.innerHTML = data.name;

    var num = data.main.temp - 273.15;
    if(Number(num) === num && num % 1 !== 0)
    {
        var num = num.toFixed(2);
    }
    temperature.innerHTML = num;

    icon = data.weather[0].icon;
    iconurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    wicon.setAttribute("src", iconurl);

    description.innerHTML = data.weather[0].main;

    humidity.innerHTML = data.main.humidity;
    wind.innerHTML = data.wind.speed;

    details.style.visibility = 'visible';
    details.className = "show-property";
}

const search = document.querySelector(".search button");
search.addEventListener("click", function(){
    requiredWeather();
});

const input = document.querySelector(".place");
input.addEventListener("keyup", function(event){
    if (event.keyCode == 13)
    {
        event.preventDefault();
        requiredWeather();
    }
})