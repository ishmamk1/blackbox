import React from 'react';
import AppProvider from "./store/appProvider.tsx"; // Assuming AppProvider is the context provider
import Router from './Router.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import LiveKitStream from "./components/LiveKitStream";


const App: React.FC = () => {
  return (
    <AppProvider>
      <Navbar/>
      <Router/>
      <LiveKitStream/>
      <Footer />
    </AppProvider>
  );
};

export default App;
