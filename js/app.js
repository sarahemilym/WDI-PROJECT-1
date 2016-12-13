// Build a grid (of n size, starting at 4)
// When you click a start button
// Begin flashing squares using two colors
// - Good
// - Bad
// If you click the good square, your health bar increases
// If you click the bad square, your health bar decreases
// When you reach the top of the health bar, you move onto the next level
// Click the start button to begin the new level
// A higher level has smaller squares and more bad squares

var Game = Game || {};

Game.setup = function setup() {
  this.width       = 400;
  this.base        = 4;
  this.maxTime     = 2000;
  this.minTime     = 1000;
  this.baddies     = 2;
  this.goodies     = 4;
  this.score       = 0;
  this.scoreNumber = 0;
  this.correct     = 10;
  this.incorrect   = 5;
  this.empty       = 2;
  this.level       = 1;
  this.buildGame();
};

Game.buildGame = function buildGame() {
  this.$body  = $('body');
  this.$title = $('<h1>ClickyNess</h1>');
  this.$body.prepend(this.$title);
  this.$container = $('.container');
  this.$instructionbutton = $('<button class="instructionbutton" id="instructionbutton">Instructions</button>');
  this.$container.append(this.$instructionbutton);
  this.$scoreDisplay = $('<p class="score">0</p>');
  this.$container.append(this.$scoreDisplay);
  this.$ul    = $('<ul></ul>');
  this.$container.append(this.$ul);
  this.$ul.hide();
  $('.mainMenu').hide();
  this.$scoreDisplay.hide();
  this.$nextLevel = $('.nextLevelPrompt').hide();
  this.$gameOver = $('.gameOverPrompt').hide();
  // $('#mutebutton').on('click', this.muteMusic);
  this.createGrid();
  this.makeInstructions();
  this.makeStartButton();
  this.makeScore();
  this.toMenu();
};

Game.createGrid = function createGrid() {
  this.$ul.empty();
  var i = 0;
  for (i; i < this.base * this.base; i++) {
    var li = $('<li></li>');
    li.css('width', this.width/this.base + 'px');
    li.css('height', this.width/this.base + 'px');
    this.$ul.append(li);
  }
  this.$lis = $('li');
};

Game.makeScore = function makeScore() {
  this.$progress = $('<progress value="30" max="100"></progress>');
  this.$progress.hide();
  this.$container.append(this.$progress);
};

Game.makeInstructions = function makeInstructions() {
  this.$instructions = $('#instructions');
  this.$instructions.hide();
  this.$container.append(this.$instructions);
  this.$instructionbutton.on('click', this.showInstructions);
  $('#closeinstructions').on('click', this.hideInstructions);
};

Game.makeStartButton = function makeStartButton() {
  this.$startButton = $('<button class="start">Start</button>');
  this.$container.append(this.$startButton);
  this.$startButton.on('click', this.start.bind(this));
};

Game.start = function start() {
  this.$ul.show();
  this.$scoreDisplay.show();
  this.$instructionbutton.hide();
  this.$startButton.hide();
  $('.instructions').hide();
  $('.mainMenu').show();
  this.$progress.show();
  this.placeSquares('goodie');
  this.placeSquares('baddie');
  this.$ul.off('click', 'li', this.checkType);
  this.$ul.on('click', 'li', this.checkType);
};

Game.placeSquares = function placeSquares(type) {
  var i = 0;
  var n = (type === 'goodie') ? this.goodies : this.baddies;
  for (i; i < n; i++) {
    this.chooseRandomSquare(type);
  }
};

Game.chooseRandomSquare = function chooseRandomSquare(type) {
  var initialRandomIndex = this.randomIndex();
  var $li = $(this.$lis[initialRandomIndex]);
  if ($li.hasClass('goodie') || $li.hasClass('baddie')) {
    return this.chooseRandomSquare(type);
  } else {
    $li.addClass(type);
    window.setTimeout(function() {
      $li.removeClass(type);
      Game.chooseRandomSquare(type);
    }, this.randomIntFromInterval(this.minTime, this.maxTime));
  }
};

Game.randomIntFromInterval = function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

