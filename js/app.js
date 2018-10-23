/* App.js
 * This file provides the game character classes (superclass Character, child
 * classes Player and Enemy) and defines their methods. The update and render
 * methods are called on the player and enemy objects in the engine.js file,
 * the handleInput method is triggered by a key press event.
 * 
 * This file also instantiates the player and enemy objects and stores the
 * enemies in an Array.
 */


// Global variables defining the game board
const TILE_WIDTH = 101;
const TILE_HEIGHT = 83;
const TILE_PADDING_Y = 20;
const PLAYER_START_ROW = 6;
const PLAYER_START_COLUMN = 3;
const NUMBER_OF_ROWS = 6;
const NUMBER_OF_COLUMNS = 5;
const NUMBER_OF_GRASS_ROWS = 2;

/* This superclass encapsulates properties and methods common to both Enemy 
 * and Player 
 */
class Character {
    constructor(sprite, row) {
        this.sprite = sprite;
        this.currentRow = row;
    }

    update() {
        this.yPos = (TILE_HEIGHT * (this.currentRow - 1)) - TILE_PADDING_Y;  // padding for centering   
    }

    // Draw the character on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
    }

}


/* This class describes the specific properties and methods of the enemies 
 * our player must avoid
*/ 
class Enemy extends Character {
    constructor(row, startXPos, speed) {
        super('images/enemy-bug.png', row);

        this.startXPos = startXPos;   
        this.xPos = startXPos;        
        this.speed = speed;       
    }
    
    /* Update the enemy's position by moving it until off screen, then reset 
     * its position  
     */
    update(dt) {
        super.update();
        
        if (this.xPos < NUMBER_OF_COLUMNS * TILE_WIDTH) {
            this.xPos += this.speed * dt;
        } else {
            this.xPos = this.startXPos;
        }
    }
}


/* 
 * This class describes the specific properties and methods of our player
 */
class Player extends Character {
    constructor() {
        super('images/char-princess-girl.png', PLAYER_START_ROW);

        this.currentColumn = PLAYER_START_COLUMN;
        this.victory = false;
    }

    // Update the player's position
    update() {
        super.update();
        this.xPos = TILE_WIDTH * (this.currentColumn - 1);
    }

    // Handle keyboard input
    handleInput(input) {
        switch(input) {
            case 'left':
                this.moveLeft();
                break;
            case 'up':
                this.moveUp();
                break;
            case 'right':
                this.moveRight();
                break;
            case 'down':
                this.moveDown();
                break;
        }

    }
    moveLeft() {
        if (this.currentColumn > 1) {
            this.currentColumn -= 1;
        }
    }

    moveUp() {
        this.currentRow -= 1;            
        // Winning condition
        if (this.currentRow === 1) {
            this.victory = true;
        }
    }

    moveRight() {
        if (this.currentColumn < NUMBER_OF_COLUMNS) {
            this.currentColumn += 1;
        }
    }

    moveDown() {
        if (this.currentRow < NUMBER_OF_ROWS) {
            this.currentRow += 1;
        }
    }
}

// Instantiation of player and 3 enemies
let player;   
let allEnemies; 
createPlayer();
createEnemies();

function createPlayer() {
    player = new Player();
}

function createEnemies() {   
    allEnemies = [];   // Clear the array
    for (let i = 2; i <= NUMBER_OF_ROWS - NUMBER_OF_GRASS_ROWS; i++) {
        const START_X_POS = -i * TILE_WIDTH;
        const RANDOM_SPEED = Math.floor(Math.random() * 401) + 100; // Random speed between 100 and 500
        const BUG = new Enemy(i, START_X_POS, RANDOM_SPEED);
        allEnemies.push(BUG);
    }
}

/* This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


