const $firstRow = $('.row:first-of-type');
const $message = $('.message');

const colorPlayer1 = 'blue';
const colorPlayer2 = 'red';
let currentPlayer = 'Joueur 1';

updateMessage();

// ----------------------- events ------------------------
$firstRow.on('click', '.cell', function (event) {
    const $cell = $(event.target);
  
    const i = $cell.index() + 1;

    if (currentPlayer === 'Joueur 1') {
        addColorToCell(i,colorPlayer1);
        currentPlayer = 'Joueur 2';
    }
    else {
        addColorToCell(i,colorPlayer2);
        currentPlayer = 'Joueur 1';
    }
    updateMessage();
});

// ---------------------- functions ----------------------
function updateMessage() {
  $message.text(`Joueur actuel : ${currentPlayer}`)
}

function addColorToCell(numColumn, color) {
    let emptyCase = false;
    let i = 1;

    while($(`.row:nth-last-of-type(${i}) > .cell:nth-of-type(${numColumn})`).is(`.${colorPlayer1}, .${colorPlayer2}`)) {
        i++;
    }

    $(`.row:nth-last-of-type(${i}) > .cell:nth-of-type(${numColumn})`).addClass(color);

}