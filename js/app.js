"use strict";

let modal = document.querySelector('#modal');
let playAgain = document.querySelector('.playAgain'); 


class Entity {
    constructor() {
        this.sprite = 'images/'; 
    }

    // Draw the entity on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }

    checkCollisions(character) {
        if (this.y === character.y) {
            if (this.x >= character.x - 0.5 && this.x <= character.x + 0.5) {
                return true;
            }
        }
        else {
            return false;
        }
    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Entity {
    constructor() {
        super();
        this.sprite += 'char-boy.png'
        // this.win = false; check if you need it
        this.x = 2;
        this.y = 5;
    }

    handleInput(input) {
        switch(input) {
            case 'left':
                this.x = this.x > 0 ? this.x - 1 : this.x;
                break;
            case 'up':
                this.y = this.y > 0 ? this.y - 1 : this.y;
                break;
            case 'right':
                this.x = this.x < 4 ? this.x + 1 : this.x;
                break;
            case 'down':
                this.y = this.y < 5 ? this.y + 1 : this.y;
                break;
            default:
                break;
        }
    }

    render() {
        super.render();
    }

    checkWin() { 
        // Check if player reached the water              
        if (this.y < 1) {
            return true;
        }
        else {
            return false;
        }
    }
}

// Enemies our player must avoid
   // Variables applied to each of our instances go here
class Enemy extends Entity {
    constructor(x, y, speed) {
        super();
        this.sprite += 'enemy-bug.png';
        this.speed = Math.random() * (5 - 2) + 2;
        this.x = x;
        this.y = y;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) { 
        if (this.x < 5) {
            // Update the enemy's position, required method for game
            // Parameter: dt, a time delta between ticks
            this.x += this.speed * dt;
        }
        else {
            this.x = -1;;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const allEnemies = [...Array(3)].map((_,i)=> new Enemy(0,i+1)); 

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
 

