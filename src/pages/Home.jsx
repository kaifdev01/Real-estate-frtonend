import { useEffect, useState } from 'react';
import PropertyList from '../components/PropertyListing';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AboutUs from '../components/AboutUs';
import FeaturedListing from '../components/FeaturedListing';
import EnquirySection from '../components/EnquirySection';

export default function HeroSection() {



    const [showPopup, setShowPopup] = useState()

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 2000);


        return () => clearTimeout(timer);
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    // Wrapper styles for full-screen overlay
    const popupWrapperStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.5s ease-in-out',
    };

    // Popup box styles
    const popupStyles = {
        background: 'linear-gradient(135deg, #25D366, #128C7E)', // WhatsApp color gradient
        color: 'white',
        padding: '30px 40px',
        borderRadius: '15px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        animation: 'popUp 0.5s ease-out',
        maxWidth: '400px',
        width: '100%',
        fontFamily: "'Roboto', sans-serif",
    };

    const popupTextStyles = {
        fontSize: '18px',
        marginBottom: '20px',
        fontWeight: '500',
    };

    const linkStyles = {
        display: 'inline-block',
        backgroundColor: '#25D366',
        padding: '12px 20px',
        fontSize: '16px',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '30px',
        fontWeight: '600',
        transition: 'background-color 0.3s ease',
    };

    const closeButtonStyles = {
        backgroundColor: 'transparent',
        border: '2px solid #ffffff',
        color: 'white',
        padding: '8px 15px',
        marginLeft: "5px",
        borderRadius: '30px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'all 0.3s ease',
    };

    // Hover and animation effects
    linkStyles[':hover'] = {
        backgroundColor: '#128C7E',
    };

    closeButtonStyles[':hover'] = {
        backgroundColor: '#ffffff',
        color: '#25D366',
    };

    // Keyframe animations
    const popupAnimationStyles = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes popUp {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  `;


    return (
        <>
            <div>
                {/* Popup message */}
                {showPopup && (
                    <div style={popupWrapperStyles}>
                        <div style={popupStyles}>
                            <p style={popupTextStyles}>
                                Have any questions? <strong>Contact us on WhatsApp!</strong>
                            </p>
                            <a
                                href="https://wa.me/923234426174"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={linkStyles}
                            >
                                Chat on WhatsApp
                            </a>
                            <button className='' onClick={handleClosePopup} style={closeButtonStyles}>X</button>
                        </div>
                    </div>
                )}
            </div>
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/30"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight mb-4 animate-fade-in-up">
                        Luxury Living Awaits
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl font-light mb-8 animate-fade-in-up animation-delay-200">
                        Discover Your Dream Home in Prime Locations
                    </p>




                    <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-600">
                        <button className="px-6 py-3 bg-[#2C3E50]/10 hover:bg-[#2C3E50]/20 text-white rounded-md transition duration-300 flex items-center">
                            <Link to="/about">About Us</Link>
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#ffb536] text-white font-semibold rounded-md hover:bg-[#F39C12]/80 transition duration-300 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <Link to="/search-results">  Search Properties</Link>
                        </button>

                    </div>
                </div>
            </section>
            <section>
                <AboutUs />
            </section>
            <section className='mb-16'>
                <FeaturedListing />
            </section>
            <section>
                <EnquirySection />
            </section>
            {/* Property List Component with Search Params */}
            {/* <PropertyList searchQuery={searchParams} /> */}
        </>
    );
}
