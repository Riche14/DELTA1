
import React, { useState } from 'react';
import { MapPin, Navigation, Info, Search } from 'lucide-react';
import { Pharmacy, Doctor, HealthPartner } from '../types';

interface MapComponentProps {
    items: (Pharmacy | Doctor | HealthPartner)[];
    type: 'pharmacy' | 'doctor' | 'partner';
    onMarkerClick?: (item: any) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ items, type, onMarkerClick }) => {
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    // Simulated "Libreville" center relative positioning for demo
    // In a real app, this would use Leaflet or Google Maps with real LatLng
    const mapCenter = { lat: 0.390, lng: 9.450 };
    const zoomScale = 2000; // Arbitrary scale factor for the SVG

    const getCoordinates = (item: any) => {
        // Fallback random positions near center if no coords
        if (!item.coordinates) {
            return {
                x: 50 + (Math.random() - 0.5) * 80,
                y: 50 + (Math.random() - 0.5) * 80
            };
        }
        // Simple projection for demo
        const x = 50 + (item.coordinates.lng - mapCenter.lng) * zoomScale;
        const y = 50 - (item.coordinates.lat - mapCenter.lat) * zoomScale;
        return { x, y };
    };

    const handlePinClick = (item: any) => {
        setSelectedItem(item);
        if (onMarkerClick) onMarkerClick(item);
    };

    return (
        <div className="relative w-full h-[500px] bg-blue-50 rounded-xl overflow-hidden border border-blue-200 shadow-inner group">
            {/* Map Background Pattern (Stylized) */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3A75C4 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* Map Roads (Stylized SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <path d="M0,250 Q200,200 400,250 T800,300" stroke="#999" strokeWidth="10" fill="none" />
                <path d="M400,0 L400,500" stroke="#999" strokeWidth="8" fill="none" />
                <path d="M200,500 Q300,300 100,100" stroke="#999" strokeWidth="6" fill="none" />
            </svg>

            {/* Map Controls */}
            <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md z-10 flex flex-col gap-2">
                <button className="p-2 hover:bg-gray-100 rounded" title="Zoom In">+</button>
                <button className="p-2 hover:bg-gray-100 rounded" title="Zoom Out">-</button>
                <button className="p-2 hover:bg-gray-100 rounded text-blue-600" title="Ma Position">
                    <Navigation className="w-5 h-5" />
                </button>
            </div>

            {/* Markers */}
            {items.map((item: any) => {
                const pos = getCoordinates(item);
                // Keep pins within bounds
                if (pos.x < 0 || pos.x > 100 || pos.y < 0 || pos.y > 100) return null;

                return (
                    <div 
                        key={item.id}
                        className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-transform hover:scale-125 hover:z-50"
                        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                        onClick={() => handlePinClick(item)}
                    >
                        <MapPin 
                            className={`w-8 h-8 drop-shadow-md ${
                                type === 'pharmacy' ? (item.isOnDuty ? 'text-green-600 animate-bounce' : 'text-green-500') :
                                type === 'doctor' ? 'text-blue-500' : 'text-orange-500'
                            }`} 
                            fill="currentColor"
                        />
                    </div>
                );
            })}

            {/* Selected Item Card */}
            {selectedItem && (
                <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white p-4 rounded-xl shadow-2xl animate-fade-in-up z-20 border border-gray-100">
                    <button 
                        onClick={() => setSelectedItem(null)} 
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                        ×
                    </button>
                    <div className="flex items-start gap-3">
                        {selectedItem.image && (
                            <img src={selectedItem.image} alt={selectedItem.name} className="w-16 h-16 rounded-lg object-cover" />
                        )}
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">{selectedItem.name}</h3>
                            <p className="text-xs text-gray-500 mb-1">{selectedItem.location}</p>
                            {selectedItem.isOnDuty && (
                                <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">De Garde</span>
                            )}
                            {selectedItem.openNow !== undefined && (
                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ml-1 ${selectedItem.openNow ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                                    {selectedItem.openNow ? 'Ouvert' : 'Fermé'}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                        <button className="flex-1 bg-primary text-white py-1.5 rounded text-xs font-bold hover:bg-green-700 transition">
                            Itinéraire
                        </button>
                        <a href={`tel:${selectedItem.phone}`} className="flex-1 bg-gray-100 text-gray-700 py-1.5 rounded text-xs font-bold hover:bg-gray-200 text-center">
                            Appeler
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
