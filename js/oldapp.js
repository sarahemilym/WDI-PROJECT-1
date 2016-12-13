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

Game.sequenceLength     = 6;
Game.sequenceGood       = [];
Game.sequenceBad        = [];
Game.gridBase           = 4;
Game.sequenceGoodLength = 4;
Game.sequenceBadLength  = 2;
Game.width              = 400;
Game.score              = 0;
Game.squares            = [];
Game.sequenceArray      = [];


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
  console.log('sequence', Game.sequenceArray);
  Game.squares = $('li');
  Game.timer();
  Game.chooseGoodSequence();
  Game.chooseBadSequence();
};



Game.chooseGoodSequence = function() {
  for (var i = 0; i < Game.sequenceGoodLength; i++) {
    setInterval(function() {
      if ($('.lightgood').length < Game.sequenceGoodLength) {
        var randomIndex = Game.randomSequence();
        Game.sequenceGood.push(Game.sequenceArray[randomIndex]);
        Game.sequenceArray.splice(randomIndex, 1);
        $(Game.squares[Game.sequenceGood[i]]).attr('class', 'lightgood');
        setTimeout(function() {
          $(Game.squares[Game.sequenceGood[i]]).removeAttr('class', 'lightgood');
        }, 4000);
        // Game.sequenceArray.push(Game.sequenceGood[i]);
      }
    }, 2000);
  }
  console.log('good', Game.sequenceGood);
  Game.lightsClicked();
};


Game.chooseBadSequence = function() {
  for (var i = 0; i < Game.sequenceBadLength; i++) {
    setInterval(function() {
      if ($('.lightbad').length < Game.sequenceBadLength) {
        var randomIndex = Game.randomSequence();
        Game.sequenceBad.push(Game.sequenceArray[randomIndex]);
        Game.sequenceArray.splice(randomIndex, 1);
        $(Game.squares[Game.sequenceBad[i]]).attr('class', 'lightbad');
        setTimeout(function() {
          $(Game.squares[Game.sequenceBad[i]]).removeAttr('class', 'lightbad');
        }, 4000);
        // Game.sequenceArray.push(Game.sequenceBad[i]);
      }
    }, 2000);
  }
  console.log('bad', Game.sequenceBad);
  Game.lightsClicked();
};


Game.randomSequence = function() {
  return Math.floor(Math.random() * Game.sequenceArray.length);
};


// if ($('timer').val() =< 5){
//   $('.timertext').css('color', 'red');   see below for flash
// } else {
//   $('.timertext').css('color', '#8899a6');
// }


// Game.lightUpBad = function() {
//   for (var i = 0; i < Game.sequenceBad.length; i++) {
//     Game.squares[Game.sequenceBad[i]].setAttribute('class', 'lightbad');
//   }
//   Game.lightsClicked();
// };

Game.lightsClicked = function() {
  for (var i = 0; i < Game.squares.length; i++) {
    Game.squares[i].addEventListener('click', goodOrBad);
  }
};

function goodOrBad() {
  var display = $('#score-counter');
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


// countdown timer

Game.timer = function() {
  var sec = 10;
  var timer = setInterval(function() {
    $('#timer').text(sec--);
    if (sec === -2) {
      clearInterval(timer);
      alert('game over');
    }
  }, 1000);
};

//new name


Game.scoreboard = function(newName) {
  return '<p class="name">' + newName.name + '</p><p class="score">' + newName.score + '</p>';
};

var $nameform = $('#new-player');
$nameform.on('submit', function(e) {
  e.preventDefault();
  var newName = {
    name: $('textarea').val(),
    score: 0
  };

  var nameToAdd = Game.scoreBoard(newName);
  var scoreboard = $('.scoreboard');
  scoreboard.prepend(nameToAdd);
});

Game.start = function() {
  $('#start').on('click', Game.createGrid);
};

document.addEventListener('DOMContentLoaded', Game.start);
