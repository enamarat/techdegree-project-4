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


  /* A function which generates random quotes*/
     getRandomPhrase() {
      let randomPhrase = Math.floor(Math.random() * this.phrases.length);
      return this.phrases[randomPhrase];
    }

/* This function picks a random phrase and adds it to the screen*/
    generatedPhrase() {
      return new Phrase(this.getRandomPhrase());
    }


// Good!
    startGame() {
      this.addedPhrase.addPhraseToDisplay();
      console.log(this.addedPhrase);
    }

    /* This method displays a message which varies depending on whether player has won or lost */
        gameOver() {
          // If all letters in the phrase are guessed
          if (this.missed < 5) {
            const messageOfVictory = document.createElement('span');
            messageOfVictory.textContent = "Victory and glory are yours!";
            messageOfVictory.style.fontWeight = "bold";
            messageOfVictory.style.color = "green";
            document.querySelector("#scoreboard").appendChild(messageOfVictory);
          }

          // If player missed 5 times, he lost, and corresponding message will appear
          if (this.missed === 5) {
            const messageOfDefeat = document.createElement('span');
            messageOfDefeat.textContent = "You have failed miserably!";
            messageOfDefeat.style.fontWeight = "bold";
            messageOfDefeat.style.color = "red";
            document.querySelector("#scoreboard").appendChild(messageOfDefeat);

          }

          const keys = document.querySelectorAll(".key");
          for (let i = 0; i < keys.length; i++) {
            keys[i].disabled = true;
          }
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

// This method checks to see if the player has selected all of the letters
    checkForWin() {
    //console.log(this.guessed);
    let characterToDisplay = document.getElementsByClassName("letter");
    let arrayOfLetters = Array.from(characterToDisplay);
    //console.log(arrayOfLetters.length);
      if (this.guessed === arrayOfLetters.length) {
        document.querySelector('#scoreboard ol').style.display = "none";
        this.gameOver();
      }

    }



    handleInteraction() {
      if (this.addedPhrase.checkLetter().length > 0) {

        this.addedPhrase.showMatchedLetter();
        this.checkForWin();
      } else {
        this.removeLife();
      }
    }

}
