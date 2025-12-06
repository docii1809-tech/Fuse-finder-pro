import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Zap, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import VehicleSelector from '../components/VehicleSelector';
import { fetchCarImages } from '../services/imageFetcher';
import { Vehicle, VehicleImage } from '../types';

interface Props {
  vehicle: Vehicle;
  setVehicle: (v: Vehicle) => void;
}

const Home: React.FC<Props> = ({ vehicle, setVehicle }) => {
  const [carImage, setCarImage] = useState<VehicleImage | null>(null);
  const isVehicleSelected = Boolean(vehicle.year && vehicle.make && vehicle.model);

  useEffect(() => {
    if (vehicle.make && vehicle.model) {
      fetchCarImages(vehicle.year, vehicle.make, vehicle.model).then(imgs => {
        if (imgs.length > 0) setCarImage(imgs[0]);
      });
    } else {
      setCarImage(null);
    }
  }, [vehicle]);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 lg:py-20 px-4 rounded-b-3xl shadow-xl relative z-0 overflow-hidden">
        {/* Background Texture/Image Overlay if needed */}
        
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                Master Your Vehicle <span className="text-blue-400">Maintenance</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Identify fuses, check engine codes, analyze tire wear, and generate instant maintenance reports using AI.
              </p>
              
              {/* Car Image Display (Only shows when selected) */}
              {isVehicleSelected && carImage && (
                <div className="hidden lg:block animate-fade-in mt-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700/50 inline-block">
                    <img src={carImage.url} alt={vehicle.model} className="h-64 object-cover" />
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-xs p-2 text-center">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full max-w-md relative z-10">
               {/* Mobile Car Image (Only shows when selected) */}
               {isVehicleSelected && carImage && (
                <div className="lg:hidden animate-fade-in mb-6">
                  <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-slate-700/50 mx-auto max-w-xs">
                    <img src={carImage.url} alt={vehicle.model} className="h-40 w-full object-cover" />
                  </div>
                </div>
              )}

              <VehicleSelector 
                vehicle={vehicle} 
                setVehicle={setVehicle} 
                className="text-left shadow-2xl border-0"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-4"></div>

      {/* Features Grid */}
      <section id="tools" className="container mx-auto px-4 scroll-mt-24">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">Capabilities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            to="/fuse"
            icon={<Zap className="h-8 w-8 text-yellow-500" />}
            title="Fuse Finder"
            desc="Locate blown fuses instantly with AI-powered box diagrams."
            disabled={!isVehicleSelected}
          />
          <FeatureCard 
            to="/dashboard"
            icon={<AlertCircle className="h-8 w-8 text-red-500" />}
            title="Dash Lights"
            desc="Snap a photo of your dashboard to identify warning lights."
            disabled={false}
          />
           <FeatureCard 
            to="/maintenance"
            icon={<Wrench className="h-8 w-8 text-blue-500" />}
            title="Maintenance"
            desc="Get a custom schedule based on mileage and make."
            disabled={!isVehicleSelected}
          />
          <FeatureCard 
            to="/report"
            icon={<FileText className="h-8 w-8 text-green-500" />}
            title="Health Report"
            desc="Compile all your checks into a PDF for your mechanic."
            disabled={!isVehicleSelected}
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, to, disabled }: any) => {
  if (disabled) {
    return (
      <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 opacity-60 cursor-not-allowed">
        <div className="mb-4 grayscale">{icon}</div>
        <h3 className="text-xl font-bold text-slate-700 mb-2">{title}</h3>
        <p className="text-slate-500 mb-4">{desc}</p>
        <span className="text-sm bg-slate-200 text-slate-500 py-1 px-3 rounded-full font-medium">Select vehicle first</span>
      </div>
    );
  }
  return (
    <Link to={to} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 group">
      <div className="mb-4 group-hover:scale-110 transition duration-300">{icon}</div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 mb-4">{desc}</p>
      <div className="flex items-center text-blue-600 font-semibold text-sm">
        Launch Tool <ArrowRight className="h-4 w-4 ml-1" />
      </div>
    </Link>
  );
};

export default Home;