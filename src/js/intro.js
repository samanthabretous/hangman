const Game = require('./game.js');

const Intro = (() => {
  const button = document.getElementById('intro__button-js')
  const form = document.getElementById('intro__form-js');
  const input = document.getElementById('intro__input-js');

  const createErrorMessage = (event, message) => {
    event.preventDefault();
    const previousError = document.getElementById('intro__error-js');
    if(previousError) {
      previousError.innerHTML = message;
    } else {
      const span = document.createElement('span');
      span.id = 'intro__error-js';
      span.innerHTML = message;
      form.appendChild(span);
    }
    input.value = '';
  }
  const createWord = (event) => {
    if(input.value.length === 0) {
      createErrorMessage(event, 'Please enter a word');
    } else if (input.value.length > 18) {
      createErrorMessage(event, 'Please enter a word less than 18 characters');
    } else {
      window.localStorage.setItem('hangman', input.value.toLowerCase());
      input.value = '';
    }
  }

  return {
    init() {
      button.addEventListener('click', createWord);
    },
  }
})();

module.exports = Intro;
