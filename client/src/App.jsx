import React from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BudgetEstimator from "./pages/BudgetEstimator";
import SavedTrips from "./pages/SavedTrips";
import TripDetail from "./pages/TripDetail";

function App() {
  return (
    <div className="min-h-screen bg-[#020203] text-gray-400 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      {/* <Home /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Dashboard /> */}
      {/* <BudgetEstimator /> */}
      <SavedTrips />
      {/* <TripDetail /> */}
    </div>
  );
}

export default App;