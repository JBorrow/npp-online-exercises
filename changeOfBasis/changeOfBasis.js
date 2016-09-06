/* Provides logic and displays for the changeOfBasis interactive exhibit
 * as part of the Nuclear and Particle Physics course
 */

function calculate2x2(theta) {
	/* returns e^{i((0, theta), (-theta, 0))} */
	var original = math.matrix([[0, math.complex(0, theta)],[math.complex(0, -theta), 0]]);
	return math.exp(original)
};

var productTwoTwoByTwo = product.bind(null, [2,2], [2,2]); // tensor-product lib

function calculate4x4(theta, alpha) {
	/* the tensor product of two matricies */
	var firstMatrix = calculate2x2(theta);
	var secondMatrix = calculate2x2(alpha);

	return productTwoTwoByTwo(firstMatrix, secondMatrix);
};


console.log(calculate2x2(0));
console.log(calculate2x2(math.pi));
console.log(calculate4x4(0, 0));

