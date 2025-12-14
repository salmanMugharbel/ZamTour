
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useData } from '../DataContext';
import { useLanguage } from '../LanguageContext';

const Payment: React.FC = () => {
    const { t, isRTL } = useLanguage();
    const { packages } = useData();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get('id');

    const pkg = packages.find(p => p.id === id);

    const [extras, setExtras] = useState({
        insurance: false,
        airportTransfer: false,
        simCard: false,
    });

    if (!pkg) {
        return <div className="text-white text-center pt-40">Package not found</div>;
    }

    const EXTRA_PRICES = {
        insurance: 50,
        airportTransfer: 30,
        simCard: 15,
    };

    const toggleExtra = (key: keyof typeof extras) => {
        setExtras(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const calculateTotal = () => {
        let total = pkg.price;
        if (extras.insurance) total += EXTRA_PRICES.insurance;
        if (extras.airportTransfer) total += EXTRA_PRICES.airportTransfer;
        if (extras.simCard) total += EXTRA_PRICES.simCard;
        return total;
    };

    const total = calculateTotal();

    // PayPal Options
    const initialOptions = {
        clientId: "ASQSS_ehNfDsW_ah0PfzCeUu6upXAwTzV451WJJFaZaN1a8hjzGGcQ1hgelMCDlAJR0QkaDeSMZ9Z4js",
        currency: "USD",
        intent: "capture",
    };

    return (
        <div className="w-full pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="text-gray-400 hover:text-gold-400 mb-6 flex items-center gap-2"
            >
                <span className="iconify" data-icon={isRTL ? "solar:arrow-right-linear" : "solar:arrow-left-linear"}></span> Back
            </button>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Confirm Your Booking</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="bg-[#1B1464]/80 p-6 rounded-2xl border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-4">{pkg.title}</h2>
                    <p className="text-gray-300 text-sm mb-6">{pkg.subtitle}</p>

                    <div className="flex justify-between text-gray-300 mb-2">
                        <span>Base Price</span>
                        <span>${pkg.price}</span>
                    </div>

                    <div className="border-t border-white/10 my-4 pt-4">
                        <h3 className="text-gold-400 font-bold mb-3">Add-ons</h3>

                        <div className="space-y-3">
                            <label className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${extras.insurance ? 'bg-gold-400 border-gold-400' : 'border-gray-500'}`}>
                                        {extras.insurance && <span className="iconify text-[#1B1464]" data-icon="solar:check-read-linear"></span>}
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors">Travel Insurance</span>
                                </div>
                                <span className="text-white">+${EXTRA_PRICES.insurance}</span>
                                <input type="checkbox" className="hidden" onChange={() => toggleExtra('insurance')} />
                            </label>

                            <label className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${extras.airportTransfer ? 'bg-gold-400 border-gold-400' : 'border-gray-500'}`}>
                                        {extras.airportTransfer && <span className="iconify text-[#1B1464]" data-icon="solar:check-read-linear"></span>}
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors">Airport Transfer</span>
                                </div>
                                <span className="text-white">+${EXTRA_PRICES.airportTransfer}</span>
                                <input type="checkbox" className="hidden" onChange={() => toggleExtra('airportTransfer')} />
                            </label>

                            <label className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${extras.simCard ? 'bg-gold-400 border-gold-400' : 'border-gray-500'}`}>
                                        {extras.simCard && <span className="iconify text-[#1B1464]" data-icon="solar:check-read-linear"></span>}
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors">5G Sim Card</span>
                                </div>
                                <span className="text-white">+${EXTRA_PRICES.simCard}</span>
                                <input type="checkbox" className="hidden" onChange={() => toggleExtra('simCard')} />
                            </label>
                        </div>
                    </div>

                    <div className="border-t border-white/10 mt-6 pt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-white">Total</span>
                        <span className="text-2xl font-bold text-gold-400">${total}</span>
                    </div>
                </div>

                {/* Payment Section */}
                <div className="bg-white p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Method</h3>

                    <div className="mb-6 bg-blue-50 p-4 rounded-xl text-sm text-blue-800">
                        <p className="font-bold mb-1">PayPal Sandbox Mode</p>
                        <p>You can use a sandbox account to test this transaction.</p>
                    </div>

                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    intent: "CAPTURE",
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code: "USD",
                                                value: total.toString(),
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                if (actions.order) {
                                    return actions.order.capture().then((details) => {
                                        alert("Transaction completed by " + (details.payer?.name?.given_name ?? 'User'));
                                    });
                                }
                            }}
                        />
                    </PayPalScriptProvider>
                </div>
            </div>
        </div>
    );
};

export default Payment;
