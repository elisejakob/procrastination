var startDate = new Date();
var startTime = startDate.getTime();

function secondsElapsed () { 
var dateNow = new Date(); 
var timeNow = dateNow.getTime(); 
var timeDiff = timeNow - startTime; 
var secondsElapsed = Math.floor ( timeDiff / 1000 ); 

return ( secondsElapsed ); 
} 

function scoreCount () {
	var secs = secondsElapsed();
	var timeScore = Math.floor ( secs / 30 );
	var totalScore = timeScore + gameScore;
	document.getElementById('score').innerHTML = "Score: " + totalScore;
	setTimeout( "scoreCount()", 500 ); 
}