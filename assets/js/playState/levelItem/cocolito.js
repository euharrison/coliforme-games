var Cocolito = function(game, play, x, y) {
  x = (x === undefined) ? game.width+225 : x;
  y = (y === undefined) ? game.rnd.integerInRange(play.initialPosition.y, game.height) : y;

  Phaser.Sprite.call(this, game, x, y, 'cocolito');

  this.animations.add('cocolito', [0,1,2], 12, true);
  this.animations.play('cocolito');
  game.add.existing(this);

  this.addBody(game, play, play.enemiesCollisionGroup, this.key);
};

Cocolito.prototype = new LevelItem();
Cocolito.prototype.constructor = Cocolito;
