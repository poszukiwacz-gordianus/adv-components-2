import { useEffect, useRef, useState } from "react";
import { type Timer as TimerProps } from "./types/types.tsx";
import Container from "./UI/Container.tsx";
import { useTimersContext } from "../store/timersContext.tsx";

export default function Timer({ name, duration }: TimerProps) {
  const timerRef = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const { isRunning } = useTimersContext();

  if (remainingTime <= 0 && timerRef.current) clearInterval(timerRef.current);

  useEffect(() => {
    let timer: number;

    if (isRunning) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 50);
      }, 50);
      timerRef.current = timer;
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
