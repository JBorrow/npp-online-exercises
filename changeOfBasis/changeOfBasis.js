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
			thisNumber = thisContent.re + " + " + thisContent.im + "i ";
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
}
	
var theta = 0.;

var unchangedBasis = calculate4x4(theta, theta);
var changedBasis = calculateChangeOfBasis(theta);

console.log(changedBasis);

document.write(printMatrixNice(unchangedBasis));
document.write(printMatrixNice(changedBasis));
