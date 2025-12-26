import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TicketPurchase from './pages/TicketPurchase';
import Confirmation from './pages/Confirmation';
import PaymentCallback from './pages/PaymentCallback';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminScanner from './pages/admin/AdminScanner';
import AdminTickets from './pages/admin/AdminTickets';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/buy-tickets',
        element: <TicketPurchase />,
    },
    {
        path: '/payment/callback',
        element: <PaymentCallback />,
    },
    {
        path: '/confirmation',
        element: <Confirmation />,
    },
    {
        path: '/admin/login',
        element: <AdminLogin />,
    },
    {
        path: '/admin/dashboard',
        element: <AdminDashboard />,
    },
    {
        path: '/admin/tickets',
        element: <AdminTickets />,
    },
    {
        path: '/admin/scanner',
        element: <AdminScanner />,
    },
]);

export default router;
