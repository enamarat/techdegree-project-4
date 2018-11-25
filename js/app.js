let game = null;

// This function hides the start screen overlay and starts the game
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
      game.handleInteraction(event);
  }
}

// When any button on the keyboard is clicked, 'handleInteraction' function is called
const markButtonWithKeyboard = (event) => {
      const keys = document.querySelectorAll(".key");
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].textContent === event.key) {
          keys[i].style.backgroundColor = "pink";
          keys[i].disabled = true;
          game.handleInteraction(event);
          keys[i].setAttribute("class", "pressed");
        }
      }
    }

// Function which resets the game
const resetGame = () => {
  // Returning initial display screen
  document.querySelector("#overlay").style.display = "flex";
  // Activating again buttons on a keyboard
  const pressedButtons = document.querySelectorAll(".pressed");
  for (let i = 0; i < pressedButtons.length; i++) {
    pressedButtons[i].setAttribute("class", "key");
  }
  document.addEventListener("keypress", markButtonWithKeyboard);

  // Activating again all buttons on the screen and removing color marks from them
  const keys = document.querySelectorAll(".key");
  for (let i = 0; i < keys.length; i++) {
      keys[i].disabled = false;
      keys[i].style.backgroundColor = "#E5E5E5";
    }

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

  // Removing overlay
  document.querySelector("#overlay").style.display = "none";

  // Creating a new game
  game = new Game();
  game.startGame();
}

// Event listeners
document.querySelector("#btn__reset").addEventListener("click", resetDisplay);

document.querySelector("#qwerty").addEventListener("click", markButton);

document.addEventListener("keypress", markButtonWithKeyboard);
