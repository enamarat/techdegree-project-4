let game = null;

// This function hides the start screen overlay and starts rthe game
const resetDisplay = () => {
  document.querySelector("#overlay").style.display = "none";
  game = new Game();
  game.startGame();
}

// When any button on the screen is clicked, 'handleInteraction' function is called
const markButton = (event) => {
  if (event.target.tagName.toLowerCase() === "button") {
      event.target.style.backgroundColor = "pink";
      event.target.disabled = true;
      game.handleInteraction();
  }
  let characterToDisplay = document.getElementsByClassName("letter");
  let arrayOfLetters = Array.from(characterToDisplay);
}

// When any button on the keyboard is clicked, 'handleInteraction' function is called
const markButtonWithKeyboard = () => {
      const keys = document.querySelectorAll(".key");
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].textContent === event.key) {
          keys[i].style.backgroundColor = "pink";
          keys[i].disabled = true;
          game.handleInteraction();
        }
      }

      // Deactivating "keypress" event listener after the game is over
      let characterToDisplay = document.getElementsByClassName("letter");
      let arrayOfLetters = Array.from(characterToDisplay);
      if (game.missed === 5 || game.guessed === arrayOfLetters.length ) {
        document.removeEventListener("keypress", markButtonWithKeyboard);
      }
}

// Function which resets the game
const resetGame = () => {
  // Returning initial display screen
  document.querySelector("#overlay").style.display = "flex";
  // Activating again all buttons on the screen and removing color marks from them
  const keys = document.querySelectorAll(".key");
  for (let i = 0; i < keys.length; i++) {
      keys[i].disabled = false;
      keys[i].style.backgroundColor = "#E5E5E5";
    }
  // Activating again buttons on a keyboard
  document.addEventListener("keypress", markButtonWithKeyboard);
  // Resetting the score
    game.guessed = 0;
    game.missed = 0;
  // Returning hearts to the screen
  const hearts = document.querySelectorAll(".tries");
  for (let j = 0; j < hearts.length; j++) {
    hearts[j].style.display = "inline";
  }
    document.querySelector('#scoreboard ol').style.display = "block";
  // Removing previously generated phrase
  const phrase = document.querySelector("#phrase");
  while(phrase.firstChild) {
    phrase.removeChild(phrase.firstChild)
  }

  // Removing final message and "New game" button
  const scoreboard = document.querySelector("#scoreboard");
  const message = document.querySelector("#scoreboard span");
  scoreboard.removeChild(message);

  const button = document.querySelector("#scoreboard button");
  scoreboard.removeChild(button);

}

// Event listeners
document.querySelector("#btn__reset").addEventListener("click", resetDisplay);

document.querySelector("#qwerty").addEventListener("click", markButton);

document.addEventListener("keypress", markButtonWithKeyboard);
