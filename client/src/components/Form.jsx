import "./form.scss";
import useFormContext from "../customHooks/useFormContext";
import { handleFormSubmission } from "../utilities/functions";
import useWorkoutContext from "../customHooks/useWorkoutContext";
import { useValidatorContext } from "../customHooks/useValidatorContext";

const Form = () => {
  const { validators, dispatchV } = useValidatorContext();
  const { formFields, dispatchFF } = useFormContext();
  const { workouts, dispatch } = useWorkoutContext();
  return (
    <div className="form-div">
      <form className="form">
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            className={validators.suggestions.includes("title") ? "error" : ""}
            value={formFields.title}
            onChange={(e) =>
              dispatchFF({
                type: "change",
                key: "title",
                payload: e.target.value,
              })
            }
            type="text"
            id="title"
            placeholder="enter the title here"
          />
        </div>
        <div className="field">
          <label htmlFor="load">Load</label>
          <input
            className={validators.suggestions.includes("load") ? "error" : ""}
            value={formFields.load}
            onChange={(e) =>
              dispatchFF({
                type: "change",
                key: "load",
                payload: e.target.value,
              })
            }
            type="number"
            id="load"
            placeholder="enter the title here"
          />
        </div>
        <div className="field">
          <label htmlFor="reps">Reps</label>
          <input
            className={validators.suggestions.includes("reps") ? "error" : ""}
            value={formFields.reps}
            onChange={(e) =>
              dispatchFF({
                type: "change",
                key: "reps",
                payload: e.target.value,
              })
            }
            type="number"
            id="reps"
            placeholder="enter the title here"
          />
        </div>
        {validators.error && <div className="err-msg">{validators.error}</div>}
        {validators.success && (
          <div className="success-msg">{validators.success}</div>
        )}
        <button
          style={{ cursor: "pointer" }}
          type="button"
          onClick={(e) => {
            handleFormSubmission({
              dispatchV,
              formFields,
              dispatchFF,
              workouts,
              dispatch,
            });
          }}
          className="btn"
        >
          {formFields.edit ? <>Update</> : <>Create</>}
        </button>
        <button
          type="button"
          onClick={() => {
            dispatchFF({ type: "reset" });
            dispatchV({ type: "reset" });
          }}
          style={{
            cursor: "pointer",
            marginLeft: "1em",
            backgroundColor: "white",
            border: "1px solid purple",
            color: "purple",
          }}
          className="btn"
        >
          RESET
        </button>
      </form>
    </div>
  );
};

export default Form;
