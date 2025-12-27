import { useState } from 'react';
import Navbar from '../components/Navbar';
import { getApiUrl } from '../config';

export default function TicketPurchase() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        ticketType: 'Regular',
        quantity: 1
    });

    const ticketPrices = {
        'Regular': 50,
        'VIP': 100
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const total = ticketPrices[formData.ticketType] * formData.quantity;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? parseInt(value) || 1 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const ticketData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            ticket_type: formData.ticketType,
            quantity: formData.quantity,
        };

        try {
            const response = await fetch(getApiUrl('/api/tickets'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(ticketData),
            });

            if (!response.ok) {
                throw new Error('Failed to initialize payment. Please try again.');
            }

            const result = await response.json();
            console.log("Payment initialized:", result);

            if (result.success && result.data.authorization_url) {
                // Redirect to Paystack checkout
                window.location.href = result.data.authorization_url;
            } else {
                throw new Error('Payment initialization failed');
            }

        } catch (err) {
            console.error(err);
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-white bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
            <Navbar />

            <div className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

                    {/* Order Summary */}
                    <div className="order-2 md:order-1">
                        <div className="bg-surface/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 sticky top-32">
                            <h2 className="text-2xl font-bold mb-6 text-primary">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                    <div>
                                        <span className="block font-medium text-white">{formData.ticketType} Ticket</span>
                                        <span className="text-sm text-gray-400">GHS {ticketPrices[formData.ticketType]} x {formData.quantity}</span>
                                    </div>
                                    <span className="font-bold text-xl">GHS {total}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-xl font-bold pt-2">
                                <span>Total</span>
                                <span className="text-secondary">GHS {total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="order-1 md:order-2">
                        <div className="bg-surface p-8 rounded-3xl border border-white/10">
                            <h1 className="text-3xl font-bold mb-8">Secure Tickets</h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        placeholder="055 123 4567"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Ticket Type</label>
                                        <div className="relative">
                                            <select
                                                name="ticketType"
                                                value={formData.ticketType}
                                                onChange={handleChange}
                                                className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                                            >
                                                <option value="Regular">Regular</option>
                                                <option value="VIP">VIP</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Quantity</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            min="1"
                                            max="10"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    {error && (
                                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-4 text-sm">
                                            {error}
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-linear-to-r from-primary to-secondary hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Processing...' : 'Proceed to Payment'}
                                    </button>
                                    <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                        Secured via Mobile Money
                                    </p>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
