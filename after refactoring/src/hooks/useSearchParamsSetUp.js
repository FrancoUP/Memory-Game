import { useSearchParams } from "react-router-dom";

export function useSearchParamsSetUp() {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type");
  const players = searchParams.get("numPlayers");
  const size = searchParams.get("gridSize");

  return [type, players, size];
}
