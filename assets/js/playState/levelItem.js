var LevelItem = function(){
    this.attackSpeed = 1;
}

LevelItem.prototype = Object.create(Phaser.Sprite.prototype);

LevelItem.prototype.addBody = function(game, play, colisionGroup, key){
    game.physics.p2.enable(this, game.debugPhysics);
    this.body.clearShapes();
    this.body.loadPolygon('physicsData', key);
    this.body.fixedRotation = true;
    this.body.collideWorldBounds = false;
    this.body.velocity.x = -play.velocity * this.attackSpeed;

    this.body.setCollisionGroup(colisionGroup);
    this.body.collides([play.playerCollisionGroup]);
};

LevelItem.prototype.update = function() {
  if (this.body) {
    if (this.body.x < 0) {
      this.destroy();
    }
  }
}
