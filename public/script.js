"use strict";

const mainContainer = document.querySelector(".main-container");
const apiInfoForm = document.querySelector(".API-info");

// Function to show content inside container. *Content depends on API call

function expandReduce(e) {
  const target = e.target;

  if (target.classList.contains("expand-icon")) {
    const containerParent = target.closest(".question-container");
    const answerToExpand = containerParent.querySelector(".answer");
    const icon = containerParent.querySelector(".expand-icon");
    if (answerToExpand.classList.contains("hidden")) {
      answerToExpand.classList.remove("hidden");
      icon.innerText = "-";
      containerParent.querySelector(".fact-selection-text").style.fontSize =
        "1rem";
    } else {
      answerToExpand.classList.add("hidden");
      icon.innerText = "+";
      containerParent.querySelector(".fact-selection-text").style.fontSize =
        "1.3rem";
    }
  }
}

mainContainer.addEventListener("click", expandReduce);

// Function which depending of the category that is selected will modify html

function changeCategory(e) {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains("category")) {
    const selectorContainer = target.closest(".question-container");
    const inputsInsertContainer =
      selectorContainer.querySelector(".inputs-to-insert");
    inputsInsertContainer.innerHTML = "";

    if (target.value === "trivia") {
      const html = `
    <label for="API-parameter-min">
                <span>Number</span>
                <input id="API-parameter-min" />
              </label>  
    `;
      inputsInsertContainer.insertAdjacentHTML("beforeend", html);
    } else if (target.value === "math") {
      const html = `
    <label for="API-parameter-min">
                <span>Number</span>
                <input id="API-parameter-min" />
              </label>    
    `;
      inputsInsertContainer.insertAdjacentHTML("beforeend", html);
    } else if (target.value === "date") {
      const html = `
    <label for="API-parameter-min">
                <span>Month</span>
                <input id="API-parameter-min" />
              </label>
              <label for="API-parameter-max">
                <span>Day</span>
                <input id="API-parameter-max" />
              </label>
    `;
      inputsInsertContainer.insertAdjacentHTML("beforeend", html);
    } else if (target.value === "year") {
      const html = `
    <label for="API-parameter-min">
                <span>Year</span>
                <input id="API-parameter-min" />
              </label>
    `;
      inputsInsertContainer.insertAdjacentHTML("beforeend", html);
    }
  }
}
mainContainer.addEventListener("change", changeCategory);

// Function to send information to backend o get API information back

function apiResponse(e) {
  e.preventDefault();
  const target = e.target;
  const selectorContainer = target.closest(".question-container");
  const category = selectorContainer.querySelector("select").value;
  const min = selectorContainer.querySelector("#API-parameter-min").value;
  let max;
  let url;
  if (selectorContainer.querySelector("select").value === "date") {
    max = selectorContainer.querySelector("#API-parameter-max").value;
  }

  if (
    (category === "math" || category === "trivia" || category === "year") &
    (isFinite(min) & (min % 1 === 0) || min === "")
  ) {
    url = `/api?min=${min}&max=${min}&fragment=true&json=true&category=${category}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        selectorContainer.querySelector(".answer p").innerText = json.text;
        console.log(json.text);
        console.log("data cl", json);
      });
  } else if (
    (category === "date") &
    (isFinite(min) & (min % 1 === 0) || min === "") &
    (isFinite(max) & (max % 1 === 0) || max === "")
  ) {
    url = `/api?min=${min}&max=${max}&fragment=true&json=true&category=${category}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        selectorContainer.querySelector(".answer p").innerText = json.text;
        console.log(json);
        console.log("data cl", json);
      });
  }
}

mainContainer.addEventListener("submit", apiResponse);
