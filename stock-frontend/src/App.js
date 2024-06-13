import React from "react";
import "./styles/tailwind.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import AddStockScreen from "./Screens/AddStockScreen";
import EditStockScreen from "./Screens/EditStockScreen";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/add-stock" element={<AddStockScreen />} />
        <Route path="/update/:id" element={<EditStockScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
