var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'maingame', null, true);
// phaser.canvas istedenfor auto fordi opera ikke fikser valget mellom canvas og webgl

var countersStarted = false;

var gameScore = 0;
var timeScore = 0;
var totalScore = 0;
var oldScore = 0;

var oldTime = 0;

var fun = 10;
var sleep = 10;
var drink = 10;

function funTick() {
    if (fun > 0 && (game.state.current == "main" || game.state.current == "books")) {
        fun--;
    } else if (fun < 10 && fun != 0) {
        fun++;
    }

    if (fun == 0 || sleep == 0 || drink == 0) {
        gameScore--;
    }
    console.log(fun);
}

function drinkTick() {
    if (drink > 0) {
        drink--;
    } 
}

function sleepTick() {
    if (sleep > 0) {
        sleep--;
    }
}

function scoreTick() {
    gameScore++;
}

// score counter
var startDate;
var startTime;

function secondsElapsed() { 
    var dateNow = new Date(); 
    var timeNow = dateNow.getTime(); 
    var timeDiff = timeNow - startTime; 
    var secondsElapsed = Math.floor(timeDiff / 1000); 

    return secondsElapsed; 
}

// time
function timeSpent() { 
    var secs = secondsElapsed() + oldTime;

    var mins = Math.floor ( secs / 60 );
    secs -= mins * 60;

    var hour = Math.floor ( mins / 60 );
    mins -= hour * 60;

    var totalTime = "Time procrastinated: " + pad(hour) + "h " + pad(mins) + "m " + pad(secs) + "s";

    document.getElementById('timer').innerHTML = totalTime; 
}

function pad(num) {
    return ((num > 9) ? num : "0" + num);
} 

// score
function scoreCount() {
    var secs = secondsElapsed();
    timeScore = Math.floor ( secs / 30 );
    totalScore = oldScore + timeScore + gameScore;
    document.getElementById('score').innerHTML = "Score: " + totalScore;
}
// end score counter

function saveScore() {
    localStorage.setItem("myScore", totalScore);
    localStorage.setItem("myTime", secondsElapsed() + oldTime);
};

if (localStorage.getItem("myScore")) {
    oldScore = parseInt(localStorage.getItem("myScore"));
};
if (localStorage.getItem("myTime")) {
    oldTime = parseInt(localStorage.getItem("myTime"));
}


// MENU

var menuState = {
    preload: function() {
        game.load.image('continueButton', 'http://procrastination.elisejakob.com/assets/continue-button.png');
        game.load.image('newButton', 'http://procrastination.elisejakob.com/assets/new-button.png');
    },
    create: function() {
        this.newButton = game.add.button(game.world.centerX, game.world.centerY, 'newButton', this.newGame, this);
        this.newButton.anchor.setTo(0.5, 0.5);

        if (localStorage.getItem("myScore")) {
            this.continueButton = game.add.button(game.world.centerX, game.world.centerY + 70, 'continueButton', this.continueGame, this);
            this.continueButton.anchor.setTo(0.5, 0.5);
        }

        // instructions
        var style = { font: "16px unibody8", fill: "#222", align: "center" };
        this.instructLabel = this.game.add.text(game.world.centerX, 50, "controls: \narrow keys to move \nenter to interact with objects \n \n* \n \nclick to start the game", style);
        this.instructLabel.anchor.setTo(0.5, 0);
    },
    continueGame: function() {
        this.game.state.start('main');
    },
    newGame: function() {
        this.game.state.start('intro');
    },
};

// intro

