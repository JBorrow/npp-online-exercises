// Connect to the svg in shells.html
// 
// For more information, see http://www.petercollingridge.co.uk/data-visualisation/using-javascript-control-svg


var svg;
var numberOfProtons = 8;

$('#protons').on('load', function () {
	protonContainer = document.getElementById("protons");

	var protonSVG = protonContainer.contentDocument;

	for (i = 1; i <= numberOfProtons; i++) {
		thisProton = protonSVG.getElementById('p' + i);
		thisProton.style.fill = 'white'; // initially have all empty
	}
});

