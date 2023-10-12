import { useState } from "react";
import { usePost } from "../GameContext";

export function Button({ children, btn }) {
  const [hover, setHover] = useState(false);
  const { selected, onSetSelected, onSetNumPlayers, onSetGridSize, onSetType } =
    usePost();

  function handleBtnClick() {
    const selectedArr = [...selected];

    selectedArr.forEach((_, i) => {
      if (btn === 0 || btn === 1) {
        if (i <= 1) selectedArr[i] = false;
        selectedArr[btn] = true;
        onSetSelected(selectedArr);
      }
      if (btn === 2 || btn === 3 || btn === 4 || btn === 5) {
        if (i >= 2 && i <= 5) selectedArr[i] = false;
        selectedArr[btn] = true;
        onSetSelected(selectedArr);
      }
      if (btn === 6 || btn === 7) {
        if (i >= 6) selectedArr[i] = false;
        selectedArr[btn] = true;
        onSetSelected(selectedArr);
      }
    });
  }

  function handleMouseOver() {
    setHover(true);
  }

  function handleMouseOut() {
    setHover(false);
  }

  const styleButton = function () {
    if (selected[btn]) return { backgroundColor: "#304859" };
    else {
      if (hover) return { backgroundColor: "#6395b8" };
      else return { backgroundColor: "#bcced9" };
    }
  };

  return (
    <button
      style={styleButton()}
      className="button"
      onClick={() => {
        handleBtnClick();
        onSetType(btn);
        onSetGridSize(btn);
        onSetNumPlayers(btn);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
    </button>
  );
}