var introState = {
    preload: function() {
        //images
        game.load.spritesheet('startOblo', 'http://procrastination.elisejakob.com/assets/oblo-shrinksheet.png', 276, 324, 28);
        game.load.image('startButton', 'http://procrastination.elisejakob.com/assets/start-button.png');
    },
    create: function() {
        this.startOblo = this.game.add.sprite(game.world.centerX, 0, 'startOblo');
        this.startOblo.anchor.setTo(0.5, 0);

        //this.startOblo.animations.add('shrink', [0, 1, 2], 3, true);
        this.startOblo.animations.add('shrink');

        // instructions
        var style = { font: "16px unibody8", fill: "#222", align: "center" };
        this.instructLabel = this.game.add.text(game.world.centerX, 450, "welcome :)\nthis is oblomov. he is your new procrastination spirit guide.\nplay games with him. please", style);
        this.instructLabel.anchor.setTo(0.5, 1);

        this.startButton = game.add.button(game.world.centerX, 530, 'startButton', this.obloShrink, this);
        this.startButton.anchor.setTo(0.5, 1);
    },
    obloShrink: function() {
        // oblo shrinks
        this.startOblo.animations.play('shrink', 14, false);

        // delayed start game function
        setTimeout(this.startGame, 2000);
    },
    startGame: function() {
        window.localStorage.clear();
        oldScore = 0;
        totalScore = 0;
        oldTime = 0;
        this.game.state.start('main');
    },
    update: function() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            window.localStorage.clear();
            oldScore = 0;
            totalScore = 0;
            oldTime = 0;
            this.game.state.start('main');
        };
    },
};


// MAIN GAME

