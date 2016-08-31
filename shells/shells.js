// Connect to the svg in shells.html
// 
// For more information, see http://www.petercollingridge.co.uk/data-visualisation/using-javascript-control-svg


var svg;
var numberOfProtons = 126;

function getSVGById(id) {
	container = document.getElementById(id);

	return container.contentDocument;
};

function changeProton(id, color) {
	try {
		thisProton = protonSVG.getElementById('p' + id);
		thisProton.style.fill = color;
	} catch(err) {
		// do nothing - we've probably run out of protons
	}
}

function changeProtons(protonSVG, numToChange, color='red', emptyColor='white') {
	for (i = 1; i <= numToChange; i++) {
		changeProton(i, color);
	};

	for (i = numToChange+1; i <= numberOfProtons; i++) { // to ensure using lower numbers displays correctly
		changeProton(i, emptyColor);
	};
};

//initially, we must wait for the SVG to load NOT the document.
$('#protons').on('load', function () {
	protonSVG = getSVGById('protons');
	changeProtons(protonSVG, 0);
});

$('#numProtons').on('input', function () {
	numProtons = $('#numProtons').val();
	changeProtons(protonSVG, numProtons);
});
