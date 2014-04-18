var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'maingame');
// phaser.canvas istedenfor auto fordi opera ikke fikser valget mellom canvas og webgl

var mainState = {

    preload: function() {
        // Everything in this function will be executed at the beginning. That’s where we usually load the game’s assets (images, sounds, etc.)
        game.load.image('background', 'assets/room-test-1.png');
        game.load.spritesheet('oblo', 'assets/oblo-sprite-large.png', 76, 104, 12);
        game.load.image('speechbubble', 'assets/speechbubble-2.png');
        game.load.image('table', 'assets/table.png');

        // stop key events from propagating up to the browser
        var preventedKeys = [
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.ENTER,
        ];
        game.input.keyboard.addKeyCapture(preventedKeys);
    },

    create: function() {
        // This function will be called after the preload function. Here we set up the game, display sprites, add labels, etc.
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // background sprite
        this.game.add.sprite(0, 0, 'background');

        this.table = game.add.sprite(500, 450, 'table');
        game.physics.arcade.enable(this.table);
        this.table.body.immovable = true;

        this.speechbubble = game.add.sprite(0, 0, 'speechbubble');
        this.speechbubble.alive = false;

        // oblo sprite
        this.oblo = game.add.sprite(game.world.centerX, game.world.centerY, 'oblo');
        game.physics.arcade.enable(this.oblo);
        this.oblo.body.collideWorldBounds = true;

        // oblo walking animations
        this.oblo.animations.add('down', [0, 1, 2], 9, true);
        this.oblo.animations.add('up', [3, 4, 5], 9, true);
        this.oblo.animations.add('left', [6, 7, 8], 9, true);
        this.oblo.animations.add('right', [9, 10, 11], 9, true);

        // speech bubble function
        // setInterval(speechBubble, 3000);
    },

    update: function() {
        // This is where we will spend the most of our time. This function is called 60 times per second to update the game.
        var gameVar = this.game;

        // collision
        this.game.physics.arcade.collide(this.oblo, this.table);
        if (gameVar.input.keyboard.isDown(Phaser.Keyboard.ENTER) && this.oblo.body.touching) {
            console.log("Collision!");
        };
        
        // make speech bubble
        //setInterval(function speechBubble () {
            if ((this.oblo.body.velocity.x == 0) && (this.oblo.body.velocity.y == 0) && (this.speechbubble.alive == false)) {
                //this.speechbubble.revive();
                if ((this.oblo.position.x <= 400) && (this.oblo.position.y <= 300)) {
                    this.speechbubble.anchor.setTo(0, 0);
                    this.speechbubble.position.x = this.oblo.position.x + 76;
                    this.speechbubble.position.y = this.oblo.position.y + 104;
                    this.speechbubble.revive();
                } else if ((this.oblo.position.x >= 400) && (this.oblo.position.y <= 300)) {
                    this.speechbubble.anchor.setTo(1, 0);
                    this.speechbubble.position.x = this.oblo.position.x;
                    this.speechbubble.position.y = this.oblo.position.y + 104;
                    this.speechbubble.revive();
                } else if ((this.oblo.position.x >= 400) && (this.oblo.position.y >= 300)) {
                    this.speechbubble.anchor.setTo(1, 1);
                    this.speechbubble.position.x = this.oblo.position.x + 75;
                    this.speechbubble.position.y = this.oblo.position.y - 10;
                    this.speechbubble.revive();
                } else if ((this.oblo.position.x <= 400) && (this.oblo.position.y >= 300)) {
                    this.speechbubble.anchor.setTo(0, 1);
                    this.speechbubble.position.x = this.oblo.position.x + 76;
                    this.speechbubble.position.y = this.oblo.position.y;
                    this.speechbubble.revive();
                }
            } else if ((this.oblo.body.velocity.x != 0) || (this.oblo.body.velocity.y != 0)) {
                this.speechbubble.kill();
            }
        //}, 3000);

        //  reset oblo movement
        this.oblo.body.velocity.x = 0;
        this.oblo.body.velocity.y = 0;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            //  move down
            this.oblo.body.velocity.y = 150;
            this.oblo.animations.play('down');
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            //  move up
            this.oblo.body.velocity.y = -150;
            this.oblo.animations.play('up');
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            //  move left
            this.oblo.body.velocity.x = -150;
            this.oblo.animations.play('left');
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            //  move right
            this.oblo.body.velocity.x = 150;
            this.oblo.animations.play('right');
        } else {
            //  stand still
            this.oblo.animations.stop();
        }
    },

    /* speechBubble: function() {
        if ((this.oblo.body.velocity.x == 0) && (this.oblo.body.velocity.y == 0) && (this.speechbubble == null)) {
            this.speechbubble = game.add.sprite(100, 100, 'speechbubble');
        } else if ((this.oblo.body.velocity.x > 0) || (this.oblo.body.velocity.y > 0)) {
            this.speechbubble.kill();
        }
    }
    */
}

game.state.add('main', mainState);  
game.state.start('main');

