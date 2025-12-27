

export interface Drug {
  id: string;
  name: string;
  dci: string;
  indication: string; // Ce que le médicament soigne
  price: number;
  insurancePrice: number; // Price with CNAMGS
  inStock: boolean;
  pharmacyName: string;
  pharmacyLocation: string;
  province: string; // Added province field
  isDuty: boolean; // Pharmacie de garde
  distance: number; // km
  coordinates?: { lat: number, lng: number };
}

export interface Pharmacy {
    id: string;
    name: string;
    location: string; // Quartier
    city: string;
    province: string;
    phone: string;
    isOnDuty: boolean;
    image?: string; // Added image field
    rating?: number;
    reviewCount?: number;
    coordinates?: { lat: number, lng: number };
    openNow?: boolean;
}

export interface HealthPartner {
    id: string;
    name: string;
    type: 'Public' | 'Privé' | 'Clinique' | 'Laboratoire';
    specialties: string[];
    location: string;
    city: string;
    province: string;
    phone: string;
    email?: string;
    image: string;
    coordinates?: { lat: number, lng: number };
    rating?: number;
    reviewCount?: number;
}

export interface DrugStat {
    id: string;
    name: string;
    category: string;
    avgPrice: number;
    trend: 'up' | 'down' | 'stable';
    demandLevel: 'Très Élevée' | 'Élevée' | 'Moyenne';
}

export interface DistributionCenter {
    id: string;
    name: string;
    type: 'CTA' | 'Hôpital' | 'Centre';
    location: string;
    city: string;
    province: string; // Added province field
    phone: string;
    hours: string;
    supplies: string[]; // e.g. ["ARV", "Tuberculose"]
}

export interface Ambulance {
  id: string;
  zone: string; // Usually the city
  province: string; // Added province
  serviceName: string;
  phone: string;
  isPublic: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ImageResolution = '1K' | '2K' | '4K';

export interface HealthStat {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'alert';
}

export interface BloodDonation {
  id: string;
  group: string;
  hospital: string;
  urgency: 'Haute' | 'Moyenne' | 'Faible';
  contact: string;
  status?: 'approved' | 'pending';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  province: string; // Added province
  isOnline: boolean;
  nextSlot: string;
  price: number;
  insurancePrice: number; // Prix avec assurance (CNAMGS)
  image: string;
  rating?: number;
  reviewCount?: number;
  orderNumber?: string; // Numéro d'ordre
}

export interface PreventionTopic {
  id: string;
  title: string;
  icon: string; // lucide icon name
  summary: string;
  details: string[];
  color: string;
}

export interface DrugTemplate {
    name: string;
    dci: string;
    dosage: string;
}

// --- DOCTOR DASHBOARD TYPES ---

export interface MedicalNote {
    id: string;
    date: string;
    content: string;
    author: string;
}

export interface PrescriptionItem {
    drugName: string;
    dosage: string;
    duration: string;
    instruction: string;
}

export interface Prescription {
    id: string;
    date: string;
    patientId: string;
    doctorName: string;
    items: PrescriptionItem[];
    code: string; // Security code for pharmacy
}

export interface LabResult {
    id: string;
    date: string;
    testName: string;
    laboratory: string;
    fileUrl: string;
    status: 'Normal' | 'Anormal' | 'Critique';
}

export interface Vaccine {
    id: string;
    name: string;
    date: string;
    nextDueDate?: string;
    provider: string;
}

export interface MedicalRecord {
    bloodGroup: string;
    allergies: string[];
    chronicConditions: string[];
    weight: number;
    height: number;
    notes: MedicalNote[];
    prescriptions: Prescription[];
    labResults?: LabResult[];
    vaccines?: Vaccine[];
}

export interface Notification {
    id: string;
    type: 'medication' | 'appointment' | 'vaccine' | 'alert';
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    actionLabel?: string;
    actionUrl?: string;
}

export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    dob: string; // Date of Birth
    gender: 'M' | 'F';
    phone: string;
    email: string;
    address: string;
    image: string;
    medicalRecord: MedicalRecord;
    notifications?: Notification[];
}

export interface Consultation {
    id: string;
    patientId: string;
    date: string;
    time: string;
    type: 'Vidéo' | 'Cabinet';
    status: 'Terminé' | 'Confirmé' | 'En attente' | 'Annulé';
    reason: string;
}

export interface ProMessage {
    id: string;
    sender: string;
    content: string;
    time: string;
    isRead: boolean;
    avatar?: string;
}

// --- PHARMACY DASHBOARD TYPES ---

export interface PharmacyInventoryItem {
    id: string;
    name: string;
    dci: string;
    category: string;
    price: number;
    stockQuantity: number;
    minStockThreshold: number;
    lastUpdated: string;
}

export interface PharmacyStat {
    date: string;
    views: number;
    searches: number;
}

// --- ADMIN TYPES ---

export type AdminRole = 'Master' | 'Administrateur' | 'Modérateur' | 'Animateur';

export interface AdminUser {
    id: string;
    name: string;
    username: string;
    password: string;
    role: AdminRole;
    image: string;
}