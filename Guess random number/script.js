const randomNum = Math.floor(Math.random() * 100) + 1; //generate number btw 1 to 100
const inp = document.querySelector("#guessInput");
const btn = document.querySelector("#btn");
const msg = document.querySelector("#message");
const attempts = document.querySelector("#attempts");
let attempt = 10;
let prevguess = [];

function checkGuess() {
  const userGuess = Number(inp.value); //input number coming from input field

  if (userGuess < 1 || userGuess > 100) {
    msg.textContent = "Enter a number between 1 and 100";
    msg.style.color = "red";
    inp.value = "";
    return;
  }

  if (userGuess === randomNum) {
    msg.textContent = "You won";
    msg.style.color = "green";
  } else if (userGuess < randomNum) {
    msg.textContent = "Too low";
    msg.style.color = "red";
  } else {
    msg.textContent = "Too high";
    msg.style.color = "red";
  }

  prevguess.push(userGuess);
  const prevGuessDisplay = document.querySelector("#prevguess");
  prevGuessDisplay.textContent = `Previous guesses: ${prevguess.join(", ")}`;

  attempt--;
  attempts.textContent = `Attempts remaining: ${attempt}`;
  if (attempt === 0) {
    msg.textContent = "You lose";
    msg.style.color = "red";
    btn.disabled = true;
    //to reload and play again
    const playAgainBtn = document.createElement("button");
    playAgainBtn.textContent = "Play Again";
    playAgainBtn.addEventListener("click", () => location.reload());
    document.querySelector(".container").appendChild(playAgainBtn);
  }

  // Clear the input field after every guess
  inp.value = "";
}

btn.addEventListener("click", checkGuess);

inp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkGuess();
  }
});
