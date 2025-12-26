import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [admin] = useState(() => {
        const adminData = localStorage.getItem('admin_user');
        return adminData ? JSON.parse(adminData) : null;
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const adminData = localStorage.getItem('admin_user');
        const token = localStorage.getItem('admin_token');

        if (!adminData || !token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        navigate('/admin/login');
    };

    const isActive = (path) => location.pathname === path;

    if (!admin) return null;

    return (
        <div className="min-h-screen bg-background text-white">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-surface border-b border-white/10 p-4 z-50">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                        Groove FestGH
                    </h1>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 hover:bg-white/5 rounded-lg text-2xl"
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-full w-64 bg-surface border-r border-white/10 p-6 z-40 transition-transform lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="mb-8 mt-16 lg:mt-0">
                    <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                        Groove FestGH
                    </h1>
                    <p className="text-sm text-gray-400">Admin Portal</p>
                </div>

                <nav className="space-y-2">
                    <Link
                        to="/admin/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-xl transition-colors ${isActive('/admin/dashboard')
                                ? 'bg-primary text-white'
                                : 'text-gray-400 hover:bg-white/5'
                            }`}
                    >
                        📊 Dashboard
                    </Link>
                    <Link
                        to="/admin/tickets"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-xl transition-colors ${isActive('/admin/tickets')
                                ? 'bg-primary text-white'
                                : 'text-gray-400 hover:bg-white/5'
                            }`}
                    >
                        🎫 Tickets
                    </Link>
                    <Link
                        to="/admin/scanner"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-xl transition-colors ${isActive('/admin/scanner')
                                ? 'bg-primary text-white'
                                : 'text-gray-400 hover:bg-white/5'
                            }`}
                    >
                        📷 Scanner
                    </Link>
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/5 rounded-xl p-4 mb-4">
                        <p className="text-sm text-gray-400">Logged in as</p>
                        <p className="font-medium truncate">{admin.name}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Overlay for mobile */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
                {children}
            </div>
        </div>
    );
}
