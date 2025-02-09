import React from 'react';
import AppProvider from "./store/appProvider.tsx"; // Assuming AppProvider is the context provider
import Router from './Router.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import { useEffect } from "react";


const App: React.FC = () => {
  useEffect(() => {
    document.title = "BlackBox"; // Change this to your desired title
}, []);
  return (
    <AppProvider>
      <Navbar/>
      <Router/>
      <Footer />
    </AppProvider>
  );
};

export default App;
