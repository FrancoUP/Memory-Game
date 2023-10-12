import { BtnNewGame } from "./BtnNewGame";
import { BtnRestart } from "./BtnRestart";

export function HeaderButtons({
  setArrCircle,
  setMarked,
  randomArray,
  onSetRandomArray,
  setPlayerActive,
  playerActive,
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
        setPlayerActive={setPlayerActive}
        playerActive={playerActive}
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
