let boardSections = [
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
    "free",
];
const columns = [
    [0, 7, 14, 21, 28, 35],
    [1, 8, 15, 22, 29, 36],
    [2, 9, 16, 23, 30, 37],
    [3, 10, 17, 24, 31, 38],
    [4, 11, 18, 25, 32, 39],
    [5, 12, 19, 26, 33, 40],
    [6, 13, 20, 27, 34, 41],
];
let player = "red";
let fallDownBlocked = false;
let wins = false;

// Computer
let againstComputer = false;
let slotCount = 0;
function getRandomArbitrary() {
    return Math.floor(Math.random() * 7);
}
const getColumnAndRow = (slot) => {
    let obj = undefined;
    columns.forEach((currentC, indexC) => {
        if (currentC.indexOf(slot) > -1) {
            if (slot < 7) {
                // console.log("get 1", slot, indexC, 1);
                obj = {
                    column: indexC,
                    row: 1,
                };
            } else if (slot < 14) {
                // console.log("get 2", slot, indexC, 2);
                obj = {
                    column: indexC,
                    row: 2,
                };
            } else if (slot < 21) {
                // console.log("get 3", slot, indexC, 3);
                obj = {
                    column: indexC,
                    row: 3,
                };
            } else if (slot < 28) {
                // console.log("get 4", slot, indexC, 4);
                obj = {
                    column: indexC,
                    row: 4,
                };
            } else if (slot < 35) {
                // console.log("get 5", slot, indexC, 5);
                obj = {
                    column: indexC,
                    row: 5,
                };
            } else {
                // console.log("get 6", slot, indexC, 6);
                obj = {
                    column: indexC,
                    row: 6,
                };
            }
        }
    });
    return obj;
};
let doNotUse = [false, false, false, false, false, false, false];
//
const computersTurn = () => {
    // console.log("Computers turn");
    computerContainer.style.display = "block";
    let slotfound = false;
    //
    const makeNewComputerMove = (columnNum) => {
        if (boardSections[columns[columnNum][5]] === "free") {
            checkColumn(5, columnNum);
        } else if (boardSections[columns[columnNum][4]] === "free") {
            checkColumn(4, columnNum);
        } else if (boardSections[columns[columnNum][3]] === "free") {
            checkColumn(3, columnNum);
        } else if (boardSections[columns[columnNum][2]] === "free") {
            checkColumn(2, columnNum);
        } else if (boardSections[columns[columnNum][1]] === "free") {
            checkColumn(1, columnNum);
        } else if (boardSections[columns[columnNum][0]] === "free") {
            checkColumn(0, columnNum);
        } else {
            console.log("Column Full, computer must choose a different one");
            getRandom(columnNum);
        }
    };
    const getRandom = (columnNum) => {
        const randomNum = getRandomArbitrary();
        if (randomNum !== columnNum && !doNotUse[randomNum]) {
            makeNewComputerMove(randomNum);
        } else {
            getRandom(columnNum);
        }
    };

    const makeComputerMove = (columnNum) => {
        // Check if Computer should out something there

        //
        if (doNotUse[columnNum]) {
            // Do Not Use Column, find a different one
            getRandom(columnNum);
        } else {
            if (boardSections[columns[columnNum][5]] === "free") {
                checkColumn(5, columnNum);
            } else if (boardSections[columns[columnNum][4]] === "free") {
                checkColumn(4, columnNum);
            } else if (boardSections[columns[columnNum][3]] === "free") {
                checkColumn(3, columnNum);
            } else if (boardSections[columns[columnNum][2]] === "free") {
                checkColumn(2, columnNum);
            } else if (boardSections[columns[columnNum][1]] === "free") {
                checkColumn(1, columnNum);
            } else if (boardSections[columns[columnNum][0]] === "free") {
                checkColumn(0, columnNum);
            } else {
                console.log(
                    "Column Full, computer must choose a different one"
                );
                getRandom(columnNum);
            }
        }
    };
    const makeFreeMove = () => {
        // 1. Check for 2 side by side and block them in there direction
        boardSections.forEach((current, i) => {
            // Right
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i + 2);
                if (
                    firstSlot?.column < 5 &&
                    firstSlot?.row === 6 &&
                    boardSections[i + 1] === "red" &&
                    boardSections[i + 2] === "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                } else if (
                    firstSlot?.column < 5 &&
                    firstSlot?.row < 6 &&
                    boardSections[i + 1] === "red" &&
                    boardSections[i + 2] === "free" &&
                    boardSections[i + 2 + 7] !== "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
            // Left
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i - 2);
                if (
                    firstSlot?.column > 1 &&
                    firstSlot?.row === 6 &&
                    boardSections[i - 1] === "red" &&
                    boardSections[i - 2] === "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                } else if (
                    firstSlot?.column > 1 &&
                    firstSlot?.row < 6 &&
                    boardSections[i - 1] === "red" &&
                    boardSections[i - 2] === "free" &&
                    boardSections[i - 2 + 7] !== "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
            // Top Right
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i - 6 * 2);
                if (
                    firstSlot?.column < 5 &&
                    firstSlot?.row > 2 &&
                    boardSections[i - 6] === "red" &&
                    boardSections[i - 6 * 2] === "free" &&
                    boardSections[i - 6 * 2 + 7] !== "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
            // Bottom Left
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i - 8 * 2);
                if (
                    firstSlot?.column > 1 &&
                    firstSlot?.row === 4 &&
                    boardSections[i - 8] === "red" &&
                    boardSections[i - 8 * 2] === "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                } else if (
                    firstSlot?.column > 1 &&
                    firstSlot?.row < 4 &&
                    boardSections[i - 8] === "red" &&
                    boardSections[i - 8 * 2] === "free" &&
                    boardSections[i - 8 * 2 + 7] !== "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
            // Bottom Right
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i + 8 * 2);
                if (
                    firstSlot?.column < 5 &&
                    firstSlot?.row === 4 &&
                    boardSections[i + 8] === "red" &&
                    boardSections[i + 8 * 2] === "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                } else if (
                    firstSlot?.column < 5 &&
                    firstSlot?.row < 4 &&
                    boardSections[i + 8] === "red" &&
                    boardSections[i + 8 * 2] === "free" &&
                    boardSections[i + 8 * 2 + 7] !== "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
            // Top Left
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i - 8 * 2);
                if (
                    firstSlot?.column > 1 &&
                    firstSlot?.row > 2 &&
                    boardSections[i - 8] === "red" &&
                    boardSections[i - 8 * 2] === "free" &&
                    boardSections[i - 8 * 2 + 7] !== "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
            // Top
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i - 7 * 2);
                if (
                    firstSlot?.row > 2 &&
                    boardSections[i - 7] === "red" &&
                    boardSections[i - 7 * 2] === "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
        });
        // 2.Check for 2 indirectly
        boardSections.forEach((current, i) => {
            // Right
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i + 1);
                if (
                    firstSlot?.column < 5 &&
                    firstSlot?.row === 6 &&
                    boardSections[i + 1] === "free" &&
                    boardSections[i + 2] === "red" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                } else if (
                    firstSlot?.column < 5 &&
                    firstSlot?.row < 6 &&
                    boardSections[i + 1] === "free" &&
                    boardSections[i + 2] === "red" &&
                    boardSections[i + 1 + 7] !== "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
            // Left
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i - 1);
                if (
                    firstSlot?.column > 1 &&
                    firstSlot?.row === 6 &&
                    boardSections[i - 1] === "free" &&
                    boardSections[i - 2] === "red" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                } else if (
                    firstSlot?.column > 1 &&
                    firstSlot?.row < 6 &&
                    boardSections[i - 1] === "free" &&
                    boardSections[i - 2] === "red" &&
                    boardSections[i - 1 + 7] !== "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
            // Top Right
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i - 6);
                if (
                    firstSlot?.column < 5 &&
                    firstSlot?.row > 2 &&
                    boardSections[i - 6] === "free" &&
                    boardSections[i - 6 * 2] === "red" &&
                    boardSections[i - 6 + 7] !== "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
            // Bottom Left
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i - 8);
                if (
                    firstSlot?.column > 1 &&
                    firstSlot?.row === 4 &&
                    boardSections[i - 8] === "free" &&
                    boardSections[i - 8 * 2] === "red" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                } else if (
                    firstSlot?.column > 1 &&
                    firstSlot?.row < 4 &&
                    boardSections[i - 8] === "free" &&
                    boardSections[i - 8 * 2] === "red" &&
                    boardSections[i - 8 + 7] !== "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
            // Bottom Right
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i + 8);
                if (
                    firstSlot?.column < 5 &&
                    firstSlot?.row === 4 &&
                    boardSections[i + 8] === "free" &&
                    boardSections[i + 8 * 2] === "red" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                } else if (
                    firstSlot?.column < 5 &&
                    firstSlot?.row < 4 &&
                    boardSections[i + 8] === "free" &&
                    boardSections[i + 8 * 2] === "red" &&
                    boardSections[i + 8 + 7] !== "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
            // Top Left
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i - 8);
                if (
                    firstSlot?.column > 1 &&
                    firstSlot?.row > 2 &&
                    boardSections[i - 8] === "free" &&
                    boardSections[i - 8 * 2] === "red" &&
                    boardSections[i - 8 + 7] !== "free" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
            // Top
            if (current === "red" && !slotfound) {
                const firstSlot = getColumnAndRow(i);
                const thirdSlot = getColumnAndRow(i - 7);
                if (
                    firstSlot?.row > 2 &&
                    boardSections[i - 7] === "free" &&
                    boardSections[i - 7 * 2] === "red" &&
                    !doNotUse[thirdSlot?.column]
                ) {
                    slotfound = true;
                    makeComputerMove(thirdSlot?.column);
                }
            }
        });
        // No Human Slot yet / Computer starts
        if (!slotfound) {
            makeComputerMove(getRandomArbitrary());
        }
    };
    const blockSlot = (slot) => {
        columns.forEach((currentC, indexC) => {
            if (currentC.indexOf(slot) > -1) {
                makeComputerMove(indexC);
            }
        });
    };
    const doNotUseSlot = (slotColumn) => {
        console.log("doNotUseSlot:", slotColumn);
        doNotUse[slotColumn] = true;
        console.log(doNotUse);
    };
    //
    //
    // 1. Check for 3 directly
    boardSections.forEach((current, i) => {
        if (
            // Right
            !slotfound &&
            current === "black" &&
            i !== 4 &&
            i !== 5 &&
            i !== 6 &&
            i !== 11 &&
            i !== 12 &&
            i !== 13 &&
            i !== 18 &&
            i !== 19 &&
            i !== 20 &&
            i !== 25 &&
            i !== 26 &&
            i !== 27 &&
            i !== 32 &&
            i !== 33 &&
            i !== 34 &&
            i !== 39 &&
            i !== 40 &&
            i !== 41 &&
            boardSections[i + 1] === "black" &&
            boardSections[i + 2] === "black" &&
            boardSections[i + 3] === "free"
        ) {
            const startingSlot = getColumnAndRow(i);
            const endingSlot = getColumnAndRow(i + 3);
            if (
                // row < 6 && underneath !free
                startingSlot?.row < 6 &&
                boardSections[i + 3 + 7] !== "free"
            ) {
                slotfound = true;
                makeComputerMove(endingSlot?.column);
            } else if (
                // row === 6
                startingSlot?.row === 6
            ) {
                slotfound = true;
                makeComputerMove(endingSlot?.column);
            } else if (
                // row < 5 && underneath free && 2 underneath !free
                startingSlot?.row < 5 &&
                boardSections[i + 3 + 7] === "free" &&
                boardSections[i + 3 + 14] !== "free"
            ) {
                // doNotUseSlot(endingSlot?.column);
            } else if (
                // row < 6 && underneath free
                startingSlot?.row < 6 &&
                boardSections[i + 3 + 7] === "free"
            ) {
                // doNotUseSlot(endingSlot?.column);
            }
        }
        if (
            // Left
            !slotfound &&
            current === "black" &&
            (i === 4 ||
                i === 5 ||
                i === 6 ||
                i === 11 ||
                i === 12 ||
                i === 13 ||
                i === 18 ||
                i === 19 ||
                i === 20 ||
                i === 25 ||
                i === 26 ||
                i === 27 ||
                i === 32 ||
                i === 33 ||
                i === 34 ||
                i === 39 ||
                i === 40 ||
                i === 41) &&
            boardSections[i - 1] === "black" &&
            boardSections[i - 2] === "black" &&
            boardSections[i - 3] === "free"
        ) {
            const startingSlot = getColumnAndRow(i);
            const endingSlot = getColumnAndRow(i - 3);
            if (startingSlot?.row < 6 && boardSections[i - 3 + 7] !== "free") {
                slotfound = true;
                makeComputerMove(endingSlot?.column);
            } else if (startingSlot?.row === 6) {
                slotfound = true;
                makeComputerMove(endingSlot?.column);
            } else if (
                startingSlot?.row < 5 &&
                boardSections[i - 3 + 7] === "free" &&
                boardSections[i - 3 + 14] !== "free"
            ) {
                // doNotUseSlot(endingSlot?.column);
            } else if (
                startingSlot?.row < 6 &&
                boardSections[i - 3 + 7] === "free"
            ) {
                // doNotUseSlot(endingSlot?.column);
            }
        }
        if (
            // Top Right
            !slotfound &&
            current === "black" &&
            i > 20 &&
            i !== 25 &&
            i !== 26 &&
            i !== 27 &&
            i !== 32 &&
            i !== 33 &&
            i !== 34 &&
            i !== 39 &&
            i !== 40 &&
            i !== 41 &&
            boardSections[i - 6] === "black" &&
            boardSections[i - 6 * 2] === "black" &&
            boardSections[i - 6 * 3] === "free"
        ) {
            const startingSlot = getColumnAndRow(i);
            const endingSlot = getColumnAndRow(i - 6 * 3);
            if (boardSections[i - 6 * 3 + 7] !== "free") {
                slotfound = true;
                makeComputerMove(endingSlot?.column);
            } else if (
                boardSections[i - 6 * 3 + 7] === "free" &&
                boardSections[i - 6 * 3 + 14] !== "free"
            ) {
                // doNotUseSlot(endingSlot?.column);
            }
        }
        if (
            // Bottom Left
            !slotfound &&
            current === "black" &&
            (i > 20 ||
                i !== 25 ||
                i !== 26 ||
                i !== 27 ||
                i !== 32 ||
                i !== 33 ||
                i !== 34 ||
                i !== 39 ||
                i !== 40 ||
                i !== 41) &&
            boardSections[i + 6] === "black" &&
            boardSections[i + 6 * 2] === "black" &&
            boardSections[i + 6 * 3] === "free"
        ) {
            const startingSlot = getColumnAndRow(i);
            const endingSlot = getColumnAndRow(i + 6 * 3);
            if (startingSlot?.column === 5) {
                slotfound = true;
                makeComputerMove(endingSlot?.column);
            } else if (
                startingSlot?.column < 5 &&
                boardSections[i + 6 * 3 + 7] !== "free"
            ) {
                slotfound = true;
                makeComputerMove(endingSlot?.column);
            } else if (
                startingSlot?.column < 5 &&
                boardSections[i + 6 * 3 + 7] === "free" &&
                boardSections[i + 6 * 3 + 14] !== "free"
            ) {
                // doNotUseSlot(endingSlot?.column);
            }
        }
        if (
            // Bottom Right
            !slotfound &&
            current === "black" &&
            i < 18 &&
            i !== 4 &&
            i !== 5 &&
            i !== 6 &&
            i !== 11 &&
            i !== 12 &&
            i !== 13 &&
            boardSections[i + 8] === "black" &&
            boardSections[i + 8 * 2] === "black" &&
            boardSections[i + 8 * 3] === "free"
        ) {
            const startingSlot = getColumnAndRow(i);
            const endingSlot = getColumnAndRow(i + 8 * 3);
            if (
                endingSlot?.row === 5 &&
                boardSections[i + 8 * 3 + 7] === "free"
            ) {
                slotfound = true;
                makeComputerMove(endingSlot?.column);
            } else if (
                endingSlot?.row < 5 &&
                boardSections[i + 8 * 3 + 7] === "free" &&
                boardSections[i + 8 * 3 + 14] === "free"
            ) {
                slotfound = true;
                makeComputerMove(endingSlot?.column);
            } else if (
                endingSlot?.row < 5 &&
                boardSections[i + 8 * 3 + 7] === "free" &&
                boardSections[i + 8 * 3 + 14] !== "free"
            ) {
                // doNotUseSlot(endingSlot?.column);
            }
        }
        if (
            // Top Left
            !slotfound &&
            current === "black" &&
            (i < 18 ||
                i !== 4 ||
                i !== 5 ||
                i !== 6 ||
                i !== 11 ||
                i !== 12 ||
                i !== 13) &&
            boardSections[i - 8] === "black" &&
            boardSections[i - 8 * 2] === "black" &&
            boardSections[i - 8 * 3] === "free"
        ) {
            const startingSlot = getColumnAndRow(i);
            const endingSlot = getColumnAndRow(i - 8 * 3);
            if (boardSections[i - 8 * 3 + 7] !== "free") {
                slotfound = true;
                makeComputerMove(endingSlot?.column);
            } else if (
                boardSections[i - 8 * 3 + 7] === "free" &&
                boardSections[i - 8 * 3 + 14] !== "free"
            ) {
                // doNotUseSlot(endingSlot?.column);
            }
        }
        if (
            // Top
            !slotfound &&
            current === "black" &&
            i > 20 &&
            boardSections[i - 7] === "black" &&
            boardSections[i - 7 * 2] === "black" &&
            boardSections[i - 7 * 3] === "free"
        ) {
            const startingSlot = getColumnAndRow(i);
            const endingSlot = getColumnAndRow(i - 7 * 3);
            slotfound = true;
            makeComputerMove(startingSlot?.column);
        }
    });
    // 2. Check for 3 indirectly
    if (!slotfound) {
        boardSections.forEach((current, i) => {
            // Top Right
            if (
                !slotfound &&
                current === "black" &&
                i > 20 &&
                i !== 25 &&
                i !== 26 &&
                i !== 27 &&
                i !== 32 &&
                i !== 33 &&
                i !== 34 &&
                i !== 39 &&
                i !== 40 &&
                i !== 41 &&
                boardSections[i - 6] === "black" &&
                boardSections[i - 6 * 2] === "free" &&
                boardSections[i - 6 * 3] === "black"
            ) {
                slotfound = true;
                blockSlot(i - 6 * 2);
            } else if (
                !slotfound &&
                current === "black" &&
                i > 20 &&
                i !== 25 &&
                i !== 26 &&
                i !== 27 &&
                i !== 32 &&
                i !== 33 &&
                i !== 34 &&
                i !== 39 &&
                i !== 40 &&
                i !== 41 &&
                boardSections[i - 6] === "free" &&
                boardSections[i - 6 * 2] === "black" &&
                boardSections[i - 6 * 3] === "black"
            ) {
                slotfound = true;
                blockSlot(i - 6);
            }
            // Right
            if (
                !slotfound &&
                current === "black" &&
                i !== 4 &&
                i !== 5 &&
                i !== 6 &&
                i !== 11 &&
                i !== 12 &&
                i !== 13 &&
                i !== 18 &&
                i !== 19 &&
                i !== 20 &&
                i !== 25 &&
                i !== 26 &&
                i !== 27 &&
                i !== 32 &&
                i !== 33 &&
                i !== 34 &&
                i !== 39 &&
                i !== 40 &&
                i !== 41 &&
                boardSections[i + 1] === "black" &&
                boardSections[i + 2] === "free" &&
                boardSections[i + 3] === "black"
            ) {
                slotfound = true;
                blockSlot(i + 2);
            } else if (
                !slotfound &&
                current === "black" &&
                i !== 4 &&
                i !== 5 &&
                i !== 6 &&
                i !== 11 &&
                i !== 12 &&
                i !== 13 &&
                i !== 18 &&
                i !== 19 &&
                i !== 20 &&
                i !== 25 &&
                i !== 26 &&
                i !== 27 &&
                i !== 32 &&
                i !== 33 &&
                i !== 34 &&
                i !== 39 &&
                i !== 40 &&
                i !== 41 &&
                boardSections[i + 1] === "free" &&
                boardSections[i + 2] === "black" &&
                boardSections[i + 3] === "black"
            ) {
                slotfound = true;
                blockSlot(i + 1);
            }
            // Bottom Right
            if (
                !slotfound &&
                current === "black" &&
                i < 18 &&
                i !== 4 &&
                i !== 5 &&
                i !== 6 &&
                i !== 11 &&
                i !== 12 &&
                i !== 13 &&
                boardSections[i + 8] === "black" &&
                boardSections[i + 8 * 2] === "free" &&
                boardSections[i + 8 * 3] === "black"
            ) {
                slotfound = true;
                blockSlot(i + 8 * 2);
            } else if (
                !slotfound &&
                current === "black" &&
                i < 18 &&
                i !== 4 &&
                i !== 5 &&
                i !== 6 &&
                i !== 11 &&
                i !== 12 &&
                i !== 13 &&
                boardSections[i + 8] === "free" &&
                boardSections[i + 8 * 2] === "black" &&
                boardSections[i + 8 * 3] === "black"
            ) {
                slotfound = true;
                blockSlot(i + 8);
            }
            // Bottom
            if (
                !slotfound &&
                current === "black" &&
                i < 21 &&
                boardSections[i + 7] === "black" &&
                boardSections[i + 7 * 2] === "free" &&
                boardSections[i + 7 * 3] === "black"
            ) {
                slotfound = true;
                blockSlot(i + 7 * 2);
            } else if (
                !slotfound &&
                current === "black" &&
                i < 21 &&
                boardSections[i + 7] === "free" &&
                boardSections[i + 7 * 2] === "black" &&
                boardSections[i + 7 * 3] === "black"
            ) {
                slotfound = true;
                blockSlot(i + 7);
            }
        });
    }
    // Check Human Slots
    // 3.Check Human for 3 directly
    if (!slotfound) {
        boardSections.forEach((current, i) => {
            if (
                // Right
                !slotfound &&
                current === "red" &&
                i !== 4 &&
                i !== 5 &&
                i !== 6 &&
                i !== 11 &&
                i !== 12 &&
                i !== 13 &&
                i !== 18 &&
                i !== 19 &&
                i !== 20 &&
                i !== 25 &&
                i !== 26 &&
                i !== 27 &&
                i !== 32 &&
                i !== 33 &&
                i !== 34 &&
                i !== 39 &&
                i !== 40 &&
                i !== 41 &&
                boardSections[i + 1] === "red" &&
                boardSections[i + 2] === "red" &&
                boardSections[i + 3] === "free"
            ) {
                const startingSlot = getColumnAndRow(i);
                const endingSlot = getColumnAndRow(i + 3);
                if (
                    // row < 6 && underneath !free
                    startingSlot?.row < 6 &&
                    boardSections[i + 3 + 7] !== "free"
                ) {
                    slotfound = true;
                    console.log("make Move 1", endingSlot.column);
                    makeComputerMove(endingSlot?.column);
                } else if (
                    // row === 6
                    startingSlot?.row === 6
                ) {
                    slotfound = true;
                    console.log("make Move 2", endingSlot.column);
                    makeComputerMove(endingSlot?.column);
                } else if (
                    // row < 5 && underneath free && 2 underneath !free
                    startingSlot?.row < 5 &&
                    boardSections[i + 3 + 7] === "free" &&
                    boardSections[i + 3 + 14] !== "free"
                ) {
                    doNotUseSlot(endingSlot?.column);
                } else if (
                    // row < 6 && underneath free
                    startingSlot?.row < 6 &&
                    boardSections[i + 3 + 7] === "free"
                ) {
                    doNotUseSlot(endingSlot?.column);
                }
            }
            if (
                // Left
                !slotfound &&
                current === "red" &&
                (i === 4 ||
                    i === 5 ||
                    i === 6 ||
                    i === 11 ||
                    i === 12 ||
                    i === 13 ||
                    i === 18 ||
                    i === 19 ||
                    i === 20 ||
                    i === 25 ||
                    i === 26 ||
                    i === 27 ||
                    i === 32 ||
                    i === 33 ||
                    i === 34 ||
                    i === 39 ||
                    i === 40 ||
                    i === 41) &&
                boardSections[i - 1] === "red" &&
                boardSections[i - 2] === "red" &&
                boardSections[i - 3] === "free"
            ) {
                const startingSlot = getColumnAndRow(i);
                const endingSlot = getColumnAndRow(i - 3);
                if (
                    startingSlot?.row < 6 &&
                    boardSections[i - 3 + 7] !== "free"
                ) {
                    slotfound = true;
                    makeComputerMove(endingSlot?.column);
                } else if (startingSlot?.row === 6) {
                    slotfound = true;
                    makeComputerMove(endingSlot?.column);
                } else if (
                    startingSlot?.row < 5 &&
                    boardSections[i - 3 + 7] === "free" &&
                    boardSections[i - 3 + 14] !== "free"
                ) {
                    doNotUseSlot(endingSlot?.column);
                } else if (
                    startingSlot?.row < 6 &&
                    boardSections[i - 3 + 7] === "free"
                ) {
                    doNotUseSlot(endingSlot?.column);
                }
            }
            if (
                // Top Right
                !slotfound &&
                current === "red" &&
                i > 20 &&
                i !== 25 &&
                i !== 26 &&
                i !== 27 &&
                i !== 32 &&
                i !== 33 &&
                i !== 34 &&
                i !== 39 &&
                i !== 40 &&
                i !== 41 &&
                boardSections[i - 6] === "red" &&
                boardSections[i - 6 * 2] === "red" &&
                boardSections[i - 6 * 3] === "free"
            ) {
                const startingSlot = getColumnAndRow(i);
                const endingSlot = getColumnAndRow(i - 6 * 3);
                if (boardSections[i - 6 * 3 + 7] !== "free") {
                    slotfound = true;
                    makeComputerMove(endingSlot?.column);
                } else if (
                    boardSections[i - 6 * 3 + 7] === "free" &&
                    boardSections[i - 6 * 3 + 14] !== "free"
                ) {
                    doNotUseSlot(endingSlot?.column);
                }
            }
            if (
                // Bottom Left
                !slotfound &&
                current === "red" &&
                (i > 20 ||
                    i !== 25 ||
                    i !== 26 ||
                    i !== 27 ||
                    i !== 32 ||
                    i !== 33 ||
                    i !== 34 ||
                    i !== 39 ||
                    i !== 40 ||
                    i !== 41) &&
                boardSections[i + 6] === "red" &&
                boardSections[i + 6 * 2] === "red" &&
                boardSections[i + 6 * 3] === "free"
            ) {
                const startingSlot = getColumnAndRow(i);
                const endingSlot = getColumnAndRow(i + 6 * 3);
                if (startingSlot?.column === 5) {
                    slotfound = true;
                    makeComputerMove(endingSlot?.column);
                } else if (
                    startingSlot?.column < 5 &&
                    boardSections[i + 6 * 3 + 7] !== "free"
                ) {
                    slotfound = true;
                    makeComputerMove(endingSlot?.column);
                } else if (
                    startingSlot?.column < 5 &&
                    boardSections[i + 6 * 3 + 7] === "free" &&
                    boardSections[i + 6 * 3 + 14] !== "free"
                ) {
                    doNotUseSlot(endingSlot?.column);
                }
            }
            if (
                // Bottom Right
                !slotfound &&
                current === "red" &&
                i < 18 &&
                i !== 4 &&
                i !== 5 &&
                i !== 6 &&
                i !== 11 &&
                i !== 12 &&
                i !== 13 &&
                boardSections[i + 8] === "red" &&
                boardSections[i + 8 * 2] === "red" &&
                boardSections[i + 8 * 3] === "free"
            ) {
                const startingSlot = getColumnAndRow(i);
                const endingSlot = getColumnAndRow(i + 8 * 3);
                if (
                    endingSlot?.row === 5 &&
                    boardSections[i + 8 * 3 + 7] === "free"
                ) {
                    slotfound = true;
                    makeComputerMove(endingSlot?.column);
                } else if (
                    endingSlot?.row < 5 &&
                    boardSections[i + 8 * 3 + 7] === "free" &&
                    boardSections[i + 8 * 3 + 14] === "free"
                ) {
                    slotfound = true;
                    makeComputerMove(endingSlot?.column);
                } else if (
                    endingSlot?.row < 5 &&
                    boardSections[i + 8 * 3 + 7] === "free" &&
                    boardSections[i + 8 * 3 + 14] !== "free"
                ) {
                    doNotUseSlot(endingSlot?.column);
                }
            }
            if (
                // Top Left
                !slotfound &&
                current === "red" &&
                (i < 18 ||
                    i !== 4 ||
                    i !== 5 ||
                    i !== 6 ||
                    i !== 11 ||
                    i !== 12 ||
                    i !== 13) &&
                boardSections[i - 8] === "red" &&
                boardSections[i - 8 * 2] === "red" &&
                boardSections[i - 8 * 3] === "free"
            ) {
                const startingSlot = getColumnAndRow(i);
                const endingSlot = getColumnAndRow(i - 8 * 3);
                if (boardSections[i - 8 * 3 + 7] !== "free") {
                    slotfound = true;
                    makeComputerMove(endingSlot?.column);
                } else if (
                    boardSections[i - 8 * 3 + 7] === "free" &&
                    boardSections[i - 8 * 3 + 14] !== "free"
                ) {
                    doNotUseSlot(endingSlot?.column);
                }
            }
            if (
                // Top
                !slotfound &&
                current === "red" &&
                i > 20 &&
                boardSections[i - 7] === "red" &&
                boardSections[i - 7 * 2] === "red" &&
                boardSections[i - 7 * 3] === "free"
            ) {
                const startingSlot = getColumnAndRow(i);
                const endingSlot = getColumnAndRow(i - 7 * 3);
                slotfound = true;
                makeComputerMove(startingSlot?.column);
            }
        });
    }
    // 4. Check Human for 3 indirectly
    if (!slotfound) {
        boardSections.forEach((current, i) => {
            // Top Right
            if (
                !slotfound &&
                current === "red" &&
                i > 20 &&
                i !== 25 &&
                i !== 26 &&
                i !== 27 &&
                i !== 32 &&
                i !== 33 &&
                i !== 34 &&
                i !== 39 &&
                i !== 40 &&
                i !== 41 &&
                boardSections[i - 6] === "red" &&
                boardSections[i - 6 * 2] === "free" &&
                boardSections[i - 6 * 3] === "red"
            ) {
                slotfound = true;
                blockSlot(i - 6 * 2);
            } else if (
                !slotfound &&
                current === "red" &&
                i > 20 &&
                i !== 25 &&
                i !== 26 &&
                i !== 27 &&
                i !== 32 &&
                i !== 33 &&
                i !== 34 &&
                i !== 39 &&
                i !== 40 &&
                i !== 41 &&
                boardSections[i - 6] === "free" &&
                boardSections[i - 6 * 2] === "red" &&
                boardSections[i - 6 * 3] === "red"
            ) {
                slotfound = true;
                blockSlot(i - 6);
            }
            // Right
            if (
                !slotfound &&
                current === "red" &&
                i !== 4 &&
                i !== 5 &&
                i !== 6 &&
                i !== 11 &&
                i !== 12 &&
                i !== 13 &&
                i !== 18 &&
                i !== 19 &&
                i !== 20 &&
                i !== 25 &&
                i !== 26 &&
                i !== 27 &&
                i !== 32 &&
                i !== 33 &&
                i !== 34 &&
                i !== 39 &&
                i !== 40 &&
                i !== 41 &&
                boardSections[i + 1] === "red" &&
                boardSections[i + 2] === "free" &&
                boardSections[i + 3] === "red"
            ) {
                slotfound = true;
                blockSlot(i + 2);
            } else if (
                !slotfound &&
                current === "red" &&
                i !== 4 &&
                i !== 5 &&
                i !== 6 &&
                i !== 11 &&
                i !== 12 &&
                i !== 13 &&
                i !== 18 &&
                i !== 19 &&
                i !== 20 &&
                i !== 25 &&
                i !== 26 &&
                i !== 27 &&
                i !== 32 &&
                i !== 33 &&
                i !== 34 &&
                i !== 39 &&
                i !== 40 &&
                i !== 41 &&
                boardSections[i + 1] === "free" &&
                boardSections[i + 2] === "red" &&
                boardSections[i + 3] === "red"
            ) {
                slotfound = true;
                blockSlot(i + 1);
            }
            // Bottom Right
            if (
                !slotfound &&
                current === "red" &&
                i < 18 &&
                i !== 4 &&
                i !== 5 &&
                i !== 6 &&
                i !== 11 &&
                i !== 12 &&
                i !== 13 &&
                boardSections[i + 8] === "red" &&
                boardSections[i + 8 * 2] === "free" &&
                boardSections[i + 8 * 3] === "red"
            ) {
                slotfound = true;
                blockSlot(i + 8 * 2);
            } else if (
                !slotfound &&
                current === "red" &&
                i < 18 &&
                i !== 4 &&
                i !== 5 &&
                i !== 6 &&
                i !== 11 &&
                i !== 12 &&
                i !== 13 &&
                boardSections[i + 8] === "free" &&
                boardSections[i + 8 * 2] === "red" &&
                boardSections[i + 8 * 3] === "red"
            ) {
                slotfound = true;
                blockSlot(i + 8);
            }
            // Bottom
            if (
                !slotfound &&
                current === "red" &&
                i < 21 &&
                boardSections[i + 7] === "red" &&
                boardSections[i + 7 * 2] === "free" &&
                boardSections[i + 7 * 3] === "red"
            ) {
                slotfound = true;
                blockSlot(i + 7 * 2);
            } else if (
                !slotfound &&
                current === "red" &&
                i < 21 &&
                boardSections[i + 7] === "free" &&
                boardSections[i + 7 * 2] === "red" &&
                boardSections[i + 7 * 3] === "red"
            ) {
                slotfound = true;
                blockSlot(i + 7);
            }
        });
    }
    // Make Free Move
    if (!slotfound) {
        makeFreeMove();
    }
};

