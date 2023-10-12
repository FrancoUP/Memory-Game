import { usePost } from "../GameContext";
import { useState, useEffect } from "react";
import { useSearchParamsSetUp } from "../hooks/useSearchParamsSetUp";

export function Circle({
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
  const [type, , size] = useSearchParamsSetUp();

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
      arrCircle,
      index,
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
            src={data ? process.env.PUBLIC_URL + data[indexSrc].srcB : ""}
            className={imgClassName}
            alt="immagine"
          />
          <img
            style={marked[index] ? { opacity: "1" } : { opacity: "0" }}
            src={data ? process.env.PUBLIC_URL + data[indexSrc].srcY : ""}
            className={imgClassName}
            alt="immagine"
          />
        </>
      )}
    </div>
  );
}
