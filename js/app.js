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
  Game.squares = document.getElementsByTagName('li');
  Game.chooseGoodSequence();
  Game.chooseBadSequence();
};


Game.chooseGoodSequence = function() {
  for (var i = 0; i < Game.sequenceGoodLength; i++) {
    var randomIndex = Game.randomSequence();
    Game.sequenceGood.push(Game.sequenceArray[randomIndex]);
    Game.sequenceArray.splice(randomIndex, 1);
    console.log(Game.sequenceArray);
    Game.lightUpGood();
    console.log('Good', Game.sequenceGood);
    // Game.eventListener();
  }
};

Game.chooseBadSequence = function() {
  for (var i = 0; i < Game.sequenceBadLength; i++) {

    var randomIndex = Game.randomSequence();
    Game.sequenceBad.push(Game.sequenceArray[randomIndex]);
    Game.sequenceArray.splice(randomIndex, 1);
    console.log(Game.sequenceArray);
    Game.lightUpBad();
    console.log('Bad', Game.sequenceBad);
    // Game.eventListener();
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

// event listeners - if x clicked scorecounter++ if y clicked scorecounter-5
// Game.addListeners = function() {


Game.lightsClicked = function() {
  for (var i = 0; i < Game.squares.length; i++) {
    Game.squares[i].addEventListener('click', goodOrBad);
  }
};

Game.lightsClicked();


function goodOrBad() {
  var display = document.querySelector('#score-counter');
  console.log('clicked');
  if (this.className === 'lightgood') {
    Game.score++;
    console.log(Game.score);
  } else if (this.className === 'lightbad') {
    Game.score-=5;
    console.log(Game.score);
  } else {
    Game.score--;
    console.log(Game.score);
  }
  display.innerHTML = Game.score;
}


// remove the attribute


// $('li').on('click', function() {
//   var $lis = $(this).parent().children();
//   for (var i = 0; i < lis.length; i++) {
//     $($lis[i]).fadeOut(300*i+1);
//   }
// });

// setTimeout(function() {
//   for (var i = 0; i < Game.squares.length; i++) {
// //   Game.squares[Game.sequenceGood[i]].removeAttribute('class', 'lightgood');
// // }, 2000);
//   Game.squares[Game.sequenceBad[i]].removeAttribute('class', 'lightgood');
// }, 2000);
// console.log('removed good');
// }


Game.start = function() {
  Game.createGrid();

};
document.addEventListener('DOMContentLoaded', Game.start);
