

import React, { useState } from 'react';
import { Search, MapPin, Check, X, AlertOctagon } from 'lucide-react';
import { MOCK_DRUGS, PROVINCES } from '../constants';
import { Drug } from '../types';

interface DrugSearchProps {
  selectedProvince?: string;
  onSelectProvince?: (p: string) => void;
}

const DrugSearch: React.FC<DrugSearchProps> = ({ selectedProvince, onSelectProvince }) => {
  const [query, setQuery] = useState('');
  const [hasInsurance, setHasInsurance] = useState(false);
  const [localProvince, setLocalProvince] = useState('Estuaire');

  const currentProvince = selectedProvince || localProvince;
  const handleProvinceChange = (p: string) => {
    if (onSelectProvince) {
      onSelectProvince(p);
    } else {
      setLocalProvince(p);
    }
  };

  const filteredDrugs = MOCK_DRUGS.filter(d => {
    const matchesQuery = d.name.toLowerCase().includes(query.toLowerCase()) || 
                         d.dci.toLowerCase().includes(query.toLowerCase()) ||
                         (d.indication && d.indication.toLowerCase().includes(query.toLowerCase()));
    
    // Filter by province as well since we are searching within a province context
    const matchesProvince = d.province === currentProvince;
    
    return matchesQuery && matchesProvince;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Recherche de Médicaments & Pharmacies</h2>
      
      <div className="space-y-4 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Nom, DCI ou Symptôme (ex: fièvre)..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Filters Row: Province & Insurance */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
           <div className="w-full md:w-auto flex items-center gap-2">
                <MapPin className="text-gray-500 h-5 w-5" />
                <span className="text-sm font-bold text-gray-700 whitespace-nowrap">Province :</span>
                <select 
                    value={currentProvince}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 outline-none font-medium cursor-pointer"
                >
                    {PROVINCES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
           </div>

           <label className="flex items-center space-x-3 p-2 cursor-pointer hover:bg-white rounded-lg transition w-full md:w-auto justify-center md:justify-start">
              <div className="relative inline-flex items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    checked={hasInsurance}
                    onChange={(e) => setHasInsurance(e.target.checked)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </div>
              <span className="text-sm font-medium text-gray-700">Prix Assuré (CNAMGS/Privé)</span>
           </label>
        </div>
      </div>

      <div className="space-y-4">
        {filteredDrugs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
             <p className="mb-2">Aucun médicament trouvé pour "{query}" dans la province {currentProvince}.</p>
             <p className="text-xs">Essayez une autre province ou un autre terme.</p>
          </div>
        ) : (
          filteredDrugs.map((drug) => {
            const isNotCovered = drug.insurancePrice === 0 || drug.insurancePrice === drug.price;
            
            return (
                <div key={drug.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-start justify-between hover:shadow-md transition bg-white relative overflow-hidden">
                {isNotCovered && hasInsurance && (
                    <div className="absolute top-0 right-0 bg-red-100 text-red-600 text-[10px] px-2 py-0.5 font-bold rounded-bl">
                        Non couvert
                    </div>
                )}
                
                <div className="mb-4 md:mb-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-gray-900">{drug.name}</h3>
                        {drug.isDuty && (
                            <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider animate-pulse">De Garde</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 mb-1 font-mono">DCI: {drug.dci}</p>
                    <p className="text-sm text-green-700 font-medium mb-2 bg-green-50 inline-block px-2 py-0.5 rounded border border-green-100">{drug.indication}</p>
                    <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="font-semibold mr-1">{drug.pharmacyName}</span> 
                    <span className="text-gray-400 mx-1">•</span> 
                    {drug.pharmacyLocation} ({drug.province})
                    <span className="text-gray-400 mx-1">•</span>
                    {drug.distance}km
                    </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 min-w-[120px]">
                    <div className="text-right">
                    {hasInsurance ? (
                        <>
                        {isNotCovered ? (
                            <div className="flex flex-col items-end">
                                <span className="text-xl font-bold text-gray-900">{drug.price.toLocaleString('fr-GA')} FCFA</span>
                                <span className="text-xs text-red-500 font-bold flex items-center mt-1">
                                    <AlertOctagon className="w-3 h-3 mr-1" />
                                    Pas de prise en charge
                                </span>
                            </div>
                        ) : (
                            <>
                                <div className="text-sm text-gray-400 line-through">{drug.price.toLocaleString('fr-GA')} FCFA</div>
                                <div className="text-xl font-bold text-primary">{drug.insurancePrice.toLocaleString('fr-GA')} FCFA</div>
                                <div className="text-xs text-green-600 font-medium">Part patient (20%)</div>
                            </>
                        )}
                        </>
                    ) : (
                        <div className="text-xl font-bold text-gray-900">{drug.price.toLocaleString('fr-GA')} FCFA</div>
                    )}
                    </div>
                    
                    {drug.inStock ? (
                        <div className="flex items-center text-green-700 text-xs font-bold bg-green-100 px-2 py-1 rounded-full border border-green-200">
                            <Check className="h-3 w-3 mr-1" />
                            En stock
                        </div>
                    ) : (
                        <div className="flex items-center text-red-700 text-xs font-bold bg-red-100 px-2 py-1 rounded-full border border-red-200">
                            <X className="h-3 w-3 mr-1" />
                            Rupture
                        </div>
                    )}
                </div>
                </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DrugSearch;