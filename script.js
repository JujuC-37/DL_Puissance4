const $firstRow = $('.row:first-of-type');
let nbTours = 0;

$firstRow.on('click', '.cell', function (event) {
    nbTours += 1;
    const actualColor = (nbTours%2 == 1 ? 'blue' : 'red');

    const $cell = $(event.target);
  
    const i = $cell.index() + 1;
  
    $(`.row:last-of-type > .cell:nth-of-type(${i})`)
        .addClass(actualColor);
});