import { useState, useEffect } from "react";
import { useSearchParamsSetUp } from "../hooks/useSearchParamsSetUp";

export function PlayerList({ player, playerActive }) {
  const [, players] = useSearchParamsSetUp();
  const [scores, setScores] = useState(
    [...playerActive].map((el) => el.score).sort((a, b) => b - a)
  );
  const [position, setPosition] = useState([0, 1, 2, 3]);

  useEffect(
    function () {
      const pos = [];
      const newScores = [...playerActive].map((el) => el.score);
      (function recursion(players, newScores) {
        if (players === 0) return;

        pos.push(newScores.indexOf(Math.max(...newScores)));
        newScores[newScores.indexOf(Math.max(...newScores))] = -1;

        return recursion(players - 1, newScores);
      })(players, newScores);
      setPosition(pos);
      setScores(playerActive.map((el) => el.score).sort((a, b) => b - a));
    },
    [playerActive, setScores, players, setPosition]
  );

  const activateWinner = scores[player] === scores[0] ? true : false;

  return (
    <div
      className="player-score"
      style={{ backgroundColor: activateWinner && "#152938" }}
    >
      <p className="player-text" style={{ color: activateWinner && "white" }}>
        Player {position[player] + 1} {activateWinner && "(Winner!)"}
      </p>
      <p className="score-player" style={{ color: activateWinner && "white" }}>
        {scores[player]} Pairs
      </p>
    </div>
  );
}
