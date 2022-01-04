//Functions written to solve the Rapidia Code Test
//The function SudokuSolver() below is the main function used for solving the puzzles.
//The function takes a Sudoku puzzle as an input in the same format as the test case provided


/*Helper Function
Inputs:
row - the row the tile is in
col - the column the tile is in
_colMaps - The numbers used in each of the puzzle's columns
_rowMaps - The numbers used in each of the puzzle's rows
_sqrMaps - The numbers used in each of the puzzle's squares

Takes a tile based on the inputted row and col and checks to see what numbers are currently available
Runtime is O(1)
*/
function numberCheck(row, col, _colMaps, _rowMaps, _sqrMaps) {
    free_nums = [];
    for (i = 1; i <= 9; i++) {
        if (!(_colMaps[col].has(i) || _rowMaps[row].has(i) || _sqrMaps[parseInt(row / 3) * 3 + parseInt(col / 3)].has(i))) {
            free_nums[free_nums.length] = i;
        }
    }
    return free_nums;
}


/*Helper Function. Recursively called.
Inputs:
index - The current tile. Used to calculate current row and column
_solution - The current working solution of Sudoku
_colMaps - The numbers used in each of the puzzle's columns
_rowMaps - The numbers used in each of the puzzle's rows
_sqrMaps - The numbers used in each of the puzzle's squares

Takes a tile and makes a brute force attempt to solve the Sudoku puzzle recursively.
Uses the numberCheck() function to determine what options are available for each tile and cycles through them until a correct solution is found.
Running time is estimated to O(1)
 */
function addGuess(index, _solution, _colMaps, _rowMaps, _sqrMaps) {
    //If the index provided exceeds the length of the sudoku puzzle, the puzzle has been completed
    if (index >= 81) {
        return true;
    }

    var col = index % 9;
    var row = parseInt((index - col) / 9);

    //If the tile is an already provided number, move to the next tile
    if (_solution[row * 9 + col] != 0) {
        return (addGuess(index + 1, _solution, _colMaps, _rowMaps, _sqrMaps));
    }

    var options = numberCheck(row, col, _colMaps, _rowMaps, _sqrMaps);

    //Shift through options as errors arise
    for (let i = 0; i < options.length; i++) {
        //Assume that the current option is correct
        _solution[row * 9 + col] = options[i];
        _colMaps[col].set(options[i], row * 9 + col);
        _rowMaps[row].set(options[i], row * 9 + col);
        _sqrMaps[parseInt(row / 3) * 3 + parseInt(col / 3)].set(options[i], row * 9 + col);

        if (index < 81 - 1) {
            //Check next tile
            if (addGuess(index + 1, _solution, _colMaps, _rowMaps, _sqrMaps)) {
                return true;
            }

            //If earlier assumption is false, reset changes
            _solution[row * 9 + col] = 0;
            _colMaps[col].delete(options[i]);
            _rowMaps[row].delete(options[i]);
            _sqrMaps[parseInt(row / 3) * 3 + parseInt(col / 3)].delete(options[i]);
        }
        //This is the last tile in the puzzle
        else {
            return true;
        }
    }
    //No options found are correct for later tiles. Must reset a previous tile
    return false;

}


/*Helper Function
 Inputs:
 _puzzle - The untouched sudoku puzzle
_colMaps - The numbers used in each of the puzzle's columns
_rowMaps - The numbers used in each of the puzzle's rows
_sqrMaps - The numbers used in each of the puzzle's squares

Initializes the column, row, and square maps which record what numbers have already been used in each.
Since the maps can only be 9 items large at most, the running time simplifies to O(1)
 */
function initMaps(_puzzle, _rowMaps, _colMaps, _sqrMaps) {
    //Intialize maps to length of 9
    for (i = 0; i < 9; i++) {
        rowMaps[i] = new Map();
        colMaps[i] = new Map();
        sqrMaps[i] = new Map();
    }

    //Scan through the puzzle and check what numbers have already been pre-filled
    for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
            if (_puzzle[row * 9 + col] != 0) {
                rowMaps[row].set(_puzzle[row * 9 + col], row * 9 + col);
                colMaps[col].set(_puzzle[row * 9 + col], row * 9 + col);
                sqrMaps[parseInt(row / 3) * 3 + parseInt(col / 3)].set(_puzzle[row * 9 + col], row * 9 + col);
            }
        }
    }
}


/*Main Function
 Inputs:
 _puzzle - The untouched sudoku puzzle

Computes the solution to a sudoku puzzle
Runs in O(1) runtime, using the times calcuated by the above helper functions and their estimated running times
 */
function SudokuSolver(_puzzle) {
    //Create the maps for the rows, columns, and squares. Records which numbers have already been used in each and for which tile
    rowMaps = [];
    colMaps = [];
    sqrMaps = [];
    initMaps(_puzzle, rowMaps, colMaps, sqrMaps);

    //Solves the puzzle
    addGuess(0, _puzzle, colMaps, rowMaps, sqrMaps);

    return _puzzle;

}