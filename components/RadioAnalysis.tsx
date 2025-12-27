
import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, FileText, AlertTriangle, ArrowRight, Activity } from 'lucide-react';
import { analyzeMedicalImage } from '../services/geminiService';
import { Link } from 'react-router-dom';
import { MOCK_DOCTORS, HEALTH_PARTNERS } from '../constants';

const RadioAnalysis: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImage(base64String);
                setAnalysis(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;
        setLoading(true);
        try {
            // Remove data url prefix for API if necessary
            const base64Data = image.split(',')[1]; 
            
            // Format resources context for AI
            const doctorsList = MOCK_DOCTORS.map(d => `- Dr. ${d.name} (${d.specialty}) à ${d.location} (${d.province})`).join('\n');
            const partnersList = HEALTH_PARTNERS.map(h => `- ${h.name} (${h.type}, Spécialités: ${h.specialties.join(', ')}) à ${h.location} (${h.province})`).join('\n');
            
            const resourcesContext = `LISTE DES MÉDECINS:\n${doctorsList}\n\nLISTE DES STRUCTURES:\n${partnersList}`;

            const result = await analyzeMedicalImage(base64Data, resourcesContext);
            setAnalysis(result);
        } catch (error) {
            setAnalysis("Erreur lors de l'analyse. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    const handleRetake = () => {
        setImage(null);
        setAnalysis(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-xl bg-indigo-900">
                <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=1200" alt="Radio Analysis" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                        <Activity className="w-8 h-8 mr-3 text-cyan-400" />
                        Assistant Radio IA
                    </h1>
                    <p className="text-indigo-100 max-w-2xl text-base md:text-lg">
                        Utilisez notre intelligence artificielle pour obtenir une pré-interprétation instantanée de vos radiographies et être orienté avec précision vers le bon spécialiste partenaire.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 text-lg">1. Chargez votre radio</h3>
                    
                    {!image ? (
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                        >
                            <Camera className="w-12 h-12 text-gray-400 mb-2" />
                            <p className="text-gray-600 font-medium">Prendre une photo ou importer</p>
                            <p className="text-xs text-gray-400 mt-1">Formats supportés: JPG, PNG</p>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                            />
                        </div>
                    ) : (
                        <div className="relative rounded-xl overflow-hidden h-64 bg-black">
                            <img src={image} alt="Radio Uploaded" className="w-full h-full object-contain" />
                            {!loading && (
                                <button 
                                    onClick={handleRetake}
                                    className="absolute top-2 right-2 bg-white/80 p-2 rounded-full text-gray-800 hover:bg-white"
                                >
                                    Refaire
                                </button>
                            )}
                        </div>
                    )}

                    <div className="mt-6">
                        <button 
                            onClick={handleAnalyze} 
                            disabled={!image || loading}
                            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                                    Analyse en cours...
                                </>
                            ) : (
                                <>
                                    <Activity className="w-5 h-5 mr-2" />
                                    Lancer l'analyse IA
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Result Section */}
                <div className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 ${!analysis && 'opacity-50'}`}>
                    <h3 className="font-bold text-gray-800 mb-4 text-lg">2. Interprétation & Orientation</h3>
                    
                    {analysis ? (
                        <div className="space-y-4 animate-fade-in-up">
                            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                                {analysis}
                            </div>
                            
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex items-start">
                                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-yellow-800 font-medium">
                                    Attention : Cette analyse est générée par une IA expérimentale. Elle ne remplace pas l'avis d'un radiologue certifié.
                                </p>
                            </div>

                            <Link to="/partners" className="block w-full text-center bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">
                                Trouver une structure adaptée
                            </Link>
                             <Link to="/teleconsult" className="block w-full text-center bg-white border border-indigo-200 text-indigo-700 font-bold py-3 rounded-lg hover:bg-indigo-50 transition">
                                Montrer à un médecin en ligne
                            </Link>
                        </div>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-center p-8 border border-gray-100 rounded-xl bg-gray-50">
                            <FileText className="w-12 h-12 text-gray-300 mb-3" />
                            <p className="text-gray-500">Les résultats de l'analyse apparaîtront ici avec des recommandations de spécialistes.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RadioAnalysis;