const checkElement = (e) => {
    if (
        e.target.nodeName === "DIV" &&
        !e.target.matches(".direction") &&
        !e.target.matches("#board")
    ) {
        return {
            column: e.target.classList[0],
            ele: e.target.classList[1],
            row: e.target.classList[2],
        };
    } else if (e.target.parentNode.nodeName === "DIV") {
        return {
            column: e.target.parentNode.classList[0],
            ele: e.target.parentNode.classList[1],
            row: e.target.parentNode.classList[2],
        };
    } else if (e.target.parentNode.nodeName === "svg") {
        return {
            column: e.target.parentNode.parentNode.classList[0],
            ele: e.target.parentNode.parentNode.classList[1],
            row: e.target.parentNode.parentNode.classList[2],
        };
    } else if (e.target.matches("#board") && !wins) {
        if (!againstComputer || (againstComputer && player === "red")) {
            previewContainer.style.visibility = "hidden";
            fallDownContainer.style.visibility = "hidden";
        }
    } else {
        return undefined;
    }
};

const changePlayer = () => {
    if (!againstComputer) {
        if (player === "red") {
            player = "black";
            // foot.style.backgroundColor = `var(--black)`;
            previewContainerDiv.style.backgroundColor = `var(--black)`;
        } else {
            player = "red";
            // foot.style.backgroundColor = `var(--red)`;
            previewContainerDiv.style.backgroundColor = `var(--red)`;
        }
    } else {
        if (player === "red") {
            player = "black";
            // foot.style.backgroundColor = `var(--black)`;
            computersTurn();
            previewContainerDiv.style.backgroundColor = `var(--black)`;

            // Computers Turn
        } else {
            player = "red";
            // foot.style.backgroundColor = `var(--red)`;
            previewContainerDiv.style.backgroundColor = `var(--red)`;
            computerContainer.style.display = "none";
        }
    }
};

