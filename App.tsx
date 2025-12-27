
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import DrugSearch from './components/DrugSearch';
import EmergencyList from './components/EmergencyList';
import BloodDonationAds from './components/BloodDonationAds';
import AIChat from './components/AIChat';
import Teleconsultation from './components/Teleconsultation';
import Pharmacies from './components/Pharmacies';
import PreventionTools from './components/PreventionTools';
import DoctorRegistration from './components/DoctorRegistration';
import DoctorDashboard from './components/DoctorDashboard';
import PharmacyDashboard from './components/PharmacyDashboard';
import PatientDashboard from './components/PatientDashboard';
import Partners from './components/Partners';
import RadioAnalysis from './components/RadioAnalysis';
import FloatingChat from './components/FloatingChat';
import AdminDashboard from './components/AdminDashboard';
import { NEWS_TICKER } from './constants';
import { Video, Activity, Info, Pill, Stethoscope, ChevronRight, Building2, Scan, Calendar, CheckCircle, User, Search, ArrowRight } from 'lucide-react';

const Footer: React.FC<{ logo: string }> = ({ logo }) => (
  <footer className="bg-secondary text-white py-12 md:py-16 mt-12 border-t-4 border-primary">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-center md:text-left">
      <div className="md:col-span-1">
          <div className="mb-4 flex items-center justify-center md:justify-start gap-2">
             <img 
                src={logo} 
                alt="AlloSanté Gabon" 
                className="h-10 w-auto object-contain bg-white rounded-full p-1 animate-spin-slow"
             />
             <span className="text-2xl font-bold tracking-tight">AlloSanté</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            La plateforme de référence pour l'accès aux soins digitaux au Gabon. Connectée aux professionnels de santé agréés.
          </p>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-6 text-primary">Liens Rapides</h3>
        <ul className="space-y-3 text-gray-300 text-sm">
            <li><Link to="/pharmacies" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Pharmacies de garde</Link></li>
            <li><Link to="/teleconsult" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Médecins en ligne</Link></li>
            <li><Link to="/prevention" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Calculateur IMC</Link></li>
            <li><Link to="/partners" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Nos Partenaires</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-6 text-primary">Espace Pro</h3>
        <ul className="space-y-3 text-gray-300 text-sm">
            <li><Link to="/doctor-dashboard" className="hover:text-white">Accès Médecin</Link></li>
            <li><Link to="/pharmacy-dashboard" className="hover:text-white">Accès Pharmacie</Link></li>
            <li><Link to="/register-pro" className="hover:text-white">Devenir Partenaire</Link></li>
            <li><Link to="/admin" className="hover:text-white">Administration</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-6 text-primary">Contact & Urgences</h3>
        <p className="text-gray-300 text-sm mb-2">Support: contact@allosante.ga</p>
        <p className="text-gray-300 text-sm mb-6">Tel: +241 77 61 98 43</p>
        <div className="inline-block bg-red-600 text-white px-6 py-3 rounded-full font-bold animate-pulse shadow-lg shadow-red-900/50">
            URGENCE : 1300
        </div>
      </div>
    </div>
    <div className="text-center text-xs text-gray-500 mt-12 pt-8 border-t border-gray-700">
        © 2025 AlloSanté Gabon. Données fournies à titre indicatif.
    </div>
  </footer>
);

