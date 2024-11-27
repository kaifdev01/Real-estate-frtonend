import { Key, Home, Star, Users, ShieldCheck, Zap, ZapOff, Sparkles, Landmark } from 'lucide-react'

export default function AboutUs() {
    return (
        <section className="bg-gray-900 text-gray-100 py-24 ">
            <div className="container px-4 max-w-[85%] mx-auto">
                <h2 className="text-4xl font-heading text-center mb-12 text-gold">About Crystal Estate</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-lg leading-relaxed">
                            At Crystal Estate Properties, we specialize in connecting people with the perfect real estate opportunities in Lahore and across Pakistan. Whether you're looking for residential, commercial, or investment properties, our team is here to guide you every step of the way.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Our experts bring years of experience in understanding the local property market and trends. We are committed to offering personalized services, ensuring that every client finds the best solution that meets their needs.
                        </p>
                        <p className="text-lg leading-relaxed">
                            With our deep knowledge of Lahore’s neighborhoods and Pakistan’s real estate laws, we help you make informed decisions and secure the best deals. Trust us to provide reliable, professional, and friendly services to help you achieve your property goals.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6 sm:grid-cols-1">
                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                            <ShieldCheck className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
                            <p>Access a wide range of trusted and genuine properties in Lahore and other major cities.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                            <Zap className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Tailored Solutions</h3>
                            <p>Get customized advice and services based on your property needs.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                            <Sparkles className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Market Experts</h3>
                            <p>Benefit from our in-depth knowledge of Lahore’s real estate market and upcoming opportunities.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                            <Landmark className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                            <p>We ensure every deal is transparent, legal, and hassle-free for buyers and sellers.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}