(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const Intro = require('./js/intro.js');

Intro.init();

},{"./js/intro.js":3}],2:[function(require,module,exports){
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

},{"./render.js":4,"./word.js":5}],3:[function(require,module,exports){
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

},{"./game.js":2}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
const Word = (() => {
  const determineWordListWidth = (word, wordList) => {
    let width = '100%';
    const wl = word.length;
    console.log(wl)
    switch (wl) {
      case 1: case 2: case 3:
        width = '40%';
        break;
      case 4: case 5:
      console.log(wl)
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
    }
    return wordList.style.width = width;
  };

  const renderWordList = (word) => {
    const wordList = document.getElementById('word__list-js');
    determineWordListWidth(word, wordList);
    for(let i = 0; i < word.length; i++) {
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
    for(let i = 0; i < word.length; i++) {
      if(word[i] === letter) {
        lis[i].innerHTML = word[i];
        lis[i].classList.remove('underscore');
        isInWord = true;
      }
      // tally up all the filled in blanks
      if(lis[i].innerHTML !== '&nbsp;') allLettersFilled++
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvanMvZ2FtZS5qcyIsInNyYy9qcy9pbnRyby5qcyIsInNyYy9qcy9yZW5kZXIuanMiLCJzcmMvanMvd29yZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgSW50cm8gPSByZXF1aXJlKCcuL2pzL2ludHJvLmpzJyk7XG5cbkludHJvLmluaXQoKTtcbiIsImNvbnN0IFJlbmRlciA9IHJlcXVpcmUoJy4vcmVuZGVyLmpzJyk7XG5jb25zdCBXb3JkID0gcmVxdWlyZSgnLi93b3JkLmpzJyk7XG5cbmNvbnN0IEdhbWUgPSAoKCkgPT4ge1xuICBjb25zdCBhbHBoYWJldCA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicuc3BsaXQoJycpXG4gIGNvbnN0IHJlc2V0U3RhdGUgPSB7XG4gICAgd29yZDogJycsXG4gICAgZ3Vlc3NlczogOCxcbiAgICB1c2VkTGV0dGVyczogYWxwaGFiZXQuc2xpY2UoMCksXG4gIH1cblxuICBsZXQgc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCByZXNldFN0YXRlKTtcblxuICBjb25zdCBhZGRHdWVzcyA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZ3Vlc3NJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdndWVzc19faW5wdXQtanMnKTtcbiAgICBjb25zdCBndWVzcyA9IGd1ZXNzSW5wdXQudmFsdWU7XG4gICAgY29uc3QgdXBkYXRlZExpc3QgPSBXb3JkLnVwZGF0ZVdvcmRMaXN0KHN0YXRlLndvcmQsIGd1ZXNzKTtcbiAgICBSZW5kZXIucmVuZGVyVXNlZExldHRlcnMoc3RhdGUudXNlZExldHRlcnMsIGd1ZXNzKVxuICAgIGlmKHVwZGF0ZWRMaXN0LmlzV29yZENvbXBsZXRlZCkgUmVuZGVyLnNob3dXaW5uZXIoKTtcbiAgICAvLyB3cm9uZyBndWVzc1xuICAgIGVsc2UgaWYgKCF1cGRhdGVkTGlzdC5pc0luV29yZCkge1xuICAgICAgc3RhdGUuZ3Vlc3Nlcy0tXG4gICAgICBSZW5kZXIucmVuZGVyUmVtYWluaW5nR3Vlc3NlcyhzdGF0ZS5ndWVzc2VzKVxuICAgICAgaWYoc3RhdGUuZ3Vlc3NlcyA9PT0gMCkgUmVuZGVyLnNob3dMb3NlcigpO1xuICAgIH1cbiAgICBndWVzc0lucHV0LnZhbHVlID0gJyc7XG4gIH1cblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICByZXNldFN0YXRlLndyb25nTGV0dGVycyA9IGFscGhhYmV0LnNsaWNlKDApO1xuICAgIHN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzZXRTdGF0ZSk7XG4gICAgV29yZC5yZXNldFdvcmRMaXN0KCk7XG4gICAgUmVuZGVyLnJlbmRlcldyb25nTGV0dGVycyhzdGF0ZS51c2VkTGV0dGVycylcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdCgpIHtcbiAgICAgIC8vIHN0YXRlLndvcmQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGFuZ21hbicpO1xuICAgICAgc3RhdGUud29yZCA9ICdmaXZlJ1xuICAgICAgY29uc29sZS5sb2coc3RhdGUud29yZCk7XG4gICAgICBXb3JkLnJlbmRlcldvcmRMaXN0KHN0YXRlLndvcmQpO1xuICAgICAgUmVuZGVyLnJlbmRlclVzZWRMZXR0ZXJzKHN0YXRlLnVzZWRMZXR0ZXJzKTtcbiAgICAgIFJlbmRlci5yZW5kZXJSZW1haW5pbmdHdWVzc2VzKHN0YXRlLmd1ZXNzZXMpXG5cbiAgICAgIC8vIGFkZCBsaXN0ZW5lcnNcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdndWVzc19fYnV0dG9uLWpzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRHdWVzcyk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXRfX2J1dHRvbi1qcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVzZXQpO1xuICAgIH1cbiAgfTtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuIiwiY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZS5qcycpO1xuXG5jb25zdCBJbnRybyA9ICgoKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRyb19fYnV0dG9uLWpzJylcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRyb19fZm9ybS1qcycpO1xuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRyb19faW5wdXQtanMnKTtcblxuICBjb25zdCBjcmVhdGVFcnJvck1lc3NhZ2UgPSAoZXZlbnQsIG1lc3NhZ2UpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHByZXZpb3VzRXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50cm9fX2Vycm9yLWpzJyk7XG4gICAgaWYocHJldmlvdXNFcnJvcikge1xuICAgICAgcHJldmlvdXNFcnJvci5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgc3Bhbi5pZCA9ICdpbnRyb19fZXJyb3ItanMnO1xuICAgICAgc3Bhbi5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgICAgZm9ybS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICB9XG4gICAgaW5wdXQudmFsdWUgPSAnJztcbiAgfVxuICBjb25zdCBjcmVhdGVXb3JkID0gKGV2ZW50KSA9PiB7XG4gICAgaWYoaW5wdXQudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICBjcmVhdGVFcnJvck1lc3NhZ2UoZXZlbnQsICdQbGVhc2UgZW50ZXIgYSB3b3JkJyk7XG4gICAgfSBlbHNlIGlmIChpbnB1dC52YWx1ZS5sZW5ndGggPiAxOCkge1xuICAgICAgY3JlYXRlRXJyb3JNZXNzYWdlKGV2ZW50LCAnUGxlYXNlIGVudGVyIGEgd29yZCBsZXNzIHRoYW4gMTggY2hhcmFjdGVycycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hhbmdtYW4nLCBpbnB1dC52YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0KCkge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3JlYXRlV29yZCk7XG4gICAgfSxcbiAgfVxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRybztcbiIsImNvbnN0IFJlbmRlciA9ICgoKSA9PiB7XG5cblxuICBjb25zdCBzaG93V2lubmVyID0gKCkgPT4ge1xuICAgIGFsZXJ0KCdzaG93V2lubmVyJylcbiAgfTtcblxuICBjb25zdCBzaG93TG9zZXIgPSAoKSA9PiB7XG4gICAgYWxlcnQoJ3Nob3dMb3NlcicpXG4gIH07XG5cbiAgY29uc3QgcmVuZGVyVXNlZExldHRlcnMgPSAobGV0dGVyQXJyLCBsZXR0ZXIpID0+IHtcbiAgICBjb25zdCBsaXN0UGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xldHRlcnMtanMnKTtcbiAgICBjb25zdCBvbGRMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xldHRlcnNfX2xpc3QtanMnKTtcbiAgICBjb25zdCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBuZXdMaXN0LmlkID0gJ2xldHRlcnNfX2xpc3QtanMnO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsZXR0ZXJBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG5ld0xldHRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBpZiAobGV0dGVyQXJyW2ldID09PSBsZXR0ZXIpIHtcbiAgICAgICAgbGV0dGVyQXJyW2ldID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0xldHRlci5pbm5lckhUTUwgPSBsZXR0ZXJBcnJbaV07XG4gICAgICB9XG4gICAgICBuZXdMaXN0LmFwcGVuZENoaWxkKG5ld0xldHRlcik7XG4gICAgfVxuICAgIGxpc3RQYXJlbnQucmVwbGFjZUNoaWxkKG5ld0xpc3QsIG9sZExpc3QpO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlclJlbWFpbmluZ0d1ZXNzZXMgPSAobnVtYmVyKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2d1ZXNzZXNfX251bWJlci1qcycpLmlubmVySFRNTCA9IG51bWJlcjtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNob3dXaW5uZXIsXG4gICAgc2hvd0xvc2VyLFxuICAgIHJlbmRlclVzZWRMZXR0ZXJzLFxuICAgIHJlbmRlclJlbWFpbmluZ0d1ZXNzZXMsXG4gIH1cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyO1xuIiwiY29uc3QgV29yZCA9ICgoKSA9PiB7XG4gIGNvbnN0IGRldGVybWluZVdvcmRMaXN0V2lkdGggPSAod29yZCwgd29yZExpc3QpID0+IHtcbiAgICBsZXQgd2lkdGggPSAnMTAwJSc7XG4gICAgY29uc3Qgd2wgPSB3b3JkLmxlbmd0aDtcbiAgICBjb25zb2xlLmxvZyh3bClcbiAgICBzd2l0Y2ggKHdsKSB7XG4gICAgICBjYXNlIDE6IGNhc2UgMjogY2FzZSAzOlxuICAgICAgICB3aWR0aCA9ICc0MCUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDogY2FzZSA1OlxuICAgICAgY29uc29sZS5sb2cod2wpXG4gICAgICAgIHdpZHRoID0gJzUwJSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA2OiBjYXNlIDc6XG4gICAgICAgIHdpZHRoID0gJzYwJSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA4OiBjYXNlIDk6XG4gICAgICAgIHdpZHRoID0gJzc1JSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxMDogY2FzZSAxMTpcbiAgICAgICAgd2lkdGggPSAnOTAlJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB3b3JkTGlzdC5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlcldvcmRMaXN0ID0gKHdvcmQpID0+IHtcbiAgICBjb25zdCB3b3JkTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JkX19saXN0LWpzJyk7XG4gICAgZGV0ZXJtaW5lV29yZExpc3RXaWR0aCh3b3JkLCB3b3JkTGlzdCk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHdvcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3VuZGVyc2NvcmUnKTtcbiAgICAgIGxpLmlubmVySFRNTCA9ICcmbmJzcDsnO1xuICAgICAgd29yZExpc3QuYXBwZW5kKGxpKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHVwZGF0ZVdvcmRMaXN0ID0gKHdvcmQsIGxldHRlcikgPT4ge1xuICAgIGNvbnN0IGxpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyN3b3JkX19saXN0LWpzID4gbGknKTtcbiAgICBsZXQgaXNJbldvcmQgPSBmYWxzZTtcbiAgICBsZXQgYWxsTGV0dGVyc0ZpbGxlZCA9IDA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHdvcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHdvcmRbaV0gPT09IGxldHRlcikge1xuICAgICAgICBsaXNbaV0uaW5uZXJIVE1MID0gd29yZFtpXTtcbiAgICAgICAgbGlzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3VuZGVyc2NvcmUnKTtcbiAgICAgICAgaXNJbldvcmQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gdGFsbHkgdXAgYWxsIHRoZSBmaWxsZWQgaW4gYmxhbmtzXG4gICAgICBpZihsaXNbaV0uaW5uZXJIVE1MICE9PSAnJm5ic3A7JykgYWxsTGV0dGVyc0ZpbGxlZCsrXG4gICAgfVxuICAgIHJldHVybiB7IGlzSW5Xb3JkLCBpc1dvcmRDb21wbGV0ZWQ6IGFsbExldHRlcnNGaWxsZWQgPT09IHdvcmQubGVuZ3RoIH07XG4gIH07XG5cbiAgY29uc3QgcmVzZXRXb3JkTGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCB3b3JkTGlzdFBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JkLWpzJyk7XG4gICAgY29uc3QgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgbmV3TGlzdC5pZCA9ICd3b3JkX19saXN0LWpzJztcbiAgICB3b3JkTGlzdFBhcmVudC5yZXBsYWNlQ2hpbGQobmV3TGlzdCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmRfX2xpc3QtanMnKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldCgnaGFuZ21hbicsICcnKTtcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICByZW5kZXJXb3JkTGlzdCxcbiAgICB1cGRhdGVXb3JkTGlzdCxcbiAgICByZXNldFdvcmRMaXN0LFxuICB9O1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdvcmQ7XG4iXX0=
