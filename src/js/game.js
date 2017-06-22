const Render = require('./render.js');
const Word = require('./word.js');

const Game = (() => {
  const resetState = {
    word: '',
    guesses: 10,
    wrongLetters: [],
    correctLetters: [],
  }

  let state = Object.assign({}, resetState);

  const addGuess = (event) => {
    const guessInput = document.getElementById('guess__input-js');
    event.preventDefault();
    const guess = guessInput.value;
    const updatedList = Word.updateWordList(state.word, guess);
    console.log(updatedList.isWordCompleted);
    if(updatedList.isWordCompleted) Render.showWinner();
    else if(updatedList.isInWord) state.correctLetters.push(guess)
    else {
      state.wrongLetters.push(guess);
      Render.renderWrongLetters(state.wrongLetters)
      state.guesses--
      Render.renderRemainingGuesses(state.guesses)
      if(state.guesses === 0) Render.showLoser();
    }
    guessInput.value = '';
  }

  const reset = () => {
    resetState.wrongLetters = [];
    resetState.correctLetters = [];
    state = Object.assign({}, resetState);
    document.getElementById('intro-js').style.display = 'initial';
    Word.resetWordList();
    Render.renderWrongLetters(state.wrongLetters)
  }
  return {
    init() {
      state.word = localStorage.getItem('hangman');
      Word.renderWordList(state.word);
      document.getElementById('guess__button-js').addEventListener('click', addGuess);
      document.getElementById('reset__button-js').addEventListener('click', reset);
    }
  };

})();

module.exports = Game;
