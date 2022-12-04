import { useContext } from "react";
import { ValidatorContext } from "../context/ValidatorContext";

export const useValidatorContext = () => {
  const context = useContext(ValidatorContext);
  return context;
};
