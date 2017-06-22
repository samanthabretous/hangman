const Render = (() => {


  const showWinner = () => {
    alert('showWinner')
  };

  const showLoser = () => {
    alert('showLoser')
  };

  const renderUsedLetters = (letterArr, letter) => {
    const listParent = document.getElementById('letters-js');
    const oldList = document.getElementById('letters__list-js');
    const newList = document.createElement('ul');
    newList.id = 'letters__list-js';
    for(let i = 0; i < letterArr.length; i++) {
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
  }
})();

module.exports = Render;
