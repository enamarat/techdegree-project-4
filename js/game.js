class Game {
  constructor() {
  this.missed = 0;
  this.guessed = 0;

  this.phrases = [
  "Excuse me",
  "That is great",
  "Keep silence",
  "Thanks a lot",
  "Trust me",
  "Work harder",
  "Forget it",
  "Stay away",
  "Glad to hear",
  "Be my guest"
  ];

  this.addedPhrase = this.generatedPhrase();

  }


  /* A function which generates random quotes. */
     getRandomPhrase() {
      let randomPhrase = Math.floor(Math.random() * this.phrases.length);
      return this.phrases[randomPhrase];
    }

  /* This function picks a random phrase. */
    generatedPhrase() {
      return new Phrase(this.getRandomPhrase());
    }


    /* This function adds a chosen random phrase to te screen. */
    startGame() {
      this.addedPhrase.addPhraseToDisplay();
    }

    /* This method ends the game by disabling all remaining buttons which weren`t pressed,
     and it also displays a message which varies depending on whether a player has won or lost. */
        gameOver() {
          // If all letters in the phrase are guessed, players will see a message about their victory.
          if (this.missed < 5) {
            // Message of victory
            const messageOfVictory = document.createElement('span');
            messageOfVictory.textContent = "Victory and glory are yours!";
            messageOfVictory.style.fontWeight = "bold";
            messageOfVictory.style.color = "green";
            document.querySelector("#scoreboard").appendChild(messageOfVictory);
          }

          // If players missed 5 times, they lost, and corresponding message will appear.
          if (this.missed === 5) {
            // Message of defeat
            const messageOfDefeat = document.createElement('span');
            messageOfDefeat.textContent = "You have failed miserably!";
            messageOfDefeat.style.fontWeight = "bold";
            messageOfDefeat.style.color = "red";
            document.querySelector("#scoreboard").appendChild(messageOfDefeat);
          }
          // Disabling all buttons on the screen after the game is over
          const keys = document.querySelectorAll(".key");
          for (let i = 0; i < keys.length; i++) {
            keys[i].disabled = true;
          }

          // "New Game" Button
          const newGameButton = document.createElement('button');
          newGameButton.textContent = "New Game";
          newGameButton.style.backgroundColor = "blue";
          newGameButton.style.color = "yellow";
          newGameButton.setAttribute("id", "newGame");
          document.querySelector("#scoreboard").appendChild(newGameButton);
          document.querySelector("#newGame").addEventListener("click", resetGame);
        }

    /* This method removes a heart from the board, and,
     if the player is out of lives, ends the game */
      removeLife() {
        this.missed += 1;
          if (this.missed < 6) {
              document.querySelectorAll(".tries")[this.missed - 1].style.display = "none";
          }
          // If 5 lives are lost, the game is over
          if (this.missed === 5) {
            this.gameOver();
          }
        }

        /* This method checks to see if the player has selected all of the letters
        in the phrase */
        checkForWin() {
        let characterToDisplay = document.getElementsByClassName("letter");
        let arrayOfLetters = Array.from(characterToDisplay);
          if (this.guessed === arrayOfLetters.length) {
            document.querySelector('#scoreboard ol').style.display = "none";
            this.gameOver();
          }
      }

      /* When any button is pressed this function checks whether the chosen
      letter is present in the generated phrase. If it's not, a life is removed. If it is,
      the letter is displayed on the screen and whether a player has met all the requirements for
      victory is checked. */
      handleInteraction() {
        if (this.addedPhrase.checkLetter().length > 0) {
          this.addedPhrase.showMatchedLetter();
          this.checkForWin();
        } else {
          this.removeLife();
        }
      }
}
