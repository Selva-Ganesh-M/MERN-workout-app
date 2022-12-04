import { FormContext } from "../context/FormContext";
import { useContext } from "react";

const useFormContext = () => {
  const context = useContext(FormContext);
  return context;
};

export default useFormContext;
