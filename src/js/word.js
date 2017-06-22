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
