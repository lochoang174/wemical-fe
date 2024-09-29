import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./pages/layouyt/Layout";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import SmartStaking from "./pages/SmartStaking";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />} />

          <Route path="/Trasction" element={<Transactions />} />
          <Route path="/SmartStaking" element={<SmartStaking />} />

        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
