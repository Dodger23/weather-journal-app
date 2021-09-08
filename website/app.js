"use strict";

/* Global Variables */
const apiKey = "17effa3568954e63bb569bcd6287db82";
const baseUrl = "api.openweathermap.org/data/2.5/weather?zip="

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


// Event listener to add function to existing HTML DOM element
let clicked = document.getElementById('generate');
clicked.addEventListener('click', function() {
    let zip = document.getElementById('zip').value;
    getWeather(baseUrl, zip, apiKey);
});



/* Function to GET Web API Data*/
async function getWeather(baseUrl, zip, apiKey) {
    let userResponse = document.getElementById('feelings').value;
    //     console.log(url)
    await fetch("http://" + baseUrl + zip + "&appid=" + apiKey)
        .then(res => res.json())
        .then(data => {
            let objectData = {
                temprature: data.main.temp,
                date: newDate,
                userResponse: userResponse,
            }
            addData('/addData', objectData);
        })
        .then(() => {
            updateUiWithValues();
        })
}

/* Function to POST data */
async function addData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
async function updateUiWithValues() {
    let response = fetch('/getData');
    let date = document.getElementById('date');
    let temp = document.getElementById('temp');
    let content = document.getElementById('content');
    response.then(res => res.json())
        .then(data => {
            temp.innerHTML = data.temprature;
            date.innerHTML = data.date;
            content.innerHTML = data.userResponse;
        })
}