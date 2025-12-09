import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Fuse from './pages/Fuse';
import Dashboard from './pages/Dashboard';
import TireOil from './pages/TireOil';
import Maintenance from './pages/Maintenance';
import Report from './pages/Report';
import Success from './pages/Success';
import SeoFuse from './pages/SeoFuse';
import SeoTire from './pages/SeoTire';
import SeoOil from './pages/SeoOil';
import SeoLights from './pages/SeoLights';
import SeoMaintenance from './pages/SeoMaintenance';
import { Vehicle } from './types';

const App: React.FC = () => {
  // Initialize state from localStorage if available
  const [vehicle, setVehicle] = useState<Vehicle>(() => {
    try {
      const saved = localStorage.getItem('fuse_vehicle');
      return saved ? JSON.parse(saved) : { year: '', make: '', model: '' };
    } catch (e) {
      console.error("Failed to load vehicle from storage", e);
      return { year: '', make: '', model: '' };
    }
  });

  // Save to localStorage whenever vehicle changes
  useEffect(() => {
    try {
      localStorage.setItem('fuse_vehicle', JSON.stringify(vehicle));
    } catch (e) {
      console.error("Failed to save vehicle to storage", e);
    }
  }, [vehicle]);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home vehicle={vehicle} setVehicle={setVehicle} />} />
            
            {/* Main Tool Routes */}
            <Route path="/fuse" element={<Fuse vehicle={vehicle} />} />
            <Route path="/dashboard" element={<Dashboard vehicle={vehicle} />} />
            <Route path="/tire" element={<TireOil type="tire" vehicle={vehicle} />} />
            <Route path="/oil" element={<TireOil type="oil" vehicle={vehicle} />} />
            <Route path="/maintenance" element={<Maintenance vehicle={vehicle} />} />
            <Route path="/report" element={<Report vehicle={vehicle} />} />
            <Route path="/success" element={<Success />} />

            {/* SEO Landing Page Routes */}
            <Route path="/fuse/:slug" element={<SeoFuse />} />
            <Route path="/tire/:slug" element={<SeoTire />} />
            <Route path="/oil/:slug" element={<SeoOil />} />
            <Route path="/lights/:slug" element={<SeoLights />} />
            <Route path="/maintenance/:slug" element={<SeoMaintenance />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;