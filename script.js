const continents = ["africa", "americas", "asia", "europe", "oceania"];
const ctx = document.getElementById("myChart");
const continentButtons = document.querySelectorAll(".continent");

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
        if (button.innerHTML === "Africa") {
          const africaNames = continentsData[0].map((country) => country.name.common);
          console.log(africaNames);
          new Chart(ctx, {
            type: "line",
            data: {
              labels: africaNames,
              datasets: [
                {
                  label: "# of Votes",
                  data: [12, 19, 3, 5, 2, 3],
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
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
  return continentsData;
};

getContinentData();

const getCitiesData = async () => {
  try {
    const res = await fetch(`https://countriesnow.space/api/v0.1/countries/population/cities`);
    if (!res.ok) {
      throw new Error(`PROBLEM.`);
    }
    const resData = await res.json();
    // console.log(resData);
  } catch (error) {
    console.error(error);
  }
};

getCitiesData();

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
