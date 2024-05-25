function calculateDeterminant(matrix) {
    if (matrix.length !== 3 || matrix[0].length !== 3) {
        throw new Error('Invalid matrix size. Expected a 3x3 matrix.');
    }

    const [row1, row2, row3] = matrix;

    const det =
        row1[0] * (row2[1] * row3[2] - row2[2] * row3[1]) -
        row1[1] * (row2[0] * row3[2] - row2[2] * row3[0]) +
        row1[2] * (row2[0] * row3[1] - row2[1] * row3[0]);

    return det;
}
function bella() {
    console.log(bella)
}
// Example usage:
const matrix = [
    [1, 5, 3],
    [4, 2, 6],
    [7, 8, 9]
];

const determinant = calculateDeterminant(matrix);
console.log(determinant); // Output: 0