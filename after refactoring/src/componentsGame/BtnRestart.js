import { usePost } from "../GameContext";
import { useState } from "react";
import { useSearchParamsSetUp } from "../hooks/useSearchParamsSetUp";

export function BtnRestart({
  setArrCircle,
  setMarked,
  randomArray,
  onSetRandomArray,
  overlay,
  setOverlay,
  setPlayerActive,
  children,
  nameClassRestart,
}) {
  const { setCheckIndexSrc, setCheckIndex, setStopTimer } = usePost();
  const [hover, setHover] = useState(false);
  const { setTime, setMoves } = usePost();
  const [, players, size] = useSearchParamsSetUp();

  function handleRestart() {
    setMoves(0);
    setTime(0);
    setStopTimer(true);
    setPlayerActive(
      Array.from({ length: players }, (_, i) =>
        i === 0 ? { active: true, score: 0 } : { active: false, score: 0 }
      )
    );
    setCheckIndexSrc([]);
    setCheckIndex([]);
    setArrCircle(Array.from({ length: size }, () => false));
    setMarked(Array.from({ length: size }, () => false));
    onSetRandomArray(() => randomArray);
    setHover(false);
    window.innerWidth <= 650 && setOverlay(false);
  }

  function handleMouseOver() {
    setHover(true);
  }

  function handleMouseOut() {
    setHover(false);
  }

  return (
    <button
      style={{
        backgroundColor: hover && "#FFB84A",
        color: overlay && hover && "white",
      }}
      className={nameClassRestart}
      onClick={handleRestart}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      onTouchStart={handleMouseOver}
      onTouchEnd={handleMouseOut}
    >
      {children}
    </button>
  );
}
