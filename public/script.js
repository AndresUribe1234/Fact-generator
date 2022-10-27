"use strict";

const mainContainer = document.querySelector(".main-container");
const apiInfoForm = document.querySelector(".API-info");

function expandReduce(e) {
  const target = e.target;

  if (target.classList.contains("expand-icon")) {
    const containerParent = target.closest(".question-container");
    const answerToExpand = containerParent.querySelector(".answer");
    const icon = containerParent.querySelector(".expand-icon");
    if (answerToExpand.classList.contains("hidden")) {
      answerToExpand.classList.remove("hidden");
      icon.innerText = "-";
      containerParent.querySelector(".question-text").style.fontSize = "1rem";
    } else {
      answerToExpand.classList.add("hidden");
      icon.innerText = "+";
      containerParent.querySelector(".question-text").style.fontSize = "1.3rem";
    }
  }
}

mainContainer.addEventListener("click", expandReduce);

function apiResponse(e) {
  e.preventDefault();
  const category = apiInfoForm.querySelector("select").value;
  const min = document.getElementById("min").value;
  const max = document.getElementById("max").value;
  if (!isFinite(min) || !isFinite(max) || +min % 1 != 0 || +max % 1 != 0) {
    console.log("please enter valid numbers!");
    return;
  }
  const url = `/api?min=${min}&max=${max}&fragment=true&json=true&category=${category}`;
  let data;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      console.log("data cl", json);
    });

  console.log(category, min, max);
}

apiInfoForm.addEventListener("submit", apiResponse);

const options = {
  method: "GET",
};
