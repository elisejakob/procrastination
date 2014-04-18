setInterval(function image(){
	var img = document.createElement("img");
	img.src = "assets/speechbubble-2.png";
	document.getElementById('speechbubble').appendChild(img);
}, 9000);

setInterval(function remove(){
	var holdKjeft = document.getElementById('speechbubble');
	holdKjeft.removeChild(holdKjeft.childNodes[0]);
}, 4000);