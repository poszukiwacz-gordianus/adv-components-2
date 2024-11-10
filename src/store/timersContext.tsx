import { createContext, useContext, useReducer } from "react";
import {
  Action,
  TimerContextProviderProps,
  TimersContextValue,
  TimersState,
} from "../components/types/types";

const initialState: TimersState = {
  isRunning: false,
  timers: [],
};

const TimersContext = createContext<TimersContextValue | null>(null);

function reducer(state: TimersState, action: Action): TimersState {
  switch (action.type) {
    case "startTimers":
      return {
        ...state,
        isRunning: true,
      };
    case "stopTimers":
      return {
        ...state,
        isRunning: false,
      };
    case "addTimer":
      return {
        ...state,
        timers: [
          ...state.timers,
          {
            name: action.payload.name,
            duration: action.payload.duration,
          },
        ],
      };

    default:
      return state;
  }
}

export function TimersContextProvider({ children }: TimerContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ctx: TimersContextValue = {
    timers: state.timers,
    isRunning: state.isRunning,
    addTimer(timerData) {
      dispatch({ type: "addTimer", payload: timerData });
    },
    startTimers() {
      dispatch({ type: "startTimers" });
    },
    stopTimers() {
      dispatch({ type: "stopTimers" });
    },
  };

  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}

export function useTimersContext() {
  const context = useContext(TimersContext);
  if (context === null)
    throw new Error("Something went wrong, context is null");
  if (context === undefined)
    throw new Error(
      "useTimersContext must be used within a TimersContextProvider"
    );
  return context;
}
