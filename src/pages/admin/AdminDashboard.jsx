import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('https://backend.test/api/admin/dashboard/stats');
            const data = await response.json();
            if (data.success) {
                setStats(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-400">Loading...</div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Tickets"
                        value={stats?.total_tickets || 0}
                        icon="🎫"
                        color="blue"
                    />
                    <StatCard
                        title="Total Revenue"
                        value={`GHS ${stats?.total_revenue || 0}`}
                        icon="💰"
                        color="green"
                    />
                    <StatCard
                        title="Scanned"
                        value={stats?.scanned_tickets || 0}
                        icon="✅"
                        color="purple"
                    />
                    <StatCard
                        title="Pending Scan"
                        value={stats?.unscanned_tickets || 0}
                        icon="⏳"
                        color="yellow"
                    />
                </div>

                {/* Ticket Type Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-surface/50 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                        <h2 className="text-xl font-bold mb-4">Ticket Types</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Regular</span>
                                <span className="text-2xl font-bold">{stats?.regular_tickets || 0}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">VIP</span>
                                <span className="text-2xl font-bold text-purple-500">{stats?.vip_tickets || 0}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface/50 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                        <h2 className="text-xl font-bold mb-4">Scan Progress</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400">Scanned</span>
                                    <span>{stats?.scanned_tickets || 0} / {stats?.total_tickets || 0}</span>
                                </div>
                                <div className="w-full bg-black/30 rounded-full h-3">
                                    <div
                                        className="bg-green-500 h-3 rounded-full transition-all"
                                        style={{
                                            width: `${stats?.total_tickets > 0 ? (stats.scanned_tickets / stats.total_tickets) * 100 : 0}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Tickets */}
                <div className="bg-surface/50 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                    <h2 className="text-xl font-bold mb-4">Recent Tickets</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-400 border-b border-white/10">
                                    <th className="pb-3">Name</th>
                                    <th className="pb-3">Type</th>
                                    <th className="pb-3">Quantity</th>
                                    <th className="pb-3">Amount</th>
                                    <th className="pb-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats?.recent_tickets?.map((ticket) => (
                                    <tr key={ticket.id} className="border-b border-white/5">
                                        <td className="py-3">{ticket.name}</td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${ticket.ticket_type === 'VIP' ? 'bg-purple-500/20 text-purple-500' : 'bg-blue-500/20 text-blue-500'
                                                }`}>
                                                {ticket.ticket_type}
                                            </span>
                                        </td>
                                        <td className="py-3">{ticket.quantity}</td>
                                        <td className="py-3">GHS {ticket.total_amount}</td>
                                        <td className="py-3">
                                            {ticket.scanned_at ? (
                                                <span className="text-green-500">✅ Scanned</span>
                                            ) : (
                                                <span className="text-yellow-500">⏳ Pending</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function StatCard({ title, value, icon, color }) {
    const colors = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        purple: 'from-purple-500 to-purple-600',
        yellow: 'from-yellow-500 to-yellow-600',
    };

    return (
        <div className="bg-surface/50 backdrop-blur-md p-6 rounded-3xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{title}</span>
                <span className="text-2xl">{icon}</span>
            </div>
            <div className={`text-3xl font-bold bg-linear-to-r ${colors[color]} bg-clip-text text-transparent`}>
                {value}
            </div>
        </div>
    );
}
