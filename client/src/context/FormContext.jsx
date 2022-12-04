import { createContext, useReducer } from "react";

export const FormContext = createContext();

const initialState = {
  _id: "",
  title: "",
  load: "",
  reps: "",
  edit: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return {
        title: "",
        load: "",
        reps: "",
        edit: false,
        _id: "",
      };
    case "edit":
      return {
        title: action.payload.title,
        load: action.payload.load,
        reps: action.payload.reps,
        edit: true,
        _id: action.payload._id,
      };
    case "change":
      return {
        ...state,
        [action.key]: action.payload,
      };
    default:
      return state;
  }
};

export const FormContextProvider = ({ children }) => {
  const [formFields, dispatchFF] = useReducer(formReducer, initialState);
  return (
    <FormContext.Provider value={{ formFields, dispatchFF }}>
      {children}
    </FormContext.Provider>
  );
};
