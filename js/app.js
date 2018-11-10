const game = new Game();

// This function hides the start screen overlay and starts rthe game
const resetDisplay = () => {
  document.querySelector("#overlay").style.display = "none";
  game.startGame();
}

// When any button on the screen is clicked, 'handleInteraction' function is called
const markButton = (event) => {
  if (event.target.tagName.toLowerCase() === "button") {
      event.target.style.backgroundColor = "pink";
      event.target.disabled = true;
      game.handleInteraction();
      console.log(game.missed);
  }
}

// When any button on the keyboard is clicked, 'handleInteraction' function is called
const markButtonWithKeyboard = (event) => {
      const keys = document.querySelectorAll(".key");
      //console.log(keys[5].textContent);
      //console.log(event.key);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].textContent === event.key) {
          keys[i].style.backgroundColor = "pink";
          keys[i].style.disabled = true;
          game.handleInteraction();
        }
      }

}

// Event listeners
document.querySelector("#btn__reset").addEventListener("click", resetDisplay);

document.querySelector("#qwerty").addEventListener("click", markButton);

document.addEventListener("keypress", markButtonWithKeyboard);
