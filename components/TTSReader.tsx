import React, { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { generateSpeech, playAudioBuffer } from '../services/geminiService';

const TTSReader: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSpeak = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const buffer = await generateSpeech(text);
      playAudioBuffer(buffer);
    } catch (e) {
      alert("Erreur lors de la synthèse vocale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4 text-primary">
            <Volume2 className="h-6 w-6 mr-2" />
            <h3 className="text-xl font-bold">Lecture Vocale (TTS)</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">Utilisez l'IA pour lire des ordonnances ou des conseils médicaux.</p>

        <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Entrez le texte à lire ici..."
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-primary focus:border-transparent h-32"
        />

        <button
            onClick={handleSpeak}
            disabled={loading || !text}
            className="w-full bg-gabontricolor-green text-white font-bold py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center disabled:opacity-50"
        >
            {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Volume2 className="h-5 w-5 mr-2" />}
            {loading ? 'Génération audio...' : 'Lire le texte'}
        </button>
    </div>
  );
};

export default TTSReader;