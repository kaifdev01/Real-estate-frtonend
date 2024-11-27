import React, { useEffect, useState } from 'react';
// import PropertyList from './PropertyListing';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropertyListing from './PropertyListing';

export default function SearchResults() {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [areas, setAreas] = useState([]);
    const [searchParams, setSearchParams] = useState({
        city: '',
        phase: '',
        plotNumber: '',
        price: '',
        propertyType: ''
    });

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();
        for (const key in searchParams) {
            if (searchParams[key]) searchParams.append(key, searchParams[key]);
        }
        navigate(`/search-results?${searchParams.toString()}`);
        // e.preventDefault();
        // console.log('Search params:', searchParams);
        // setSearchParams(searchParams);
    };

    // Fetch cities on component mount
    useEffect(() => {
        axios.get('https://real-estate-kaif-uzu3.vercel.app/api/cities')
            .then(response => setCities(response.data))
            .catch(error => console.error('Error fetching cities:', error));
    }, []);

    // Fetch areas whenever a city is selected
    useEffect(() => {
        if (selectedCity) {
            axios.get(`https://real-estate-kaif-uzu3.vercel.app/api/areas/${selectedCity}`)
                .then(response => setAreas(response.data))
                .catch(error => console.error('Error fetching areas:', error));
        }
    }, [selectedCity]);

    return (
        <div className="container mx-auto py-8">
            <div className="relative z-10 text-center text-black px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <form onSubmit={handleSubmit} className="mb-8 animate-fade-in-up animation-delay-400">
                    <div className="flex flex-col mx-auto sm:flex-row gap-4 p-4 bg-[#ECF0F1]/10 backdrop-blur-sm rounded-lg shadow-lg">
                        {/* City Selector */}
                        <select
                            name="city"
                            className="cursor-pointer flex-grow px-4 py-2 bg-[#2C3E50]/10 rounded-md text-charcoal focus:outline-none focus:ring-2 focus:ring-[#F39C12] transition duration-300"
                            onChange={(e) => {
                                setSelectedCity(e.target.value);
                                handleInputChange(e);
                            }}
                            value={selectedCity}
                        >
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city._id} value={city.name}>{city.name}</option>
                            ))}
                        </select>

                        {/* Area Selector */}
                        <select
                            name="phase"
                            className="flex-grow px-4 py-2 bg-[#2C3E50]/10 rounded-md text-charcoal focus:outline-none focus:ring-2 focus:ring-[#F39C12] transition duration-300 cursor-pointer disabled:cursor-not-allowed"
                            onChange={handleInputChange}
                            disabled={!selectedCity}
                        >
                            <option value="">Select Area</option>
                            {areas.map(area => (
                                <option key={area} value={area}>{area}</option>
                            ))}
                        </select>

                        <input
                            type="text"
                            name="price"
                            placeholder="Search by price"
                            className="cursor-pointer min-w-[170px] flex-grow px-4 py-2 bg-[#2C3E50]/10 rounded-md text-charcoal  focus:outline-none focus:ring-2 focus:ring-[#F39C12] transition duration-300"
                            onChange={handleInputChange}
                        />

                        <select
                            name="propertyType"
                            className=" cursor-pointer flex-grow px-4 py-2 bg-[#2C3E50]/10 rounded-md text-charcoal focus:outline-none focus:ring-2 focus:ring-[#F39C12] transition duration-300"
                            onChange={handleInputChange}
                        >
                            <option value="">Select Property Type</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Residential">Residential</option>
                        </select>

                        {/* <button
                            type="submit"
                            className="px-6 py-2 bg-[#ffb536] text-white font-semibold rounded-md hover:bg-[#F39C12]/80 transition duration-300 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search
                        </button> */}
                    </div>
                </form>
            </div>
            <h2 className="text-3xl font-bold mb-4">Search Results</h2>

            <PropertyListing searchQuery={searchParams} />
        </div>
    );
}
