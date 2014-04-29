var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'maingame', null, true);
// phaser.canvas istedenfor auto fordi opera ikke fikser valget mellom canvas og webgl

var gameScore = 0;

function scoreTick () {
        gameScore++;
    };

// MENU

var menuState = {
    preload: function() {
        game.load.image('background', 'http://procrastination.elisejakob.com/assets/room-test-3.png');
        game.load.image('button', 'http://procrastination.elisejakob.com/assets/button-test.png');
    },
    create: function() {
        this.game.add.sprite(0,0, 'background');
        this.oblo = game.add.button(game.world.centerX, game.world.centerY, 'button', this.startGame, this);
        this.oblo.anchor.setTo(0.5, 0.5);
    },
    startGame: function() {
        this.game.state.start('main');
    },
    update: function() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.game.state.start('main');
        };
    },
};


// MAIN GAME

var mainState = {

    preload: function() {
        game.load.image('background', 'http://procrastination.elisejakob.com/assets/room-test-3.png');
        game.load.spritesheet('oblo', 'http://procrastination.elisejakob.com/assets/oblo-sprite-large.png', 76, 104, 12);
        game.load.image('iphone', 'http://procrastination.elisejakob.com/assets/iphone.png');
        game.load.image('trash', 'http://procrastination.elisejakob.com/assets/trash.png');
        game.load.image('bed', 'http://procrastination.elisejakob.com/assets/bed.png');
        game.load.image('desk', 'http://procrastination.elisejakob.com/assets/desk.png');
        game.load.image('health', 'http://procrastination.elisejakob.com/assets/healthbar-test.png');
        game.load.image('bookshelf', 'http://procrastination.elisejakob.com/assets/bookshelf.png');

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
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // background sprite
        this.game.add.sprite(0, 0, 'background');

        this.trash = game.add.sprite(50, 85, 'trash');
        game.physics.arcade.enable(this.trash);
        this.trash.anchor.setTo(0.5, 0.5);
        this.trash.body.immovable = true;

        this.bed = game.add.sprite(790, 340, 'bed');
        game.physics.arcade.enable(this.bed);
        this.bed.anchor.setTo(1, 0.5);
        this.bed.body.immovable = true;

        this.desk = game.add.sprite(200, 85, 'desk');
        game.physics.arcade.enable(this.desk);
        this.desk.anchor.setTo(0.5, 0.5);
        this.desk.body.immovable = true;

        this.iphone = game.add.sprite(100, 400, 'iphone');
        game.physics.arcade.enable(this.iphone);
        this.iphone.body.immovable = true;

        this.bookshelf = game.add.sprite(400, 5, 'bookshelf');
        game.physics.arcade.enable(this.bookshelf);
        this.bookshelf.body.immovable = true;

        // oblo sprite
        this.oblo = game.add.sprite(game.world.centerX, game.world.centerY, 'oblo');
        game.physics.arcade.enable(this.oblo);
        this.oblo.anchor.setTo(0.5, 0.5);
        this.oblo.body.collideWorldBounds = true;

        // oblo walking animations
        this.oblo.animations.add('down', [0, 1, 2], 9, true);
        this.oblo.animations.add('up', [3, 4, 5], 9, true);
        this.oblo.animations.add('left', [6, 7, 8], 9, true);
        this.oblo.animations.add('right', [9, 10, 11], 9, true);

        this.health = game.add.sprite(10, 590, 'health');
        this.health.anchor.setTo(0, 1);

        // tick when oblo body velocity is 0
        this.secondsInactive = 0;
        function inactivityTick (self) {
            self.secondsInactive++;
        };
        this.tickInterval = setInterval(inactivityTick, 1000, this);
    },

    update: function() {
        // called 60 times per second to update the game
        var gameVar = this.game;

        var messageReset = function(){
            document.getElementById('message').innerHTML = "...";
        };

        // game links
        this.game.physics.arcade.collide(this.oblo, this.iphone);
        this.game.physics.arcade.collide(this.oblo, this.trash);
        this.game.physics.arcade.collide(this.oblo, this.bed);
        this.game.physics.arcade.collide(this.oblo, this.desk);
        this.game.physics.arcade.collide(this.oblo, this.bookshelf);
        if (gameVar.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            if (game.physics.arcade.distanceBetween(this.oblo, this.iphone) < 100) {
                document.getElementById('message').innerHTML = "Flappy hell! Press space!";
                this.game.state.start('flappy');
            } else if (game.physics.arcade.distanceBetween(this.oblo, this.desk) < 100) {
                document.getElementById('message').innerHTML = "Avoid work!";
                this.game.state.start('avoid');
            } else if ((game.physics.arcade.distanceBetween(this.oblo, this.trash) < 100) && ((this.trashLabel == null) || (this.trashLabel.exists == false))) {
                // trash label
                //var style = { font: "16px unibody8", fill: "#222" };
                //this.trashLabel = this.game.add.text(game.world.centerX, 550, "Nope, there's only trash here!", style);
                //this.trashLabel.anchor.setTo(0.5, 0);
                //var labelDestroy = function(label){
                //    label.destroy();
                //};
                //setTimeout(labelDestroy, 1500, this.trashLabel);
                document.getElementById('message').innerHTML = "Nope, there's only trash here!";
                setTimeout(messageReset, 3000);
            } else if ((game.physics.arcade.distanceBetween(this.oblo, this.bed) < 200) && ((this.bedLabel == null) || (this.bedLabel.exists == false))) {
                this.game.state.start('dream');
                document.getElementById('message').innerHTML = "Crushed dreams";
            };
        };
        
        // make speech bubble
                var affirmation = [
                    "We'll feel like it tomorrow!", 
                    "Let's play just one more game!", 
                    "We deserve to have fun!", 
                    "We'll work better under pressure!", 
                    "All work and no play makes Oblomov a dull boy!",
                    "Pressure makes us more creative!",
                    "We'll have lots of time to do our work later!",
                    "Let's start working after we play another game!",
                    "YOLO!",
                    "Enjoy today! We might get hit by a bus tomorrow!",
                    "We'll be more focused later!",
                    "If we start tomorrow, we'll still have time to finish!",
                    "Taking a break is taking care of ourselves!",
                    "Our parents will love us anyway!"
                ];
                // resets inactivity counter from create function if oblo moves
                if ((this.oblo.body.velocity.x != 0) || (this.oblo.body.velocity.y != 0)) {
                    this.secondsInactive = 0;
                };
                if (this.secondsInactive > 12) {
                    var randomAff = affirmation[Math.floor(Math.random() * affirmation.length)];
                    document.getElementById('message').innerHTML = '<span class="red">Oblo says:</span> ' + randomAff;
                    this.secondsInactive = 0;
                    setTimeout(messageReset, 6000);
                };

        /*    if ((this.oblo.body.velocity.x == 0) && (this.oblo.body.velocity.y == 0) && (this.speechbubble.alive == false)) {
                //this.speechbubble.revive();
                if ((this.oblo.position.x <= 400) && (this.oblo.position.y <= 300)) {
                    this.speechbubble.anchor.setTo(0, 0);
                    this.speechbubble.position.x = this.oblo.position.x + 76;
                    this.speechbubble.position.y = this.oblo.position.y + 104;
                    this.speechbubble.revive();
                    document.getElementById('message').innerHTML = '<span class="red">Oblo says:</span> <i>You will feel like it tomorrow!</i>';
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
            }*/

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

    shutdown: function() {
        clearInterval(this.tickInterval);
    },
};

// BOOKSHELF

var bookState = {

    preload: function() {
        game.load.image('background', 'http://procrastination.elisejakob.com/assets/room-test-3.png');
    },

    create: function() {
        // background sprite
        this.game.add.sprite(0, 0, 'background');

        this.complainInterval = setInterval(this.complainFunction, 5000, this);
    },

    update: function() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            this.game.state.start('main');
            document.getElementById('message').innerHTML = '<b class="shadowed">Procrastinate!</b>';
            clearInterval(this.complainInterval);
        }; 
    },

    complainFunction: function() {
        var complain = [
            "Books are boring!", 
            "This feels like work!", 
            "I don't like reading!", 
             "This is no fun!"
        ];
        var randomCom = complain[Math.floor(Math.random() * complain.length)];
        document.getElementById('message').innerHTML = '<span class="red">Oblo says:</span> ' + randomCom;
    },
};


