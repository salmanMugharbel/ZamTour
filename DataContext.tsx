
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DESTINATIONS, PLACE_GALLERIES } from './constants';
import { Destination } from './types';
import { translations } from './translations';
import { supabase } from './supabaseClient';

export interface PackageInclusion {
    icon: string;
    title: string;
    desc: string;
}

export interface PackageDay {
    title: string;
    subtitle: string;
    desc: string;
    activities: string[];
}

export interface Package {
    id: string;
    type: 'couples' | 'family' | 'friends' | 'solo';
    tier: 'standard' | 'premium';
    title: string;
    subtitle: string;
    price: number;
    priceLabel: string;
    image: string;
    features: string[];
    inclusions: PackageInclusion[];
    itinerary: PackageDay[];
    cancellationPolicy: string;
}

export interface PackagePrices {
    couples_std: number;
    couples_prem: number;
    family_std: number;
    family_prem: number;
    friends_std: number;
    friends_prem: number;
    solo_std: number;
    solo_prem: number;
}

interface AppSettings {
    whatsappNumber: string;
}

interface DataContextType {
    destinations: Destination[];
    updateDestination: (id: string, updates: Partial<Destination>) => void;
    addDestination: (destination: Destination) => void;
    deleteDestination: (id: string) => void;

    galleries: { [key: string]: string[] };
    updateGallery: (id: string, images: string[]) => void;

    packages: Package[];
    updatePackage: (id: string, updates: Partial<Package>) => void;

    prices: PackagePrices;
    updatePrice: (key: keyof PackagePrices, value: number) => void;

    settings: AppSettings;
    updateSettings: (updates: Partial<AppSettings>) => void;
    resetData: () => void;
    loading: boolean;
    error: string | null;
}

