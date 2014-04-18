var globalAvatarImage = new Image();
globalAvatarImage.src = "assets/pixel.png";

var avatarX = 0;
var avatarY = 0;

function setUpCanvas() {
	var drawingCanvas = document.getElementById("drawingCanvas");
	var avatarImage = globalAvatarImage;
	drawingCanvas.addEventListener("mousemove", handleMouseMovement); // når man beveger pekeren over elementet med id drawingCanvas kjøres funksjonen redrawAvatar
}

function handleMouseMovement(mouseEvent) {
	var drawingCanvas = document.getElementById("drawingCanvas");
	var avatarImage = globalAvatarImage;
	avatarX = mouseEvent.offsetX;
	avatarY = mouseEvent.offsetY;
	drawingCanvas.getContext("2d").drawImage(avatarImage, avatarX, avatarY); // tegner avataren på nytt i forhold til pekerens posisjon

}







































