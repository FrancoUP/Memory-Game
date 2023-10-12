import { Link } from "react-router-dom";
import { useState } from "react";
import { usePost } from "../GameContext";

export function ButtonLinkGamePage({ children }) {
  const [hover, setHover] = useState(false);
  const { setTime, setMoves, setStopTimer, numPlayers, gridSize, type } =
    usePost();

  function handleMouseOver() {
    setHover(true);
  }

  function handleMouseOut() {
    setHover(false);
  }

  return (
    <Link
      to={`game?numPlayers=${numPlayers}&gridSize=${gridSize}&type=${type}`}
    >
      <button
        style={{ backgroundColor: hover ? "#ffb84a" : "#fda214" }}
        className="start-game-btn"
        onClick={() => {
          setStopTimer(true);
          setTime(0);
          setMoves(0);
        }}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onTouchStart={handleMouseOver}
        onTouchEnd={handleMouseOut}
      >
        {children}
      </button>
    </Link>
  );
}
