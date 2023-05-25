/* eslint-disable @typescript-eslint/no-unused-vars */
import './main.scss';
import BoardComp from './components/board/board';
import { useEffect, useState } from 'react';
import { Board } from './models/Board';
import { Player } from './models/player';
import { Colors } from './models/Colors';
import Timer from './components/Timer/Timer';

const App = () => {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer);
  }, [])

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  return (
    <div className='content'>
      <h1 className="content__title">Chess</h1>
      <h2 className="content__currentP">Current player: <div className="content__currentP-wb">{currentPlayer?.color}</div></h2>
      <Timer
        restart={restart}
        currentPlayer={currentPlayer}
      />

      <BoardComp
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer} 
      />

    </div>
  )
}

export default App;
