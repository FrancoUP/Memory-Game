import { useState } from "react";

export function useRandomArray(size) {
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
