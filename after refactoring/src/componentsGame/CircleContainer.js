import { useSearchParamsSetUp } from "../hooks/useSearchParamsSetUp";

export function CircleContainer({ children }) {
  const [, , size] = useSearchParamsSetUp();

  return (
    <div className={Number(size) === 16 ? "grid-4X4" : "grid-6X6"}>
      {children}
    </div>
  );
}
