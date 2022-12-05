import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WorkoutContextProvider } from "./context/WorkoutContext";
import { FormContextProvider } from "./context/FormContext";
import { ValidatorContextProvider } from "./context/ValidatorContext";
import AuthContextProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("in index");
root.render(
  <React.StrictMode>
    <WorkoutContextProvider>
      <FormContextProvider>
        <ValidatorContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </ValidatorContextProvider>
      </FormContextProvider>
    </WorkoutContextProvider>
  </React.StrictMode>
);
