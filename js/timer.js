// THESE TWO VARIABLES STORE THE TIME AND DATE WHEN THE PAGE IS LOADED
var startDate = new Date();
var startTime = startDate.getTime();

// THIS FUNCTION CALCULATES THE SECONDS ELAPSED SINCE THE PAGE WAS LOADED
function secondsElapsed () 
{ 
var date_now = new Date (); 
var time_now = date_now.getTime (); 
var time_diff = time_now - startTime; 
var secondsElapsed = Math.floor ( time_diff / 1000 ); 

return ( secondsElapsed ); 
} 

// THIS FUNCTION TAKES THE SECONDS ELAPSED AND CONVERTS THEM FOR OUTPUT
function timeSpent () 
{ 
// TAKE THE SECONDS ELAPSED
var secs = secondsElapsed ();

// CONVERT SECONDS TO MINUTES AND SECONDS
var mins = Math.floor ( secs / 60 );
secs -= mins * 60;

// CONVERT MINUTES TO HOURS AND MINUTES
var hour = Math.floor ( mins / 60 );
mins -= hour * 60;

// DISPLAY THE FINAL OUTPUT TIME STRING
document.display.timeElapsed.value = pad ( hour ) + ":" + pad ( mins ) + ":" + pad ( secs );

// RECURSIVELY RE-RUN THE FUNCTION EVERY SECOND
setTimeout( "timeSpent ()", 1000 ); 
}

// THIS FUNCTION INSERTS A LEADING ZERO (IF NECESSARY) TO PROVIDE UNIFORM OUTPUT
function pad ( num )
{
return ( ( num > 9 ) ? num : "0" + num );
}