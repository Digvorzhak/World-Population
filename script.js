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
      continentsResponses[i] = await fetch(`https://restcountries.com/v2/region/${continents[i]}`);
      const cityResponses = await fetch(`https://countriesnow.space/api/v0.1/countries/population/cities`);
      if (!continentsResponses[i].ok || !cityResponses.ok) {
        throw new Error(`API Error. ${continentsResponses[i].ok} ${cityResponses.ok}`);
      }
      continentsData[i] = await continentsResponses[i].json();
      cityData = await cityResponses.json();
    }
    console.log(continentsData);

    continentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (chart) {
          chart.destroy();
        }
        for (let i = 0; i < continentsUpperCase.length; i++) {
          if (button.innerHTML === continentsUpperCase[i]) {
            const commonNameList = continentsData[i].map((country) => country.name);
            // const officialNameList = continentsData[i].map((country) => country.name.official);
            const popData = continentsData[i].map((country) => country.population);
            chart = new Chart(ctx, {
              type: "line",
              data: {
                labels: commonNameList,
                datasets: [
                  {
                    label: "Population",
                    data: popData,
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
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
            for (let i = 0; i < commonNameList.length; i++) {
              const newCountry = document.createElement("button");
              newCountry.innerHTML = commonNameList[i];
              newCountry.setAttribute("class", "country");
              countryList.appendChild(newCountry);
            }
            const countryButtons = document.querySelectorAll(".country");
            countryButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const cityList = [];
                const cityPop = [];
                for (let i = 0; i < cityData.data.length; i++) {
                  if (button.innerHTML === cityData.data[i].country) {
                    if (chart) {
                      chart.destroy();
                    }
                    cityList.push(cityData.data[i].city);
                    cityPop.push(cityData.data[i].populationCounts[0].value);
                    chart = new Chart(ctx, {
                      type: "line",
                      data: {
                        labels: cityList,
                        datasets: [
                          {
                            label: "Population",
                            data: cityPop,
                            borderWidth: 1,
                          },
                        ],
                      },
                      options: {
                        responsive: true,
                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                      },
                    });
                  }
                }
                console.log(cityList);
                console.log(cityPop);
              });
            });
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

// const getCitiesData = async () => {
//   try {
//     const res = await fetch(`https://countriesnow.space/api/v0.1/countries/population/cities`);
//     if (!res.ok) {
//       throw new Error(`PROBLEM.`);
//     }
//     const resData = await res.json();
//     console.log(resData);
//     console.log(resData.data.map((obj) => obj.country.includes("Morocco"))).filter((boolean) => boolean === true);
//   } catch (error) {
//     console.error(error);
//   }
// };

// getCitiesData();

// continentButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     if (button.innerHTML === "Africa") {
// new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [
//       {
//         label: "# of Votes",
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });
//     }
//   });
// });
