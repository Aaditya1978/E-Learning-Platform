import React from "react";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;