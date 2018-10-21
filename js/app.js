// Global variables
const tileWidth = 101;
const tileHeight = 83;
const tilePaddingY = 20;
const playerStartRow = 6;
const playerStartColumn = 3;
const numberOfRows = 6;
const numberOfColumns = 5;
const numberOfGrassRows = 2;


// Enemies our player must avoid
class Enemy {
    constructor(row, startXPos, speed) {
        // Load the image/sprite 
        this.sprite = 'images/enemy-bug.png';
        // Set the initial location
        this.currentRow = row;
        this.startXPos = startXPos;   
        this.xPos = startXPos;
        
        this.speed = speed;       
    }
    
    // Update the enemy's position 
    update(dt) {
        // Enemy moves until off screen, then resets its position
        if (this.xPos < numberOfColumns * tileWidth) {
            this.xPos += this.speed * dt;
        } else {
            this.xPos = this.startXPos;
        }
        
        this.yPos = (tileHeight * (this.currentRow - 1)) - tilePaddingY;  // padding for centering   
    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
    }
};


// Player
class Player {
    constructor() {
        // Load the image/sprite
        this.sprite = 'images/char-princess-girl.png';
        // Set the initial location        
        this.currentRow = playerStartRow;
        this.currentColumn = playerStartColumn;
        // Set the victory state
        this.victory = false;
    }

    // Update the player's position
    update() {
        this.xPos = tileWidth * (this.currentColumn - 1);
        this.yPos = (tileHeight * (this.currentRow - 1)) - tilePaddingY;  // padding for centering   
    }

    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
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
        if (this.currentColumn < numberOfColumns) {
            this.currentColumn += 1;
        }
    }

    moveDown() {
        if (this.currentRow < numberOfRows) {
            this.currentRow += 1;
        }
    }

}

// Instantiation of player and 3 enemies
let player = new Player();    
const allEnemies = [];
for (let i = 2; i <= numberOfRows - numberOfGrassRows; i++) {
    const startXPos = -i*tileWidth;
    const randomSpeed = Math.floor(Math.random()*401)+100;  // random speed between 100 and 500
    const bug = new Enemy(i, startXPos, randomSpeed);
    allEnemies.push(bug);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
