import { usePost } from "../GameContext";

export function SinglePlayerEnd() {
  const { time, moves } = usePost();
  const bestTimeFormat = `${Math.floor(time / 60)}:${(
    time -
    Math.floor(time / 60) * 60
  )
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="single-player-container">
      <div className="end-timer-box">
        <p className="end-timer-text">Time Elapsed</p>
        <p className="end-timer">{bestTimeFormat}</p>
      </div>

      <div className="end-moves-box">
        <p className="end-moves-text">Moves Taken</p>
        <p className="end-moves">{moves} Moves</p>
      </div>
    </div>
  );
}
