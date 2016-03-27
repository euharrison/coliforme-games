var Player = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'player');

  this.forcas = {
    forcaPraBaixo: 20,
    empuxoDaAgua: 0.01,
    gravidade: 20
  };

  this.initialPosition = {
    x: x,
    y: y
  };

  this.isJumping = false;
  this.isTouchDown = false;

  this.animations.add('swim', [0,1,2,3,4,5], 12, true);
  this.animations.add('jump', [6], 12, false);
  this.animations.add('fall', [7], 12, false);
  this.animations.play('swim');
  game.add.existing(this);

  game.physics.p2.enable(this, game.debugPhysics);
  this.body.clearShapes();
  this.body.loadPolygon('physicsData', this.key);
  this.body.fixedRotation = true;
  this.body.collideWorldBounds = false;

  game.input.onDown.add(this.onTouchDown, this);
  game.input.onUp.add(this.onTouchUp, this);

  var keySpacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  keySpacebar.onDown.add(this.onTouchDown, this);
  keySpacebar.onUp.add(this.onTouchUp, this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    //movimento horizontal
    this.body.velocity.x = 0;
    this.body.x = this.initialPosition.x;

    //player fora da água
    if (this.isJumping) {
      //gravidade
      this.body.velocity.y += 20;//this.forcas.gravidade;

      //ao entrar na água após o pulo, desacelerar
      if (this.body.y >= this.initialPosition.y) {
        this.body.velocity.y /= 10;
        this.animations.play('swim');
      } else {
        if (this.body.velocity.y < 0) {
          this.animations.play('jump');
        } else {
          this.animations.play('fall');
        }
      }
    }
    //player dentro da água
    else {
      //empuxo
      this.body.velocity.y -= (this.body.y - this.initialPosition.y) * this.forcas.empuxoDaAgua;

      //nadar para baixo
      if (this.isTouchDown) {
        this.body.velocity.y += this.forcas.forcaPraBaixo;

        //impoe um limite de velocidade para baixo
        if (this.body.velocity.y > 500) {
          this.body.velocity.y = 500;
        }
      }
      //nadar para cima, somente se houver espaço
      else if (this.body.y > this.initialPosition.y + 10) {
        this.body.velocity.y -= this.forcas.forcaPraBaixo;
      }
    }

    this.angle = this.body.velocity.y/20;
    this.body.rotation = this.angle * Math.PI / 180;

    //atualiza se está dentro da água ou não
    this.isJumping = (this.body.y < this.initialPosition.y);

    //limita a tela somente no chão
    if (this.body.y > 1000) {
      this.body.y = 1000;
    }
};

Player.prototype.onTouchDown = function() {
  this.isTouchDown = true;

  //se for para começar a nadar para baixo, diminuir a possível velocidade para cima para dar uma resposta mais rápida
  if (!this.isJumping) {
    this.body.velocity.y /= 5;
  }
}

Player.prototype.onTouchUp = function() {
  this.isTouchDown = false;
}
