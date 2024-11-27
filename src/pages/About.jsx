import { useState, useEffect, useRef } from 'react'
import { MapPin, Phone, Mail, Clock, ChevronDown, Star, Users, Home } from 'lucide-react'
import about from "/about.jpg"

const stats = [
    { icon: <Home className="w-8 h-8" />, value: '1000+', label: 'Properties Sold' },
    { icon: <Users className="w-8 h-8" />, value: '5000+', label: 'Happy Clients' },
    { icon: <Star className="w-8 h-8" />, value: '15+', label: 'Years Experience' },
]

const teamMembers = [
    { name: "John Doe", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", bio: "With over 20 years in real estate, John's vision drives our success." },
    { name: "Jane Smith", role: "Lead Real Estate Agent", image: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", bio: "Jane's market insights have helped countless families find their dream homes." },
    { name: "Mike Johnson", role: "Property Manager", image: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", bio: "Mike ensures our properties are always in top condition for our clients." },
]

export default function AdvancedAboutUs() {
    const [scrollY, setScrollY] = useState(0)
    const [activeTab, setActiveTab] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const statsRef = useRef(null)
    const heroRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {

            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {

            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.5 })

        if (statsRef.current) {
            observer.observe(statsRef.current)
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current)
            }
        }
    }, [])
    return (
        <div className="min-h-screen bg-gray-50 ">
            {/* Hero Section with Parallax Effect */}
            <section
                ref={heroRef}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                <div
                    className="absolute w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                        transform: `translateY(${scrollY * 0.3}px)`, // Parallax effect
                        transition: 'transform 0.5s ease-out',
                    }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in-up">
                        Crystal Real Estate
                    </h1>
                    <p className="text-xl md:text-2xl text-white mb-8 animate-fade-in-up animation-delay-300">
                        Where Dreams Become Addresses
                    </p>
                    <a
                        href="#about"
                        className="inline-block bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300 animate-fade-in-up animation-delay-600"
                    >
                        Discover Our Story
                    </a>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-10 h-10 text-white" />
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-heading">Our Story</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-lg text-gray-700 mb-6 font-body">
                                Founded in 2008, Crystal Real Estate has grown from a small family business to one of the most trusted names in property. Our journey is one of passion, perseverance, and an unwavering commitment to our clients.
                            </p>
                            <p className="text-lg text-gray-700 font-body">
                                We believe that finding the perfect property is about more than just four walls and a roof—it's about discovering a place where memories are made and dreams come to life. This belief drives everything we do.
                            </p>
                        </div>
                        <div className="relative h-96">
                            <img
                                src={about}
                                alt="Crystal Real Estate Office"
                                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className="py-20 px-4 md:px-8 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="mb-4 flex justify-center">{stat.icon}</div>
                                <div className={`text-4xl font-bold mb-2 ${isVisible ? 'animate-count-up' : ''}`}>
                                    {isVisible ? stat.value : '0'}
                                </div>
                                <div className="text-xl text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section with Tabs */}
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-heading">Meet Our Team</h2>
                    <div className="flex justify-center mb-8">
                        {teamMembers.map((member, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 mx-2 rounded-full ${activeTab === index
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    } transition duration-300`}
                                onClick={() => setActiveTab(index)}
                            >
                                {member.name}
                            </button>
                        ))}
                    </div>
                    <div className="bg-white rounded-lg shadow-xl p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <img
                                src={teamMembers[activeTab].image}
                                alt={teamMembers[activeTab].name}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                            <div>
                                <h3 className="text-2xl font-semibold mb-2">{teamMembers[activeTab].name}</h3>
                                <p className="text-blue-500 mb-4">{teamMembers[activeTab].role}</p>
                                <p className="text-gray-700">{teamMembers[activeTab].bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section with Hover Effects */}
            <section className="py-20 px-4 md:px-8 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-heading">Get in Touch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <MapPin className="w-8 h-8" />, info: "123 Real Estate Ave, City, State 12345" },
                            { icon: <Phone className="w-8 h-8" />, info: "(123) 456-7890" },
                            { icon: <Mail className="w-8 h-8" />, info: "info@crystalrealestate.com" },
                            { icon: <Clock className="w-8 h-8" />, info: "Mon-Fri: 9AM-6PM" }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <div className="text-blue-500 mb-4 flex justify-center">{item.icon}</div>
                                <p className="text-gray-700">{item.info}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}


            <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-count-up {
          animation: countUp 1s ease-out forwards;
        }
      `}</style>
        </div>

    )
}