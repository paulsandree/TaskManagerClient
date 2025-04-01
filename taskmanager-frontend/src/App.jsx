import React from "react";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Pomodoro from "./components/Pomodoro";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="today" element={<TaskList />} />
            <Route path="braindump" element={<TaskList />} />
            <Route path="pomodoro" element={<Pomodoro />} />
          </Route>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Navigate to="/today" />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;