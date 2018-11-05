class Phrase {
  constructor(phrase) {
    this.phrase = phrase;
  }

  /* Function which adds letter placeholders to the display
    when the game starts. The number of placeholders is determined by
    generated random phrase. */
    addPhraseToDisplay() {
      const ul =  document.querySelector('#phrase');
      for (let character in this.phrase) {
          const li = document.createElement('li');
          let letterToDisplay = ul.appendChild(li);
          letterToDisplay.textContent = this.phrase[character];
          if (letterToDisplay.textContent !== " ") {
            letterToDisplay.setAttribute('class', 'hide letter');
          } else {
            letterToDisplay.setAttribute('class', 'hide space');
          }
      }
    }

  /* Function which checks to see if letter selected by player matches
   a letter in the phrase. */
    checkLetter() {
    let matched = this.phrase.split('').filter(letter => letter.toLowerCase() === event.target.textContent);
    return matched;
    }


  /* Function which reveals the letter(s) on the board that
   matches player's selection. */
    showMatchedLetter() {
      let characterToDisplay = document.getElementsByClassName("letter");
      let arrayOfLetters = Array.from(characterToDisplay);
      /* Looping through letters of the generated phrase to see
      whether any of them matches player's selection*/
      for (let i = 0; i < arrayOfLetters.length; i++) {
        if (arrayOfLetters[i].textContent.toLowerCase() === event.target.textContent) {
          arrayOfLetters[i].style.backgroundColor = "MediumSpringGreen";
          arrayOfLetters[i].style.border = "2px solid black";
          arrayOfLetters[i].style.color = "black";
          event.target.style.backgroundColor = "lime";
          game.guessed += 1;
        }
      }
    }
  }
