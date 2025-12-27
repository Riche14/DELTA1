

import React, { useState, useRef } from 'react';
import { 
    User, FileText, Calendar, Bell, Activity, Pill, Droplet, 
    Thermometer, Heart, AlertCircle, Download, ChevronRight, LogOut,
    PlusCircle, ShieldCheck, CheckCircle, Camera, Upload, Eye, MapPin, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_USER_RECORD, MOCK_CONSULTATIONS } from '../constants';
import { LabResult } from '../types';

const PatientDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'record' | 'appointments' | 'notifications'>('overview');
    
    // Local state to handle updates (Profile pic, docs)
    const [user, setUser] = useState(MOCK_USER_RECORD);
    const [documents, setDocuments] = useState<LabResult[]>(user.medicalRecord.labResults || []);
    const [showAllDocs, setShowAllDocs] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const docInputRef = useRef<HTMLInputElement>(null);

    // Profile Picture Handler
    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const newUrl = URL.createObjectURL(e.target.files[0]);
            setUser({ ...user, image: newUrl });
        }
    };

    // Document Handlers
    const handleAddDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const newDoc: LabResult = {
                id: `new_${Date.now()}`,
                date: new Date().toLocaleDateString('fr-FR'),
                testName: e.target.files[0].name,
                laboratory: 'Importé par le patient',
                fileUrl: '#',
                status: 'Normal'
            };
            setDocuments([newDoc, ...documents]);
            alert("Document ajouté avec succès !");
        }
    };

    const handleDownload = (docName: string) => {
        alert(`Téléchargement de ${docName} lancé...`);
    };

    // Render Helpers
    const renderAppointments = () => (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mes Rendez-vous</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {MOCK_CONSULTATIONS.filter(c => c.patientId === 'p1').length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {MOCK_CONSULTATIONS.filter(c => c.patientId === 'p1').map(apt => (
                            <div key={apt.id} className="p-6 flex flex-col md:flex-row items-center justify-between hover:bg-gray-50 transition">
                                <div className="flex items-center gap-4 mb-4 md:mb-0">
                                    <div className={`p-3 rounded-full ${apt.status === 'Confirmé' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">Consultation {apt.type}</h3>
                                        <p className="text-sm text-gray-500">
                                            {apt.date} à {apt.time} • <span className="font-medium text-primary">Clinique Jade</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">Motif: {apt.reason}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {apt.type === 'Vidéo' && (
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700">
                                            Rejoindre
                                        </button>
                                    )}
                                    <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100">
                                        Reporter
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500">Aucun rendez-vous prévu.</div>
                )}
            </div>
        </div>
    );

    const renderNotifications = () => (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Centre de Notifications</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {user.notifications && user.notifications.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {user.notifications.map(notif => (
                            <div key={notif.id} className={`p-4 flex gap-4 ${!notif.isRead ? 'bg-blue-50/50' : ''}`}>
                                <div className={`mt-1 p-2 rounded-full h-fit ${notif.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                    <Bell className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">{notif.title}</h4>
                                    <p className="text-sm text-gray-600">{notif.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500">Aucune nouvelle notification.</div>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0">
                <div className="p-6 border-b border-gray-100 flex flex-col items-center gap-3 text-center">
                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <img src={user.image} className="w-20 h-20 rounded-full border-4 border-primary p-0.5 object-cover" alt="Profile" />
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <Camera className="w-6 h-6 text-white" />
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleProfileImageChange} />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800 text-lg">{user.firstName} {user.lastName}</h2>
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Patient Vérifié</span>
                    </div>
                </div>
                <nav className="p-4 space-y-1">
                    <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'overview' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <Activity className="w-5 h-5 mr-3" /> Vue d'ensemble
                    </button>
                    <button onClick={() => setActiveTab('record')} className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'record' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <FileText className="w-5 h-5 mr-3" /> Dossier Médical (DMN)
                    </button>
                    <button onClick={() => setActiveTab('appointments')} className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'appointments' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <Calendar className="w-5 h-5 mr-3" /> Rendez-vous
                    </button>
                    <button onClick={() => setActiveTab('notifications')} className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'notifications' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <Bell className="w-5 h-5 mr-3" /> Notifications
                        {user.notifications && user.notifications.length > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {user.notifications.filter(n => !n.isRead).length}
                            </span>
                        )}
                    </button>
                </nav>
                <div className="p-4 border-t border-gray-100 mt-auto">
                    <Link to="/" className="w-full flex items-center px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg transition">
                        <LogOut className="w-5 h-5 mr-3" /> Déconnexion
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                {activeTab === 'overview' && (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-800">Ma Santé Aujourd'hui</h1>
                            <span className="text-sm text-gray-500">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                        </div>

                        {/* Vitals Summary */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-gray-500 text-xs mb-1">Groupe Sanguin</div>
                                <div className="text-2xl font-bold text-red-600 flex items-center"><Droplet className="w-4 h-4 mr-1"/> {user.medicalRecord.bloodGroup}</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-gray-500 text-xs mb-1">Poids</div>
                                <div className="text-2xl font-bold text-blue-600">{user.medicalRecord.weight} kg</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-gray-500 text-xs mb-1">Taille</div>
                                <div className="text-2xl font-bold text-purple-600">{user.medicalRecord.height} cm</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-gray-500 text-xs mb-1">Tension (Dernière)</div>
                                <div className="text-2xl font-bold text-green-600 flex items-center"><Heart className="w-4 h-4 mr-1"/> 12/8</div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Smart Alerts */}
                            <div className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white rounded-xl p-6 shadow-lg">
                                <h3 className="font-bold flex items-center mb-4"><Bell className="w-5 h-5 mr-2" /> Rappels Intelligents</h3>
                                <div className="space-y-4">
                                    <div className="bg-white/10 p-3 rounded-lg flex items-center backdrop-blur-sm">
                                        <Pill className="w-8 h-8 mr-3 text-yellow-400" />
                                        <div>
                                            <p className="font-bold text-sm">Coartem 80/480</p>
                                            <p className="text-xs text-blue-200">Prendre 4 comprimés ce soir (19:00)</p>
                                        </div>
                                        <button className="ml-auto bg-white/20 hover:bg-white/30 p-2 rounded-full"><CheckCircle className="w-4 h-4"/></button>
                                    </div>
                                    <div className="bg-white/10 p-3 rounded-lg flex items-center backdrop-blur-sm">
                                        <Calendar className="w-8 h-8 mr-3 text-green-400" />
                                        <div>
                                            <p className="font-bold text-sm">RDV Dr. Ondo</p>
                                            <p className="text-xs text-blue-200">Demain, 14:00 - Cabinet Louis</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Documents */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-gray-800">Documents Récents</h3>
                                    <button 
                                        onClick={() => { setActiveTab('record'); setShowAllDocs(true); }}
                                        className="text-primary text-xs font-bold hover:underline"
                                    >
                                        Tout voir
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {documents.slice(0, 3).map(lab => (
                                        <div key={lab.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                            <div className="flex items-center">
                                                <div className="bg-blue-100 p-2 rounded mr-3 text-blue-600"><FileText className="w-4 h-4"/></div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800">{lab.testName}</p>
                                                    <p className="text-xs text-gray-500">{lab.date}</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleDownload(lab.testName)}
                                                className="text-gray-400 hover:text-primary transition"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => docInputRef.current?.click()}
                                    className="w-full mt-4 border border-dashed border-gray-300 rounded-lg p-3 text-gray-500 text-sm font-medium hover:border-primary hover:text-primary transition flex items-center justify-center"
                                >
                                    <PlusCircle className="w-4 h-4 mr-2" /> Ajouter un document
                                    <input type="file" ref={docInputRef} className="hidden" onChange={handleAddDocument} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'record' && (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-800">Dossier Médical Numérique</h1>
                            <button 
                                onClick={() => docInputRef.current?.click()}
                                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center hover:bg-green-700 transition"
                            >
                                <PlusCircle className="w-4 h-4 mr-2" /> Ajouter un document
                                <input type="file" ref={docInputRef} className="hidden" onChange={handleAddDocument} />
                            </button>
                        </div>

                         {/* Documents List */}
                         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                                <FileText className="w-5 h-5 mr-2 text-primary"/> Résultats & Ordonnances
                            </h3>
                            <div className="space-y-3">
                                {documents.length > 0 ? documents.map(doc => (
                                    <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-50 text-blue-600 p-2 rounded"><FileText className="w-5 h-5"/></div>
                                            <div>
                                                <p className="font-bold text-gray-800">{doc.testName}</p>
                                                <p className="text-xs text-gray-500">{doc.laboratory} • {doc.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleDownload(doc.testName)} className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDownload(doc.testName)} className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )) : <p className="text-gray-500 italic">Aucun document.</p>}
                            </div>
                        </div>

                        {/* Medical Summary Cards */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center"><AlertCircle className="w-5 h-5 mr-2 text-red-500"/> Allergies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.medicalRecord.allergies.length > 0 ? (
                                        user.medicalRecord.allergies.map(alg => (
                                            <span key={alg} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-bold border border-red-100">{alg}</span>
                                        ))
                                    ) : <span className="text-gray-500 text-sm">Aucune allergie connue.</span>}
                                </div>
                            </div>
                             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center"><Activity className="w-5 h-5 mr-2 text-yellow-500"/> Conditions Chroniques</h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.medicalRecord.chronicConditions.length > 0 ? (
                                        user.medicalRecord.chronicConditions.map(cond => (
                                            <span key={cond} className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold border border-yellow-100">{cond}</span>
                                        ))
                                    ) : <span className="text-gray-500 text-sm">Aucune condition chronique.</span>}
                                </div>
                            </div>
                        </div>

                        {/* Vaccines */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-blue-500"/> Carnet de Vaccination</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                        <tr>
                                            <th className="p-3">Vaccin</th>
                                            <th className="p-3">Date</th>
                                            <th className="p-3">Lieu</th>
                                            <th className="p-3">Rappel</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {user.medicalRecord.vaccines?.map((vac, i) => (
                                            <tr key={i}>
                                                <td className="p-3 font-bold text-gray-800">{vac.name}</td>
                                                <td className="p-3 text-gray-600">{vac.date}</td>
                                                <td className="p-3 text-gray-600">{vac.provider}</td>
                                                <td className="p-3 text-gray-600">{vac.nextDueDate || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* History */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4">Historique des Consultations</h3>
                            <div className="space-y-4">
                                {user.medicalRecord.notes.map(note => (
                                    <div key={note.id} className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-2 h-full min-h-[50px] bg-gray-200 rounded-full relative">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white"></div>
                                        </div>
                                        <div className="pb-4 w-full">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-xs text-gray-500 font-bold mb-1">{note.date}</p>
                                                    <p className="text-sm text-gray-800 font-bold mb-1">{note.author} <span className="text-gray-500 font-normal">- Clinique Jade (Libreville)</span></p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mt-1">{note.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'appointments' && renderAppointments()}
                {activeTab === 'notifications' && renderNotifications()}
            </main>
        </div>
    );
};

export default PatientDashboard;