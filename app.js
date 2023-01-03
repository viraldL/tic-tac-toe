const main = document.querySelector("main");
let Player1;
let Player2;
let Bot = false;
let turn = "x";
const particlesBox = document.querySelector("#tsparticles");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const gameBoard = (function () {
    const gameBoard = ["", "", "", "", "", "", "", "", ""];

    const checkWin = function (winBox) {
        let roundWon = false;
        for (let i = 0; i <= winConditions.length - 1; i++) {
            const condition = winConditions[i];
            const cell1 = gameBoard[condition[0]];
            const cell2 = gameBoard[condition[1]];
            const cell3 = gameBoard[condition[2]];

            if (cell1 == "" || cell2 == "" || cell3 == "") {
                continue;
            }
            if (cell1 == cell2 && cell2 == cell3) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            particlesBox.style.opacity = "1";
            if (turn === "o") {
                winBox.innerHTML = `<span class="turnX">${Player1.nick}</span> wins!`;
                turn = "end";
            } else if (turn === "x") {
                winBox.innerHTML = `<span class="turnO">${Player2.nick}</span> wins!`;
                turn = "end";
            }
        } else if (!gameBoard.includes("")) {
            winBox.innerHTML = '<span class="turnO">DRAW</span>';
            turn = "end";
        }
    };

    const restart = function (turne, box) {
        const restartBtn = document.createElement("div");
        restartBtn.innerText = "Restart";
        restartBtn.classList.add("restartBtn");
        box.appendChild(restartBtn);
        restartBtn.addEventListener("click", () => {
            particlesBox.style.opacity = "0";
            for (let i = 1; i <= gameBoard.length; i++) {
                gameBoard[i - 1] = "";
                const field = document.querySelectorAll(".field");
                field[i - 1].innerText = "";
            }
            turne.innerHTML = `<span class="turnX">${Player1.nick}'s </span> turn!`;
            turn = "x";
            restartBtn.classList.remove("restartBtnLight");
        });
        setTimeout(() => {
            restartBtn.classList.add("show2");
        }, 500);
    };

    const render = function () {
        const board = document.createElement("div");
        board.classList.add("board");
        const boardBox = document.createElement("div");
        boardBox.classList.add("boardBox");

        const turnText = document.createElement("div");
        turnText.classList.add("turnText");
        turnText.innerHTML = `<span class="turnX">${Player1.nick}'s </span> turn!`;

        const backBtn = document.createElement("div");
        backBtn.classList.add("backBtn");
        backBtn.innerHTML =
      '<img src="icons/2931166_arrow_back_undo_left_navigation_icon.svg"><p>Back</p>';
        backBtn.addEventListener("click", () => {
            for (let i = 1; i <= gameBoard.length; i++) {
                gameBoard[i - 1] = "";
                const field = document.querySelectorAll(".field");
                field[i - 1].innerText = "";
            }
            turn = "x";
            Bot = false;
            particlesBox.style.opacity = "0";
            turnText.classList.add("hide2");
            board.classList.add("hide2");
            player1Box.classList.add("hide2");
            player2Box.classList.add("hide2");
            backBtn.classList.add("hide2");
            setTimeout(() => {
                chooseMode.render();
            }, 500);
            setTimeout(() => {
                chooseMode.botGame.classList.add("show2");
                chooseMode.twoPlayer.classList.add("show2");
            }, 1000);
        });
        document.body.appendChild(backBtn);

        // Player names boxes
        const player1Box = document.createElement("div");
        const player2Box = document.createElement("div");
        const p1Txt = document.createElement("p");
        const p2Txt = document.createElement("p");
        p1Txt.classList.add("p1Txt");
        p2Txt.classList.add("p2Txt");
        p1Txt.innerText = "Player 1:";
        p2Txt.innerText = "Player 2:";
        player1Box.classList.add("player1Box");
        player2Box.classList.add("player2Box");
        if (Player1 != undefined && Player2 != undefined) {
            player1Box.appendChild(p1Txt);
            player2Box.appendChild(p2Txt);
            player1Box.innerText = Player1.nick;
            player2Box.innerText = Player2.nick;
        }

        if(!Bot){
            for (let i = 1; i <= gameBoard.length; i++) {
                const field = document.createElement("div");
                field.classList.add("field");
                board.appendChild(field);
                displayController.btnWork(field, gameBoard, i - 1, field, turnText);
            }
        } else if(Bot){
            for (let i = 1; i <= gameBoard.length; i++) {
                const field = document.createElement("div");
                field.classList.add("field");
                field.setAttribute("id", `field${i}`);
                board.appendChild(field);
                displayController.btnWorkBot(field, gameBoard, i - 1, field, turnText);
            }
        }
        main.setAttribute("class", "");
        main.classList.add("boardOn");

        // append things
        boardBox.appendChild(turnText);
        boardBox.appendChild(board);
        restart(turnText, boardBox);
        main.appendChild(player1Box);
        main.appendChild(boardBox);
        main.appendChild(player2Box);
        setTimeout(() => {
            turnText.classList.add("show2");
            board.classList.add("show2");
            player1Box.classList.add("show2");
            player2Box.classList.add("show2");
            backBtn.classList.add("show2");
        }, 500);
    };

    return { render, restart, checkWin };
})();

