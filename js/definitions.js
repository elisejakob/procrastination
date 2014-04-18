var definition = [
"rocrastination is the voluntary postponement of an intended course of action despite having the opportunity to act and expecting to be worse off as a result of the delay. – Piers Steel", 
"Procrastination is the vice of putting off what one means to do, until later than one meant to do it. – Elijah Millgram", 
"Procrastination is irrationally failing to do something in good time. – Duncan MacIntosh", 
"Procrastination is the grave in which opportunity is buried. – Procrastinators Anonymous", 
"Procrastination is the action of ruining your own life for no apparent reason. – Waitbutwhy.com"
];

		$(document).ready( function(){
			$("#def-button").click( function(){
				var rand = definition[Math.floor(Math.random() * definition.length)];
				$("#definition").html(rand);
			});
		});