import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./components/layout/Layout"

import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Dashboard from "./pages/Dashboard/Dashboard"
import Planner from "./pages/Planner/Planner"
import Itinerary from "./pages/Itinerary/Itinerary"
import Budget from "./pages/Budget/Budget"
import SharedTrip from "./pages/SharedTrip/SharedTrip"
import NotFound from "./pages/NotFound/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/share/:shareId" element={<SharedTrip />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App