
import React, { useState, useRef, useEffect } from 'react';
import { 
    ShieldCheck, Users, Activity, Droplet, UserCheck, Check, X, LogOut, Lock, 
    Search, Calendar, Phone, Pill, Stethoscope, Eye, BarChart2, Globe, FileText, 
    Star, Briefcase, Trash2, AlertTriangle, Bell, Megaphone, ShieldAlert,
    BrainCircuit, Loader2, Camera, UserPlus, Settings, Image as ImageIcon,
    Upload, Save
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
    BLOOD_DONATIONS, PENDING_REGISTRATIONS, ADMIN_STATS, 
    MOCK_PATIENTS, MOCK_DOCTORS, ALL_PHARMACIES, NEWS_TICKER, MOCK_ADMIN_TEAM
} from '../constants';
import { chatWithGemini } from '../services/geminiService';
import { AdminUser, AdminRole } from '../types';

const MetricCard: React.FC<{ title: string; value: string | number; icon: any; color: string; subtext?: string }> = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
            <div className={`p-2 rounded-full ${color} bg-opacity-10`}>
                <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
            </div>
        </div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
    </div>
);

interface AdminDashboardProps {
    logo: string;
    onUpdateLogo: (newLogo: string) => void;
    favicon: string;
    onUpdateFavicon: (newFavicon: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ logo, onUpdateLogo, favicon, onUpdateFavicon }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'doctors' | 'pharmacies' | 'blood' | 'registrations' | 'content' | 'fakenews' | 'team' | 'settings'>('overview');
    const [showProfileModal, setShowProfileModal] = useState(false);
    
    // Data States
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>(MOCK_ADMIN_TEAM);
    const [bloodRequests, setBloodRequests] = useState(BLOOD_DONATIONS);
    const [registrations, setRegistrations] = useState(PENDING_REGISTRATIONS);
    const [patients, setPatients] = useState(MOCK_PATIENTS);
    const [doctors, setDoctors] = useState(MOCK_DOCTORS);
    const [pharmacies, setPharmacies] = useState(ALL_PHARMACIES);
    const [newsTicker, setNewsTicker] = useState(NEWS_TICKER);
    const [newAlert, setNewAlert] = useState('');
    const [pendingLogo, setPendingLogo] = useState<string | null>(null);
    const [pendingFavicon, setPendingFavicon] = useState<string | null>(null);
    const [fakeNewsQuery, setFakeNewsQuery] = useState('');
    const [fakeNewsResult, setFakeNewsResult] = useState<string | null>(null);
    const [analyzingFakeNews, setAnalyzingFakeNews] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const faviconInputRef = useRef<HTMLInputElement>(null);
    const [viewingDoc, setViewingDoc] = useState<string[] | null>(null);

    useEffect(() => {
        const savedProfile = localStorage.getItem('adminProfile');
        if (savedProfile && isAuthenticated) {
            const parsed = JSON.parse(savedProfile);
            setCurrentUser(prev => prev ? { ...prev, ...parsed } : parsed);
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        let user = adminUsers.find(u => u.username === loginUsername && u.password === loginPassword);
        if (user) {
            const saved = localStorage.getItem('adminProfile');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.id === user.id) user = parsed;
            }
            setCurrentUser(user);
            setIsAuthenticated(true);
        } else {
            alert("Identifiants incorrects");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && currentUser) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedUser = { ...currentUser, image: reader.result as string };
                setCurrentUser(updatedUser);
                localStorage.setItem('adminProfile', JSON.stringify(updatedUser));
                setAdminUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const newName = (form.elements.namedItem('fullName') as HTMLInputElement).value;
        const newPass = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
        if (currentUser) {
            const updated = { ...currentUser, name: newName || currentUser.name, password: newPass || currentUser.password };
            setCurrentUser(updated);
            localStorage.setItem('adminProfile', JSON.stringify(updated));
            setShowProfileModal(false);
            alert("Profil mis à jour");
        }
    };

    const handleSaveSettings = () => {
        if (pendingLogo) onUpdateLogo(pendingLogo);
        if (pendingFavicon) onUpdateFavicon(pendingFavicon);
        if (pendingLogo || pendingFavicon) {
            setPendingLogo(null);
            setPendingFavicon(null);
            alert("Site mis à jour avec succès !");
        } else {
            alert("Aucune modification à enregistrer.");
        }
    };

