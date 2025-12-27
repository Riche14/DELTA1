
import React, { useState } from 'react';
import { Droplet, Phone, Plus, AlertTriangle, CheckCircle } from 'lucide-react';
import { BLOOD_DONATIONS } from '../constants';

const BloodDonationAds: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
    }, 4000);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-600">
            <Droplet className="h-6 w-6" />
            <h2 className="text-xl font-bold">Dons de Sang</h2>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold hover:bg-red-200 transition flex items-center"
          >
            <Plus className="w-3 h-3 mr-1" /> Publier
          </button>
      </div>
      
      {showForm ? (
          <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200 animate-fade-in-up">
              {submitted ? (
                  <div className="text-center py-4">
                      <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
                      <p className="font-bold text-green-700">Annonce reçue !</p>
                      <p className="text-xs text-gray-500">Elle sera publiée après validation par l'administrateur.</p>
                  </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                    <h3 className="font-bold text-gray-700 text-sm">Nouvelle demande</h3>
                    <select className="w-full p-2 border rounded text-sm bg-white" required>
                        <option value="">Groupe Sanguin...</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    <input type="text" placeholder="Hôpital / Lieu" className="w-full p-2 border rounded text-sm" required />
                    <input type="tel" placeholder="Contact (Tél)" className="w-full p-2 border rounded text-sm" required />
                    <select className="w-full p-2 border rounded text-sm bg-white" required>
                        <option value="Haute">Urgence Haute</option>
                        <option value="Moyenne">Urgence Moyenne</option>
                        <option value="Faible">Faible</option>
                    </select>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded text-sm font-bold">Annuler</button>
                        <button type="submit" className="flex-1 bg-red-600 text-white py-2 rounded text-sm font-bold hover:bg-red-700">Envoyer</button>
                    </div>
                </form>
              )}
          </div>
      ) : (
        <div className="space-y-3">
            {BLOOD_DONATIONS.filter(ad => ad.status === 'approved').map(ad => (
            <div key={ad.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                <div className="flex justify-between items-start">
                <div>
                    <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded mb-1 font-bold">
                    Groupe {ad.group}
                    </span>
                    <p className="font-medium text-gray-800">{ad.hospital}</p>
                    <p className="text-sm text-red-600 font-semibold">Urgence: {ad.urgency}</p>
                </div>
                <a href={`tel:${ad.contact}`} className="text-gray-600 hover:text-red-600 bg-white p-2 rounded-full shadow-sm">
                    <Phone className="h-5 w-5" />
                </a>
                </div>
            </div>
            ))}
            {BLOOD_DONATIONS.filter(ad => ad.status === 'approved').length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Aucune demande urgente validée pour le moment.</p>
            )}
        </div>
      )}
    </div>
  );
};

export default BloodDonationAds;