var mainState = {

    preload: function() {
        game.load.image('background', 'http://procrastination.elisejakob.com/assets/room-2.png');
        game.load.spritesheet('oblo', 'http://procrastination.elisejakob.com/assets/oblo-sprite-large-2.png', 76, 104, 12);
        game.load.image('iphone', 'http://procrastination.elisejakob.com/assets/iphone.png');
        game.load.image('trash', 'http://procrastination.elisejakob.com/assets/trash.png');
        game.load.image('bed', 'http://procrastination.elisejakob.com/assets/bed.png');
        game.load.spritesheet('desk', 'http://procrastination.elisejakob.com/assets/desk-sprite.png', 120, 84, 2);
        game.load.image('table', 'http://procrastination.elisejakob.com/assets/coffeetable.png');
        game.load.spritesheet('health', 'http://procrastination.elisejakob.com/assets/healthbar-spritesheet.png', 196, 16, 10);
        game.load.image('bookshelf', 'http://procrastination.elisejakob.com/assets/bookshelf.png');
        game.load.image('smallBook', 'http://procrastination.elisejakob.com/assets/small-book.png');

        // health bar images
        game.load.image('fun-icon', 'http://procrastination.elisejakob.com/assets/fun-icon-alt.png');
        game.load.image('drink-icon', 'http://procrastination.elisejakob.com/assets/drink-icon.png');
        game.load.image('sleep-icon', 'http://procrastination.elisejakob.com/assets/sleep-icon.png');
        game.load.image('health-10', 'http://procrastination.elisejakob.com/assets/health-10.png');
        game.load.image('health-9', 'http://procrastination.elisejakob.com/assets/health-09.png');
        game.load.image('health-8', 'http://procrastination.elisejakob.com/assets/health-08.png');
        game.load.image('health-7', 'http://procrastination.elisejakob.com/assets/health-07.png');
        game.load.image('health-6', 'http://procrastination.elisejakob.com/assets/health-06.png');
        game.load.image('health-5', 'http://procrastination.elisejakob.com/assets/health-05.png');
        game.load.image('health-4', 'http://procrastination.elisejakob.com/assets/health-04.png');
        game.load.image('health-3', 'http://procrastination.elisejakob.com/assets/health-03.png');
        game.load.image('health-2', 'http://procrastination.elisejakob.com/assets/health-02.png');
        game.load.image('health-1', 'http://procrastination.elisejakob.com/assets/health-01.png');
        game.load.image('health-0', 'http://procrastination.elisejakob.com/assets/health-00.png');

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
        startDate = new Date();
        startTime = startDate.getTime();
        if (countersStarted == false) {
            setInterval(timeSpent, 1000); 
            setInterval(scoreCount, 500);
            setInterval(funTick, 20000);
            setInterval(drinkTick, 35000);
            setInterval(sleepTick, 56000);
            setInterval(saveScore, 1000);
            countersStarted = true;
        };

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

        this.desk = game.add.sprite(200, 85, 'desk', 0);
        game.physics.arcade.enable(this.desk);
        this.desk.anchor.setTo(0.5, 0.5);
        this.desk.body.immovable = true;
        // desk animation
        this.desk.animations.add('blink');

        this.table = game.add.sprite(500, 550, 'table');
        game.physics.arcade.enable(this.table);
        this.table.anchor.setTo(0.5, 0.5);
        this.table.body.immovable = true;

        this.iphone = game.add.sprite(100, 400, 'iphone');
        game.physics.arcade.enable(this.iphone);
        this.iphone.body.immovable = true;

        this.smallBook = game.add.sprite(300, 400, 'smallBook');
        game.physics.arcade.enable(this.smallBook);
        this.smallBook.body.immovable = true;

        this.bookshelf = game.add.sprite(480, 165, 'bookshelf');
        game.physics.arcade.enable(this.bookshelf);
        this.bookshelf.anchor.setTo(0.5, 1);
        this.bookshelf.body.immovable = true;

        // oblo sprite
        this.oblo = game.add.sprite(game.world.centerX, game.world.centerY, 'oblo', 0);
        game.physics.arcade.enable(this.oblo);
        this.oblo.anchor.setTo(0.5, 0.5);
        this.oblo.body.collideWorldBounds = true;

        // oblo walking animations
        this.oblo.animations.add('down', [0, 1, 2], 9, true);
        this.oblo.animations.add('up', [3, 4, 5], 9, true);
        this.oblo.animations.add('left', [6, 7, 8], 9, true);
        this.oblo.animations.add('right', [9, 10, 11], 9, true);

        // needs
        this.funIcon = game.add.sprite(10, 534, 'fun-icon');
        this.funIcon.anchor.setTo(0, 1);
        this.funBubbles = game.add.sprite(48, 530, 'health-10');
        this.funBubbles.anchor.setTo(0, 1);

        this.drinkIcon = game.add.sprite(10, 564, 'drink-icon');
        this.drinkIcon.anchor.setTo(0, 1);
        this.drinkBubbles = game.add.sprite(48, 560, 'health-10');
        this.drinkBubbles.anchor.setTo(0, 1);

        this.sleepIcon = game.add.sprite(10, 594, 'sleep-icon');
        this.sleepIcon.anchor.setTo(0, 1);
        this.sleepBubbles = game.add.sprite(48, 590, 'health-10');
        this.sleepBubbles.anchor.setTo(0, 1);

        // tick when oblo body velocity is 0
        this.secondsInactive = 0;
        function inactivityTick (self) {
            self.secondsInactive++;
        };
        this.tickInterval = setInterval(inactivityTick, 1000, this);

        this.affirmation = [
                    "We'll feel like it tomorrow!", 
                    "Let's play just one more game!", 
                    "We deserve to have fun!", 
                    "We'll work better under pressure!", 
                    "All work and no play makes Oblo a dull boy!",
                    "Play today, work extra hard tomorrow!",
                    "We'll have lots of time to do our work later!",
                    "YOLO!",
                    "We'll be more focused later!",
                    "Taking a break is taking care of ourselves!",
                    "Our parents will love us anyway!"
                ];
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
        this.game.physics.arcade.collide(this.oblo, this.table);
        this.game.physics.arcade.collide(this.oblo, this.bookshelf);
        this.game.physics.arcade.collide(this.oblo, this.smallBook);
        if (gameVar.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            if (game.physics.arcade.distanceBetween(this.oblo, this.iphone) < 100) {
                document.getElementById('message').innerHTML = "Flappy hell! Press space!";
                this.game.state.start('flappy');
            } else if (game.physics.arcade.distanceBetween(this.oblo, this.desk) < 100) {
                document.getElementById('message').innerHTML = "Avoid work!";
                this.game.state.start('avoid');
            } else if (game.physics.arcade.distanceBetween(this.oblo, this.trash) < 100) {
                document.getElementById('message').innerHTML = "Nope, there's only trash here!";
                setTimeout(messageReset, 3000);
            } else if (game.physics.arcade.distanceBetween(this.oblo, this.bed) < 200) {
                sleep = 10;
            } else if (game.physics.arcade.distanceBetween(this.oblo, this.bookshelf) < 60) {
                this.game.state.start('books');
                document.getElementById('message').innerHTML = "The bookshelf!";
            } else if (game.physics.arcade.distanceBetween(this.oblo, this.smallBook) < 100) {
                this.game.state.start('brain');
                document.getElementById('message').innerHTML = "Defend your brain from distractions!";
            } else if (game.physics.arcade.distanceBetween(this.oblo, this.table) < 100) {
                drink = 10;
            }
        }

                // resets inactivity counter from create function if oblo moves
                if ((this.oblo.body.velocity.x != 0) || (this.oblo.body.velocity.y != 0)) {
                    this.secondsInactive = 0;
                    //this.desk.animations.stop();
                }
                if (this.secondsInactive > 12) {
                    var randomAff = this.affirmation[Math.floor(Math.random() * this.affirmation.length)];
                    document.getElementById('message').innerHTML = '<span class="red">Oblo says:</span> ' + randomAff;
                    this.secondsInactive = 0;
                    setTimeout(messageReset, 6000);
                    this.desk.animations.play('blink', 2, true);
                }

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

        this.funBubbles.loadTexture('health-' + fun, 0);
        this.drinkBubbles.loadTexture('health-' + drink, 0);
        this.sleepBubbles.loadTexture('health-' + sleep, 0);
    },

    shutdown: function() {
        clearInterval(this.tickInterval);
    },
};

