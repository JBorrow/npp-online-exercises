// Connect to the svg in shells.html
// 
// For more information, see http://www.petercollingridge.co.uk/data-visualisation/using-javascript-control-svg


var svg;
var numberOfProtons = 126;
var numberOfNeutrons = 126;

function getSVGById(id) {
	container = document.getElementById(id);

	return container.contentDocument;
};

function changeItem(thisSVG, id, color, subId) {
	try {
		thisItem = thisSVG.getElementById(subId + id);
		thisItem.style.fill = color;
	} catch(err) {
		// do nothing - we've probably run out of protons/neutrons
	}
}

function changeItems(thisSVG, numToChange, maxNum, subId, color='red', emptyColor='white') {
	for (i = 1; i <= numToChange; i++) {
		changeItem(thisSVG, i, color, subId);
	};

	for (i = numToChange+1; i <= maxNum; i++) { // to ensure using lower numbers displays correctly
		changeItem(thisSVG, i, emptyColor, subId);
	};
};

//initially, we must wait for the SVG to load NOT the document.
$('#protons').on('load', function () {
	protonSVG = getSVGById('protons');
	neutronSVG = getSVGById('neutrons');
	changeItems(protonSVG, 0, numberOfProtons, 'p');
	changeItems(neutronSVG, 0, numberOfNeutrons, 'n');
});

$('#numProtons').on('input', function () {
	numProtons = $('#numProtons').val();
	if (numProtons > numberOfProtons) {
		numProtons = numberOfProtons; // so we don't crash
	} else {
		// all ok
	}
	changeItems(protonSVG, numProtons, numberOfProtons, 'p');
});


$('#numNeutrons').on('input', function () {
	numNeutrons= $('#numNeutrons').val();
	if (numNeutrons > numberOfNeutrons) {
		numNeutrons = numberOfNeutrons; // so we don't crash
	} else {
		// all ok
	}
	changeItems(neutronSVG, numNeutrons, numberOfNeutrons, 'n');
});
