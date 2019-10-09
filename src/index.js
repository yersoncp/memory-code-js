class Game {
   constructor(cards, maxLevel) {
      this.cards = cards;
      this.currentCards = [];
      this.maxLevel = maxLevel;
   }

   /**
    * Crate cards from array
    */
   initBoard() {
      let $wrapper = document.querySelector('#game');
      $wrapper.removeAttribute('class');
      $wrapper.classList.add(`game`);
      $wrapper.classList.add(`type-${this.cards.length}`);
      $wrapper.innerHTML = null; // Clean content
      (this.cards.concat(this.cards))
         .sort(_ => Math.random() - 0.5)
         .map(e => {
            let div = document.createElement('div');
            div.setAttribute('data-id', e);
            $wrapper.appendChild(div);
         })
   }
   
   /**
    * Click to single card
    * @param {Element} card Card selected
    * @param {Object} evt
    */
   handleCard(card, evt) {
      if (evt.target.className === 'selected') {
         return; // Si ya tiene la clase .selected ignorar
      }
      let dataId = evt.currentTarget.getAttribute('data-id');
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
   evaluateGame() {
      setTimeout(_ => {
         if (this.currentCards[0] === this.currentCards[1]) {
            document.querySelectorAll('.selected').forEach(div => {
               div.classList.add('hidden');
            });
         }
         this.resetCardsSelected();
         this.evaluateEndGame();
      }, 500);
   }

   /**
    * Restore all cards
    */
   resetCardsSelected() {
      this.currentCards = [];
      document.querySelectorAll('#game div').forEach(div => {
         div.classList.remove('selected');
         div.innerHTML = '';
      });
   }

   /**
    * End game?
    */
   evaluateEndGame() {
      let $hiddenCards = document.querySelectorAll('.hidden');
      if ($hiddenCards.length === this.cards.length * 2) {
         document.querySelector('#start').style.display = 'block';
         let currentLevel = Number(localStorage.getItem('level'));
         if (currentLevel < this.maxLevel) {
            localStorage.setItem('level', currentLevel + 1);
            document.querySelector('#startButton').innerHTML = `Nivel ${currentLevel + 1}`
         } else {
            document.querySelector('#startButton').setAttribute('disabled', 'true');
            document.querySelector('#startButton').innerHTML = `Eres un ducho!`
         }
      }
   }

}

// Star game
let levels = {
   1: ['0', '1'],
   2: ['<', '#', '0', '1'],
   3: ['<', '#', '0', '1', '{', '='],
   4: ['<', '#', '0', '1', '{', '=', '>', '}'],
   5: ['<', '#', '0', '1', '{', '=', '>', '}', '*', ':'],
   6: ['<', '#', '0', '1', '{', '=', '>', '}', '*', ':', '?', '|']
};

function handleStartGame() {
   let level = localStorage.getItem('level') || '1';
   let gameMemory = new Game(levels[level], Object.keys(levels).length);
   localStorage.setItem('level', level);
   gameMemory.initBoard();
   document.querySelector('#start').style.display = 'none';
   // EventListener
   document.querySelectorAll('#game div').forEach(card => {
      card.addEventListener('click', evt => {
         gameMemory.handleCard(card, evt);
      })
   })
}

function handleResetGame() {
   localStorage.removeItem('level');
}