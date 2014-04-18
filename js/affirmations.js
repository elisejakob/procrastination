var affirmation = [
"You'll feel like it tomorrow!", 
"Just take a minute to browse the internet!", 
"You deserve to have fun!", 
"You'll work better under pressure!", 
"You'll feel better if you watch cute kittens on Youtube!",
"All work and no play makes Jack a dull boy!",
"Pressure makes you more creative!",
"You'll have lots of time to do your work later!",
"YOLO!",
"Enjoy today! You might get hit by a bus tomorrow!",
"You'll be more focused later!",
"If you start tomorrow, you'll still have time to finish!",
"Taking a break is taking care of yourself!",
"Your parents will love you anyway!"
];

		$(document).ready( function(){
			$("#aff-button").click( function(){
				var rand = affirmation[Math.floor(Math.random() * affirmation.length)];
				$("#affirmation").html(rand);
			});
		});