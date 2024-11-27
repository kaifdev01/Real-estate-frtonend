import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
// import jwt_decode from 'jwt-decode'  // Import jwt-decode

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {
        // Check if token exists in localStorage and if the user is logged in
        if (token) {
            setIsLoggedIn(true)
            try {
                const role = localStorage.getItem("userRole")

                // const decodedToken = jwt_decode(token)
                setIsAdmin(role === 'admin')  // Assuming 'role' is the key for user role in the token
            } catch (error) {
                console.error('Error decoding token:', error)
            }
        } else {
            setIsLoggedIn(false)
            setIsAdmin(false)
        }

        // Add event listener for localStorage changes
        const handleStorageChange = () => {
            const updatedToken = localStorage.getItem('token')
            const role = localStorage.getItem("userRole")
            setIsLoggedIn(!!updatedToken)
            if (updatedToken) {
                try {
                    const decodedToken = jwt_decode(updatedToken)
                    setIsAdmin(role === 'admin')
                } catch (error) {
                    console.error('Error decoding token:', error)
                }
            } else {
                setIsAdmin(false)
            }
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [token])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setIsAdmin(false)
        navigate("/")
    }

    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <img className="h-8 w-auto" src="/src/logo.png" alt="Logo" />
                        <span className="ml-2 text-xl font-bold text-white"></span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-4 text-white">
                        <Link to="/" className="text-white hover:text-gray-400 mt-2">Home</Link>
                        <Link to="/about" className="text-white hover:text-gray-400 mt-2">About</Link>
                        <Link to="/services" className="text-white hover:text-gray-400 mt-2">Services</Link>
                        <Link to="/properties" className="text-white hover:text-gray-400 mt-2">Properties</Link>
                        <Link to="#" className="text-white hover:text-gray-400 mt-2">Contact</Link>

                        {isLoggedIn && isAdmin && (
                            <Link
                                to="/admin"
                                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
                            >
                                Dashboard
                            </Link>
                        )}

                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300">
                                Log Out
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="px-6 py-2 bg-[#ffb536] text-white font-semibold rounded-md hover:bg-[#F39C12]/80 transition duration-300">
                                Log In
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu with transition */}
            <div
                className={classNames(
                    "md:hidden overflow-hidden transition-all duration-300",
                    {
                        "max-h-0 opacity-0 transform -translate-y-2": !isMenuOpen,
                        "max-h-screen opacity-100 transform translate-y-0": isMenuOpen
                    }
                )}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link onClick={() => setIsMenuOpen(false)} to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
                    <Link onClick={() => setIsMenuOpen(false)} to="/properties" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Properties</Link>
                    <Link onClick={() => setIsMenuOpen(false)} to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact</Link>

                    {isLoggedIn && isAdmin && (
                        <Link
                            to="/admin"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-green-500 hover:bg-gray-100">
                            Dashboard
                        </Link>
                    )}

                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-gray-100">
                            Log Out
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            Log In
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}
