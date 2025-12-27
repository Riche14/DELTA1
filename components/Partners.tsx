
import React, { useState } from 'react';
import { MapPin, Phone, Building2, Store, Search, Handshake, Mail } from 'lucide-react';
import { ALL_PHARMACIES, HEALTH_PARTNERS, PROVINCES } from '../constants';
import { Link } from 'react-router-dom';

const Partners: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'pharmacies' | 'hospitals'>('pharmacies');
    const [selectedProvince, setSelectedProvince] = useState<string>('Estuaire');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPharmacies = ALL_PHARMACIES.filter(p => 
        p.province === selectedProvince && 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredHospitals = HEALTH_PARTNERS.filter(h => 
        h.province === selectedProvince && 
        h.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12 animate-fade-in-up">
             {/* Hero Banner */}
            <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" alt="Partners" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white z-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">Nos Partenaires Santé</h1>
                    <p className="text-gray-200 text-sm md:text-lg max-w-2xl drop-shadow-md">
                        Retrouvez toutes les pharmacies et structures sanitaires partenaires d'AlloSanté Gabon.
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                 <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setActiveTab('pharmacies')}
                        className={`px-6 py-2 rounded-md font-bold text-sm transition flex items-center ${activeTab === 'pharmacies' ? 'bg-white text-primary shadow' : 'text-gray-600'}`}
                    >
                        <Store className="w-4 h-4 mr-2" /> Pharmacies
                    </button>
                    <button 
                        onClick={() => setActiveTab('hospitals')}
                        className={`px-6 py-2 rounded-md font-bold text-sm transition flex items-center ${activeTab === 'hospitals' ? 'bg-white text-primary shadow' : 'text-gray-600'}`}
                    >
                        <Building2 className="w-4 h-4 mr-2" /> Structures
                    </button>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                     <select 
                        value={selectedProvince} 
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                    >
                        {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <div className="relative flex-grow md:flex-grow-0">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Rechercher..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Grid Display */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTab === 'pharmacies' && (
                    filteredPharmacies.length > 0 ? (
                        filteredPharmacies.map(partner => (
                            <div key={partner.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 flex flex-col h-full">
                                <div className="h-48 overflow-hidden bg-gray-100 relative">
                                    <img 
                                        src={partner.image || "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400"} 
                                        alt={partner.name} 
                                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                                    />
                                    {partner.isOnDuty && (
                                        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow animate-pulse">
                                            DE GARDE
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-bold text-lg text-gray-800 mb-2">{partner.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4 flex items-start">
                                        <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0 text-primary" />
                                        {partner.city}, {partner.location}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                        <a href={`tel:${partner.phone}`} className="flex items-center text-primary font-bold hover:underline">
                                            <Phone className="w-4 h-4 mr-1" /> {partner.phone}
                                        </a>
                                        <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200">
                                            Itinéraire
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">Aucune pharmacie trouvée pour cette sélection.</div>
                    )
                )}

                {activeTab === 'hospitals' && (
                     filteredHospitals.length > 0 ? (
                        filteredHospitals.map(partner => (
                            <div key={partner.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 flex flex-col h-full">
                                <div className="h-48 overflow-hidden bg-gray-100 relative">
                                    <img 
                                        src={partner.image} 
                                        alt={partner.name} 
                                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                                    />
                                    <div className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded shadow ${partner.type === 'Public' ? 'bg-blue-600' : 'bg-orange-500'}`}>
                                        {partner.type}
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-bold text-lg text-gray-800 mb-2">{partner.name}</h3>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {partner.specialties.slice(0, 3).map((spec, i) => (
                                            <span key={i} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 flex items-start">
                                        <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0 text-primary" />
                                        {partner.city}, {partner.location}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                        <a href={`tel:${partner.phone}`} className="flex items-center text-primary font-bold hover:underline">
                                            <Phone className="w-4 h-4 mr-1" /> {partner.phone}
                                        </a>
                                        <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200">
                                            Itinéraire
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                     ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">Aucune structure trouvée pour cette sélection.</div>
                    )
                )}
            </div>

            {/* Devenir Partenaire Section */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold mb-4 flex items-center">
                        <Handshake className="w-8 h-8 mr-3 text-yellow-400" />
                        Devenez Partenaire AlloSanté
                    </h2>
                    <p className="text-blue-100 text-lg mb-6">
                        Vous dirigez une clinique, un laboratoire ou une pharmacie ? Rejoignez le premier réseau de santé digital du Gabon. 
                        Augmentez votre visibilité et simplifiez l'accès aux soins pour les patients.
                    </p>
                    <ul className="space-y-2 mb-6">
                        <li className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span> Visibilité auprès de milliers de patients</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span> Gestion des rendez-vous en ligne</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span> Mise en avant de vos spécialités</li>
                    </ul>
                    <Link 
                        to="/register-pro" 
                        state={{ type: 'structure' }}
                        className="inline-block bg-yellow-400 text-blue-900 font-bold px-8 py-3 rounded-lg hover:bg-yellow-300 transition shadow-lg transform hover:scale-105"
                    >
                        Inscrire ma structure
                    </Link>
                </div>
                <div className="hidden md:block">
                     <Building2 className="w-64 h-64 text-blue-700 opacity-30" />
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-100 rounded-2xl p-8 text-center border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Nous Contacter</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="font-bold text-gray-800 mb-2">Téléphone</h3>
                        <p className="text-gray-600">+241 77 61 98 43</p>
                        <p className="text-xs text-gray-500 mt-1">Lundi - Vendredi, 8h-18h</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <Mail className="w-8 h-8 text-secondary mx-auto mb-3" />
                        <h3 className="font-bold text-gray-800 mb-2">Email</h3>
                        <p className="text-gray-600">contact@allosante.ga</p>
                        <p className="text-xs text-gray-500 mt-1">Réponse sous 24h</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                        <h3 className="font-bold text-gray-800 mb-2">Siège Social</h3>
                        <p className="text-gray-600">Immeuble Premium, Glass</p>
                        <p className="text-xs text-gray-500 mt-1">Libreville, Gabon</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Partners;