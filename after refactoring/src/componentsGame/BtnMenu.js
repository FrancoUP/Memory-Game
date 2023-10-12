import { usePost } from "../GameContext";

export function BtnMenu({ setOverlay }) {
  const { setStopTimer } = usePost();

  return (
    <button
      className="menu"
      onClick={() => {
        setOverlay(true);
        setStopTimer(false);
      }}
    >
      Menu
    </button>
  );
}
