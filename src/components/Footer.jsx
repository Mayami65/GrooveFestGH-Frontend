export default function Footer() {
    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                        Groove FestGH
                    </span>
                    <p className="text-gray-500 text-sm mt-2">© 2024 Groove FestGH. All rights reserved.</p>
                    <p className="text-gray-400 text-sm mt-1">For more information: <a href="tel:0541913967" className="text-primary hover:text-secondary">0541913967</a></p>
                </div>

                <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                </div>
            </div>
        </footer>
    );
}
