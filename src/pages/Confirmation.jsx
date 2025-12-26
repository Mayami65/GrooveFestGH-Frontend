import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import QRCode from 'react-qr-code';
import { jsPDF } from 'jspdf';
import QRCodeLib from 'qrcode';

export default function Confirmation() {
    const location = useLocation();
    const state = location.state || {
        name: "Guest User",
        ticketType: "Regular",
        quantity: 1,
        total: 50
    };

    const downloadTicket = async () => {
        try {
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Background
            pdf.setFillColor(26, 26, 47);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');

            // Header gradient bar (solid color replacement)
            pdf.setFillColor(99, 102, 241);
            pdf.rect(0, 0, pageWidth, 10, 'F');

            // Title
            pdf.setFontSize(28);
            pdf.setTextColor(99, 102, 241);
            pdf.text('GROOVE FESTGH 2025', pageWidth / 2, 30, { align: 'center' });

            // Success message
            pdf.setFontSize(20);
            pdf.setTextColor(34, 197, 94);
            pdf.text('Order Confirmed!', pageWidth / 2, 45, { align: 'center' });

            // Ticket details box
            pdf.setFillColor(30, 30, 45);
            pdf.roundedRect(20, 55, pageWidth - 40, 80, 3, 3, 'F');

            // Ticket details
            pdf.setFontSize(12);
            pdf.setTextColor(156, 163, 175);

            let yPos = 70;
            const leftMargin = 30;

            pdf.text('Name:', leftMargin, yPos);
            pdf.setTextColor(255, 255, 255);
            pdf.text(state.name, leftMargin + 60, yPos);

            yPos += 12;
            pdf.setTextColor(156, 163, 175);
            pdf.text('Ticket Type:', leftMargin, yPos);
            pdf.setTextColor(255, 255, 255);
            pdf.text(state.ticketType, leftMargin + 60, yPos);

            yPos += 12;
            pdf.setTextColor(156, 163, 175);
            pdf.text('Quantity:', leftMargin, yPos);
            pdf.setTextColor(255, 255, 255);
            pdf.text(String(state.quantity), leftMargin + 60, yPos);

            yPos += 12;
            pdf.setTextColor(156, 163, 175);
            pdf.text('Payment Ref:', leftMargin, yPos);
            pdf.setTextColor(234, 179, 8);
            pdf.setFontSize(10);
            pdf.text(state.reference || 'PENDING', leftMargin + 60, yPos);

            // Total
            pdf.setFontSize(16);
            pdf.setTextColor(156, 163, 175);
            yPos += 20;
            pdf.text('Total Paid:', leftMargin, yPos);
            pdf.setTextColor(168, 85, 247);
            pdf.text(`GHS ${state.total}`, leftMargin + 60, yPos);

            // QR Code section
            const qrValue = `GROOVE|${state.ticketType}|${state.name}|${state.reference || 'PENDING'}`;

            // Generate QR code as data URL
            const qrDataUrl = await QRCodeLib.toDataURL(qrValue, {
                width: 200,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            pdf.setFontSize(14);
            pdf.setTextColor(255, 255, 255);
            pdf.text('Entry QR Code', pageWidth / 2, 150, { align: 'center' });

            // Add actual QR code image
            pdf.addImage(qrDataUrl, 'PNG', pageWidth / 2 - 30, 160, 60, 60);

            // Footer
            pdf.setFontSize(10);
            pdf.setTextColor(156, 163, 175);
            pdf.text('Show this ticket at the entrance', pageWidth / 2, 235, { align: 'center' });
            pdf.text('Groove FestGH 2025 - See you there!', pageWidth / 2, 245, { align: 'center' });

            // Download
            pdf.save(`GrooveFestGH-Ticket-${state.reference || 'TICKET'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to download ticket. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-background text-white bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
            <Navbar />

            <div className="pt-32 pb-20 px-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
                <div className="bg-surface/50 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 max-w-lg w-full text-center relative overflow-hidden group">

                    {/* Confetti/Success Decoration */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary to-secondary"></div>

                    <div className="mb-8 flex justify-center">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center animate-bounce">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                    <p className="text-gray-400 mb-8">See you at Groove FestGH 2025</p>

                    <div className="bg-black/30 rounded-2xl p-6 mb-8 border border-white/5 text-left">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Name</span>
                            <span className="font-medium">{state.name}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Ticket Type</span>
                            <span className="font-medium">{state.ticketType}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Quantity</span>
                            <span className="font-medium">{state.quantity}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Payment Ref</span>
                            <span className="font-mono text-sm text-yellow-500">{state.reference || 'PENDING'}</span>
                        </div>
                        <div className="border-t border-white/10 my-4"></div>
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total Paid</span>
                            <span className="text-secondary">GHS {state.total}</span>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl inline-block mb-8">
                        <QRCode
                            value={`GROOVE|${state.ticketType}|${state.name}|${state.reference || 'PENDING'}`}
                            size={150}
                        />
                    </div>
                    <p className="text-sm text-gray-500 mb-8">Show this QR code at the entrance</p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={downloadTicket}
                            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Download Ticket (PDF)
                        </button>
                        <Link to="/">
                            <button className="w-full py-3 rounded-xl font-medium text-gray-400 hover:text-white transition-colors">
                                Back to Home
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
