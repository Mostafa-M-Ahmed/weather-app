'use script'

let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let btn4 = document.getElementById('btn4');
let btn5 = document.getElementById('btn5');

//globals
let activeTab = btn1;

//Switching pages
btn5.addEventListener("click", function () {
    contactPage.classList.replace('d-none', 'd-block')
    homePage.classList.replace('d-block', 'd-none')
});

btn1.addEventListener("click", function () {
    contactPage.classList.replace('d-block', 'd-none')
    homePage.classList.replace('d-none', 'd-block')
});

//switching navbar tabs
btn1.addEventListener("click", function () {
    activeTab.classList.remove('active');
    btn1.classList.add('active');
    activeTab = btn1
});
btn2.addEventListener("click", function () {
    activeTab.classList.remove('active');
    btn2.classList.add('active');
    activeTab = btn2
});
btn3.addEventListener("click", function () {
    activeTab.classList.remove('active');
    btn3.classList.add('active');
    activeTab = btn3
});
btn4.addEventListener("click", function () {
    activeTab.classList.remove('active');
    btn4.classList.add('active');
    activeTab = btn4
});
btn5.addEventListener("click", function () {
    activeTab.classList.remove('active');
    btn5.classList.add('active');
    activeTab = btn5
});

////////////////////////////

let searchBar = document.getElementById("search")
let searchBTN = document.getElementById("submit")

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

searchBTN.addEventListener("click", function () {
    return find(searchBar.value)
});

async function find(place) {
    let url = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=04ede93ece0e4b058b9182346240601&q=${place}&days=3&aqi=no&alerts=no`);

    if (url.ok == true && url.status != 400) {
        let place = await url.json();
        forecastToday(place.location, place.current);
        forecastTmrw(place.forecast.forecastday);
        console.log(place);
        // console.log(place.location);
        // console.log(place.current);
        // console.log(place.forecast.forecastday);
    }
}

function forecastToday(a, t) {
    if (t != null) {
        var d = new Date(t.last_updated.replace(" ", "T"));
        let box = `<div class="today forecast">
            <div class="forecast-header clearfix"  id="today">
            <div class="day float-start">${days[d.getDay()]}</div>
            <div class=" date float-end">${d.getDate() + ' ' + monthNames[d.getMonth()]}</div>
            </div>
            <div class="forecast-content" id="current">
            <div class="location">${a.name}</div>
            <div class="degree">
                <div class="num">${t.temp_c} <sup class="fw-light">o</sup>C</div>
                <div class="forecast-icon">
                    <img src="https:${t.condition.icon}" alt="" width=150>
                </div>
            </div>
            <div class="custom">${t.condition.text}</div>
            <span class="me-3"><i class="fa-solid fa-cloud-showers-heavy me-1 fa-lg"></i> ${t.precip_in} %</span>
            <span class="me-3"><i class="fa-solid fa-droplet me-1 fa-lg"></i> ${t.humidity} %</span>
            <span class="me-3"><i class="fa-solid fa-wind me-1 fa-lg"></i> ${t.wind_kph} km/h</span>
            <span class="me-3"><i class="fa-regular fa-compass me-1 fa-lg"></i> ${t.wind_dir}</span>
            </div>
        </div>`;
        document.getElementById("forecast").innerHTML = box
    }
}


function forecastTmrw(a) {
    let box = "";
    for (let i = 1; i < a.length; i++)
        box += `<div class="forecast  middle-forecast">
            <div class="forecast-header">
                <div class="day">${days[new Date(a[i].date.replace(" ", "T")).getDay()]}</div>
            </div>
            <div class="forecast-content">
                <div class="forecast-icon">
                    <img src="https:${a[i].day.condition.icon}" alt="" width=48>
                </div>
                <div class="degree">${a[i].day.maxtemp_c}<sup>o</sup>C</div>
                <small>${a[i].day.mintemp_c}<sup>o</sup></small>
                <div class="custom">${a[i].day.condition.text}</div>
            </div>
            </div>`;
    document.getElementById("forecast").innerHTML += box
}

find("alexandria")