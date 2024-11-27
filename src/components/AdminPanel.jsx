import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyForm from './PropertyForm';

const AdminPanel = () => {
    const [properties, setProperties] = useState([]);
    const [editingProperty, setEditingProperty] = useState(null);
    const [cities, setCities] = useState([]);
    const [editingCity, setEditingCity] = useState(null);
    const [areas, setAreas] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [showModal, setShowModal] = useState(false);
    const authToken = localStorage.getItem('token');



    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('https://real-estate-kaif-uzu3.vercel.app/api/properties');
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, [authToken]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('https://real-estate-kaif-uzu3.vercel.app/api/cities');
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

    useEffect(() => {
        if (selectedCity) {
            const fetchAreas = async () => {
                try {
                    const response = await axios.get(`https://real-estate-kaif-uzu3.vercel.app/api/areas/${selectedCity}`);
                    setAreas(response.data);
                    console.log(response.data)
                } catch (error) {
                    console.error('Error fetching areas:', error);
                }
            };
            fetchAreas();
        }
    }, [selectedCity]);

    const handleDelete = async (id) => {
        try {

            await axios.delete(`https://real-estate-kaif-uzu3.vercel.app/api/properties/${id}`);
            setProperties(properties.filter((property) => property._id !== id));
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    const handleDeleteCity = async (cityId) => {
        try {
            await axios.delete(`https://real-estate-kaif-uzu3.vercel.app/api/cities/${cityId}`);
            setCities(cities.filter((city) => city._id !== cityId));
        } catch (error) {
            console.error('Error deleting city:', error);
        }
    };

    const handleDeleteArea = async (areaId) => {
        console.log("Deleting area with ID:", areaId);
        try {
            if (!selectedCity) {
                console.error('No city selected');
                return;
            }

            const city = cities.find((city) => city.name === selectedCity);
            if (!city) {
                console.error('City not found');
                return;
            }

            await axios.delete(`https://real-estate-kaif-uzu3.vercel.app/api/cities/${city._id}/areas/${areaId}`);
            setAreas(areas.filter((area) => area._id !== areaId));
        } catch (error) {
            console.error('Error deleting area:', error);
        }
    };

    const handleAddCity = async (newCity) => {
        try {
            const cityData = { name: newCity.name, areas: newCity.areas || [] };
            const response = await axios.post('https://real-estate-kaif-uzu3.vercel.app/api/cities', cityData);
            setCities([...cities, response.data]);
            setEditingCity(null);
        } catch (error) {
            console.error('Error adding city:', error);
        }
    };

    const handleAddArea = async (areaName) => {
        try {
            if (!selectedCity) {
                console.error('No city selected');
                return;
            }

            const response = await axios.post(`https://real-estate-kaif-uzu3.vercel.app/api/cities/${selectedCity}/areas`, { name: areaName, id: areaName });
            setAreas([...areas, response.data]);
        } catch (error) {
            console.error('Error adding area:', error);
        }
    };
    const handleSaveProperty = (savedProperty) => {
        setProperties((prev) => {
            if (editingProperty?._id) {
                return prev.map((p) => (p._id === savedProperty._id ? savedProperty : p));
            } else {
                return [...prev, savedProperty];
            }
        });
        setEditingProperty(null);
        setShowModal(false);
    };
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6">Admin Panel</h2>

            {/* Property Section */}
            <div className="mb-6">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    onClick={() => {
                        setEditingProperty({});
                        setShowModal(true);
                    }}
                >
                    Add New Property
                </button>
            </div>

            {/* Properties List */}
            <ul className="space-y-4">
                {properties.map((property) => (
                    <li key={property._id} className="border p-4 rounded-lg shadow-sm">
                        <h3 className="font-bold text-xl">{property.city} - {property.phase} - Plot {property.plotNumber}</h3>
                        <p>Price: {property.price}</p>
                        <div className="mt-2 space-x-4">
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
                                onClick={() => {
                                    setEditingProperty(property);
                                    setShowModal(true);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                                onClick={() => handleDelete(property._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Modal for Adding/Editing Properties */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 overflow-y-auto max-h-screen">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold mb-4">
                                {editingProperty?._id ? 'Edit Property' : 'Add New Property'}
                            </h2>
                            <button
                                className="text-gray-500 text-2xl"
                                onClick={() => setShowModal(false)} // Close the modal
                            >
                                &times;
                            </button>
                        </div>
                        <PropertyForm
                            property={editingProperty}
                            onSave={handleSaveProperty}
                            onCancel={() => setShowModal(false)}
                        />
                    </div>
                </div>
            )}



            {/* Cities and Areas Management Section */}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Cities</h3>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                    onClick={() => setEditingCity({})}
                >
                    Add New City
                </button>

                {/* Add/Edit City Form */}
                {editingCity && (
                    <div className="mt-4">
                        <input
                            type="text"
                            value={editingCity.name || ''}
                            onChange={(e) => setEditingCity({ ...editingCity, name: e.target.value })}
                            placeholder="City Name"
                            className="border p-2 rounded-lg w-full mt-2"
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 mt-4"
                            onClick={() => handleAddCity(editingCity)}
                        >
                            Save City
                        </button>
                    </div>
                )}

                <ul className="mt-4 space-y-4">
                    {cities.map((city) => (
                        <li key={city._id} className="border p-4 rounded-lg shadow-sm flex justify-between items-center">
                            <h4 className="font-semibold text-xl">{city.name}</h4>
                            <div className="space-x-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                                    onClick={() => setSelectedCity(city.name)}
                                >
                                    Manage Areas
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                                    onClick={() => handleDeleteCity(city._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {selectedCity && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-4">Areas in {selectedCity}</h3>
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                placeholder="New Area"
                                onChange={(e) => setEditingCity({ ...editingCity, areaName: e.target.value })}
                                className="border p-2 rounded-lg flex-grow"
                            />
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                                onClick={() => handleAddArea(editingCity.areaName)}
                            >
                                Add Area
                            </button>
                        </div>

                        <ul className="mt-4 space-y-2">
                            {areas.map((area) => (
                                <li key={area._id} className="p-2 border rounded-lg flex justify-between items-center">
                                    {area.name}
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                                        onClick={() => handleDeleteArea(area._id)}
                                    >

                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;