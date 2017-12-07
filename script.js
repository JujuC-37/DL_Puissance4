const $firstRow = $('.row:first-of-type');
const $message = $('.message');
const nbRows = 6;
const nbColumns = 7;
let currentPlayer = 'blue';

updateMessage(currentPlayer);

// ----------------------- events ------------------------
$firstRow.on('click', '.cell', function (event) {
    const $cell = $(event.target);
  
    const column = $cell.index() + 1;
    let $cellToColorize = findEmptyCellInColumn(column);

    if($cellToColorize == null) return;
    colorizeCell($cellToColorize, currentPlayer);

    switch(verifyEndGame()) {
        case 'nobody':  displayEndMessage(null);
                        break;

        case 'blue':    displayEndMessage('blue');
                        break;

        case 'red':     displayEndMessage('red');
                        break;

        default:        updateMessage();
    }
});

// ---------------------- functions ----------------------
function updateMessage() {
    $message.text(`Joueur actuel : ${currentPlayer}`);
}

function displayEndMessage(winner) {
    if(winner) {
        $message.text(`Bravo ! Le joueur ${winner} a gagné !`)
    }
    else {
        $message.text('Partie terminée. Pas de gagnant :(');
    }
}

function findEmptyCellInColumn(column) {
    return $(`.row > .cell:nth-of-type(${column}):not(.blue):not(.red)`)
        .last();
    /*
    for(let row = 1; row <= 6; row++) {
        let $cell = $(`.row:nth-last-of-type(${row}) > .cell:nth-of-type(${column})`);
        if (!$cell.is('.blue, .red')) {
            return $cell;
        }
    }
    return null;
    */
}

function colorizeCell($cellToColorize, player) {
    $cellToColorize.addClass(currentPlayer);

    if (currentPlayer === 'blue') {
        currentPlayer = 'red';
    }
    else {
        currentPlayer = 'blue';
    }

}

function verifyEndGame() {
    // array empty ?
    const emptyBoard = $('.row:first-of-type > .cell:not(.blue):not(.red)').length == 0;
    if(emptyBoard) return 'nobody';

    // array not empty
    const cellsArray = createCellsArray();

    const horizontallyAlignedPawns = findWinnerHorizontally(cellsArray);
    if(horizontallyAlignedPawns) return horizontallyAlignedPawns;

    const verticallyAlignedPawns = findWinnerVertically(cellsArray);
    if(verticallyAlignedPawns) return verticallyAlignedPawns;

    const diagonallyAlignedPawns = findWinnerDiagonally(cellsArray);
    if(diagonallyAlignedPawns) return diagonallyAlignedPawns;

    return null;
}

function createCellsArray() {
    let cellsArray = new Array(nbRows).fill(null);

    for(let row=0; row<nbRows; row++) {
        cellsArray[row] = new Array(nbColumns).fill(null);
    
        const cells = $(`.row:nth-of-type(${row+1}) > .cell`);

        for(let col=0; col<nbColumns; col++) {
            if($(cells[col]).hasClass('blue')) {
                cellsArray[row][col] = 'blue';
            }
            else if($(cells[col]).hasClass('red')){
                cellsArray[row][col] = 'red';
            }
        }
    }
    return cellsArray;
}

function findWinnerHorizontally(cellsArrays) {
    for(let row=0; row<cellsArrays.length; row++) {
        const line = cellsArrays[row].join(' ');
        
        if(line.includes('blue blue blue blue')){
            return 'blue';
        }
        else if(line.includes('red red red red')){
            return 'red';
        }
    }
    return null;
}

function findWinnerVertically(cellsArrays) {
    const transposedArray = cellsArrays[0].map((_,c) => {
                                    return cellsArrays.map(row => {
                                        return row[c]});
    });
    return findWinnerHorizontally(transposedArray);
}

function findWinnerDiagonally(cellsArray) {
    //top-left -> bottom-right
    for(let row=0; row<cellsArray.length-4; row++){
        for(let col=0; col<cellsArray[row].length-4; col++) {
            let line1 = '';

            for (let i=0; i<4; i++){
                line1 += `${cellsArray[row+i][col+i]} `;
            }
            if(line1.includes('blue blue blue blue')){
                return 'blue';
            }
            else if(line1.includes('red red red red')){
                return 'red';
            }
            line1 = '';
        }
    }

    //top-right -> bottom-left
    // for(let row=3; row<cellsArray.length; row++){
    //     for(let col=3; col<cellsArray[row].length; col++) {
    //         let line2 = '';

    //         for (let i=0; i<4; i++){
    //             line2 += `${cellsArray[row-i][col-i]} `;
    //         }
    //         if(line2.includes('blue blue blue blue')){
    //             return 'blue';
    //         }
    //         else if(line2.includes('red red red red')){
    //             return 'red';
    //         }
    //         line2 = '';
    //     }
    // }
    return null;
}