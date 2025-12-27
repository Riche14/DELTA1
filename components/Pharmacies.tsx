
import React, { useState, useEffect } from 'react';
import DrugSearch from './DrugSearch';
import MedicationAvailabilityChecker from './MedicationAvailabilityChecker';
import MapComponent from './MapComponent';
import { MapPin, Clock, Phone, HeartHandshake, Pill, TrendingUp, TrendingDown, AlertCircle, Search, CheckSquare, BarChart3, AlertOctagon, Map as MapIcon, List, Filter, Navigation } from 'lucide-react';
import { ALL_PHARMACIES, FREE_DISTRIBUTION_CENTERS, PROVINCES, POPULAR_DRUGS, EXPENSIVE_DRUGS } from '../constants';

const ImageSlider: React.FC = () => {
    const images = [
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=1200"
    ];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-48 md:h-72 rounded-xl overflow-hidden shadow-lg mb-8">
            {images.map((img, index) => (
                <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img src={img} alt="Pharmacie" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
            ))}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white z-10">
                <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">Pharmacies & Médicaments</h1>
                <p className="text-gray-200 text-sm md:text-lg max-w-2xl drop-shadow-md">
                    Annuaire national, disponibilité des stocks en temps réel et pharmacies de garde dans tout le Gabon.
                </p>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, idx) => (
                    <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === current ? 'bg-white w-4' : 'bg-white/50'}`}></div>
                ))}
            </div>
        </div>
    );
};

const Pharmacies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'commercial' | 'availability' | 'free'>('commercial');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedProvince, setSelectedProvince] = useState<string>('Estuaire');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Advanced Filters
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [sortByDistance, setSortByDistance] = useState(false);

  // Filter Pharmacies from the full list
  let pharmacies = ALL_PHARMACIES.filter(p => {
      const matchProvince = p.province === selectedProvince;
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchOpen = showOpenOnly ? p.openNow === true : true;
      
      return matchProvince && matchSearch && matchOpen;
  });

  // Simulate Distance sorting (randomizing distance if not available, or just mocking sorting)
  if (sortByDistance) {
      // Create a deterministic pseudo-random distance based on ID for demo consistency
      pharmacies = [...pharmacies].sort((a, b) => {
          const distA = a.id.charCodeAt(0) + a.id.charCodeAt(1); 
          const distB = b.id.charCodeAt(0) + b.id.charCodeAt(1);
          return distA - distB;
      });
  }

  const filteredDistributionCenters = FREE_DISTRIBUTION_CENTERS.filter(c => c.province === selectedProvince);

  return (
    <div className="space-y-8">
      {/* Top Image Slider */}
      <ImageSlider />

      {/* Main Filter Tabs */}
      <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg w-full max-w-2xl mx-auto overflow-x-auto no-scrollbar">
        <button 
            onClick={() => setActiveTab('commercial')}
            className={`flex-1 py-2 px-4 rounded-md font-bold text-sm transition whitespace-nowrap ${activeTab === 'commercial' ? 'bg-white text-primary shadow' : 'text-gray-600 hover:text-gray-800'}`}
        >
            <div className="flex items-center justify-center">
                <Pill className="w-4 h-4 mr-2" />
                Pharmacies
            </div>
        </button>
        <button 
            onClick={() => setActiveTab('availability')}
            className={`flex-1 py-2 px-4 rounded-md font-bold text-sm transition whitespace-nowrap ${activeTab === 'availability' ? 'bg-white text-teal-600 shadow' : 'text-gray-600 hover:text-gray-800'}`}
        >
            <div className="flex items-center justify-center">
                <CheckSquare className="w-4 h-4 mr-2" />
                Disponibilité
            </div>
        </button>
        <button 
            onClick={() => setActiveTab('free')}
            className={`flex-1 py-2 px-4 rounded-md font-bold text-sm transition whitespace-nowrap ${activeTab === 'free' ? 'bg-white text-purple-600 shadow' : 'text-gray-600 hover:text-gray-800'}`}
        >
             <div className="flex items-center justify-center">
                <HeartHandshake className="w-4 h-4 mr-2" />
                Gratuité & ARV
            </div>
        </button>
      </div>

      {activeTab === 'availability' && (
          <div className="animate-fade-in-up">
              <MedicationAvailabilityChecker />
          </div>
      )}

      {activeTab === 'commercial' && (
          <div className="space-y-8 animate-fade-in-up">
            
            {/* Barometers Section */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Most Demanded */}
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm">
                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center border-b border-blue-200 pb-2">
                        <TrendingUp className="w-5 h-5 mr-2 text-blue-600" /> Médicaments les plus demandés
                    </h3>
                    <div className="space-y-3">
                        {POPULAR_DRUGS.slice(0, 5).map((drug, index) => (
                            <div key={drug.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-blue-300 w-4">{index + 1}.</span>
                                    <span className="text-sm font-medium text-gray-700">{drug.name}</span>
                                </div>
                                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-blue-500 rounded-full" 
                                        style={{ width: `${100 - (index * 15)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Most Expensive */}
                <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border border-red-100 shadow-sm">
                     <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center border-b border-red-200 pb-2">
                        <BarChart3 className="w-5 h-5 mr-2 text-red-600" /> Top des prix les plus élevés
                    </h3>
                    <div className="space-y-3">
                        {EXPENSIVE_DRUGS.map((drug, index) => (
                            <div key={drug.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-red-300 w-4">{index + 1}.</span>
                                    <span className="text-sm font-medium text-gray-700">{drug.name}</span>
                                </div>
                                <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                                    {drug.avgPrice.toLocaleString()} FCFA
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* General Drug Search (Global) - Now Controls Province */}
            <DrugSearch 
                selectedProvince={selectedProvince} 
                onSelectProvince={setSelectedProvince} 
            />

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Pharmacies de Garde */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <Clock className="w-5 h-5 text-primary mr-2" />
                        Pharmacies de Garde ({selectedProvince})
                    </h2>
                    <div className="space-y-4">
                        {pharmacies.filter(p => p.isOnDuty).length === 0 ? (
                             <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500 border border-gray-200">
                                Aucune pharmacie de garde signalée pour cette province actuellement.
                            </div>
                        ) : (
                            pharmacies.filter(p => p.isOnDuty).map((pharma) => (
                                <div key={pharma.id} className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-green-900">{pharma.name}</h3>
                                            <div className="text-sm text-green-700 mt-1">
                                                <div className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {pharma.city} - {pharma.location}</div>
                                                <div className="flex items-center mt-1"><Phone className="w-3 h-3 mr-1" /> {pharma.phone}</div>
                                            </div>
                                        </div>
                                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-bold uppercase animate-pulse">De Garde</span>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <a href={`tel:${pharma.phone}`} className="flex-1 bg-green-600 text-white py-1.5 rounded text-sm font-medium hover:bg-green-700 transition flex items-center justify-center">
                                            <Phone className="w-3 h-3 mr-1" /> Appeler
                                        </a>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* All Pharmacies List with Map Toggle */}
                <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                        <h2 className="text-xl font-bold text-gray-800">Annuaire Complet</h2>
                        <div className="flex gap-2">
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button 
                                    onClick={() => setViewMode('list')} 
                                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow text-gray-800' : 'text-gray-400'}`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => setViewMode('map')} 
                                    className={`p-1.5 rounded ${viewMode === 'map' ? 'bg-white shadow text-gray-800' : 'text-gray-400'}`}
                                >
                                    <MapIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Advanced Filters */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4 flex flex-wrap gap-3 items-center">
                        <span className="text-sm font-bold text-gray-600 flex items-center mr-2">
                            <Filter className="w-4 h-4 mr-1"/> Filtres:
                        </span>
                        <label className="flex items-center cursor-pointer bg-white px-3 py-1.5 rounded border border-gray-200 hover:border-primary transition">
                            <input 
                                type="checkbox" 
                                checked={showOpenOnly}
                                onChange={(e) => setShowOpenOnly(e.target.checked)}
                                className="w-4 h-4 text-primary rounded mr-2"
                            />
                            <span className="text-sm text-gray-700 font-medium">Ouvert maintenant</span>
                        </label>
                         <button 
                            onClick={() => setSortByDistance(!sortByDistance)}
                            className={`flex items-center px-3 py-1.5 rounded border transition ${sortByDistance ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-200 hover:border-primary'}`}
                        >
                            <Navigation className="w-3 h-3 mr-2" />
                            <span className="text-sm font-medium">À proximité</span>
                        </button>
                    </div>

                    {/* Local Search for the list */}
                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Chercher une pharmacie, un quartier..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>

                    {viewMode === 'map' ? (
                        <MapComponent items={pharmacies} type="pharmacy" />
                    ) : (
                        <div className="bg-white rounded-xl shadow border border-gray-100 divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                            {pharmacies.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    Aucune pharmacie trouvée pour cette province ou ces filtres.
                                </div>
                            ) : (
                                pharmacies.map((pharma) => {
                                    // Mock distance logic for display
                                    const mockDist = (pharma.id.charCodeAt(0) % 5) + (Math.random() * 2);
                                    
                                    return (
                                        <div key={pharma.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition gap-2">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold text-gray-800">{pharma.name}</h4>
                                                    {pharma.isOnDuty && (
                                                        <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Garde</span>
                                                    )}
                                                    {pharma.openNow !== undefined && (
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${pharma.openNow ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                                                            {pharma.openNow ? 'Ouvert' : 'Fermé'}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                                    <MapPin className="w-3 h-3 mr-1"/> {pharma.city} - {pharma.location}
                                                    {sortByDistance && <span className="ml-2 text-xs font-bold text-primary">• à {mockDist.toFixed(1)} km</span>}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <a href={`tel:${pharma.phone}`} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-primary hover:text-white transition">
                                                    <Phone className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    )}
                </div>
            </div>
          </div>
      )}

      {activeTab === 'free' && (
          <div className="animate-fade-in-up">
              {/* Province Selector for Free Tab (since DrugSearch controls it only in commercial tab) */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Choisir une Province</label>
                <div className="relative inline-block w-full md:w-64">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select 
                        value={selectedProvince} 
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none appearance-none bg-white cursor-pointer font-bold"
                    >
                        {PROVINCES.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 mb-6">
                  <h2 className="text-2xl font-bold text-purple-900 mb-2 flex items-center">
                      <HeartHandshake className="w-8 h-8 mr-2"/> Distribution Gratuite - {selectedProvince}
                  </h2>
                  <p className="text-purple-800">
                      Centres de Traitement Ambulatoire (CTA) et Hôpitaux Publics délivrant gratuitement les Anti-Rétroviraux (ARV) et autres traitements vitaux dans la province de {selectedProvince}.
                  </p>
              </div>

              {filteredDistributionCenters.length === 0 ? (
                   <div className="text-center p-12 bg-white rounded-xl border border-gray-200 shadow-sm">
                       <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                       <h3 className="text-lg font-bold text-gray-600">Aucun centre listé</h3>
                       <p className="text-gray-500">Aucun centre de distribution gratuit n'est recensé dans notre base pour {selectedProvince}.</p>
                   </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredDistributionCenters.map(center => (
                        <div key={center.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-xl transition">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{center.name}</h3>
                            <div className="flex space-x-2 mb-3">
                                <span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-bold">
                                    {center.type}
                                </span>
                                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold">
                                    {center.city}
                                </span>
                            </div>
                            
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-start">
                                    <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                                    <span>{center.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{center.hours}</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{center.phone}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Traitements disponibles :</p>
                                <div className="flex flex-wrap gap-2">
                                    {center.supplies.map((item, idx) => (
                                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium border border-gray-200">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
              )}
          </div>
      )}
    </div>
  );
};

export default Pharmacies;