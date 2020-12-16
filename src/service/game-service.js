import Axios from 'axios';

function ulti(history, rowNow, colNow, xValue, yValue, sign,row) {
    let i, j;
    let number;
    let array = [];
    for (i = rowNow - 4 * xValue, j = colNow - 4 * yValue, number = 0;
        i <= rowNow + 4 * xValue && j <= colNow + 4 * yValue; i += xValue, j += yValue) {
        if (i < 0 || j < 0 || i >= row || j >= row) {
            continue;
        }
        if (history[row * i + j] === sign) {
            number++;
            array.push(row * i + j);
        }
        else {
            array = [];
            number = 0;
        }
        if (number===5)
        {
            break;
        }
    }
    if (number === 5)
    {
        return array;
    }
    else {
        return null;
    }
}

function calculateWinner(history, move, isX, row) {
    const sign = isX ? 'X' : 'O';
    const rowNow = Math.floor(move / row);
    const colNow = move % row;
    const diagonal1 = ulti(history, rowNow, colNow, 1, 1, sign,row);
    if (diagonal1) {
        return diagonal1;
    }
    else {
        const diagonal2 = ulti(history,rowNow,colNow,-1,1,sign,row);
        if (diagonal2)
            return diagonal2;
        else
        {
            const horizontal = ulti(history,rowNow,colNow,1,0,sign,row);
            if (horizontal)
            {
                return horizontal;
            }
            else {
                const vertical = ulti(history,rowNow,colNow,0,1,sign,row);
                if (vertical)
                {
                    return vertical;
                }
            }
        }
    }
    return null;
}

function refactorArray(history, row) {
    let array = Array(row * row).fill(null);
    for (let i = 0; i < history.length; i++) {
        array[history[i]] = (i % 2 === 0) ? 'X' : 'O';
    }
    return array;
}

const gameServices = { calculateWinner, refactorArray };

export default gameServices;