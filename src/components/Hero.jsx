import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0F0F13]">
            {/* Background Gradient Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000"></div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <h2 className="text-lg md:text-2xl tracking-[0.3em] font-medium text-blue-300 mb-4 uppercase animate-fade-in-up">
                    KELSHEK Presents
                </h2>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 mb-6 drop-shadow-2xl animate-fade-in-up delay-200">
                    GROOVE <br className="hidden md:block" /> FESTGH
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light animate-fade-in-up delay-400">
                    December 30th, 2024 • Legon Campus - Rugby Court • 9:00 AM
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center animate-fade-in-up delay-500">
                    <Link to="/buy-tickets">
                        <button className="relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden group hover:scale-105 transition-transform duration-300">
                            <span className="relative z-10">Get Tickets Now</span>
                            <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">Get Tickets Now</span>
                        </button>
                    </Link>
                    <a href="#schedule" className="px-8 py-4 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors backdrop-blur-sm">
                        View Lineup
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </section>
    );
}