// Helper to seed initial packages
const seedPackagesFromTranslations = (): Package[] => {
    const t = translations.en.packages;
    const mp = translations.en.my_package;

    const createInclusions = () => [
        { icon: 'solar:sim-card-bold-duotone', title: mp.includes.sim, desc: mp.includes.sim_desc },
        { icon: 'solar:map-arrow-bold-duotone', title: mp.includes.tours, desc: mp.includes.tours_desc },
        { icon: 'solar:car-bold-duotone', title: mp.includes.transfers, desc: mp.includes.transfers_desc },
        { icon: 'solar:bed-bold-duotone', title: mp.includes.stay, desc: mp.includes.stay_desc },
    ];

    const createItinerary = () => [
        { title: mp.days.day1_title, subtitle: mp.days.day1_sub, desc: mp.days.day1_desc, activities: ["solar:bed-bold|Kazakhstan Hotel", "solar:chef-hat-bold|Dinner Included"] },
        { title: mp.days.day2_title, subtitle: mp.days.day2_sub, desc: mp.days.day2_desc, activities: ["solar:bed-bold|Kazakhstan Hotel", "solar:cup-hot-bold|Breakfast Included"] },
        { title: mp.days.day3_title, subtitle: mp.days.day3_sub, desc: mp.days.day3_desc, activities: ["solar:bed-bold|Kazakhstan Hotel", "solar:cup-hot-bold|Breakfast Included"] },
        { title: mp.days.day4_title, subtitle: mp.days.day4_sub, desc: mp.days.day4_desc, activities: ["solar:bed-bold|Guest House in Saty", "solar:chef-hat-bold|Full Board"] },
        { title: mp.days.day5_title, subtitle: mp.days.day5_sub, desc: mp.days.day5_desc, activities: ["solar:bed-bold|Kazakhstan Hotel", "solar:cup-hot-bold|Breakfast Included"] },
    ];

    return [
        {
            id: 'coup_std', type: 'couples', tier: 'standard',
            title: t.couples_title, subtitle: t.standard, price: 150, priceLabel: t.day,
            image: "https://welcome.shymbulak.com/wp-content/uploads/2024/11/cb8654049f3cbf379a15e6b31a8d0aab-scaled.jpg",
            features: [t.features.c_std_1, t.features.c_std_2, t.features.c_std_3, t.features.c_std_4, t.features.c_std_5],
            inclusions: createInclusions(), itinerary: createItinerary(), cancellationPolicy: mp.cancellation
        },
        {
            id: 'coup_prem', type: 'couples', tier: 'premium',
            title: t.couples_prem_title, subtitle: t.premium, price: 350, priceLabel: t.day,
            image: "https://welcome.shymbulak.com/wp-content/uploads/2024/11/cb8654049f3cbf379a15e6b31a8d0aab-scaled.jpg",
            features: [t.features.c_prem_1, t.features.c_prem_2, t.features.c_prem_3, t.features.c_prem_4],
            inclusions: createInclusions(), itinerary: createItinerary(), cancellationPolicy: mp.cancellation
        },
        {
            id: 'fam_std', type: 'family', tier: 'standard',
            title: t.family_title, subtitle: t.standard, price: 200, priceLabel: t.day,
            image: "https://welcome.shymbulak.com/wp-content/uploads/2024/11/cb8654049f3cbf379a15e6b31a8d0aab-scaled.jpg",
            features: [t.features.f_std_1, t.features.f_std_2, t.features.f_std_3, t.features.f_std_4, t.features.f_std_5],
            inclusions: createInclusions(), itinerary: createItinerary(), cancellationPolicy: mp.cancellation
        },
        {
            id: 'fam_prem', type: 'family', tier: 'premium',
            title: t.family_prem_title, subtitle: t.premium, price: 450, priceLabel: t.day,
            image: "https://welcome.shymbulak.com/wp-content/uploads/2024/11/cb8654049f3cbf379a15e6b31a8d0aab-scaled.jpg",
            features: [t.features.f_prem_1, t.features.f_prem_2, t.features.f_prem_3, t.features.f_prem_4],
            inclusions: createInclusions(), itinerary: createItinerary(), cancellationPolicy: mp.cancellation
        },
        {
            id: 'fr_std', type: 'friends', tier: 'standard',
            title: t.friends_title, subtitle: t.standard, price: 120, priceLabel: t.pp,
            image: "https://welcome.shymbulak.com/wp-content/uploads/2024/11/cb8654049f3cbf379a15e6b31a8d0aab-scaled.jpg",
            features: [t.features.fr_std_1, t.features.fr_std_2, t.features.fr_std_3, t.features.fr_std_4],
            inclusions: createInclusions(), itinerary: createItinerary(), cancellationPolicy: mp.cancellation
        },
        {
            id: 'fr_prem', type: 'friends', tier: 'premium',
            title: t.friends_prem_title, subtitle: t.adventure_pro, price: 250, priceLabel: t.pp,
            image: "https://welcome.shymbulak.com/wp-content/uploads/2024/11/cb8654049f3cbf379a15e6b31a8d0aab-scaled.jpg",
            features: [t.features.fr_prem_1, t.features.fr_prem_2, t.features.fr_prem_3, t.features.fr_prem_4],
            inclusions: createInclusions(), itinerary: createItinerary(), cancellationPolicy: mp.cancellation
        }
    ];
};

const defaultPrices: PackagePrices = {
    couples_std: 150, couples_prem: 350,
    family_std: 200, family_prem: 450,
    friends_std: 120, friends_prem: 250,
    solo_std: 100, solo_prem: 280
};

