import { useState, useEffect } from "react";
import { useSearchParamsSetUp } from "../hooks/useSearchParamsSetUp";

export function MainEndGame({ children, playerActive, marked }) {
  const [winner, setWinner] = useState(false);
  const [, players] = useSearchParamsSetUp();

  useEffect(
    function () {
      if (marked.every((el) => el === true)) {
        const scores = playerActive.map((el) => el.score).sort((a, b) => b - a);
        if (scores[0] !== scores[1]) setWinner(true);
      }
    },
    [playerActive, marked, setWinner]
  );

  const winnerText = function () {
    if (players > 1) {
      return winner ? "Player 3 Wins!" : "It’s a tie!";
    } else {
      return "You did it!";
    }
  };

  return (
    <main className="main-end-game">
      <h1 className="winner">{winnerText()}</h1>
      <h2 className="result-text">Game over! Here are the results…</h2>
      {children}
    </main>
  );
}
