import { FC, Fragment, useEffect, useState } from "react";
import { Board } from "../../models/Board";
import CellComp from "../cell/cell";
import './board.scss'
import { Cell } from "../../models/Cell";
import { Player } from "../../models/player";
import LostFigures from "../lostFigures/lostFigures";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComp: FC<BoardProps> = ({board, setBoard, currentPlayer,swapPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell)
      }
    }
  }

  useEffect(() => {
    highlightCells()
  }, [selectedCell]) 

  function highlightCells() {
    board.highlightCells(selectedCell)
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <>
      <div className="content__board">
        <div className="board">
          {board.cells.map((row, index) => 
            <Fragment key={index}>
              {row.map(cell => 
                  <CellComp
                    click={click}
                    cell={cell}
                    key={cell.id}
                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                  />
                )}
            </Fragment>
          )}
        </div>
        <div>
          <LostFigures
            title='Black figures:'
            figures={board.lostBlackFigures}
          />

          <LostFigures
            title='White figures:'
            figures={board.lostWhiteFigures}
          />
        </div>
      </div>
    </>
  )
}

export default BoardComp;
