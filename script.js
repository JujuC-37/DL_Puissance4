const $firstRow = $('.row:first-of-type');
const $message = $('.message');
let currentPlayer = 'blue';
const nbRows = 6;
const nbColumns = 6;

updateMessage(currentPlayer);

// ----------------------- events ------------------------
$firstRow.on('click', '.cell', function (event) {
    const $cell = $(event.target);
  
    const column = $cell.index() + 1;
    let $cellToColorize = findEmptyCellInColumn(column);

    if($cellToColorize == null) return;
    colorizeCell($cellToColorize, currentPlayer);

    if(verifyEndGame()) {
        updateMessage(null);
    }
    else {
        updateMessage(currentPlayer);
    }
});

// ---------------------- functions ----------------------
function updateMessage(player) {
    if(player != null) {
        $message.text(`Joueur actuel : ${player}`)
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

    updateMessage();
}

function verifyEndGame() {
    return $('.row:first-of-type > .cell:not(.blue):not(.red)').length == 0;
}