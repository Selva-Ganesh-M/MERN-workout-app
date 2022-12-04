import { useReducer } from "react";
import { createContext } from "react";

export const ValidatorContext = createContext();

const initialState = {
  error: "",
  suggestions: [],
  success: "",
};

const validatorReducer = (state, action) => {
  switch (action.type) {
    case "success":
      return {
        error: "",
        suggestions: [],
        success: action.payload,
      };
    case "error":
      return {
        error: action.payload.error,
        suggestions: action.payload.suggestions,
        success: "",
      };
    case "reset":
      return {
        error: "",
        suggestions: [],
        success: "",
      };
    default:
      return state;
  }
};

export const ValidatorContextProvider = ({ children }) => {
  const [validators, dispatchV] = useReducer(validatorReducer, initialState);
  return (
    <ValidatorContext.Provider value={{ validators, dispatchV }}>
      {children}
    </ValidatorContext.Provider>
  );
};
