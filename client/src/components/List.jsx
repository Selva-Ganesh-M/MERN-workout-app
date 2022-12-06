import { useEffect } from "react";
import useAuthContext from "../customHooks/useAuthContext";
import useWorkoutContext from "../customHooks/useWorkoutContext";
import "./list.scss";
import Workout from "./Workout";

const List = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { auth } = useAuthContext();
  useEffect(() => {
    const getWorkouts = async () => {
      const res = await fetch("http://localhost:4000/api/workouts", {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      const json = await res.json();
      if (res.ok) {
        await dispatch({ type: "GET_WORKOUTS", payload: json });
      }
    };
    if (auth.user) {
      getWorkouts();
    }
  }, [dispatch, auth.user]);

  return (
    <div className="list-div">
      {workouts.workouts.length > 0 ? (
        workouts.workouts.map((item) => <Workout key={item._id} item={item} />)
      ) : (
        <div className="empty-list">
          Please create some workouts to add to the list.
        </div>
      )}
    </div>
  );
};

export default List;
