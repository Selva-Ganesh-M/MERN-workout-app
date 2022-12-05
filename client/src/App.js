import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./app.scss";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Test from "./components/Test";

function App() {
  console.log("app re-rendered");
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {/* <Test /> */}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
