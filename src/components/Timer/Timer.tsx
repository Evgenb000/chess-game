import { FC, useEffect, useRef, useState } from "react";
import { Player } from "../../models/player";
import { Colors } from "../../models/Colors";
import './timer.scss';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
  const time = 300;
  const [blackTime, setBlackTime] = useState(time);
  const [whiteTime, setWhiteTime] = useState(time);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }

    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;

    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime(prev => prev - 1)
  }

  function decrementWhiteTimer() {
    setWhiteTime(prev => prev - 1)
  }

  const handleRestart = () => {
    setWhiteTime(time)
    setBlackTime(time)
    restart();
  }

  return (
    <div className="timer">
      <button onClick={handleRestart} className="timer__button">Restart</button>
      <h3 className="timer__time">Black - {blackTime}</h3>
      <h3 className="timer__time">White - {whiteTime}</h3>
    </div>
  );
}

export default Timer;
