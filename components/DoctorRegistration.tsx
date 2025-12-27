
import React, { useState } from 'react';
import { Upload, User, Briefcase, FileText, CheckCircle, MapPin, Calendar, Video, ArrowLeft, GraduationCap, Scroll, Award, Shield, Store, Pill, Database, FileSpreadsheet, Server, Plus, Trash2, Smartphone, CreditCard, Clock, Truck, Globe, Building2, Stethoscope, Microscope, Activity, Siren, BedDouble, LogIn, Hash } from 'lucide-react';
import { PROVINCES } from '../constants';
import { Link, useLocation } from 'react-router-dom';

const DoctorRegistration: React.FC = () => {
    const location = useLocation();
    // Retrieve default tab from navigation state if available, otherwise default to 'doctor'
    const [profileType, setProfileType] = useState<'doctor' | 'pharmacy' | 'structure'>(
        (location.state as any)?.type || 'doctor'
    );
    const [submitted, setSubmitted] = useState(false);

    // --- DOCTOR STATE ---
    const [doctorData, setDoctorData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialty: 'Généraliste',
        experience: '',
        hospital: '',
        city: 'Libreville',
        province: 'Estuaire',
        price: '15000',
        orderNumber: '',
        isMilitary: false,
        militaryRank: '',
        consultationType: 'both', // 'physical', 'video', 'both'
        availability: '09:00 - 17:00'
    });
    const [doctorPhotoPreview, setDoctorPhotoPreview] = useState<string | null>(null);
    const [doctorDocs, setDoctorDocs] = useState({
        bac: null as string | null,
        doctorat: null as string | null,
        specialty: null as string | null,
        cni: null as string | null,
        orderCert: null as string | null
    });

    // --- PHARMACY STATE ---
    const [pharmacyData, setPharmacyData] = useState({
        name: '',
        license: '',
        manager: '',
        address: '',
        city: 'Libreville',
        province: 'Estuaire',
        phone1: '',
        phone2: '',
        email: '',
        website: '',
        hours: '08h00 - 20h00',
        emergencyContact: '',
        services: [] as string[],
        paymentMethods: [] as string[],
    });
    const [inventoryMethod, setInventoryMethod] = useState<'manual' | 'csv' | 'api'>('manual');
    const [manualDrugs, setManualDrugs] = useState<Array<{name: string, dci: string, dosage: string, price: string, stock: string}>>([]);
    const [newDrug, setNewDrug] = useState({ name: '', dci: '', dosage: '', price: '', stock: '' });

    // --- STRUCTURE STATE ---
    const [structureData, setStructureData] = useState({
        name: '',
        type: 'Clinique Privée',
        director: '',
        address: '',
        city: 'Libreville',
        province: 'Estuaire',
        phone: '',
        email: '',
        capacity: '',
        hasEmergency: false,
        hasAmbulance: false,
        acceptsCnamgs: true,
        specialties: [] as string[],
        image: null as string | null,
    });
    const [structureImagePreview, setStructureImagePreview] = useState<string | null>(null);

    // --- SHARED CONSTANTS ---
    const specialties = ['Généraliste', 'Dentiste', 'Gynécologue', 'Ophtalmologue', 'Pédiatre', 'Cardiologue', 'Dermatologue', 'Chirurgien', 'Psychologue', 'Neurologue'];
    const militaryRanks = ['Médecin Aspirant', 'Médecin Sous-Lieutenant', 'Médecin Lieutenant', 'Médecin Capitaine', 'Médecin Commandant', 'Médecin Lieutenant-Colonel', 'Médecin Colonel', 'Médecin Général de Brigade', 'Médecin Général de Division'];
    
    const pharmacyServicesList = ['Livraison à domicile', 'Conseils personnalisés', 'Vaccination', 'Préparations magistrales', 'Orthopédie', 'Parapharmacie'];
    const paymentMethodsList = ['Espèces', 'Airtel Money', 'Moov Money', 'Carte Bancaire', 'Assurance CNAMGS', 'Assurances Privées'];

    const structureTypes = ['Clinique Privée', 'Hôpital Public', 'Centre de Santé', 'Laboratoire d\'Analyses', 'Centre d\'Imagerie', 'Cabinet de Groupe'];
    const structureSpecialties = ['Urgences', 'Maternité', 'Chirurgie', 'Pédiatrie', 'Radiologie', 'Analyses Médicales', 'Cardiologie', 'Odontologie'];

    // --- HANDLERS ---

    const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDoctorData(prev => ({ ...prev, [name]: value }));
    };

    const handleDoctorCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setDoctorData(prev => ({ ...prev, [name]: checked }));
    };

    const handlePharmacyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPharmacyData(prev => ({ ...prev, [name]: value }));
    };

    const togglePharmacyOption = (field: 'services' | 'paymentMethods', value: string) => {
        setPharmacyData(prev => {
            const list = prev[field];
            if (list.includes(value)) {
                return { ...prev, [field]: list.filter(item => item !== value) };
            } else {
                return { ...prev, [field]: [...list, value] };
            }
        });
    };

    const handleStructureChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setStructureData(prev => ({ ...prev, [name]: value }));
    };

    const handleStructureCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setStructureData(prev => ({ ...prev, [name]: checked }));
    };

    const toggleStructureSpecialty = (value: string) => {
        setStructureData(prev => {
            const list = prev.specialties;
            if (list.includes(value)) return { ...prev, specialties: list.filter(item => item !== value) };
            return { ...prev, specialties: [...list, value] };
        });
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setDoctorPhotoPreview(imageUrl);
        }
    };

    const handleStructureImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setStructureImagePreview(imageUrl);
        }
    };

    const handleDocUpload = (type: keyof typeof doctorDocs) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDoctorDocs(prev => ({ ...prev, [type]: e.target.files![0].name }));
        }
    };

    const handleAddDrug = () => {
        if (newDrug.name && newDrug.price) {
            setManualDrugs([...manualDrugs, newDrug]);
            setNewDrug({ name: '', dci: '', dosage: '', price: '', stock: '' });
        }
    };

    const handleRemoveDrug = (index: number) => {
        setManualDrugs(manualDrugs.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        window.scrollTo(0, 0);
    };

    // --- RENDER HELPERS ---
    const getDoctorDisplayName = () => {
        const name = `${doctorData.firstName || 'Prénom'} ${doctorData.lastName || 'Nom'}`;
        if (doctorData.isMilitary && doctorData.militaryRank) return `${doctorData.militaryRank} ${doctorData.lastName || 'Nom'}`;
        return `Dr. ${name}`;
    };

    const isSpecialist = doctorData.specialty !== 'Généraliste';

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto py-12 px-4 text-center animate-fade-in-up">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Demande d'inscription reçue !</h1>
                    <p className="text-gray-600 mb-6 text-lg">
                        Merci. Le dossier de <strong>
                            {profileType === 'doctor' ? getDoctorDisplayName() : 
                             profileType === 'pharmacy' ? pharmacyData.name : 
                             structureData.name}
                        </strong> a bien été enregistré.
                    </p>
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-8 text-left text-sm">
                        <p className="font-bold mb-2">Prochaines étapes :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Vérification administrative (Licence / Diplômes / Agrément).</li>
                            <li>Validation par nos services sous 48h.</li>
                            <li>Signature de la convention partenaire.</li>
                            <li>Activation de votre visibilité sur AlloSanté Gabon.</li>
                        </ul>
                    </div>
                    <Link to="/" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8 space-y-8 px-4">
             {/* Header Image Banner */}
             <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-lg mb-6">
                <img src="https://images.unsplash.com/photo-1576091160550-2187d80a02ff?auto=format&fit=crop&q=80&w=1200" alt="Pro Registration" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white z-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">Espace Pro & Partenaires</h1>
                    <p className="text-gray-200 text-sm md:text-lg max-w-2xl drop-shadow-md">
                        Rejoignez le 1er réseau de santé digital du Gabon. Médecins, Pharmacies, Cliniques.
                    </p>
                </div>
            </div>

             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center">
                    <Link to="/" className="mr-4 p-2 bg-white rounded-full shadow hover:bg-gray-50 text-gray-600">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Formulaire d'inscription</h2>
                    </div>
                </div>
                
                {/* Login Quick Links */}
                <div className="flex gap-2">
                    <Link to="/doctor-dashboard" className="flex items-center bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg font-bold hover:bg-blue-50 shadow-sm text-sm">
                        <LogIn className="w-4 h-4 mr-2" /> Connexion Médecin
                    </Link>
                    <Link to="/pharmacy-dashboard" className="flex items-center bg-white border border-green-200 text-green-700 px-4 py-2 rounded-lg font-bold hover:bg-green-50 shadow-sm text-sm">
                        <LogIn className="w-4 h-4 mr-2" /> Connexion Pharmacie
                    </Link>
                </div>
            </div>

            {/* Profile Type Selector */}
            <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-2 justify-center md:justify-start">
                <button 
                    onClick={() => setProfileType('doctor')}
                    className={`px-6 py-3 rounded-lg font-bold text-sm transition flex items-center ${profileType === 'doctor' ? 'bg-primary text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                    <User className="w-4 h-4 mr-2" /> Médecin
                </button>
                <button 
                    onClick={() => setProfileType('pharmacy')}
                    className={`px-6 py-3 rounded-lg font-bold text-sm transition flex items-center ${profileType === 'pharmacy' ? 'bg-primary text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                    <Store className="w-4 h-4 mr-2" /> Pharmacie
                </button>
                <button 
                    onClick={() => setProfileType('structure')}
                    className={`px-6 py-3 rounded-lg font-bold text-sm transition flex items-center ${profileType === 'structure' ? 'bg-primary text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                    <Building2 className="w-4 h-4 mr-2" /> Structure de Santé
                </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* --- FORM SECTION --- */}
                <div className="lg:col-span-8 bg-white rounded-xl shadow-lg p-6 md:p-8">
                    
                    {profileType === 'doctor' && (
                        // ================= DOCTOR FORM =================
                        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
                            <h2 className="text-xl font-bold text-secondary mb-6 flex items-center border-b pb-2">
                                <User className="w-5 h-5 mr-2" /> Informations Personnelles
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                    <input type="text" name="firstName" required value={doctorData.firstName} onChange={handleDoctorChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-secondary outline-none" placeholder="Jean" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                    <input type="text" name="lastName" required value={doctorData.lastName} onChange={handleDoctorChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-secondary outline-none" placeholder="Mba" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" name="email" required value={doctorData.email} onChange={handleDoctorChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-secondary outline-none" placeholder="medecin@exemple.ga" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                    <input type="tel" name="phone" required value={doctorData.phone} onChange={handleDoctorChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-secondary outline-none" placeholder="074 00 00 00" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro d'Ordre des Médecins (CNOM)</label>
                                    <div className="relative">
                                        <Hash className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input type="text" name="orderNumber" required value={doctorData.orderNumber} onChange={handleDoctorChange} className="w-full pl-10 border p-3 rounded-lg focus:ring-2 focus:ring-secondary outline-none" placeholder="Ex: 1234/CNOM/2024" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Obligatoire pour la validation du compte.</p>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-secondary mt-8 mb-6 flex items-center border-b pb-2">
                                <Briefcase className="w-5 h-5 mr-2" /> Profil & Statut
                            </h2>

                            <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" name="isMilitary" checked={doctorData.isMilitary} onChange={handleDoctorCheckbox} className="w-5 h-5 text-secondary rounded focus:ring-secondary" />
                                    <span className="text-gray-800 font-bold flex items-center"><Shield className="w-4 h-4 mr-2" /> Je suis Médecin Militaire</span>
                                </label>
                                {doctorData.isMilitary && (
                                    <div className="mt-3">
                                        <select name="militaryRank" required={doctorData.isMilitary} value={doctorData.militaryRank} onChange={handleDoctorChange} className="w-full border p-3 rounded-lg bg-white">
                                            <option value="">Sélectionner votre grade...</option>
                                            {militaryRanks.map(rank => <option key={rank} value={rank}>{rank}</option>)}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Spécialité</label>
                                    <select name="specialty" value={doctorData.specialty} onChange={handleDoctorChange} className="w-full border p-3 rounded-lg bg-white">
                                        {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Années d'expérience</label>
                                    <input type="number" name="experience" min="0" required value={doctorData.experience} onChange={handleDoctorChange} className="w-full border p-3 rounded-lg" placeholder="Ex: 10" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lieu d'exercice</label>
                                    <input type="text" name="hospital" required value={doctorData.hospital} onChange={handleDoctorChange} className="w-full border p-3 rounded-lg" placeholder="CHUL, Cabinet Privé..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tarif Consultation (FCFA)</label>
                                    <input type="number" name="price" required value={doctorData.price} onChange={handleDoctorChange} className="w-full border p-3 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                                    <input type="text" name="city" required value={doctorData.city} onChange={handleDoctorChange} className="w-full border p-3 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                                    <select name="province" value={doctorData.province} onChange={handleDoctorChange} className="w-full border p-3 rounded-lg bg-white">
                                        {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-secondary mt-8 mb-6 flex items-center border-b pb-2">
                                <Calendar className="w-5 h-5 mr-2" /> Planning & Consultation
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type de consultation</label>
                                    <select name="consultationType" value={doctorData.consultationType} onChange={handleDoctorChange} className="w-full border p-3 rounded-lg bg-white">
                                        <option value="both">Physique & Vidéo</option>
                                        <option value="physical">Physique uniquement</option>
                                        <option value="video">Vidéo uniquement</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Plage horaire habituelle</label>
                                    <input type="text" name="availability" value={doctorData.availability} onChange={handleDoctorChange} className="w-full border p-3 rounded-lg" placeholder="Ex: 09:00 - 17:00" />
                                </div>
                            </div>


                            <h2 className="text-xl font-bold text-secondary mt-8 mb-6 flex items-center border-b pb-2">
                                <FileText className="w-5 h-5 mr-2" /> Documents & Diplômes
                            </h2>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                                    {doctorPhotoPreview ? <img src={doctorPhotoPreview} alt="Preview" className="w-full h-full object-cover" /> : <User className="w-8 h-8 text-gray-400" />}
                                </div>
                                <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium">
                                    Choisir une photo <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} required />
                                </label>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="border border-gray-200 rounded-lg p-3 flex items-center relative hover:bg-gray-50">
                                    <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
                                    <div className="flex-1">
                                        <p className="font-bold text-sm">Carte Nationale d'Identité / Passeport <span className="text-red-500">*</span></p>
                                        <p className="text-xs text-gray-500">{doctorDocs.cni || "Joindre le fichier"}</p>
                                    </div>
                                    <Upload className="w-5 h-5 text-gray-400" />
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleDocUpload('cni')} required />
                                </div>
                                <div className="border border-gray-200 rounded-lg p-3 flex items-center relative hover:bg-gray-50">
                                    <Scroll className="w-6 h-6 text-green-600 mr-3" />
                                    <div className="flex-1">
                                        <p className="font-bold text-sm">Doctorat en Médecine <span className="text-red-500">*</span></p>
                                        <p className="text-xs text-gray-500">{doctorDocs.doctorat || "Joindre le fichier"}</p>
                                    </div>
                                    <Upload className="w-5 h-5 text-gray-400" />
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleDocUpload('doctorat')} required />
                                </div>
                                <div className="border border-gray-200 rounded-lg p-3 flex items-center relative hover:bg-gray-50">
                                    <Shield className="w-6 h-6 text-orange-600 mr-3" />
                                    <div className="flex-1">
                                        <p className="font-bold text-sm">Carte de l'Ordre des Médecins <span className="text-red-500">*</span></p>
                                        <p className="text-xs text-gray-500">{doctorDocs.orderCert || "Joindre le fichier"}</p>
                                    </div>
                                    <Upload className="w-5 h-5 text-gray-400" />
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleDocUpload('orderCert')} required />
                                </div>
                                <div className={`border rounded-lg p-3 flex items-center relative hover:bg-gray-50 ${isSpecialist ? 'border-purple-200 bg-purple-50' : 'border-gray-200'}`}>
                                    <Award className="w-6 h-6 text-purple-600 mr-3" />
                                    <div className="flex-1">
                                        <p className="font-bold text-sm">Diplôme de Spécialité {isSpecialist ? <span className="text-red-500">*</span> : <span className="text-gray-400 font-normal">(Optionnel)</span>}</p>
                                        <p className="text-xs text-gray-500">{doctorDocs.specialty || "Joindre le fichier"}</p>
                                    </div>
                                    <Upload className="w-5 h-5 text-gray-400" />
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleDocUpload('specialty')} required={isSpecialist} />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg text-lg mt-8">
                                Soumettre ma candidature (Médecin)
                            </button>
                        </form>
                    )}

                    {profileType === 'pharmacy' && (
                        // ================= PHARMACY FORM =================
                        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
                            <h2 className="text-xl font-bold text-primary mb-6 flex items-center border-b pb-2">
                                <Store className="w-5 h-5 mr-2" /> Identité de la Pharmacie
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la Pharmacie</label>
                                    <input type="text" name="name" required value={pharmacyData.name} onChange={handlePharmacyChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Pharmacie Centrale" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de Licence / Agrément</label>
                                    <input type="text" name="license" required value={pharmacyData.license} onChange={handlePharmacyChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="12345-GAB" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Pharmacien Responsable</label>
                                    <input type="text" name="manager" required value={pharmacyData.manager} onChange={handlePharmacyChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Dr. Mbadinga" />
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-primary mt-8 mb-6 flex items-center border-b pb-2">
                                <MapPin className="w-5 h-5 mr-2" /> Contact & Localisation
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Physique (Quartier)</label>
                                    <input type="text" name="address" required value={pharmacyData.address} onChange={handlePharmacyChange} className="w-full border p-3 rounded-lg" placeholder="Av. de la Liberté, Centre Ville" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                                    <input type="text" name="city" required value={pharmacyData.city} onChange={handlePharmacyChange} className="w-full border p-3 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                                    <select name="province" value={pharmacyData.province} onChange={handlePharmacyChange} className="w-full border p-3 rounded-lg bg-white">
                                        {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone 1</label>
                                    <input type="tel" name="phone1" required value={pharmacyData.phone1} onChange={handlePharmacyChange} className="w-full border p-3 rounded-lg" placeholder="011 00 00 00" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone 2 (Optionnel)</label>
                                    <input type="tel" name="phone2" value={pharmacyData.phone2} onChange={handlePharmacyChange} className="w-full border p-3 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Officiel</label>
                                    <input type="email" name="email" required value={pharmacyData.email} onChange={handlePharmacyChange} className="w-full border p-3 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Web (Optionnel)</label>
                                    <input type="url" name="website" value={pharmacyData.website} onChange={handlePharmacyChange} className="w-full border p-3 rounded-lg" placeholder="www.mapharmacie.ga" />
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-primary mt-8 mb-6 flex items-center border-b pb-2">
                                <Clock className="w-5 h-5 mr-2" /> Infos Pratiques
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Horaires d'ouverture</label>
                                    <input type="text" name="hours" value={pharmacyData.hours} onChange={handlePharmacyChange} className="w-full border p-3 rounded-lg" />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Services proposés</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {pharmacyServicesList.map(service => (
                                            <label key={service} className="flex items-center space-x-2 bg-gray-50 p-2 rounded cursor-pointer hover:bg-gray-100">
                                                <input 
                                                    type="checkbox" 
                                                    checked={pharmacyData.services.includes(service)}
                                                    onChange={() => togglePharmacyOption('services', service)}
                                                    className="w-4 h-4 text-primary rounded" 
                                                />
                                                <span className="text-sm text-gray-700">{service}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Moyens de paiement acceptés</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {paymentMethodsList.map(method => (
                                            <label key={method} className="flex items-center space-x-2 bg-gray-50 p-2 rounded cursor-pointer hover:bg-gray-100">
                                                <input 
                                                    type="checkbox" 
                                                    checked={pharmacyData.paymentMethods.includes(method)}
                                                    onChange={() => togglePharmacyOption('paymentMethods', method)}
                                                    className="w-4 h-4 text-primary rounded" 
                                                />
                                                <span className="text-sm text-gray-700">{method}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* --- INVENTORY MANAGEMENT SECTION --- */}
                            <div className="mt-8 bg-green-50 p-6 rounded-xl border border-green-200">
                                <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
                                    <Database className="w-5 h-5 mr-2" /> Stock & Médicaments
                                </h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    Comment souhaitez-vous gérer votre inventaire de médicaments sur la plateforme ?
                                </p>

                                {/* Inventory Tabs */}
                                <div className="flex border-b border-green-200 mb-4">
                                    <button type="button" onClick={() => setInventoryMethod('manual')} className={`px-4 py-2 font-medium text-sm border-b-2 transition ${inventoryMethod === 'manual' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}>
                                        <Pill className="w-4 h-4 inline-block mr-1"/> Saisie Manuelle
                                    </button>
                                    <button type="button" onClick={() => setInventoryMethod('csv')} className={`px-4 py-2 font-medium text-sm border-b-2 transition ${inventoryMethod === 'csv' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}>
                                        <FileSpreadsheet className="w-4 h-4 inline-block mr-1"/> Import Excel/CSV
                                    </button>
                                    <button type="button" onClick={() => setInventoryMethod('api')} className={`px-4 py-2 font-medium text-sm border-b-2 transition ${inventoryMethod === 'api' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}>
                                        <Server className="w-4 h-4 inline-block mr-1"/> Connexion API
                                    </button>
                                </div>

                                {/* Manual Mode */}
                                {inventoryMethod === 'manual' && (
                                    <div className="space-y-4 animate-fade-in-up">
                                        <p className="text-xs text-gray-500">Ajoutez vos médicaments un par un (Recommandé pour les petits stocks).</p>
                                        <div className="grid grid-cols-6 gap-2">
                                            <input type="text" placeholder="Nom commercial" value={newDrug.name} onChange={e => setNewDrug({...newDrug, name: e.target.value})} className="col-span-2 p-2 border rounded text-sm" />
                                            <input type="text" placeholder="DCI (Molécule)" value={newDrug.dci} onChange={e => setNewDrug({...newDrug, dci: e.target.value})} className="col-span-1 p-2 border rounded text-sm" />
                                            <input type="text" placeholder="Dosage" value={newDrug.dosage} onChange={e => setNewDrug({...newDrug, dosage: e.target.value})} className="col-span-1 p-2 border rounded text-sm" />
                                            <input type="number" placeholder="Prix" value={newDrug.price} onChange={e => setNewDrug({...newDrug, price: e.target.value})} className="col-span-1 p-2 border rounded text-sm" />
                                            <button type="button" onClick={handleAddDrug} className="col-span-1 bg-primary text-white rounded flex items-center justify-center hover:bg-green-700"><Plus className="w-4 h-4" /></button>
                                        </div>
                                        {/* Simple List */}
                                        <div className="max-h-40 overflow-y-auto bg-white rounded border border-gray-200">
                                            {manualDrugs.length === 0 ? <div className="p-4 text-center text-xs text-gray-400">Aucun médicament ajouté</div> : (
                                                <table className="w-full text-xs text-left">
                                                    <thead className="bg-gray-100 text-gray-600 font-bold">
                                                        <tr><th className="p-2">Nom</th><th className="p-2">DCI</th><th className="p-2">Prix</th><th className="p-2">Action</th></tr>
                                                    </thead>
                                                    <tbody>
                                                        {manualDrugs.map((d, i) => (
                                                            <tr key={i} className="border-t">
                                                                <td className="p-2">{d.name} {d.dosage}</td>
                                                                <td className="p-2">{d.dci}</td>
                                                                <td className="p-2">{d.price} FCFA</td>
                                                                <td className="p-2"><button type="button" onClick={() => handleRemoveDrug(i)} className="text-red-500"><Trash2 className="w-3 h-3"/></button></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* CSV Mode */}
                                {inventoryMethod === 'csv' && (
                                    <div className="space-y-4 animate-fade-in-up text-center">
                                        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-white">
                                            <FileSpreadsheet className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600 font-medium">Glissez votre fichier Excel ou CSV ici</p>
                                            <p className="text-xs text-gray-400 mb-4">Colonnes requises: Nom, DCI, Dosage, Forme, Prix, Stock</p>
                                            <button type="button" className="text-primary text-sm font-bold hover:underline">Télécharger le modèle (.xlsx)</button>
                                            <input type="file" className="hidden" />
                                        </div>
                                    </div>
                                )}

                                {/* API Mode */}
                                {inventoryMethod === 'api' && (
                                    <div className="space-y-4 animate-fade-in-up">
                                        <p className="text-xs text-gray-500">Connectez votre logiciel de gestion (SmartPharmacy, etc.) pour une synchro temps réel.</p>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">URL du Flux (Endpoint)</label>
                                            <input type="url" placeholder="https://api.mapharmacie.com/v1/stock" className="w-full border p-2 rounded bg-white text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Clé API / Token</label>
                                            <input type="password" placeholder="sk_live_..." className="w-full border p-2 rounded bg-white text-sm" />
                                        </div>
                                        <button type="button" className="text-xs bg-gray-800 text-white px-3 py-1 rounded">Tester la connexion</button>
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-green-700 transition shadow-lg text-lg mt-8">
                                Enregistrer ma Pharmacie
                            </button>
                        </form>
                    )}

                    {profileType === 'structure' && (
                        // ================= STRUCTURE FORM (NEW) =================
                        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
                            <h2 className="text-xl font-bold text-indigo-900 mb-6 flex items-center border-b pb-2">
                                <Building2 className="w-5 h-5 mr-2" /> Identité de la Structure
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'établissement</label>
                                    <input type="text" name="name" required value={structureData.name} onChange={handleStructureChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: Clinique des Anges" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type de structure</label>
                                    <select name="type" value={structureData.type} onChange={handleStructureChange} className="w-full border p-3 rounded-lg bg-white">
                                        {structureTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Directeur / Responsable</label>
                                    <input type="text" name="director" required value={structureData.director} onChange={handleStructureChange} className="w-full border p-3 rounded-lg" placeholder="Dr. Directeur" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacité (Lits)</label>
                                    <input type="number" name="capacity" value={structureData.capacity} onChange={handleStructureChange} className="w-full border p-3 rounded-lg" placeholder="Ex: 50" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                                    <input type="text" name="address" required value={structureData.address} onChange={handleStructureChange} className="w-full border p-3 rounded-lg" placeholder="Quartier, Rue..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                                    <input type="text" name="city" required value={structureData.city} onChange={handleStructureChange} className="w-full border p-3 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                                    <select name="province" value={structureData.province} onChange={handleStructureChange} className="w-full border p-3 rounded-lg bg-white">
                                        {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                    <input type="tel" name="phone" required value={structureData.phone} onChange={handleStructureChange} className="w-full border p-3 rounded-lg" placeholder="011 00 00 00" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" name="email" required value={structureData.email} onChange={handleStructureChange} className="w-full border p-3 rounded-lg" />
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-indigo-900 mt-8 mb-6 flex items-center border-b pb-2">
                                <Stethoscope className="w-5 h-5 mr-2" /> Services & Spécialités
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-4">
                                    <label className="flex items-center space-x-2 bg-red-50 p-3 rounded-lg border border-red-100 cursor-pointer">
                                        <input type="checkbox" name="hasEmergency" checked={structureData.hasEmergency} onChange={handleStructureCheckbox} className="w-5 h-5 text-red-600 rounded" />
                                        <span className="font-bold text-red-800 flex items-center"><Siren className="w-4 h-4 mr-2"/> Service d'Urgences 24/7</span>
                                    </label>
                                    <label className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg border border-blue-100 cursor-pointer">
                                        <input type="checkbox" name="hasAmbulance" checked={structureData.hasAmbulance} onChange={handleStructureCheckbox} className="w-5 h-5 text-blue-600 rounded" />
                                        <span className="font-bold text-blue-800 flex items-center"><Truck className="w-4 h-4 mr-2"/> Service Ambulance</span>
                                    </label>
                                    <label className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg border border-green-100 cursor-pointer">
                                        <input type="checkbox" name="acceptsCnamgs" checked={structureData.acceptsCnamgs} onChange={handleStructureCheckbox} className="w-5 h-5 text-green-600 rounded" />
                                        <span className="font-bold text-green-800 flex items-center"><CreditCard className="w-4 h-4 mr-2"/> Accepte CNAMGS</span>
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Spécialités couvertes</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {structureSpecialties.map(spec => (
                                            <label key={spec} className="flex items-center space-x-2 bg-gray-50 p-2 rounded cursor-pointer hover:bg-gray-100">
                                                <input 
                                                    type="checkbox" 
                                                    checked={structureData.specialties.includes(spec)}
                                                    onChange={() => toggleStructureSpecialty(spec)}
                                                    className="w-4 h-4 text-indigo-600 rounded" 
                                                />
                                                <span className="text-sm text-gray-700">{spec}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                             <h2 className="text-xl font-bold text-indigo-900 mt-8 mb-6 flex items-center border-b pb-2">
                                <Upload className="w-5 h-5 mr-2" /> Image de présentation
                            </h2>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-32 h-20 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                                    {structureImagePreview ? <img src={structureImagePreview} alt="Preview" className="w-full h-full object-cover" /> : <Building2 className="w-8 h-8 text-gray-400" />}
                                </div>
                                <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium">
                                    Ajouter une photo (Façade, Logo) <input type="file" accept="image/*" className="hidden" onChange={handleStructureImageUpload} />
                                </label>
                            </div>

                            <button type="submit" className="w-full bg-indigo-900 text-white font-bold py-4 rounded-xl hover:bg-indigo-800 transition shadow-lg text-lg mt-8">
                                Enregistrer ma Structure
                            </button>
                        </form>
                    )}

                </div>
                
                {/* --- SIDEBAR INFO --- */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-blue-900 text-lg mb-3">Pourquoi rejoindre AlloSanté ?</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm text-blue-800">Visibilité accrue auprès des patients gabonais.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm text-blue-800">Gestion simplifiée des rendez-vous et téléconsultations.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm text-blue-800">Référencement des stocks pour les pharmacies.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm text-blue-800">Accès au dossier médical partagé (sécurisé).</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Besoin d'aide ?</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Notre équipe support est disponible pour vous accompagner dans votre inscription.
                        </p>
                        <div className="flex items-center text-primary font-bold mb-2">
                            <Smartphone className="w-5 h-5 mr-2" /> 077 61 98 43
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                            <Globe className="w-5 h-5 mr-2" /> support@allosante.ga
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorRegistration;