import { type ReactNode } from "react";

export type Timer = {
  name: string;
  duration: number;
};

export type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

export type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

export type TimerContextProviderProps = {
  children: ReactNode;
};

type StartTimersAction = {
  type: "startTimers";
};
type StopTimersAction = {
  type: "stopTimers";
};
type AddTimeAction = {
  type: "addTimer";
  payload: Timer;
};

export type Action = StartTimersAction | StopTimersAction | AddTimeAction;
