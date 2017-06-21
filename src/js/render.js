const Render = (() => {


  const showWinner = () => {
    alert('showWinner')
  };

  const renderWrongLetters = (letterArr) => {
    const listParent = document.getElementById('letters-js');
    const oldList = document.getElementById('letters__list-js');
    const newList = document.createElement('ul');
    newList.id = 'letters__list-js';
    for(let i = 0; i < letterArr.length; i++) {
      const letter = document.createElement('li');
      letter.innerHTML = letterArr[i];
      newList.appendChild(letter);
    }
    console.log(newList);
    listParent.replaceChild(newList, oldList);
  };

  const renderRemainingGuesses = (number) => {
    document.getElementById('guesses__number-js').innerHTML = number;
  };

  return {
    showWinner,
    renderWrongLetters,
    renderRemainingGuesses,
  }
})();

module.exports = Render;
