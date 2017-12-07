const $firstRow = $('.row:first-of-type');
const $message = $('.message');
let currentPlayer = 'blue';

updateMessage();

// ----------------------- events ------------------------
$firstRow.on('click', '.cell', function (event) {
    const $cell = $(event.target);
  
    const column = $cell.index() + 1;
    let $cellToColorize = findEmptyCellInColumn(column);

    if($cellToColorize == null) return;
    colorizeCell($cellToColorize, currentPlayer);
    updateMessage();
});

// ---------------------- functions ----------------------
function updateMessage() {
  $message.text(`Joueur actuel : ${currentPlayer}`)
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
    
    updateMessage();
  }