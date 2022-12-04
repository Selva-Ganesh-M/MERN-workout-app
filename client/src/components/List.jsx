import { useEffect } from "react";
import useWorkoutContext from "../customHooks/useWorkoutContext";
import "./list.scss";
import Workout from "./Workout";

const List = () => {
  const { workouts, dispatch } = useWorkoutContext();
  useEffect(() => {
    const getWorkouts = async () => {
      const res = await fetch("http://localhost:4000/api/workouts");
      const json = await res.json();
      if (res.ok) {
        await dispatch({ type: "GET_WORKOUTS", payload: json });
      }
    };
    getWorkouts();
  }, [dispatch]);

  return (
    <div className="list-div">
      {workouts.workouts &&
        workouts.workouts.map((item) => <Workout key={item._id} item={item} />)}
      {/* {workouts.workouts && workouts.workouts[0]} */}
    </div>
  );
};

export default List;
