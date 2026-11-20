import React from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-[#020203] text-gray-400 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      {/* <Home /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      <Dashboard />
    </div>
  );
}

export default App;