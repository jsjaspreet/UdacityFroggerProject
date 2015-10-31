// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += dt*this.speed;

    // Check collision, passing in standardized coordinates
    checkCollision(this.x+10, this.y+20);
    //  If x greater than width of screen, reset x to -xUnitLength
    if(this.x > canvasWidth){
        this.x = -xUnitLength;
    }
};

var checkCollision = function(x, y){
    // Get standardized player coordinates
    var playerX = player.x;
    var playerY = player.y+10;
    if((((x+45).toFixed(0) >= playerX) && ((x-xUnitLength+30).toFixed(0) < playerX)) && y.toFixed(0) == playerY){
        registerCollision();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = xUnitLength*2;
    this.y = yUnitLength*5-10;
    this.score = 0;
    this.speed = 400;
};

// Only update step is to ensure they're not in water
Player.prototype.update = function(dt) {
    if((this.y+10).toFixed(0) == 0){
        registerCollision();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(action) {
    // Only take the action if it is valid
    if(valid(action, this.x, this.y)) {
        if (action == 'left') {
            this.x -= xUnitLength;
        }
        else if (action == 'right') {
            this.x += xUnitLength;
        }
        else if (action == 'up') {
            this.y -= yUnitLength;
        }
        else if (action == 'down') {
            this.y += yUnitLength;
        }
    }
};

// Function validates whether such an action remains within game bounds
var valid = function(action, x, y){
    if(action == 'left' && (x - xUnitLength < 0)){
        return false;
    }
    else if(action == 'right' && (x+xUnitLength>4*xUnitLength)){
        return false;
    }
    else if(action == 'up' && (y-yUnitLength < -yUnitLength)){
        return false;
    }
    else if(action == 'down' && (y+yUnitLength > yUnitLength*5)){
        return false;
    }
    return true;
};

var registerCollision = function(){
    console.log("Detected collision");
    player.x = xUnitLength*2;
    player.y = yUnitLength*5-10;
    player.score -= 50;
};


var yUnitLength = 83;
var xUnitLength = 101;
var canvasWidth = 505;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
//var enemy1 = new Enemy(-xUnitLength, 2*yUnitLength-20, 50);
var enemy2 = new Enemy(-xUnitLength, 3*yUnitLength-20, 120);
//var enemy3 = new Enemy(-xUnitLength, 1*yUnitLength-20, 90);
//var enemy4 = new Enemy(-xUnitLength*4, 1*yUnitLength-20, 120);
//var enemy5 = new Enemy(-xUnitLength*6, 3*yUnitLength-20, 180);

//var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
var allEnemies = [enemy2];




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
