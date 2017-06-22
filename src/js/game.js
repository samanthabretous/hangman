const Render = require('./render.js');
const Word = require('./word.js');

const Game = (() => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const resetState = {
    word: '',
    guesses: 8,
    usedLetters: alphabet.slice(0),
  }

  let state = Object.assign({}, resetState);

  const addGuess = (event) => {
    event.preventDefault();
    const guessInput = document.getElementById('guess__input-js');
    const guess = guessInput.value;
    const updatedList = Word.updateWordList(state.word, guess);
    Render.renderUsedLetters(state.usedLetters, guess)
    if(updatedList.isWordCompleted) Render.showWinner();
    // wrong guess
    else if (!updatedList.isInWord) {
      state.guesses--
      Render.renderRemainingGuesses(state.guesses)
      if(state.guesses === 0) Render.showLoser();
    }
    guessInput.value = '';
  }

  const reset = () => {
    resetState.wrongLetters = alphabet.slice(0);
    state = Object.assign({}, resetState);
    Word.resetWordList();
    Render.renderWrongLetters(state.usedLetters)
  }

  return {
    init() {
      // state.word = localStorage.getItem('hangman');
      state.word = 'five'
      console.log(state.word);
      Word.renderWordList(state.word);
      Render.renderUsedLetters(state.usedLetters);
      Render.renderRemainingGuesses(state.guesses)

      // add listeners
      document.getElementById('guess__button-js').addEventListener('click', addGuess);
      document.getElementById('reset__button-js').addEventListener('click', reset);
    }
  };

})();

module.exports = Game;
