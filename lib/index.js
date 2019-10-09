"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(cards, maxLevel) {
    _classCallCheck(this, Game);

    this.cards = cards;
    this.currentCards = [];
    this.maxLevel = maxLevel;
  }
  /**
   * Crate cards from array
   */


  _createClass(Game, [{
    key: "initBoard",
    value: function initBoard() {
      var $wrapper = document.querySelector('#game');
      $wrapper.removeAttribute('class');
      $wrapper.classList.add("game");
      $wrapper.classList.add("type-".concat(this.cards.length));
      $wrapper.innerHTML = null; // Clean content

      this.cards.concat(this.cards).sort(function (_) {
        return Math.random() - 0.5;
      }).map(function (e) {
        var div = document.createElement('div');
        div.setAttribute('data-id', e);
        $wrapper.appendChild(div);
      });
    }
    /**
     * Click to single card
     * @param {Element} card Card selected
     * @param {Object} evt
     */

  }, {
    key: "handleCard",
    value: function handleCard(card, evt) {
      if (evt.target.className === 'selected') {
        return; // Si ya tiene la clase .selected ignorar
      }

      var dataId = evt.currentTarget.getAttribute('data-id');
      this.currentCards.push(dataId);

      if (this.currentCards.length <= 2) {
        card.classList.add('selected');
        card.innerHTML = dataId;
      }

      if (this.currentCards.length === 2) {
        this.evaluateGame(this.currentCards);
      }
    }
    /**
     * Evaluate game with 2 cards selected
     */

  }, {
    key: "evaluateGame",
    value: function evaluateGame() {
      var _this = this;

      setTimeout(function (_) {
        if (_this.currentCards[0] === _this.currentCards[1]) {
          document.querySelectorAll('.selected').forEach(function (div) {
            div.classList.add('hidden');
          });
        }

        _this.resetCardsSelected();

        _this.evaluateEndGame();
      }, 500);
    }
    /**
     * Restore all cards
     */

  }, {
    key: "resetCardsSelected",
    value: function resetCardsSelected() {
      this.currentCards = [];
      document.querySelectorAll('#game div').forEach(function (div) {
        div.classList.remove('selected');
        div.innerHTML = '';
      });
    }
    /**
     * End game?
     */

  }, {
    key: "evaluateEndGame",
    value: function evaluateEndGame() {
      var $hiddenCards = document.querySelectorAll('.hidden');

      if ($hiddenCards.length === this.cards.length * 2) {
        document.querySelector('#start').style.display = 'block';
        var currentLevel = Number(localStorage.getItem('level'));

        if (currentLevel < this.maxLevel) {
          localStorage.setItem('level', currentLevel + 1);
          document.querySelector('#startButton').innerHTML = "Nivel ".concat(currentLevel + 1);
        } else {
          document.querySelector('#startButton').setAttribute('disabled', 'true');
          document.querySelector('#startButton').innerHTML = "Eres un ducho!";
        }
      }
    }
  }]);

  return Game;
}(); // Star game


var levels = {
  1: ['0', '1'],
  2: ['<', '#', '0', '1'],
  3: ['<', '#', '0', '1', '{', '='],
  4: ['<', '#', '0', '1', '{', '=', '>', '}'],
  5: ['<', '#', '0', '1', '{', '=', '>', '}', '*', ':'],
  6: ['<', '#', '0', '1', '{', '=', '>', '}', '*', ':', '?', '|']
};

function handleStartGame() {
  var level = localStorage.getItem('level') || '1';
  var gameMemory = new Game(levels[level], Object.keys(levels).length);
  localStorage.setItem('level', level);
  gameMemory.initBoard();
  document.querySelector('#start').style.display = 'none'; // EventListener

  document.querySelectorAll('#game div').forEach(function (card) {
    card.addEventListener('click', function (evt) {
      gameMemory.handleCard(card, evt);
    });
  });
}

function handleResetGame() {
  localStorage.removeItem('level');
}