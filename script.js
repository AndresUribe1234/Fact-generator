"use strict";

const expandReduceIcon = document.querySelectorAll(".expand-icon");

function expandReduce(e) {
  const target = e.target;
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

expandReduceIcon.forEach((ele) => ele.addEventListener("click", expandReduce));
