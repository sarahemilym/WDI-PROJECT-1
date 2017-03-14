![ga](https://cloud.githubusercontent.com/assets/20629455/23824362/2c9817c2-066d-11e7-8988-7b1eefc6d628.jpg)
![wdi](https://cloud.githubusercontent.com/assets/20629455/23824363/2ddeaa7e-066d-11e7-8630-f7c890c9f1c1.png)

___
<br>

## Klick It!

#### A twist on the classic whack-a-mole

[Play the game here!](https://klickit.herokuapp.com/) (need to link this to heroku)

![image](https://cloud.githubusercontent.com/assets/23199168/23898593/6b925d3c-08a9-11e7-89e1-07d9003f3e2b.png)

##### Rules:

1. Coloured squares will appear on the board at random
2. Clicking blue squares will increase your life by 10pts and your score by 5pts
3. Be careful not to click on red squares - your score won't change by you will lose 5pts of life
4. Clicking on empty squares will affect both your life and your score by -2pts
5. Fill your life bar to proceed to the next level
6. If your life falls to 0 the game is over

![image](https://cloud.githubusercontent.com/assets/23199168/23898677/d5313e16-08a9-11e7-8bba-b1bca7cf79e7.png)


##### How it works:
The board is built in JavaScript, starting with 4 blue squares and 2 red squares. A random square appears on the board whenever the number of 'good' squares showing is less than 4, and the number of 'bad' squares showing is less than 2. Every time a square is clicked on the class is removed and so becomes an 'empty' square, and a new coloured square will appear at random, with the score increasing and decreasing accordingly. Squares are also on a timer to disappear if not clicked between 1 and 2 seconds.
Each time the user reaches a new level the board base size increases by 1, so from 4x4 to 5x5 to 6x6 etc. The amount of time that the squares appear for also decreases by 50ms.
When the game is over the whole board is reset.

##### The build:
* HTML, CSS & jQuery
* I used object-oriented programming for this project

##### Problems & Challenges:

The main challenge I faced with this project was getting the squares to constantly change, and only one at a time. Initially I chose 4 (or 2 for bad) squares at random and they would all change when one had been clicked. I overcame this by instead decidigng to only choose the squares one at a time, chosing a random square index and only filling it if it did not already have a class, and setting a timeout on the square so that it would disappear even if it wasn't clicked.

