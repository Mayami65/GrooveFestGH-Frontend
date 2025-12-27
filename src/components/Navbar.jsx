import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-black/30 backdrop-blur-md">
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                        Groove FestGH
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link to="/buy-tickets">
                        <button type="button" className="text-white bg-linear-to-r from-primary to-secondary hover:from-blue-600 hover:to-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2.5 text-center transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/30">
                            Get Tickets
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
