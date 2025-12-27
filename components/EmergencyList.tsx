
import React, { useState } from 'react';
import { Phone, Ambulance as AmbulanceIcon, AlertCircle, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { AMBULANCES, PROVINCES } from '../constants';

const EmergencyList: React.FC = () => {
  const [openProvince, setOpenProvince] = useState<string>('Estuaire');

  const groupedAmbulances = PROVINCES.reduce((acc, province) => {
    acc[province] = AMBULANCES.filter(a => a.province === province);
    return acc;
  }, {} as Record<string, typeof AMBULANCES>);

  const toggleProvince = (province: string) => {
    setOpenProvince(openProvince === province ? '' : province);
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6 text-red-700">
        <AlertCircle className="h-6 w-6" />
        <h2 className="text-xl font-bold">Urgences & Évacuation Sanitaire par Province</h2>
      </div>
      
      <div className="space-y-4">
        {PROVINCES.map(province => {
          const services = groupedAmbulances[province];
          if (!services || services.length === 0) return null;

          const isOpen = openProvince === province;

          return (
            <div key={province} className="bg-white rounded-lg shadow-sm border border-red-100 overflow-hidden">
              <button 
                onClick={() => toggleProvince(province)}
                className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition"
              >
                <div className="flex items-center font-bold text-gray-800">
                  <MapPin className="h-5 w-5 mr-2 text-red-500" />
                  {province}
                </div>
                {isOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
              </button>
              
              {isOpen && (
                <div className="p-4 border-t border-gray-100 bg-gray-50 grid gap-3">
                  {services.map((amb) => (
                     <div key={amb.id} className="bg-white p-3 rounded shadow-sm flex justify-between items-center border border-gray-100">
                      <div>
                        <h4 className="font-bold text-gray-800">{amb.serviceName}</h4>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">{amb.zone} - {amb.isPublic ? 'Service Public' : 'Privé'}</p>
                      </div>
                      <a 
                        href={`tel:${amb.phone}`} 
                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition flex items-center shadow"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <div className="p-4 bg-white rounded-lg shadow-sm mb-4 border border-red-100">
            <h3 className="font-bold text-gray-800 mb-2">Numéros d'Urgence Nationale</h3>
            <div className="flex justify-around">
                <a href="tel:1300" className="flex flex-col items-center text-red-600 hover:scale-105 transition">
                    <span className="text-2xl font-black">1300</span>
                    <span className="text-xs font-medium">SAMU</span>
                </a>
                <a href="tel:18" className="flex flex-col items-center text-red-600 hover:scale-105 transition">
                    <span className="text-2xl font-black">18</span>
                    <span className="text-xs font-medium">Pompiers</span>
                </a>
                <a href="tel:1730" className="flex flex-col items-center text-blue-600 hover:scale-105 transition">
                    <span className="text-2xl font-black">1730</span>
                    <span className="text-xs font-medium">Police</span>
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyList;
