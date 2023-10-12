import "./Game.css";
import { Link } from "react-router-dom";
import { usePost } from "../GameContext";
import { useSearchParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Game() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [overlay, setOverlay] = useState(false);

  const type = searchParams.get("type");
  const players = searchParams.get("numPlayers");
  const size = searchParams.get("gridSize");

  const [playerActive, setPlayerActive] = useState(
    Array.from({ length: players }, (_, i) =>
      i === 0 ? { active: true, score: 0 } : { active: false, score: 0 }
    )
  );

  const [random, setRandom] = useState(() => randomArray());

  const [arrCircle, setArrCircle] = useState(
    Array.from({ length: size }, () => false)
  );

  const [marked, setMarked] = useState(
    Array.from({ length: size }, () => false)
  );

  const { time, moves } = usePost();

  const [bestTime, setBestTime] = useState(
    (function () {
      if (Number(size) === 16 && type === "numbers") {
        return (
          localStorage
            .getItem("bestScoreLocalStorageNumber-4")
            ?.split(",")[0] || 0
        );
      } else if (Number(size) === 16 && type === "icones") {
        return (
          localStorage.getItem("bestScoreLocalStorageIcon-4")?.split(",")[0] ||
          0
        );
      } else if (Number(size) === 36 && type === "numbers") {
        return (
          localStorage
            .getItem("bestScoreLocalStorageNumber-6")
            ?.split(",")[0] || 0
        );
      } else if (Number(size) === 36 && type === "icones") {
        return (
          localStorage.getItem("bestScoreLocalStorageIcon-6")?.split(",")[0] ||
          0
        );
      }
    })()
  );

  const [bestMoves, setBestMoves] = useState(
    (function () {
      if (Number(size) === 16 && type === "numbers") {
        return (
          localStorage
            .getItem("bestScoreLocalStorageNumber-4")
            ?.split(",")[1] || 0
        );
      } else if (Number(size) === 16 && type === "icones") {
        return (
          localStorage.getItem("bestScoreLocalStorageIcon-4")?.split(",")[1] ||
          0
        );
      } else if (Number(size) === 36 && type === "numbers") {
        return (
          localStorage
            .getItem("bestScoreLocalStorageNumber-6")
            ?.split(",")[1] || 0
        );
      } else if (Number(size) === 36 && type === "icones") {
        return (
          localStorage.getItem("bestScoreLocalStorageIcon-6")?.split(",")[1] ||
          0
        );
      }
    })()
  );

  useEffect(
    function () {
      if (marked.every((el) => el === true)) {
        if (Number(bestTime) === 0 && Number(bestMoves) === 0) {
          setBestTime(() => time);
          setBestMoves(() => moves);
        }

        if (Number(bestTime) * Number(bestMoves) > time * moves) {
          setBestTime(() => time);
          setBestMoves(() => moves);
        }

        if (Number(size) === 16 && type === "numbers") {
          localStorage.setItem("bestScoreLocalStorageNumber-4", [
            bestTime,
            bestMoves,
          ]);
        } else if (Number(size) === 16 && type === "icones") {
          localStorage.setItem("bestScoreLocalStorageIcon-4", [
            bestTime,
            bestMoves,
          ]);
        } else if (Number(size) === 36 && type === "numbers") {
          localStorage.setItem("bestScoreLocalStorageNumber-6", [
            bestTime,
            bestMoves,
          ]);
        } else if (Number(size) === 36 && type === "icones") {
          localStorage.setItem("bestScoreLocalStorageIcon-6", [
            bestTime,
            bestMoves,
          ]);
        }
      }
    },
    [
      setBestMoves,
      setBestTime,
      time,
      moves,
      marked,
      bestMoves,
      bestTime,
      type,
      size,
    ]
  );

  function randomArray() {
    const generateNumbers = Array.from({ length: Number(size) }, (_, i) => {
      if (i > Number(size) / 2 - 1) return i - Number(size) / 2;
      else return i;
    });

    const randomNumber = [];

    (function randomRecursion(generateNumbers, randomNumber) {
      if (generateNumbers.length === 0) return;
      if (generateNumbers.length === 1) {
        return randomNumber.push(generateNumbers[0]);
      }

      let arr = [...generateNumbers];
      const rand = Math.floor(Math.random() * arr.length);
      randomNumber.push(arr[rand]);
      arr[rand] = "&";
      arr = arr.filter((e) => e !== "&");

      return randomRecursion(arr, randomNumber);
    })(generateNumbers, randomNumber);

    return randomNumber;
  }

  return (
    <div className="back">
      <EndGameOverlay marked={marked} bestTime={bestTime} bestMoves={bestMoves}>
        <MainEndGame
          playerActive={playerActive}
          marked={marked}
          players={players}
        >
          {players > 1 ? (
            Array(Number(players))
              .fill(0)
              .map((_, i) => (
                <PlayerList
                  key={i}
                  player={i}
                  players={players}
                  playerActive={playerActive}
                />
              ))
          ) : (
            <SinglePlayerEnd
              players={players}
              playerActive={playerActive}
              time={time}
              moves={moves}
            />
          )}
          <div className="footer-btns">
            <BtnRestart
              overlay={overlay}
              setOverlay={setOverlay}
              setArrCircle={setArrCircle}
              setMarked={setMarked}
              onSetRandomArray={setRandom}
              randomArray={randomArray}
              size={size}
              setPlayerActive={setPlayerActive}
              playerActive={playerActive}
              players={players}
              nameClassRestart={"btn-restart-menu"}
            >
              Restart
            </BtnRestart>
            <BtnNewGame
              nameClassNewGame={"btn-newGame-menu"}
              nameClassBoxNewGame="box-btn-newGame-menu"
            >
              Setup New Game
            </BtnNewGame>
          </div>
        </MainEndGame>
      </EndGameOverlay>

      <MobileMenuOverlay overlay={overlay}>
        <main className="main-overlay">
          <BtnRestart
            overlay={overlay}
            setOverlay={setOverlay}
            setArrCircle={setArrCircle}
            setMarked={setMarked}
            onSetRandomArray={setRandom}
            randomArray={randomArray}
            size={size}
            setPlayerActive={setPlayerActive}
            playerActive={playerActive}
            players={players}
            nameClassRestart={"btn-restart-menu"}
          >
            Restart
          </BtnRestart>
          <BtnNewGame
            overlay={overlay}
            nameClassNewGame={"btn-newGame-menu"}
            nameClassBoxNewGame="box-btn-newGame-menu"
          >
            New Game
          </BtnNewGame>
          <Resume overlay={overlay} setOverlay={setOverlay}>
            Resume Game
          </Resume>
        </main>
      </MobileMenuOverlay>

      <Main>
        <Header>
          {window.innerWidth > 650 ? (
            <HeaderButtons
              setArrCircle={setArrCircle}
              setMarked={setMarked}
              onSetRandomArray={setRandom}
              randomArray={randomArray}
              size={size}
              setPlayerActive={setPlayerActive}
              playerActive={playerActive}
              players={players}
              nameClassRestart={"btn-restart"}
              nameClassNewGame={"btn-newGame"}
              nameClassBoxNewGame="box-btn-newGame"
            />
          ) : (
            <BtnMenu setOverlay={setOverlay} />
          )}
        </Header>
        <CircleContainer size={size}>
          {Array(Number(size))
            .fill(0)
            .map((_, i) => (
              <Circle
                key={i}
                size={size}
                type={type}
                indexSrc={random[i]}
                index={i}
                arrCircle={arrCircle}
                setArrCircle={setArrCircle}
                marked={marked}
                setMarked={setMarked}
                setPlayerActive={setPlayerActive}
                playerActive={playerActive}
                currentPlayer={
                  playerActive
                    .map((el, pos) => {
                      if (el.active === true) return pos;
                      return "&";
                    })
                    .filter((el) => el !== "&")[0]
                }
              />
            ))}
        </CircleContainer>
        <Footer>
          {Array(Number(players))
            .fill(0)
            .map((_, i) => (
              <PlayerBox
                key={i}
                player={i + 1}
                players={players}
                setPlayerActive={setPlayerActive}
                playerActive={playerActive}
                marked={marked}
                bestTime={bestTime}
                bestMoves={bestMoves}
              />
            ))}
        </Footer>
      </Main>
    </div>
  );
}

