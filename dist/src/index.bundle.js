(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const Intro = require('./js/intro.js');
const Game = require('./js/game.js');

Intro.init();
Game.init();

},{"./js/game.js":2,"./js/intro.js":3}],2:[function(require,module,exports){
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
    if(updatedList.allLettersFilled) Render.showWinner();
    else if(updatedList.isInWord) state.correctLetters.push(guess)
    else {
      state.wrongLetters.push(guess);
      Render.renderWrongLetters(state.wrongLetters)
      state.guesses--
      Render.renderRemainingGuesses(state.guesses)
    }
    guessInput.value = '';
  }

  const reset = () => {
    resetState.wrongLetters = [];
    resetState.correctLetters = [];
    state = Object.assign({}, resetState);
    document.getElementById('intro-js').style.display = 'initial';
    Word.resetWordList();
    console.log(state);
    Render.renderWrongLetters(state.wrongLetters)
  }
  return {
    addWord(word) {
      state.word = word;
      Word.renderWordList(state.word);
    },
    init() {
      const guessButton = document.getElementById('guess__button-js');
      guessButton.addEventListener('click', addGuess);
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

},{"./game.js":2}],4:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvanMvZ2FtZS5qcyIsInNyYy9qcy9pbnRyby5qcyIsInNyYy9qcy9yZW5kZXIuanMiLCJzcmMvanMvd29yZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgSW50cm8gPSByZXF1aXJlKCcuL2pzL2ludHJvLmpzJyk7XG5jb25zdCBHYW1lID0gcmVxdWlyZSgnLi9qcy9nYW1lLmpzJyk7XG5cbkludHJvLmluaXQoKTtcbkdhbWUuaW5pdCgpO1xuIiwiY29uc3QgUmVuZGVyID0gcmVxdWlyZSgnLi9yZW5kZXIuanMnKTtcbmNvbnN0IFdvcmQgPSByZXF1aXJlKCcuL3dvcmQuanMnKTtcblxuY29uc3QgR2FtZSA9ICgoKSA9PiB7XG4gIGNvbnN0IHJlc2V0U3RhdGUgPSB7XG4gICAgd29yZDogJycsXG4gICAgZ3Vlc3NlczogMTAsXG4gICAgd3JvbmdMZXR0ZXJzOiBbXSxcbiAgICBjb3JyZWN0TGV0dGVyczogW10sXG4gIH1cblxuICBsZXQgc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCByZXNldFN0YXRlKTtcblxuICBjb25zdCBhZGRHdWVzcyA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGd1ZXNzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3Vlc3NfX2lucHV0LWpzJyk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBndWVzcyA9IGd1ZXNzSW5wdXQudmFsdWU7XG4gICAgY29uc3QgdXBkYXRlZExpc3QgPSBXb3JkLnVwZGF0ZVdvcmRMaXN0KHN0YXRlLndvcmQsIGd1ZXNzKTtcbiAgICBpZih1cGRhdGVkTGlzdC5hbGxMZXR0ZXJzRmlsbGVkKSBSZW5kZXIuc2hvd1dpbm5lcigpO1xuICAgIGVsc2UgaWYodXBkYXRlZExpc3QuaXNJbldvcmQpIHN0YXRlLmNvcnJlY3RMZXR0ZXJzLnB1c2goZ3Vlc3MpXG4gICAgZWxzZSB7XG4gICAgICBzdGF0ZS53cm9uZ0xldHRlcnMucHVzaChndWVzcyk7XG4gICAgICBSZW5kZXIucmVuZGVyV3JvbmdMZXR0ZXJzKHN0YXRlLndyb25nTGV0dGVycylcbiAgICAgIHN0YXRlLmd1ZXNzZXMtLVxuICAgICAgUmVuZGVyLnJlbmRlclJlbWFpbmluZ0d1ZXNzZXMoc3RhdGUuZ3Vlc3NlcylcbiAgICB9XG4gICAgZ3Vlc3NJbnB1dC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgcmVzZXRTdGF0ZS53cm9uZ0xldHRlcnMgPSBbXTtcbiAgICByZXNldFN0YXRlLmNvcnJlY3RMZXR0ZXJzID0gW107XG4gICAgc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCByZXNldFN0YXRlKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50cm8tanMnKS5zdHlsZS5kaXNwbGF5ID0gJ2luaXRpYWwnO1xuICAgIFdvcmQucmVzZXRXb3JkTGlzdCgpO1xuICAgIGNvbnNvbGUubG9nKHN0YXRlKTtcbiAgICBSZW5kZXIucmVuZGVyV3JvbmdMZXR0ZXJzKHN0YXRlLndyb25nTGV0dGVycylcbiAgfVxuICByZXR1cm4ge1xuICAgIGFkZFdvcmQod29yZCkge1xuICAgICAgc3RhdGUud29yZCA9IHdvcmQ7XG4gICAgICBXb3JkLnJlbmRlcldvcmRMaXN0KHN0YXRlLndvcmQpO1xuICAgIH0sXG4gICAgaW5pdCgpIHtcbiAgICAgIGNvbnN0IGd1ZXNzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2d1ZXNzX19idXR0b24tanMnKTtcbiAgICAgIGd1ZXNzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkR3Vlc3MpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0X19idXR0b24tanMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlc2V0KTtcbiAgICB9XG4gIH07XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTtcbiIsImNvbnN0IEdhbWUgPSByZXF1aXJlKCcuL2dhbWUuanMnKTtcblxuY29uc3QgSW50cm8gPSAoKCkgPT4ge1xuICBjb25zdCB3b3JkQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludHJvX19idXR0b24tanMnKVxuICBjb25zdCBpbnRyb0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRyby1qcycpO1xuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRyb19faW5wdXQtanMnKTtcblxuICBjb25zdCBjcmVhdGVXb3JkID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBHYW1lLmFkZFdvcmQoaW5wdXQudmFsdWUpXG4gICAgaGlkZUludHJvKCk7XG4gIH1cblxuICBjb25zdCBoaWRlSW50cm8gPSAoKSA9PiB7XG4gICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICB3b3JkQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3JlYXRlV29yZCwgdHJ1ZSk7XG4gICAgaW50cm9EaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxuXG5cbiAgcmV0dXJuIHtcbiAgICBpbml0KCkge1xuICAgICAgd29yZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNyZWF0ZVdvcmQpO1xuICAgIH0sXG4gIH1cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW50cm87XG4iLCJjb25zdCBSZW5kZXIgPSAoKCkgPT4ge1xuXG5cbiAgY29uc3Qgc2hvd1dpbm5lciA9ICgpID0+IHtcbiAgICBhbGVydCgnc2hvd1dpbm5lcicpXG4gIH07XG5cbiAgY29uc3QgcmVuZGVyV3JvbmdMZXR0ZXJzID0gKGxldHRlckFycikgPT4ge1xuICAgIGNvbnN0IGxpc3RQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGV0dGVycy1qcycpO1xuICAgIGNvbnN0IG9sZExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGV0dGVyc19fbGlzdC1qcycpO1xuICAgIGNvbnN0IG5ld0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIG5ld0xpc3QuaWQgPSAnbGV0dGVyc19fbGlzdC1qcyc7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGxldHRlckFyci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbGV0dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGxldHRlci5pbm5lckhUTUwgPSBsZXR0ZXJBcnJbaV07XG4gICAgICBuZXdMaXN0LmFwcGVuZENoaWxkKGxldHRlcik7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld0xpc3QpO1xuICAgIGxpc3RQYXJlbnQucmVwbGFjZUNoaWxkKG5ld0xpc3QsIG9sZExpc3QpO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlclJlbWFpbmluZ0d1ZXNzZXMgPSAobnVtYmVyKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2d1ZXNzZXNfX251bWJlci1qcycpLmlubmVySFRNTCA9IG51bWJlcjtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNob3dXaW5uZXIsXG4gICAgcmVuZGVyV3JvbmdMZXR0ZXJzLFxuICAgIHJlbmRlclJlbWFpbmluZ0d1ZXNzZXMsXG4gIH1cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyO1xuIiwiY29uc3QgV29yZCA9ICgoKSA9PiB7XG4gIGNvbnN0IHJlbmRlcldvcmRMaXN0ID0gKHdvcmQpID0+IHtcbiAgICBjb25zdCB3b3JkTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JkX19saXN0LWpzJyk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHdvcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3VuZGVyc2NvcmUnKTtcbiAgICAgIHdvcmRMaXN0LmFwcGVuZChsaSk7XG4gICAgfVxuICB9O1xuICBjb25zdCB1cGRhdGVXb3JkTGlzdCA9ICh3b3JkLCBsZXR0ZXIpID0+IHtcbiAgICBjb25zdCBsaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjd29yZF9fbGlzdC1qcyA+IGxpJyk7XG4gICAgbGV0IGlzSW5Xb3JkID0gZmFsc2U7XG4gICAgbGV0IGFsbExldHRlcnNGaWxsZWQgPSAwO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB3b3JkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZih3b3JkW2ldID09PSBsZXR0ZXIpIHtcbiAgICAgICAgbGlzW2ldLmlubmVySFRNTCA9IHdvcmRbaV07XG4gICAgICAgIGxpc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCd1bmRlcnNjb3JlJyk7XG4gICAgICAgIGlzSW5Xb3JkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiBsaXNbaV0uaW5uZXJIVE1MKVxuICAgICAgLy8gdGFsbHkgdXAgYWxsIHRoZSBmaWxsZWQgaW4gYmxhbmtzXG4gICAgICBpZihsaXNbaV0uaW5uZXJIVE1MICE9PSAnJykgYWxsTGV0dGVyc0ZpbGxlZCsrXG4gICAgfVxuICAgIHJldHVybiB7IGlzSW5Xb3JkLCBpc1dvcmRDb21wbGV0ZWQ6IGFsbExldHRlcnNGaWxsZWQgPT09IHdvcmQubGVuZ3RoIH07XG4gIH07XG5cbiAgY29uc3QgcmVzZXRXb3JkTGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCB3b3JkTGlzdFBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JkLWpzJyk7XG4gICAgY29uc3QgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgbmV3TGlzdC5pZCA9ICd3b3JkX19saXN0LWpzJztcbiAgICB3b3JkTGlzdFBhcmVudC5yZXBsYWNlQ2hpbGQobmV3TGlzdCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmRfX2xpc3QtanMnKSk7XG4gIH07XG4gIHJldHVybiB7XG4gICAgcmVuZGVyV29yZExpc3QsXG4gICAgdXBkYXRlV29yZExpc3QsXG4gICAgcmVzZXRXb3JkTGlzdCxcbiAgfTtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXb3JkO1xuIl19
