import { usePost } from "../GameContext";
import { useSearchParamsSetUp } from "../hooks/useSearchParamsSetUp";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export function PlayerBox({ playerActive, player, marked }) {
  const { time, moves } = usePost();
  const [type, players, size] = useSearchParamsSetUp();
  const [bestTime, bestMoves] = useLocalStorage(size, type, marked);

  function handleTimeFormat(time) {
    return `${Math.floor(time / 60)}:${(time - Math.floor(time / 60) * 60)
      .toString()
      .padStart(2, "0")}`;
  }

  return Number(players) === 1 ? (
    <div className="box-timer">
      <div className="timer-container">
        <div className="time-text">Time</div>
        <div className="time">{handleTimeFormat(time)}</div>
      </div>

      <div className="moves-container">
        <div className="moves-text">Moves</div>
        <div className="moves">{moves}</div>
      </div>

      <div className="timeMoves-container">
        <div className="timeMoves-text">Best Time-Moves</div>
        <div className="timeMoves">
          {handleTimeFormat(bestTime)} - {bestMoves}
        </div>
      </div>
    </div>
  ) : (
    <div
      className="player-box"
      style={{
        backgroundColor: playerActive[player - 1].active
          ? "#FDA214"
          : "#dfe7ec",
      }}
    >
      <p
        className="player"
        style={{
          color: playerActive[player - 1].active ? "white" : "#7191A5",
        }}
      >
        {window.innerWidth < 650 ? "P" : "Player"} {player}
      </p>
      <p
        className="score"
        style={{
          color: playerActive[player - 1].active ? "white" : "#304859",
        }}
      >
        {playerActive[player - 1].score}
      </p>
      {playerActive[player - 1].active && window.innerWidth > 650 && (
        <p className="current-turn">CURRENT TURN</p>
      )}
    </div>
  );
}
