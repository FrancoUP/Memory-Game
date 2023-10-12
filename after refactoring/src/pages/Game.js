import "./Game.css";
import { useState } from "react";
import { useRandomArray } from "../hooks/useRandomArray";
import { useSearchParamsSetUp } from "../hooks/useSearchParamsSetUp";
import { CircleContainer } from "../componentsGame/CircleContainer";
import { BtnMenu } from "../componentsGame/BtnMenu";
import { BtnNewGame } from "../componentsGame/BtnNewGame";
import { BtnRestart } from "../componentsGame/BtnRestart";
import { HeaderButtons } from "../componentsGame/HeaderButtons";
import { Header } from "../componentsGame/Header";
import { Main } from "../componentsGame/Main";
import { Resume } from "../componentsGame/Resume";
import { MobileMenuOverlay } from "../componentsGame/MobileMenuOverlay";
import { PlayerList } from "../componentsGame/PlayerList";
import { SinglePlayerEnd } from "../componentsGame/SinglePlayerEnd";
import { MainEndGame } from "../componentsGame/MainEndGame";
import { EndGameOverlay } from "../componentsGame/EndGameOverlay";
import { Footer } from "../componentsGame/Footer";
import { PlayerBox } from "../componentsGame/PlayerBox";
import { Circle } from "../componentsGame/Circle";

export default function Game() {
  const [overlay, setOverlay] = useState(false);
  const [, players, size] = useSearchParamsSetUp();
  const [arrCircle, setArrCircle] = useState(
    Array.from({ length: Number(size) }, () => false)
  );
  const [marked, setMarked] = useState(
    Array.from({ length: Number(size) }, () => false)
  );
  const [playerActive, setPlayerActive] = useState(
    Array.from({ length: Number(players) }, (_, i) =>
      i === 0 ? { active: true, score: 0 } : { active: false, score: 0 }
    )
  );
  const randomArray = useRandomArray(size);
  const [random, setRandom] = useState(() => randomArray);

  return (
    <div className="back">
      <EndGameOverlay marked={marked}>
        <MainEndGame
          playerActive={playerActive}
          marked={marked}
          // players={players}
        >
          {players > 1 ? (
            Array(Number(players))
              .fill(0)
              .map((_, i) => (
                <PlayerList
                  key={i}
                  player={i}
                  // players={players}
                  playerActive={playerActive}
                />
              ))
          ) : (
            <SinglePlayerEnd />
          )}
          <div className="footer-btns">
            <BtnRestart
              overlay={overlay}
              setOverlay={setOverlay}
              setArrCircle={setArrCircle}
              setMarked={setMarked}
              onSetRandomArray={setRandom}
              randomArray={randomArray}
              setPlayerActive={setPlayerActive}
              playerActive={playerActive}
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
            setPlayerActive={setPlayerActive}
            playerActive={playerActive}
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
              setPlayerActive={setPlayerActive}
              playerActive={playerActive}
              nameClassRestart={"btn-restart"}
              nameClassNewGame={"btn-newGame"}
              nameClassBoxNewGame="box-btn-newGame"
            />
          ) : (
            <BtnMenu setOverlay={setOverlay} />
          )}
        </Header>
        <CircleContainer>
          {Array(Number(size))
            .fill(0)
            .map((_, i) => (
              <Circle
                key={i}
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
                playerActive={playerActive}
                marked={marked}
              />
            ))}
        </Footer>
      </Main>
    </div>
  );
}
