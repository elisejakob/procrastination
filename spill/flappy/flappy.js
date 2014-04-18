
// initializ phaser
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gamediv');

var mainState = {
// first function called loads assets
	preload: function() {
		// bg color
		this.game.stage.backgroundColor = '#71c5cf';
		// load bird sprite
		this.game.load.image('bird', 'assets/bird.png');
		// load pipe sprite
		this.game.load.image('pipe', 'assets/pipe.png');
	},

	// function after preload to set up game
	create: function() {
		// enable arcade physics system
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// make a bird and give it physics & gravity
		this.bird = this.game.add.sprite(100, 245, 'bird');
		this.game.physics.arcade.enable(this.bird);
		this.bird.body.gravity.y = 500;
		this.bird.anchor.setTo(-0.2, 0.5);

		// call the jump-function when space is hit
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

		// make pipes
		this.pipes = game.add.group();
		this.pipes.createMultiple(20, 'pipe');
		this.game.physics.arcade.enable(this.pipes);
		this.timer = this.game.time.events.loop(1500,
			this.addRowOfPipes, this);

		// score label
		this.score = -1;
		var style = { font: "30px monospace", fill: "#ffffff" };
		this.labelScore = this.game.add.text(20, 20, "0", style);
	},

	// function called 60 times per second
	update: function() {
		// bird angle upward when it jumps
		if (this.bird.angle < 10)
			this.bird.angle += 1;
		// if the bird is dead, call the restart function
		if (this.bird.inWorld == false) {
			this.restartGame();
		}

		this.game.physics.arcade.overlap(this.bird, this.pipes,
			this.restartGame, null, this);
	},

	jump: function() {
		// jump!
		this.bird.body.velocity.y = -250;

		// animate the bird
		var animation = this.game.add.tween(this.bird);
		animation.to({angle: -10}, 100);
		animation.start();
	},

	restartGame: function() {
		// restart the game in the main state
		this.game.state.start('main');
		this.game.time.events.remove(this.timer);
	},

	addOnePipe: function(x, y) {
		var pipe = this.pipes.getFirstDead();
		pipe.reset(x, y);
		pipe.body.velocity.x = -200;
		pipe.checkWorldBounds = true;
		pipe.outOfBoundsKill = true;
	},

	addRowOfPipes: function() {
		var hole = Math.floor(Math.random() * 5) + 1;
		this.score += 1;
		this.labelScore.text = this.score;

		for (var i = 0; i < 8; i++)
			if (i != hole && i != hole +1)
				this.addOnePipe(400, i * 60 + 10);
	},
};

game.state.add('main', mainState);  
game.state.start('main'); 