import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CityAreaSelector = () => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [areas, setAreas] = useState([]);

    // Fetch cities on component mount
    useEffect(() => {
        axios.get('https://real-estate-kaif-uzu3.vercel.app/api/cities')
            .then(response => setCities(response.data))
            .catch(error => console.error('Error fetching cities:', error));
    }, []);


    useEffect(() => {
        if (selectedCity) {
            axios.get(`https://real-estate-kaif-uzu3.vercel.app/api/areas/${selectedCity}`).then((response) => {
                setAreas(response.data)
                console.log(response.data)
            })

                .catch(error => console.error('Error fetching areas:', error));
        }
    }, [selectedCity]);

    return (
        <div>
            <label>
                Select City:
                <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
                    <option value="">-- Select a City --</option>
                    {cities.map(city => (
                        <option key={city._id} value={city._id}>{city.name}</option>
                    ))}
                </select>
            </label>

            <label>
                Select Area:
                <select disabled={!selectedCity}>
                    <option value="">-- Select an Area --</option>
                    {areas.map(area => (
                        <option key={area._id} value={area.name}>{area}</option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default CityAreaSelector;
