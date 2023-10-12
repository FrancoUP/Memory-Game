import { useEffect, useState } from "react";
import { usePost } from "../GameContext";

export function useLocalStorage(size, type, marked) {
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

  return [bestTime, bestMoves];
}
