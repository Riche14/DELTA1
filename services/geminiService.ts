
import { GoogleGenAI, Modality } from "@google/genai";
import { ImageResolution } from "../types";

// L'API Key est récupérée exclusivement via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Chat avec Gemini 3 Pro Preview pour l'assistance et les Fake News
 */
export const chatWithGemini = async (message: string, history: any[] = [], mode: string = 'general') => {
  try {
    let systemInstruction = "Tu es un assistant médical virtuel pour 'AlloSanté Gabon'. Tu es poli, professionnel et tu réponds en français. Rappelle toujours qu'en cas d'urgence, il faut appeler le 1300.";

    if (mode === 'symptoms') {
        systemInstruction = "Tu es un assistant de triage. Analyse les symptômes. 1. Liste causes probables. 2. Niveau d'urgence. 3. Pas un diagnostic final.";
    } else if (mode === 'fakenews') {
        systemInstruction = "Tu es un expert anti-infodémie du Ministère de la Santé du Gabon. Détermine si l'info est VRAIE, FAUSSE ou TROMPEUSE. Donne une explication scientifique courte et une recommandation officielle.";
    } else if (mode === 'coach') {
        systemInstruction = "Tu es un coach santé expert du Gabon. Utilise des exemples locaux (manioc, oseille, sport en bord de mer) pour tes conseils.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "Désolé, je ne peux pas traiter votre demande pour le moment.";
  }
};

/**
 * Analyse de Radio/X-Ray avec Gemini 2.5 Flash
 */
export const analyzeMedicalImage = async (base64Image: string, availableResources: string) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { mimeType: 'image/png', data: base64Image } },
                    {
                        text: `Analyse cette image médicale (Radio/Scanner). 
                        1. Description technique. 
                        2. Identification prudente d'anomalies. 
                        3. Orientation parmi ces partenaires gabonais : ${availableResources}. 
                        Termine par : 'Ceci est une analyse IA préliminaire, consultez un médecin'.`
                    }
                ]
            }
        });
        return response.text;
    } catch (error) {
        console.error("Vision Error:", error);
        return "Erreur d'analyse de l'image.";
    }
};

/**
 * Génération d'illustrations médicales
 */
export const generateHealthImage = async (prompt: string, size: ImageResolution) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: { aspectRatio: "16:9", imageSize: size }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("Pas d'image générée.");
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

/**
 * Synthèse vocale pour accessibilité
 */
export const generateSpeech = async (text: string): Promise<AudioBuffer> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("Audio indisponible");

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  const binaryString = atob(base64Audio);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  
  const dataInt16 = new Int16Array(bytes.buffer);
  const buffer = audioContext.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
  
  return buffer;
};

export const playAudioBuffer = (buffer: AudioBuffer) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
};
