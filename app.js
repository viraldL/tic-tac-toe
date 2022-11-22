const main = document.querySelector("main");

const gameBoard = (function(){
    const gameBoard = ["", "", "", "", "", "", "", "", ""];
    const render = function() {
        const board = document.createElement("div");
        board.classList.add("board");
        for(let i = 1; i <= gameBoard.length; i++) {
            const field = document.createElement("div");
            field.classList.add("field");
            board.appendChild(field);
            displayController.btnWork(field, gameBoard, i, field);
        }
        main.classList.add("boardOn");

        main.appendChild(board);
    }

    return { render };
})();

const Player = function(nick, mark) {
    return {nick, mark};
}

const chooseMode = (function() {
    const twoPlayer = document.createElement("div");
    const botGame = document.createElement("div");
    const render = function() {
        twoPlayer.classList.add("twoPlayerBtn");
        botGame.classList.add("botGameBtn");
        twoPlayer.innerText = "2 Players";
        botGame.innerText = "Bot";

        main.classList.add("chooseModeOn");
        main.appendChild(twoPlayer);
        main.appendChild(botGame);
    }

    return { render, twoPlayer, botGame };
})();

const displayController = (function(){
    const btnWork = function(btn, board, index, field) {
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
        setTimeout(() => {
            namePlayers.render();
        }, 500)
    })
    chooseMode.botGame.addEventListener("click" , () => {
        chooseMode.twoPlayer.classList.add("slideLeft");
        chooseMode.botGame.classList.add("hide");
    })
})();

const namePlayers = (function() {
    const render = function() {
        main.innerHTML = "";
        main.setAttribute("class", "");
        main.classList.add("namePlayersOn");
        const formBox = document.createElement("div");
        const form = document.createElement("form");
        const divP1 = document.createElement("div");
        const divP2 = document.createElement("div");
        const textP1 = document.createElement("span");
        const textP2 = document.createElement("span");
        const inputP1 = document.createElement("input");
        const inputP2 = document.createElement("input");
        const inputStart = document.createElement("input");

        inputP1.setAttribute("type", "text");
        inputP1.classList.add("inputPlayer");
        inputP2.classList.add("inputPlayer");
        inputP2.setAttribute("type", "text");
        inputP2.setAttribute("placeholder", "Player 2 name");
        inputP1.setAttribute("placeholder", "Player 1 name");
        inputP1.setAttribute("required", "");
        inputP2.setAttribute("required", "");
        inputStart.setAttribute("type", "submit");
        inputStart.setAttribute("value", "Start!");

        textP1.innerText = `Player 1:`;
        textP2.innerText = `Player 2:`;

        divP1.classList.add("divPlayer1");
        divP2.classList.add("divPlayer2");
        divP1.appendChild(textP1);
        divP1.appendChild(inputP1);
        divP2.appendChild(textP2);
        divP2.appendChild(inputP2);

        form.classList.add("playerForm");
        form.setAttribute("onsubmit", "return false;")
        form.appendChild(divP1);
        form.appendChild(divP2);
        form.appendChild(inputStart);

        formBox.classList.add("formBox");
        formBox.appendChild(form);
        setTimeout(() => {
            formBox.classList.add("show2")
        }, 500)

        main.appendChild(formBox);
        
    }

    return { render };
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