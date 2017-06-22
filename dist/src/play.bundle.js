(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const Render = require('./render.js');
const Word = require('./word.js');

const Game = (() => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const resetState = {
    word: '',
    guesses: 8,
    usedLetters: alphabet.slice(0),
  };
  let state = Object.assign({}, resetState);

  const addGuess = (event) => {
    event.preventDefault();
    const guessInput = document.getElementById('guess__input-js');
    const guess = guessInput.value;
    const updatedList = Word.updateWordList(state.word, guess);
    Render.renderUsedLetters(state.usedLetters, guess);
    if (updatedList.isWordCompleted) Render.showWinner(state.word);
    // wrong guess
    else if (!updatedList.isInWord) {
      state.guesses -= 1;
      Render.renderRemainingGuesses(state.guesses);
      if (state.guesses === 0) Render.showLoser(state.word);
    }
    guessInput.value = '';
  };

  const reset = () => {
    resetState.wrongLetters = alphabet.slice(0);
    state = Object.assign({}, resetState);
    Word.resetWordList();
    Render.renderWrongLetters(state.usedLetters);
  };

  return {
    init() {
      state.word = localStorage.getItem('hangman');
      Word.renderWordList(state.word);
      Render.renderUsedLetters(state.usedLetters);
      Render.renderRemainingGuesses(state.guesses);

      // add listeners
      document.getElementById('guess__button-js').addEventListener('click', addGuess);
      document.getElementById('reset__button-js').addEventListener('click', reset);
    },
  };
})();

