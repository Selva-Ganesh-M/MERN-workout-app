import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw Error(
      "context request out of scope. Use context only in components that are the children of the context provider"
    );
  }
  return context;
};

export default useWorkoutContext;
