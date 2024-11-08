let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn = true; //player X
let count = 0;

let winningPatters = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turn = true;
    enableBoxes();
    count = 0;
    msgContainer.classList.add("hide");
}


boxes.forEach((box) => {
    box.addEventListener("click", (evt) => {
        if (turn) {
            box.innerText = "X";
            turn = false;
        }
        else {
            box.innerText = "O";
            turn = true;
        }
        count++;
        box.disabled = true;
        checkwinner(count);
        
    });

});


const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};



const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => { 
    msg.innerText = `Congratulations Winner is Player ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const noWinner = () => { 
    msg.innerText = `It's a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkwinner = (count) => {
    for (pattern of winningPatters) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") { 
            if (pos1Val === pos2Val && pos3Val === pos2Val) {
                showWinner(pos1Val);
            }
            else if (count === 9) { 
                noWinner();
            }
        }
    }
};


newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click",resetGame);