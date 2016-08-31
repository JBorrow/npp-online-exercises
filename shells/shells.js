// Connect to the svg in shells.html
// 
// For more information, see http://www.petercollingridge.co.uk/data-visualisation/using-javascript-control-svg


var svg;
var numberOfProtons = 8;

function getSVGById(id) {
	container = document.getElementById(id);

	return container.contentDocument;
};

function changeProtons(protonSVG, numToChange, color) {
	for (i = 1; i <= numToChange; i++) {
		thisProton = protonSVG.getElementById('p' + i);
		thisProton.style.fill = color;
	}
};

//initially, we must wait for the SVG to load NOT the document.
$('#protons').on('load', function () {
	protonSVG = getSVGById('protons');
	changeProtons(protonSVG, numberOfProtons, 'white');
});

$('#numProtons').on('input', function () {
	numProtons = $('#numProtons').val();
	changeProtons(protonSVG, numProtons, 'red');
});
