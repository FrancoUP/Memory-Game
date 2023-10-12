import { Link } from "react-router-dom";
import { useState } from "react";
import "./HomePage.css";
import { usePost } from "../GameContext";

export default function HomePage() {
  const { numPlayers, gridSize, type } = usePost();
  const [hover, setHover] = useState(false);
  const { setTime, setMoves, setStopTimer } = usePost();

  function handleMouseOver() {
    setHover(true);
  }

  function handleMouseOut() {
    setHover(false);
  }

  return (
    <div className="background">
      <Main>
        <SelectionContainer>
          <Title>Select Theme</Title>
          <div className="theme">
            <Button key={1} btn={0}>
              Numbers
            </Button>
            <Button key={2} btn={1}>
              Icons
            </Button>
          </div>
        </SelectionContainer>

        <SelectionContainer>
          <Title>Numbers of Players</Title>
          <div className="numbers-player">
            <Button key={3} btn={2}>
              1
            </Button>
            <Button key={4} btn={3}>
              2
            </Button>
            <Button key={5} btn={4}>
              3
            </Button>
            <Button key={6} btn={5}>
              4
            </Button>
          </div>
        </SelectionContainer>

        <SelectionContainer>
          <Title>Grid Size</Title>
          <div className="grid-size">
            <Button key={7} btn={6}>
              4x4
            </Button>
            <Button key={8} btn={7}>
              6x6
            </Button>
          </div>
        </SelectionContainer>

        <Link
          to={`/game?numPlayers=${numPlayers}&gridSize=${gridSize}&type=${type}`}
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
            Start Game
          </button>
        </Link>
      </Main>
    </div>
  );
}

function Main({ children }) {
  return (
    <main className="main">
      <p className="title-memory">memory</p>
      <div className="box-main">{children}</div>
    </main>
  );
}

function Title({ children }) {
  return <p className="title">{children}</p>;
}

function SelectionContainer({ children }) {
  return <div className="box-selectors">{children}</div>;
}

function Button({ children, btn }) {
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
