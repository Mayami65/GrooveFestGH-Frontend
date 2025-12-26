import { Link } from 'react-router-dom';

export default function Tickets() {
    const tickets = [
        {
            type: "Regular",
            price: "GHS 50",
            features: [
                "Live performance access",
                "Basketball tournament",
                "Dance battle",
                "Gaming competition",
                "Football tournament"
            ],
            color: "border-blue-500",
            btnColor: "bg-blue-600 hover:bg-blue-700"
        },
        {
            type: "VIP",
            price: "GHS 100",
            features: [
                "🎁 Chance to win GHS 500 prize!",
                "All Regular benefits",
                "Priority entry",
                "Premium experience"
            ],
            color: "border-purple-500",
            scale: "scale-105",
            btnColor: "bg-purple-600 hover:bg-purple-700",
            popular: true
        }
    ];

    return (
        <section id="tickets" className="py-20 bg-[#0F0F13] relative overflow-hidden">
            <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <h3 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
                    Secure Your Spot
                </h3>

                <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
                    {tickets.map((ticket, index) => (
                        <div key={index} className={`relative p-8 rounded-3xl bg-surface border ${ticket.color} ${ticket.popular ? 'border-2 transform md:-translate-y-4 shadow-[0_0_50px_rgba(168,85,247,0.2)]' : 'border-opacity-30'} flex flex-col h-full hover:bg-white/5 transition-colors duration-300`}>
                            {ticket.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}
                            <h4 className="text-xl font-medium text-gray-400 mb-4">{ticket.type}</h4>
                            <div className="text-4xl font-bold text-white mb-8">{ticket.price}</div>

                            <ul className="grow space-y-4 mb-8">
                                {ticket.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-gray-300">
                                        <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link to="/buy-tickets" className="w-full">
                                <button className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 ${ticket.btnColor}`}>
                                    Purchase Ticket
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