    const handleAnalyzeFakeNews = async () => {
        if(!fakeNewsQuery.trim()) return;
        setAnalyzingFakeNews(true);
        const result = await chatWithGemini(fakeNewsQuery, [], 'fakenews');
        setFakeNewsResult(result);
        setAnalyzingFakeNews(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-primary">
                    <div className="text-center mb-8">
                        <Lock className="w-12 h-12 text-primary mx-auto mb-2" />
                        <h1 className="text-2xl font-bold">Admin AlloSanté</h1>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input type="text" value={loginUsername} onChange={e=>setLoginUsername(e.target.value)} className="w-full border p-3 rounded" placeholder="admin" />
                        <input type="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} className="w-full border p-3 rounded" placeholder="master241" />
                        <button type="submit" className="w-full bg-primary text-white py-3 rounded font-bold">Connexion</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-gray-50 overflow-hidden h-screen">
            <aside className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="p-6 border-b border-gray-800 flex flex-col items-center">
                    <img src={currentUser?.image} className="w-16 h-16 rounded-full border-2 border-primary object-cover mb-2" />
                    <span className="font-bold text-sm">{currentUser?.name}</span>
                    <button onClick={() => setShowProfileModal(true)} className="text-[10px] text-gray-400 underline mt-1">Éditer profil</button>
                </div>
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-primary' : 'text-gray-400 hover:bg-gray-800'}`}>Vue d'ensemble</button>
                    <button onClick={() => setActiveTab('settings')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'settings' ? 'bg-primary' : 'text-gray-400 hover:bg-gray-800'}`}>Paramètres Site</button>
                    <button onClick={() => setActiveTab('users')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'users' ? 'bg-primary' : 'text-gray-400 hover:bg-gray-800'}`}>Utilisateurs</button>
                    <button onClick={() => setActiveTab('blood')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'blood' ? 'bg-primary' : 'text-gray-400 hover:bg-gray-800'}`}>Dons de sang</button>
                    <button onClick={() => setActiveTab('registrations')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'registrations' ? 'bg-primary' : 'text-gray-400 hover:bg-gray-800'}`}>Validations Pro</button>
                    <button onClick={() => setActiveTab('fakenews')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'fakenews' ? 'bg-primary' : 'text-gray-400 hover:bg-gray-800'}`}>Fake News</button>
                </nav>
                <button onClick={handleLogout} className="p-4 border-t border-gray-800 text-gray-400 flex items-center"><LogOut className="w-4 h-4 mr-2" /> Déconnexion</button>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in-up">
                        <MetricCard title="Visiteurs" value={ADMIN_STATS.dailyVisitors} icon={Users} color="bg-blue-500" />
                        <MetricCard title="RDV Pris" value={ADMIN_STATS.appointmentsBooked} icon={Calendar} color="bg-green-500" />
                        <MetricCard title="Urgence 1300" value={ADMIN_STATS.emergencyCalls} icon={Phone} color="bg-red-500" />
                        <MetricCard title="En ligne" value={ADMIN_STATS.usersOnline} icon={Activity} color="bg-teal-500" />
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="bg-white p-6 rounded-xl border">
                            <h3 className="font-bold text-xl mb-4">Configuration visuelle</h3>
                            <div className="flex gap-8 items-center">
                                <div className="text-center">
                                    <p className="text-xs font-bold mb-2">Aperçu Logo</p>
                                    <div className="w-32 h-32 border flex items-center justify-center p-2 rounded bg-gray-50">
                                        <img src={pendingLogo || logo} className="max-h-full object-contain" />
                                    </div>
                                    <button onClick={()=>logoInputRef.current?.click()} className="mt-2 bg-gray-100 text-xs px-2 py-1 rounded">Changer</button>
                                    <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={e=>{
                                        const r = new FileReader(); r.onload=()=>setPendingLogo(r.result as string); r.readAsDataURL(e.target.files![0]);
                                    }} />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-bold mb-2">Aperçu Favicon</p>
                                    <div className="w-16 h-16 border flex items-center justify-center p-2 rounded bg-gray-50">
                                        <img src={pendingFavicon || favicon} className="max-h-full object-contain" />
                                    </div>
                                    <button onClick={()=>faviconInputRef.current?.click()} className="mt-2 bg-gray-100 text-xs px-2 py-1 rounded">Changer</button>
                                    <input type="file" ref={faviconInputRef} className="hidden" accept="image/*" onChange={e=>{
                                        const r = new FileReader(); r.onload=()=>setPendingFavicon(r.result as string); r.readAsDataURL(e.target.files![0]);
                                    }} />
                                </div>
                                <div className="flex-1 flex justify-end">
                                    <button onClick={handleSaveSettings} className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center shadow-lg hover:bg-teal-700">
                                        <Save className="mr-2 h-5 w-5" /> Enregistrer les modifications
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'fakenews' && (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="bg-white p-6 rounded-xl border">
                            <h3 className="font-bold text-xl mb-4 flex items-center"><ShieldAlert className="mr-2 text-red-500" /> Vérification d'information médicale</h3>
                            <textarea value={fakeNewsQuery} onChange={e=>setFakeNewsQuery(e.target.value)} className="w-full border p-4 rounded h-32" placeholder="Collez ici le texte suspect (ex: rumeur WhatsApp)..." />
                            <button onClick={handleAnalyzeFakeNews} disabled={analyzingFakeNews} className="mt-4 bg-primary text-white px-6 py-2 rounded font-bold flex items-center disabled:opacity-50">
                                {analyzingFakeNews ? <Loader2 className="animate-spin mr-2" /> : <BrainCircuit className="mr-2" />} Analyser par IA
                            </button>
                            {fakeNewsResult && (
                                <div className="mt-6 p-4 bg-gray-50 border rounded-lg animate-fade-in-up">
                                    <h4 className="font-bold mb-2">Résultat de l'expert :</h4>
                                    <p className="whitespace-pre-wrap text-sm text-gray-700">{fakeNewsResult}</p>
                                    <button onClick={()=> {navigator.clipboard.writeText(fakeNewsResult); alert("Copié !");}} className="mt-4 text-xs font-bold text-primary hover:underline">Copier pour diffusion officielle</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {showProfileModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md animate-fade-in-up">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold">Mon Profil Admin</h3>
                            <button onClick={()=>setShowProfileModal(false)}><X /></button>
                        </div>
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative group cursor-pointer" onClick={()=>fileInputRef.current?.click()}>
                                <img src={currentUser?.image} className="w-24 h-24 rounded-full border-4 border-primary p-0.5 object-cover" />
                                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"><Camera className="text-white" /></div>
                            </div>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleProfileImageChange} />
                        </div>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <input name="fullName" defaultValue={currentUser?.name} className="w-full border p-3 rounded" placeholder="Nom complet" />
                            <input name="newPassword" type="password" className="w-full border p-3 rounded" placeholder="Nouveau mot de passe" />
                            <button type="submit" className="w-full bg-primary text-white py-3 rounded font-bold">Sauvegarder</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
