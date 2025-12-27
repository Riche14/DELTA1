
import React, { useState } from 'react';
import { Menu, X, User, LogIn, LogOut, Briefcase, FileText } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void; onLogin: (name: string) => void }> = ({ isOpen, onClose, onLogin }) => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulation d'une requête API
        setTimeout(() => {
            setLoading(false);
            onLogin(name || "Jean Mba");
            onClose();
            navigate('/patient-portal');
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X className="h-6 w-6" />
                </button>
                
                <h2 className="text-2xl font-bold text-center mb-6 text-secondary">
                    {mode === 'login' ? 'Connexion Patient' : 'Créer un compte'}
                </h2>

                <div className="flex mb-6 border-b">
                    <button 
                        className={`flex-1 py-2 font-medium ${mode === 'login' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
                        onClick={() => setMode('login')}
                    >
                        Se connecter
                    </button>
                    <button 
                        className={`flex-1 py-2 font-medium ${mode === 'signup' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
                        onClick={() => setMode('signup')}
                    >
                        S'inscrire
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                            <input 
                                type="text" 
                                required 
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none" 
                                placeholder="Jean Kombila"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email ou Téléphone</label>
                        <input 
                            type="text" 
                            required 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none" 
                            placeholder="exemple@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                        <input 
                            type="password" 
                            required 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none" 
                            placeholder="••••••••"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-teal-600 transition flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? 'Traitement...' : (mode === 'login' ? 'Accéder à mon dossier' : 'S\'inscrire')}
                    </button>
                </form>
                <p className="text-xs text-center text-gray-500 mt-4">
                    En continuant, vous acceptez nos CGU et notre politique de confidentialité.
                </p>
            </div>
        </div>
    );
};

const Navbar: React.FC<{ logo: string }> = ({ logo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-primary font-bold' : 'text-gray-500 hover:text-primary';

  const handleLogin = (userName: string) => {
      setUser(userName);
  };

  const handleLogout = () => {
      setUser(null);
  };

  return (
    <>
        <nav className="bg-white sticky top-0 z-50 gabon-border-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-24">
            <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center group gap-3">
                <img 
                    src={logo} 
                    alt="AlloSanté Gabon" 
                    className="h-14 w-auto object-contain animate-spin-slow"
                />
                <div className="hidden md:flex flex-col">
                    <span className="text-2xl font-bold text-secondary tracking-tight leading-none">
                        AlloSanté
                    </span>
                    <span className="text-xs text-primary font-medium tracking-widest uppercase">
                        Gabon
                    </span>
                </div>
                </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className={`text-sm ${isActive('/')}`}>Accueil</Link>
                <Link to="/pharmacies" className={`text-sm ${isActive('/pharmacies')}`}>Pharmacies</Link>
                <Link to="/teleconsult" className={`text-sm ${isActive('/teleconsult')}`}>Téléconsultation</Link>
                <Link to="/prevention" className={`text-sm ${isActive('/prevention')}`}>Prévention</Link>
                <Link to="/partners" className={`text-sm ${isActive('/partners')}`}>Partenaires</Link>
                
                <div className="h-6 w-px bg-gray-200 mx-2"></div>

                <Link to="/register-pro" className={`text-sm flex items-center ${location.pathname === '/register-pro' ? 'text-secondary font-bold' : 'text-gray-500 hover:text-secondary'}`}>
                    Espace Pro
                </Link>

                {user ? (
                    <div className="flex items-center space-x-3 ml-2">
                        <Link 
                            to="/patient-portal" 
                            className="flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm hover:bg-primary/20 transition"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Mon Dossier
                        </Link>
                        <button 
                            onClick={handleLogout}
                            className="p-2 text-gray-400 hover:text-red-500 transition"
                            title="Se déconnecter"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setShowAuth(true)}
                        className="flex items-center bg-primary text-white px-6 py-3 rounded-full hover:bg-teal-600 transition ml-2 shadow-md text-sm font-bold"
                    >
                        Connexion
                    </button>
                )}
            </div>

            <div className="flex items-center md:hidden">
                <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
            </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Accueil</Link>
                <Link to="/pharmacies" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Pharmacies & Médicaments</Link>
                <Link to="/teleconsult" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Téléconsultation</Link>
                <Link to="/prevention" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Prévention</Link>
                <Link to="/partners" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Partenaires</Link>
                <Link to="/register-pro" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:bg-blue-50">Espace Professionnel</Link>
                
                {user ? (
                    <div className="border-t pt-2 mt-2">
                        <Link to="/patient-portal" onClick={() => setIsOpen(false)} className="block w-full text-left px-3 py-2 font-bold text-primary hover:bg-green-50">Mon Dossier Médical</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50">Se déconnecter</button>
                    </div>
                ) : (
                    <button onClick={() => { setIsOpen(false); setShowAuth(true); }} className="w-full mt-2 bg-primary text-white px-3 py-2 rounded-md font-medium text-center">Connexion</button>
                )}
            </div>
            </div>
        )}
        </nav>
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onLogin={handleLogin} />
    </>
  );
};

export default Navbar;