var Sequenciador = function(game, play, group) {

  //public

  this.update = update;

  //private

  var game = game;
  var play = play;
  var group = group;

  var currentSequence = null;
  var currentElement = 0;
  var sequenciaStartTime = 0;
  var elapsedTime = 0;

  function element(type, id, time, y) {
    return {
      type: type,
      id: id,
      time: time === undefined ? 0 : time,
      y: y
    }
  }

  function enemy(id, time, y) {
    return element('enemy', id, time, y);
  }

  function powerUp(id, time, y) {
    return element('powerUp', id, time, y);
  }

  var sequencesPool = [
    // first enemy, like an intro
    {
      id: 'first',
      scoreMin: -1,
      scoreMax: 2,
      time: 4000,
      elements: [ enemy('cocolito', 1000, 30) ]
    },

    // easy enemies
    {
      id: 'coco-single',
      scoreMin: 1,
      scoreMax: Infinity,
      time: 500,
      elements: [ enemy('cocolito') ]
    },
    {
      id: 'garrafa-pet',
      scoreMin: 1,
      scoreMax: Infinity,
      time: 500,
      elements: [ enemy('garrafa-pet') ]
    },
    {
      id: 'zika',
      scoreMin: 1,
      scoreMax: Infinity,
      time: 1000,
      elements: [ enemy('zika') ]
    },

    // medium enemies
    {
      id: 'coco-double',
      scoreMin: 100,
      scoreMax: Infinity,
      time: 600,
      elements: [ enemy('cocolito', 0), enemy('cocolito', 100) ]
    },
    {
      id: 'defunto',
      scoreMin: 200,
      scoreMax: Infinity,
      time: 2000,
      elements: [
        enemy('defunto'),
      ]
    },
    {
      id: 'sofa',
      scoreMin: 400,
      scoreMax: Infinity,
      time: 3000,
      elements: [
        enemy('sofa'),
      ]
    },

    // hard enemies
    {
      id: 'coco-triple',
      scoreMin: 300,
      scoreMax: Infinity,
      time: 1000,
      elements: [ 
        enemy('cocolito', 0),
        enemy('cocolito', 100),
        enemy('cocolito', 200)
      ]
    },
    {
      id: 'coco-tunnel',
      scoreMin: 400,
      scoreMax: Infinity,
      time: 1500,
      elements: [
        enemy('cocolito', 0, 0), 
        enemy('cocolito', 0, 430),
        enemy('cocolito', 200, 0), 
        enemy('cocolito', 200, 430),
        enemy('cocolito', 400, 0),
        enemy('cocolito', 400, 430),
      ]
    },
    {
      id: 'coco-wall',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 1500,
      elements: [
        enemy('cocolito', 0, 0),
        enemy('cocolito', 0, 400),
        enemy('cocolito', 100, 50),
        enemy('cocolito', 100, 350),
        enemy('cocolito', 200, 100),
        enemy('cocolito', 200, 300),
      ]
    },
    {
      id: 'monte-bosta',
      scoreMin: 800,
      scoreMax: Infinity,
      time: 4000,
      elements: [
        enemy('monte-bosta'),
      ]
    },

    // bosses
    {
      id: 'sewer',
      scoreMin: 300,
      scoreMax: Infinity,
      time: 2000,
      elements: [ enemy('sewer') ]
    },
    {
      id: 'dudu',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 3000,
      elements: [ enemy('dudu') ]
    },
    {
      id: 'bonner',
      scoreMin: 900,
      scoreMax: Infinity,
      time: 4000,
      elements: [ enemy('bonner') ]
    },

    // life
    {
      id: 'sus',
      scoreMin: 1,
      scoreMax: Infinity,
      time: 1000,
      elements: [ powerUp('sus') ]
    },
    {
      id: 'injection',
      scoreMin: 100,
      scoreMax: Infinity,
      time: 1000,
      elements: [ powerUp('injection') ]
    },
    {
      id: 'sussa',
      scoreMin: 300,
      scoreMax: Infinity,
      time: 2500,
      elements: [ 
        powerUp('sus', 0, 400),
        powerUp('sus', 100, 300),
        powerUp('sus', 200, 200),
        powerUp('sus', 300, 100),
        powerUp('sus', 400, 0)
      ]
    },
    {
      id: 'refill-life',
      scoreMin: 500,
      scoreMax: Infinity,
      time: 2000,
      elements: [
        powerUp('injection', 0),
        powerUp('injection', 200),
        powerUp('injection', 400)
      ]
    },
  ];

  var sequences = [];
  changeSequence(0);

  function update(currentScore){
    elapsedTime += game.time.elapsed;

    if (elapsedTime > sequenciaStartTime + currentSequence.time) {
      changeSequence(currentScore);
    }

    updateSequence();
  };

  function changeSequence(currentScore) {
    var availableIndexes = [];
    sequencesPool.map(function(sequence, index) {
      if (currentScore > sequence.scoreMin && currentScore < sequence.scoreMax) {
        availableIndexes.push(index);
      }
    })

    var randomIndex = availableIndexes[ Math.floor(Math.random() * availableIndexes.length) ];
    currentSequence = sequencesPool[randomIndex];

    sequenciaStartTime = elapsedTime;
    currentElement = 0;

    console.log('starting: ' + currentSequence.id, availableIndexes);
  };

  function updateSequence() {
    var timeDiff = elapsedTime - sequenciaStartTime;
    while (currentElement < currentSequence.elements.length && currentSequence.elements[currentElement].time < timeDiff ) {
      var element = currentSequence.elements[currentElement];
      switch (element.type) {
        case 'enemy':
          createEnemy(element);
          break;
        case 'powerUp':
          createPowerUp(element);
          break;
      }
      currentElement++;
    }
  };

  function createEnemy(enemy) {
    switch (enemy.id) {
      case 'cocolito':
        var x = game.width + 150/2;
        var y = enemy.y !== undefined ? enemy.y + play.initialPosition.y : game.rnd.integerInRange(play.initialPosition.y, game.height-100);
        play.pool.get('cocolito', x, y);
        break;
      case 'garrafa-pet':
        var x = game.width + 110/2;
        var y = enemy.y !== undefined ? enemy.y + play.initialPosition.y : game.rnd.integerInRange(play.initialPosition.y, game.height-88);
        play.pool.get('garrafa-pet', x, y);
        break;
      case 'zika':
        var x = game.width + 359;
        var y = play.initialPosition.y - 50;
        play.pool.get('zika', x, y);
        break;
      case 'defunto':
        var x = game.width + 150/2;
        var y = game.rnd.integerInRange(play.initialPosition.y+120, game.height-120);
        var enemy = play.pool.get('defunto', x, y);
        break;
      case 'sofa':
        var x = game.width + 431/2;
        var y = game.height - 150;
        var enemy = play.pool.get('sofa', x, y);
        break;
      case 'monte-bosta':
        var x = game.width + 735/2;
        var y = game.height - 528/2;
        var enemy = play.pool.get('monte-bosta', x, y);
        break;
      case 'sewer':
        new Sewer(game, play, group);
        break;
      case 'bonner':
        new Bonner(game, play, group);
        break;
      case 'dudu':
        new Dudu(game, play, group);
        break;
    }
  };

  function createPowerUp(powerup) {
    new PowerUp(game, play, group, powerup.id);
  };
};