const defaultSettings: AppSettings = { whatsappNumber: "77477577971" };

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [galleries, setGalleries] = useState<{ [key: string]: string[] }>({});
    const [packages, setPackages] = useState<Package[]>([]);
    const [prices, setPrices] = useState<PackagePrices>(defaultPrices);
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initial Fetch & Seed Effect
    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            setError(null);
            try {
                // 1. Fetch Destinations
                let { data: destData, error: destError } = await supabase.from('destinations').select('*').order('created_at', { ascending: false });
                if (destError) throw destError;

                // SEED IF EMPTY
                if (!destData || destData.length === 0) {
                    const { error: seedError } = await supabase.from('destinations').insert(DESTINATIONS);
                    if (seedError) throw seedError;
                    destData = DESTINATIONS;
                }
                setDestinations(destData || []);

                // 2. Fetch Packages
                let { data: pkgData, error: pkgError } = await supabase.from('packages').select('*');
                if (pkgError) throw pkgError;

                // SEED IF EMPTY
                if (!pkgData || pkgData.length === 0) {
                    const defaultPackages = seedPackagesFromTranslations();
                    const rows = defaultPackages.map(p => ({
                        id: p.id,
                        type: p.type,
                        tier: p.tier,
                        title: p.title,
                        subtitle: p.subtitle,
                        price: p.price,
                        price_label: p.priceLabel,
                        image: p.image,
                        features: p.features,
                        inclusions: p.inclusions,
                        itinerary: p.itinerary,
                        cancellation_policy: p.cancellationPolicy
                    }));

                    const { error: seedError } = await supabase.from('packages').insert(rows);
                    if (seedError) throw seedError;

                    // Re-fetch to get what we just inserted (to ensure consistent format)
                    const { data: refetched } = await supabase.from('packages').select('*');
                    pkgData = refetched;
                }

                if (pkgData && pkgData.length > 0) {
                    const mappedPackages = pkgData.map((p: any) => ({
                        ...p,
                        priceLabel: p.price_label,
                        cancellationPolicy: p.cancellation_policy
                    }));
                    setPackages(mappedPackages);

                    const newPrices = { ...defaultPrices };
                    const priceKeyMap: Record<string, keyof PackagePrices> = {
                        'coup_std': 'couples_std', 'coup_prem': 'couples_prem',
                        'fam_std': 'family_std', 'fam_prem': 'family_prem',
                        'fr_std': 'friends_std', 'fr_prem': 'friends_prem',
                        'solo_std': 'solo_std', 'solo_prem': 'solo_prem'
                    };
                    mappedPackages.forEach((p: Package) => {
                        const key = priceKeyMap[p.id];
                        if (key) newPrices[key] = p.price;
                    });
                    setPrices(newPrices);
                } else {
                    setPackages(seedPackagesFromTranslations());
                }

                // 3. Fetch Galleries
                let { data: galleryData, error: galleryError } = await supabase.from('galleries').select('*');
                if (galleryError) throw galleryError;

                // SEED IF EMPTY
                if (!galleryData || galleryData.length === 0) {
                    const rows: any[] = [];
                    Object.keys(PLACE_GALLERIES).forEach(id => {
                        PLACE_GALLERIES[id].forEach(url => {
                            rows.push({ destination_id: id, image_url: url });
                        });
                    });

                    if (rows.length > 0) {
                        const { error: seedError } = await supabase.from('galleries').insert(rows);
                        if (seedError) throw seedError;
                        const { data: refetched } = await supabase.from('galleries').select('*');
                        galleryData = refetched;
                    }
                }

                const newGalleries: { [key: string]: string[] } = {};
                // Defaults as base
                Object.keys(PLACE_GALLERIES).forEach(k => newGalleries[k] = PLACE_GALLERIES[k]);

                if (galleryData) {
                    const dbMap: { [key: string]: string[] } = {};
                    galleryData.forEach((g: any) => {
                        if (!dbMap[g.destination_id]) dbMap[g.destination_id] = [];
                        dbMap[g.destination_id].push(g.image_url);
                    });
                    Object.keys(dbMap).forEach(k => {
                        newGalleries[k] = dbMap[k];
                    });
                }
                setGalleries(newGalleries);

                // 4. Fetch Settings
                const { data: settingsData, error: settingsError } = await supabase.from('app_settings').select('*');

                if (!settingsError && settingsData && settingsData.length > 0) {
                    // Take the first row if multiple exist to avoid crashes
                    const firstRow = settingsData[0];
                    setSettings({ whatsappNumber: firstRow.whatsapp_number });
                    // Store the ID for future updates if needed, or just rely on the first row concept
                } else if (!settingsData || settingsData.length === 0) {
                    // Seed Settings
                    await supabase.from('app_settings').insert({ whatsapp_number: defaultSettings.whatsappNumber });
                }

            } catch (err: any) {
                console.error('Error fetching/seeding data:', err.message);
                setError(err.message);
                setDestinations(DESTINATIONS);
                setPackages(seedPackagesFromTranslations());
                setGalleries(PLACE_GALLERIES);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const updateDestination = async (id: string, updates: Partial<Destination>) => {
        setDestinations(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
        const { error } = await supabase.from('destinations').update(updates).eq('id', id);
        if (error) { console.error("Error updating destination DB:", error); setError(error.message); }
    };

    const addDestination = async (destination: Destination) => {
        setDestinations(prev => [destination, ...prev]);
        setGalleries(prev => ({ ...prev, [destination.id]: [destination.img] }));

        const { error } = await supabase.from('destinations').insert([destination]);
        if (error) { console.error("Error adding destination DB:", error); setError(error.message); }

        const { error: galError } = await supabase.from('galleries').insert({ destination_id: destination.id, image_url: destination.img });
        if (galError) setError(galError.message);
    };

    const deleteDestination = async (id: string) => {
        setDestinations(prev => prev.filter(d => d.id !== id));
        setGalleries(prev => {
            const newG = { ...prev };
            delete newG[id];
            return newG;
        });

        const { error } = await supabase.from('destinations').delete().eq('id', id);
        if (error) { console.error("Error deleting destination DB:", error); setError(error.message); }
    };

    const updateGallery = async (id: string, images: string[]) => {
        setGalleries(prev => ({ ...prev, [id]: images }));
        try {
            await supabase.from('galleries').delete().eq('destination_id', id);
            if (images.length > 0) {
                const rows = images.map(url => ({ destination_id: id, image_url: url }));
                const { error } = await supabase.from('galleries').insert(rows);
                if (error) throw error;
            }
        } catch (err: any) {
            console.error("Error updating gallery DB:", err);
            setError(err.message);
        }
    };

    const updatePackage = async (id: string, updates: Partial<Package>) => {
        setPackages(prev => {
            const newPackages = prev.map(p => p.id === id ? { ...p, ...updates } : p);
            if (updates.price) {
                const pkg = newPackages.find(p => p.id === id);
                if (pkg) {
                    const priceKeyMap: Record<string, keyof PackagePrices> = {
                        'coup_std': 'couples_std', 'coup_prem': 'couples_prem',
                        'fam_std': 'family_std', 'fam_prem': 'family_prem',
                        'fr_std': 'friends_std', 'fr_prem': 'friends_prem',
                        'solo_std': 'solo_std', 'solo_prem': 'solo_prem'
                    };
                    const key = priceKeyMap[id];
                    if (key) setPrices(prevPrices => ({ ...prevPrices, [key]: updates.price! }));
                }
            }
            return newPackages;
        });

        const dbUpdates: any = { ...updates };
        if (updates.priceLabel) { dbUpdates.price_label = updates.priceLabel; delete dbUpdates.priceLabel; }
        if (updates.cancellationPolicy) { dbUpdates.cancellation_policy = updates.cancellationPolicy; delete dbUpdates.cancellationPolicy; }

        const { error } = await supabase.from('packages').update(dbUpdates).eq('id', id);
        if (error) { console.error("Error updating package DB:", error); setError(error.message); }
    };

    const updatePrice = async (key: keyof PackagePrices, value: number) => {
        setPrices(prev => ({ ...prev, [key]: value }));
        const pkgKeyMap: Record<keyof PackagePrices, string> = {
            'couples_std': 'coup_std', 'couples_prem': 'coup_prem',
            'family_std': 'family_std', 'family_prem': 'fam_prem',
            'friends_std': 'fr_std', 'friends_prem': 'fr_prem',
            'solo_std': 'solo_std', 'solo_prem': 'solo_prem'
        };
        const pkgId = pkgKeyMap[key];
        if (pkgId) {
            setPackages(prev => prev.map(p => p.id === pkgId ? { ...p, price: value } : p));
            const { error } = await supabase.from('packages').update({ price: value }).eq('id', pkgId);
            if (error) { console.error("Error updating price via package DB:", error); setError(error.message); }
        }
    };

    const updateSettings = async (updates: Partial<AppSettings>) => {
        setSettings(prev => ({ ...prev, ...updates }));

        const dbUpdates: any = {};
        if (updates.whatsappNumber) dbUpdates.whatsapp_number = updates.whatsappNumber;

        // First, get the ID of the row we want to update (the first one)
        const { data: existing } = await supabase.from('app_settings').select('id').limit(1).single();

        let error;
        if (existing) {
            const { error: updateError } = await supabase.from('app_settings').update(dbUpdates).eq('id', existing.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase.from('app_settings').insert(dbUpdates);
            error = insertError;
        }

        if (error) { console.error("Error updating settings DB:", error); setError(error.message); }
    };

    const resetData = () => {
        window.location.reload();
    };

    return (
        <DataContext.Provider value={{
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
            loading,
            error
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
