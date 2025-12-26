import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function PaymentCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('verifying');
    const [ticketData, setTicketData] = useState(null);

    useEffect(() => {
        const reference = searchParams.get('reference');

        if (!reference) {
            setStatus('error');
            return;
        }

        // Verify payment
        fetch(`https://backend.test/api/tickets/verify/${reference}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStatus('success');
                    setTicketData(data.data);
                    // Redirect to confirmation after 2 seconds
                    setTimeout(() => {
                        navigate('/confirmation', {
                            state: {
                                name: data.data.name,
                                ticketType: data.data.ticket_type,
                                quantity: data.data.quantity,
                                total: data.data.total_amount,
                                reference: data.data.paystack_reference
                            }
                        });
                    }, 2000);
                } else {
                    setStatus('failed');
                }
            })
            .catch(err => {
                console.error(err);
                setStatus('error');
            });
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-background text-white bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
            <Navbar />

            <div className="pt-32 pb-20 px-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
                <div className="bg-surface/50 backdrop-blur-md p-12 rounded-3xl border border-white/10 max-w-md w-full text-center">

                    {status === 'verifying' && (
                        <>
                            <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                            <h1 className="text-2xl font-bold mb-2">Verifying Payment...</h1>
                            <p className="text-gray-400">Please wait while we confirm your payment</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold mb-2 text-green-500">Payment Successful!</h1>
                            <p className="text-gray-400">Redirecting to your ticket...</p>
                        </>
                    )}

                    {status === 'failed' && (
                        <>
                            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold mb-2 text-red-500">Payment Failed</h1>
                            <p className="text-gray-400 mb-6">Your payment could not be verified</p>
                            <button
                                onClick={() => navigate('/buy-tickets')}
                                className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                            >
                                Try Again
                            </button>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold mb-2 text-yellow-500">Something Went Wrong</h1>
                            <p className="text-gray-400 mb-6">Unable to verify payment</p>
                            <button
                                onClick={() => navigate('/')}
                                className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                            >
                                Go Home
                            </button>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}
