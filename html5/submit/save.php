<?php 
		if (strlen($_POST['line']) > 0) {
			file_put_contents('tekst.txt', time() . " " . $_POST['line'] . "\n", FILE_APPEND);
		}
		header('Location: http://procrastination.elisejakob.com/submit');
	?>