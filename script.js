"use strict";

const mainContainer = document.querySelector(".main-container");

function expandReduce(e) {
  const target = e.target;

  if (target.classList.contains("expand-icon")) {
    const containerParent = target.closest(".question-container");
    const answerToExpand = containerParent.querySelector(".answer");
    const icon = containerParent.querySelector(".expand-icon");
    if (answerToExpand.classList.contains("hidden")) {
      answerToExpand.classList.remove("hidden");
      icon.innerText = "-";
    } else {
      answerToExpand.classList.add("hidden");
      icon.innerText = "+";
    }
  }
}

mainContainer.addEventListener("click", expandReduce);
