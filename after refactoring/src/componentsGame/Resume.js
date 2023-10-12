import { usePost } from "../GameContext";
import { useState } from "react";

export function Resume({ setOverlay, children, overlay }) {
  const [hover, setHover] = useState(false);
  const { setStopTimer } = usePost();

  function handleMouseOver() {
    setHover(true);
  }

  function handleMouseOut() {
    setHover(false);
  }

  return (
    <button
      style={{
        backgroundColor: hover ? "#6395B8" : "#DFE7EC",
        color: hover && "white",
      }}
      className="btn-resume"
      onClick={() => {
        setOverlay(false);
        setStopTimer(true);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onTouchStart={handleMouseOver}
      onTouchEnd={handleMouseOut}
    >
      {children}
    </button>
  );
}
