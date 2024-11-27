// src/components/PropertyDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../api';
import Slider from 'react-slick';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await api.get(`/api/properties/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    if (!property) return <p className="text-center text-lg text-gray-500">Loading...</p>;

    // Custom arrow components for the slider
    const NextArrow = ({ onClick }) => (
        <div
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-primary-foreground z-10"
            onClick={onClick}
        >
            <MdArrowForwardIos size={24} />
        </div>
    );

    const PrevArrow = ({ onClick }) => (
        <div
            className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer text-primary-foreground z-10"
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
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };


    return (
        <div className="max-w-screen-lg mx-auto p-6 space-y-6">
            <div key={property._id} className="mt-6">
                <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
                    {property.images.length > 1 ? (
                        <Slider {...settings}>
                            {property.images.map((image, index) => (
                                <div key={index} className="w-full h-72 flex justify-center items-center">
                                    <img
                                        className="object-cover w-full h-full rounded-lg"
                                        src={image}
                                        alt={`Property Image ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="w-full h-72 flex justify-center items-center">
                            <img
                                className="object-cover w-full h-full rounded-lg"
                                src={property.images[0]}
                                alt={`Property ${property.plotNumber}`}
                            />
                        </div>
                    )}
                </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">{property.city} - {property.phase} - Plot {property.plotNumber}</h3>
            <p className="text-xl text-gray-600"><strong>Price:</strong> {property.price} Lac</p>

            {/* Description rendered as HTML */}
            <div
                className="description text-gray-700 text-base space-y-4"
                dangerouslySetInnerHTML={{ __html: property.description }}
            />



            <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-800">Contact Information</h4>
                <div className="flex gap-6 mt-4">
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <a href={`tel:${property.phone}`} className="text-lg text-blue-500 hover:text-blue-700">
                            <span>Call</span>
                        </a>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <a href={`https://wa.me/${property.number}`} target='_blank' className="text-lg text-green-500 hover:text-green-700">
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
