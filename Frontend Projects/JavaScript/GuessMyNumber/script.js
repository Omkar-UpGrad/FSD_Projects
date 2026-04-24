"use strict";
let secreteNumber = Math.trunc(Math.random() * 20) + 1;
let highScore = 0;
const display = (message) =>
  (document.querySelector(".message").textContent = message);

let score = Number(document.querySelector(".score").textContent);

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  if (!guess) {
    display("No Number");
  } else if (guess === secreteNumber) {
    document.querySelector(".number").textContent = secreteNumber;
    display("correct Number");
    document.querySelector("body").style.backgroundColor = "green";
    document.querySelector(".number").style.width = "30rem";
    if (highScore < score) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guess !== secreteNumber) {
    if (score > 1) {
      display(guess > secreteNumber ? "too high..." : "too low...");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      display("Game over...");
      document.querySelector(".score").textContent = 0;
    }
  }
});
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secreteNumber = Math.trunc(Math.random() * 20) + 1;
  display("start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess").value = "";
  document.querySelector(".number").textContent = "?";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
