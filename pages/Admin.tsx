
import React, { useState } from 'react';
import { useData } from '../DataContext';
import { useLanguage } from '../LanguageContext';

const Admin: React.FC = () => {
    const {
        destinations,
        updateDestination,
        addDestination,
        deleteDestination,

        galleries,
        updateGallery,

        packages,
        updatePackage,

        prices,
        updatePrice,

        settings,
        updateSettings,
        resetData,
        error // Added for displaying DB errors
    } = useData();
    const { isRTL } = useLanguage();

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Dashboard State
    const [activeTab, setActiveTab] = useState<'destinations' | 'packages' | 'settings'>('destinations');
    const [searchTerm, setSearchTerm] = useState('');

    // New Destination State
    const [isAddingNew, setIsAddingNew] = useState(false);

    // Modal & Gallery State
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingDestination, setEditingDestination] = useState<any>(null);

    const [currentGalleryDestinationId, setCurrentGalleryDestinationId] = useState<string | null>(null);
    const [newPlace, setNewPlace] = useState({
        name: '',
        cat: 'Essentials',
        img: '',
        rating: 5.0,
        reviews: 0
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Invalid password');
        }
    };

    const handleAddPlace = () => {
        if (!newPlace.name || !newPlace.img) {
            alert('Name and Image URL are required');
            return;
        }
        const newId = (Math.max(...destinations.map(d => parseInt(d.id))) + 1).toString();
        addDestination({
            id: newId,
            ...newPlace
        });
        setIsAddingNew(false);
        setNewPlace({ name: '', cat: 'Essentials', img: '', rating: 5.0, reviews: 0 });
    };

    const handleSaveDestination = () => {
        if (!editingDestination) return;

        if (editingDestination.id.toString().startsWith('new-')) {
            // Generate numeric ID if possible, or just string
            const maxId = Math.max(...destinations.map(d => parseInt(d.id) || 0), 0);
            const newId = (maxId + 1).toString();
            addDestination({ ...editingDestination, id: newId });
        } else {
            updateDestination(editingDestination.id, editingDestination);
        }
        setShowAddModal(false);
        setEditingDestination(null);
    };

    const handleAddGalleryImage = (url: string) => {
        if (!currentGalleryDestinationId) return;
        const currentImages = galleries[currentGalleryDestinationId] || [];
        updateGallery(currentGalleryDestinationId, [...currentImages, url]);
    };

    const handleRemoveGalleryImage = (index: number) => {
        if (!currentGalleryDestinationId) return;
        const currentImages = galleries[currentGalleryDestinationId] || [];
        const newImages = currentImages.filter((_, i) => i !== index);
        updateGallery(currentGalleryDestinationId, newImages);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, destId: string) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 500 * 1024) { // 500KB limit
                alert("File is too large! Please upload images under 500KB to prevent browser storage issues.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const currentImages = galleries[destId] || [];
                updateGallery(destId, [...currentImages, base64String]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isNew: boolean, destId?: string) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 500 * 1024) { // 500KB limit
                alert("File is too large! Please upload images under 500KB to prevent browser storage issues.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                if (isNew) {
                    setNewPlace(prev => ({ ...prev, img: base64String }));
                } else if (destId) {
                    updateDestination(destId, { img: base64String });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const filteredDestinations = destinations.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0F0C29] flex items-center justify-center px-4">
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-md backdrop-blur-md">
                    <h1 className="text-3xl font-bold text-white text-center mb-2">Admin Login</h1>
                    <p className="text-gray-400 text-center mb-6">Enter password to access control panel</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400 focus:outline-none transition-colors"
                            />
                        </div>
                        {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
                        <button
                            type="submit"
                            className="w-full bg-gold-400 text-[#1B1464] font-bold py-3 rounded-xl hover:bg-white transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0C29] pb-12 flex flex-col md:flex-row">
            {/* Sidebar Desktop / Navbar Mobile */}
            <aside className="w-full md:w-64 bg-white/5 border-b md:border-b-0 md:border-r border-white/10 md:min-h-screen flex md:flex-col fixed top-0 md:top-0 left-0 h-auto md:h-full z-40 backdrop-blur-md">
                <nav className="flex md:flex-col w-full overflow-x-auto md:overflow-visible scrollbar-hide">
                    <button
                        onClick={() => setActiveTab('destinations')}
                        className={`p-3 md:p-4 text-left flex items-center gap-2 md:gap-3 transition-colors shrink-0 text-sm md:text-base ${activeTab === 'destinations' ? 'text-gold-400 bg-white/5 md:border-r-2 border-gold-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        <span className="iconify text-lg md:text-xl" data-icon="solar:map-point-bold-duotone"></span>
                        <span className="font-semibold whitespace-nowrap">Destinations</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('packages')}
                        className={`p-3 md:p-4 text-left flex items-center gap-2 md:gap-3 transition-colors shrink-0 text-sm md:text-base ${activeTab === 'packages' ? 'text-gold-400 bg-white/5 md:border-r-2 border-gold-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        <span className="iconify text-lg md:text-xl" data-icon="solar:tag-price-bold-duotone"></span>
                        <span className="font-semibold whitespace-nowrap">Packages</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`p-3 md:p-4 text-left flex items-center gap-2 md:gap-3 transition-colors shrink-0 text-sm md:text-base ${activeTab === 'settings' ? 'text-gold-400 bg-white/5 md:border-r-2 border-gold-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        <span className="iconify text-lg md:text-xl" data-icon="solar:settings-bold-duotone"></span>
                        <span className="font-semibold whitespace-nowrap">Settings</span>
                    </button>

                    <div className="md:mt-auto p-3 md:p-4 md:border-t border-white/5 ml-auto md:ml-0">
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="flex items-center gap-2 text-red-400 hover:text-red-300 text-xs md:text-sm font-semibold whitespace-nowrap"
                        >
                            <span className="iconify" data-icon="solar:logout-2-bold"></span>
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-12 relative mt-14 md:mt-0">
                <header className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-start md:items-center mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white capitalize">{activeTab} Manager</h2>
                    <button
                        onClick={() => { if (window.confirm('WARNING: This will reset all your changes to default. Continue?')) resetData() }}
                        className="bg-red-500/10 text-red-400 px-3 md:px-4 py-2 rounded-lg hover:bg-red-500/20 transition text-xs md:text-sm border border-red-500/20 w-full md:w-auto"
                    >
                        Reload / Reset
                    </button>
                </header>

                {/* ERROR DISPLAY */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                        <span className="iconify text-red-400 text-xl mt-0.5" data-icon="solar:danger-triangle-bold"></span>
                        <div>
                            <h4 className="text-red-400 font-bold className='text-sm mb-1">Database Connection Error</h4>
                            <p className="text-red-200/80 text-xs font-mono">{error}</p>
                            <p className="text-red-200/60 text-xs mt-2">Check if you have run the SQL script in Supabase! Tables might be missing.</p>
                        </div>
                    </div>
                )}

                {/* DESTINATIONS TAB */}
                {activeTab === 'destinations' && (
                    <div className="space-y-6 animate-on-scroll">
                        {/* Toolbar */}
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            <div className="relative w-full md:w-96">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 iconify" data-icon="solar:magnifer-linear"></span>
                                <input
                                    type="text"
                                    placeholder="Search destinations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-gold-400"
                                />
                            </div>
                            <button
                                onClick={() => setIsAddingNew(!isAddingNew)}
                                className="bg-gold-400 text-[#1B1464] px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition shadow-lg"
                            >
                                <span className="iconify" data-icon="solar:add-circle-bold"></span>
                                Add New Place
                            </button>
                        </div>

                        {/* Add New Form */}
                        {isAddingNew && (
                            <div className="bg-[#1B1464] border border-gold-400/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="iconify text-gold-400" data-icon="solar:pen-new-square-bold-duotone"></span>
                                    Create New Destination
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input type="text" placeholder="Place Name" value={newPlace.name} onChange={e => setNewPlace({ ...newPlace, name: e.target.value })} className="bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 outline-none" />
                                    <select value={newPlace.cat} onChange={e => setNewPlace({ ...newPlace, cat: e.target.value })} className="bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 outline-none">
                                        <option value="Essentials">Essentials</option>
                                        <option value="Outdoors">Outdoors</option>
                                        <option value="Shopping">Shopping</option>
                                        <option value="Culture">Culture</option>
                                    </select>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-gray-400 text-xs uppercase font-bold">Main Image</label>
                                        <div className="flex gap-4 items-center">
                                            {newPlace.img && (
                                                <img src={newPlace.img} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-white/10" />
                                            )}
                                            <div className="flex-1">
                                                <label className="cursor-pointer bg-black/30 border border-white/10 hover:border-gold-400/50 rounded-lg p-3 flex items-center gap-3 transition-colors group">
                                                    <span className="iconify text-gray-400 group-hover:text-gold-400 text-xl" data-icon="solar:upload-bold"></span>
                                                    <span className="text-sm text-gray-300 group-hover:text-white">Click to upload image</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleMainImageUpload(e, true)}
                                                        className="hidden"
                                                    />
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Or paste URL..."
                                                    value={newPlace.img}
                                                    onChange={e => setNewPlace({ ...newPlace, img: e.target.value })}
                                                    className="mt-2 w-full bg-transparent border-b border-white/10 text-xs text-gray-500 focus:text-white focus:border-gold-400 outline-none pb-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button onClick={() => setIsAddingNew(false)} className="text-gray-300 hover:text-white px-4 py-2 text-sm">Cancel</button>
                                    <button onClick={handleAddPlace} className="bg-gold-400 text-[#1B1464] px-6 py-2 rounded-lg font-bold hover:bg-white transition">Create Place</button>
                                </div>
                            </div>
                        )}

                        {/* Add/Edit Destination Modal */}
                        {showAddModal && editingDestination && (
                            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                                <div className="bg-[#1B1464] border border-gold-400/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden w-full max-w-md">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <span className="iconify text-gold-400" data-icon="solar:pen-new-square-bold-duotone"></span>
                                        {editingDestination.id.startsWith('new-') ? 'Create New Destination' : 'Edit Destination'}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input type="text" placeholder="Place Name" value={editingDestination.name} onChange={e => setEditingDestination({ ...editingDestination, name: e.target.value })} className="bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 outline-none" />
                                        <select value={editingDestination.cat} onChange={e => setEditingDestination({ ...editingDestination, cat: e.target.value as 'Essentials' | 'Outdoors' | 'Shopping' | 'Culture' })} className="bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 outline-none">
                                            <option value="Essentials">Essentials</option>
                                            <option value="Outdoors">Outdoors</option>
                                            <option value="Shopping">Shopping</option>
                                            <option value="Culture">Culture</option>
                                        </select>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-gray-400 text-xs uppercase font-bold">Main Image</label>
                                            <div className="flex gap-4 items-center">
                                                {editingDestination.img && (
                                                    <img src={editingDestination.img} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-white/10" />
                                                )}
                                                <div className="flex-1">
                                                    <label className="cursor-pointer bg-black/30 border border-white/10 hover:border-gold-400/50 rounded-lg p-3 flex items-center gap-3 transition-colors group">
                                                        <span className="iconify text-gray-400 group-hover:text-gold-400 text-xl" data-icon="solar:upload-bold"></span>
                                                        <span className="text-sm text-gray-300 group-hover:text-white">Click to upload new image</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    const reader = new FileReader();
                                                                    reader.onloadend = () => {
                                                                        setEditingDestination({ ...editingDestination, img: reader.result as string });
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }
                                                            }}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="number" step="0.1" max="5" placeholder="Rating" value={editingDestination.rating} onChange={e => setEditingDestination({ ...editingDestination, rating: parseFloat(e.target.value) })} className="bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 outline-none" />
                                        <input type="number" placeholder="Reviews" value={editingDestination.reviews} onChange={e => setEditingDestination({ ...editingDestination, reviews: parseInt(e.target.value) })} className="bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-gold-400 outline-none" />
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => setShowAddModal(false)} className="text-gray-300 hover:text-white px-4 py-2 text-sm">Cancel</button>
                                        <button onClick={handleSaveDestination} className="bg-gold-400 text-[#1B1464] px-6 py-2 rounded-lg font-bold hover:bg-white transition">Save Place</button>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* Grid */}
                        <div className="grid grid-cols-1 gap-4">
                            {filteredDestinations.length === 0 ? (
                                <div className="text-center py-20 text-gray-500">No destinations found matching "{searchTerm}"</div>
                            ) : filteredDestinations.map(place => (
                                <div key={place.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-6 group hover:bg-white/[0.07] transition-colors relative">
                                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                                        <button
                                            onClick={() => setCurrentGalleryDestinationId(currentGalleryDestinationId === place.id ? null : place.id)}
                                            className={`p-2 rounded-lg transition-all ${currentGalleryDestinationId === place.id ? 'bg-gold-400 text-[#1B1464]' : 'bg-black/20 text-blue-400 hover:text-blue-300 opacity-0 group-hover:opacity-100'}`}
                                            title="Manage Gallery"
                                        >
                                            <span className="iconify" data-icon="solar:gallery-bold"></span>
                                        </button>
                                        <button
                                            onClick={() => { if (window.confirm(`Delete ${place.name}?`)) deleteDestination(place.id) }}
                                            className="text-red-400 hover:text-red-300 p-2 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete Place"
                                        >
                                            <span className="iconify" data-icon="solar:trash-bin-trash-bold"></span>
                                        </button>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="w-full md:w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-black/50">
                                            <img src={place.img} alt="Preview" className="w-full h-full object-cover" />
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1 block">Name</label>
                                                    <input
                                                        type="text"
                                                        value={place.name}
                                                        onChange={(e) => updateDestination(place.id, { name: e.target.value })}
                                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-gold-400/50 outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1 block">Category</label>
                                                    <select
                                                        value={place.cat}
                                                        onChange={(e) => updateDestination(place.id, { cat: e.target.value as 'Essentials' | 'Outdoors' | 'Shopping' | 'Culture' })}
                                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-gold-400/50 outline-none"
                                                    >
                                                        <option value="Essentials">Essentials</option>
                                                        <option value="Outdoors">Outdoors</option>
                                                        <option value="Shopping">Shopping</option>
                                                        <option value="Culture">Culture</option>
                                                    </select>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1 block">Main Image</label>
                                                    <div className="flex items-center gap-2">
                                                        <label className="cursor-pointer p-2 bg-black/20 border border-white/10 rounded-lg hover:bg-gold-400/10 hover:border-gold-400/50 transition-colors" title="Upload New Image">
                                                            <span className="iconify text-gray-400 hover:text-gold-400" data-icon="solar:upload-bold"></span>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleMainImageUpload(e, false, place.id)}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={place.img}
                                                            onChange={(e) => updateDestination(place.id, { img: e.target.value })}
                                                            className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-gray-300 text-xs font-mono focus:border-gold-400/50 outline-none"
                                                            placeholder="Image URL"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1 block">Rating</label>
                                                        <input
                                                            type="number" step="0.1" max="5"
                                                            value={place.rating}
                                                            onChange={(e) => updateDestination(place.id, { rating: parseFloat(e.target.value) })}
                                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-gold-400/50 outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1 block">Reviews</label>
                                                        <input
                                                            type="number"
                                                            value={place.reviews}
                                                            onChange={(e) => updateDestination(place.id, { reviews: parseInt(e.target.value) })}
                                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-gold-400/50 outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Inline Gallery Manager */}
                                    {currentGalleryDestinationId === place.id && (
                                        <div className="mt-4 pt-4 border-t border-white/5 animate-on-scroll">
                                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                                <span className="iconify text-gold-400" data-icon="solar:gallery-bold"></span>
                                                Gallery
                                            </h4>

                                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
                                                {(galleries[place.id] || []).map((imgUrl, idx) => (
                                                    <div key={idx} className="relative group rounded-lg overflow-hidden aspect-square border border-white/10">
                                                        <img src={imgUrl} alt="Gallery" className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                            <a href={imgUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40" title="Download">
                                                                <span className="iconify" data-icon="solar:download-minimalistic-bold"></span>
                                                            </a>
                                                            <button
                                                                onClick={() => {
                                                                    const currentImages = galleries[place.id] || [];
                                                                    const newImages = currentImages.filter((_, i) => i !== idx);
                                                                    updateGallery(place.id, newImages);
                                                                }}
                                                                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40"
                                                                title="Delete"
                                                            >
                                                                <span className="iconify" data-icon="solar:trash-bin-trash-bold"></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Upload Button */}
                                                <label className="border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gold-400/50 hover:bg-gold-400/5 transition-colors aspect-square">
                                                    <span className="iconify text-2xl text-gray-400 mb-1" data-icon="solar:upload-bold"></span>
                                                    <span className="text-[10px] text-gray-400 uppercase font-bold">Upload</span>
                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, place.id)} />
                                                </label>
                                            </div>

                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Or add image via URL..."
                                                    id={`newGalleryUrl-${place.id}`}
                                                    className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-gold-400/50"
                                                />
                                                <button
                                                    onClick={() => {
                                                        const input = document.getElementById(`newGalleryUrl-${place.id}`) as HTMLInputElement;
                                                        if (input && input.value) {
                                                            const currentImages = galleries[place.id] || [];
                                                            updateGallery(place.id, [...currentImages, input.value]);
                                                            input.value = '';
                                                        }
                                                    }}
                                                    className="bg-white/10 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-white/20 transition"
                                                >
                                                    Add URL
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* PACKAGES TAB */}
                {activeTab === 'packages' && (
                    <div className="animate-on-scroll">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Manage Packages</h2>
                        </div>

                        <div className="space-y-8">
                            {packages.map(pkg => (
                                <div key={pkg.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Basic Info */}
                                        <div className="w-full md:w-1/3 space-y-4">
                                            <h3 className="text-gold-400 font-bold border-b border-white/10 pb-2 mb-4">{pkg.type.toUpperCase()} - {pkg.tier.toUpperCase()}</h3>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400">Title</label>
                                                <input type="text" value={pkg.title} onChange={(e) => updatePackage(pkg.id, { title: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-sm" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400">Subtitle</label>
                                                <input type="text" value={pkg.subtitle} onChange={(e) => updatePackage(pkg.id, { subtitle: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-sm" />
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="space-y-1 w-1/2">
                                                    <label className="text-xs text-gray-400">Price ($)</label>
                                                    <input type="number" value={pkg.price} onChange={(e) => updatePackage(pkg.id, { price: parseInt(e.target.value) })} className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-sm" />
                                                </div>
                                                <div className="space-y-1 w-1/2">
                                                    <label className="text-xs text-gray-400">Label</label>
                                                    <input type="text" value={pkg.priceLabel} onChange={(e) => updatePackage(pkg.id, { priceLabel: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-sm" />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400">Main Image URL</label>
                                                <input type="text" value={pkg.image} onChange={(e) => updatePackage(pkg.id, { image: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-xs" />
                                            </div>
                                        </div>

                                        {/* Details Editor */}
                                        <div className="w-full md:w-2/3 space-y-6">
                                            {/* Features */}
                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <label className="text-xs text-gray-400 uppercase font-bold">Inclusions Checkboxes</label>
                                                    <button onClick={() => updatePackage(pkg.id, { features: [...pkg.features, "New Feature"] })} className="text-xs text-gold-400 hover:text-white">+ Add</button>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {pkg.features.map((feat, i) => (
                                                        <div key={i} className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                value={feat}
                                                                onChange={(e) => {
                                                                    const newFeat = [...pkg.features];
                                                                    newFeat[i] = e.target.value;
                                                                    updatePackage(pkg.id, { features: newFeat });
                                                                }}
                                                                className="flex-1 bg-black/20 border border-white/10 rounded px-2 py-1 text-white text-xs"
                                                            />
                                                            <button onClick={() => {
                                                                const newFeat = pkg.features.filter((_, idx) => idx !== i);
                                                                updatePackage(pkg.id, { features: newFeat });
                                                            }} className="text-red-400 hover:text-red-300">×</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Itinerary */}
                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <label className="text-xs text-gray-400 uppercase font-bold">Itinerary Plan</label>
                                                    <button onClick={() => updatePackage(pkg.id, { itinerary: [...pkg.itinerary, { title: "New Day", subtitle: "Details", desc: "Description", activities: [] }] })} className="text-xs text-gold-400 hover:text-white">+ Add Day</button>
                                                </div>
                                                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                                    {pkg.itinerary.map((day, i) => (
                                                        <div key={i} className="bg-black/20 p-2 rounded flex flex-col gap-2">
                                                            <div className="flex gap-2">
                                                                <input value={day.title} onChange={(e) => {
                                                                    const newIt = [...pkg.itinerary]; newIt[i].title = e.target.value;
                                                                    updatePackage(pkg.id, { itinerary: newIt });
                                                                }} className="w-1/3 bg-transparent border-b border-white/10 text-white text-xs" placeholder="Day Title" />
                                                                <input value={day.subtitle} onChange={(e) => {
                                                                    const newIt = [...pkg.itinerary]; newIt[i].subtitle = e.target.value;
                                                                    updatePackage(pkg.id, { itinerary: newIt });
                                                                }} className="w-1/3 bg-transparent border-b border-white/10 text-gray-400 text-xs" placeholder="Subtitle" />
                                                                <button onClick={() => {
                                                                    const newIt = pkg.itinerary.filter((_, idx) => idx !== i);
                                                                    updatePackage(pkg.id, { itinerary: newIt });
                                                                }} className="ml-auto text-red-400 hover:text-red-300">Del</button>
                                                            </div>
                                                            <textarea value={day.desc} onChange={(e) => {
                                                                const newIt = [...pkg.itinerary]; newIt[i].desc = e.target.value;
                                                                updatePackage(pkg.id, { itinerary: newIt });
                                                            }} className="w-full bg-transparent text-gray-300 text-xs h-10 resize-none outline-none" placeholder="Description"></textarea>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                    <div className="animate-on-scroll">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-2xl">
                            <h3 className="text-xl font-bold text-white mb-6">General Configuration</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-semibold text-gray-300 block mb-2">WhatsApp Contact Number</label>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-500/20 p-3 rounded-lg text-green-400">
                                            <span className="iconify text-xl" data-icon="solar:phone-bold"></span>
                                        </div>
                                        <input
                                            type="text"
                                            value={settings.whatsappNumber}
                                            onChange={(e) => updateSettings({ whatsappNumber: e.target.value })}
                                            className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-400 outline-none transition-all placeholder-gray-600"
                                            placeholder="e.g. 77477577971"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 pl-14">
                                        Enter number with country code, no symbols (e.g. 77477577971). This number is used for all WhatsApp links.
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
                                        <span className="iconify text-blue-400 text-xl mt-0.5" data-icon="solar:database-bold"></span>
                                        <div>
                                            <h4 className="text-blue-400 font-bold text-sm mb-1">Database Sync</h4>
                                            <p className="text-blue-200/60 text-xs leading-relaxed">
                                                Changes are securely saved to the database in real-time. Your settings will persist across all devices and sessions.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                )}
            </main >
        </div >
    );
};

export default Admin;
