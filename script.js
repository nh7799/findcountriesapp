const mainGrid = document.querySelector(".main-grid");
const mode = document.querySelector(".switch-mode");
const ico = document.querySelector(".ico");
//AJAX call

let data1 = "";

const loader = document.querySelector(".loader");

const getData = async function () {
  const JsonData = await fetch("https://restcountries.eu/rest/v2/all");

  if (!JsonData.ok) throw new Error("cannot get data");
  const data = await JsonData.json();

  return data;
};

const checkStr = function (str) {
  if (str.length > 20) {
    return `${str.slice(0, 20)}..`;
  } else {
    return str;
  }
};
document.documentElement.style.pointerEvents = "none";

const showLoader = function (isTrue) {
  if (!isTrue) {
    loader.classList.add("hidden");
  } else {
    loader.classList.remove("hidden");
  }
};

showLoader(true);

const updateGridItems = function (data) {
  mainGrid.innerHTML = "";
  data.forEach((el) => {
    const html = `
<div class="main-grid__column" id="${el.name}">
 <div class="main-grid__column__flag">
 
  <img class="main-grid__column__flag-image" src="${
    el?.flag
  }" width="100%" height="auto"/>
  </div>
  <div class="main-grid__column__text">
    <div class="country-name"><span class="">${checkStr(el.name)}</span></div>
    <ul class="details">
      <li class="detail_1">Population:<span class="result-text">${
        el.population
      } - ${(el.population / 1000000).toFixed(2)}M</span></li>
      <li class="detail_2">Region:<span class="result-text">${
        el.region
      }</span></li>
      <li class="detail_3">Capital:<span class="result-text">${
        el.capital
      }</span></li>
    </ul>
  </div>
</div>
`;

    mainGrid.insertAdjacentHTML("beforeend", html);
  });
};

// addGriditems(true);

const root = document.documentElement;

let isClicked = false;
mode.addEventListener("click", function () {
  isClicked === false ? (isClicked = true) : (isClicked = false);
  if (isClicked) {
    root.style.setProperty("--primary-color-background", "hsl(0, 0%, 98%)");
    root.style.setProperty("--primary-color", "hsl(0, 0%, 98%)");
    root.style.setProperty("--primary-text-color", "hsl(200, 15%, 8%)");
    root.style.setProperty("--box-shadow", "0px 2px 14px hsl(0, 0%, 70%)");
    ico.classList.add("rotate-ico");
  } else {
    root.style.setProperty("--primary-color-background", "");
    root.style.setProperty("--primary-color", "");
    root.style.setProperty("--primary-text-color", "");
    root.style.setProperty("--box-shadow", "");
    ico.classList.remove("rotate-ico");
  }
});

//OPEN THE NEW PAGE----------------------------------------------------

const page = document.querySelector(".details-page");
const countryName = document.querySelector(".details-page-title");
const native = document.querySelector(".native");
const population = document.querySelector(".population");
const region = document.querySelector(".region2");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const domain = document.querySelector(".domain");
const currencies = document.querySelector(".currencies");
const language = document.querySelector(".language");
const mainContent = document.querySelector(".main-content");
const image = document.querySelector(".flag-image");
const borderCountries = document.querySelector(".content__row-3__col__2");
const filterCountry = document.querySelector(".filter-country");
const selectCountry = document.querySelector("#select-country");

const openPage = function (istrue) {
  if (istrue) {
    page.classList.remove("hidden");
    mainContent.classList.add("hidden");
  } else {
    page.classList.add("hidden");
    mainContent.classList.remove("hidden");
  }
};

const checkIf = function (value) {
  if (!value) {
    return "Unavailable";
  } else {
    return `${value}`;
  }
};

