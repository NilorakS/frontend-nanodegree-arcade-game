// Global variables
const tileWidth = 101;
const tileHeight = 83;
const tilePaddingY = 20;
const playerStartRow = 6;
const playerStartColumn = 3;
const numberOfRows = 6;
const numberOfColumns = 5;



// Enemies our player must avoid
class Enemy {
    constructor(initXPos, yPos, speed) {
        // Load the image/sprite 
        this.sprite = 'images/enemy-bug.png';
        // Set the horizontal step size
        this.stepX = 101;
        // Set the movement radius
        this.boundary = this.stepX*5;
        // Set the speed
        this.speed = speed;
        // Set the initial location
        this.initXPos = initXPos;
        this.xPos = this.initXPos;
        this.yPos = yPos-20;    // 20 px padding for centering
        
    }
    
    // Update the enemy's position 
    update(dt) {
        // Enemy moves until off screen
        if(this.xPos < this.boundary) {
            this.xPos += this.speed*dt;
        } 
        // Then reset its position
        else {
            this.xPos = this.initXPos;
        }
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

// Instantiation of player and enemies
let player = new Player();    
const allEnemies = [];
// 3 enemies with random speed between 100 and 500
for (let i = 1; i <= 3; i++) {
    const bug = new Enemy(-i*101, i*83, Math.floor(Math.random()*401)+100);
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