// AVOIDER GAME

var avoidState = {
    preload: function() {
        game.load.image('background', 'http://procrastination.elisejakob.com/assets/room-test-3.png');
        game.load.spritesheet('oblo', 'http://procrastination.elisejakob.com/assets/oblo-sprite-large.png', 76, 104, 12);
        game.load.image('workObject1', 'http://procrastination.elisejakob.com/assets/work1.png');
        game.load.image('workObject2', 'http://procrastination.elisejakob.com/assets/work2.png');
        game.load.image('workObject3', 'http://procrastination.elisejakob.com/assets/work3.png');
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // background sprite
        this.game.add.sprite(0, 0, 'background');

        // oblo sprite
        this.oblo = game.add.sprite(game.world.centerX, 600, 'oblo');
        this.oblo.anchor.setTo(0.5, 1);
        game.physics.arcade.enable(this.oblo);
        this.oblo.body.collideWorldBounds = true;

        // enemies
        this.work = this.game.add.group();
        this.work.enableBody = true;
        this.timer = this.game.time.events.loop(500, this.addWork, this);

        // esc label info
        var style = { font: "16px unibody8", fill: "#ffffff" };
        this.escLabel = this.game.add.text(game.world.centerX, 20, "press esc to go back", style);
        this.escLabel.anchor.setTo(0.5, 0);

        // score ticks
        this.scoreInterval = setInterval(scoreTick, 10000, this);
    },
    update: function() {
        //  reset oblo movement
        this.oblo.body.velocity.x = 0;
        this.oblo.body.velocity.y = 0;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            //  move left
            this.oblo.body.velocity.x = -200;
            this.oblo.animations.play('left');
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            //  move right
            this.oblo.body.velocity.x = 200;
            this.oblo.animations.play('right');
        } else {
            //  stand still
            this.oblo.animations.stop();
        };

        this.game.physics.arcade.overlap(this.oblo, this.work, this.restartGame, null, this);

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            this.game.state.start('main');
            document.getElementById('message').innerHTML = '<b class="shadowed">Procrastinate!</b>';
            clearInterval(this.scoreInterval);
        };        
    },
    restartGame: function() {
        // restart the game in the main state
        this.game.state.start('avoid');
        this.game.time.events.remove(this.timer);
    },
    addWork: function() {
        var workObjects = [
                    'workObject1',
                    'workObject2',
                    'workObject3'
                ];
        var randomWork = workObjects[Math.floor(Math.random() * workObjects.length)];
        var workObject = this.work.create(Math.random() * 800, 0, randomWork);
        workObject.body.velocity.y = 150;
        workObject.checkWorldBounds = true;
        workObject.outOfBoundsKill = true;
    },
};


