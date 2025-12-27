
import React, { useState } from 'react';
import { Video, Calendar as CalendarIcon, Star, MapPin, Filter, X, Clock, CheckCircle, PhoneOff, Mic, MicOff, Video as VideoIcon, VideoOff, Smartphone, CreditCard, Lock, Loader2, ShieldCheck, ChevronDown, ChevronLeft, ChevronRight, UserPlus, Trophy, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_DOCTORS, PROVINCES } from '../constants';
import { Doctor } from '../types';

const BookingModal: React.FC<{ doctor: Doctor; onClose: () => void; onNext: (d: Date, t: string) => void }> = ({ doctor, onClose, onNext }) => {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const isDateAvailable = (day: number) => {
        const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return checkDate >= new Date() && (day % 2 !== 0);
    };

    const handleNextStep = () => {
        if (selectedDate && selectedTime) onNext(selectedDate, selectedTime);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
                <div className="bg-secondary p-4 flex justify-between items-center text-white">
                    <h3 className="font-bold text-lg">RDV avec Dr. {doctor.name}</h3>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </div>
                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Choisir une date</label>
                            <div className="border rounded p-2 grid grid-cols-7 gap-1 text-center text-xs">
                                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].map(day => (
                                    <button 
                                        key={day} 
                                        onClick={()=>setSelectedDate(new Date(2025, 4, day))}
                                        className={`p-1 rounded ${selectedDate?.getDate() === day ? 'bg-primary text-white' : isDateAvailable(day) ? 'bg-green-50 text-green-700' : 'text-gray-300'}`}
                                        disabled={!isDateAvailable(day)}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Choisir une heure</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['09:00', '10:30', '14:00', '16:30'].map(t => (
                                    <button 
                                        key={t} 
                                        onClick={()=>setSelectedTime(t)}
                                        className={`p-2 border rounded text-xs font-bold ${selectedTime === t ? 'bg-primary text-white border-primary' : 'hover:bg-gray-50'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={handleNextStep}
                        disabled={!selectedDate || !selectedTime}
                        className="w-full bg-secondary text-white font-bold py-3 rounded-lg mt-6 hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        Continuer vers le paiement
                    </button>
                </div>
            </div>
        </div>
    );
};

const PaymentModal: React.FC<{ doctor: Doctor; onClose: () => void; onSuccess: () => void }> = ({ doctor, onClose, onSuccess }) => {
    const [method, setMethod] = useState<'airtel' | 'moov' | null>(null);
    const [processing, setProcessing] = useState(false);
    const handlePayment = () => {
        setProcessing(true);
        setTimeout(() => { setProcessing(false); onSuccess(); }, 2000);
    };
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                <div className="bg-gray-900 p-4 text-white flex justify-between items-center">
                    <h3 className="font-bold">Paiement Mobile</h3>
                    <button onClick={onClose}><X /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex justify-between border-b pb-4">
                        <span className="text-gray-500">Consultation</span>
                        <span className="font-bold">{doctor.price.toLocaleString()} FCFA</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={()=>setMethod('airtel')} className={`p-4 border-2 rounded-xl flex flex-col items-center ${method === 'airtel' ? 'border-red-500 bg-red-50' : ''}`}>
                            <div className="w-8 h-8 rounded bg-red-600 text-white font-bold mb-2">A</div>
                            <span className="text-xs font-bold">Airtel Money</span>
                        </button>
                        <button onClick={()=>setMethod('moov')} className={`p-4 border-2 rounded-xl flex flex-col items-center ${method === 'moov' ? 'border-blue-500 bg-blue-50' : ''}`}>
                             <div className="w-8 h-8 rounded bg-blue-500 text-white font-bold mb-2">M</div>
                            <span className="text-xs font-bold">Moov Money</span>
                        </button>
                    </div>
                    <input type="tel" placeholder="074 XX XX XX" className="w-full border p-3 rounded" />
                    <button onClick={handlePayment} disabled={!method || processing} className="w-full bg-primary text-white py-4 rounded-xl font-bold flex justify-center">
                        {processing ? <Loader2 className="animate-spin" /> : "Payer et Démarrer"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const VideoCallModal: React.FC<{ doctor: Doctor; onClose: () => void }> = ({ doctor, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            <div className="flex-1 relative flex items-center justify-center">
                <img src={doctor.image} className="w-full h-full object-cover opacity-60" />
                <div className="absolute top-10 text-white text-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full inline-block mr-2 animate-pulse"></div>
                    En ligne avec Dr. {doctor.name}
                </div>
                <div className="absolute bottom-20 right-10 w-40 h-60 bg-gray-800 rounded-xl border-2 border-white overflow-hidden shadow-2xl">
                     <div className="w-full h-full flex items-center justify-center text-white text-xs">Votre Caméra</div>
                </div>
            </div>
            <div className="bg-gray-900 p-8 flex justify-center gap-6">
                <button className="p-4 bg-gray-700 rounded-full text-white"><Mic /></button>
                <button onClick={onClose} className="p-4 bg-red-600 rounded-full text-white hover:bg-red-700"><PhoneOff className="w-8 h-8" /></button>
                <button className="p-4 bg-gray-700 rounded-full text-white"><VideoIcon /></button>
            </div>
        </div>
    );
};

const Teleconsultation: React.FC = () => {
  const [specialtyFilter, setSpecialtyFilter] = useState('Tous');
  const [provinceFilter, setProvinceFilter] = useState('Tous');
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [paymentDoctor, setPaymentDoctor] = useState<Doctor | null>(null);
  const [callingDoctor, setCallingDoctor] = useState<Doctor | null>(null);

  const specialties = ['Tous', 'Généraliste', 'Dentiste', 'Gynécologue', 'Pédiatre', 'Cardiologue'];
  const filteredDoctors = MOCK_DOCTORS.filter(doc => (specialtyFilter === 'Tous' || doc.specialty === specialtyFilter) && (provinceFilter === 'Tous' || doc.province === provinceFilter));
  
  return (
    <div className="space-y-6">
      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
          <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 text-white">
              <h1 className="text-3xl font-bold">Consultez un Expert</h1>
              <p>Partout au Gabon, 24h/24 et 7j/7.</p>
          </div>
      </div>

      <div className="bg-white p-4 rounded-xl border flex flex-wrap gap-4 items-center">
          <select value={provinceFilter} onChange={e=>setProvinceFilter(e.target.value)} className="border p-2 rounded font-bold">
              <option value="Tous">Toutes les Provinces</option>
              {PROVINCES.map(p=><option key={p} value={p}>{p}</option>)}
          </select>
          <div className="flex gap-2">
              {specialties.map(s => (
                  <button key={s} onClick={()=>setSpecialtyFilter(s)} className={`px-4 py-2 rounded-full text-sm font-bold border ${specialtyFilter === s ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600'}`}>{s}</button>
              ))}
          </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredDoctors.map(doc => (
            <div key={doc.id} className="bg-white rounded-xl shadow p-6 border hover:shadow-lg transition">
                <div className="flex gap-4 mb-4">
                    <img src={doc.image} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                        <h3 className="font-bold">{doc.name}</h3>
                        <p className="text-xs text-primary font-bold uppercase">{doc.specialty}</p>
                        <p className="text-[10px] text-gray-400">{doc.location}</p>
                    </div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-sm mb-4">
                    <div className="flex justify-between"><span>Tarif</span><span className="font-bold">{doc.price} FCFA</span></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={()=>setBookingDoctor(doc)} className="bg-gray-100 text-gray-700 py-2 rounded font-bold text-xs">Rendez-vous</button>
                    <button onClick={()=>setPaymentDoctor(doc)} className="bg-primary text-white py-2 rounded font-bold text-xs">Consulter</button>
                </div>
            </div>
        ))}
      </div>

      {bookingDoctor && <BookingModal doctor={bookingDoctor} onClose={()=>setBookingDoctor(null)} onNext={()=>{setBookingDoctor(null); setPaymentDoctor(bookingDoctor);}} />}
      {paymentDoctor && <PaymentModal doctor={paymentDoctor} onClose={()=>setPaymentDoctor(null)} onSuccess={()=>{setPaymentDoctor(null); setCallingDoctor(paymentDoctor);}} />}
      {callingDoctor && <VideoCallModal doctor={callingDoctor} onClose={()=>setCallingDoctor(null)} />}
    </div>
  );
};

export default Teleconsultation;
