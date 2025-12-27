

import React, { useState } from 'react';
import { 
    Users, Calendar, FileText, MessageSquare, Activity, 
    LogOut, Search, Plus, Clock, Video, User, ChevronRight, 
    FilePlus, Pill, CheckCircle, X, Trash2, Archive, Download, Send, PenTool, Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_PATIENTS, MOCK_CONSULTATIONS, MOCK_MESSAGES, PREDEFINED_DRUGS } from '../constants';
import { Patient, Consultation, PrescriptionItem, ProMessage } from '../types';

const DoctorDashboard: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('Dr. Marc Ondo');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'calendar' | 'messages'>('overview');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [showVideoCall, setShowVideoCall] = useState(false);
    
    // Local State for Data Modification
    const [patients, setPatients] = useState(MOCK_PATIENTS);
    const [messages, setMessages] = useState<ProMessage[]>(MOCK_MESSAGES);
    const [doctorImage] = useState('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200');

    // Prescription State
    const [prescriptionItems, setPrescriptionItems] = useState<PrescriptionItem[]>([]);
    const [newItem, setNewItem] = useState<PrescriptionItem>({ drugName: '', dosage: '', duration: '', instruction: '' });
    const [isSigned, setIsSigned] = useState(false);
    const [isInsurance, setIsInsurance] = useState(false);

    // Login Simulation
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'medecin123') { 
            setIsAuthenticated(true);
        } else {
            alert("Mot de passe incorrect (Indice: medecin123)");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
    };

    // Actions
    const handleJoinCall = () => {
        setShowVideoCall(true);
    };

    const handleViewRecord = (patientId: string) => {
        const p = patients.find(pat => pat.id === patientId);
        if (p) {
            setSelectedPatient(p);
            setActiveTab('patients');
        }
    };

    const handleDeletePatient = (id: string) => {
        if(confirm("Confirmer la suppression de ce patient de votre liste ?")) {
            setPatients(patients.filter(p => p.id !== id));
            setSelectedPatient(null);
        }
    };

    const handleDeleteMessage = (id: string) => {
        setMessages(messages.filter(m => m.id !== id));
    };

    const handleArchiveMessage = (id: string) => {
        alert("Message archivé");
        setMessages(messages.filter(m => m.id !== id));
    };

    // Prescription Logic
    const handleAddPrescriptionItem = () => {
        if (newItem.drugName && newItem.dosage) {
            setPrescriptionItems([...prescriptionItems, newItem]);
            setNewItem({ drugName: '', dosage: '', duration: '', instruction: '' });
        }
    };

    const handleSignPrescription = () => {
        setIsSigned(true);
    };

    const handleGeneratePrescription = (action: 'send' | 'download') => {
        if (!isSigned) {
            alert("Veuillez signer l'ordonnance avant l'envoi.");
            return;
        }
        if (action === 'send') alert(`Ordonnance ${isInsurance ? 'CNAMGS' : ''} envoyée par email au patient.`);
        if (action === 'download') alert("Téléchargement du PDF en cours...");
        
        setShowPrescriptionModal(false);
        setPrescriptionItems([]);
        setIsSigned(false);
        setIsInsurance(false);
    };

    const handleCallPatient = () => {
        alert(`Appel vers ${selectedPatient?.phone}...`);
    };

    const handleSaveNote = () => {
        alert("Note médicale enregistrée dans le dossier sécurisé.");
    };

    // Render Components
    const CalendarGrid = () => {
        const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
        
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in-up overflow-x-auto">
                <div className="flex justify-between items-center mb-6 min-w-[600px]">
                    <h3 className="font-bold text-gray-800 text-lg">Planning de la semaine</h3>
                    <div className="flex gap-2">
                         <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded font-bold">Semaine en cours</button>
                    </div>
                </div>
                <div className="grid grid-cols-8 gap-1 min-w-[800px]">
                    {/* Header */}
                    <div className="p-2 font-bold text-gray-400 text-xs uppercase text-center border-b">Heure</div>
                    {days.map(d => (
                        <div key={d} className="p-2 font-bold text-gray-600 text-sm text-center border-b bg-gray-50">{d}</div>
                    ))}

                    {/* Body */}
                    {hours.map(hour => (
                        <React.Fragment key={hour}>
                            <div className="p-3 text-xs font-bold text-gray-400 text-center border-r border-b">{hour}</div>
                            {days.map((day, i) => {
                                // Simulate mock appointments
                                const hasAppt = (i + parseInt(hour)) % 7 === 0;
                                return (
                                    <div key={`${day}-${hour}`} className="border-b border-r p-1 h-16 relative hover:bg-gray-50 transition">
                                        {hasAppt ? (
                                            <div className="absolute inset-1 bg-blue-100 border-l-4 border-blue-500 rounded p-1 text-[10px] text-blue-800 font-bold overflow-hidden cursor-pointer hover:bg-blue-200">
                                                Consultation
                                                <br/> Patient X
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer">
                                                <Plus className="w-4 h-4 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border-t-4 border-blue-600">
                    <div className="text-center mb-8">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Activity className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Espace Médecin</h1>
                        <p className="text-gray-500">Accès sécurisé professionnel</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Identifiant</label>
                            <input 
                                type="text" 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
                            Connexion
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link to="/" className="text-sm text-gray-500 hover:text-blue-600">Retour au site public</Link>
                    </div>
                </div>
            </div>
        );
    }

    const renderOverview = () => (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800">Bonjour, {username} 👋</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-500 text-sm">RDV Aujourd'hui</span>
                        <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-2xl font-bold text-gray-800">{MOCK_CONSULTATIONS.filter(c => c.date === '2025-05-15').length}</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-500 text-sm">Patients Total</span>
                        <Users className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-2xl font-bold text-gray-800">{patients.length}</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-500 text-sm">Messages</span>
                        <MessageSquare className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="text-2xl font-bold text-gray-800">{messages.filter(m => !m.isRead).length}</span>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Upcoming Appointments */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-blue-600" /> Prochaines Consultations
                    </h3>
                    <div className="space-y-4">
                        {MOCK_CONSULTATIONS.map((consult) => {
                            const patient = patients.find(p => p.id === consult.patientId);
                            return (
                                <div key={consult.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-4">
                                            {consult.time}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">{patient?.firstName} {patient?.lastName}</p>
                                            <p className="text-sm text-gray-500">{consult.reason} • {consult.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {consult.type === 'Vidéo' && (
                                            <button onClick={handleJoinCall} className="px-4 py-2 rounded-lg font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 transition">
                                                Rejoindre
                                            </button>
                                        )}
                                        <button onClick={() => handleViewRecord(consult.patientId)} className="px-4 py-2 rounded-lg font-medium text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                                            Voir Dossier
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-800 mb-4">Actions Rapides</h3>
                    <div className="space-y-3">
                        <button onClick={() => { setActiveTab('patients'); setSelectedPatient(null); }} className="w-full text-left p-3 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition flex items-center">
                            <Plus className="w-4 h-4 mr-2" /> Nouveau Patient
                        </button>
                        <button onClick={() => alert("Génération du rapport annuel...")} className="w-full text-left p-3 rounded-lg bg-green-50 text-green-700 font-medium hover:bg-green-100 transition flex items-center">
                            <FileText className="w-4 h-4 mr-2" /> Rapport Médical
                        </button>
                        <button onClick={() => setActiveTab('calendar')} className="w-full text-left p-3 rounded-lg bg-purple-50 text-purple-700 font-medium hover:bg-purple-100 transition flex items-center">
                            <Calendar className="w-4 h-4 mr-2" /> Gérer Disponibilités
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPatients = () => {
        if (selectedPatient) {
            // Patient Detail View
            return (
                <div className="animate-fade-in-up">
                    <button onClick={() => setSelectedPatient(null)} className="text-blue-600 font-medium mb-4 flex items-center hover:underline">
                        ← Retour à la liste
                    </button>
                    
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <img src={selectedPatient.image} alt="Patient" className="w-20 h-20 rounded-full object-cover border-2 border-white shadow" />
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{selectedPatient.firstName} {selectedPatient.lastName}</h2>
                                    <p className="text-gray-500 text-sm">Né(e) le {selectedPatient.dob} • {selectedPatient.gender === 'M' ? 'Homme' : 'Femme'}</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">Gr: {selectedPatient.medicalRecord.bloodGroup}</span>
                                        {selectedPatient.medicalRecord.chronicConditions.map(c => (
                                            <span key={c} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold">{c}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleCallPatient} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center">
                                    <Phone className="w-4 h-4 mr-2" /> Appeler
                                </button>
                                <button onClick={() => setShowPrescriptionModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700 flex items-center">
                                    <Pill className="w-4 h-4 mr-2" /> Ordonnance
                                </button>
                                <button onClick={() => handleDeletePatient(selectedPatient.id)} className="bg-red-50 text-red-600 border border-red-200 px-3 py-2 rounded-lg font-bold text-sm hover:bg-red-100 flex items-center">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center"><FileText className="w-5 h-5 mr-2 text-gray-500" /> Notes Médicales</h3>
                                <div className="space-y-4">
                                    {selectedPatient.medicalRecord.notes.length > 0 ? selectedPatient.medicalRecord.notes.map(note => (
                                        <div key={note.id} className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm">
                                            <div className="flex justify-between text-yellow-800 font-bold mb-1">
                                                <span>{note.date}</span>
                                                <span>{note.author}</span>
                                            </div>
                                            <p className="text-gray-700">{note.content}</p>
                                        </div>
                                    )) : <p className="text-gray-400 text-sm italic">Aucune note récente.</p>}
                                    <textarea placeholder="Ajouter une note..." className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 outline-none" rows={3}></textarea>
                                    <button onClick={handleSaveNote} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded font-medium hover:bg-gray-200">Enregistrer note</button>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center"><Activity className="w-5 h-5 mr-2 text-gray-500" /> Constantes & Historique</h3>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <div className="text-xs text-gray-500">Poids</div>
                                        <div className="font-bold text-xl">{selectedPatient.medicalRecord.weight} kg</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <div className="text-xs text-gray-500">Taille</div>
                                        <div className="font-bold text-xl">{selectedPatient.medicalRecord.height} cm</div>
                                    </div>
                                </div>
                                <div className="border-t pt-4">
                                    <h4 className="font-bold text-sm text-gray-700 mb-2">Consultations Passées</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li className="flex justify-between"><span>10 Mars 2024</span> <span className="text-green-600">Bilan Annuel</span></li>
                                        <li className="flex justify-between"><span>15 Fév 2024</span> <span className="text-green-600">Suivi Diabète</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prescription Modal */}
                    {showPrescriptionModal && (
                        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
                                <div className="bg-green-600 p-4 text-white flex justify-between items-center">
                                    <h3 className="font-bold text-lg">Nouvelle Ordonnance Électronique</h3>
                                    <button onClick={() => setShowPrescriptionModal(false)}><X className="w-6 h-6"/></button>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded mb-4 text-sm">
                                        <span>Patient: <span className="font-bold">{selectedPatient.firstName} {selectedPatient.lastName}</span></span>
                                        <label className="flex items-center cursor-pointer">
                                            <input type="checkbox" checked={isInsurance} onChange={(e) => setIsInsurance(e.target.checked)} className="mr-2 rounded w-4 h-4 text-blue-600" />
                                            <span className="font-bold text-blue-700">Mode Assurance / CNAMGS</span>
                                        </label>
                                    </div>
                                    
                                    <div className="space-y-4 mb-6">
                                        <div className="grid grid-cols-4 gap-2 items-end">
                                            <div className="col-span-2">
                                                <label className="text-xs font-bold text-gray-600">Médicament</label>
                                                <input list="drugs" value={newItem.drugName} onChange={e => setNewItem({...newItem, drugName: e.target.value})} className="w-full border p-2 rounded text-sm" placeholder="Ex: Doliprane" />
                                                <datalist id="drugs">
                                                    {PREDEFINED_DRUGS.map((d, i) => <option key={i} value={`${d.name} (${d.dosage})`} />)}
                                                </datalist>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-600">Posologie</label>
                                                <input value={newItem.dosage} onChange={e => setNewItem({...newItem, dosage: e.target.value})} className="w-full border p-2 rounded text-sm" placeholder="1 cp 3x/j" />
                                            </div>
                                            <div>
                                                <button onClick={handleAddPrescriptionItem} className="w-full bg-blue-100 text-blue-700 font-bold py-2 rounded text-sm hover:bg-blue-200">Ajouter</button>
                                            </div>
                                        </div>
                                        
                                        {/* Prescription List */}
                                        <div className="border rounded-lg min-h-[150px] p-2 bg-gray-50">
                                            {prescriptionItems.length === 0 && <p className="text-gray-400 text-sm text-center mt-10">Aucun médicament ajouté</p>}
                                            {prescriptionItems.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center bg-white p-2 mb-1 rounded border border-gray-200 text-sm">
                                                    <span className="font-bold">{item.drugName}</span>
                                                    <span className="text-gray-600">{item.dosage}</span>
                                                    <button onClick={() => setPrescriptionItems(prescriptionItems.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700"><X className="w-4 h-4"/></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="flex justify-between items-center pt-4 border-t">
                                        <button 
                                            onClick={handleSignPrescription}
                                            className={`text-sm font-bold flex items-center px-3 py-2 rounded hover:bg-gray-100 transition ${isSigned ? 'text-green-600 cursor-default' : 'text-blue-600 hover:underline'}`}
                                            disabled={isSigned}
                                        >
                                            <PenTool className="w-4 h-4 mr-1" />
                                            {isSigned ? `Signé par ${username}` : "Cliquer pour signer"}
                                        </button>

                                        <div className="flex gap-2">
                                            <button onClick={() => handleGeneratePrescription('download')} disabled={!isSigned} className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm font-bold hover:bg-gray-100 disabled:opacity-50 flex items-center">
                                                <Download className="w-4 h-4 mr-1" /> Télécharger
                                            </button>
                                            <button onClick={() => handleGeneratePrescription('send')} disabled={!isSigned} className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 flex items-center disabled:opacity-50">
                                                <Send className="w-4 h-4 mr-2" /> Envoyer PDF
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // List View
        return (
            <div className="animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Mes Patients</h2>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input type="text" placeholder="Rechercher..." className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 font-bold text-gray-600 text-sm">Patient</th>
                                <th className="p-4 font-bold text-gray-600 text-sm hidden md:table-cell">Dernière Visite</th>
                                <th className="p-4 font-bold text-gray-600 text-sm hidden md:table-cell">Condition</th>
                                <th className="p-4 font-bold text-gray-600 text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {patients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 cursor-pointer" onClick={() => setSelectedPatient(patient)}>
                                        <div className="flex items-center">
                                            <img src={patient.image} alt="" className="w-10 h-10 rounded-full mr-3 object-cover" />
                                            <div>
                                                <div className="font-bold text-gray-800">{patient.firstName} {patient.lastName}</div>
                                                <div className="text-xs text-gray-500">{patient.gender === 'M' ? 'Homme' : 'Femme'}, {new Date().getFullYear() - new Date(patient.dob).getFullYear()} ans</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600 hidden md:table-cell">10 Mars 2024</td>
                                    <td className="p-4 hidden md:table-cell">
                                        {patient.medicalRecord.chronicConditions.length > 0 ? (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">{patient.medicalRecord.chronicConditions[0]}</span>
                                        ) : <span className="text-gray-400 text-sm">-</span>}
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        <button onClick={() => setSelectedPatient(patient)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeletePatient(patient.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100 flex flex-col items-center">
                     <img src={doctorImage} className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-blue-500" alt="Dr Profile" />
                     <h2 className="text-sm font-bold text-gray-800">{username}</h2>
                     <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1">Généraliste</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition ${activeTab === 'overview' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Activity className="w-5 h-5 mr-3" /> Tableau de Bord
                    </button>
                    <button 
                        onClick={() => { setActiveTab('patients'); setSelectedPatient(null); }}
                        className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition ${activeTab === 'patients' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Users className="w-5 h-5 mr-3" /> Patients
                    </button>
                    <button 
                        onClick={() => setActiveTab('calendar')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition ${activeTab === 'calendar' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Calendar className="w-5 h-5 mr-3" /> Calendrier
                    </button>
                    <button 
                        onClick={() => setActiveTab('messages')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition ${activeTab === 'messages' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <MessageSquare className="w-5 h-5 mr-3" /> Messagerie
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{messages.length}</span>
                    </button>
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <Link to="/" className="w-full flex items-center px-4 py-3 text-gray-500 hover:text-blue-600">
                         Retour au site
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg">
                        <LogOut className="w-5 h-5 mr-3" /> Déconnexion
                    </button>
                </div>
            </aside>

            {/* Mobile Header (visible on small screens) */}
            <div className="md:hidden fixed top-0 w-full bg-white z-20 border-b p-4 flex justify-between items-center">
                <span className="font-bold text-blue-800">AlloSanté Pro</span>
                <button onClick={handleLogout}><LogOut className="w-5 h-5 text-gray-500" /></button>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 md:p-10 pt-20 md:pt-10">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'patients' && renderPatients()}
                
                {activeTab === 'calendar' && <CalendarGrid />}

                 {activeTab === 'messages' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[600px] flex">
                        <div className="w-full md:w-1/3 border-r border-gray-100 bg-gray-50 overflow-y-auto">
                            {messages.length === 0 && <p className="p-4 text-gray-500 text-center text-sm">Aucun message.</p>}
                            {messages.map(msg => (
                                <div key={msg.id} className="p-4 border-b border-gray-100 cursor-pointer hover:bg-white group relative">
                                    <div className="font-bold text-gray-800 text-sm">{msg.sender}</div>
                                    <div className="text-xs text-gray-500 truncate pr-10">{msg.content}</div>
                                    <div className="text-[10px] text-gray-400 mt-1">{msg.time}</div>
                                    
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-1">
                                        <button onClick={(e) => {e.stopPropagation(); handleArchiveMessage(msg.id)}} className="p-1.5 bg-gray-200 rounded text-gray-600 hover:text-blue-600" title="Archiver"><Archive className="w-3 h-3"/></button>
                                        <button onClick={(e) => {e.stopPropagation(); handleDeleteMessage(msg.id)}} className="p-1.5 bg-gray-200 rounded text-gray-600 hover:text-red-600" title="Supprimer"><Trash2 className="w-3 h-3"/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 bg-white">
                            <div className="text-center">
                                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>Sélectionnez une conversation</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Video Call Modal Simulation */}
            {showVideoCall && (
                <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center">
                    <div className="text-white text-center">
                        <Video className="w-16 h-16 mx-auto mb-4 animate-pulse text-green-500" />
                        <h2 className="text-2xl font-bold">Appel en cours...</h2>
                        <p className="text-gray-400">Connexion sécurisée établie.</p>
                        <button 
                            onClick={() => setShowVideoCall(false)}
                            className="mt-8 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700"
                        >
                            Raccrocher
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDashboard;