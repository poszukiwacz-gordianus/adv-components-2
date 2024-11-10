import { useTimersContext } from "../store/timersContext";
import Timer from "./Timer";

export default function Timers() {
  const { timers } = useTimersContext();
  return (
    <ul>
      {timers.map((timer, i) => (
        <li key={timer.name + i}>
          <Timer {...timer} />
        </li>
      ))}
    </ul>
  );
}
