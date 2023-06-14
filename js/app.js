/*----- constants -----*/
const COLORS = {
    '0': "white",
    "1": "purple",
    "-1": "orange"
}

/*----- state variables -----*/
let board; //array of 7 col arrays
let turn; // 1 or -1
let winner; // null = no winner;  1 or -1 = winner; "T" = tie;

/*----- cached elements  -----*/
const messageEl = document.querySelector("h1");
const playAgainBtn = document.querySelector("button")
const markerEls = [...document.querySelectorAll("#markers > div")];
/*----- event listeners -----*/
document.getElementById("markers").addEventListener("click", handleDrop) // DO NOT Invoke FUNCTION()
playAgainBtn.addEventListener("click", init);
/*----- functions -----*/
init();
//initialize all state, then call render();
function init() {
    //To visualize the board's mapping to the dom, rotate the board array 90º counter clockwise
    board = [
        [0, 0, 0, 0, 0, 0], //col 0
        [0, 0, 0, 0, 0, 0], //col 1
        [0, 0, 0, 0, 0, 0], //col 2
        [0, 0, 0, 0, 0, 0], //col 3
        [0, 0, 0, 0, 0, 0], //col 4
        [0, 0, 0, 0, 0, 0], //col 5
        [0, 0, 0, 0, 0, 0], //col 6
    ];
    turn = 1;
    winner = null;
    render();
}
//in response to user interaction, update all impacted state, then call render
function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    //set up guards -could add a winner condition but winner condition isn't entirely necessary since markers are hidden at game end
    if (colIdx === -1) {
        return;
    }
    //shortcut to the column array
    const colArray = board[colIdx]
    //find the index of the first 0 in colArray
    const rowIdx = colArray.indexOf(0);

    //update board state with current player value (turn)
    colArray[rowIdx] = turn;
    //switch player turn
     turn*= -1;
     //check for winner
     winner = getWinner(colIdx, rowIdx);

    render();
 }
 //check for winner in board state and reutnr null if no winer, -1 and 1 if a player has won, "T" if tie
function getWinner(colIdx, rowIdx) {
    return checkVerticalWin(colIdx,rowIdx);

}
function checkVerticalWin(colIdx,rowIdx) {
    return countAdjacent(colIdx, rowIdx, 0, -1) === 3 ? board[colIdx, rowIdx] : null;
}

function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    //shortcut variable to the player value
    const player = board[colIdx][rowIdx];
    console.log(player); 
 
}


//Visualize all state in the DOM
function render() {
    renderBoard();
    renderMessage();
    renderControls(); //hide/show UI elements
}

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        //iterate over the cells in the cur column (colarray)
        colArr.forEach(function(cellVal, rowIdx) {
            //console.log(colIdx, rowIdx, cellVal);
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            //console.log(cellEl);
            //>> here you will be able using look up data structures instead of big conditionals
            cellEl.style.backgroundColor = COLORS[cellVal];
        });
    });
}

 function renderMessage() {
    if (winner === "T") {
        messageEl.innerText = "It's a Tie!!!";
    } else if (winner) {
        messageEl.innerHTML = `<span style = "color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`;

    } else {
        //game is in play message should read whoevers turn it is, their color's turn
        messageEl.innerHTML = `<span style = "color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    }
 }

 function renderControls() {
    //ternary expression - best when you want one of two values returned
    playAgainBtn.style.visibility = winner ? "visible" : "hidden";
    //iterate over and hide and show the marker elements depending on whether columns are full
    markerEls.forEach(function(markerEl, colIdx) {
    const hideMarker = !board[colIdx].includes(0) || winner;
    markerEl.style.visibility = hideMarker ? "hidden" : "visible";
    })
 }

 
 