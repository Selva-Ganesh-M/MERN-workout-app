// Form Component Functions ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// check for authorization

const checkAuth = (auth, dispatchV) => {
  if (auth.user) {
    return true;
  }
  dispatchV({
    type: "error",
    payload: {
      error: "must login to create/edit",
      suggestions: [],
    },
  });
  setTimeout(() => dispatchV({ type: "reset" }), 1000);
  return false;
};

// valid id checker

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

// workout creator ''''''''''''''''''''''

export const createWorkout = async ({
  formFields,
  dispatchFF,
  dispatch,
  dispatchV,
  auth,
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
      Authorization: `Bearer ${auth.user.token}`,
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

// workout editor ''''''''''''''''''

export const editWorkout = async ({
  auth,
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
        Authorization: `Bearer ${auth.user.token}`,
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

// form main submit handler

export const handleFormSubmission = (props) => {
  const { formFields, auth, dispatchV } = props;
  if (!checkAuth(auth, dispatchV)) {
    return;
  }
  if (!formFields.edit) {
    createWorkout(props);
  } else {
    editWorkout(props);
  }
};

// workout component functions  ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

export const handleDelete = async (item, dispatch, dispatchV, auth) => {
  if (!checkAuth(auth, dispatchV)) {
    return;
  }
  const res = await fetch(`http://localhost:4000/api/workouts/${item._id}`, {
    method: "DELETE",
    headers: {
      "Context-Type": "application/json",
      Authorization: `Bearer ${auth.user.token}`,
    },
  });
  if (res.ok) {
    await dispatch({
      type: "delete",
      payload: item._id,
    });
  }
};

export const handleEdit = async (item, dispatchV, dispatchFF, auth) => {
  if (!checkAuth(auth, dispatchV)) {
    return;
  }
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