// FLAPPY GAME

var flappyState = {
    preload: function() {
        
        game.load.image('background', 'http://procrastination.elisejakob.com/assets/room-test-3.png');
        // load bird sprite
        this.game.load.image('bird', 'http://procrastination.elisejakob.com/spill/flappy/assets/bird.png');
        // load pipe sprite
        this.game.load.image('pipe', 'http://procrastination.elisejakob.com/spill/flappy/assets/pipe.png');
    },

    // function after preload to set up game
    create: function() {
        // enable arcade physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // background sprite
        this.game.add.sprite(0, 0, 'background');

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
        var style = { font: "30px unibody8", fill: "#ffffff" };
        this.labelScore = this.game.add.text(20, 20, "0", style);

        // esc label info
        var style = { font: "16px unibody8", fill: "#ffffff" };
        this.escLabel = this.game.add.text(game.world.centerX, 20, "press esc to go back", style);
        this.escLabel.anchor.setTo(0.5, 0);
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

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            this.game.state.start('main');
            document.getElementById('message').innerHTML = '<b class="shadowed">Procrastinate!</b>';
        };
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
        this.game.state.start('flappy');
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

// DREAM GAME

var dreamState = {
    preload: function() {
        // load bird sprite
        this.game.load.image('bird', 'http://procrastination.elisejakob.com/assets/trash.png');
        // load pipe sprite
        this.game.load.image('pipe', 'http://procrastination.elisejakob.com/spill/flappy/assets/pipe.png');
    },

    // function after preload to set up game
    create: function() {
        // enable arcade physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // make a bird and give it physics & gravity
        this.bird = this.game.add.sprite(100, 245, 'bird');
        this.game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 600;
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

        // esc label info
        var style = { font: "16px unibody8", fill: "#222" };
        this.escLabel = this.game.add.text(game.world.centerX, 20, "press esc to go back", style);
        this.escLabel.anchor.setTo(0.5, 0);
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

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            this.game.state.start('main');
            document.getElementById('message').innerHTML = '<b class="shadowed">Procrastinate!</b>';
        };
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
        this.game.state.start('dream');
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
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1)
                this.addOnePipe(800, i * 60 + 10);
        scoreTick();
    },
};


// STATES

game.state.add('menu', menuState); 
game.state.add('main', mainState);
game.state.add('books', bookState); 
game.state.add('avoid', avoidState);
game.state.add('flappy', flappyState);
game.state.add('dream', dreamState); 
game.state.start('books');
