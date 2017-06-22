(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const Intro = require('./js/intro.js');

Intro.init();

},{"./js/intro.js":2}],2:[function(require,module,exports){
const Intro = (() => {
  const button = document.getElementById('intro__button-js');
  const form = document.getElementById('intro__form-js');
  const input = document.getElementById('intro__input-js');

  const createErrorMessage = (event, message) => {
    event.preventDefault();
    const previousError = document.getElementById('intro__error-js');
    if (previousError) {
      previousError.innerHTML = message;
    } else {
      const span = document.createElement('span');
      span.id = 'intro__error-js';
      span.innerHTML = message;
      form.appendChild(span);
    }
    input.value = '';
  };

  const createWord = (event) => {
    if (input.value.length === 0) {
      createErrorMessage(event, 'Please enter a word');
    } else if (input.value.length > 18) {
      createErrorMessage(event, 'Please enter a word less than 18 characters');
    } else {
      localStorage.setItem('hangman', input.value.toLowerCase());
      input.value = '';
    }
  };

  return {
    init() {
      button.addEventListener('click', createWord);
    },
  };
})();

module.exports = Intro;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvanMvaW50cm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgSW50cm8gPSByZXF1aXJlKCcuL2pzL2ludHJvLmpzJyk7XG5cbkludHJvLmluaXQoKTtcbiIsImNvbnN0IEludHJvID0gKCgpID0+IHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludHJvX19idXR0b24tanMnKTtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRyb19fZm9ybS1qcycpO1xuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRyb19faW5wdXQtanMnKTtcblxuICBjb25zdCBjcmVhdGVFcnJvck1lc3NhZ2UgPSAoZXZlbnQsIG1lc3NhZ2UpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHByZXZpb3VzRXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50cm9fX2Vycm9yLWpzJyk7XG4gICAgaWYgKHByZXZpb3VzRXJyb3IpIHtcbiAgICAgIHByZXZpb3VzRXJyb3IuaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIHNwYW4uaWQgPSAnaW50cm9fX2Vycm9yLWpzJztcbiAgICAgIHNwYW4uaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgfVxuICAgIGlucHV0LnZhbHVlID0gJyc7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlV29yZCA9IChldmVudCkgPT4ge1xuICAgIGlmIChpbnB1dC52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIGNyZWF0ZUVycm9yTWVzc2FnZShldmVudCwgJ1BsZWFzZSBlbnRlciBhIHdvcmQnKTtcbiAgICB9IGVsc2UgaWYgKGlucHV0LnZhbHVlLmxlbmd0aCA+IDE4KSB7XG4gICAgICBjcmVhdGVFcnJvck1lc3NhZ2UoZXZlbnQsICdQbGVhc2UgZW50ZXIgYSB3b3JkIGxlc3MgdGhhbiAxOCBjaGFyYWN0ZXJzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoYW5nbWFuJywgaW5wdXQudmFsdWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQoKSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVXb3JkKTtcbiAgICB9LFxuICB9O1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRybztcbiJdfQ==
