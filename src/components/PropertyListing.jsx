import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { TbPhoneCall } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Link } from 'react-router-dom';

const PropertyListing = ({ searchQuery }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('https://real-estate-kaif-uzu3.vercel.app/api/properties', {
                params: { ...searchQuery }
            });
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchProperties();
    }, [searchQuery]);

    const handleWhatsAppClick = (phoneNumber) => {
        window.open(`https://wa.me/${phoneNumber}`, '_blank');
    };

    const handleCallClick = (phoneNumber) => {
        window.location.href = `tel:${phoneNumber}`;
    };

    // Custom arrow components
    const NextArrow = ({ onClick }) => (
        <div
            className="absolute text-white top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-primary-foreground z-10"
            onClick={onClick}
        >
            <MdArrowForwardIos size={24} />
        </div>
    );

    const PrevArrow = ({ onClick }) => (
        <div
            className="absolute text-white  top-1/2 left-2 transform -translate-y-1/2 cursor-pointer text-primary-foreground z-10"
            onClick={onClick}
        >
            <MdArrowBackIos size={24} />
        </div>
    );

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    // Function to truncate description and handle HTML content
    const truncateDescription = (description, limit = 40) => {
        if (description.length > limit) {
            const truncatedText = description.substring(0, limit) + '...';
            return { __html: truncatedText };
        }
        return { __html: description };
    };

    return (
        <div className="flex flex-col items-center mt-10 max-w-[100%] mx-auto">
            {loading ? (
                <p className="text-secondary-foreground text-center">Loading properties...</p>
            ) : properties.length === 0 ? (
                <p className="text-secondary-foreground text-center">No properties found.</p>
            ) : (
                <div className="flex flex-wrap gap-6">
                    {properties.map((property) => (
                        <div key={property._id} className="max-w-md mx-auto bg-card shadow-lg rounded-lg overflow-hidden transform transition-transform">
                            <div className="relative w-[320px] h-62 mx-auto"> {/* Fixed width and height */}
                                {property.images.length > 1 ? (
                                    <Slider {...settings}>
                                        {property.images.map((image, index) => (
                                            <div key={index} className="w-[320px] h-72 flex justify-center items-center"> {/* Fixed size */}
                                                <img
                                                    className="object-cover w-full h-full rounded-lg"
                                                    src={image}
                                                    alt={`Property Image ${index + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                ) : (
                                    <div className="w-[320px] h-72 flex justify-center items-center"> {/* Fixed size */}
                                        <img
                                            className="object-cover w-full h-full rounded-lg"
                                            src={property.images[0]}
                                            alt={`Property ${property.plotNumber}`}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-primary-foreground">
                                    {property.phase} <span className="font-normal">Plot {property.plotNumber}</span>
                                </h2>
                                <p className="text-sm text-secondary-foreground mt-2">
                                    <span className="font-bold">Demand:</span> {property.price} Lac
                                </p>

                                <p className="text-sm w-[320px] text-secondary-foreground mt-2 font-body" dangerouslySetInnerHTML={truncateDescription(property.description, 40)} />

                                <div>
                                    <button><Link to={`/property/${property._id}`}>Details</Link></button>
                                </div>
                                <div className="mt-4 flex justify-around items-center gap-5 border-t-2">
                                    <div className="flex mt-3 cursor-pointer" onClick={() => handleCallClick(property.number)}>
                                        <TbPhoneCall className="w-4 h-4 mr-2" />
                                        <span className="text-xs text-muted-foreground">Call</span>
                                    </div>
                                    <div className="flex mt-2 cursor-pointer" onClick={() => handleWhatsAppClick(property.number)}>
                                        <FaWhatsapp className="w-4 h-4 mr-3" />
                                        <span className="text-xs text-muted-foreground">WhatsApp</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertyListing;