Game.randomIndex = function randomIndex() {
  return Math.floor(Math.random() * this.$lis.length);
};

Game.checkType = function checkType() {
  if ($(this).hasClass('goodie')) {
    // new Audio('../sounds/ping.mp3').play();
    Game.scoreNumber +=5;
    Game.score += Game.correct;
    $(this).removeClass('goodie');
  } else if ($(this).hasClass('baddie')) {
    Game.score -= Game.incorrect;
    $(this).removeClass('baddie');
  } else {
    Game.scoreNumber -=2;
    Game.score -= Game.empty;
  }
  Game.$scoreDisplay.html(Game.scoreNumber);
  Game.$progress.val(Game.score);
  if (Game.score >= 100) return Game.nextLevelPrompt();
  if (Game.score <= 0) return Game.gameOverPrompt();
};

Game.nextLevelPrompt = function nextLevelPrompt() {
  var $nextLevelPrompt = $('.nextLevelPrompt');
  $nextLevelPrompt.fadeIn(700).delay(1000).fadeOut(700);
  Game.nextLevel();
};

Game.gameOverPrompt = function gameOverPrompt() {
  var $gameOverPrompt = $('.gameOverPrompt');
  $gameOverPrompt.fadeIn(700);       //.delay(5000).fadeOut(700);
  $('#playAgain').on('click', Game.mainMenu);
  Game.over();

  // () {
  //   Game.mainMenu
  // });
};



Game.nextLevel = function() {
  this.stopAllTimeouts();
  this.removeGoodieBaddieClass('goodie');
  this.removeGoodieBaddieClass('baddie');
  this.base      += 1;
  this.maxTime   -= 50;
  this.minTime   -= 50;
  this.level     += 1;
  if (this.level % 3 === 0) {
    this.baddies   += 2;
  }
  this.score     = 0;
  this.$progress.val(20);
  this.$progress.hide();
  this.$startButton.show();
  this.createGrid();
};

Game.over = function over() {
  this.stopAllTimeouts();
  this.removeGoodieBaddieClass('goodie');
  this.removeGoodieBaddieClass('baddie');
  this.width       = 400;
  this.base        = 4;
  this.maxTime     = 2000;
  this.minTime     = 1000;
  this.baddies     = 2;
  this.goodies     = 4;
  this.score       = 0;
  this.scoreNumber = 0;
  this.correct     = 10;
  this.incorrect   = 5;
  this.empty       = 2;
  this.level       = 1;
  this.$scoreDisplay.html('0');
  this.$progress.val(20);
  this.$progress.hide();
  this.$startButton.hide();
  this.createGrid();
};

Game.removeGoodieBaddieClass = function removeGoodieBaddieClass(type) {
  $('ul .' + type).removeClass(type);
};

Game.stopAllTimeouts = function stopAllTimeouts() {
  var id = setTimeout(function() {}, 0);
  while (id--) {
    clearTimeout(id);
  }
};


Game.showInstructions = function showInstructions() {
  console.log('clicked');
  $('#instructions').show();
};

Game.hideInstructions = function hideInstructions() {

  $('#instructions').hide();
};

Game.mainMenu = function mainMenu() {
  console.log('clicked');
  $('.mainMenu').hide();
  $('ul').hide();
  Game.$progress.hide();
  Game.$scoreDisplay.hide();
  Game.$instructionbutton.show();
  Game.$startButton.show();
  Game.over();
};

Game.toMenu = function toMenu() {
  $('.mainMenu').on('click', Game.mainMenu);
};

Game.mainMenu = function mainMenu() {
  $('.mainMenu').hide();
  $('.gameOverPrompt').hide();
  $('ul').hide();
  Game.$progress.hide();
  Game.$scoreDisplay.hide();
  Game.$instructionbutton.show();
  Game.over();
  $('.start').show();
};

Game.muteMusic = function muteMusic() {
  console.log('clicked');
  // $('audio').each(function() {
  //   $(this).pause();
  // });
  // $('audio').each(function(){
  // $(this).volume = 0.0;

};

$(Game.setup.bind(Game));
