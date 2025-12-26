export default function Schedule() {
    const activities = [
        {
            id: 1,
            title: "Live Performance",
            time: "Main Stage",
            desc: "Live performance from a top artist",
            image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop",
            colSpan: "col-span-12 md:col-span-8",
        },
        {
            id: 2,
            title: "Basketball Tournament",
            time: "Sports Arena",
            desc: "Compete in our exciting basketball tournament",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop",
            colSpan: "col-span-12 md:col-span-4",
        },
        {
            id: 3,
            title: "Dance Battle",
            time: "Dance Floor",
            desc: "Show off your moves in the ultimate dance battle",
            image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1000&auto=format&fit=crop",
            colSpan: "col-span-12 md:col-span-4",
        },
        {
            id: 4,
            title: "Gaming Showdown",
            time: "Gaming Zone",
            desc: "Gaming showdown and competition with amazing prizes",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
            colSpan: "col-span-12 md:col-span-4",
        },
        {
            id: 5,
            title: "Football Tournament",
            time: "Rugby Court",
            desc: "Join the football tournament and compete for glory",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop",
            colSpan: "col-span-12 md:col-span-4",
        },
    ];

    return (
        <section id="schedule" className="py-20 bg-background relative z-10">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-3xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                    Event Lineup
                </h3>

                <div className="grid grid-cols-12 gap-6">
                    {activities.map((item) => (
                        <div key={item.id} className={`${item.colSpan} relative group overflow-hidden rounded-3xl h-64 md:h-80 cursor-pointer`}>
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
                                <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-black bg-accent rounded-full w-fit">
                                    {item.time}
                                </span>
                                <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                                <p className="text-gray-300 text-sm opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
