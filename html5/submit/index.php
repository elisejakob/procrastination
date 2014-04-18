<!doctype html>
<html>
<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<title>procrastination</title>
	<link rel="shortcut icon" href="/favicon.gif" type="image/gif">
	<link rel="icon" href="/favicon.gif" type="image/gif">
	<link rel="stylesheet" href="http://procrastination.elisejakob.com/submit/submitstyle.css" type="text/css">
	<script type="text/javascript" src="//use.typekit.net/rrd3gnu.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
</head>
<body>
	<form name="input" action="save.php" method="post">
		<label class="field_label" for="form-line">What do you do when you're procrastinetion?</label>
		<input class="field_input" type="text" name="line" required placeholder="What do you do when you're procrastinating?" id="form-line">
		<input type="submit" value="Submit">
	</form>

	<div id="lines">
		<?php
		$lines = array_reverse(file('tekst.txt'));

		foreach ($lines as $line_num => $line) {
			$line = explode (" ", $line, 2);
			echo '<article><span class="time">' . date("j. F Y, H:i:s", $line[0]) . "</span>" . " " . 
			'<p>' . htmlspecialchars($line[1]) . "</p></article>\n";
		}
		?>
	</div>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-48635872-1', 'elisejakob.com');
  ga('send', 'pageview');

</script>
	
</body>
</html>