const Home = () => (
  <div className="space-y-8 md:space-y-12 animate-fade-in-up pb-20">
    <div className="relative bg-white pt-6 pb-12 md:pt-8 md:pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-accent/20 rounded-bl-[200px] -z-0"></div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
            <div className="space-y-6 text-center md:text-left">
                <div className="inline-flex items-center bg-blue-50 text-secondary px-4 py-2 rounded-full text-xs md:text-sm font-bold border border-blue-100">
                    <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                    Réseau National de Santé Certifié
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-secondary leading-tight">
                    Votre Santé, <br/>
                    <span className="text-primary">Notre Priorité.</span>
                </h1>
                <p className="text-gray-500 text-base md:text-lg max-w-lg leading-relaxed mx-auto md:mx-0">
                    Trouvez un médecin, localisez une pharmacie de garde ou consultez en ligne. AlloSanté Gabon simplifie votre parcours de soins.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                    <Link to="/teleconsult" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-teal-600 transition shadow-xl shadow-primary/30 flex items-center justify-center transform hover:-translate-y-1">
                        <Calendar className="mr-2 h-5 w-5" />
                        Prendre Rendez-vous
                    </Link>
                    <Link to="/pharmacies" className="bg-white text-secondary border-2 border-secondary px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition flex items-center justify-center">
                        <Pill className="mr-2 h-5 w-5" />
                        Trouver un Médicament
                    </Link>
                </div>
                <div className="pt-4 md:pt-8 flex items-center justify-center md:justify-start gap-4 md:gap-8 text-gray-400">
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-xl md:text-2xl font-bold text-secondary">500+</span>
                        <span className="text-xs">Médecins</span>
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-xl md:text-2xl font-bold text-secondary">24/7</span>
                        <span className="text-xs">Service</span>
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-xl md:text-2xl font-bold text-secondary">98%</span>
                        <span className="text-xs">Satisfaction</span>
                    </div>
                </div>
            </div>
            <div className="relative hidden md:block">
                <img 
                    src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=800" 
                    alt="Doctor smiling" 
                    className="rounded-3xl shadow-2xl relative z-10 w-[85%] ml-auto object-cover h-[500px]"
                />
            </div>
        </div>
    </div>

    <div className="relative max-w-5xl mx-auto px-4 -mt-6 md:-mt-10 z-30">
        <div className="bg-white rounded-2xl shadow-xl p-2 md:p-4 border border-gray-100">
             <div className="border-b border-gray-100 p-4 mb-2">
                <h2 className="font-bold text-lg text-secondary flex items-center">
                    <Search className="w-5 h-5 mr-2 text-primary" /> 
                    Recherche Rapide de Médicaments
                </h2>
            </div>
            <div className="px-2 md:px-4 pb-4">
                <DrugSearch />
            </div>
        </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-secondary text-white p-3 rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row items-start md:items-center">
           <span className="bg-primary px-3 py-1 rounded text-[10px] md:text-xs font-bold md:mr-4 mb-2 md:mb-0 whitespace-nowrap self-start">
               INFORMATION DU MINISTERE DE LA SANTE
           </span>
           <div className="w-full overflow-hidden whitespace-nowrap relative h-6">
               <div className="absolute animate-marquee whitespace-nowrap">
                {NEWS_TICKER.map((news, i) => (
                    <span key={i} className="mr-12 font-medium text-xs md:text-sm inline-flex items-center opacity-90">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                        {news}
                    </span>
                ))}
               </div>
           </div>
        </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold text-secondary">Nos Services</h2>
            <Link to="/pharmacies" className="text-primary text-sm font-bold flex items-center hover:underline">
                Voir tout <ArrowRight className="w-4 h-4 ml-1"/>
            </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/pharmacies" className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400" alt="Pharmacies" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                    <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center mb-3"><Pill className="h-5 w-5" /></div>
                    <h3 className="text-xl font-bold">Pharmacies</h3>
                    <p className="text-xs text-gray-300 mt-1">De garde & Stocks en temps réel</p>
                </div>
            </Link>
            <Link to="/teleconsult" className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400" alt="Teleconsultation" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                    <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center mb-3"><Stethoscope className="h-5 w-5" /></div>
                    <h3 className="text-xl font-bold">Téléconsultation</h3>
                    <p className="text-xs text-gray-300 mt-1">Médecins disponibles 24/7</p>
                </div>
            </Link>
            <Link to="/radio-analysis" className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=400" alt="Radio IA" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                    <div className="bg-purple-500 w-10 h-10 rounded-full flex items-center justify-center mb-3"><Scan className="h-5 w-5" /></div>
                    <h3 className="text-xl font-bold">Radio IA</h3>
                    <p className="text-xs text-gray-300 mt-1">Analyse X-Ray assistée</p>
                </div>
            </Link>
            <Link to="/partners" className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400" alt="Partenaires" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                    <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center mb-3"><Building2 className="h-5 w-5" /></div>
                    <h3 className="text-xl font-bold">Structures</h3>
                    <p className="text-xs text-gray-300 mt-1">Hôpitaux & Cliniques</p>
                </div>
            </Link>
        </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-gradient-to-r from-secondary to-blue-900 text-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
                    <div className="mb-4 md:mb-0 relative z-10 text-center md:text-left">
                        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                            <Video className="text-primary"/> Besoin d'un avis médical ?
                        </h2>
                        <p className="text-gray-300">Nos médecins généralistes sont disponibles immédiatement pour une téléconsultation.</p>
                    </div>
                    <Link to="/teleconsult" className="bg-white text-secondary px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-md flex items-center relative z-10">
                        Voir les disponibilités <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
                <EmergencyList />
            </div>
            <div className="space-y-8">
                <BloodDonationAds />
                <AIChat />
            </div>
        </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [logo, setLogo] = useState<string>(localStorage.getItem('appLogo') || 'https://placehold.co/150x150?text=Logo');
  const [favicon, setFavicon] = useState<string>(localStorage.getItem('appFavicon') || '');

  useEffect(() => {
      if (favicon) {
          let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
          if (!link) {
              link = document.createElement('link');
              link.rel = 'icon';
              document.getElementsByTagName('head')[0].appendChild(link);
          }
          link.href = favicon;
      }
  }, [favicon]);

  const handleUpdateLogo = (newLogo: string) => {
    setLogo(newLogo);
    localStorage.setItem('appLogo', newLogo);
  };

  const handleUpdateFavicon = (newFavicon: string) => {
      setFavicon(newFavicon);
      localStorage.setItem('appFavicon', newFavicon);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-surface-light font-sans">
        <Routes>
           <Route path="/admin" element={
                <AdminDashboard 
                    logo={logo} 
                    onUpdateLogo={handleUpdateLogo} 
                    favicon={favicon}
                    onUpdateFavicon={handleUpdateFavicon}
                />
            } />
           <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
           <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
           <Route path="/patient-portal" element={<PatientDashboard />} />
           
           <Route path="*" element={
             <>
               <Navbar logo={logo} />
               <main className="flex-grow w-full">
                 <Routes>
                   <Route path="/" element={<Home />} />
                   <Route path="/pharmacies" element={<Pharmacies />} />
                   <Route path="/teleconsult" element={<Teleconsultation />} />
                   <Route path="/prevention" element={<PreventionTools />} />
                   <Route path="/partners" element={<Partners />} />
                   <Route path="/radio-analysis" element={<RadioAnalysis />} />
                   <Route path="/register-pro" element={<DoctorRegistration />} />
                 </Routes>
               </main>
               <Footer logo={logo} />
               <FloatingChat />
             </>
           } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
