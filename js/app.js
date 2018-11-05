const game = new Game();

// This function hides the start screen overlay and starts rthe game
const resetDisplay = () => {
  document.querySelector("#overlay").style.display = "none";
  game.startGame();
}




const markButton = (event) => {
  if (event.target.tagName.toLowerCase() === "button") {
      event.target.style.backgroundColor = "pink";
      event.target.disabled = true;
      game.handleInteraction();
      console.log(game.missed);
  }
}


document.querySelector("#btn__reset").addEventListener("click", resetDisplay);

document.querySelector("#qwerty").addEventListener("click", markButton);
