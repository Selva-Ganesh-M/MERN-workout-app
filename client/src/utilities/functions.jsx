// Form Component Functions

const isValidCreateOrEditRequest = ({ title, load, reps, dispatchV }) => {
  const temp = [title, load, reps].filter((field) => field);
  if (temp.length !== 3) {
    let obj = { title, load, reps };
    let res = [];
    for (let key in obj) {
      if (!obj[key]) {
        res.push(key);
      }
    }
    dispatchV({
      type: "error",
      payload: {
        error: "Please fill all the fields",
        suggestions: res,
      },
    });
    return false;
  } else {
    dispatchV({ type: "reset" });
    return true;
  }
};

export const createWorkout = async ({
  formFields,
  dispatchFF,
  dispatch,
  dispatchV,
}) => {
  const { title, load, reps } = formFields;
  if (!isValidCreateOrEditRequest({ title, load, reps, dispatchV })) {
    return;
  }

  const workout = { title, load, reps };
  const res = await fetch("http://localhost:4000/api/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });
  const json = await res.json();
  if (res.ok) {
    dispatch({ type: "create", payload: json });
    dispatchFF({ type: "reset" });
    dispatchV({ type: "success", payload: "Workout created successfully" });
    setTimeout(() => dispatchV({ type: "reset" }), 1000);
  }
};

export const editWorkout = async ({
  dispatchV,
  formFields,
  dispatchFF,
  workouts,
  dispatch,
}) => {
  const { title, load, reps } = formFields;
  if (!isValidCreateOrEditRequest({ title, load, reps, dispatchV })) {
    return;
  }

  const res = await fetch(
    `http://localhost:4000/api/workouts/${formFields._id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formFields.title,
        load: formFields.load,
        reps: formFields.reps,
      }),
    }
  );
  const json = await res.json();
  if (res.ok) {
    dispatch({
      type: "edit",
      payload: workouts.workouts.map((item) => {
        if (item._id !== json._id) {
          return item;
        }
        if (item._id === json._id) {
          return {
            ...item,
            title: json.title,
            load: json.load,
            reps: json.reps,
          };
        }
      }),
    });
    dispatchFF({ type: "reset" });
    dispatchV({ type: "success", payload: "Workout updated successfully" });
    setTimeout(() => dispatchV({ type: "reset" }), 1000);
  }
};

export const handleFormSubmission = (props) => {
  const { formFields } = props;
  if (!formFields.edit) {
    createWorkout(props);
  } else {
    editWorkout(props);
  }
};

// workout component functions

export const handleDelete = async (item, dispatch) => {
  const res = await fetch(`http://localhost:4000/api/workouts/${item._id}`, {
    method: "DELETE",
    headers: {
      "Context-Type": "application/json",
    },
  });
  if (res.ok) {
    await dispatch({
      type: "delete",
      payload: item._id,
    });
  }
};

export const handleEdit = async (item, dispatchV, dispatchFF) => {
  await dispatchFF({
    type: "edit",
    payload: {
      title: item.title,
      load: item.load,
      reps: item.reps,
      _id: item._id,
    },
  });
  dispatchV({ type: "reset" });
};
