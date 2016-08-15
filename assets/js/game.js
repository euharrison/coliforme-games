// Init Phaser
var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game');
game.score = 0;

// Define states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('revive', reviveState);
game.state.add('gameover', gameoverState);

// Start the "boot" state
game.state.start('boot');
