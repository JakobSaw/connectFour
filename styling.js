const w = window.innerWidth;
const h = window.innerHeight;
let boardHeight;
if (w > h) {
    // Landscape
    boardHeight = h * 0.7;
} else {
    // Portrait
    boardHeight = w * 0.75;
}
let boardWidth = boardHeight * 1.17143;
let footWidth = boardHeight * 1.25;
let footHeight = boardHeight * 0.15;
let boardMarginLeft = (footWidth - boardWidth) / 2;
let borderWidth = boardHeight * 0.03;
let borderRadius = boardHeight * 0.05;
let circleWidth = boardWidth * 0.1;
let paddingBoard = boardHeight * 0.04;

// ChipsContainer Position
const ccWidth = boardWidth - paddingBoard * 2 - borderWidth * 2;
const ccHeight = boardHeight - paddingBoard * 2 - borderWidth * 2;
const ccLeft = (w - ccWidth) / 2;
const ccTop = (h - (ccHeight + footHeight)) / 2;

// get width and height of Grid Items
const gridElementsWidth = ccWidth / 7;
const gridElementsHeight = ccHeight / 6;
let previewContainer = document.getElementById("previewContainer");
let previewContainerDiv = document.querySelector("#previewContainer div");
previewContainer.style = `width: ${gridElementsWidth}px; height: ${gridElementsHeight}px; top: ${
    gridElementsHeight * 5
}px`;
let fallDownContainer = document.getElementById("fallDownContainer");
let fallDownContainerDiv = document.querySelector("#fallDownContainer div");
fallDownContainer.style = `width: ${gridElementsWidth}px; height: ${gridElementsHeight}px; transform: translateY(-${gridElementsHeight}px)`;

// Stylings
const board = document.getElementById("board");
board.style = `height: ${boardHeight}px; width: ${boardWidth}px; margin-left: ${boardMarginLeft}px; padding: ${paddingBoard}px;`;
const foot = document.getElementById("foot");
foot.style = `height: ${footHeight}px; width: ${footWidth}px; transform: translateY(-${borderWidth}px)`;
const topPadding = document.getElementById("top");
topPadding.style = `height: ${paddingBoard + 2}px; transform: translateY(-2px)`;
const bottomPadding = document.getElementById("bottom");
bottomPadding.style = `height: ${paddingBoard}px; top: calc(100% - ${paddingBoard}px)`;
const chipsContainer = document.getElementById("chipsContainer");
chipsContainer.style = `width: ${ccWidth}px; height: ${ccHeight}px; top: ${ccTop}px; left: ${ccLeft}px`;

// Restart
const restartSpace = (h - boardHeight - footHeight) / 2 + borderWidth;
const oneRestartSpace = restartSpace / 5;
let restart = document.getElementById("restart");
restart.style = `height: ${
    oneRestartSpace * 3
}px; bottom:${oneRestartSpace}px; left: calc(50vw - ${
    (oneRestartSpace * 3) / 2
}px); display: none;`;

// Counter
const redCounterElement = document.querySelector(".redCounter");
const blackCounterElement = document.querySelector(".blackCounter");
redCounterElement.style = `top: ${
    (h - boardHeight - footHeight) / 2
}px; left: ${(w - boardWidth) / 2 - w * 0.1}px`;
blackCounterElement.style = `top: ${
    (h - boardHeight - footHeight) / 2
}px; left: auto; right: ${(w - boardWidth) / 2 - w * 0.1}px;`;

// Computer
let computerContainer = document.querySelector(".computer_container");
computerContainer.style = `bottom: ${restartSpace}px; right: ${
    (w - footWidth) / 2 - 100
}px;`;
computerContainer.children[0].style = `height: ${footHeight}px; `;

// Click on Nav
let twoPlayers = document.querySelector(".two_players");
twoPlayers.addEventListener("click", () => {
    document.querySelector("nav").style.display = "none";
    document.querySelector("main").style.display = "block";
    chipsContainer.style.display = "block";
});
let selAgainstComputer = document.querySelector(".against_computer");
selAgainstComputer.addEventListener("click", () => {
    document.querySelector("nav").style.display = "none";
    document.querySelector("main").style.display = "block";
    chipsContainer.style.display = "block";
    againstComputer = true;
});

// Root CSS
document.documentElement.style.setProperty(
    "--border-width",
    `${borderWidth}px`
);
document.documentElement.style.setProperty(
    "--border-radius",
    `${borderRadius}px`
);
document.documentElement.style.setProperty(
    "--circles-width",
    `${circleWidth}px`
);