const Player = function (nick) {
    return { nick };
};

const chooseMode = (function () {
    const twoPlayer = document.createElement("div");
    const botGame = document.createElement("div");
    const render = function () {
        if (document.querySelector(".backBtn") !== null) {
            const backBtn = document.querySelector(".backBtn");
            document.body.removeChild(backBtn);
        }
        main.innerHTML = "";
        twoPlayer.classList.add("twoPlayerBtn");
        botGame.classList.add("botGameBtn");
        twoPlayer.innerText = "2 Players";
        botGame.innerText = "Bot";
        main.setAttribute("class", "");
        main.classList.add("chooseModeOn");
        main.appendChild(twoPlayer);
        main.appendChild(botGame);
    };

    return { render, twoPlayer, botGame };
})();

const botTurn = (function(){
    const move = function(board, turnBox) {
        if(turn == "o"){
            for(let i = 1; i <= 9; i++){
                const botIndex = Math.floor((Math.random()*9)+1);
                if (board[botIndex - 1] == "") {
                    board[botIndex - 1] = "o";
                    const fieldSelected = document.querySelector(`#field${botIndex}`)
                    fieldSelected.innerHTML = '<p class="o">O<p>';
                    turnBox.innerHTML = `<span class="turnX">${Player1.nick}'s </span> turn!`;
                    turn = "x";
                    gameBoard.checkWin(turnBox);
                    break;
                } else {
                    continue;
                }
            }}
    }

    return { move };
})();

const displayController = (function () {
    const btnWork = function (btn, board, index, field, turnBox) {
        btn.addEventListener("click", () => {
            if (turn === "x") {
                if (board[index] == "") {
                    board[index] = "x";
                    field.innerHTML = '<p class="x">X<p>';
                    turnBox.innerHTML = `<span class="turnO">${Player2.nick}'s </span> turn!`;
                    turn = "o";
                    gameBoard.checkWin(turnBox);
                }
            } else if (turn === "o") {
                if (board[index] == "") {
                    board[index] = "o";
                    field.innerHTML = '<p class="o">O<p>';
                    turnBox.innerHTML = `<span class="turnX">${Player1.nick}'s </span> turn!`;
                    turn = "x";
                    gameBoard.checkWin(turnBox);
                }
            } else if (turn === "end") {
                const restartBtn = document.querySelector(".restartBtn");
                restartBtn.classList.add("restartBtnLight");
            }
        });
    };

    const btnWorkBot = function (btn, board, index, field, turnBox) {
        btn.addEventListener("click", () => {
            if (turn === "x") {
                if (board[index] == "") {
                    board[index] = "x";
                    field.innerHTML = '<p class="x">X<p>';
                    turnBox.innerHTML = `<span class="turnO">${Player2.nick}'s </span> turn!`;
                    turn = "o";
                    gameBoard.checkWin(turnBox);
                    setTimeout(() => {
                        botTurn.move(board, turnBox)
                    },500)
                }
            } else if (turn === "end") {
                const restartBtn = document.querySelector(".restartBtn");
                restartBtn.classList.add("restartBtnLight");
            }
        });
    };

    return { btnWork, btnWorkBot };
})();

const formController = (function () {
    const btnWork = function (btn, input1, input2, form) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (input1.value != "" && input2.value != "") {
                Player1 = Player(input1.value);
                Player2 = Player(input2.value);
                form.classList.add("hide2");
                setTimeout(() => {
                    main.innerHTML = "";
                    gameBoard.render();
                }, 500);
            }
        });
    };

    const btnWorkBot = function (btn, input1, form , text2) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (input1.value != "") {
                Player1 = Player(input1.value);
                Player2 = Player(text2.innerText)
                form.classList.add("hide2");
                Bot = true;
                setTimeout(() => {
                    main.innerHTML = "";
                    gameBoard.render();
                }, 500);
            }
        });
    };
    return { btnWork, btnWorkBot };
})();