module.exports = Game;

},{"./render.js":2,"./word.js":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
const Word = (() => {
  const determineWordListWidth = (word, wordList) => {
    let width = '100%';
    const wl = word.length;
    switch (wl) {
      case 1: case 2: case 3:
        width = '40%';
        break;
      case 4: case 5:
        width = '50%';
        break;
      case 6: case 7:
        width = '60%';
        break;
      case 8: case 9:
        width = '75%';
        break;
      case 10: case 11:
        width = '90%';
        break;
      default:
        width = '100%';
    }
    wordList.style.width = width;
  };

  const renderWordList = (word) => {
    const wordList = document.getElementById('word__list-js');
    determineWordListWidth(word, wordList);
    for (let i = 0; i < word.length; i += 1) {
      const li = document.createElement('li');
      li.classList.add('underscore');
      li.innerHTML = '&nbsp;';
      wordList.append(li);
    }
  };
  const updateWordList = (word, letter) => {
    const lis = document.querySelectorAll('#word__list-js > li');
    let isInWord = false;
    let allLettersFilled = 0;
    for (let i = 0; i < word.length; i += 1) {
      if (word[i] === letter) {
        lis[i].innerHTML = word[i];
        lis[i].classList.remove('underscore');
        lis[i].classList.add('word__letter');
        isInWord = true;
      }
      // tally up all the filled in blanks
      if (lis[i].innerHTML !== '&nbsp;') allLettersFilled += 1;
    }
    return { isInWord, isWordCompleted: allLettersFilled === word.length };
  };

  const resetWordList = () => {
    const wordListParent = document.getElementById('word-js');
    const newList = document.createElement('ul');
    newList.id = 'word__list-js';
    wordListParent.replaceChild(newList, document.getElementById('word__list-js'));
    localStorage.set('hangman', '');
  };
  return {
    renderWordList,
    updateWordList,
    resetWordList,
  };
})();

module.exports = Word;

},{}],4:[function(require,module,exports){
const Game = require('./js/game.js');

Game.init();

},{"./js/game.js":1}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZ2FtZS5qcyIsInNyYy9qcy9yZW5kZXIuanMiLCJzcmMvanMvd29yZC5qcyIsInNyYy9wbGF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgUmVuZGVyID0gcmVxdWlyZSgnLi9yZW5kZXIuanMnKTtcbmNvbnN0IFdvcmQgPSByZXF1aXJlKCcuL3dvcmQuanMnKTtcblxuY29uc3QgR2FtZSA9ICgoKSA9PiB7XG4gIGNvbnN0IGFscGhhYmV0ID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6Jy5zcGxpdCgnJyk7XG4gIGNvbnN0IHJlc2V0U3RhdGUgPSB7XG4gICAgd29yZDogJycsXG4gICAgZ3Vlc3NlczogOCxcbiAgICB1c2VkTGV0dGVyczogYWxwaGFiZXQuc2xpY2UoMCksXG4gIH07XG4gIGxldCBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHJlc2V0U3RhdGUpO1xuXG4gIGNvbnN0IGFkZEd1ZXNzID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBndWVzc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2d1ZXNzX19pbnB1dC1qcycpO1xuICAgIGNvbnN0IGd1ZXNzID0gZ3Vlc3NJbnB1dC52YWx1ZTtcbiAgICBjb25zdCB1cGRhdGVkTGlzdCA9IFdvcmQudXBkYXRlV29yZExpc3Qoc3RhdGUud29yZCwgZ3Vlc3MpO1xuICAgIFJlbmRlci5yZW5kZXJVc2VkTGV0dGVycyhzdGF0ZS51c2VkTGV0dGVycywgZ3Vlc3MpO1xuICAgIGlmICh1cGRhdGVkTGlzdC5pc1dvcmRDb21wbGV0ZWQpIFJlbmRlci5zaG93V2lubmVyKHN0YXRlLndvcmQpO1xuICAgIC8vIHdyb25nIGd1ZXNzXG4gICAgZWxzZSBpZiAoIXVwZGF0ZWRMaXN0LmlzSW5Xb3JkKSB7XG4gICAgICBzdGF0ZS5ndWVzc2VzIC09IDE7XG4gICAgICBSZW5kZXIucmVuZGVyUmVtYWluaW5nR3Vlc3NlcyhzdGF0ZS5ndWVzc2VzKTtcbiAgICAgIGlmIChzdGF0ZS5ndWVzc2VzID09PSAwKSBSZW5kZXIuc2hvd0xvc2VyKHN0YXRlLndvcmQpO1xuICAgIH1cbiAgICBndWVzc0lucHV0LnZhbHVlID0gJyc7XG4gIH07XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgcmVzZXRTdGF0ZS53cm9uZ0xldHRlcnMgPSBhbHBoYWJldC5zbGljZSgwKTtcbiAgICBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHJlc2V0U3RhdGUpO1xuICAgIFdvcmQucmVzZXRXb3JkTGlzdCgpO1xuICAgIFJlbmRlci5yZW5kZXJXcm9uZ0xldHRlcnMoc3RhdGUudXNlZExldHRlcnMpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHN0YXRlLndvcmQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGFuZ21hbicpO1xuICAgICAgV29yZC5yZW5kZXJXb3JkTGlzdChzdGF0ZS53b3JkKTtcbiAgICAgIFJlbmRlci5yZW5kZXJVc2VkTGV0dGVycyhzdGF0ZS51c2VkTGV0dGVycyk7XG4gICAgICBSZW5kZXIucmVuZGVyUmVtYWluaW5nR3Vlc3NlcyhzdGF0ZS5ndWVzc2VzKTtcblxuICAgICAgLy8gYWRkIGxpc3RlbmVyc1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2d1ZXNzX19idXR0b24tanMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZEd1ZXNzKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldF9fYnV0dG9uLWpzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXNldCk7XG4gICAgfSxcbiAgfTtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTtcbiIsImNvbnN0IFJlbmRlciA9ICgoKSA9PiB7XG4gIGNvbnN0IHNob3dXaW5uZXIgPSAod29yZCkgPT4ge1xuICAgIGFsZXJ0KGBDb25ncmF0cyB5b3UgZ3Vlc3NlZCAke3dvcmR9IGNvcnJlY3RseVxcbiBQbGF5IGFnYWluP2ApO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2luZGV4Lmh0bWwnO1xuICB9O1xuXG4gIGNvbnN0IHNob3dMb3NlciA9ICh3b3JkKSA9PiB7XG4gICAgYWxlcnQoYFlvdSBsb3N0IHRoZSB3b3JkIHdhcyAke3dvcmR9LlxcbiBQbGF5IGFnYWluP2ApO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2luZGV4Lmh0bWwnO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlclVzZWRMZXR0ZXJzID0gKGxldHRlckFyciwgbGV0dGVyKSA9PiB7XG4gICAgY29uc3QgbGlzdFBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZXR0ZXJzLWpzJyk7XG4gICAgY29uc3Qgb2xkTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZXR0ZXJzX19saXN0LWpzJyk7XG4gICAgY29uc3QgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgbmV3TGlzdC5pZCA9ICdsZXR0ZXJzX19saXN0LWpzJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxldHRlckFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgbmV3TGV0dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGlmIChsZXR0ZXJBcnJbaV0gPT09IGxldHRlcikge1xuICAgICAgICBsZXR0ZXJBcnJbaV0gPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3TGV0dGVyLmlubmVySFRNTCA9IGxldHRlckFycltpXTtcbiAgICAgIH1cbiAgICAgIG5ld0xpc3QuYXBwZW5kQ2hpbGQobmV3TGV0dGVyKTtcbiAgICB9XG4gICAgbGlzdFBhcmVudC5yZXBsYWNlQ2hpbGQobmV3TGlzdCwgb2xkTGlzdCk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyUmVtYWluaW5nR3Vlc3NlcyA9IChudW1iZXIpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3Vlc3Nlc19fbnVtYmVyLWpzJykuaW5uZXJIVE1MID0gbnVtYmVyO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc2hvd1dpbm5lcixcbiAgICBzaG93TG9zZXIsXG4gICAgcmVuZGVyVXNlZExldHRlcnMsXG4gICAgcmVuZGVyUmVtYWluaW5nR3Vlc3NlcyxcbiAgfTtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyO1xuIiwiY29uc3QgV29yZCA9ICgoKSA9PiB7XG4gIGNvbnN0IGRldGVybWluZVdvcmRMaXN0V2lkdGggPSAod29yZCwgd29yZExpc3QpID0+IHtcbiAgICBsZXQgd2lkdGggPSAnMTAwJSc7XG4gICAgY29uc3Qgd2wgPSB3b3JkLmxlbmd0aDtcbiAgICBzd2l0Y2ggKHdsKSB7XG4gICAgICBjYXNlIDE6IGNhc2UgMjogY2FzZSAzOlxuICAgICAgICB3aWR0aCA9ICc0MCUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDogY2FzZSA1OlxuICAgICAgICB3aWR0aCA9ICc1MCUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjogY2FzZSA3OlxuICAgICAgICB3aWR0aCA9ICc2MCUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgODogY2FzZSA5OlxuICAgICAgICB3aWR0aCA9ICc3NSUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTA6IGNhc2UgMTE6XG4gICAgICAgIHdpZHRoID0gJzkwJSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgd2lkdGggPSAnMTAwJSc7XG4gICAgfVxuICAgIHdvcmRMaXN0LnN0eWxlLndpZHRoID0gd2lkdGg7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyV29yZExpc3QgPSAod29yZCkgPT4ge1xuICAgIGNvbnN0IHdvcmRMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmRfX2xpc3QtanMnKTtcbiAgICBkZXRlcm1pbmVXb3JkTGlzdFdpZHRoKHdvcmQsIHdvcmRMaXN0KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3VuZGVyc2NvcmUnKTtcbiAgICAgIGxpLmlubmVySFRNTCA9ICcmbmJzcDsnO1xuICAgICAgd29yZExpc3QuYXBwZW5kKGxpKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHVwZGF0ZVdvcmRMaXN0ID0gKHdvcmQsIGxldHRlcikgPT4ge1xuICAgIGNvbnN0IGxpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyN3b3JkX19saXN0LWpzID4gbGknKTtcbiAgICBsZXQgaXNJbldvcmQgPSBmYWxzZTtcbiAgICBsZXQgYWxsTGV0dGVyc0ZpbGxlZCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAod29yZFtpXSA9PT0gbGV0dGVyKSB7XG4gICAgICAgIGxpc1tpXS5pbm5lckhUTUwgPSB3b3JkW2ldO1xuICAgICAgICBsaXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgndW5kZXJzY29yZScpO1xuICAgICAgICBsaXNbaV0uY2xhc3NMaXN0LmFkZCgnd29yZF9fbGV0dGVyJyk7XG4gICAgICAgIGlzSW5Xb3JkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIHRhbGx5IHVwIGFsbCB0aGUgZmlsbGVkIGluIGJsYW5rc1xuICAgICAgaWYgKGxpc1tpXS5pbm5lckhUTUwgIT09ICcmbmJzcDsnKSBhbGxMZXR0ZXJzRmlsbGVkICs9IDE7XG4gICAgfVxuICAgIHJldHVybiB7IGlzSW5Xb3JkLCBpc1dvcmRDb21wbGV0ZWQ6IGFsbExldHRlcnNGaWxsZWQgPT09IHdvcmQubGVuZ3RoIH07XG4gIH07XG5cbiAgY29uc3QgcmVzZXRXb3JkTGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCB3b3JkTGlzdFBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JkLWpzJyk7XG4gICAgY29uc3QgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgbmV3TGlzdC5pZCA9ICd3b3JkX19saXN0LWpzJztcbiAgICB3b3JkTGlzdFBhcmVudC5yZXBsYWNlQ2hpbGQobmV3TGlzdCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmRfX2xpc3QtanMnKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldCgnaGFuZ21hbicsICcnKTtcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICByZW5kZXJXb3JkTGlzdCxcbiAgICB1cGRhdGVXb3JkTGlzdCxcbiAgICByZXNldFdvcmRMaXN0LFxuICB9O1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXb3JkO1xuIiwiY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vanMvZ2FtZS5qcycpO1xuXG5HYW1lLmluaXQoKTtcbiJdfQ==
