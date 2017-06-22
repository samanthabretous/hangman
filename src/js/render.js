const Render = (() => {
  const showWinner = (word) => {
    alert(`Congrats you guessed ${word} correctly\n Play again?`);
    window.location.href = 'index.html';
  };

  const showLoser = (word) => {
    alert(`You lost the word was ${word}.\n Play again?`);
    window.location.href = 'index.html';
  };

  const renderUsedLetters = (letterArr, letter) => {
    const listParent = document.getElementById('letters-js');
    const oldList = document.getElementById('letters__list-js');
    const newList = document.createElement('ul');
    newList.id = 'letters__list-js';
    for (let i = 0; i < letterArr.length; i += 1) {
      const newLetter = document.createElement('li');
      if (letterArr[i] === letter) {
        letterArr[i] = null;
      } else {
        newLetter.innerHTML = letterArr[i];
      }
      newList.appendChild(newLetter);
    }
    listParent.replaceChild(newList, oldList);
  };

  const renderRemainingGuesses = (number) => {
    document.getElementById('guesses__number-js').innerHTML = number;
  };

  return {
    showWinner,
    showLoser,
    renderUsedLetters,
    renderRemainingGuesses,
  };
})();

module.exports = Render;
