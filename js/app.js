let debug = false;
let game = true;

// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.height = 65;
    this.width = 95;
};


Enemy.prototype.update = function(dt) {
    this.x += 150 * dt;

    if (this.x > ctx.canvas.width + this.width){
      this.x = -200 * Math.floor(Math.random() * 4) + 1;
    } else {
      this.x += 150 * dt;
    }

    // check Collisions
    if (collision(player.x, player.y, player.width, player.height, player.height, this.x, this.y, this.width, this.height)) {
      this.collision = true;

      if (player) {
        player.x = 202;
        player.y = 400;
      }
    } else {
      this.collision = false;
    }
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    enemyBBox(this);
};




// Player Section

var Player = function(x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
  this.height = 75;
  this.width = 65;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function(dt) {

};

Player.prototype.handleInput = function(direction){

    const horizontal = 101,
    vertical = 83;

    if (direction === 'left' && this.x - horizontal >= 0) {
        this.x -= horizontal;
    } else if (direction === 'right' && this.x + horizontal < ctx.canvas.width) {
        this.x += horizontal;
    } else if (direction === 'down' && this.y + vertical < ctx.canvas.height - 200) {
        this.y += vertical;
    } else if (direction === 'up' && this.y - vertical > 0 - player.height) {
        this.y -= vertical;
    }

};



document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});





const enemyPosition = [55, 140, 230];

const player = new Player(202, 400, 'images/char-boy.png');

const allEnemies = enemyPosition.map((y, index) => {
    return new Enemy((-200 * (index +1)), y);
});




// for debugging

function enemyBBox(enemy){

};

function playerBBox(player){

};


function collision(px, py, pw, ph, ex, ey, ew, eh) {
  return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);
}
