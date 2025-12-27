
import React, { useState } from 'react';
import { Activity, Ruler, Weight, Info, Heart, ChevronDown, ChevronUp, Bug, HeartPulse, Droplet, GlassWater, Shield, Syringe } from 'lucide-react';
import { PREVENTION_TOPICS } from '../constants';
import { PreventionTopic } from '../types';

const PreventionCard: React.FC<{ topic: PreventionTopic }> = ({ topic }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Icon mapping
    const icons: any = { Bug, HeartPulse, Droplet, GlassWater, Shield, Syringe };
    const Icon = icons[topic.icon] || Info;

    const colorClasses: any = {
        green: 'bg-green-100 text-green-700 border-green-200',
        red: 'bg-red-100 text-red-700 border-red-200',
        blue: 'bg-blue-100 text-blue-700 border-blue-200',
        cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        purple: 'bg-purple-100 text-purple-700 border-purple-200',
        yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };

    return (
        <div className={`border rounded-xl transition-all duration-300 overflow-hidden ${isOpen ? 'shadow-md ring-1 ring-opacity-50 ring-gray-300' : 'shadow-sm'}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 text-left"
            >
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${colorClasses[topic.color] || 'bg-gray-100'}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg">{topic.title}</h3>
                        <p className="text-sm text-gray-500 md:hidden">{topic.summary.substring(0, 40)}...</p>
                        <p className="text-sm text-gray-500 hidden md:block">{topic.summary}</p>
                    </div>
                </div>
                {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </button>
            
            {isOpen && (
                <div className="p-4 bg-gray-50 border-t border-gray-100 animate-fade-in-up">
                    <ul className="space-y-2">
                        {topic.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start text-gray-700 text-sm">
                                <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                                {detail}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <button className="text-sm text-primary font-bold hover:underline">
                            En savoir plus sur le site du Ministère &rarr;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const PreventionTools: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm to m
    if (w > 0 && h > 0) {
      const result = w / (h * h);
      setBmi(Math.round(result * 10) / 10);
    }
  };

  const getBmiStatus = (value: number) => {
    if (value < 18.5) return { text: 'Insuffisance pondérale', color: 'text-blue-500', bg: 'bg-blue-50' };
    if (value < 25) return { text: 'Poids normal', color: 'text-green-500', bg: 'bg-green-50' };
    if (value < 30) return { text: 'Surpoids', color: 'text-orange-500', bg: 'bg-orange-50' };
    return { text: 'Obésité', color: 'text-red-500', bg: 'bg-red-50' };
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
          <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200" alt="Prevention" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white z-10">
              <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">Prévention & Bien-être</h1>
              <p className="text-gray-200 text-sm md:text-lg max-w-2xl drop-shadow-md">
                  Suivez vos indicateurs de santé et consultez nos fiches maladies pour rester en bonne santé.
              </p>
          </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Tools */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Activity className="w-5 h-5 text-accent mr-2" />
                    Calculateur IMC
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg)</label>
                        <div className="relative">
                            <Weight className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input 
                                type="number" 
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                                placeholder="ex: 70"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Taille (cm)</label>
                        <div className="relative">
                            <Ruler className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input 
                                type="number" 
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                                placeholder="ex: 175"
                            />
                        </div>
                    </div>
                    <button 
                        onClick={calculateBMI}
                        className="w-full bg-accent text-gray-900 font-bold py-2 rounded-lg hover:bg-yellow-400 transition shadow-sm"
                    >
                        Calculer mon IMC
                    </button>

                    {bmi !== null && (
                        <div className={`mt-4 p-4 rounded-lg text-center animate-fade-in-up ${getBmiStatus(bmi).bg}`}>
                            <div className="text-sm text-gray-600">Votre IMC</div>
                            <div className="text-3xl font-bold text-gray-800 my-1">{bmi}</div>
                            <div className={`font-bold ${getBmiStatus(bmi).color}`}>{getBmiStatus(bmi).text}</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="font-bold text-green-800 flex items-center mb-3">
                    <Heart className="w-5 h-5 mr-2" /> Astuce Santé
                </h3>
                <p className="text-green-700 mb-2 italic">
                    "Boire 1,5L d'eau par jour permet d'éliminer les toxines et de maintenir une bonne température corporelle, surtout sous notre climat tropical."
                </p>
            </div>
        </div>

        {/* Right Column: Prevention Topics */}
        <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Guides de Santé Publique</h2>
            <div className="grid gap-4">
                {PREVENTION_TOPICS.map((topic) => (
                    <PreventionCard key={topic.id} topic={topic} />
                ))}
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mt-6">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center">
                    <Info className="w-5 h-5 mr-2"/> Note
                </h3>
                <p className="text-sm text-blue-800">
                    Ces informations sont fournies à titre préventif conformément aux directives du Ministère de la Santé Publique du Gabon. En cas de symptômes, consultez un médecin.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PreventionTools;