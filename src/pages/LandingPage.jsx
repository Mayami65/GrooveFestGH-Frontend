import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Schedule from '../components/Schedule';
import Tickets from '../components/Tickets';
import Footer from '../components/Footer';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white">
            <Navbar />
            <Hero />
            <Schedule />
            <Tickets />
            <Footer />
        </div>
    )
}
