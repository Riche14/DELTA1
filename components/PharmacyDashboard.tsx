

import React, { useState } from 'react';
import { 
    Pill, LayoutDashboard, Database, TrendingUp, Search, Plus, 
    AlertTriangle, FileSpreadsheet, Save, Trash2, LogOut, CheckCircle, X,
    ArrowUp, ArrowDown, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_PHARMACY_INVENTORY, MOCK_PHARMACY_STATS } from '../constants';
import { PharmacyInventoryItem } from '../types';

const PharmacyDashboard: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'import'>('overview');
    
    // Branding State
    const [pharmacyName] = useState('Pharmacie Centrale');
    const [pharmacyImage] = useState('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=200');

    // Inventory State
    const [inventory, setInventory] = useState<PharmacyInventoryItem[]>(MOCK_PHARMACY_INVENTORY);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingItem, setEditingItem] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<PharmacyInventoryItem>>({});

    // Login logic
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'pharma123') {
            setIsAuthenticated(true);
        } else {
            alert("Mot de passe incorrect (Indice: pharma123)");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
    };

    // Inventory logic
    const filteredInventory = inventory.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.dci.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startEdit = (item: PharmacyInventoryItem) => {
        setEditingItem(item.id);
        setEditForm({ price: item.price, stockQuantity: item.stockQuantity });
    };

    const saveEdit = (id: string) => {
        setInventory(prev => prev.map(item => {
            if (item.id === id) {
                return { 
                    ...item, 
                    price: editForm.price || item.price, 
                    stockQuantity: editForm.stockQuantity !== undefined ? editForm.stockQuantity : item.stockQuantity,
                    lastUpdated: new Date().toISOString().split('T')[0]
                };
            }
            return item;
        }));
        setEditingItem(null);
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setEditForm({});
    };

    const handleNewProductClick = () => {
        setActiveTab('inventory');
        // In a real app, this would focus the input field
        setTimeout(() => {
            document.getElementById('new-product-name')?.focus();
        }, 100);
    };

    // CSV Import Mock
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            alert(`Importation de ${file.name} réussie ! Stock mis à jour.`);
            // Simulate adding items
            setInventory(prev => [
                ...prev,
                { id: `new_${Date.now()}`, name: 'NOUVEAU MEDOC', dci: 'Molecule X', category: 'Divers', price: 5000, stockQuantity: 100, minStockThreshold: 10, lastUpdated: '2025-05-15' }
            ]);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border-t-4 border-green-600">
                    <div className="text-center mb-8">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Pill className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Espace Pharmacie</h1>
                        <p className="text-gray-500">Gestion de stock & Tableau de bord</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Identifiant</label>
                            <input 
                                type="text" 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                                defaultValue="pharmacie"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">
                            Connexion
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link to="/" className="text-sm text-gray-500 hover:text-green-600">Retour au site public</Link>
                    </div>
                </div>
            </div>
        );
    }

    // Dashboard Calculations
    const lowStockItems = inventory.filter(i => i.stockQuantity <= i.minStockThreshold && i.stockQuantity > 0);
    const outOfStockItems = inventory.filter(i => i.stockQuantity === 0);
    const totalItems = inventory.length;

    return (
        <div className="flex h-screen bg-gray-50">
             {/* Sidebar */}
             <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center">
                    <img src={pharmacyImage} className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-green-500" alt="Pharma Logo" />
                    <h1 className="text-lg font-bold text-green-800 break-words">{pharmacyName}</h1>
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded mt-1">Version Pro</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition ${activeTab === 'overview' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <LayoutDashboard className="w-5 h-5 mr-3" /> Vue d'ensemble
                    </button>
                    <button 
                        onClick={() => setActiveTab('inventory')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition ${activeTab === 'inventory' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Database className="w-5 h-5 mr-3" /> Gestion Stock
                    </button>
                    <button 
                        onClick={() => setActiveTab('import')}
                        className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition ${activeTab === 'import' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <FileSpreadsheet className="w-5 h-5 mr-3" /> Import / Export
                    </button>
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <Link to="/" className="w-full flex items-center px-4 py-3 text-gray-500 hover:text-green-600">
                         Retour au site
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg">
                        <LogOut className="w-5 h-5 mr-3" /> Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 md:p-10">
                {activeTab === 'overview' && (
                    <div className="space-y-6 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-gray-800">Tableau de Bord</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-gray-500 text-sm mb-1">Total Références</div>
                                <div className="text-2xl font-bold text-gray-800">{totalItems}</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-gray-500 text-sm mb-1">Demandes en ligne</div>
                                <div className="text-2xl font-bold text-blue-600 flex items-center">
                                    <Globe className="w-5 h-5 mr-2" /> 124
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-gray-500 text-sm mb-1">Stock Faible</div>
                                <div className="text-2xl font-bold text-orange-500">{lowStockItems.length}</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-gray-500 text-sm mb-1">Ruptures</div>
                                <div className="text-2xl font-bold text-red-500">{outOfStockItems.length}</div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Demand Stats */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" /> Produits les plus demandés
                                </h3>
                                <div className="space-y-4">
                                    {['Coartem 80/480', 'Doliprane 1000mg', 'Spasfon', 'Amoxicilline'].map((drug, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-700">{i+1}. {drug}</span>
                                            <div className="flex items-center text-green-600 text-sm">
                                                <ArrowUp className="w-3 h-3 mr-1" /> +{10 - i}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Alert List */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" /> Alertes Stock
                                </h3>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {outOfStockItems.map(item => (
                                        <div key={item.id} className="bg-red-50 p-3 rounded-lg border border-red-100 flex justify-between items-center">
                                            <div>
                                                <div className="font-bold text-red-800 text-sm">{item.name}</div>
                                                <div className="text-xs text-red-600">RUPTURE DE STOCK</div>
                                            </div>
                                            <button 
                                                onClick={() => { setActiveTab('inventory'); setSearchQuery(item.name); }}
                                                className="text-xs bg-white border border-red-200 px-2 py-1 rounded text-red-700 font-bold"
                                            >
                                                Gérer
                                            </button>
                                        </div>
                                    ))}
                                    {lowStockItems.map(item => (
                                        <div key={item.id} className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex justify-between items-center">
                                            <div>
                                                <div className="font-bold text-orange-800 text-sm">{item.name}</div>
                                                <div className="text-xs text-orange-600">Stock Faible: {item.stockQuantity} / {item.minStockThreshold}</div>
                                            </div>
                                            <button 
                                                onClick={() => { setActiveTab('inventory'); setSearchQuery(item.name); }}
                                                className="text-xs bg-white border border-orange-200 px-2 py-1 rounded text-orange-700 font-bold"
                                            >
                                                Gérer
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'inventory' && (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">Gestion des Stocks</h2>
                            <button 
                                onClick={handleNewProductClick}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center hover:bg-green-700 shadow-md"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Nouveau Produit
                            </button>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input 
                                    id="new-product-name"
                                    type="text" 
                                    placeholder="Rechercher un médicament (Nom, DCI)..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="p-3 text-sm font-bold text-gray-600">Produit</th>
                                            <th className="p-3 text-sm font-bold text-gray-600">Catégorie</th>
                                            <th className="p-3 text-sm font-bold text-gray-600">Prix (FCFA)</th>
                                            <th className="p-3 text-sm font-bold text-gray-600">Stock</th>
                                            <th className="p-3 text-sm font-bold text-gray-600">Statut</th>
                                            <th className="p-3 text-sm font-bold text-gray-600 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredInventory.map(item => (
                                            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="p-3">
                                                    <div className="font-bold text-gray-800">{item.name}</div>
                                                    <div className="text-xs text-gray-500">{item.dci}</div>
                                                </td>
                                                <td className="p-3 text-sm text-gray-600">{item.category}</td>
                                                <td className="p-3">
                                                    {editingItem === item.id ? (
                                                        <input 
                                                            type="number" 
                                                            value={editForm.price} 
                                                            onChange={(e) => setEditForm({...editForm, price: parseInt(e.target.value)})}
                                                            className="w-24 p-1 border rounded"
                                                        />
                                                    ) : (
                                                        <span className="font-medium">{item.price}</span>
                                                    )}
                                                </td>
                                                <td className="p-3">
                                                     {editingItem === item.id ? (
                                                        <input 
                                                            type="number" 
                                                            value={editForm.stockQuantity} 
                                                            onChange={(e) => setEditForm({...editForm, stockQuantity: parseInt(e.target.value)})}
                                                            className="w-20 p-1 border rounded"
                                                        />
                                                    ) : (
                                                        <span className={`font-bold ${item.stockQuantity === 0 ? 'text-red-600' : 'text-gray-800'}`}>
                                                            {item.stockQuantity}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-3">
                                                    {item.stockQuantity === 0 ? (
                                                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-bold">Rupture</span>
                                                    ) : item.stockQuantity <= item.minStockThreshold ? (
                                                        <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded font-bold">Faible</span>
                                                    ) : (
                                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">OK</span>
                                                    )}
                                                </td>
                                                <td className="p-3 text-right">
                                                    {editingItem === item.id ? (
                                                        <div className="flex justify-end gap-2">
                                                            <button onClick={() => saveEdit(item.id)} className="text-green-600 hover:bg-green-100 p-1 rounded"><Save className="w-4 h-4"/></button>
                                                            <button onClick={cancelEdit} className="text-gray-600 hover:bg-gray-100 p-1 rounded"><X className="w-4 h-4"/></button>
                                                        </div>
                                                    ) : (
                                                        <button onClick={() => startEdit(item)} className="text-blue-600 hover:underline text-sm font-medium">Modifier</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'import' && (
                    <div className="space-y-6 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-gray-800">Import / Export de Données</h2>
                        
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                            <FileSpreadsheet className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Mettre à jour le stock par CSV</h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                Importez un fichier CSV contenant les colonnes : <code>NOM, DCI, PRIX, QUANTITE, CATEGORIE</code>.
                                Cela mettra à jour votre stock automatiquement.
                            </p>
                            
                            <label className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition cursor-pointer inline-flex items-center">
                                <Plus className="w-5 h-5 mr-2" />
                                Sélectionner un fichier
                                <input type="file" accept=".csv, .xlsx" className="hidden" onChange={handleFileUpload} />
                            </label>
                            <p className="text-xs text-gray-400 mt-4">Modèle .CSV disponible au téléchargement.</p>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                             <h3 className="font-bold text-blue-800 mb-2">Historique des imports</h3>
                             <ul className="text-sm text-blue-700 space-y-2">
                                <li className="flex justify-between"><span>stock_mai_2025.csv</span> <span>15/05/2025 - Succès</span></li>
                                <li className="flex justify-between"><span>ajout_ref_avril.csv</span> <span>10/04/2025 - Succès</span></li>
                             </ul>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PharmacyDashboard;