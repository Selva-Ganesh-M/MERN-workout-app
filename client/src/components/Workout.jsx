import useFormContext from "../customHooks/useFormContext";
import { useValidatorContext } from "../customHooks/useValidatorContext";
import useWorkoutContext from "../customHooks/useWorkoutContext";
import { handleDelete, handleEdit } from "../utilities/functions";
import "./workout.scss";

const Workout = ({ item }) => {
  const { dispatchV } = useValidatorContext();
  const { dispatch } = useWorkoutContext();
  const { dispatchFF } = useFormContext();
  return (
    <div className="workout">
      <div className="content">
        <div className="title">{item.title}</div>
        <div className="data">
          <span className="label">Reps:</span>
          <span className="value">{item.reps}</span>
        </div>
        <div className="data">
          <span className="label">Load:</span>
          <span className="value">{item.load}</span>
        </div>
      </div>
      <div className="actions">
        <i
          onClick={() => handleEdit(item, dispatchV, dispatchFF)}
          className="fa purple fa-edit fa-2x"
        ></i>
        <i
          onClick={() => handleDelete(item, dispatch)}
          className="fa red fa-trash fa-2x"
        ></i>
      </div>
    </div>
  );
};

export default Workout;
