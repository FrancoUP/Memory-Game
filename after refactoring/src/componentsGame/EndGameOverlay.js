import { usePost } from "../GameContext";
import { useEffect } from "react";

export function EndGameOverlay({ marked, children }) {
  const { setStopTimer } = usePost();

  useEffect(
    function () {
      if (marked.every((el) => el === true)) setStopTimer(false);
    },
    [marked, setStopTimer]
  );

  return (
    <div
      className="overlay"
      style={
        marked.every((el) => el === true)
          ? { backgroundColor: "rgba(0,0,0,0.5)", zIndex: "1" }
          : { opacity: "0", zIndex: "0" }
      }
    >
      {children}
    </div>
  );
}
