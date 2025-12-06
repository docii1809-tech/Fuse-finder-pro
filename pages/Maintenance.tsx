import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Vehicle, MaintenanceTask, VehicleImage } from '../types';
import { generateMaintenanceSchedule } from '../services/geminiService';
import { fetchCarImages } from '../services/imageFetcher';

interface Props {
  vehicle: Vehicle;
}

const Maintenance: React.FC<Props> = ({ vehicle }) => {
  const [mileage, setMileage] = useState('');
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [carImage, setCarImage] = useState<VehicleImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (vehicle.make && vehicle.model) {
      fetchCarImages(vehicle.year, vehicle.make, vehicle.model).then(imgs => {
        if (imgs.length > 0) setCarImage(imgs[0]);
      });
    }
  }, [vehicle]);

  const handleGenerate = async () => {
    if (!mileage || !vehicle.make) return;
    setLoading(true);
    setError(null);
    setTasks([]);

    try {
      const data = await generateMaintenanceSchedule(
        `${vehicle.year} ${vehicle.make} ${vehicle.model}`, 
        mileage
      );
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Could not generate maintenance schedule.");
    } finally {
      setLoading(false);
    }
  };

  if (!vehicle.make) return <div className="p-10 text-center">Select vehicle first.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Maintenance Schedule</h1>
          <p className="text-slate-600 mb-6">
            Get an AI-tailored list of service items for your <strong>{vehicle.year} {vehicle.make} {vehicle.model}</strong>.
          </p>
          
          <div className="flex gap-4 items-end bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Mileage</label>
              <input 
                type="number" 
                value={mileage}
                onChange={(e) => {
                  setMileage(e.target.value);
                  setError(null);
                }}
                placeholder="e.g. 75000"
                className={`w-full border p-2 rounded-lg ${error ? 'border-red-300' : 'border-slate-300'}`}
              />
            </div>
            <button 
              onClick={handleGenerate}
              disabled={loading || !mileage}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-slate-300 transition h-10"
            >
              {loading ? 'Generating...' : 'Get Schedule'}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2 animate-fade-in">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        <div className="hidden md:block">
          {carImage ? (
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <img src={carImage.url} alt="Vehicle" className="w-full h-40 object-cover" />
              <div className="absolute bottom-0 w-full bg-black/60 text-white text-[10px] p-1 truncate px-2">
                {carImage.attribution}
              </div>
            </div>
          ) : (
             <div className="w-full h-40 bg-slate-200 rounded-xl flex items-center justify-center text-slate-400">
               No Image
             </div>
          )}
        </div>
      </div>

      {tasks.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          {tasks.map((task, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-start gap-3">
                 {task.status === 'urgent' ? (
                   <Clock className="h-5 w-5 text-red-500 mt-1" />
                 ) : (
                   <Calendar className="h-5 w-5 text-blue-500 mt-1" />
                 )}
                 <div>
                   <h3 className="font-bold text-slate-800">{task.item}</h3>
                   <p className="text-sm text-slate-500">Interval: {task.interval}</p>
                 </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase ${
                  task.status === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {task.status}
                </span>
                <p className="text-xs text-slate-400 mt-1">{task.costEstimate}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Maintenance;