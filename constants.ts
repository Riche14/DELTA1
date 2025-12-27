

import { Drug, Ambulance, BloodDonation, Doctor, PreventionTopic, DistributionCenter, DrugStat, Pharmacy, DrugTemplate, HealthPartner, Patient, Consultation, ProMessage, PharmacyInventoryItem, PharmacyStat, Notification, AdminUser } from './types';

export const PROVINCES = [
    "Estuaire", "Haut-Ogooué", "Moyen-Ogooué", "Ngounié", "Nyanga", 
    "Ogooué-Ivindo", "Ogooué-Lolo", "Ogooué-Maritime", "Woleu-Ntem"
];

export const HEALTH_PARTNERS: HealthPartner[] = [
    {
        id: 'hp1', name: 'CHUL (Centre Hospitalier Universitaire de Libreville)', type: 'Public',
        specialties: ['Urgences', 'Pédiatrie', 'Chirurgie', 'Gynécologie', 'Médecine Légale'],
        location: 'Libreville', city: 'Libreville', province: 'Estuaire', phone: '1300', email: 'contact@chul.ga',
        image: 'https://images.unsplash.com/photo-1587351021759-3e566b9af922?auto=format&fit=crop&q=80&w=800',
        rating: 4.5, reviewCount: 120, coordinates: { lat: 0.3901, lng: 9.4544 }
    },
    {
        id: 'hp2', name: 'Hôpital d\'Instruction des Armées Omar Bongo Ondimba', type: 'Public',
        specialties: ['Cardiologie', 'Traumatologie', 'Réanimation', 'Neurologie'],
        location: 'PK9', city: 'Libreville', province: 'Estuaire', phone: '011 79 00 00', email: 'hiaobo@armee.ga',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
        rating: 4.8, reviewCount: 85
    },
    {
        id: 'hp3', name: 'Polyclinique El Rapha', type: 'Privé',
        specialties: ['Maternité', 'Ophtalmologie', 'Médecine Générale', 'Laboratoire'],
        location: 'Montagne Sainte', city: 'Libreville', province: 'Estuaire', phone: '011 74 12 12', email: 'infos@elrapha.com',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a092dd14?auto=format&fit=crop&q=80&w=800',
        rating: 4.6, reviewCount: 200
    },
    {
        id: 'hp4', name: 'Hôpital Albert Schweitzer', type: 'Privé',
        specialties: ['Maladies Tropicales', 'Chirurgie', 'Pédiatrie', 'Recherche'],
        location: 'Lambaréné', city: 'Lambaréné', province: 'Moyen-Ogooué', phone: '011 58 10 90', email: 'foundation@schweitzer.ga',
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800',
        rating: 4.9, reviewCount: 350
    },
    {
        id: 'hp5', name: 'CHR Amissa Bongo', type: 'Public',
        specialties: ['Médecine Interne', 'Urgences', 'Maternité'],
        location: 'Franceville', city: 'Franceville', province: 'Haut-Ogooué', phone: '011 67 70 54',
        image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
        rating: 4.2, reviewCount: 45
    },
    {
        id: 'hp6', name: 'Clinique Mandji', type: 'Privé',
        specialties: ['Généraliste', 'Laboratoire', 'Radiologie'],
        location: 'Port-Gentil', city: 'Port-Gentil', province: 'Ogooué-Maritime', phone: '011 55 20 20',
        image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800',
        rating: 4.4, reviewCount: 60
    }
];

