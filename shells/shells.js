// Connect to the svg in shells.html
// 
// For more information, see http://www.petercollingridge.co.uk/data-visualisation/using-javascript-control-svg


var svg;

$('#protons').on('load', function () {
	svg = document.getElementById("protons");

	console.log(svg);

	var subdoc = svg.contentDocument;
	
	var mycirc = subdoc.getElementById('p1');

	mycirc.setAttribute("fill", "lime");

	console.log(mycirc);
	
	console.log(subdoc);
});

