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
          setTimeout( () => {
            document.querySelector('#overlay').style.display = "flex";
            document.querySelector('#overlay').removeChild(document.querySelector("button"));
            // If all letters in the phrase are guessed, players will see a message about their victory.
            if (this.missed < 5) {
              document.querySelector('#game-over-message').textContent = "Victory and glory are yours!"
              document.querySelector('#game-over-message').style.color = "blue";
              document.querySelector('#overlay').style.backgroundColor = "MediumSpringGreen";
            }

            // If players missed 5 times, they lost, and corresponding message will appear.
            if (this.missed === 5) {
              document.querySelector('#game-over-message').textContent = "You have failed miserably!"
              document.querySelector('#game-over-message').style.color = "red";
              document.querySelector('#overlay').style.backgroundColor = "pink";
            }
            // Disabling all buttons on the screen after the game is over
            const keys = document.querySelectorAll(".key");
            for (let i = 0; i < keys.length; i++) {
              keys[i].disabled = true;
            }

           // Deactivating "keypress" event listener after the game is over
           let arrayOfLetters = document.getElementsByClassName("letter");
           if (game.missed === 5 || game.guessed === arrayOfLetters.length ) {
             document.removeEventListener("keypress", markButtonWithKeyboard);
           }

            // "New Game" Button
            const newGameButton = document.createElement('button');
            newGameButton.textContent = "New Game";
            newGameButton.setAttribute("id", "newGame");
            document.querySelector("#overlay").appendChild(newGameButton);
            document.querySelector("#newGame").addEventListener("click", resetGame);
          }, 1000); //timeOut
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
        checkForWin(event) {
        let arrayOfLetters = document.getElementsByClassName("letter");
          if (this.guessed === arrayOfLetters.length) {
            document.querySelector('#scoreboard ol').style.display = "none";
            this.gameOver();
          }
      }

      /* When any button is pressed this function checks whether the chosen
      letter is present in the generated phrase. If it's not, a life is removed. If it is,
      the letter is displayed on the screen and whether a player has met all the requirements for
      victory is checked. */
      handleInteraction(event) {
        if (this.addedPhrase.checkLetter(event).length > 0) {
          this.addedPhrase.showMatchedLetter(event);
          this.checkForWin(event);
        } else {
          this.removeLife();
        }
      }
}