const playerWins = (i, downDirection) => {
    console.log("playerWins", i, downDirection);
    if (player === "red") {
        foot.classList += "victoryR";
    } else {
        foot.classList += "victoryB";
    }
    // append Circle to Element i
    let allGridElements = document.querySelectorAll(
        "#board div:not(.direction)"
    );
    let victoryElements = [];
    if (downDirection === "topright") {
        for (let b = 0; b < allGridElements.length; b++) {
            if (allGridElements[b].matches(`.e${i + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            } else if (allGridElements[b].matches(`.e${i - 6 + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            } else if (allGridElements[b].matches(`.e${i - 6 * 2 + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            } else if (allGridElements[b].matches(`.e${i - 6 * 3 + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            }
        }
    } else if (downDirection === "right") {
        for (let b = 0; b < allGridElements.length; b++) {
            if (allGridElements[b].matches(`.e${i + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            } else if (allGridElements[b].matches(`.e${i + 1 + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            } else if (allGridElements[b].matches(`.e${i + 1 * 2 + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            } else if (allGridElements[b].matches(`.e${i + 1 * 3 + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            }
        }
    } else if (downDirection === "bottomright") {
        for (let b = 0; b < allGridElements.length; b++) {
            if (allGridElements[b].matches(`.e${i + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            } else if (allGridElements[b].matches(`.e${i + 8 + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            } else if (allGridElements[b].matches(`.e${i + 8 * 2 + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            } else if (allGridElements[b].matches(`.e${i + 8 * 3 + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            }
        }
    } else if (downDirection === "bottom") {
        for (let b = 0; b < allGridElements.length; b++) {
            if (allGridElements[b].matches(`.e${i + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            } else if (allGridElements[b].matches(`.e${i + 7 + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            } else if (allGridElements[b].matches(`.e${i + 7 * 2 + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            } else if (allGridElements[b].matches(`.e${i + 7 * 3 + 1}`)) {
                victoryElements = [...victoryElements, allGridElements[b]];
            }
        }
    }

    // Animate
    if (downDirection === "topright") {
        victoryElements.reverse().forEach((currentV, index) => {
            // Animate
            if (index > 0) {
                setTimeout(() => {
                    currentV.children[0].classList = "victoryCircle";
                }, index * 750);
            } else {
                currentV.children[0].classList = "victoryCircle";
            }
        });
    } else {
        victoryElements.forEach((currentV, index) => {
            // Animate
            if (index > 0) {
                setTimeout(() => {
                    currentV.children[0].classList = "victoryCircle";
                }, index * 750);
            } else {
                currentV.children[0].classList = "victoryCircle";
            }
        });
    }
    setTimeout(() => {
        restart.style.display = "block";
    }, 3000);
};

const checkForWin = () => {
    boardSections.forEach((current, i) => {
        if (current === player) {
            // Top Right
            if (
                current === player &&
                i > 20 &&
                i !== 25 &&
                i !== 26 &&
                i !== 27 &&
                i !== 32 &&
                i !== 33 &&
                i !== 34 &&
                i !== 39 &&
                i !== 40 &&
                i !== 41 &&
                boardSections[i - 6] === player &&
                boardSections[i - 6 * 2] === player &&
                boardSections[i - 6 * 3] === player &&
                !wins
            ) {
                playerWins(i, "topright");
            }
            // Right
            if (
                i !== 4 &&
                i !== 5 &&
                i !== 6 &&
                i !== 11 &&
                i !== 12 &&
                i !== 13 &&
                i !== 18 &&
                i !== 19 &&
                i !== 20 &&
                i !== 25 &&
                i !== 26 &&
                i !== 27 &&
                i !== 32 &&
                i !== 33 &&
                i !== 34 &&
                i !== 39 &&
                i !== 40 &&
                i !== 41
            ) {
                if (boardSections[i + 1] === player) {
                    let nextField1 = i + 1;
                    if (
                        nextField1 + 1 <= 41 &&
                        boardSections[nextField1 + 1] === player
                    ) {
                        let nextField2 = nextField1 + 1;
                        if (
                            nextField2 + 1 <= 41 &&
                            boardSections[nextField2 + 1] === player
                        ) {
                            if (!wins) {
                                wins = true;
                                playerWins(i, "right");
                            }
                        }
                    }
                }
            }
            if (
                i < 18 &&
                i !== 4 &&
                i !== 5 &&
                i !== 6 &&
                i !== 11 &&
                i !== 12 &&
                i !== 13
            ) {
                // Bottom Right
                if (i + 8 <= 41 && boardSections[i + 8] === player) {
                    let nextField1 = i + 8;
                    if (
                        nextField1 + 8 <= 41 &&
                        boardSections[nextField1 + 8] === player
                    ) {
                        let nextField2 = nextField1 + 8;
                        if (
                            nextField2 + 8 <= 41 &&
                            boardSections[nextField2 + 8] === player
                        ) {
                            if (!wins) {
                                wins = true;
                                playerWins(i, "bottomright");
                            }
                        }
                    }
                }
            }
            if (i < 21) {
                // Bottom
                if (i + 7 <= 41 && boardSections[i + 7] === player) {
                    let nextField1 = i + 7;
                    if (
                        nextField1 + 7 <= 41 &&
                        boardSections[nextField1 + 7] === player
                    ) {
                        let nextField2 = nextField1 + 7;
                        if (
                            nextField2 + 7 <= 41 &&
                            boardSections[nextField2 + 7] === player
                        ) {
                            if (!wins) {
                                wins = true;
                                playerWins(i, "bottom");
                            }
                        }
                    }
                }
            }
        }
    });
    if (!wins && slotCount < 41) {
        changePlayer();
    } else if (slotCount >= 41) {
        restart.style.display = "block";
    }
};

// Hover over Board
board.addEventListener("mouseover", (e) => {
    const check = checkElement(e);
    if (check?.column && !fallDownBlocked && !wins) {
        if (!againstComputer || (againstComputer && player === "red")) {
            if (
                !previewContainer.style.visibility ||
                previewContainer.style.visibility === "hidden"
            ) {
                previewContainer.style.visibility = "visible";
                fallDownContainer.style.visibility = "visible";
            }
            //
            let columnNum =
                parseInt(check.column.substring(1, check.column.length)) - 1;
            previewContainer.style.left = `${gridElementsWidth * columnNum}px`;
            fallDownContainer.style.left = `${gridElementsWidth * columnNum}px`;
            if (boardSections[columns[columnNum][5]] === "free") {
                previewContainer.style.top = `${gridElementsHeight * 5}px`;
            } else if (boardSections[columns[columnNum][4]] === "free") {
                previewContainer.style.top = `${gridElementsHeight * 4}px`;
            } else if (boardSections[columns[columnNum][3]] === "free") {
                previewContainer.style.top = `${gridElementsHeight * 3}px`;
            } else if (boardSections[columns[columnNum][2]] === "free") {
                previewContainer.style.top = `${gridElementsHeight * 2}px`;
            } else if (boardSections[columns[columnNum][1]] === "free") {
                previewContainer.style.top = `${gridElementsHeight * 1}px`;
            } else if (boardSections[columns[columnNum][0]] === "free") {
                previewContainer.style.top = `0px`;
            }
        }
    }
});

const createNewFallDownContainer = (columnNum) => {
    if (!againstComputer || (againstComputer && player === "black")) {
        let createParent = document.createElement("div");
        let createInner = document.createElement("div");
        if (player === "red") {
            createInner.style.backgroundColor = `var(--black)`;
        } else {
            createInner.style.backgroundColor = `var(--red)`;
        }
        createParent.appendChild(createInner);
        createParent.id = "fallDownContainer";
        createParent.style = `width: ${gridElementsWidth}px; height: ${gridElementsHeight}px; transform: translateY(-${gridElementsHeight}px); visibility: visible; left: ${
            columnNum * gridElementsWidth
        }px`;
        chipsContainer.appendChild(createParent);
        fallDownContainer = document.getElementById("fallDownContainer");
        fallDownContainerDiv = document.querySelector("#fallDownContainer div");
    }
};

const createChip = (left, top, color) => {
    let createParent = document.createElement("div");
    createParent.classList = `${color}`;
    createParent.style = `width: ${gridElementsWidth}px; height: ${gridElementsHeight}px; left: ${
        gridElementsWidth * left
    }px; top: ${gridElementsHeight * top + 1}px`;
    let createInner = document.createElement("div");
    createParent.appendChild(createInner);
    chipsContainer.appendChild(createParent);
};

const checkColumn = (setTop, columnNum) => {
    if (fallDownContainer) {
        fallDownContainer.style.top = `${gridElementsHeight * (setTop + 1)}px`;
    }
    fallDownBlocked = true;
    if (againstComputer && player === "red" && doNotUse[columnNum]) {
        console.log("Human Clicked on doNotUse Column");
        doNotUse[columnNum] = false;
    }
    setTimeout(() => {
        boardSections[columns[columnNum][setTop]] = player;
        createChip(columnNum, setTop, player);
        if (!againstComputer || (againstComputer && player === "black")) {
            chipsContainer.removeChild(fallDownContainer);
        }
        createNewFallDownContainer(columnNum);
        fallDownBlocked = false;
        slotCount += 1;
        checkForWin();
    }, 750);
};

// Click on Board
board.addEventListener("click", (e) => {
    const check = checkElement(e);
    if (check?.column && !fallDownBlocked && !wins) {
        if (!againstComputer || (againstComputer && player === "red")) {
            let columnNum =
                parseInt(check.column.substring(1, check.column.length)) - 1;
            if (boardSections[columns[columnNum][5]] === "free") {
                checkColumn(5, columnNum);
            } else if (boardSections[columns[columnNum][4]] === "free") {
                checkColumn(4, columnNum);
            } else if (boardSections[columns[columnNum][3]] === "free") {
                checkColumn(3, columnNum);
            } else if (boardSections[columns[columnNum][2]] === "free") {
                checkColumn(2, columnNum);
            } else if (boardSections[columns[columnNum][1]] === "free") {
                checkColumn(1, columnNum);
            } else if (boardSections[columns[columnNum][0]] === "free") {
                checkColumn(0, columnNum);
            }
        }
    }
});

// Restart
restart.addEventListener("click", () => {
    // location.reload();

    restart.style.display = "none";

    // Reset the Field
    chipsContainer.innerHTML = "";
    let newPreview = document.createElement("div");
    newPreview.setAttribute("id", "previewContainer");
    let newPreviewDiv = document.createElement("div");
    newPreview.appendChild(newPreviewDiv);
    newPreview.style = `width: ${gridElementsWidth}px; height: ${gridElementsHeight}px; top: ${
        gridElementsHeight * 5
    }px`;
    chipsContainer.appendChild(newPreview);
    let newFallDown = document.createElement("div");
    newFallDown.setAttribute("id", "fallDownContainer");
    let newFallDownDiv = document.createElement("div");
    if (player === "red") {
        newFallDownDiv.style.backgroundColor = `var(--black)`;
    } else {
        newFallDownDiv.style.backgroundColor = `var(--red)`;
    }
    newFallDown.appendChild(newFallDownDiv);
    newFallDown.style = `width: ${gridElementsWidth}px; height: ${gridElementsHeight}px; transform: translateY(-${gridElementsHeight}px)`;
    chipsContainer.appendChild(newFallDown);

    previewContainer = document.getElementById("previewContainer");
    previewContainerDiv = document.querySelector("#previewContainer div");
    fallDownContainer = document.getElementById("fallDownContainer");
    fallDownContainerDiv = document.querySelector("#fallDownContainer div");

    boardSections = [
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
        "free",
    ];

    doNotUse = [false, false, false, false, false, false, false];

    // Remove the Victory Classes
    let boardVictoryChildren = document.querySelectorAll("#board div svg");
    boardVictoryChildren.forEach((currentBC) => {
        if (currentBC.matches(".victoryCircle")) {
            currentBC.classList = "";
        }
    });

    // Add to Counter
    let createDiv = document.createElement("div");
    // console.log("Add to Counter", player);
    if (againstComputer && player === "black") {
        blackCounterElement.appendChild(createDiv);
    } else if (player === "red") {
        redCounterElement.appendChild(createDiv);
    } else {
        blackCounterElement.appendChild(createDiv);
    }

    wins = false;
    foot.classList = "";
    changePlayer();
});
