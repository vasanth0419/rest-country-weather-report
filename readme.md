# TASK REST COUNTRIES WEATHER REPORTS .....

#### **1. Make a site using bootstrap cards to diplay countries details with weather using rest countries data (https://restcountries.com/v3.1/all). & weather api url with fetch()**

#### Step 1:

#### _CREATE A HTML FILE NAME_: `index.html`

##### In head tag add css `style.css` % bootstrap link....

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather report</title>
    <link rel="stylesheet" href="./css/style.css" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
  </head>
```

##### codes in body tag

```
<body class="bg-dark">
    <div class="container">
      <div class="h1 text-white bg-danger">
        <span>COUNTRIES LIST - WEATHER REPORT</span>
      </div>
    </div>
    <div class="container">
      <div class="rows" id="data-output">
        <div class="col-3">
          <div class="card col-lg-4 col-sm-12" style="width: 20rem">
            <div class="card-header custom-card-header">Header</div>
            <div class="card-body">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-text">
                <p class="span">Capital:</p>
                <p class="span">Region:</p>
                <p class="span">Country code:</p>
              </div>
              <button
                class="btn1"
                type="button"
                onclick="checkweather('${item.capital}')"
              >
                Click For Weather
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="popup" id="popup">
      <p class="tem">Temperature: <span id="temperature"></span></p>
      <p class="desc">Description: <span id="description"></span></p>
      <p class="speed">Wind speed: <span id="speed"></span></p>

      <button type="button" onclick="closepopup()">Ok</button>
    </div>
    </body>

```

##### codes in script tag

###### code this inside the end of body tag

```
<script src="./js/script.js"></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossorigin="anonymous"
    ></script>
```

#### codes in the `style.css` file

```
* {
  margin: 0;
  padding: 0;
}
.container {
  padding: 10px;
  margin: 10px;
}
.h1 {
  border-radius: 30px;
  text-align: center;
}
.card-body {
  background: rgb(189, 207, 222);
  background: linear-gradient(
    228deg,
    rgba(189, 207, 222, 1) 40%,
    rgba(117, 171, 184, 1) 66%,
    rgba(38, 139, 182, 0.908284023668639) 83%
  );
  font-weight: 300;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.card-header:first-child {
  font-style: italic;
  text-align: center;
  background-color: black;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}
.card {
  text-align: center;
  margin: 10px;
}

.popup {
  width: 400px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.1);
  background: rgb(117, 171, 184);
  padding: 0 30px 30px;
  background: linear-gradient(
    180deg,
    rgba(117, 171, 184, 1) 34%,
    rgba(38, 139, 182, 0.908284023668639) 70%
  );
  border-top-right-radius: 80px;
  border-bottom-left-radius: 80px;
  text-align: center;
  padding: 30px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  visibility: hidden;
  cursor: pointer;
}

.open-popup {
  visibility: visible;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  cursor: pointer;
}
.popup button {
  width: 100px;
  padding: 5px;
  background-color: green;
  color: white;
  border-radius: 30px;
}
.btn1 {
  background-color: green;
  padding: 5px;
  border-radius: 30px;
  color: white;
}


```

#### create a js file `script.js`.

##### codes in file.

```

const jsondata = fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((jsonData) => {
    let placeholder = document.querySelector("#data-output");
    let out = "";

    jsonData.forEach((item, index) => {
      if (index % 3 === 0) {
        out += `<div class="row">`;
      }

      out += `
        <div class="col-4">
          <div class="card col-lg-4 col-sm-12" style="width: 18rem">
            <div class="card-header">${item.name.common}</div>

            <div class="card-body">
              <img src="${item.flags.png}" class="card-img-top" alt="${item.name.common}" />
              <div class="card-text">
                <p class="span">Capital: ${item.capital}</p>
                <p class="span">Region: ${item.region}</p>
                <p class="span">Country code: ${item.cca3}</p>
              </div>
              <button class="btn1" type="button" onclick="checkweather('${item.capital}')">
                Click For Weather
              </button>
            </div>
          </div>
        </div>
      `;

      if ((index + 1) % 3 === 0 || index === jsonData.length - 1) {
        out += `</div>`;
      }
    });

    placeholder.innerHTML = out;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

let popup = document.getElementById("popup");

function openpopup() {
  popup.classList.add("open-popup");
}
function closepopup() {
  popup.classList.remove("open-popup");
}

const apikey = "fa47c18359af34c29aa5205f821d1dbe";
const apiurl = "https://api.openweathermap.org/data/2.5/weather";

async function checkweather(capital) {
  try {
    const response = await fetch(`${apiurl}?q=${capital}&appid=${apikey}`);
    const data = await response.json();
    console.log(data);

    // Update the popup content
    document.getElementById("temperature").innerText = data.main.temp + "°F";
    document.getElementById("description").innerText =
      data.weather[0].description;
    document.getElementById("speed").innerText = data.wind.speed + "km/h";

    openpopup();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}


```

### conclution:

#### In my site its show the countries details with flags,name,capital,country code...

#### click the button `click for weather ` to check the weather report of every countries..
