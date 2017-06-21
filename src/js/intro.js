const Game = require('./game.js');

const Intro = (() => {
  const wordButton = document.getElementById('intro__button-js')
  const introDiv = document.getElementById('intro-js');
  const input = document.getElementById('intro__input-js');

  const createWord = (event) => {
    event.preventDefault();
    Game.addWord(input.value)
    hideIntro();
  }

  const hideIntro = () => {
    input.value = '';
    wordButton.removeEventListener('click', createWord, true);
    introDiv.style.display = 'none';
  }


  return {
    init() {
      wordButton.addEventListener('click', createWord);
    },
  }
})();

module.exports = Intro;
