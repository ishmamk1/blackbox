import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Upload from "./components/Upload";

// Import your components

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LandingPage}></Route>
        <Route path="*" Component={NotFound}></Route>
        <Route path="/login" Component={LoginPage}></Route>
        <Route path="/register" Component={RegisterPage}></Route>
        <Route path="/upload" Component={Upload}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;