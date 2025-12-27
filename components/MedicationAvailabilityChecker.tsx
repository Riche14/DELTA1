
import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, XCircle, Pill, AlertCircle } from 'lucide-react';
import { PROVINCES, MOCK_DRUGS, ALL_PHARMACIES } from '../constants';

const MedicationAvailabilityChecker: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>('Estuaire');
  const [medicationQuery, setMedicationQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Filter pharmacies by province (All pharmacies in the region)
  const provincePharmacies = ALL_PHARMACIES.filter(p => p.province === selectedProvince);

  // Find drugs matching the query in the selected province from the mock database
  const matchingDrugEntries = MOCK_DRUGS.filter(d => 
    d.province === selectedProvince &&
    (d.name.toLowerCase().includes(medicationQuery.toLowerCase()) || 
     d.dci.toLowerCase().includes(medicationQuery.toLowerCase()))
  );

  // Get list of pharmacy names that have the drug in stock based on the mock data
  const pharmaciesWithStock = matchingDrugEntries
    .filter(d => d.inStock)
    .map(d => d.pharmacyName);

  // Pharmacies in the province that are NOT in the "With Stock" list
  // This includes pharmacies that might have the drug but are out of stock, 
  // or pharmacies where we simply don't have the data (simulated as "availability not taken into account/unknown").
  const otherPharmacies = provincePharmacies.filter(p => !pharmaciesWithStock.includes(p.name));

  const handleSearch = () => {
    if (medicationQuery.trim()) {
        setHasSearched(true);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-green-600 p-6 text-white">
            <h2 className="text-2xl font-bold flex items-center">
                <Pill className="w-8 h-8 mr-3" />
                Vérificateur de Disponibilité
            </h2>
            <p className="text-teal-100 mt-2">
                Vérifiez en temps réel quels établissements disposent de votre traitement dans votre province.
            </p>
        </div>

        <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">1. Choisissez votre Province</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select 
                            value={selectedProvince}
                            onChange={(e) => { setSelectedProvince(e.target.value); setHasSearched(false); }}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none appearance-none bg-white cursor-pointer"
                        >
                            {PROVINCES.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="md:col-span-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">2. Nom du médicament</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input 
                            type="text" 
                            value={medicationQuery}
                            onChange={(e) => { setMedicationQuery(e.target.value); setHasSearched(false); }}
                            placeholder="Ex: Doliprane, Coartem..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <button 
                        onClick={handleSearch}
                        className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition shadow-md"
                    >
                        Vérifier
                    </button>
                </div>
            </div>

            {hasSearched && (
                <div className="mt-8 animate-fade-in-up">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
                        Résultats pour "{medicationQuery}" en {selectedProvince}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Disponible */}
                        <div className="bg-green-50 rounded-xl border border-green-200 overflow-hidden">
                            <div className="bg-green-100 p-4 border-b border-green-200">
                                <h4 className="font-bold text-green-800 flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Disponible ({pharmaciesWithStock.length})
                                </h4>
                                <p className="text-xs text-green-700 mt-1">
                                    Ces pharmacies ont confirmé la disponibilité du stock.
                                </p>
                            </div>
                            <div className="p-4 max-h-[400px] overflow-y-auto">
                                {pharmaciesWithStock.length > 0 ? (
                                    <ul className="space-y-3">
                                        {pharmaciesWithStock.map((name, idx) => {
                                            const pharmaDetails = provincePharmacies.find(p => p.name === name);
                                            const drugDetails = matchingDrugEntries.find(d => d.pharmacyName === name);
                                            return (
                                                <li key={idx} className="bg-white p-3 rounded-lg shadow-sm border border-green-100">
                                                    <div className="font-bold text-gray-800">{name}</div>
                                                    <div className="text-sm text-gray-600">
                                                        {pharmaDetails?.location || 'Localisation inconnue'}
                                                    </div>
                                                    {drugDetails && (
                                                        <div className="mt-2 text-sm font-bold text-green-600 flex justify-between items-center">
                                                            <span>{drugDetails.price.toLocaleString()} FCFA</span>
                                                            <span className="text-xs bg-green-100 px-2 py-1 rounded text-green-800 border border-green-200">En Stock</span>
                                                        </div>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <AlertCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
                                        Aucune pharmacie avec stock confirmé pour ce médicament.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Non Disponible / Inconnu */}
                        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                            <div className="bg-gray-100 p-4 border-b border-gray-200">
                                <h4 className="font-bold text-gray-700 flex items-center">
                                    <XCircle className="w-5 h-5 mr-2" />
                                    Disponibilité non confirmée ({otherPharmacies.length})
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">
                                    Pharmacies sans stock ou ne prenant pas en compte la disponibilité en ligne.
                                </p>
                            </div>
                            <div className="p-4 max-h-[400px] overflow-y-auto">
                                {otherPharmacies.length > 0 ? (
                                    <ul className="space-y-3">
                                        {otherPharmacies.map((p, idx) => (
                                            <li key={idx} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 opacity-75 hover:opacity-100 transition">
                                                <div className="font-bold text-gray-700">{p.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {p.location}
                                                </div>
                                                <div className="mt-2 flex gap-2">
                                                    <a href={`tel:${p.phone}`} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border hover:bg-gray-200 flex items-center w-fit">
                                                        Appeler pour vérifier
                                                    </a>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        Toutes les pharmacies listées ont du stock confirmé !
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default MedicationAvailabilityChecker;
