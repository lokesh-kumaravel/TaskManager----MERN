import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import { CommonProvider } from "./components/CommonContext.jsx";
import Register from "./components/Register.jsx";
import Todo from "./components/Todo.jsx";
import OnProgress from "./components/OnProgress.jsx";
import Done from "./components/Done.jsx";

const App = () => {
  return (
    <CommonProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/onprogress" element={<OnProgress />} />
          <Route path="/done" element={<Done />} />
        </Routes>
      </Router>
    </CommonProvider>
  );
};

export default App;
