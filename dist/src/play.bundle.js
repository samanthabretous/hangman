(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./render.js":2,"./word.js":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
const Game = require('./js/game.js');

Game.init();

},{"./js/game.js":1}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZ2FtZS5qcyIsInNyYy9qcy9yZW5kZXIuanMiLCJzcmMvanMvd29yZC5qcyIsInNyYy9wbGF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBSZW5kZXIgPSByZXF1aXJlKCcuL3JlbmRlci5qcycpO1xuY29uc3QgV29yZCA9IHJlcXVpcmUoJy4vd29yZC5qcycpO1xuXG5jb25zdCBHYW1lID0gKCgpID0+IHtcbiAgY29uc3QgcmVzZXRTdGF0ZSA9IHtcbiAgICB3b3JkOiAnJyxcbiAgICBndWVzc2VzOiAxMCxcbiAgICB3cm9uZ0xldHRlcnM6IFtdLFxuICAgIGNvcnJlY3RMZXR0ZXJzOiBbXSxcbiAgfVxuXG4gIGxldCBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHJlc2V0U3RhdGUpO1xuXG4gIGNvbnN0IGFkZEd1ZXNzID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZ3Vlc3NJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdndWVzc19faW5wdXQtanMnKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGd1ZXNzID0gZ3Vlc3NJbnB1dC52YWx1ZTtcbiAgICBjb25zdCB1cGRhdGVkTGlzdCA9IFdvcmQudXBkYXRlV29yZExpc3Qoc3RhdGUud29yZCwgZ3Vlc3MpO1xuICAgIGNvbnNvbGUubG9nKHVwZGF0ZWRMaXN0LmlzV29yZENvbXBsZXRlZCk7XG4gICAgaWYodXBkYXRlZExpc3QuaXNXb3JkQ29tcGxldGVkKSBSZW5kZXIuc2hvd1dpbm5lcigpO1xuICAgIGVsc2UgaWYodXBkYXRlZExpc3QuaXNJbldvcmQpIHN0YXRlLmNvcnJlY3RMZXR0ZXJzLnB1c2goZ3Vlc3MpXG4gICAgZWxzZSB7XG4gICAgICBzdGF0ZS53cm9uZ0xldHRlcnMucHVzaChndWVzcyk7XG4gICAgICBSZW5kZXIucmVuZGVyV3JvbmdMZXR0ZXJzKHN0YXRlLndyb25nTGV0dGVycylcbiAgICAgIHN0YXRlLmd1ZXNzZXMtLVxuICAgICAgUmVuZGVyLnJlbmRlclJlbWFpbmluZ0d1ZXNzZXMoc3RhdGUuZ3Vlc3NlcylcbiAgICAgIGlmKHN0YXRlLmd1ZXNzZXMgPT09IDApIFJlbmRlci5zaG93TG9zZXIoKTtcbiAgICB9XG4gICAgZ3Vlc3NJbnB1dC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgcmVzZXRTdGF0ZS53cm9uZ0xldHRlcnMgPSBbXTtcbiAgICByZXNldFN0YXRlLmNvcnJlY3RMZXR0ZXJzID0gW107XG4gICAgc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCByZXNldFN0YXRlKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50cm8tanMnKS5zdHlsZS5kaXNwbGF5ID0gJ2luaXRpYWwnO1xuICAgIFdvcmQucmVzZXRXb3JkTGlzdCgpO1xuICAgIFJlbmRlci5yZW5kZXJXcm9uZ0xldHRlcnMoc3RhdGUud3JvbmdMZXR0ZXJzKVxuICB9XG4gIHJldHVybiB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHN0YXRlLndvcmQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGFuZ21hbicpO1xuICAgICAgV29yZC5yZW5kZXJXb3JkTGlzdChzdGF0ZS53b3JkKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdndWVzc19fYnV0dG9uLWpzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRHdWVzcyk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXRfX2J1dHRvbi1qcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVzZXQpO1xuICAgIH1cbiAgfTtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuIiwiY29uc3QgUmVuZGVyID0gKCgpID0+IHtcblxuXG4gIGNvbnN0IHNob3dXaW5uZXIgPSAoKSA9PiB7XG4gICAgYWxlcnQoJ3Nob3dXaW5uZXInKVxuICB9O1xuXG4gIGNvbnN0IHNob3dMb3NlciA9ICgpID0+IHtcbiAgICBhbGVydCgnc2hvd0xvc2VyJylcbiAgfTtcblxuICBjb25zdCByZW5kZXJXcm9uZ0xldHRlcnMgPSAobGV0dGVyQXJyKSA9PiB7XG4gICAgY29uc3QgbGlzdFBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZXR0ZXJzLWpzJyk7XG4gICAgY29uc3Qgb2xkTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZXR0ZXJzX19saXN0LWpzJyk7XG4gICAgY29uc3QgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgbmV3TGlzdC5pZCA9ICdsZXR0ZXJzX19saXN0LWpzJztcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGV0dGVyQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBsZXR0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgbGV0dGVyLmlubmVySFRNTCA9IGxldHRlckFycltpXTtcbiAgICAgIG5ld0xpc3QuYXBwZW5kQ2hpbGQobGV0dGVyKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2cobmV3TGlzdCk7XG4gICAgbGlzdFBhcmVudC5yZXBsYWNlQ2hpbGQobmV3TGlzdCwgb2xkTGlzdCk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyUmVtYWluaW5nR3Vlc3NlcyA9IChudW1iZXIpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3Vlc3Nlc19fbnVtYmVyLWpzJykuaW5uZXJIVE1MID0gbnVtYmVyO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc2hvd1dpbm5lcixcbiAgICBzaG93TG9zZXIsXG4gICAgcmVuZGVyV3JvbmdMZXR0ZXJzLFxuICAgIHJlbmRlclJlbWFpbmluZ0d1ZXNzZXMsXG4gIH1cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyO1xuIiwiY29uc3QgV29yZCA9ICgoKSA9PiB7XG4gIGNvbnN0IHJlbmRlcldvcmRMaXN0ID0gKHdvcmQpID0+IHtcbiAgICBjb25zdCB3b3JkTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JkX19saXN0LWpzJyk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHdvcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3VuZGVyc2NvcmUnKTtcbiAgICAgIHdvcmRMaXN0LmFwcGVuZChsaSk7XG4gICAgfVxuICB9O1xuICBjb25zdCB1cGRhdGVXb3JkTGlzdCA9ICh3b3JkLCBsZXR0ZXIpID0+IHtcbiAgICBjb25zdCBsaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjd29yZF9fbGlzdC1qcyA+IGxpJyk7XG4gICAgbGV0IGlzSW5Xb3JkID0gZmFsc2U7XG4gICAgbGV0IGFsbExldHRlcnNGaWxsZWQgPSAwO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB3b3JkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZih3b3JkW2ldID09PSBsZXR0ZXIpIHtcbiAgICAgICAgbGlzW2ldLmlubmVySFRNTCA9IHdvcmRbaV07XG4gICAgICAgIGxpc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCd1bmRlcnNjb3JlJyk7XG4gICAgICAgIGlzSW5Xb3JkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiBsaXNbaV0uaW5uZXJIVE1MKVxuICAgICAgLy8gdGFsbHkgdXAgYWxsIHRoZSBmaWxsZWQgaW4gYmxhbmtzXG4gICAgICBpZihsaXNbaV0uaW5uZXJIVE1MICE9PSAnJykgYWxsTGV0dGVyc0ZpbGxlZCsrXG4gICAgfVxuICAgIHJldHVybiB7IGlzSW5Xb3JkLCBpc1dvcmRDb21wbGV0ZWQ6IGFsbExldHRlcnNGaWxsZWQgPT09IHdvcmQubGVuZ3RoIH07XG4gIH07XG5cbiAgY29uc3QgcmVzZXRXb3JkTGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCB3b3JkTGlzdFBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JkLWpzJyk7XG4gICAgY29uc3QgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgbmV3TGlzdC5pZCA9ICd3b3JkX19saXN0LWpzJztcbiAgICB3b3JkTGlzdFBhcmVudC5yZXBsYWNlQ2hpbGQobmV3TGlzdCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmRfX2xpc3QtanMnKSk7XG4gIH07XG4gIHJldHVybiB7XG4gICAgcmVuZGVyV29yZExpc3QsXG4gICAgdXBkYXRlV29yZExpc3QsXG4gICAgcmVzZXRXb3JkTGlzdCxcbiAgfTtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXb3JkO1xuIiwiY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vanMvZ2FtZS5qcycpO1xuXG5HYW1lLmluaXQoKTtcbiJdfQ==
