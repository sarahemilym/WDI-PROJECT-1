var Game = Game || {};

Game.addListeners = function() {
  $('#start').on('click', Game.inputForm);
  $('#instructions').on('click', Game.instructions);
  $('#removeInstructions').on('click', Game.hideInstructions);
  $('#submit').on('click', Game.newPlayerInput);
  $('li').on('click', function() {
    var element = $(this)[0];
    var index = Game.sequenceGood.indexOf(element);
    Game.sequenceGood.splice(index, 1);
    Game.$lis.push(element);
    Game.sequenceGood.push(Game.$lis[Game.randomSequence()]);
    Game.showSquares();
  });
};

Game.showSquares = function() {
  $('li').off('click');
  $('li').removeClass('good bad');

  for (var i = 0; i < this.sequenceGood.length; i++) {
    $(this.sequenceGood[i]).addClass('good');
  }

  for (var j = 0; j < this.sequenceBad.length; j++) {
    $(this.sequenceBad[j]).addClass('bad');
  }

  setTimeout(function(){
    Game.addListeners();
  }, 200);
};

Game.pickBadSquares = function() {
  for (var i = 0; i < this.badCounter; i++) {
    var random = this.randomSequence();
    var element = this.$lis[random];
    this.sequenceBad.push(element);
    this.$lis.splice(random, 1);
  }
  Game.showSquares();
};

Game.pickGoodSquares = function() {
  for (var i = 0; i < this.goodCounter; i++) {
    var random = this.randomSequence();
    var element = this.$lis[random];
    this.sequenceGood.push(element);
    this.$lis.splice(random, 1);
  }
  this.pickBadSquares();
};

Game.randomSequence = function() {
  return Math.floor(Math.random() * this.$lis.length);
};

// Game.createGrid = function() {
//   for (var i = 0; i < this.gridBase * this.gridBase; i++) {
//     $('ul').append('<li id='+ i +'></li>');
//     // Game.timer();
//   }
//
//   this.$lis = $('li');
//   this.pickGoodSquares();
// };





// track score

function goodOrBad() {  //run in event listeners
  var display = $('#score-counter');
  console.log('clicked');
  if (this.className === 'lightgood') {
    Game.score+=2;
    $('#health').value+=2;
    this.removeAttribute('class', 'lightgood');
  } else if (this.className === 'lightbad') {
    // Game.score-=5;
    $('#health').value-=5;
    this.removeAttribute('class', 'lightbad');
  } else {
    Game.score--;
    $('#health').value--;
  }
  display.innerHTML = Game.score;
}

// countdown timer

Game.timer = function() {
  var sec = 10;
  var timer = setInterval(function() {
    $('#timer').text(sec--);
    if (sec === -2) {       //if 0 seconds the game stops
      clearInterval(timer);
      alert('game over');
    }
  }, 1000);
};

Game.newPlayerInput = function(e) {
  e.preventDefault();
  var newPlayer = $('input').val();
  var score = Game.score;
  $('.scoreboard').append('<li>' + newPlayer + ' ' + score + '</li>');
  $('input').val('');
  $('#inputform').hide();
};

Game.inputForm = function() {
  $('#inputform').show();
};

Game.instructions = function() {
  $('.instructions').show();
};

Game.hideInstructions = function() {
  $('.instructions').hide();
};

Game.setup = function() {
  this.sequenceGood = [];
  this.sequenceBad  = [];
  this.gridBase     = 4;
  this.badCounter   = 2;
  this.goodCounter  = 4;
  this.score        = 0;

  this.createGrid();
  $('#inputform').hide();
  Game.hideInstructions();
};


$(Game.setup.bind(Game));
