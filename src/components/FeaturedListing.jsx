import axios from 'axios'
import { MessageCircle, MessageSquare, Phone } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { TbPhoneCall } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';

const FeaturedListing = () => {
    const [data, setData] = useState("")

    const fetchPropertyById = async () => {
        try {
            const res = await axios.get("https://real-estate-kaif-uzu3.vercel.app/api/properties/673b44a45ba3a6dcc026ef48")
            setData(res.data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchPropertyById()
    }, [])

    const handleWhatsAppClick = () => {
        const phoneNumber = data.number; // Replace with the desired number
        window.open(`https://wa.me/${phoneNumber}`, '_blank');
    };

    const handleCallClick = () => {
        const phoneNumber = "923234426174"; // Replace with the desired number
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <>
            <h2 className='font-bold text-4xl font-heading text-center mb-12 text-gold mt-16 text-gray-800'> Featured Property</h2>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 max-w-[85%] mx-auto'>
                <div className="max-w-md mx-auto bg-card shadow-lg rounded-lg overflow-hidden transform transition-transform ">
                    <img className="w-80 h-56 object-cover object-center hover:scale-105 transition-all" src={data.images} alt="Card Image" />
                    <div className="p-4">
                        <h2 className="text-lg font-bold text-primary-foreground">{data.phase} <span className='font-normal'>{data.plotNumber}</span></h2>
                        <p className="text-sm text-secondary-foreground mt-2"> <span className='font-bold'>Demand</span> {data.price} Lac</p>
                        <div className="mt-4 flex justify-around items-center gap-5 border-t-2">
                            <div className='flex mt-3 cursor-pointer' >

                                <TbPhoneCall className='w-4 h-4 mr-2 ' onClick={handleCallClick} />
                                <span className="text-xs text-muted-foreground"> Call</span>
                            </div>

                            <div className='flex mt-2 cursor-pointer' onClick={handleWhatsAppClick}>
                                <FaWhatsapp className='w-4 h-4 mr-3' />
                                <span className="text-xs text-muted-foreground"> WhatsApp</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-md mx-auto bg-card shadow-lg rounded-lg overflow-hidden transform transition-transform ">
                    <img className="w-80 h-56 object-cover object-center hover:scale-105 transition-all" src={data.images} alt="Card Image" />
                    <div className="p-4">
                        <h2 className="text-lg font-bold text-primary-foreground">{data.phase} <span className='font-normal'>{data.plotNumber}</span></h2>
                        <p className="text-sm text-secondary-foreground mt-2"> <span className='font-bold'>Demand</span> {data.price} Lac</p>
                        <div className="mt-4 flex justify-around items-center gap-5 border-t-2">
                            <div className='flex mt-3 cursor-pointer' >

                                <TbPhoneCall className='w-4 h-4 mr-2 ' onClick={handleCallClick} />
                                <span className="text-xs text-muted-foreground"> Call</span>
                            </div>

                            <div className='flex mt-2 cursor-pointer' onClick={handleWhatsAppClick}>
                                <FaWhatsapp className='w-4 h-4 mr-3' />
                                <span className="text-xs text-muted-foreground"> WhatsApp</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-md mx-auto bg-card shadow-lg rounded-lg overflow-hidden transform transition-transform ">
                    <img className="w-80 h-56 object-cover object-center hover:scale-105 transition-all" src={data.images} alt="Card Image" />
                    <div className="p-4">
                        <h2 className="text-lg font-bold text-primary-foreground">{data.phase} <span className='font-normal'>{data.plotNumber}</span></h2>
                        <p className="text-sm text-secondary-foreground mt-2"> <span className='font-bold'>Demand</span> {data.price} Lac</p>
                        <div className="mt-4 flex justify-around items-center gap-5 border-t-2">
                            <div className='flex mt-3 cursor-pointer' >

                                <TbPhoneCall className='w-4 h-4 mr-2 ' onClick={handleCallClick} />
                                <span className="text-xs text-muted-foreground"> Call</span>
                            </div>
                            <div className='flex mt-2 cursor-pointer' onClick={handleWhatsAppClick}>
                                <FaWhatsapp className='w-4 h-4 mr-3' />
                                <span className="text-xs text-muted-foreground"> WhatsApp</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-md mx-auto bg-card shadow-lg rounded-lg overflow-hidden transform transition-transform ">
                    <img className="w-80 h-56 object-cover object-center hover:scale-105 transition-all" src={data.images} alt="Card Image" />
                    <div className="p-4">
                        <h2 className="text-lg font-bold text-primary-foreground">{data.phase} <span className='font-normal'>{data.plotNumber}</span></h2>
                        <p className="text-sm text-secondary-foreground mt-2"> <span className='font-bold'>Demand</span> {data.price} Lac</p>
                        <div className="mt-4 flex justify-around items-center gap-5 border-t-2">
                            <div className='flex mt-3 cursor-pointer' >

                                <TbPhoneCall className='w-4 h-4 mr-2 ' onClick={handleCallClick} />
                                <span className="text-xs text-muted-foreground"> Call</span>
                            </div>

                            <div className='flex mt-2 cursor-pointer' onClick={handleWhatsAppClick}>
                                <FaWhatsapp className='w-4 h-4 mr-3' />
                                <span className="text-xs text-muted-foreground"> WhatsApp</span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className='max-w-[85%] flex align-middle justify-center text-center mx-auto mt-7'>
                <button className='px-6 py-2 bg-[#ffb536] text-white font-semibold rounded-md hover:bg-[#F39C12]/80 transition duration-300 flex items-center justify-center'><Link to="/properties">See More</Link></button>
            </div>
        </>
    )
}

export default FeaturedListing