getData()
  .then((data) => {
    updateGridItems(data);
    showLoader(false);

    document.documentElement.style.pointerEvents = "All";

    console.log("running");
    mainGrid.addEventListener("click", function (e) {
      e.target.closest(".main-grid__column").classList.add("scale");
      new Promise(function (resolve) {
        // mainGrid.classList.add("scale");
        setTimeout(() => {
          resolve();
        }, 150);
      }).then(() => {
        e.target.closest(".main-grid__column").classList.remove("scale");
        // mainGrid.classList.remove("scale");
        // page.scrollIntoView({ behavior: "smooth" });
        if (e.target.classList.contains("main-grid")) return;
        // console.log(e.target.closest(".main-grid__column"));

        const country = e.target.closest(".main-grid__column").id;
        // console.log(data);
        if (!data)
          throw new Error("Something is wrong with the received data--");

        const allCountries = [...data];

        const findCountry = allCountries.find((el) => {
          return el.name === country;
        });
        // console.log(findCountry);
        const {
          name: name1,
          flag: flag1,
          currencies: currencies1,
          nativeName: nativeName1,
          population: population1,
          subregion: subregion1,
          languages: languages1,
          capital: capital1,
          topLevelDomain: topLevelDomain1,
          region: region1,
          borders,
        } = findCountry;

        openPage(true);

        countryName.textContent = checkIf(name1);
        native.textContent = checkIf(nativeName1);
        population.textContent = checkIf(
          `${(+population1 / 1000000).toFixed(2)}  Million`
        );
        region.textContent = checkIf(region1);
        subRegion.textContent = checkIf(subregion1);
        capital.textContent = checkIf(capital1);
        domain.textContent = checkIf(`${topLevelDomain1.join(" ,")}`);
        language.textContent = checkIf(
          `${languages1
            .map((el) => el.name)
            .slice(0, 4)
            .join(",")}`
        );
        currencies.textContent = checkIf(
          currencies1
            .map((el) => el.name)
            .slice(0, 4)
            .join(",")
        );

        // image.style.backgroundImage = `url('${flag1}')`;
        image.src = `${flag1}`;

        const html2 = `<div class="normal-text">Border-countries</div>
      <div class="box-text">france</div>
      <div class="box-text">germany</div>
      <div class="box-text">netherlands</div>`;

        borderCountries.innerHTML = "";
        if (borders) {
          borders.forEach((el) => {
            borderCountries.insertAdjacentHTML(
              "beforeend",
              `<div class="box-text">${el}</div>`
            );
          });
        } else {
          borderCountries.insertAdjacentHTML(
            "beforeend",
            "<h4>unavilable</h4>"
          );
        }

        console.log(languages1.map((el) => el.name).join(`\ \g,`));
      });
    });

    const filteredCountriesByRegion = data;
    let countriesData = data;

    selectCountry.addEventListener("input", () => {
      const value = selectCountry.options[selectCountry.selectedIndex].value;

      countriesData = data.filter((el) => el.region === value);
      updateGridItems(countriesData);
    });

    inputField.addEventListener("input", function () {
      let inputvalue = inputField.value.trim();

      if (inputvalue !== "")
        inputvalue = inputvalue.replace(
          inputvalue[0],
          inputvalue[0].toUpperCase()
        );

      const checkProperty = countriesData.filter((el) =>
        el.hasOwnProperty("name")
      );

      let filteredCountries = checkProperty.filter((el) => {
        return el.name.startsWith(inputvalue);
      });
      updateGridItems(filteredCountries);
    });

    //check for region

    const regions = [];

    // selectCountry.innerHTML = "";
    data.forEach((el) => {
      const region = el.region;

      if (!regions.some((el) => el === region)) {
        if (region) {
          regions.push(region);
          const html = `<option value="${region}" class="region region__2">${region}</option>`;
          selectCountry.insertAdjacentHTML("beforeend", html);
        }
      }
    });
  })

  //////////////////////////////////////////////////////////////////////
  .catch((error) => console.error(error.message))
  .finally(() => {
    page.classList.remove("anim-slide-out");
  });

const backbtn = document.querySelector(".back-btn");

function goBack() {
  new Promise(function (resolve) {
    page.classList.add("scale");
    setTimeout(() => {
      resolve("ok");
    }, 350);
  }).then(() => {
    page.classList.remove("scale");
    mainGrid.classList.add("anim-slide-out");
    openPage(false);
  });
}

backbtn.addEventListener("click", goBack);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    goBack();
  }
});

const inputField = document.querySelector(".search-country");
