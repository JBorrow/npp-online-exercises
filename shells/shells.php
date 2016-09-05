<!DOCTYPE html>
<html lang='en'>

	<head>
	
		<title> Shells Demo </title>
		<meta charset='utf-8'>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.3/css/bootstrap.min.css" integrity="sha384-MIwDKRSSImVFAZCVLtU0LMDdON6KVCrZHyVQQj6e8wIEJkW4tvwqXrbMIya1vriY" crossorigin="anonymous">
		
		<link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">

		<style>

			.myimg {
				display:block;
				margin-top:2em;
			}

		</style>

	</head>

	<body>
		<div class='container'>
			<div class='jumbotron' style='margin-top:2em;'>
				<h1 class='display-3'>Shell Model Demo</h1>
			</div>

			<div class='row'>
				<div class='col-xs-12'>
					<?php require_once('parsedown/Parsedown.php');
					$Parsedown = new Parsedown();
					$MyText = file_get_contents('info.md');
					echo $Parsedown->text($MyText);
					?>
				</div>
			</div>

		<div class='buttons'>
			<form>
				<div class='form-group row'>
					<label for="numProtons" class='col-xs-4 col-form-label'>Number of Protons</label>
					<div class='col-xs-8'>
						<input type='text' name='numProtons' id='numProtons' class='form-control'>
					</div>
				</div>

				<div class='form-group row'>
					<label for="numNeutrons" class='col-xs-4 col-form-label'>Number of Neutrons</label>
					<div class='col-xs-8'>
						<input type='text' name='numNeutrons' id='numNeutrons' class='form-control'>
					</div>
				</div>
			</form>
		</div>
		</div>

		<div class='container'>
		<div class='row'>
		<div class='myimg col-md-6'>

			<object id='protons' type='image/svg+xml' data='./protons-thin.svg' width="100%">
			</object>

		</div>
		<div class='myimg col-md-6'>

			<object id='neutrons' type='image/svg+xml' data='./neutrons-thin.svg' width="100%">
			</object>

		</div>
		</div>
		</div>
	
		<footer>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js" integrity="sha384-THPy051/pYDQGanwU6poAc/hOdQxjnOEXzbT+OuUAFqNqFjL+4IGLBgCJC3ZOShY" crossorigin="anonymous"></script>
			<script src='./shells.js'></script>
			<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"></script>
			<script>
				MathJax.Hub.Config({
					tex2jax: {
						inlineMath: [['$','$'], ['\\(','\\)']],
						processEscapes: true
					}
				});</script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.min.js" integrity="sha384-Plbmg8JY28KFelvJVai01l8WyZzrYWG825m+cZ0eDDS1f7d/js6ikvy1+X+guPIB" crossorigin="anonymous"></script>
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.3/js/bootstrap.min.js" integrity="sha384-ux8v3A6CPtOTqOzMKiuo3d/DomGaaClxFYdCu2HPMBEkf6x2xiDyJ7gkXU0MWwaD" crossorigin="anonymous"></script>
		</footer>
		</div>
	</body>

</html>
