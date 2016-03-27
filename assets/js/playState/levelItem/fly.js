var Fly = function (game, play) {
  Phaser.Sprite.call(this, game, game.width+539, play.initialPosition.y-120, 'fly');

  this.animations.add('fly', [0,1,2], 12, true);
  this.animations.play('fly');
  game.add.existing(this);

  this.addBody(game, play, play.enemiesCollisionGroup, this.key);
};

Fly.prototype = new LevelItem();
Fly.prototype.constructor = Fly;
