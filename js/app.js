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
        // Set the horizontal and vertical step size
        this.stepX = 101;
        this.stepY = 83;
        // Set the initial location
        this.initXPos = this.stepX*2;
        this.initYPos = (this.stepY*5)-10;  // 10 px padding for centering
        this.xPos = this.initXPos;
        this.yPos = this.initYPos;
    }

    // Update the player's position
    update() {
        // can be similar to the one for the Enemy

        // Check for collision with enemy (same xPos && yPos)

        // Check for victory (xPos && yPos == final tiles)
    }

    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
    }

    // Handle keyboard input
    handleInput(input) {
        switch(input) {
            case 'left':
                if(this.xPos > 0) {
                    this.xPos -= this.stepX;
                }
                break;
            case 'up':
                if (this.yPos > this.stepY) {
                    this.yPos -= this.stepY;
                }
                break;
            case 'right':
                if (this.xPos < this.stepX*4) {
                    this.xPos += this.stepX;
                }
                break;
            case 'down':
                if (this.yPos < this.stepY*4) {
                    this.yPos += this.stepY;
                }
                break;
        }

    }

    // Reset position in case of collision or victory
}

// Instantiation of player and enemies
const player = new Player();    
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
