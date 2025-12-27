import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getApiUrl } from '../../config';

export default function AdminTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({ type: '', scanned: '' });

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (filter.type) params.append('ticket_type', filter.type);
            if (filter.scanned) params.append('scanned', filter.scanned);

            const response = await fetch(getApiUrl(`/api/admin/tickets?${params}`));
            const data = await response.json();
            if (data.success) {
                setTickets(data.data.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch tickets:', err);
        } finally {
            setLoading(false);
        }
    }, [search, filter.type, filter.scanned]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleExport = async () => {
        window.open(getApiUrl('/api/admin/tickets/export'), '_blank');
    };

    return (
        <AdminLayout>
            <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold">Ticket Management</h1>
                    <button
                        onClick={handleExport}
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors w-full sm:w-auto"
                    >
                        📥 Export CSV
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-surface/50 backdrop-blur-md p-6 rounded-3xl border border-white/10 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Name, email, phone, or reference..."
                                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Ticket Type
                            </label>
                            <select
                                value={filter.type}
                                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                            >
                                <option value="">All Types</option>
                                <option value="Regular">Regular</option>
                                <option value="VIP">VIP</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Scan Status
                            </label>
                            <select
                                value={filter.scanned}
                                onChange={(e) => setFilter({ ...filter, scanned: e.target.value })}
                                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                            >
                                <option value="">All Tickets</option>
                                <option value="true">Scanned</option>
                                <option value="false">Not Scanned</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tickets Table */}
                <div className="bg-surface/50 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-400">Loading tickets...</div>
                    ) : tickets.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">No tickets found</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-black/30">
                                    <tr className="text-left text-gray-400">
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Phone</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Qty</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Reference</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Purchased</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket) => (
                                        <tr key={ticket.id} className="border-t border-white/5 hover:bg-white/5">
                                            <td className="px-6 py-4">{ticket.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-400">{ticket.email}</td>
                                            <td className="px-6 py-4 text-sm text-gray-400">{ticket.phone}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${ticket.ticket_type === 'VIP'
                                                    ? 'bg-purple-500/20 text-purple-500'
                                                    : 'bg-blue-500/20 text-blue-500'
                                                    }`}>
                                                    {ticket.ticket_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{ticket.quantity}</td>
                                            <td className="px-6 py-4 font-medium">GHS {ticket.total_amount}</td>
                                            <td className="px-6 py-4">
                                                <code className="text-xs text-yellow-500">{ticket.paystack_reference}</code>
                                            </td>
                                            <td className="px-6 py-4">
                                                {ticket.scanned_at ? (
                                                    <div>
                                                        <div className="text-green-500 text-sm">✅ Scanned</div>
                                                        <div className="text-xs text-gray-500">
                                                            {new Date(ticket.scanned_at).toLocaleDateString()}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            by {ticket.scanned_by}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-yellow-500 text-sm">⏳ Pending</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400">
                                                {new Date(ticket.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div className="mt-6 text-center text-gray-400">
                    Showing {tickets.length} ticket{tickets.length !== 1 ? 's' : ''}
                </div>
            </div>
        </AdminLayout>
    );
}
