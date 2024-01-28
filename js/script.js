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
