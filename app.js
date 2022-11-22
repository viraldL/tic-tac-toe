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
        main.classList.add("boardOn");

        main.appendChild(board);
    }

    return { render };
})();

const Player = function(nick, mark) {
    const showName = () => {}
    return {nick};
}

const chooseMode = (function() {
    const twoPlayer = document.createElement("div");
    const botGame = document.createElement("div");
    function render() {
        twoPlayer.classList.add("twoPlayerBtn");
        botGame.classList.add("botGameBtn");
        twoPlayer.innerText = "2 Players";
        botGame.innerText = "Bot";

        const main = document.querySelector("main");
        main.classList.add("chooseModeOn");
        main.appendChild(twoPlayer);
        main.appendChild(botGame);
    }

    return { render, twoPlayer, botGame };
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

const modeController = (function() {
    chooseMode.twoPlayer.addEventListener("click" , () => {
        chooseMode.twoPlayer.classList.add("hide");
        chooseMode.botGame.classList.add("slideRight");
    })
    chooseMode.botGame.addEventListener("click" , () => {
        chooseMode.twoPlayer.classList.add("slideLeft");
        chooseMode.botGame.classList.add("hide");
    })
})();

const namePlayers = (function() {

})();


const animate = (function() {
    window.addEventListener("DOMContentLoaded", () => {
        const header = document.querySelector("header");
        const footer = document.querySelector("footer");
        chooseMode.render();
        setTimeout(() => {
            header.classList.add("show");
            footer.classList.add("show");
           chooseMode.botGame.classList.add("show2");
           chooseMode.twoPlayer.classList.add("show2");
        }, 1000)
    })
})();