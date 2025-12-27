import { useState, useEffect, useRef, useCallback } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import AdminLayout from '../../components/admin/AdminLayout';
import { getApiUrl } from '../../config';

export default function AdminScanner() {
    const [scanResult, setScanResult] = useState(null);
    const [manualCode, setManualCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('manual'); // Start with manual mode
    const [scannerError, setScannerError] = useState(null);
    const scannerRef = useRef(null);
    const scannerInitialized = useRef(false);
    const admin = JSON.parse(localStorage.getItem('admin_user') || '{}');

    const verifyTicket = useCallback(async (data, type) => {
        setLoading(true);
        setScanResult(null);

        try {
            const endpoint = type === 'qr'
                ? getApiUrl('/api/admin/tickets/scan')
                : getApiUrl('/api/admin/tickets/verify-code');

            const body = type === 'qr'
                ? { qr_data: data, scanned_by: admin.name }
                : { code: data, scanned_by: admin.name };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const result = await response.json();

            // Show result even if it's an error
            setScanResult(result);

            if (type === 'qr' && scannerRef.current && result.success) {
                setTimeout(() => {
                    scannerRef.current.resume();
                    setScanResult(null);
                }, 5000); // Display result for 5 seconds
            } else if (type === 'qr' && scannerRef.current && !result.success) {
                // For errors, resume scanner after 3 seconds
                setTimeout(() => {
                    scannerRef.current.resume();
                    setScanResult(null);
                }, 3000);
            }
        } catch (err) {
            setScanResult({
                success: false,
                message: 'Connection error. Please check your network.',
                error: err.message
            });

            // Resume scanner after error
            if (type === 'qr' && scannerRef.current) {
                setTimeout(() => {
                    scannerRef.current.resume();
                    setScanResult(null);
                }, 3000);
            }
        } finally {
            setLoading(false);
        }
    }, [admin.name]);

    const onScanSuccess = useCallback(async (decodedText) => {
        if (scannerRef.current) {
            scannerRef.current.pause();
        }
        await verifyTicket(decodedText, 'qr');
    }, [verifyTicket]);

    const onScanError = useCallback(() => {
        // Ignore scan errors - they happen frequently during scanning
    }, []);

    useEffect(() => {
        let timeoutId;

        if (mode === 'qr' && !scannerInitialized.current) {
            setScannerError(null);

            // Wait for DOM to be ready
            timeoutId = setTimeout(() => {
                const element = document.getElementById('qr-reader');

                if (!element) {
                    setScannerError('Camera initialization failed. Please use manual entry.');
                    return;
                }

                try {
                    const scanner = new Html5QrcodeScanner('qr-reader', {
                        qrbox: { width: 250, height: 250 },
                        fps: 5,
                    });

                    scanner.render(onScanSuccess, onScanError);
                    scannerRef.current = scanner;
                    scannerInitialized.current = true;
                } catch (err) {
                    console.error('Scanner initialization error:', err);
                    setScannerError('Failed to start camera. Please check permissions or use manual entry.');
                }
            }, 100);
        }

        return () => {
            clearTimeout(timeoutId);
            if (scannerRef.current && scannerInitialized.current) {
                try {
                    scannerRef.current.clear();
                } catch (err) {
                    console.error('Scanner cleanup error:', err);
                }
                scannerRef.current = null;
                scannerInitialized.current = false;
            }
        };
    }, [mode, onScanSuccess, onScanError]);

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (manualCode.trim()) {
            verifyTicket(manualCode.trim(), 'manual');
            setManualCode('');
        }
    };

    return (
        <AdminLayout>
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Ticket Scanner</h1>

                {/* Mode Toggle */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <button
                        onClick={() => setMode('qr')}
                        className={`px-6 py-3 rounded-xl font-medium transition-colors ${mode === 'qr' ? 'bg-primary text-white' : 'bg-surface text-gray-400'
                            }`}
                    >
                        📷 QR Scanner
                    </button>
                    <button
                        onClick={() => setMode('manual')}
                        className={`px-6 py-3 rounded-xl font-medium transition-colors ${mode === 'manual' ? 'bg-primary text-white' : 'bg-surface text-gray-400'
                            }`}
                    >
                        ⌨️ Manual Entry
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Scanner/Input Area */}
                    <div className="bg-surface/50 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                        {scannerError && mode === 'qr' && (
                            <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl text-yellow-500">
                                <div className="font-medium mb-1">⚠️ Scanner Error</div>
                                <div className="text-sm">{scannerError}</div>
                            </div>
                        )}

                        {mode === 'qr' ? (
                            <div>
                                <div id="qr-reader" className="w-full"></div>
                                <div className="mt-4 text-sm text-gray-400 text-center">
                                    Point camera at QR code to scan
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleManualSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Enter Payment Reference
                                    </label>
                                    <input
                                        type="text"
                                        value={manualCode}
                                        onChange={(e) => setManualCode(e.target.value)}
                                        placeholder="TKT-2C3A7DB4F8E9A2"
                                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Verifying...' : 'Verify Ticket'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Result Area */}
                    <div className="bg-surface/50 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                        <h2 className="text-xl font-bold mb-4">Scan Result</h2>

                        {loading && (
                            <div className="text-center py-8 text-gray-400">
                                Verifying...
                            </div>
                        )}

                        {scanResult && !loading && (
                            <div className={`p-6 rounded-xl ${scanResult.success ? 'bg-green-500/10 border border-green-500/50' : 'bg-red-500/10 border border-red-500/50'
                                }`}>
                                <div className="text-center mb-4">
                                    <div className="text-4xl mb-2">
                                        {scanResult.success ? '✅' : '❌'}
                                    </div>
                                    <div className={`text-xl font-bold ${scanResult.success ? 'text-green-500' : 'text-red-500'}`}>
                                        {scanResult.message}
                                    </div>
                                </div>

                                {scanResult.data && (
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Name:</span>
                                            <span className="font-medium">{scanResult.data.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Type:</span>
                                            <span className="font-medium">{scanResult.data.ticket_type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Quantity:</span>
                                            <span className="font-medium">{scanResult.data.quantity}</span>
                                        </div>
                                        {scanResult.data.scanned_at && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Scanned:</span>
                                                    <span className="font-medium">{new Date(scanResult.data.scanned_at).toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">By:</span>
                                                    <span className="font-medium">{scanResult.data.scanned_by}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {!scanResult && !loading && (
                            <div className="text-center py-8 text-gray-400">
                                {mode === 'qr' ? 'Scan a QR code to verify ticket' : 'Enter a payment reference to verify'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