function EndGameOverlay({ marked, children }) {
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

function MainEndGame({ children, playerActive, marked, players }) {
  const [winner, setWinner] = useState(false);
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

function SinglePlayerEnd({ time, moves }) {
  const bestTimeFormat = `${Math.floor(time / 60)}:${(
    time -
    Math.floor(time / 60) * 60
  )
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="single-player-container">
      <div className="end-timer-box">
        <p className="end-timer-text">Time Elapsed</p>
        <p className="end-timer">{bestTimeFormat}</p>
      </div>

      <div className="end-moves-box">
        <p className="end-moves-text">Moves Taken</p>
        <p className="end-moves">{moves} Moves</p>
      </div>
    </div>
  );
}

function PlayerList({ player, playerActive, players }) {
  const [scores, setScores] = useState(
    playerActive.map((el) => el.score).sort((a, b) => b - a)
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

function MobileMenuOverlay({ overlay, children }) {
  return (
    <div
      className="overlay"
      style={
        overlay
          ? { backgroundColor: "rgba(0,0,0,0.5)", zIndex: "1" }
          : { opacity: "0", zIndex: "0" }
      }
    >
      {children}
    </div>
  );
}

function Resume({ setOverlay, children, overlay }) {
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

function Main({ children }) {
  return <main className="main-container">{children}</main>;
}

function Header({ children }) {
  return (
    <div className="header">
      <div className="title-box">
        <p className="title-game">memory</p>
      </div>
      <div className="container-buttons">{children}</div>
    </div>
  );
}

function HeaderButtons({
  setArrCircle,
  setMarked,
  randomArray,
  onSetRandomArray,
  size,
  setPlayerActive,
  playerActive,
  players,
  nameClassRestart,
  nameClassNewGame,
  nameClassBoxNewGame,
}) {
  return (
    <>
      <BtnRestart
        setArrCircle={setArrCircle}
        setMarked={setMarked}
        randomArray={randomArray}
        onSetRandomArray={onSetRandomArray}
        size={size}
        setPlayerActive={setPlayerActive}
        playerActive={playerActive}
        players={players}
        nameClassRestart={nameClassRestart}
      >
        Restart
      </BtnRestart>
      <BtnNewGame
        nameClassNewGame={nameClassNewGame}
        nameClassBoxNewGame={nameClassBoxNewGame}
      >
        New Game
      </BtnNewGame>
    </>
  );
}

function BtnRestart({
  setArrCircle,
  setMarked,
  onSetRandomArray,
  randomArray,
  size,
  overlay,
  setOverlay,
  setPlayerActive,
  playerActive,
  players,
  children,
  nameClassRestart,
}) {
  const { setCheckIndexSrc, setCheckIndex, setStopTimer } = usePost();
  const [hover, setHover] = useState(false);
  const { setTime, setMoves } = usePost();

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
    onSetRandomArray(() => randomArray());
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

function BtnNewGame({ children, nameClassNewGame, nameClassBoxNewGame }) {
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

function BtnMenu({ setOverlay }) {
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

function CircleContainer({ children, size }) {
  return (
    <div className={Number(size) === 16 ? "grid-4X4" : "grid-6X6"}>
      {children}
    </div>
  );
}

function Circle({
  size,
  type,
  indexSrc,
  index,
  setArrCircle,
  arrCircle,
  marked,
  setMarked,
  setPlayerActive,
  playerActive,
  currentPlayer,
}) {
  const {
    data,
    checkIndexSrc,
    setCheckIndexSrc,
    checkIndex,
    setCheckIndex,
    stopClickEffects,
    setStopClickEffects,
    setMoves,
  } = usePost();
  const [hover, setHover] = useState(false);
  const [isSelected, setIsSelected] = useState();

  function handleMouseOver() {
    setHover(true);
  }

  function handleMouseOut() {
    setHover(false);
  }

  useEffect(
    function () {
      if (isSelected && checkIndex.length === 2 && checkIndexSrc.length === 2) {
        if (data[checkIndexSrc[0]].srcB === data[checkIndexSrc[1]].srcB) {
          setIsSelected(false);
          setMoves((moves) => moves + 1);
          setMarked((marked) => {
            const newMarked = [...marked];
            newMarked[checkIndex[0]] = true;
            newMarked[checkIndex[1]] = true;

            return newMarked;
          });
          setCheckIndexSrc([]);
          setCheckIndex([]);
          setArrCircle(Array.from({ length: size }, () => false));
          setPlayerActive((playerActive) => {
            const newArr = [...playerActive].map((el) => {
              if (el.active === true)
                return { active: true, score: el.score + 1 };
              else return { active: false, score: el.score };
            });

            return newArr;
          });
        } else {
          setIsSelected(false);
          setCheckIndexSrc([]);
          setCheckIndex([]);
          setMoves((moves) => moves + 1);
          setStopClickEffects(false);
          setTimeout(function () {
            setArrCircle(Array.from({ length: size }, () => false));
            setStopClickEffects(true);
          }, 1000);
          setPlayerActive((playerActive) => {
            const newArr = [...playerActive];

            if (newArr[currentPlayer].active === true) {
              newArr[currentPlayer].active = false;
              if (currentPlayer === newArr.length - 1) newArr[0].active = true;
              else newArr[currentPlayer + 1].active = true;
            }

            return newArr;
          });
        }
      } else setIsSelected(false);
    },
    [
      checkIndexSrc,
      data,
      checkIndex,
      setMarked,
      setCheckIndexSrc,
      setCheckIndex,
      setArrCircle,
      setStopClickEffects,
      size,
      playerActive,
      setPlayerActive,
      isSelected,
      setIsSelected,
      currentPlayer,
      setMoves,
    ]
  );

  function handleClick() {
    if (!marked[index]) {
      setIsSelected(true);
      setCheckIndexSrc((checkIndexSrc) => [...checkIndexSrc, indexSrc]);

      setCheckIndex((checkIndex) => {
        let newArrIndex = [...checkIndex, index];

        if (newArrIndex[0] === newArrIndex[1]) {
          setCheckIndexSrc((checkIndexSrc) => [checkIndexSrc[0]]);

          newArrIndex = [newArrIndex[0]];
        }

        return newArrIndex;
      });

      setArrCircle((arrCircle) => {
        const newArr = [...arrCircle];
        newArr[index] = true;

        return newArr;
      });
    }
  }

  const imgClassName = Number(size) === 16 ? "img-4X4" : "img-6X6";
  const numberClassName = Number(size) === 16 ? "numbers-4X4" : "numbers-6X6";

  function numberStyle() {
    if (arrCircle[index] && !marked[index]) {
      return { opacity: "1", backgroundColor: "#BCCED9" };
    } else if (marked[index]) {
      return { opacity: "1", backgroundColor: "#FDA214" };
    } else {
      return { opacity: "0" };
    }
  }

  return (
    <div
      style={
        arrCircle[index] || marked[index]
          ? {}
          : {
              backgroundColor: hover ? "#6395B8" : "#304859",
              transition: hover ? "background-color 0.2s" : "",
            }
      }
      className={Number(size) === 16 ? "circle-4X4" : "circle-6X6"}
      onClick={() => {
        stopClickEffects && handleClick();
        setHover(false);
      }}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      {type === "numbers" ? (
        <p style={numberStyle()} className={numberClassName}>
          {data ? data[indexSrc].number : ""}
        </p>
      ) : (
        <>
          <img
            style={
              arrCircle[index] && !marked[index]
                ? { opacity: "1" }
                : { opacity: "0" }
            }
            src={data ? data[indexSrc].srcB : ""}
            className={imgClassName}
            alt="immagine"
          />
          <img
            style={marked[index] ? { opacity: "1" } : { opacity: "0" }}
            src={data ? data[indexSrc].srcY : ""}
            className={imgClassName}
            alt="immagine"
          />
        </>
      )}
    </div>
  );
}

function Footer({ children }) {
  return <div className="footer-box">{children}</div>;
}

function PlayerBox({
  player,
  marked,
  playerActive,
  players,
  bestMoves,
  bestTime,
}) {
  const { time, moves } = usePost();

  const timeFormat = `${Math.floor(time / 60)}:${(
    time -
    Math.floor(time / 60) * 60
  )
    .toString()
    .padStart(2, "0")}`;

  const bestTimeFormat = `${Math.floor(bestTime / 60)}:${(
    bestTime -
    Math.floor(bestTime / 60) * 60
  )
    .toString()
    .padStart(2, "0")}`;

  return Number(players) === 1 ? (
    <div className="box-timer">
      <div className="timer-container">
        <div className="time-text">Time</div>
        <div className="time">{timeFormat}</div>
      </div>

      <div className="moves-container">
        <div className="moves-text">Moves</div>
        <div className="moves">{moves}</div>
      </div>

      <div className="timeMoves-container">
        <div className="timeMoves-text">Best Time-Moves</div>
        <div className="timeMoves">
          {bestTimeFormat} - {bestMoves}
        </div>
      </div>
    </div>
  ) : (
    <div
      className="player-box"
      style={{
        backgroundColor: playerActive[player - 1].active
          ? "#FDA214"
          : "#dfe7ec",
      }}
    >
      <p
        className="player"
        style={{
          color: playerActive[player - 1].active ? "white" : "#7191A5",
        }}
      >
        {window.innerWidth < 650 ? "P" : "Player"} {player}
      </p>
      <p
        className="score"
        style={{
          color: playerActive[player - 1].active ? "white" : "#304859",
        }}
      >
        {playerActive[player - 1].score}
      </p>
      {playerActive[player - 1].active && window.innerWidth > 650 && (
        <p className="current-turn">CURRENT TURN</p>
      )}
    </div>
  );
}
