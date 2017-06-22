(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const Intro = require('./js/intro.js');

Intro.init();

},{"./js/intro.js":3}],2:[function(require,module,exports){
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

},{"./render.js":4,"./word.js":5}],3:[function(require,module,exports){
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

},{"./game.js":2}],4:[function(require,module,exports){
const Render = (() => {


  const showWinner = () => {
    alert('showWinner')
  };

  const showLoser = () => {
    alert('showLoser')
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
    showLoser,
    renderWrongLetters,
    renderRemainingGuesses,
  }
})();

module.exports = Render;

},{}],5:[function(require,module,exports){
const Word = (() => {
  const renderWordList = (word) => {
    const wordList = document.getElementById('word__list-js');
    for(let i = 0; i < word.length; i++) {
      const li = document.createElement('li');
      li.classList.add('underscore');
      wordList.append(li);
    }
  };
  const updateWordList = (word, letter) => {
    const lis = document.querySelectorAll('#word__list-js > li');
    let isInWord = false;
    let allLettersFilled = 0;
    for(let i = 0; i < word.length; i++) {
      if(word[i] === letter) {
        lis[i].innerHTML = word[i];
        lis[i].classList.remove('underscore');
        isInWord = true;
      }
      console.log(typeof lis[i].innerHTML)
      // tally up all the filled in blanks
      if(lis[i].innerHTML !== '') allLettersFilled++
    }
    return { isInWord, isWordCompleted: allLettersFilled === word.length };
  };

  const resetWordList = () => {
    const wordListParent = document.getElementById('word-js');
    const newList = document.createElement('ul');
    newList.id = 'word__list-js';
    wordListParent.replaceChild(newList, document.getElementById('word__list-js'));
  };
  return {
    renderWordList,
    updateWordList,
    resetWordList,
  };

})();

module.exports = Word;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvanMvZ2FtZS5qcyIsInNyYy9qcy9pbnRyby5qcyIsInNyYy9qcy9yZW5kZXIuanMiLCJzcmMvanMvd29yZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBJbnRybyA9IHJlcXVpcmUoJy4vanMvaW50cm8uanMnKTtcblxuSW50cm8uaW5pdCgpO1xuIiwiY29uc3QgUmVuZGVyID0gcmVxdWlyZSgnLi9yZW5kZXIuanMnKTtcbmNvbnN0IFdvcmQgPSByZXF1aXJlKCcuL3dvcmQuanMnKTtcblxuY29uc3QgR2FtZSA9ICgoKSA9PiB7XG4gIGNvbnN0IHJlc2V0U3RhdGUgPSB7XG4gICAgd29yZDogJycsXG4gICAgZ3Vlc3NlczogMTAsXG4gICAgd3JvbmdMZXR0ZXJzOiBbXSxcbiAgICBjb3JyZWN0TGV0dGVyczogW10sXG4gIH1cblxuICBsZXQgc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCByZXNldFN0YXRlKTtcblxuICBjb25zdCBhZGRHdWVzcyA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGd1ZXNzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3Vlc3NfX2lucHV0LWpzJyk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBndWVzcyA9IGd1ZXNzSW5wdXQudmFsdWU7XG4gICAgY29uc3QgdXBkYXRlZExpc3QgPSBXb3JkLnVwZGF0ZVdvcmRMaXN0KHN0YXRlLndvcmQsIGd1ZXNzKTtcbiAgICBjb25zb2xlLmxvZyh1cGRhdGVkTGlzdC5pc1dvcmRDb21wbGV0ZWQpO1xuICAgIGlmKHVwZGF0ZWRMaXN0LmlzV29yZENvbXBsZXRlZCkgUmVuZGVyLnNob3dXaW5uZXIoKTtcbiAgICBlbHNlIGlmKHVwZGF0ZWRMaXN0LmlzSW5Xb3JkKSBzdGF0ZS5jb3JyZWN0TGV0dGVycy5wdXNoKGd1ZXNzKVxuICAgIGVsc2Uge1xuICAgICAgc3RhdGUud3JvbmdMZXR0ZXJzLnB1c2goZ3Vlc3MpO1xuICAgICAgUmVuZGVyLnJlbmRlcldyb25nTGV0dGVycyhzdGF0ZS53cm9uZ0xldHRlcnMpXG4gICAgICBzdGF0ZS5ndWVzc2VzLS1cbiAgICAgIFJlbmRlci5yZW5kZXJSZW1haW5pbmdHdWVzc2VzKHN0YXRlLmd1ZXNzZXMpXG4gICAgICBpZihzdGF0ZS5ndWVzc2VzID09PSAwKSBSZW5kZXIuc2hvd0xvc2VyKCk7XG4gICAgfVxuICAgIGd1ZXNzSW5wdXQudmFsdWUgPSAnJztcbiAgfVxuXG4gIGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuICAgIHJlc2V0U3RhdGUud3JvbmdMZXR0ZXJzID0gW107XG4gICAgcmVzZXRTdGF0ZS5jb3JyZWN0TGV0dGVycyA9IFtdO1xuICAgIHN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzZXRTdGF0ZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludHJvLWpzJykuc3R5bGUuZGlzcGxheSA9ICdpbml0aWFsJztcbiAgICBXb3JkLnJlc2V0V29yZExpc3QoKTtcbiAgICBSZW5kZXIucmVuZGVyV3JvbmdMZXR0ZXJzKHN0YXRlLndyb25nTGV0dGVycylcbiAgfVxuICByZXR1cm4ge1xuICAgIGluaXQoKSB7XG4gICAgICBzdGF0ZS53b3JkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hhbmdtYW4nKTtcbiAgICAgIFdvcmQucmVuZGVyV29yZExpc3Qoc3RhdGUud29yZCk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3Vlc3NfX2J1dHRvbi1qcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkR3Vlc3MpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0X19idXR0b24tanMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlc2V0KTtcbiAgICB9XG4gIH07XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTtcbiIsImNvbnN0IEdhbWUgPSByZXF1aXJlKCcuL2dhbWUuanMnKTtcblxuY29uc3QgSW50cm8gPSAoKCkgPT4ge1xuICBjb25zdCB3b3JkQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludHJvX19idXR0b24tanMnKVxuICBjb25zdCBpbnRyb0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRyby1qcycpO1xuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRyb19faW5wdXQtanMnKTtcblxuICBjb25zdCBjcmVhdGVXb3JkID0gKGV2ZW50KSA9PiB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoYW5nbWFuJywgaW5wdXQudmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0KCkge1xuICAgICAgd29yZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNyZWF0ZVdvcmQpO1xuICAgIH0sXG4gIH1cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW50cm87XG4iLCJjb25zdCBSZW5kZXIgPSAoKCkgPT4ge1xuXG5cbiAgY29uc3Qgc2hvd1dpbm5lciA9ICgpID0+IHtcbiAgICBhbGVydCgnc2hvd1dpbm5lcicpXG4gIH07XG5cbiAgY29uc3Qgc2hvd0xvc2VyID0gKCkgPT4ge1xuICAgIGFsZXJ0KCdzaG93TG9zZXInKVxuICB9O1xuXG4gIGNvbnN0IHJlbmRlcldyb25nTGV0dGVycyA9IChsZXR0ZXJBcnIpID0+IHtcbiAgICBjb25zdCBsaXN0UGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xldHRlcnMtanMnKTtcbiAgICBjb25zdCBvbGRMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xldHRlcnNfX2xpc3QtanMnKTtcbiAgICBjb25zdCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBuZXdMaXN0LmlkID0gJ2xldHRlcnNfX2xpc3QtanMnO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsZXR0ZXJBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxldHRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBsZXR0ZXIuaW5uZXJIVE1MID0gbGV0dGVyQXJyW2ldO1xuICAgICAgbmV3TGlzdC5hcHBlbmRDaGlsZChsZXR0ZXIpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhuZXdMaXN0KTtcbiAgICBsaXN0UGFyZW50LnJlcGxhY2VDaGlsZChuZXdMaXN0LCBvbGRMaXN0KTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJSZW1haW5pbmdHdWVzc2VzID0gKG51bWJlcikgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdndWVzc2VzX19udW1iZXItanMnKS5pbm5lckhUTUwgPSBudW1iZXI7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzaG93V2lubmVyLFxuICAgIHNob3dMb3NlcixcbiAgICByZW5kZXJXcm9uZ0xldHRlcnMsXG4gICAgcmVuZGVyUmVtYWluaW5nR3Vlc3NlcyxcbiAgfVxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZW5kZXI7XG4iLCJjb25zdCBXb3JkID0gKCgpID0+IHtcbiAgY29uc3QgcmVuZGVyV29yZExpc3QgPSAod29yZCkgPT4ge1xuICAgIGNvbnN0IHdvcmRMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmRfX2xpc3QtanMnKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgd29yZC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgbGkuY2xhc3NMaXN0LmFkZCgndW5kZXJzY29yZScpO1xuICAgICAgd29yZExpc3QuYXBwZW5kKGxpKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHVwZGF0ZVdvcmRMaXN0ID0gKHdvcmQsIGxldHRlcikgPT4ge1xuICAgIGNvbnN0IGxpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyN3b3JkX19saXN0LWpzID4gbGknKTtcbiAgICBsZXQgaXNJbldvcmQgPSBmYWxzZTtcbiAgICBsZXQgYWxsTGV0dGVyc0ZpbGxlZCA9IDA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHdvcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHdvcmRbaV0gPT09IGxldHRlcikge1xuICAgICAgICBsaXNbaV0uaW5uZXJIVE1MID0gd29yZFtpXTtcbiAgICAgICAgbGlzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3VuZGVyc2NvcmUnKTtcbiAgICAgICAgaXNJbldvcmQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2codHlwZW9mIGxpc1tpXS5pbm5lckhUTUwpXG4gICAgICAvLyB0YWxseSB1cCBhbGwgdGhlIGZpbGxlZCBpbiBibGFua3NcbiAgICAgIGlmKGxpc1tpXS5pbm5lckhUTUwgIT09ICcnKSBhbGxMZXR0ZXJzRmlsbGVkKytcbiAgICB9XG4gICAgcmV0dXJuIHsgaXNJbldvcmQsIGlzV29yZENvbXBsZXRlZDogYWxsTGV0dGVyc0ZpbGxlZCA9PT0gd29yZC5sZW5ndGggfTtcbiAgfTtcblxuICBjb25zdCByZXNldFdvcmRMaXN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHdvcmRMaXN0UGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmQtanMnKTtcbiAgICBjb25zdCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBuZXdMaXN0LmlkID0gJ3dvcmRfX2xpc3QtanMnO1xuICAgIHdvcmRMaXN0UGFyZW50LnJlcGxhY2VDaGlsZChuZXdMaXN0LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd29yZF9fbGlzdC1qcycpKTtcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICByZW5kZXJXb3JkTGlzdCxcbiAgICB1cGRhdGVXb3JkTGlzdCxcbiAgICByZXNldFdvcmRMaXN0LFxuICB9O1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdvcmQ7XG4iXX0=
