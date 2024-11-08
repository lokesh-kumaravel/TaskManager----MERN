import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frame3 from "./components/Frame3.jsx";
import AddTaskSuccess from "./components/AddTaskSuccess.jsx";
import Calendar from "./components/Calendar.jsx";
import TodoVariant3 from "./components/TodoVariant3.jsx";
import Home from "./components/Home.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/AddTaskSuccess" element={<AddTaskSuccess />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/TodoVariant3" element={<TodoVariant3 />} />
      </Routes>
    </Router>
  );
};

export default App;
