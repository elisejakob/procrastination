var globalAvatarImage = new Image();
var globalEnemyImage = new Image();
globalAvatarImage.src = "http://procrastination.elisejakob.com/spill/flappy/assets/bird.png";
globalEnemyImage.src = "http://procrastination.elisejakob.com/spill/flappy/assets/pipe.png";

var enemyY = [];
var enemyX = [];
var avatarX = 0;
var avatarY = 0;

var ticksSurvived = 0;
var mostTicksSurvived = 0;

function setUpGame() {
	if (localStorage.getItem("bestScore")) {
		mostTicksSurvived = localStorage.getItem("bestScore");
	}
	// draws a copy of avatar.png on the canvas
	// sets up an event listener to call the other function, handleMouseMovement
	var gameCanvas = document.getElementById("gamecanvas");
	var avatarImage = globalAvatarImage;

	gameCanvas.getContext("2d").drawImage(avatarImage, Math.random() * 300, Math.random() * 300); // tar frem bildet avatarImage i 2d og plasserer det en tilfeldig plass: math.random * 300 velger et tall mellom 0 og 300 og tegner en avatar der

	gameCanvas.addEventListener("mousemove", handleMouseMovement); // når man beveger pekeren over elementet med id gamecanvas kjøres funksjonen redrawAvatar
	setInterval(handleTick, 50);
}

function handleMouseMovement(mouseEvent) {
	avatarX = mouseEvent.offsetX;
	avatarY = mouseEvent.offsetY;
}

function handleTick() {
	var gameCanvas = document.getElementById("gamecanvas");
	var avatarImage = globalAvatarImage;
	var enemyImage = globalEnemyImage;
	var currentEnemyNumber = 0;
	var numberOfEnemies = enemyX.length;

	if (Math.random() < 1/10) {
		enemyY.push(-30);
		enemyX.push(Math.random() * 800);
	}

	while (currentEnemyNumber < numberOfEnemies) {
		enemyY[currentEnemyNumber] = enemyY[currentEnemyNumber] + 1;
		currentEnemyNumber = currentEnemyNumber + 1;
	}

	gameCanvas.width = 800; // erases the content of the canvas
	gameCanvas.getContext("2d").drawImage(avatarImage, avatarX, avatarY); // tegner avataren på nytt i forhold til pekerens posisjon

	currentEnemyNumber = 0;
	while (currentEnemyNumber < numberOfEnemies) {
		gameCanvas.getContext("2d").drawImage(enemyImage, enemyX[currentEnemyNumber], enemyY[currentEnemyNumber]);
		currentEnemyNumber = currentEnemyNumber + 1;
	}

	gameCanvas.getContext("2d").font = "16px Helvetica";
	gameCanvas.getContext("2d").textBaseline = "top";
	gameCanvas.getContext("2d").textAlign = "left";
	gameCanvas.getContext("2d").fillText("Score: " + ticksSurvived, 5, 5);

	gameCanvas.getContext("2d").textAlign = "right";
	gameCanvas.getContext("2d").fillText("High score: " + mostTicksSurvived, 795, 5);

	currentEnemyNumber = 0;
	while (currentEnemyNumber < numberOfEnemies) {
	    if (((avatarX < enemyX[currentEnemyNumber] && enemyX[currentEnemyNumber] < avatarX + 25) || (enemyX[currentEnemyNumber] < avatarX && avatarX < enemyX[currentEnemyNumber] + 25) ) && ( (avatarY < enemyY[currentEnemyNumber] && enemyY[currentEnemyNumber] < avatarY + 25) || (enemyY[currentEnemyNumber] < avatarY && avatarY < enemyY[currentEnemyNumber] + 25) ) ) {
	    	alert("You hit an enemy! You survived " + ticksSurvived + " ticks.");
	    	if (ticksSurvived > mostTicksSurvived) {
	    		alert("***HIGH SCORE!*** You survived " + ticksSurvived + " ticks. Beat your old high score by " + (ticksSurvived - mostTicksSurvived) + " ticks!");
	    		mostTicksSurvived = ticksSurvived;
	    		localStorage.setItem("bestScore", mostTicksSurvived);
	    	}
	    	startNewGame();
	    }
	    currentEnemyNumber = currentEnemyNumber + 1;
	}

	ticksSurvived = ticksSurvived + 1;
}

function startNewGame() {
	enemyX = [];
	enemyY = [];
	ticksSurvived = 0;
}



