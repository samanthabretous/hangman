const Game = require('./game.js');

const Intro = (() => {
  const wordButton = document.getElementById('intro__button-js')
  const introDiv = document.getElementById('intro-js');
  const input = document.getElementById('intro__input-js');

  const createWord = (event) => {
    window.localStorage.setItem('hangman', input.value);
  }

  return {
    init() {
      wordButton.addEventListener('click', createWord);
    },
  }
})();

module.exports = Intro;
