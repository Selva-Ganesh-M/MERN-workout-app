import { useReducer } from "react";
import { createContext } from "react";

export const WorkoutContext = createContext();

const workoutReducer = (state, action) => {
  switch (action.type) {
    case "GET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "create":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "edit":
      return {
        workouts: [...action.payload],
      };
    case "delete":
      return {
        workouts: state.workouts.filter((item) => item._id !== action.payload),
      };
    case "reset":
      return {
        workouts: [],
      };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [workouts, dispatch] = useReducer(workoutReducer, { workouts: "" });
  return (
    <WorkoutContext.Provider value={{ workouts, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