const modeController = (function () {
    chooseMode.twoPlayer.addEventListener("click", () => {
        chooseMode.twoPlayer.classList.add("hide");
        chooseMode.botGame.classList.add("slideRight");
        setTimeout(() => {
            namePlayers.render();
        }, 500);

        setTimeout(() => {
            chooseMode.twoPlayer.classList.remove("hide");
            chooseMode.botGame.classList.remove("slideRight");
            chooseMode.twoPlayer.classList.remove("show2");
            chooseMode.botGame.classList.remove("show2");
        }, 1000);
    });
    chooseMode.botGame.addEventListener("click", () => {
        chooseMode.twoPlayer.classList.add("slideLeft");
        chooseMode.botGame.classList.add("hide");
        setTimeout(() => {
            namePlayers.renderBot();
        }, 500);
        
        setTimeout(() => {
            chooseMode.twoPlayer.classList.remove("slideLeft");
            chooseMode.botGame.classList.remove("hide");
            chooseMode.twoPlayer.classList.remove("show2");
            chooseMode.botGame.classList.remove("show2");
        }, 1000);
    });
})();

const namePlayers = (function () {
    const render = function () {
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
        inputP2.setAttribute("id", "P2NAME");
        inputP1.setAttribute("id", "P1NAME");
        inputStart.setAttribute("type", "submit");
        inputStart.setAttribute("value", "Start!");

        textP1.innerText = "Player 1:";
        textP2.innerText = "Player 2:";

        divP1.classList.add("divPlayer1");
        divP2.classList.add("divPlayer2");
        divP1.appendChild(textP1);
        divP1.appendChild(inputP1);
        divP2.appendChild(textP2);
        divP2.appendChild(inputP2);

        form.classList.add("playerForm");
        form.setAttribute("onsubmit", "return false;");
        form.appendChild(divP1);
        form.appendChild(divP2);
        form.appendChild(inputStart);

        formBox.classList.add("formBox");
        formBox.appendChild(form);
        setTimeout(() => {
            formBox.classList.add("show2");
        }, 500);

        main.appendChild(formBox);
        formController.btnWork(inputStart, inputP1, inputP2, formBox);
    };

    const renderBot = function() {
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
        const inputStart = document.createElement("input");

        inputP1.setAttribute("type", "text");
        inputP1.classList.add("inputPlayer");
        inputP1.setAttribute("placeholder", "Player 1 name");
        inputP1.setAttribute("required", "");
        inputP1.setAttribute("id", "P1NAME");
        inputStart.setAttribute("type", "submit");
        inputStart.setAttribute("value", "Start!");

        textP1.innerText = "Player 1:";
        const botNum = Math.floor((Math.random()*10) + 1);
        switch(botNum){
        case 1:
            textP2.innerText = "Bot Tom";
            break;
        case 2:
            textP2.innerText = "Bot Bob";
            break;
        case 3:
            textP2.innerText = "Bot Lara";
            break;
        case 4:
            textP2.innerText = "Bot Mike";
            break;
        case 5:
            textP2.innerText = "Bot Henry";
            break;
        case 6:
            textP2.innerText = "Bot Tom";
            break;
        case 7:
            textP2.innerText = "Bot Bob";
            break;
        case 8:
            textP2.innerText = "Bot Lara";
            break;
        case 9:
            textP2.innerText = "Bot Mike";
            break;
        case 10:
            textP2.innerText = "Bot Henry";
            break;
        default:
            textP2.innerText = "Bot Tom";
        }

        divP1.classList.add("divPlayer1");
        divP2.classList.add("divPlayer2");
        divP1.appendChild(textP1);
        divP1.appendChild(inputP1);
        divP2.appendChild(textP2);

        form.classList.add("playerForm");
        form.setAttribute("onsubmit", "return false;");
        form.appendChild(divP1);
        form.appendChild(divP2);
        form.appendChild(inputStart);

        formBox.classList.add("formBox");
        formBox.appendChild(form);
        setTimeout(() => {
            formBox.classList.add("show2");
        }, 500);

        main.appendChild(formBox);
        formController.btnWorkBot(inputStart, inputP1, formBox, textP2);
    }

    return { render , renderBot };
})();

const animate = (function () {
    window.addEventListener("DOMContentLoaded", () => {
        const header = document.querySelector("header");
        const footer = document.querySelector("footer");
        chooseMode.render();
        setTimeout(() => {
            header.classList.add("show");
            footer.classList.add("show");
            chooseMode.botGame.classList.add("show2");
            chooseMode.twoPlayer.classList.add("show2");
        }, 1000);
    });
})();
