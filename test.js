const continents = ["africa", "americas", "asia", "europe", "oceania"];
const continentsUpperCase = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
const ctx = document.getElementById("myChart");
const continentButtons = document.querySelectorAll(".continent");
const countryList = document.querySelector(".country-container");
let chart;

const getContinentData = async () => {
  const continentsResponses = [];
  const continentsData = [];
  try {
    for (let i = 0; i < continents.length; i++) {
      continentsResponses[i] = await fetch(`https://restcountries.com/v3.1/region/${continents[i]}`);
      if (!continentsResponses[i].ok) {
        throw new Error(`API Error. ${continentsResponses[i]} is the source.`);
      }
      continentsData[i] = await continentsResponses[i].json();

      // console.log(continentsData[i]);
    }
    console.log(continentsData);

    continentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (chart) {
          chart.destroy();
        }
        for (let i = 0; i < continentsUpperCase.length; i++) {
          console.log(button.innerHTML);
          if (button.innerHTML === continentsUpperCase[i]) {
            console.log(button.innerHTML);
            const nameList = continentsData[i].map((country) => country.name.common);
            const popData = continentsData[i].map((country) => country.population);
            console.log(nameList);
            console.log(popData);
            chart = new Chart(ctx, {
              type: "line",
              data: {
                labels: nameList,
                datasets: [
                  {
                    label: "Population",
                    data: popData,
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            });
            while (countryList.firstChild) {
              countryList.removeChild(countryList.firstChild);
            }
            for (let i = 0; i < nameList.length; i++) {
              const newCountry = document.createElement("button");
              newCountry.innerHTML = nameList[i];
              countryList.appendChild(newCountry);
            }
          }
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
  return continentsData;
};

getContinentData();
