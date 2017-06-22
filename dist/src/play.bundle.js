(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./render.js":2,"./word.js":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
const Game = require('./js/game.js');

Game.init();

},{"./js/game.js":1}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZ2FtZS5qcyIsInNyYy9qcy9yZW5kZXIuanMiLCJzcmMvanMvd29yZC5qcyIsInNyYy9wbGF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBSZW5kZXIgPSByZXF1aXJlKCcuL3JlbmRlci5qcycpO1xuY29uc3QgV29yZCA9IHJlcXVpcmUoJy4vd29yZC5qcycpO1xuXG5jb25zdCBHYW1lID0gKCgpID0+IHtcbiAgY29uc3QgYWxwaGFiZXQgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonLnNwbGl0KCcnKVxuICBjb25zdCByZXNldFN0YXRlID0ge1xuICAgIHdvcmQ6ICcnLFxuICAgIGd1ZXNzZXM6IDgsXG4gICAgdXNlZExldHRlcnM6IGFscGhhYmV0LnNsaWNlKDApLFxuICB9XG5cbiAgbGV0IHN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzZXRTdGF0ZSk7XG5cbiAgY29uc3QgYWRkR3Vlc3MgPSAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGd1ZXNzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3Vlc3NfX2lucHV0LWpzJyk7XG4gICAgY29uc3QgZ3Vlc3MgPSBndWVzc0lucHV0LnZhbHVlO1xuICAgIGNvbnN0IHVwZGF0ZWRMaXN0ID0gV29yZC51cGRhdGVXb3JkTGlzdChzdGF0ZS53b3JkLCBndWVzcyk7XG4gICAgUmVuZGVyLnJlbmRlclVzZWRMZXR0ZXJzKHN0YXRlLnVzZWRMZXR0ZXJzLCBndWVzcylcbiAgICBpZih1cGRhdGVkTGlzdC5pc1dvcmRDb21wbGV0ZWQpIFJlbmRlci5zaG93V2lubmVyKCk7XG4gICAgLy8gd3JvbmcgZ3Vlc3NcbiAgICBlbHNlIGlmICghdXBkYXRlZExpc3QuaXNJbldvcmQpIHtcbiAgICAgIHN0YXRlLmd1ZXNzZXMtLVxuICAgICAgUmVuZGVyLnJlbmRlclJlbWFpbmluZ0d1ZXNzZXMoc3RhdGUuZ3Vlc3NlcylcbiAgICAgIGlmKHN0YXRlLmd1ZXNzZXMgPT09IDApIFJlbmRlci5zaG93TG9zZXIoKTtcbiAgICB9XG4gICAgZ3Vlc3NJbnB1dC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgcmVzZXRTdGF0ZS53cm9uZ0xldHRlcnMgPSBhbHBoYWJldC5zbGljZSgwKTtcbiAgICBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHJlc2V0U3RhdGUpO1xuICAgIFdvcmQucmVzZXRXb3JkTGlzdCgpO1xuICAgIFJlbmRlci5yZW5kZXJXcm9uZ0xldHRlcnMoc3RhdGUudXNlZExldHRlcnMpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXQoKSB7XG4gICAgICAvLyBzdGF0ZS53b3JkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hhbmdtYW4nKTtcbiAgICAgIHN0YXRlLndvcmQgPSAnZml2ZSdcbiAgICAgIGNvbnNvbGUubG9nKHN0YXRlLndvcmQpO1xuICAgICAgV29yZC5yZW5kZXJXb3JkTGlzdChzdGF0ZS53b3JkKTtcbiAgICAgIFJlbmRlci5yZW5kZXJVc2VkTGV0dGVycyhzdGF0ZS51c2VkTGV0dGVycyk7XG4gICAgICBSZW5kZXIucmVuZGVyUmVtYWluaW5nR3Vlc3NlcyhzdGF0ZS5ndWVzc2VzKVxuXG4gICAgICAvLyBhZGQgbGlzdGVuZXJzXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3Vlc3NfX2J1dHRvbi1qcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkR3Vlc3MpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0X19idXR0b24tanMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlc2V0KTtcbiAgICB9XG4gIH07XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTtcbiIsImNvbnN0IFJlbmRlciA9ICgoKSA9PiB7XG5cblxuICBjb25zdCBzaG93V2lubmVyID0gKCkgPT4ge1xuICAgIGFsZXJ0KCdzaG93V2lubmVyJylcbiAgfTtcblxuICBjb25zdCBzaG93TG9zZXIgPSAoKSA9PiB7XG4gICAgYWxlcnQoJ3Nob3dMb3NlcicpXG4gIH07XG5cbiAgY29uc3QgcmVuZGVyVXNlZExldHRlcnMgPSAobGV0dGVyQXJyLCBsZXR0ZXIpID0+IHtcbiAgICBjb25zdCBsaXN0UGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xldHRlcnMtanMnKTtcbiAgICBjb25zdCBvbGRMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xldHRlcnNfX2xpc3QtanMnKTtcbiAgICBjb25zdCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBuZXdMaXN0LmlkID0gJ2xldHRlcnNfX2xpc3QtanMnO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsZXR0ZXJBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG5ld0xldHRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBpZiAobGV0dGVyQXJyW2ldID09PSBsZXR0ZXIpIHtcbiAgICAgICAgbGV0dGVyQXJyW2ldID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0xldHRlci5pbm5lckhUTUwgPSBsZXR0ZXJBcnJbaV07XG4gICAgICB9XG4gICAgICBuZXdMaXN0LmFwcGVuZENoaWxkKG5ld0xldHRlcik7XG4gICAgfVxuICAgIGxpc3RQYXJlbnQucmVwbGFjZUNoaWxkKG5ld0xpc3QsIG9sZExpc3QpO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlclJlbWFpbmluZ0d1ZXNzZXMgPSAobnVtYmVyKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2d1ZXNzZXNfX251bWJlci1qcycpLmlubmVySFRNTCA9IG51bWJlcjtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNob3dXaW5uZXIsXG4gICAgc2hvd0xvc2VyLFxuICAgIHJlbmRlclVzZWRMZXR0ZXJzLFxuICAgIHJlbmRlclJlbWFpbmluZ0d1ZXNzZXMsXG4gIH1cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyO1xuIiwiY29uc3QgV29yZCA9ICgoKSA9PiB7XG4gIGNvbnN0IGRldGVybWluZVdvcmRMaXN0V2lkdGggPSAod29yZCwgd29yZExpc3QpID0+IHtcbiAgICBsZXQgd2lkdGggPSAnMTAwJSc7XG4gICAgY29uc3Qgd2wgPSB3b3JkLmxlbmd0aDtcbiAgICBjb25zb2xlLmxvZyh3bClcbiAgICBzd2l0Y2ggKHdsKSB7XG4gICAgICBjYXNlIDE6IGNhc2UgMjogY2FzZSAzOlxuICAgICAgICB3aWR0aCA9ICc0MCUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDogY2FzZSA1OlxuICAgICAgY29uc29sZS5sb2cod2wpXG4gICAgICAgIHdpZHRoID0gJzUwJSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA2OiBjYXNlIDc6XG4gICAgICAgIHdpZHRoID0gJzYwJSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA4OiBjYXNlIDk6XG4gICAgICAgIHdpZHRoID0gJzc1JSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxMDogY2FzZSAxMTpcbiAgICAgICAgd2lkdGggPSAnOTAlJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB3b3JkTGlzdC5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlcldvcmRMaXN0ID0gKHdvcmQpID0+IHtcbiAgICBjb25zdCB3b3JkTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JkX19saXN0LWpzJyk7XG4gICAgZGV0ZXJtaW5lV29yZExpc3RXaWR0aCh3b3JkLCB3b3JkTGlzdCk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHdvcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3VuZGVyc2NvcmUnKTtcbiAgICAgIGxpLmlubmVySFRNTCA9ICcmbmJzcDsnO1xuICAgICAgd29yZExpc3QuYXBwZW5kKGxpKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHVwZGF0ZVdvcmRMaXN0ID0gKHdvcmQsIGxldHRlcikgPT4ge1xuICAgIGNvbnN0IGxpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyN3b3JkX19saXN0LWpzID4gbGknKTtcbiAgICBsZXQgaXNJbldvcmQgPSBmYWxzZTtcbiAgICBsZXQgYWxsTGV0dGVyc0ZpbGxlZCA9IDA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHdvcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHdvcmRbaV0gPT09IGxldHRlcikge1xuICAgICAgICBsaXNbaV0uaW5uZXJIVE1MID0gd29yZFtpXTtcbiAgICAgICAgbGlzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3VuZGVyc2NvcmUnKTtcbiAgICAgICAgaXNJbldvcmQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gdGFsbHkgdXAgYWxsIHRoZSBmaWxsZWQgaW4gYmxhbmtzXG4gICAgICBpZihsaXNbaV0uaW5uZXJIVE1MICE9PSAnJm5ic3A7JykgYWxsTGV0dGVyc0ZpbGxlZCsrXG4gICAgfVxuICAgIHJldHVybiB7IGlzSW5Xb3JkLCBpc1dvcmRDb21wbGV0ZWQ6IGFsbExldHRlcnNGaWxsZWQgPT09IHdvcmQubGVuZ3RoIH07XG4gIH07XG5cbiAgY29uc3QgcmVzZXRXb3JkTGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCB3b3JkTGlzdFBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3b3JkLWpzJyk7XG4gICAgY29uc3QgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgbmV3TGlzdC5pZCA9ICd3b3JkX19saXN0LWpzJztcbiAgICB3b3JkTGlzdFBhcmVudC5yZXBsYWNlQ2hpbGQobmV3TGlzdCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dvcmRfX2xpc3QtanMnKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldCgnaGFuZ21hbicsICcnKTtcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICByZW5kZXJXb3JkTGlzdCxcbiAgICB1cGRhdGVXb3JkTGlzdCxcbiAgICByZXNldFdvcmRMaXN0LFxuICB9O1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdvcmQ7XG4iLCJjb25zdCBHYW1lID0gcmVxdWlyZSgnLi9qcy9nYW1lLmpzJyk7XG5cbkdhbWUuaW5pdCgpO1xuIl19
