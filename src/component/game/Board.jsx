import React from 'react';
import Square from './Square';

function find(array,value)
{
    for (let i =0;i<array.length;i++)
    {
        if (array[i]===value)
        {
            return true;
        }
    }
    return false;
}

function Board(props) {
    function renderSquare(i, highlight) {
        return <Square value={props.squares[i]} highlight={highlight}
            onClick={() => props.onClick(i)}></Square>;
    };
    const ROW = props.row;
    const board = [];
    const isWin = props.isWin;

    let items = [];
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < ROW; j++) {
            if (isWin) {
                if (find(isWin,ROW*i+j)===true) {
                    items.push(renderSquare(ROW * i + j, true));
                }
                else {
                    items.push(renderSquare(ROW * i + j, false));
                }
            }
            else {
                items.push(renderSquare(ROW * i + j, false));
            }
        }
        board.push(<div className="board-row">{items}</div>);
        items = [];
    }
    return (
        <div>
            {board}
        </div>
    );
}

export default Board;