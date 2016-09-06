/* Provides logic and displays for the changeOfBasis interactive exhibit
 * as part of the Nuclear and Particle Physics course
 */

function tensorProduct(a, b) {
	// Calculates a x b (in a very inefficnet way!
	var aDimensions = [a.length, a[0].length];
	var bDimensions = [b.length, b[0].length];

	var newDimensions = [aDimensions[0]*bDimensions[0], aDimensions[1]*bDimensions[1]];
	
	var finalArray = [];

	var aElement;
	var bElement;

	for (i=0; i<newDimensions[0]; i++) {
		finalArray[i] = [];
		for (j=0; j<newDimensions[1]; j++) {
			aElement = a[parseInt(i/bDimensions[0])][parseInt(j/bDimensions[1])];
			bElement = b[parseInt(i % bDimensions[0])][parseInt(j % bDimensions[1])];

			finalArray[i][j] = math.multiply(aElement, bElement); // this must be used with mathjs
		}
	}
	
	return finalArray;
};


function calculate2x2(theta) {
	// Returns e^i[0, theta][-theta, 0]
	return [[math.complex(1, 0), math.exp(math.complex(0, theta))], [math.exp(math.complex(0, -theta)), math.complex(1, 0)]];
};


function calculate4x4(theta, alpha) {
	// The 'bare' 4x4 before any change of basis.
	var matrixA = calculate2x2(theta);
	var matrixB = calculate2x2(alpha);
	return tensorProduct(matrixA, matrixB);
};


function calculateChangeOfBasis(theta) {
	// Hand-calcualtes the basis-changed matrix (for speed).
	// Actual matrix available in NPP notes or elsewhere
	// MUST USE MATH FUNCTIONS - regular +, *, does not work with complex objects.
	var u = calculate2x2(theta);
	var rt2 = math.complex(math.sqrt(2), 0);
	
	return [[math.square(u[0][0]), math.multiply(rt2, math.multiply(u[0][0], u[0][1])), math.square(u[0][1]), math.complex(0, 0)],
			[math.multiply(rt2, math.multiply(u[0][0], u[1][0])), math.add(math.multiply(u[0][1], u[1][0]), math.multiply(u[0][0], u[1][1])), math.multiply(rt2, math.multiply(u[0][1], u[1][1])), math.complex(0, 0)],
			[math.square(u[1][0]), math.multiply(rt2, math.multiply(u[1][0], u[1][1])), math.square(u[1][1]), math.complex(0, 0)],
			[math.complex(0,0), math.complex(0,0), math.complex(0,0), math.complex(1,0)]];
}


function printMatrixNice(mat) {
	var dimensions = [mat.length, mat[0].length];
	
	var printable = "$$ \\begin{pmatrix} \n";

	for (i=0; i<dimensions[0]; i++) {
		for (j=0; j<dimensions[1]; j++) {
			thisContent = mat[i][j];
			if (thisContent.im < 0) {
				operator = ""; // already included in thisContent.im is a -
			} else {
				operator = " + ";
			};
			thisNumber = thisContent.re.toPrecision(3) + operator + thisContent.im.toPrecision(3) + "i ";
			printable = printable + thisNumber + " & ";
		};

		if (i != dimensions[0]-1) {
			printable = printable + " \\\\ \n";
		} else {
			// final element
			printable = printable + "\n";
		};
	};

	printable = printable + "\\end{pmatrix} $$";

	return printable;
};


function makePrettyMatrix(cellsX, cellsY, sizeX, sizeY, ID) {
	// Give ID of the div you want this to be created in.
	var xWidth = sizeX/cellsX;
	var yWidth = sizeY/cellsY;
	
	var bigSVG = SVG(ID).size(sizeX, sizeY);

	// Create backing boxes & lines
	for (x=0; x < cellsX; x++) {
		for (y=0; y < cellsY; y++) {
			var thisRect = bigSVG.rect(xWidth, yWidth);
			thisRect.attr({
				id: ID + 'cell' + x + y,
				x : x*xWidth,
				y: y*yWidth,
				stroke: '#000',
				'stroke-width': 1,
				fill: 'white',
			});

			var thisLine = bigSVG.line((x+0.5)*xWidth, (y+0.5)*yWidth, (x+0.5)*xWidth, y*yWidth);
			thisLine.attr({
				id: ID + 'line' + x + y,
				stroke: '#000',
				'stroke-width': 1,
			});
		}
	};

	return bigSVG;
};


function mapPrettyMatrix(svg, matrix, cellsX, cellsY, sizeX, sizeY, ID) {
	// Put a matrix onto the pretty matrix framework.
	var xWidth = sizeX/cellsX;
	var yWidth = sizeY/cellsY;

	for (x=0; x < cellsX; x++) {
		for (y=0; y < cellsY; y++) {
			var thisLine = svg.get(ID + 'line' + x + y);
			var element = matrix[x][y];

			thisLine.plot((x+0.5)*xWidth, (y+0.5)*yWidth, (x+0.5*element.re)*xWidth, (y + 0.5*element.re)*yWidth);
		}
	}
};	
	
function update() {
	var unchangedBasis = calculate4x4(theta, theta);
	var changedBasis = calculateChangeOfBasis(theta);

	document.getElementById('theta').innerHTML = "$$ \\theta = " + theta.toPrecision(3) + " $$";
	mapPrettyMatrix(unchanged, unchangedBasis, 4, 4, 300, 300, 'unchanged');
	mapPrettyMatrix(changed, changedBasis, 4, 4, 300, 300, 'changed');

	theta = theta + 0.01;

	MathJax.Hub.Typeset();
};

theta = 0.;
unchanged = makePrettyMatrix(4, 4, 300, 300, 'unchanged');
changed = makePrettyMatrix(4, 4, 300, 300, 'changed');

setInterval(update, 10);

