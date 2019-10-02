let currentCards = [];
let allCards = ['<', '*', '>', '#', '0', '1', '{', '}', '=', '!'];

function initBoard(arr) {
   let $wrapper = document.querySelector('.game');
   $wrapper.innerHTML = null;
   let _arr = arr.concat(arr);
   while (_arr.length > 0) {
      // Seleccionar un element aleatorio de _arr
      let _rand = Math.floor(Math.random() * _arr.length);

      // Crear un elemento y añadir a $wrapper
      let div = document.createElement('div');
      div.setAttribute('data-id', _arr[_rand]);
      $wrapper.appendChild(div);

      // Remover el element de _arr
      _arr.splice(_rand, 1);
   }
};

function startGame() {
   initBoard(allCards);
   document.querySelector('#start').style.display = 'none';

   // EventListener
   let $cards = document.querySelectorAll('.game div');
   $cards.forEach(card => {
      card.addEventListener('click', evt => {
         handleCard(card, evt);
      })
   })
};



// Handle click
function handleCard(card, evt) {

   // Si ya tiene la clase .selected ignorar
   if (evt.target.className === 'selected') {
      return;
   }

   let dataId = evt.currentTarget.getAttribute('data-id');
   currentCards.push(dataId);

   if (currentCards.length <= 2) {
      card.classList.add('selected');
      card.innerHTML = dataId;
   }

   if (currentCards.length === 2) {
      evaluateGame(currentCards);
   }
}

// Evaluate game
function evaluateGame(_currentCards) {
   setTimeout(_ => {
      if (_currentCards[0] === _currentCards[1]) {
         hiddenCardsSelected();
      }
      resetCardsSelected();
      currentCards = [];
      evaluateEndGame();
   }, 500);
}

// Restaurar cards selccionados
function resetCardsSelected() {
   let $cards = document.querySelectorAll('.game div');
   $cards.forEach(div => {
      div.classList.remove('selected');
      div.innerHTML = '';
   });
}

// Ocultar cards seleccionados
function hiddenCardsSelected() {
   document.querySelectorAll('.selected').forEach(div => {
      div.classList.add('hidden');
   });
}

function evaluateEndGame() {
   let hiddenCards = document.querySelectorAll('.hidden');
   if (hiddenCards.length === allCards.length * 2) {
      document.querySelector('#start').style.display = 'block';
   }
}