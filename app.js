const gameBoard = (function(){
    const gameBoard = ["", "", "", "", "", "", "", "", ""];
    function render() {
        const board = document.createElement("div");
        board.classList.add("board");
        for(let i = 1; i <= gameBoard.length; i++) {
            const field = document.createElement("div");
            field.classList.add("field");
            board.appendChild(field);
            displayController.btnWork(field, gameBoard, i, field);
        }
        const main = document.querySelector("main");
        main.classList.add("boardOn")
        main.appendChild(board);
    }

    return { render };
})();

const displayController = (function(){
    function btnWork(btn, board, index, field) {
        btn.addEventListener("click", () => {
            board[index] = "x";
            field.innerText = "X";
            console.log(board);
        })
    }

    return { btnWork }
})();
gameBoard.render();

const Player = function(nick) {
    return {nick};
}

const animate = (function() {
    window.addEventListener("DOMContentLoaded", () => {
        const header = document.querySelector("header");
        const footer = document.querySelector("footer");
        setTimeout(() => {
            header.classList.add("show");
            footer.classList.add("show");
        }, 1000)
    })
})();