// BOOKSHELF

var bookState = {

    preload: function() {
        game.load.image('books', 'http://procrastination.elisejakob.com/assets/bookcase-test4.png');
        game.load.image('book1', 'http://procrastination.elisejakob.com/assets/book1.png');
        game.load.image('book2', 'http://procrastination.elisejakob.com/assets/book2.png');
        game.load.image('book3', 'http://procrastination.elisejakob.com/assets/book3.png');
        game.load.image('book4', 'http://procrastination.elisejakob.com/assets/book4.png');
        game.load.image('book5', 'http://procrastination.elisejakob.com/assets/book5.png');
        game.load.image('book6', 'http://procrastination.elisejakob.com/assets/book6.png');
        game.load.image('back', 'http://procrastination.elisejakob.com/assets/back.png');
        game.load.image('akrasia-book', 'http://procrastination.elisejakob.com/assets/akrasia-book.png');
        game.load.image('escapism-book', 'http://procrastination.elisejakob.com/assets/escapism-book.png');
        game.load.image('hyperbolic-book', 'http://procrastination.elisejakob.com/assets/hyperbolic-book.png');
        game.load.image('dissonance-book', 'http://procrastination.elisejakob.com/assets/dissonance-book.png');
        game.load.image('definitions-book', 'http://procrastination.elisejakob.com/assets/definitions-book.png');
        game.load.image('closeButton', 'http://procrastination.elisejakob.com/assets/close.png');
    },

    create: function() {
        // background
        this.game.add.sprite(0, 0, 'books');

        // books
        this.book1 = game.add.button(32, 138, 'book1', this.bookFunc1, this);
        this.book2 = game.add.button(168, 200, 'book2', this.bookFunc2, this);
        this.book3 = game.add.button(300, 200, 'book3', this.bookFunc3, this);
        this.book4 = game.add.button(430, 138, 'book4', this.bookFunc4, this);
        this.book5 = game.add.button(570, 138, 'book5', this.bookFunc5, this);
        this.book6 = game.add.button(700, 200, 'book6', this.bookFunc6, this);

        // oblo complaints
        this.complainInterval = setInterval(this.complainFunction, 3000, this);

        // instructions
        var style = { font: "16px unibody8", fill: "#222", align: "center" };
        this.escLabel = this.game.add.text(game.world.centerX, 20, "* pick book with mouse or press esc to cancel *", style);
        this.escLabel.anchor.setTo(0.5, 0);

        // back button
        this.backButton = game.add.button(20, 20, 'back', this.backFunction, this);
    },

    bookFunc1: function() {
        this.akrasiaBook = game.add.image(0, 0, 'definitions-book');
        this.closeButton = game.add.button(770, 570, 'closeButton', this.closeBook, this);
        this.closeButton.anchor.setTo(1, 1);
    },

    bookFunc2: function() {
        this.akrasiaBook = game.add.image(0, 0, 'akrasia-book');
        this.closeButton = game.add.button(770, 570, 'closeButton', this.closeBook, this);
        this.closeButton.anchor.setTo(1, 1);
    },

    bookFunc3: function() {
        this.escapismBook = game.add.image(0, 0, 'escapism-book');
        this.closeButton = game.add.button(770, 570, 'closeButton', this.closeBook, this);
        this.closeButton.anchor.setTo(1, 1);
    },

    bookFunc4: function() {
        this.hyperbolicBook = game.add.image(0, 0, 'hyperbolic-book');
        this.closeButton = game.add.button(770, 570, 'closeButton', this.closeBook, this);
        this.closeButton.anchor.setTo(1, 1);
    },

    bookFunc5: function() {
        this.dissonanceBook = game.add.image(0, 0, 'dissonance-book');
        this.closeButton = game.add.button(770, 570, 'closeButton', this.closeBook, this);
        this.closeButton.anchor.setTo(1, 1);
    },

    bookFunc6: function() {
        document.getElementById('message').innerHTML = '<span class="red">Oblo says:</span> No way! This book is way too long!';
    },

    closeBook: function() {
        clearInterval(this.complainInterval);
        this.game.state.start('books');
    }, 
    backFunction: function() {
        this.game.state.start('main');
        document.getElementById('message').innerHTML = '<b class="shadowed">Procrastinate!</b>';
        clearInterval(this.complainInterval);
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
            "This is no fun!",
            "Let's play a game instead!"
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
        game.load.image('back', 'http://procrastination.elisejakob.com/assets/back.png');
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
        var style = { font: "16px unibody8", fill: "#222" };
        this.escLabel = this.game.add.text(game.world.centerX, 20, "* use arrow keys to move or press esc to cancel *", style);
        this.escLabel.anchor.setTo(0.5, 0);

        // score ticks
        this.scoreInterval = setInterval(scoreTick, 10000, this);

        // back button
        this.backButton = game.add.button(20, 20, 'back', this.backFunction, this);
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
    backFunction: function() {
        this.game.state.start('main');
        document.getElementById('message').innerHTML = '<b class="shadowed">Procrastinate!</b>';
        clearInterval(this.scoreInterval);
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
        game.load.image('flappyoblo-big', 'http://procrastination.elisejakob.com/assets/flappyoblo-big.png');
        game.load.image('ground', 'http://procrastination.elisejakob.com/assets/flappyground.png');
        game.load.spritesheet('flappyoblo', 'http://procrastination.elisejakob.com/assets/flappyoblo.png', 68, 48, 3);
        game.load.image('topPipe', 'http://procrastination.elisejakob.com/assets/pipe-top.png');
        game.load.image('bottomPipe', 'http://procrastination.elisejakob.com/assets/pipe-bottom.png');
        game.load.image('back', 'http://procrastination.elisejakob.com/assets/back.png');
    },

    // function after preload to set up game
    create: function() {
        // enable arcade physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // background sprite
        this.ground = this.game.add.tileSprite(0, 480, 800, 148, 'ground');
        this.ground.autoScroll(-200, 0);
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.immovable = true;

        // spirit guide big flappy oblo
        this.flappyObloBig = game.add.button(game.world.centerX, game.world.centerY, 'flappyoblo-big', this.startButton, this);
        this.flappyObloBig.anchor.setTo(0.5, 0.5);

        // flappy oblo
        this.flappyOblo = this.game.add.sprite(100, 245, 'flappyoblo');
        this.game.physics.arcade.enable(this.flappyOblo);
        this.flappyOblo.body.gravity.y = 800;
        this.flappyOblo.anchor.setTo(-0.2, 0.5);
        this.flappyOblo.animations.add('flap', [0, 1, 2], 12, true);
        this.flappyOblo.animations.play('flap');

        // flap
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.flap, this);

        // pipe group
        this.pipes = this.game.add.group();
        this.pipes.enableBody = true;
        this.pipes.physicsBodyType = Phaser.Physics.ARCADE;

        // make pipes
        this.pipeTimer = this.game.time.events.loop(1500, this.pipeMaker, this);
        this.pipeTimer.timer.start();

        // score label
        this.flappyScore = -2;
        var style = { font: "16px unibody8", fill: "#222" };
        this.labelScore = this.game.add.text(780, 20, "0", style);
        this.labelScore.anchor.setTo(1, 0);

        // esc label info
        var style = { font: "16px unibody8", fill: "#222" };
        this.escLabel = this.game.add.text(game.world.centerX, 20, "* flap with space or press esc to cancel *", style);
        this.escLabel.anchor.setTo(0.5, 0);

        // back button
        this.backButton = game.add.button(20, 20, 'back', this.backFunction, this);
    },

    // function called 60 times per second
    update: function() {
        // bird angle upward when it flaps
        if (this.flappyOblo.angle < 10)
            this.flappyOblo.angle += 1;

        this.game.physics.arcade.overlap(this.flappyOblo, this.pipes, this.restartGame, null, this);
        this.game.physics.arcade.collide(this.flappyOblo, this.ground, this.restartGame, null, this);

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            this.game.state.start('main');
            document.getElementById('message').innerHTML = '<b class="shadowed">Procrastinate!</b>';
        };
    },

    flap: function() {
        this.flappyOblo.body.velocity.y = -320;
        var animation = this.game.add.tween(this.flappyOblo);
        animation.to({angle: -20}, 100);
        animation.start();
    },

    backFunction: function() {
        this.game.state.start('main');
        document.getElementById('message').innerHTML = '<b class="shadowed">Procrastinate!</b>';
    },

    restartGame: function() {
        this.game.state.start('flappy');
        this.game.time.events.remove(this.pipeTimer);
    },

    pipeMaker: function() {  
        console.log("making pipesss");
        var pipeY = this.game.rnd.integerInRange(150, 500);
        this.pipe1 = this.pipes.create(800, pipeY, 'topPipe');
        this.pipe2 = this.pipes.create(800, pipeY, 'bottomPipe');
        this.pipe1.body.velocity.setTo(-200, 0);
        this.pipe2.body.velocity.setTo(-200, 0);
        //flappy wall: this.pipe1.anchor.setTo(0, 1)
        this.pipe1.anchor.setTo(0, 1.25);
        this.pipe2.anchor.setTo(0, 0);
        this.flappyScore++;
        if (this.flappyScore > 0) {
            this.labelScore.text = this.flappyScore;
            gameScore++;
        }
    },
};

