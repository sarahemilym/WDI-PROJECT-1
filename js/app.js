// leaderboard - when user types in name it is stored in the leaderboard
// object for the leader board
// {playerName: $('textarea'),
//  leaderBoardScore: 'score'}

// if name === name and their leaderboard score is more than the current score,
// then leaderBoardScore.val is current score

// make the timer go red from 5 seconds..

// if ($('timer').val() =< 5){
//   $('.timertext').css('color', 'red');   see below for flash
// } else {
//   $('.timertext').css('color', '#8899a6');
// }


// flashing text (something like this)
// function flash() {
//     var text = document.getElementById('foo');
//     text.style.color = (text.style.color=='red') ? 'green':'red';
// }
// var clr = setInterval(flash, 1000);


// Basic game code

// create a 4X4 grid

// computer chooses sequence at random

// either object x(blue for now), or object y(red for now)

// event listeners - if x clicked scorecounter++ if y clicked scorecounter-5

// display score in #score-counter

// display timer, when timer gets to 0 alert that round is over

// $(start);
//
// function start() {

var Game = Game || {};

Game.sequenceGood   = [];
Game.sequenceBad    = [];
Game.gridBase       = 4;
Game.sequenceGoodLength = 4;
Game.sequenceBadLength = 2;
Game.width          = 400;
Game.score          = 0;
Game.squares = [];
Game.sequenceArray = [];


// Game.eventListener = function();


// create a 4X4 grid
Game.createGrid = function() {
  var body = document.getElementsByTagName('body')[0];
  var grid = document.createElement('ul');
  body.appendChild(grid);
  for (var i = 0; i < Game.gridBase*Game.gridBase; i++) {
    var square = document.createElement('li');
    square.style.width = Game.width / Game.gridBase + 'px';
    square.style.height = Game.width / Game.gridBase + 'px';
    grid.appendChild(square);
    Game.sequenceArray.push(i);
  }
  Game.squares = $('li');
  Game.chooseGoodSequence();
  Game.chooseBadSequence();
};

// make squares slide up

Game.chooseGoodSequence = function() {
  for (var i = 0; i < Game.sequenceGoodLength; i++) {
    var randomIndex = Game.randomSequence();
    Game.sequenceGood.push(Game.sequenceArray[randomIndex]);
    Game.sequenceArray.splice(randomIndex, 1);
    console.log(Game.sequenceArray);
    Game.lightUpGood();
    console.log('Good', Game.sequenceGood);
  }
};

Game.chooseBadSequence = function() {
  while (Game.sequenceBad.length < 2) {
    setInterval(function(){
      for (var i = 0; i < Game.sequenceBadLength; i++) {
        var randomIndex = Game.randomSequence();
        Game.sequenceBad.push(Game.sequenceArray[randomIndex]);
        Game.sequenceArray.splice(randomIndex, 1);
        console.log(Game.sequenceArray);
        Game.lightUpBad();
        console.log('Bad', Game.sequenceBad);
        // Game.eventListener();
      }
    }, 2000);
  }
};

Game.randomSequence = function() {
  return Math.floor(Math.random() * Game.sequenceArray.length);
};

Game.lightUpGood = function() {
  for (var i = 0; i < Game.sequenceGood.length; i++) {
    Game.squares[Game.sequenceGood[i]].setAttribute('class', 'lightgood');
  }
  Game.lightsClicked();

};

Game.lightUpBad = function() {
  for (var i = 0; i < Game.sequenceBad.length; i++) {
    Game.squares[Game.sequenceBad[i]].setAttribute('class', 'lightbad');
  }

  Game.lightsClicked();

};

// function slideUp() {
//   for (var i = 0; i < $('.lightgood').length + $('.lightbad').length; i++) {
//     Game.squares[Game.sequenceGood[i]].slideUp(500);
//     Game.squares[Game.sequenceBad[i]].slide(500);
//   }
// }

// event listeners - if x clicked scorecounter++ if y clicked scorecounter-5
// Game.addListeners = function() {


Game.lightsClicked = function() {
  for (var i = 0; i < Game.squares.length; i++) {
    Game.squares[i].addEventListener('click', goodOrBad);
  }
};

// Game.lightsClicked();


function goodOrBad() {
  var display = document.querySelector('#score-counter');
  console.log('clicked');
  if (this.className === 'lightgood') {
    Game.score+=2;
    this.removeAttribute('class', 'lightgood');
  } else if (this.className === 'lightbad') {
    Game.score-=5;
    this.removeAttribute('class', 'lightbad');
  } else {
    Game.score--;
  }
  display.innerHTML = Game.score;
}


// refill array

// function refillArray() {
// while (Game.sequenceGood.length < Game.sequenceGoodLength.length) {
//   var randomIndex = Game.randomSequence()[0];
//   Game.sequenceGood.push(Game.sequenceArray[randomIndex]);
//   Game.sequenceArray.splice(randomIndex, 1);
//   console.log(Game.sequenceArray);
//   Game.lightUpGood();
// }
// }

// remove the attribute
// $('.lightgood').fadeOut('swing', function () {
// function timeOut() {
//       $('.lightgood').setTimeout(function() {
//           Game.sequenceBad.removeAttribute();
//         }
//       });



//
//

Game.start = function() {
  $('#start').on('click', Game.createGrid);
};

// Game.start = function() {
//   Game.createGrid();
//
// };

document.addEventListener('DOMContentLoaded', Game.start);
