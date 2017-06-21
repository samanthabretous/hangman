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
