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


/* Test Code for tensorProduct

var a = [[math.complex(0, 0), math.complex(0, 1)], [math.complex(0, 1), math.complex(0, 0)]];
var b = [[math.complex(0, 0), math.complex(0, 0)], [math.complex(1, 0), math.complex(1, 0)]];

console.log(a);
var product = tensorProduct(a, b);

console.log('final');
for (var i = 0; i < product.length; i++) {
	console.log(product[i]);
}
*/