export const ALL_PHARMACIES: Pharmacy[] = [
    // ESTUAIRE (Libreville, Owendo, Akanda)
    { id: 'e1', name: 'Pharmacie des Forestiers', location: 'Centre Ville', city: 'Libreville', province: 'Estuaire', phone: '011 76 14 66', isOnDuty: false, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400', rating: 4.5, reviewCount: 10, openNow: true, coordinates: { lat: 0.392, lng: 9.452 } },
    { id: 'e2', name: 'Pharmacie de Glass', location: 'Glass', city: 'Libreville', province: 'Estuaire', phone: '011 72 17 08', isOnDuty: true, image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400', rating: 4.7, reviewCount: 23, openNow: true, coordinates: { lat: 0.385, lng: 9.460 } },
    { id: 'e3', name: 'Pharmacie Jeanne & Léo', location: 'Montagne Sainte', city: 'Libreville', province: 'Estuaire', phone: '011 74 33 62', isOnDuty: false, image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=400', rating: 4.2, reviewCount: 8, openNow: true, coordinates: { lat: 0.395, lng: 9.458 } },
    { id: 'e4', name: 'Pharmacie d\'Akanda', location: 'Angondjé', city: 'Akanda', province: 'Estuaire', phone: '011 45 45 45', isOnDuty: true, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400', rating: 4.8, reviewCount: 45, openNow: true, coordinates: { lat: 0.510, lng: 9.410 } },
    { id: 'e5', name: 'Grande Pharmacie des Memos', location: 'Nzeng-Ayong', city: 'Libreville', province: 'Estuaire', phone: '011 70 00 00', isOnDuty: false, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400', rating: 4.4, reviewCount: 12, openNow: true, coordinates: { lat: 0.400, lng: 9.500 } },
    { id: 'e6', name: 'Pharmacie d\'Owendo', location: 'Owendo', city: 'Owendo', province: 'Estuaire', phone: '011 70 41 22', isOnDuty: false, image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400', rating: 4.3, reviewCount: 15, openNow: false, coordinates: { lat: 0.300, lng: 9.520 } },
    { id: 'e7', name: 'Pharmacie du PK8', location: 'PK8', city: 'Libreville', province: 'Estuaire', phone: '011 00 00 00', isOnDuty: false, image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=400', rating: 4.1, reviewCount: 5, openNow: false, coordinates: { lat: 0.410, lng: 9.480 } },
    { id: 'e8', name: 'Pharmacie Louis', location: 'Louis', city: 'Libreville', province: 'Estuaire', phone: '011 73 24 55', isOnDuty: false, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400', rating: 4.6, reviewCount: 30, openNow: true, coordinates: { lat: 0.380, lng: 9.440 } },
    { id: 'e9', name: 'Pharmacie Le Drugstore', location: 'Bord de mer', city: 'Libreville', province: 'Estuaire', phone: '011 74 02 02', isOnDuty: false, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400', rating: 4.9, reviewCount: 50, openNow: true, coordinates: { lat: 0.398, lng: 9.445 } },

    // OGOOUÉ-MARITIME (Port-Gentil)
    { id: 'om1', name: 'Pharmacie Océane', location: 'Centre Ville', city: 'Port-Gentil', province: 'Ogooué-Maritime', phone: '011 55 25 25', isOnDuty: true, image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400', rating: 4.5, reviewCount: 20, openNow: true },
    { id: 'om2', name: 'Pharmacie Centrale', location: 'Marché Grand Village', city: 'Port-Gentil', province: 'Ogooué-Maritime', phone: '011 55 22 22', isOnDuty: false, image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=400', rating: 4.3, reviewCount: 14, openNow: true },
    { id: 'om3', name: 'Pharmacie du Littoral', location: 'Salsa', city: 'Port-Gentil', province: 'Ogooué-Maritime', phone: '011 55 33 33', isOnDuty: false, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400', rating: 4.4, reviewCount: 18, openNow: true },
    { id: 'om4', name: 'Pharmacie de la Balise', location: 'Balise', city: 'Port-Gentil', province: 'Ogooué-Maritime', phone: '011 55 44 44', isOnDuty: false, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400', rating: 4.2, reviewCount: 10, openNow: false },

    // HAUT-OGOOUÉ (Franceville, Moanda)
    { id: 'ho1', name: 'Pharmacie Masuku', location: 'Centre Ville', city: 'Franceville', province: 'Haut-Ogooué', phone: '011 67 70 70', isOnDuty: true, image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400', rating: 4.6, reviewCount: 25, openNow: true },
    { id: 'ho2', name: 'Pharmacie de Franceville', location: 'Potos', city: 'Franceville', province: 'Haut-Ogooué', phone: '011 67 00 00', isOnDuty: false, image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=400', rating: 4.3, reviewCount: 12, openNow: true },
    { id: 'ho3', name: 'Pharmacie de Moanda', location: 'Centre', city: 'Moanda', province: 'Haut-Ogooué', phone: '011 66 00 00', isOnDuty: false, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400', rating: 4.4, reviewCount: 15, openNow: false },

    // WOLEU-NTEM (Oyem, Bitam)
    { id: 'wn1', name: 'Pharmacie du Woleu', location: 'Centre Ville', city: 'Oyem', province: 'Woleu-Ntem', phone: '011 98 00 00', isOnDuty: true, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400', rating: 4.5, reviewCount: 22, openNow: true },
    { id: 'wn2', name: 'Pharmacie le Ntem', location: 'Marché', city: 'Bitam', province: 'Woleu-Ntem', phone: '011 96 00 00', isOnDuty: false, image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400', rating: 4.1, reviewCount: 8, openNow: true },

    // MOYEN-OGOOUÉ (Lambaréné)
    { id: 'mo1', name: 'Pharmacie Galoa', location: 'Isaac', city: 'Lambaréné', province: 'Moyen-Ogooué', phone: '011 58 00 00', isOnDuty: true, image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=400', rating: 4.6, reviewCount: 20, openNow: true },
    { id: 'mo2', name: 'Pharmacie Schweitzer', location: 'Hôpital', city: 'Lambaréné', province: 'Moyen-Ogooué', phone: '011 58 10 90', isOnDuty: false, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400', rating: 4.8, reviewCount: 35, openNow: true },

    // NGOUNIÉ (Mouila)
    { id: 'ng1', name: 'Pharmacie de la Ngounié', location: 'Carrefour', city: 'Mouila', province: 'Ngounié', phone: '011 86 00 00', isOnDuty: true, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400', rating: 4.3, reviewCount: 12, openNow: true },
    { id: 'ng2', name: 'Pharmacie Magotsi', location: 'Centre', city: 'Mouila', province: 'Ngounié', phone: '011 86 11 11', isOnDuty: false, image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400', rating: 4.2, reviewCount: 10, openNow: true },

    // NYANGA (Tchibanga)
    { id: 'ny1', name: 'Pharmacie Mayombe', location: 'Centre', city: 'Tchibanga', province: 'Nyanga', phone: '011 82 00 00', isOnDuty: true, image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=400', rating: 4.4, reviewCount: 14, openNow: true },

    // OGOOUÉ-IVINDO (Makokou)
    { id: 'oi1', name: 'Pharmacie Ivindo', location: 'Centre', city: 'Makokou', province: 'Ogooué-Ivindo', phone: '011 90 00 00', isOnDuty: true, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400', rating: 4.2, reviewCount: 11, openNow: true },

    // OGOOUÉ-LOLO (Koulamoutou)
    { id: 'ol1', name: 'Pharmacie Lolo-Bouenguidi', location: 'Centre', city: 'Koulamoutou', province: 'Ogooué-Lolo', phone: '011 65 00 00', isOnDuty: true, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400', rating: 4.3, reviewCount: 13, openNow: true },
];

export const POPULAR_DRUGS: DrugStat[] = [
    { id: '1', name: 'Coartem 80/480', category: 'Antipaludéen', avgPrice: 3500, trend: 'up', demandLevel: 'Très Élevée' },
    { id: '2', name: 'Doliprane 1000mg', category: 'Antalgique', avgPrice: 1500, trend: 'stable', demandLevel: 'Très Élevée' },
    { id: '3', name: 'Amoxicilline 500mg', category: 'Antibiotique', avgPrice: 2800, trend: 'stable', demandLevel: 'Élevée' },
    { id: '4', name: 'Spasfon', category: 'Antispasmodique', avgPrice: 2800, trend: 'down', demandLevel: 'Moyenne' },
    { id: '5', name: 'Efferalgan Vit C', category: 'Antalgique', avgPrice: 1800, trend: 'up', demandLevel: 'Élevée' },
    { id: '6', name: 'Azithromycine', category: 'Antibiotique', avgPrice: 4500, trend: 'stable', demandLevel: 'Moyenne' },
];

export const EXPENSIVE_DRUGS: DrugStat[] = [
    { id: 'e1', name: 'Rocephine 1g', category: 'Antibiotique', avgPrice: 8500, trend: 'up', demandLevel: 'Moyenne' },
    { id: 'e2', name: 'Augmentin 1g', category: 'Antibiotique', avgPrice: 6500, trend: 'stable', demandLevel: 'Élevée' },
    { id: 'e3', name: 'Insuline Lantus', category: 'Diabète', avgPrice: 12000, trend: 'up', demandLevel: 'Élevée' },
    { id: 'e4', name: 'Ventoline Spray', category: 'Asthme', avgPrice: 4500, trend: 'stable', demandLevel: 'Très Élevée' },
    { id: 'e5', name: 'Inexium 40mg', category: 'Gastrique', avgPrice: 9000, trend: 'up', demandLevel: 'Moyenne' },
];

export const MOCK_DRUGS: Drug[] = [
  // ESTUAIRE
  {
    id: '1', name: 'DOLIPRANE 1000mg', dci: 'Paracétamol', indication: 'Soigne : Maux de tête, fièvre, douleurs', price: 1500, insurancePrice: 300, inStock: true,
    pharmacyName: 'Pharmacie de Glass', pharmacyLocation: 'Libreville', province: 'Estuaire', isDuty: true, distance: 1.2
  },
  {
    id: '2', name: 'COARTEM', dci: 'Artemether/Lumefantrine', indication: 'Soigne : Paludisme (Crise)', price: 3500, insurancePrice: 0, inStock: true,
    pharmacyName: 'Pharmacie des Forestiers', pharmacyLocation: 'Libreville', province: 'Estuaire', isDuty: false, distance: 2.5
  },
  {
    id: '3', name: 'SPASFON', dci: 'Phloroglucinol', indication: 'Soigne : Douleurs abdominales, règles douloureuses', price: 2800, insurancePrice: 560, inStock: true,
    pharmacyName: 'Pharmacie Jeanne et Léo', pharmacyLocation: 'Libreville', province: 'Estuaire', isDuty: false, distance: 3.0
  },
  
  // OGOOUÉ-MARITIME
  {
    id: '4', name: 'AMOXICILLINE 500mg', dci: 'Amoxicilline', indication: 'Soigne : Infections bactériennes', price: 3200, insurancePrice: 640, inStock: false,
    pharmacyName: 'Pharmacie Océane', pharmacyLocation: 'Port-Gentil', province: 'Ogooué-Maritime', isDuty: true, distance: 150
  },
  {
    id: '5', name: 'MALOXINE', dci: 'Sulfadoxine', indication: 'Soigne : Paludisme (Prévention)', price: 1200, insurancePrice: 240, inStock: true,
    pharmacyName: 'Pharmacie du Grand Village', pharmacyLocation: 'Port-Gentil', province: 'Ogooué-Maritime', isDuty: false, distance: 155
  },

  // HAUT-OGOOUÉ
  {
    id: '6', name: 'DOLIPRANE 500mg', dci: 'Paracétamol', indication: 'Soigne : Douleurs légères, fièvre', price: 1000, insurancePrice: 200, inStock: true,
    pharmacyName: 'Pharmacie de Franceville', pharmacyLocation: 'Franceville', province: 'Haut-Ogooué', isDuty: true, distance: 500
  },
  {
    id: '7', name: 'IBUPROFENE 400', dci: 'Ibuprofène', indication: 'Soigne : Inflammation, douleur, fièvre', price: 2000, insurancePrice: 400, inStock: true,
    pharmacyName: 'Pharmacie Masuku', pharmacyLocation: 'Franceville', province: 'Haut-Ogooué', isDuty: false, distance: 502
  },

  // WOLEU-NTEM
  {
    id: '8', name: 'QUINNINE', dci: 'Quinine', indication: 'Soigne : Paludisme grave', price: 4000, insurancePrice: 800, inStock: true,
    pharmacyName: 'Pharmacie du Woleu', pharmacyLocation: 'Oyem', province: 'Woleu-Ntem', isDuty: true, distance: 350
  },
  
  // MOYEN-OGOOUÉ
  {
    id: '9', name: 'PARACETAMOL', dci: 'Paracétamol', indication: 'Soigne : Fièvre et douleurs', price: 500, insurancePrice: 100, inStock: true,
    pharmacyName: 'Pharmacie Schweitzer', pharmacyLocation: 'Lambaréné', province: 'Moyen-Ogooué', isDuty: true, distance: 200
  },

  // NGOUNIÉ
  {
    id: '10', name: 'ARTESUNATE', dci: 'Artesunate', indication: 'Soigne : Paludisme sévère', price: 3000, insurancePrice: 0, inStock: true,
    pharmacyName: 'Pharmacie de la Ngounié', pharmacyLocation: 'Mouila', province: 'Ngounié', isDuty: true, distance: 400
  },

  // NYANGA
  {
    id: '11', name: 'VITAMINE C', dci: 'Acide Ascorbique', indication: 'Soigne : Fatigue passagère', price: 1500, insurancePrice: 300, inStock: true,
    pharmacyName: 'Pharmacie Tchibanga', pharmacyLocation: 'Tchibanga', province: 'Nyanga', isDuty: false, distance: 450
  },

  // OGOOUÉ-IVINDO
  {
    id: '12', name: 'METRONIDAZOLE', dci: 'Metronidazole', indication: 'Soigne : Infections parasitaires', price: 2200, insurancePrice: 440, inStock: true,
    pharmacyName: 'Pharmacie Ivindo', pharmacyLocation: 'Makokou', province: 'Ogooué-Ivindo', isDuty: true, distance: 600
  },

  // OGOOUÉ-LOLO
  {
    id: '13', name: 'EFFERALGAN', dci: 'Paracétamol', indication: 'Soigne : Douleurs, état grippal', price: 1600, insurancePrice: 320, inStock: true,
    pharmacyName: 'Pharmacie Koulamoutou', pharmacyLocation: 'Koulamoutou', province: 'Ogooué-Lolo', isDuty: true, distance: 550
  }
];

export const FREE_DISTRIBUTION_CENTERS: DistributionCenter[] = [
    // ESTUAIRE
    { id: '1', name: 'CTA Nkembo', type: 'CTA', location: 'Hôpital Nkembo', city: 'Libreville', province: 'Estuaire', phone: '011 72 00 00', hours: '07h30-15h30', supplies: ['ARV', 'Tuberculose'] },
    { id: '2', name: 'HIA Omar Bongo', type: 'Hôpital', location: 'PK9', city: 'Libreville', province: 'Estuaire', phone: '011 79 00 00', hours: '08h00-16h00', supplies: ['ARV'] },
    
    // OGOOUÉ-MARITIME
    { id: '3', name: 'CHR Port-Gentil', type: 'CTA', location: 'Centre Ville', city: 'Port-Gentil', province: 'Ogooué-Maritime', phone: '011 55 20 20', hours: '07h30-15h00', supplies: ['ARV'] },
    
    // HAUT-OGOOUÉ
    { id: '4', name: 'CHR Amissa Bongo', type: 'CTA', location: 'Franceville', city: 'Franceville', province: 'Haut-Ogooué', phone: '011 67 70 54', hours: '08h00-15h30', supplies: ['ARV', 'Tuberculose'] },

    // MOYEN-OGOOUÉ
    { id: '5', name: 'Hôpital Schweitzer', type: 'Hôpital', location: 'Lambaréné', city: 'Lambaréné', province: 'Moyen-Ogooué', phone: '011 58 10 90', hours: '08h00-16h00', supplies: ['ARV', 'Paludisme grave'] },

    // WOLEU-NTEM
    { id: '6', name: 'CHR Oyem', type: 'CTA', location: 'Oyem', city: 'Oyem', province: 'Woleu-Ntem', phone: '011 98 60 60', hours: '07h30-15h30', supplies: ['ARV'] },

    // NGOUNIÉ
    { id: '7', name: 'CHR Mouila', type: 'CTA', location: 'Mouila', city: 'Mouila', province: 'Ngounié', phone: '011 86 10 32', hours: '08h00-15h00', supplies: ['ARV'] },

    // NYANGA
    { id: '8', name: 'CHR Tchibanga', type: 'CTA', location: 'Tchibanga', city: 'Tchibanga', province: 'Nyanga', phone: '011 82 01 22', hours: '08h00-15h00', supplies: ['ARV'] },

    // OGOOUÉ-IVINDO
    { id: '9', name: 'CHR Makokou', type: 'CTA', location: 'Makokou', city: 'Makokou', province: 'Ogooué-Ivindo', phone: '011 90 30 50', hours: '08h00-15h00', supplies: ['ARV'] },
    
    // OGOOUÉ-LOLO
    { id: '10', name: 'CHR Paul Moukambi', type: 'CTA', location: 'Koulamoutou', city: 'Koulamoutou', province: 'Ogooué-Lolo', phone: '011 65 50 10', hours: '08h00-15h00', supplies: ['ARV'] }
];

export const AMBULANCES: Ambulance[] = [
  // ESTUAIRE
  { id: '1', zone: 'Libreville', province: 'Estuaire', serviceName: 'SAMU National (LBV)', phone: '1300', isPublic: true },
  { id: '2', zone: 'Libreville', province: 'Estuaire', serviceName: 'Sapeurs Pompiers', phone: '18', isPublic: true },
  { id: '3', zone: 'Libreville', province: 'Estuaire', serviceName: 'SMUR CHUL', phone: '011 76 07 68', isPublic: true },

  // HAUT-OGOOUÉ
  { id: '4', zone: 'Franceville', province: 'Haut-Ogooué', serviceName: 'SAMU Franceville', phone: '1300', isPublic: true },
  { id: '5', zone: 'Franceville', province: 'Haut-Ogooué', serviceName: 'Urgences CHR Amissa Bongo', phone: '011 67 70 54', isPublic: true },

  // OGOOUÉ-MARITIME
  { id: '6', zone: 'Port-Gentil', province: 'Ogooué-Maritime', serviceName: 'SAMU Port-Gentil', phone: '1300', isPublic: true },
  { id: '7', zone: 'Port-Gentil', province: 'Ogooué-Maritime', serviceName: 'Pompiers POG', phone: '011 55 23 68', isPublic: true },

  // MOYEN-OGOOUÉ
  { id: '8', zone: 'Lambaréné', province: 'Moyen-Ogooué', serviceName: 'Urgences Schweitzer', phone: '011 58 10 90', isPublic: false },

  // WOLEU-NTEM
  { id: '9', zone: 'Oyem', province: 'Woleu-Ntem', serviceName: 'Urgences CHR Oyem', phone: '011 98 60 60', isPublic: true },
  
  // NGOUNIÉ
  { id: '10', zone: 'Mouila', province: 'Ngounié', serviceName: 'Urgences CHR Mouila', phone: '011 86 10 32', isPublic: true },

  // NYANGA
  { id: '11', zone: 'Tchibanga', province: 'Nyanga', serviceName: 'Urgences CHR Tchibanga', phone: '011 82 01 22', isPublic: true },

  // OGOOUÉ-IVINDO
  { id: '12', zone: 'Makokou', province: 'Ogooué-Ivindo', serviceName: 'Urgences CHR Makokou', phone: '011 90 30 50', isPublic: true },

  // OGOOUÉ-LOLO
  { id: '13', zone: 'Koulamoutou', province: 'Ogooué-Lolo', serviceName: 'Urgences CHR Koulamoutou', phone: '011 65 50 10', isPublic: true }
];

export const BLOOD_DONATIONS: BloodDonation[] = [
  { id: '1', group: 'O+', hospital: 'CHUL (Libreville)', urgency: 'Haute', contact: '066000001', status: 'approved' },
  { id: '2', group: 'A-', hospital: 'Hôpital d\'Instruction des Armées', urgency: 'Moyenne', contact: '062123456', status: 'approved' },
  { id: '3', group: 'AB+', hospital: 'CHR Port-Gentil', urgency: 'Haute', contact: '077987654', status: 'approved' },
  { id: '4', group: 'B-', hospital: 'CHR Oyem', urgency: 'Moyenne', contact: '074001122', status: 'pending' },
];

export const PENDING_REGISTRATIONS = [
    { id: 'r1', type: 'doctor', name: 'Dr. Jeanne Ngoma', specialty: 'Dermatologue', city: 'Libreville', date: '2025-05-12', documents: ['Diplome_Doc.pdf', 'CV_Jeanne.pdf', 'Licence.jpg'], experience: 8, rating: 4.5 },
    { id: 'r2', type: 'pharmacy', name: 'Pharmacie du Marché', specialty: 'Général', city: 'Mouila', date: '2025-05-13', documents: ['Agrement_Pharma.pdf', 'Registre_Commerce.pdf'], experience: 15, rating: 4.2 },
    { id: 'r3', type: 'structure', name: 'Clinique la Paix', specialty: 'Maternité, Urgences', city: 'Franceville', date: '2025-05-14', documents: ['Autorisation_Ministere.pdf', 'Plan_Clinique.pdf'], experience: 5, rating: 4.0 },
];

export const PREDEFINED_DRUGS: DrugTemplate[] = [
    { name: 'DOLIPRANE 1000mg', dci: 'Paracétamol', dosage: '1000mg' },
    { name: 'DOLIPRANE 500mg', dci: 'Paracétamol', dosage: '500mg' },
    { name: 'EFFERALGAN 1g', dci: 'Paracétamol', dosage: '1000mg' },
    { name: 'AMOXICILLINE 500mg', dci: 'Amoxicilline', dosage: '500mg' },
    { name: 'AMOXICILLINE 1g', dci: 'Amoxicilline', dosage: '1000mg' },
    { name: 'AUGMENTIN 1g', dci: 'Amoxicilline + Acide Clavulanique', dosage: '1g/125mg' },
    { name: 'AUGMENTIN Enfant', dci: 'Amoxicilline + Acide Clavulanique', dosage: '100mg/12.5mg/ml' },
    { name: 'COARTEM 80/480', dci: 'Artemether/Lumefantrine', dosage: '80mg/480mg' },
    { name: 'COARTEM 20/120', dci: 'Artemether/Lumefantrine', dosage: '20mg/120mg' },
    { name: 'SPASFON', dci: 'Phloroglucinol', dosage: '80mg' },
    { name: 'SPASFON Lyoc', dci: 'Phloroglucinol', dosage: '80mg' },
    { name: 'IBUPROFENE 400', dci: 'Ibuprofène', dosage: '400mg' },
    { name: 'ADVIL 400', dci: 'Ibuprofène', dosage: '400mg' },
    { name: 'SMECTA', dci: 'Diosmectite', dosage: '3g' },
    { name: 'VOGALENE', dci: 'Metopimazine', dosage: '15mg' },
    { name: 'AZITHROMYCINE 250', dci: 'Azithromycine', dosage: '250mg' },
    { name: 'MALOXINE', dci: 'Sulfadoxine / Pyriméthamine', dosage: '500mg/25mg' },
];

export const NEWS_TICKER = [
  "Campagne de vaccination contre la grippe saisonnière en cours.",
  "Nouveaux horaires des centres de santé communautaires.",
  "Alerte météo : Restez hydraté.",
  "Ministère de la Santé : Rappel sur les gestes barrières.",
  "Pharmacies de garde mises à jour chaque semaine."
];

export const MOCK_ADMIN_TEAM: AdminUser[] = [
    { 
        id: 'admin1', name: 'Administrateur Principal', username: 'admin', password: 'master241', role: 'Master',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
    },
    { 
        id: 'admin2', name: 'Sophie Modératrice', username: 'sophie', password: '123', role: 'Modérateur',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    }
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1', name: 'Dr. Marc Ondo', specialty: 'Généraliste', hospital: 'Cabinet Privé Louis', location: 'Libreville', province: 'Estuaire',
    isOnline: true, nextSlot: 'Aujourd\'hui, 14:00', price: 15000, insurancePrice: 3000, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.8, reviewCount: 150, orderNumber: 'A123'
  },
  {
    id: '2', name: 'Dr. Sarah Mboumba', specialty: 'Pédiatre', hospital: 'CHUL', location: 'Libreville', province: 'Estuaire',
    isOnline: false, nextSlot: 'Demain, 09:00', price: 20000, insurancePrice: 4000, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.9, reviewCount: 200, orderNumber: 'B456'
  },
  {
    id: '3', name: 'Dr. Jean-Paul Kassa', specialty: 'Cardiologue', hospital: 'Polyclinique El Rapha', location: 'Libreville', province: 'Estuaire',
    isOnline: true, nextSlot: 'Aujourd\'hui, 16:30', price: 35000, insurancePrice: 7000, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.7, reviewCount: 95, orderNumber: 'C789'
  },
  {
    id: '4', name: 'Dr. Alice Nguema', specialty: 'Dermatologue', hospital: 'Centre Médical Akanda', location: 'Akanda', province: 'Estuaire',
    isOnline: false, nextSlot: 'Lundi, 10:00', price: 25000, insurancePrice: 5000, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.6, reviewCount: 88, orderNumber: 'D101'
  },
  {
    id: '5', name: 'Dr. Pierre Moussavou', specialty: 'Dentiste', hospital: 'Cabinet Dentaire Glass', location: 'Libreville', province: 'Estuaire',
    isOnline: true, nextSlot: 'Aujourd\'hui, 11:00', price: 20000, insurancePrice: 4000, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.5, reviewCount: 76
  },
  {
    id: '6', name: 'Dr. Clara Obame', specialty: 'Gynécologue', hospital: 'Clinique Union Médicale', location: 'Libreville', province: 'Estuaire',
    isOnline: true, nextSlot: 'Demain, 15:00', price: 30000, insurancePrice: 6000, image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.9, reviewCount: 310
  },
  {
    id: '7', name: 'Dr. Eric Bouassa', specialty: 'Ophtalmologue', hospital: 'CHU d\'Owendo', location: 'Owendo', province: 'Estuaire',
    isOnline: false, nextSlot: 'Jeudi, 08:30', price: 25000, insurancePrice: 5000, image: 'https://images.unsplash.com/photo-1612531386530-97286d74c2ea?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.4, reviewCount: 56
  },
  {
    id: '8', name: 'Dr. Paul Bivigou', specialty: 'Généraliste', hospital: 'CHR Amissa Bongo', location: 'Franceville', province: 'Haut-Ogooué',
    isOnline: true, nextSlot: 'Aujourd\'hui, 10:00', price: 10000, insurancePrice: 2000, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.3, reviewCount: 42
  },
  {
    id: '9', name: 'Dr. Marie Kombila', specialty: 'Généraliste', hospital: 'CHR Port-Gentil', location: 'Port-Gentil', province: 'Ogooué-Maritime',
    isOnline: true, nextSlot: 'Demain, 14:00', price: 12000, insurancePrice: 2400, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.7, reviewCount: 110
  },
  {
    id: '10', name: 'Dr. Jean Obiang', specialty: 'Pédiatre', hospital: 'CHR Oyem', location: 'Oyem', province: 'Woleu-Ntem',
    isOnline: false, nextSlot: 'Lundi, 09:00', price: 15000, insurancePrice: 3000, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.6, reviewCount: 65
  },
  {
    id: '11', name: 'Dr. Albertine Mombo', specialty: 'Gynécologue', hospital: 'Hôpital Schweitzer', location: 'Lambaréné', province: 'Moyen-Ogooué',
    isOnline: true, nextSlot: 'Jeudi, 11:00', price: 18000, insurancePrice: 3600, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.8, reviewCount: 130
  },
  {
    id: '12', name: 'Dr. Martin Nzouba', specialty: 'Médecin Légiste', hospital: 'Hôpital Militaire', location: 'Libreville', province: 'Estuaire',
    isOnline: false, nextSlot: 'Mercredi, 14:00', price: 50000, insurancePrice: 10000, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5.0, reviewCount: 12
  },
  {
    id: '13', name: 'Dr. Claire Mapangou', specialty: 'Psychiatre', hospital: 'Centre Melen', location: 'Libreville', province: 'Estuaire',
    isOnline: true, nextSlot: 'Vendredi, 10:00', price: 30000, insurancePrice: 6000, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.7, reviewCount: 45
  },
  {
    id: '14', name: 'Dr. Henri Minko', specialty: 'Urologue', hospital: 'Clinique Chambrier', location: 'Libreville', province: 'Estuaire',
    isOnline: true, nextSlot: 'Mardi, 16:00', price: 35000, insurancePrice: 7000, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.6, reviewCount: 38
  }
];

export const PREVENTION_TOPICS: PreventionTopic[] = [
    {
        id: '1',
        title: 'Paludisme (Malaria)',
        icon: 'Bug',
        summary: 'Première cause de consultation au Gabon. Protégez-vous des moustiques.',
        details: [
            'Dormez toujours sous une moustiquaire imprégnée d\'insecticide à longue durée (MILD).',
            'Éliminez les eaux stagnantes autour de votre domicile (pneus, boîtes de conserve) pour éviter la reproduction des moustiques.',
            'Portez des vêtements longs et clairs le soir.',
            'Consultez immédiatement en cas de fièvre, surtout chez les enfants et les femmes enceintes.',
            'Pour les femmes enceintes : suivez le Traitement Préventif Intermittent (TPI).'
        ],
        color: 'green'
    },
    {
        id: '2',
        title: 'Hypertension Artérielle',
        icon: 'HeartPulse',
        summary: 'Le tueur silencieux. Surveillez votre tension régulièrement.',
        details: [
            'Réduisez votre consommation de sel (pas de sel de table ajouté, évitez les cubes bouillon en excès).',
            'Pratiquez une activité physique régulière (30 min de marche par jour).',
            'Maintenez un poids santé (IMC < 25).',
            'Évitez le tabac et limitez l\'alcool.',
            'Faites contrôler votre tension artérielle au moins une fois par an après 40 ans.'
        ],
        color: 'red'
    },
    {
        id: '3',
        title: 'Diabète',
        icon: 'Droplet',
        summary: 'Une maladie chronique qui se gère par l\'alimentation et le sport.',
        details: [
            'Limitez les sucres rapides (sodas, bonbons, pâtisseries).',
            'Privilégiez les aliments riches en fibres (légumes, fruits, manioc, banane plantain non frite).',
            'Évitez la sédentarité.',
            'Surveillez les signes : soif excessive, envie fréquente d\'uriner, fatigue intense.',
            'Si vous êtes diabétique, prenez soin de vos pieds et consultez un ophtalmologue régulièrement.'
        ],
        color: 'blue'
    },
    {
        id: '4',
        title: 'Hygiène & Eau potable',
        icon: 'GlassWater',
        summary: 'Prévenir les maladies hydriques (choléra, typhoïde, diarrhées).',
        details: [
            'Lavez-vous les mains avec de l\'eau propre et du savon avant de manger et après les toilettes.',
            'Buvez de l\'eau potable (eau minérale ou eau bouillie/filtrée).',
            'Lavez soigneusement les fruits et légumes crus.',
            'Couvrez les aliments pour les protéger des mouches.',
            'Utilisez des latrines ou toilettes propres.'
        ],
        color: 'cyan'
    },
    {
        id: '5',
        title: 'VIH / SIDA & IST',
        icon: 'Shield',
        summary: 'Protégez-vous et faites-vous dépister.',
        details: [
            'Utilisez systématiquement un préservatif lors des rapports sexuels.',
            'Faites-vous dépister régulièrement pour connaître votre statut.',
            'Le traitement antirétroviral (ARV) est gratuit au Gabon.',
            'La transmission mère-enfant peut être évitée grâce au suivi médical.',
            'Évitez le partage d\'objets tranchants (rasoirs, seringues).'
        ],
        color: 'purple'
    },
    {
        id: '6',
        title: 'Vaccination',
        icon: 'Syringe',
        summary: 'La meilleure protection pour vos enfants.',
        details: [
            'Respectez le calendrier vaccinal du Programme Élargi de Vaccination (PEV).',
            'Vaccins obligatoires : BCG (Tuberculose), Polio, DTCoq (Diphtérie, Tétanos, Coqueluche), Rougeole, Fièvre Jaune.',
            'La vaccination est gratuite dans les centres de santé publics.',
            'Conservez précieusement le carnet de santé de l\'enfant.',
            'Les adultes doivent aussi faire leurs rappels (Tétanos tous les 10 ans).'
        ],
        color: 'yellow'
    }
];

export const ADMIN_STATS = {
    dailyVisitors: 1245,
    appointmentsBooked: 87,
    onlineConsultations: 34,
    pharmaciesTotal: ALL_PHARMACIES.length,
    pharmaciesOnDuty: ALL_PHARMACIES.filter(p => p.isOnDuty).length,
    drugsOrdered: 312,
    emergencyCalls: 18,
    usersOnline: 42,
    totalVisits: 45890,
    bmiCalculated: 156,
    totalStructures: HEALTH_PARTNERS.length,
    partnershipRequests: 5,
    doctorsByProvince: {
        'Estuaire': 85,
        'Ogooué-Maritime': 22,
        'Haut-Ogooué': 15,
        'Woleu-Ntem': 8,
        'Moyen-Ogooué': 6,
    }
};

// --- MOCK DATA FOR DOCTOR DASHBOARD ---

export const MOCK_PATIENTS: Patient[] = [
    {
        id: 'p1', firstName: 'Jean', lastName: 'Mba', dob: '1985-04-12', gender: 'M',
        phone: '074 12 34 56', email: 'jean.mba@email.com', address: 'Nzeng-Ayong, Libreville',
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200',
        medicalRecord: {
            bloodGroup: 'O+', allergies: ['Pénicilline'], chronicConditions: ['Hypertension'],
            weight: 78, height: 175,
            notes: [
                { id: 'n1', date: '2024-03-10', content: 'Patient plaintif de maux de tête récurrents. Tension 14/9.', author: 'Dr. Marc Ondo' }
            ],
            prescriptions: [],
            labResults: [
                { id: 'l1', date: '2024-03-12', testName: 'Bilan Sanguin Complet', laboratory: 'Labo Bio Analyse', status: 'Normal', fileUrl: '#' }
            ],
            vaccines: [
                { id: 'v1', name: 'Fièvre Jaune', date: '2020-01-15', provider: 'Centre de Vaccination LBV' }
            ]
        },
        notifications: [
            { id: 'notif1', type: 'appointment', title: 'Rappel RDV', message: 'Consultation demain à 14h avec Dr. Ondo', time: 'Il y a 2h', isRead: false },
            { id: 'notif2', type: 'medication', title: 'Prise de Médicament', message: 'N\'oubliez pas votre Coartem ce soir', time: '19:00', isRead: false }
        ]
    },
    {
        id: 'p2', firstName: 'Sophie', lastName: 'Koumba', dob: '1992-08-22', gender: 'F',
        phone: '066 98 76 54', email: 's.koumba@email.com', address: 'Louis, Libreville',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        medicalRecord: {
            bloodGroup: 'A-', allergies: [], chronicConditions: [],
            weight: 62, height: 165,
            notes: [], prescriptions: []
        }
    },
    {
        id: 'p3', firstName: 'Paul', lastName: 'Boussamba', dob: '1970-01-15', gender: 'M',
        phone: '077 55 44 33', email: 'paul.b@email.com', address: 'Akébé, Libreville',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200',
        medicalRecord: {
            bloodGroup: 'B+', allergies: ['Arachides'], chronicConditions: ['Diabète Type 2'],
            weight: 85, height: 172,
            notes: [
                { id: 'n2', date: '2024-02-15', content: 'Suivi diabète. Glycémie à jeun correcte.', author: 'Dr. Marc Ondo' }
            ],
            prescriptions: []
        }
    }
];

export const MOCK_USER_RECORD = MOCK_PATIENTS[0]; // Logged in user mock

export const MOCK_CONSULTATIONS: Consultation[] = [
    { id: 'c1', patientId: 'p1', date: '2025-05-15', time: '09:00', type: 'Vidéo', status: 'Confirmé', reason: 'Suivi Hypertension' },
    { id: 'c2', patientId: 'p2', date: '2025-05-15', time: '10:30', type: 'Cabinet', status: 'Confirmé', reason: 'Certificat médical' },
    { id: 'c3', patientId: 'p3', date: '2025-05-15', time: '14:00', type: 'Cabinet', status: 'En attente', reason: 'Douleurs articulaires' },
    { id: 'c4', patientId: 'p1', date: '2025-05-14', time: '11:00', type: 'Vidéo', status: 'Terminé', reason: 'Maux de tête' },
];

export const MOCK_MESSAGES: ProMessage[] = [
    { id: 'm1', sender: 'Secrétariat', content: 'Le patient de 14h a annulé son RDV.', time: '08:30', isRead: false },
    { id: 'm2', sender: 'Dr. Sarah Mboumba', content: 'Bonjour Marc, peux-tu regarder le dossier de M. Boussamba ?', time: 'Hier', isRead: true },
];

// --- MOCK DATA FOR PHARMACY DASHBOARD ---

export const MOCK_PHARMACY_INVENTORY: PharmacyInventoryItem[] = [
    { id: 'd1', name: 'DOLIPRANE 1000mg', dci: 'Paracétamol', category: 'Antalgique', price: 1500, stockQuantity: 150, minStockThreshold: 50, lastUpdated: '2025-05-14' },
    { id: 'd2', name: 'COARTEM 80/480', dci: 'Artemether/Lumefantrine', category: 'Antipaludéen', price: 3500, stockQuantity: 30, minStockThreshold: 40, lastUpdated: '2025-05-14' },
    { id: 'd3', name: 'SPASFON', dci: 'Phloroglucinol', category: 'Antispasmodique', price: 2800, stockQuantity: 85, minStockThreshold: 20, lastUpdated: '2025-05-12' },
    { id: 'd4', name: 'AMOXICILLINE 500mg', dci: 'Amoxicilline', category: 'Antibiotique', price: 3200, stockQuantity: 0, minStockThreshold: 25, lastUpdated: '2025-05-10' },
    { id: 'd5', name: 'MALOXINE', dci: 'Sulfadoxine', category: 'Antipaludéen', price: 1200, stockQuantity: 12, minStockThreshold: 15, lastUpdated: '2025-05-13' },
    { id: 'd6', name: 'VITAMINE C', dci: 'Acide Ascorbique', category: 'Vitamine', price: 1500, stockQuantity: 200, minStockThreshold: 30, lastUpdated: '2025-05-14' },
];

export const MOCK_PHARMACY_STATS: PharmacyStat[] = [
    { date: '2025-05-08', views: 45, searches: 12 },
    { date: '2025-05-09', views: 52, searches: 18 },
    { date: '2025-05-10', views: 48, searches: 15 },
    { date: '2025-05-11', views: 60, searches: 25 },
    { date: '2025-05-12', views: 75, searches: 30 },
    { date: '2025-05-13', views: 82, searches: 35 },
    { date: '2025-05-14', views: 90, searches: 42 },
];