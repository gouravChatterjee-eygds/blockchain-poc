import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssetList from "./AssetList";
import Home from "./Home";
import MyAssets from "./MyAssets";
// import SignIn from "./SignIn";
// import SignUp from "./SignUp";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/asset-list" element={<AssetList />} />
          <Route path="/my-assets" element={<MyAssets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
