import { Link } from "react-router-dom";
import { usePost } from "../GameContext";
import { useState } from "react";

export function BtnNewGame({
  children,
  nameClassNewGame,
  nameClassBoxNewGame,
}) {
  const [hover, setHover] = useState(false);
  const { setCheckIndexSrc, setCheckIndex } = usePost();
  const { setTime, setMoves, setStopTimer } = usePost();

  function handleMouseOver() {
    setHover(true);
  }

  function handleMouseOut() {
    setHover(false);
  }

  function handleClick() {
    setCheckIndexSrc([]);
    setCheckIndex([]);
    setStopTimer(false);
    setMoves(0);
    setTime(0);
  }

  return (
    <div className={nameClassBoxNewGame}>
      <Link to="../">
        <button
          onClick={handleClick}
          style={{
            backgroundColor: hover && "#6395B8",
            color: hover && "white",
          }}
          className={nameClassNewGame}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onTouchStart={handleMouseOver}
          onTouchEnd={handleMouseOut}
        >
          {children}
        </button>
      </Link>
    </div>
  );
}
