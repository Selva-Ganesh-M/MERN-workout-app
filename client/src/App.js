import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./app.scss";
import Signup from "./components/Signup";
import Login from "./components/Login";
import useAuthContext from "./customHooks/useAuthContext";

function App() {
  console.log("app re-rendered");
  const { auth } = useAuthContext();
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            exact
            element={auth.user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            exact
            element={!auth.user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            exact
            element={!auth.user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
