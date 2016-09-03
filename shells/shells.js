// Connect to the svg in shells.html
// 
// For more information, see http://www.petercollingridge.co.uk/data-visualisation/using-javascript-control-svg


var svg;
var numberOfProtons = 126;
var numberOfNeutrons = 126;

var protonStructure = {
	p1s1 : 2,
	p1p3 : 4,
	p1p1 : 2,
	p1d5 : 6,
	p2s1 : 2,
	p1d3 : 4,
	p1f7 : 8,
	p2p3 : 4,
	p1f5 : 6,
	p2p1 : 2,
	p1g9 : 10,
	p1g7 : 8,
	p2d5 : 6,
	p1h11 : 12,
	p2d3 : 4,
	p3s1 : 2,
	p1h9 : 10,
};	

var neutronStructure = {
	n1s1 : 2,
	n1p3 : 4,
	n1p1 : 2,
	n1d5 : 6,
	n2s1 : 2,
	n1d3 : 4,
	n1f7 : 8,
	n2p3 : 4,
	n1f5 : 6,
	n2p1 : 2,
	n1g9 : 10,
	n2d5 : 6,
	n1g7 : 8,
	n1h11 : 12,
	n2d3 : 4,
	n3s1 : 2,
	n1h9 : 10,
};	

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

function highlight(thisSVG, id, color='red') {
	text = thisSVG.getElementById(id.substring(0, id.length -1));
	line = thisSVG.getElementById(id + 'l');
	text.style.fill = color;
	line.style.stroke = color;
}

function changeItems(thisSVG, numToChange, maxNum, subId, color='red', emptyColor='white') {
	for (i = 1; i <= numToChange; i++) {
		changeItem(thisSVG, i, color, subId);
	};

	for (i = numToChange+1; i <= maxNum; i++) { // to ensure using lower numbers displays correctly
		changeItem(thisSVG, i, emptyColor, subId);
	};
};

function findWhere(n, structure) {
	// Where is the final nucleon?
	var soFar = 0;
	for (key in structure) {
		if (n > soFar + structure[key]) {
			soFar = soFar + structure[key];
		} else {
			return key;
		}
	}
	return "Sorry, out of range!";
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
	maxLevel = findWhere(numProtons, protonStructure);
	highlight(protonSVG, maxLevel);
});


$('#numNeutrons').on('input', function () {
	numNeutrons= $('#numNeutrons').val();
	if (numNeutrons > numberOfNeutrons) {
		numNeutrons = numberOfNeutrons; // so we don't crash
	} else {
		// all ok
	}
	changeItems(neutronSVG, numNeutrons, numberOfNeutrons, 'n', color='black');
	console.log(findWhere(numNeutrons, neutronStructure));
});
