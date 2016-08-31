// Connect to the svg in shells.html
// 
// For more information, see http://www.petercollingridge.co.uk/data-visualisation/using-javascript-control-svg


var svg;
var numberOfProtons = 8;

function getSVGById(id) {
	container = document.getElementById(id);

	return container.contentDocument;
};

function changeProtons(protonSVG, numToChange, color, emptyColor='white') {
	for (i = 1; i <= numToChange; i++) {
		thisProton = protonSVG.getElementById('p' + i);
		thisProton.style.fill = color;
	};

	for (i = numToChange; i <= numberOfProtons; i++) { // to ensure using lower numbers displays correctly
		thisProton = protonSVG.getElementById('p' + i);
		thisProton.style.fill = emptyColor;
	};
};

//initially, we must wait for the SVG to load NOT the document.
$('#protons').on('load', function () {
	protonSVG = getSVGById('protons');
	changeProtons(protonSVG, 0, 'white');
});

$('#numProtons').on('input', function () {
	numProtons = $('#numProtons').val();
	changeProtons(protonSVG, numProtons, 'red');
});
