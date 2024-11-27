import { Link } from "react-router-dom"
import { Building, Home, Key, LineChart, Users, Wrench, Phone, Mail, MapPin, Check, Globe, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import lhr from "/lhr.jpg"
import karachi from "/karachi.jpg"
import quetta from "/quetta.jpg"
import multan from "/multan.jpg"

export default function Services() {


    const services = [
        {
            title: 'Buying and Selling Assistance',
            description: 'Expert guidance to help you buy your dream home or sell your property efficiently. We leverage market insights and negotiation skills to ensure the best deals for our clients.',
            icon: <Home className="w-12 h-12 text-primary" />,
        },
        {
            title: 'Property Management',
            description: 'Comprehensive management services for rental properties, including tenant screening, rent collection, maintenance coordination, and financial reporting.',
            icon: <Building className="w-12 h-12 text-primary" />,
        },
        {
            title: 'Consultation Services',
            description: 'Professional advice on property investment, market trends, and legal matters. Our experts provide insights to help you make informed real estate decisions.',
            icon: <LineChart className="w-12 h-12 text-primary" />,
        },
        {
            title: 'Rental Services',
            description: 'Assistance in finding rental properties that match your criteria or managing rental agreements for property owners. We ensure smooth transactions for both tenants and landlords.',
            icon: <Key className="w-12 h-12 text-primary" />,
        },
        {
            title: 'International Real Estate',
            description: 'Specialized assistance for international property transactions, including navigating foreign markets, currency exchange considerations, and cross-border legal compliance.',
            icon: <Globe className="w-12 h-12 text-primary" />,
        },
        {
            title: 'Custom Solutions',
            description: 'Tailored services for unique needs, such as relocation assistance, luxury property management, or commercial real estate services. We adapt to your specific requirements.',
            icon: <Wrench className="w-12 h-12 text-primary" />,
        },
    ]


    const cities = [
        { name: 'Lahore', image: lhr },
        { name: 'Karachi', image: karachi },
        { name: 'Quetta', image: quetta },
        { name: 'Multan', image: multan },
    ]

    const stats = [
        { label: 'Properties Sold', value: '1,000+' },
        { label: 'Happy Clients', value: '5,000+' },
        { label: 'Years of Experience', value: '25+' },
        { label: 'Cities Served', value: '20+' },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <div className="min-h-screen bg-background ">
            <motion.header
                className="relative  text-white overflow-hidden h-screen flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Background Image */}
                <motion.div
                    className="absolute inset-0 z-0"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Real Estate Background"
                        quality={100}
                        className="bg-cover object-cover w-full h-full"
                    />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70  to-black/70 z-10"></div>

                {/* Content */}
                <div className="relative z-20 text-center max-w-[85%] mx-auto px-4">
                    <motion.h1
                        className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    >
                        Elevate Your <span className="text-secondary">Real Estate</span> Experience
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    >
                        Discover our comprehensive range of services designed to meet all your property needs with expertise and dedication.
                    </motion.p>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-transform bg-gradient-to-r from-secondary via-indigo-600 to-blue-500 text-white px-8 py-4 shadow-lg hover:scale-105"
                        >
                            Get Started Today
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </motion.header>

            <main className="container mx-auto px-4 py-16 max-w-[85%]">
                <section className="mb-24">
                    <h2 className="text-4xl font-semibold mb-12 text-center">Our Comprehensive Services</h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="bg-card text-card-foreground text-white bg-gray-800 rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                variants={itemVariants}
                            >
                                <div className="mb-6 flex justify-center">{service.icon}</div>
                                <h3 className="text-2xl font-semibold mb-4 text-center">{service.title}</h3>
                                <p className="text-muted-foreground">{service.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                <section className="mb-24">
                    <h2 className="text-4xl font-semibold mb-12 text-center">Cities We Serve</h2>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {cities.map((city, index) => (
                            <motion.div
                                key={index}
                                className="relative group overflow-hidden rounded-lg shadow-lg"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img
                                    src={city.image}
                                    alt={city.name}
                                    width={300}
                                    height={200}
                                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-white text-3xl font-semibold">{city.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                <section className="mb-24">
                    <div className="bg-muted p-12 rounded-lg">
                        <h2 className="text-4xl font-semibold mb-12 text-center">Why Choose Us</h2>
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1">
                                <h3 className="text-3xl font-semibold mb-6">Expertise You Can Trust</h3>
                                <p className="mb-6 text-lg">
                                    With years of experience in the real estate market, our team of professionals is dedicated to providing you with the highest quality service and expert advice.
                                </p>
                                <motion.ul
                                    className="space-y-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {['In-depth market knowledge', 'Personalized approach to every client', 'Proven track record of success', 'Commitment to ethical practices'].map((item, index) => (
                                        <motion.li key={index} className="flex items-center" variants={itemVariants}>
                                            <Check className="w-6 h-6 text-primary mr-2" />
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </div>
                            <div className="flex-1">
                                <img
                                    src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Team of real estate professionals"
                                    width={600}
                                    height={400}
                                    className="rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="text-4xl font-semibold mb-12 text-center">Our Impact</h2>
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                                <p className="text-lg text-muted-foreground">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                <section className="mb-24">
                    <h2 className="text-4xl font-semibold mb-12 text-center">What Our Clients Say</h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="bg-card text-card-foreground rounded-lg shadow-lg p-8"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                        >
                            <p className="italic mb-6 text-lg">
                                "The team's expertise and dedication made our home buying process smooth and enjoyable. Their in-depth market knowledge helped us find the perfect property at a great price. Highly recommended!"
                            </p>
                            <div className="flex items-center">
                                <img
                                    src="/placeholder.svg?height=60&width=60"
                                    alt="Sarah Johnson"
                                    width={60}
                                    height={60}
                                    className="rounded-full mr-4"
                                />
                                <div>
                                    <p className="font-semibold">Sarah Johnson</p>
                                    <p className="text-sm text-muted-foreground">First-time Homebuyer</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="bg-card text-card-foreground rounded-lg shadow-lg p-8"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                        >
                            <p className="italic mb-6 text-lg">
                                "Their property management services have been invaluable. Professional, responsive, and thorough, they've made being a landlord stress-free. I've seen a significant increase in my property's value under their management."
                            </p>
                            <div className="flex items-center">
                                <img
                                    src="/placeholder.svg?height=60&width=60"
                                    alt="Michael Chen"
                                    width={60}
                                    height={60}
                                    className="rounded-full mr-4"
                                />
                                <div>
                                    <p className="font-semibold">Michael Chen</p>
                                    <p className="text-sm text-muted-foreground">Property Investor</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                <section>
                    <motion.div
                        className="bg-primary text-primary-foreground rounded-lg p-12 text-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Contact us today for personalized assistance with all your real estate needs. Our team of experts is ready to help you achieve your property goals.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-8 py-2"
                                >
                                    Contact Us
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/listings"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-8 py-2"
                                >
                                    Explore Listings
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>
            </main>


        </div>

    )
}