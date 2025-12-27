
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Activity, Pill, Baby, Dumbbell, Stethoscope } from 'lucide-react';
import { chatWithGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bonjour ! Je suis l\'assistant AlloSanté. Choisissez un mode ci-dessous ou posez-moi une question générale.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'general' | 'symptoms' | 'interactions' | 'pregnancy' | 'coach'>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await chatWithGemini(userMsg.text, history, mode);
      
      const aiMsg: ChatMessage = { 
        role: 'model', 
        text: responseText || "Désolé, je n'ai pas pu générer de réponse.", 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Une erreur est survenue lors de la communication avec l'assistant.", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const changeMode = (newMode: typeof mode) => {
      setMode(newMode);
      let welcomeText = "";
      switch(newMode) {
          case 'symptoms': welcomeText = "Mode Analyse de Symptômes activé. Décrivez ce que vous ressentez."; break;
          case 'interactions': welcomeText = "Mode Interactions Médicamenteuses. Listez les médicaments que vous prenez."; break;
          case 'pregnancy': welcomeText = "Mode Grossesse activé. Je suis là pour répondre à vos questions sur la maternité."; break;
          case 'coach': welcomeText = "Mode Coach Santé. Parlons nutrition et sport !"; break;
          default: welcomeText = "Mode Général. Comment puis-je aider ?";
      }
      setMessages(prev => [...prev, { role: 'model', text: welcomeText, timestamp: new Date() }]);
  };

  return (
    <div className="flex flex-col h-[700px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-primary p-4">
        <div className="flex items-center justify-between text-white mb-4">
            <div className="flex items-center">
                <Sparkles className="h-6 w-6 mr-2" />
                <h3 className="font-bold text-lg">Assistant Médical IA</h3>
            </div>
            <span className="text-xs bg-white/20 text-white px-2 py-1 rounded uppercase font-bold">{mode}</span>
        </div>
        
        {/* Mode Selectors */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button onClick={() => changeMode('symptoms')} className={`flex items-center text-xs px-3 py-2 rounded-full whitespace-nowrap transition ${mode === 'symptoms' ? 'bg-white text-primary font-bold shadow' : 'bg-primary-dark text-white hover:bg-white/10'}`}>
                <Stethoscope className="w-3 h-3 mr-1" /> Symptômes
            </button>
            <button onClick={() => changeMode('interactions')} className={`flex items-center text-xs px-3 py-2 rounded-full whitespace-nowrap transition ${mode === 'interactions' ? 'bg-white text-primary font-bold shadow' : 'bg-primary-dark text-white hover:bg-white/10'}`}>
                <Pill className="w-3 h-3 mr-1" /> Médicaments
            </button>
            <button onClick={() => changeMode('pregnancy')} className={`flex items-center text-xs px-3 py-2 rounded-full whitespace-nowrap transition ${mode === 'pregnancy' ? 'bg-white text-primary font-bold shadow' : 'bg-primary-dark text-white hover:bg-white/10'}`}>
                <Baby className="w-3 h-3 mr-1" /> Grossesse
            </button>
            <button onClick={() => changeMode('coach')} className={`flex items-center text-xs px-3 py-2 rounded-full whitespace-nowrap transition ${mode === 'coach' ? 'bg-white text-primary font-bold shadow' : 'bg-primary-dark text-white hover:bg-white/10'}`}>
                <Dumbbell className="w-3 h-3 mr-1" /> Coach
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-primary ml-2' : 'bg-gray-300 mr-2'}`}>
                {msg.role === 'user' ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-gray-600" />}
              </div>
              <div className={`p-3 rounded-lg text-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm markdown-prose'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg p-3 ml-10 shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-primary mr-2" />
              <span className="text-xs text-gray-500">L'IA réfléchit...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
                mode === 'symptoms' ? "Décrivez vos symptômes..." :
                mode === 'interactions' ? "Listez les médicaments..." :
                "Posez votre question..."
            }
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-primary text-white p-2 rounded-lg hover:bg-secondary disabled:opacity-50 transition"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
            IA générative expérimentale. En cas d'urgence, appelez le 1300.
        </p>
      </div>
    </div>
  );
};

export default AIChat;
