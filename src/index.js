class Game {
   constructor(cards) {
      this.allCards = cards;
      this.currentCards = []
   }

   initBoard() {
      let $wrapper = document.querySelector('#game');
      $wrapper.innerHTML = null; // Clean content
      (this.allCards.concat(this.allCards))
         .sort(_ => Math.random() - 0.5)
         .map(e => {
            let div = document.createElement('div');
            div.setAttribute('data-id', e);
            $wrapper.appendChild(div);
         })
   }

   // Handle click
   handleCard(card, evt) {
      // Si ya tiene la clase .selected ignorar
      if (evt.target.className === 'selected') {
         return;
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

   // Evaluate game
   evaluateGame() {
      setTimeout(_ => {
         if (this.currentCards[0] === this.currentCards[1]) {
            this.hiddenCardsSelected();
         }
         this.resetCardsSelected();
         this.currentCards = [];
         this.evaluateEndGame();
      }, 500);
   }


   // Restaurar cards selccionados
   resetCardsSelected() {
      let $cards = document.querySelectorAll('#game div');
      $cards.forEach(div => {
         div.classList.remove('selected');
         div.innerHTML = '';
      });
   }

   // Ocultar cards seleccionados
   hiddenCardsSelected() {
      document.querySelectorAll('.selected').forEach(div => {
         div.classList.add('hidden');
      });
   }

   evaluateEndGame() {
      let hiddenCards = document.querySelectorAll('.hidden');
      if (hiddenCards.length === this.allCards.length * 2) {
         document.querySelector('#start').style.display = 'block';
      }
   }

}

// Star game
let levels = {
   1: ['0', '1'],
   2: ['<', '#', '0'],
   3: ['<', '#', '0', '1', '{', '=']
};
let gameMemory = new Game(levels[1]);

function handleStartGame() {
   gameMemory.initBoard();
   document.querySelector('#start').style.display = 'none';
   // EventListener
   document.querySelectorAll('#game div').forEach(card => {
      card.addEventListener('click', evt => {
         gameMemory.handleCard(card, evt);
      })
   })
}