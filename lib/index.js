"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(cards) {
    _classCallCheck(this, Game);

    this.allCards = cards;
    this.currentCards = [];
  }

  _createClass(Game, [{
    key: "initBoard",
    value: function initBoard() {
      var $wrapper = document.querySelector('#game');
      $wrapper.innerHTML = null; // Clean content

      this.allCards.concat(this.allCards).sort(function (_) {
        return Math.random() - 0.5;
      }).map(function (e) {
        var div = document.createElement('div');
        div.setAttribute('data-id', e);
        $wrapper.appendChild(div);
      });
    } // Handle click

  }, {
    key: "handleCard",
    value: function handleCard(card, evt) {
      // Si ya tiene la clase .selected ignorar
      if (evt.target.className === 'selected') {
        return;
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
    } // Evaluate game

  }, {
    key: "evaluateGame",
    value: function evaluateGame() {
      var _this = this;

      setTimeout(function (_) {
        if (_this.currentCards[0] === _this.currentCards[1]) {
          _this.hiddenCardsSelected();
        }

        _this.resetCardsSelected();

        _this.currentCards = [];

        _this.evaluateEndGame();
      }, 500);
    } // Restaurar cards selccionados

  }, {
    key: "resetCardsSelected",
    value: function resetCardsSelected() {
      var $cards = document.querySelectorAll('#game div');
      $cards.forEach(function (div) {
        div.classList.remove('selected');
        div.innerHTML = '';
      });
    } // Ocultar cards seleccionados

  }, {
    key: "hiddenCardsSelected",
    value: function hiddenCardsSelected() {
      document.querySelectorAll('.selected').forEach(function (div) {
        div.classList.add('hidden');
      });
    }
  }, {
    key: "evaluateEndGame",
    value: function evaluateEndGame() {
      var hiddenCards = document.querySelectorAll('.hidden');

      if (hiddenCards.length === this.allCards.length * 2) {
        document.querySelector('#start').style.display = 'block';
      }
    }
  }]);

  return Game;
}(); // Star game


var levels = {
  1: ['0', '1'],
  2: ['<', '#', '0'],
  3: ['<', '#', '0', '1', '{', '=']
};
var gameMemory = new Game(levels[1]);

function handleStartGame() {
  gameMemory.initBoard();
  document.querySelector('#start').style.display = 'none'; // EventListener

  document.querySelectorAll('#game div').forEach(function (card) {
    card.addEventListener('click', function (evt) {
      gameMemory.handleCard(card, evt);
    });
  });
}