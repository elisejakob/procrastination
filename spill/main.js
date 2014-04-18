var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_div');

var mainState = {

    preload: function() {
        // Everything in this function will be executed at the beginning. That’s where we usually load the game’s assets (images, sounds, etc.)
    	game.load.image('oblo', 'assets/oblo-1.png');
        game.load.image('oblofly', 'assets/Untitled-1.png');  
        game.load.image('table', 'assets/table.png');
    },

    create: function() { 
        // This function will be called after the preload function. Here we set up the game, display sprites, add labels, etc.
    	game.physics.startSystem(Phaser.Physics.ARCADE);

        this.oblo = game.add.sprite(200, game.world.centerY, 'oblo');
        this.table = game.add.sprite(game.world.centerX, 500, 'table');

        // oblo physics
        this.game.physics.arcade.enable(this.oblo);
        this.oblo.body.bounce.y = 0.4;
        this.oblo.body.gravity.y = 500;
        this.oblo.body.collideWorldBounds = true;
        this.oblo.anchor.setTo(0.5, 0.5);

        // table physics
        this.game.physics.arcade.enable(this.table);
        this.table.body.bounce.y = 0.4;
        this.table.body.gravity.y = 300;
        this.table.body.collideWorldBounds = true;
        this.table.anchor.setTo(0.5, 0.5);
        this.table.body.immovable = true;
    },

    update: function() {
        // This is where we will spend the most of our time. This function is called 60 times per second to update the game.
    	this.game.physics.arcade.collide(this.oblo, this.table);

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.oblo.body.velocity.x = -100;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.oblo.body.velocity.x = 100;
        } else {
            this.oblo.body.velocity.x = 0;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.oblo.loadTexture('oblofly', 0);
            this.oblo.body.velocity.y = -100;
        } else {
            this.oblo.loadTexture('oblo', 0);
        }
    } 
}

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);  
game.state.start('main');