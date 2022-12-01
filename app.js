const main = document.querySelector("main");
let Player1;
let Player2;
let Bot;
let turn = true;

const gameBoard = (function(){
    const gameBoard = ["", "", "", "", "", "", "", "", ""];

    const restart = function(turne, box) {
        const restartBtn = document.createElement("div");
        restartBtn.innerText = `Restart`;
        restartBtn.classList.add("restartBtn");
        box.appendChild(restartBtn);
        restartBtn.addEventListener("click", () => {
            for(let i = 1; i <= gameBoard.length; i++) {
                gameBoard[i-1] = "";
                const field = document.querySelectorAll(".field");
                field[i-1].innerText = "";
            }
            turne.innerHTML = `<span class="turnX">${Player1.nick}'s </span> turn!`;
            turn = true;
        console.log(gameBoard);
        });
        setTimeout(() => {
            restartBtn.classList.add("show2");
        }, 500);
    }

    const render = function() {
        const board = document.createElement("div");
        board.classList.add("board");
        const boardBox = document.createElement("div");
        boardBox.classList.add("boardBox")

        const turnText = document.createElement("div");
        turnText.classList.add("turnText");
        turnText.innerHTML = `<span class="turnX">${Player1.nick}'s </span> turn!`;


        //Player names boxes
        const player1Box = document.createElement("div");
        const player2Box = document.createElement("div");
        const p1Txt = document.createElement("p");
        const p2Txt = document.createElement("p");
        p1Txt.classList.add("p1Txt");
        p2Txt.classList.add("p2Txt");
        p1Txt.innerText = `Player 1:`
        p2Txt.innerText = `Player 2:`
        player1Box.classList.add("player1Box");
        player2Box.classList.add("player2Box");
        if(Player1 != undefined && Player2 != undefined){
            player1Box.appendChild(p1Txt);
            player2Box.appendChild(p2Txt);
            player1Box.innerText = Player1.nick;
            player2Box.innerText = Player2.nick;
        }


        for(let i = 1; i <= gameBoard.length; i++) {
            const field = document.createElement("div");
            field.classList.add("field");
            board.appendChild(field);
            displayController.btnWork(field, gameBoard, i-1, field, turnText, player1Box, player2Box);
        }
        main.setAttribute("class", "");
        main.classList.add("boardOn");

        //append things
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
        }, 500)
    }

    return { render , restart };
})();

const Player = function(nick) {
    return {nick};
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
    const btnWork = function(btn, board, index, field, turnBox, p1Box, p2Box) {
        btn.addEventListener("click", () => {
            if(turn) {
                if(board[index] == ""){
                    board[index] = "x";
                    field.innerHTML = `<p class="x">X<p>`;
                    turnBox.innerHTML = `<span class="turnO">${Player2.nick}'s </span> turn!`

                    console.log(board);
                    turn = false;
                }
            } else {
                if(board[index] == ""){
                    board[index] = "o";
                    field.innerHTML = `<p class="o">O<p>`;
                    turnBox.innerHTML  = `<span class="turnX">${Player1.nick}'s </span> turn!`
                    console.log(board);
                    turn = true;
                }
            }
        })
    }

    return { btnWork }
})();

const formController = (function(){
    const btnWork = function(btn, input1, input2, form) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                if(input1.value != "" && input2.value != ""){
                     Player1 = Player(input1.value);
                     Player2 = Player(input2.value);
                    form.classList.add("hide2");
                    setTimeout(() => {
                        main.innerHTML = "";
                        gameBoard.render();
                    },500)
                }
            }) 
        }
    return { btnWork };
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
        inputP2.setAttribute("id", "P2NAME");
        inputP1.setAttribute("id", "P1NAME");
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
        formController.btnWork(inputStart, inputP1, inputP2, formBox);
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