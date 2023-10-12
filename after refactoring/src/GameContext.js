import { useState, createContext, useContext, useEffect, useRef } from "react";
import dataJson from "./data/icons.json";

const GameContext = createContext();

function GameProvider({ children }) {
  const [selected, setSelected] = useState([
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
  ]);
  const [numPlayers, setNumPlayers] = useState(1);
  const [gridSize, setGridSize] = useState(16);
  const [type, setType] = useState("numbers");
  const data = useRef(dataJson.icons);
  const [checkIndexSrc, setCheckIndexSrc] = useState([]);
  const [checkIndex, setCheckIndex] = useState([]);
  const [stopClickEffects, setStopClickEffects] = useState(true);
  const [time, setTime] = useState(0);
  const [moves, setMoves] = useState(0);
  const [stopTimer, setStopTimer] = useState(true);

  function handleSetType(btn) {
    if (btn === 0) setType("numbers");
    if (btn === 1) setType("icones");
  }

  function handleSetNumPlayers(btn) {
    if (btn === 2) setNumPlayers(1);
    if (btn === 3) setNumPlayers(2);
    if (btn === 4) setNumPlayers(3);
    if (btn === 5) setNumPlayers(4);
  }

  function handleSetGridSize(btn) {
    if (btn === 6) setGridSize(16);
    if (btn === 7) setGridSize(36);
  }

  // useEffect(() => {
  //   const fetchData = async function () {
  //     try {
  //       const icon = await fetch("http://localhost:9000/icons");

  //       if (!icon.ok) throw new Error("Run the server to fetch data");

  //       const data = await icon.json();
  //       setData(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(
    function () {
      let clock = null;

      if (stopTimer) {
        clock = setInterval(() => {
          setTime((time) => time + 1);
        }, 1000);
      } else {
        clearInterval(clock);
      }

      return () => {
        clearInterval(clock);
      };
    },
    [setTime, stopTimer]
  );

  return (
    <GameContext.Provider
      value={{
        onSetSelected: setSelected,
        onSetNumPlayers: handleSetNumPlayers,
        onSetGridSize: handleSetGridSize,
        onSetType: handleSetType,
        setGridSize,
        setNumPlayers,
        setCheckIndexSrc,
        setCheckIndex,
        setStopClickEffects,
        setTime,
        setMoves,
        setStopTimer,
        moves,
        selected,
        type,
        numPlayers,
        gridSize,
        data: data.current,
        checkIndexSrc,
        checkIndex,
        stopClickEffects,
        time,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

function usePost() {
  const context = useContext(GameContext);

  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");

  return context;
}

export { GameProvider, usePost };
