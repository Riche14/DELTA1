import React, { useState } from 'react';
import { Image, Loader2, Download } from 'lucide-react';
import { generateHealthImage } from '../services/geminiService';
import { ImageResolution } from '../types';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [resolution, setResolution] = useState<ImageResolution>('1K');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const url = await generateHealthImage(prompt, resolution);
      setImageUrl(url);
    } catch (e) {
      setError("Échec de la génération de l'image. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4 text-primary">
            <Image className="h-6 w-6 mr-2" />
            <h3 className="text-xl font-bold">Générateur d'Illustrations (Nano Banana Pro)</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">Créez des schémas ou illustrations pour vos présentations médicales.</p>

        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ex: Un schéma du cœur humain, style pédagogique..."
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={3}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Résolution</label>
                <select 
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value as ImageResolution)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                >
                    <option value="1K">1K (Standard)</option>
                    <option value="2K">2K (Haute Qualité)</option>
                    <option value="4K">4K (Ultra HD)</option>
                </select>
            </div>

            <button
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className="w-full bg-gabontricolor-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-50"
            >
                {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <SparklesIcon />}
                {loading ? 'Génération en cours...' : 'Générer l\'image'}
            </button>

            {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

            {imageUrl && (
                <div className="mt-6 border rounded-lg p-2 bg-gray-50">
                    <img src={imageUrl} alt="Generated" className="w-full h-auto rounded shadow-sm" />
                    <a 
                        href={imageUrl} 
                        download="sante-image.png"
                        className="mt-2 flex items-center justify-center text-sm text-primary hover:text-secondary font-medium"
                    >
                        <Download className="h-4 w-4 mr-1" /> Télécharger
                    </a>
                </div>
            )}
        </div>
    </div>
  );
};

const SparklesIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

export default ImageGenerator;