// BRAIN DEFENCE

var fireRate = 100;
var nextFire = 0;
var bullets;
var distractions;

var brainState = {

    preload: function() {
        game.load.image('brain', 'http://procrastination.elisejakob.com/assets/brain-2.png');
        game.load.image('gameboy', 'http://procrastination.elisejakob.com/assets/gameboy.png');
        game.load.image('facebook', 'http://procrastination.elisejakob.com/assets/facebook.png');
        game.load.image('youtube', 'http://procrastination.elisejakob.com/assets/youtube.png');
        game.load.image('iphone2', 'http://procrastination.elisejakob.com/assets/iphone2.png');
        game.load.image('bullet', 'http://procrastination.elisejakob.com/assets/bullet.png');
        game.load.image('back', 'http://procrastination.elisejakob.com/assets/back.png');
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // esc label info
        var style = { font: "16px unibody8", fill: "#222" };
        this.escLabel = this.game.add.text(game.world.centerX, 20, "* aim and fire with mouse or press esc to cancel *", style);
        this.escLabel.anchor.setTo(0.5, 0);

        // bullet group
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        bullets.createMultiple(30, 'bullet', 0, false);
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

        // distraction group
        distractions = game.add.group();
        distractions.enableBody = true;
        distractions.physicsBodyType = Phaser.Physics.ARCADE;

        this.distractionInterval = setInterval(this.newDistraction, 800, this);

        // brain
        this.brain = game.add.sprite(game.world.centerX, game.world.centerY, 'brain');
        this.brain.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this.brain);
        this.brain.body.immovable = true;

        // back button
        this.backButton = game.add.button(20, 20, 'back', this.backFunction, this);
    },
    update: function() {
        this.brain.rotation = game.physics.arcade.angleToPointer(this.brain);

        if (game.input.activePointer.isDown){
                this.fire();
            }

        game.physics.arcade.overlap(bullets, distractions, this.hitDistraction, null, this);
        game.physics.arcade.collide(distractions, this.brain, this.hitBrain, null, this);

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            this.game.state.start('main');
            document.getElementById('message').innerHTML = '<b class="shadowed">Procrastinate!</b>';
            clearInterval(this.distractionInterval);
        }; 
    },
    hitDistraction: function (bullet, distraction) {
        bullet.kill();
        distraction.kill();
        gameScore++;
    },
    hitBrain: function (distraction) {
        gameScore--;
    },
    fire: function () {
        if (game.time.now > nextFire && bullets.countDead() > 0) {
            nextFire = game.time.now + fireRate;
            var bullet = bullets.getFirstExists(false);

            bullet.reset(this.brain.x, this.brain.y);

            bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
        }
    },
    newDistraction: function () {
        this.xNumber = Math.random();
        this.yNumber = Math.random();
        // X
        if (this.xNumber > 0.5) {
            xPosition = Math.random() * 150;
        } else {
            xPosition = 650 + Math.random() * 150;
        };
        // Y
        if (this.yNumber > 0.5) {
            yPosition = Math.random() * 150;
        } else {
            yPosition = 450 + Math.random() * 150;
        };

        var distractionObjects = [
                    'gameboy',
                    'facebook',
                    'youtube',
                    'iphone2',
                ];
        var randomDistraction = distractionObjects[Math.floor(Math.random() * distractionObjects.length)];

        this.distraction = distractions.create(xPosition, yPosition, randomDistraction);
        this.distraction.body.collideWorldBounds = true;
        this.distraction.body.bounce.setTo(0.9, 0.9);
        this.distraction.body.velocity.setTo(50 + Math.random() * 50, 50 + Math.random() * 50);

    },
    backFunction: function() {
        this.game.state.start('main');
        document.getElementById('message').innerHTML = '<b class="shadowed">Procrastinate!</b>';
        clearInterval(this.distractionInterval);
    },
};


// STATES

game.state.add('menu', menuState);
game.state.add('intro', introState); 
game.state.add('main', mainState);
game.state.add('books', bookState); 
game.state.add('avoid', avoidState);
game.state.add('flappy', flappyState);
game.state.add('brain', brainState); 
game.state.start('menu');
