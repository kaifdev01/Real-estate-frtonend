import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css';

const PropertyForm = ({ property, onSave }) => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [areas, setAreas] = useState([]);
    const [formData, setFormData] = useState({
        city: property?.city || '',
        phase: property?.phase || '',
        plotNumber: property?.plotNumber || '',
        price: property?.price,  // Default price with +92 prefix
        propertyType: property?.propertyType || '',
        description: property?.description || '',
        number: property?.number || '92',  // Default number with +92 prefix
    });
    const [selectedImages, setSelectedImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'number') {
            if (value.startsWith('92') && value.length <= 13) {
                setFormData({ ...formData, [name]: value });
            } else if (value.length === 0) {
                setFormData({ ...formData, [name]: '+92' }); // Reset the prefix if input is empty
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageChange = (e) => {
        setSelectedImages(Array.from(e.target.files));
    };

    const validateForm = () => {
        if (!formData.city || !formData.phase || !formData.plotNumber || !formData.price || !formData.number) {
            toast.error("All fields are required!");
            return false;
        }

        if (formData.price <= 0) {
            toast.error("Price must be greater than 0");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submitting
        if (!validateForm()) return;

        const formDataWithImages = new FormData();
        selectedImages.forEach((image) => formDataWithImages.append('images', image));
        Object.keys(formData).forEach((key) => formDataWithImages.append(key, formData[key]));

        try {
            const authToken = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`,
                },
            };

            const response = property._id
                ? await axios.put(`https://real-estate-kaif-uzu3.vercel.app/api/properties/update/${property._id}`, formDataWithImages, config)
                : await axios.post('https://real-estate-kaif-uzu3.vercel.app/api/properties/add', formDataWithImages, config);

            onSave(response.data);
            toast.success('Property saved successfully!');
            console.log('Property saved:', response.data);
        } catch (error) {
            toast.error('Error saving property!');
            console.error('Error saving property:', error);
        }
    };

    const getOutlineClass = (fieldName) => {
        return formData[fieldName] ? 'focus:ring-2 focus:ring-yellow-500' : 'focus:ring-2 focus:ring-yellow-500';
    };

    useEffect(() => {
        axios.get('https://real-estate-kaif-uzu3.vercel.app/api/cities')
            .then(response => setCities(response.data))
            .catch(error => console.error('Error fetching cities:', error));
    }, []);

    useEffect(() => {
        if (selectedCity) {
            axios.get(`https://real-estate-kaif-uzu3.vercel.app/api/areas/${selectedCity}`)
                .then(response => setAreas(response.data))
                .catch(error => console.error('Error fetching areas:', error));
        }
    }, [selectedCity]);

    const handleDescriptionChange = (value) => {
        setFormData({ ...formData, description: value || '<p></p>' });
    };

    return (
        <form onSubmit={handleSubmit} >
            <select
                name="city"
                className="flex-grow px-4 py-2 bg-[#2C3E50]/10 rounded-md text-charcoal focus:outline-none focus:ring-2 focus:ring-[#F39C12] transition duration-300"
                onChange={(e) => {
                    setSelectedCity(e.target.value);
                    handleChange(e);
                }}
                value={selectedCity}
            >
                <option value="">Select City</option>
                {cities.map(city => (
                    <option key={city._id} value={city.name}>{city.name}</option>
                ))}
            </select>

            <select
                name="phase"
                className="flex-grow px-4 py-2 bg-[#2C3E50]/10 rounded-md text-charcoal focus:outline-none focus:ring-2 focus:ring-[#F39C12] transition duration-300"
                onChange={handleChange}
                disabled={!selectedCity}
            >
                <option value="">Select Area</option>
                {areas.map(area => (
                    <option key={area} value={area}>{area}</option>
                ))}
            </select>

            <input
                type="text"
                name="plotNumber"
                placeholder="Plot Number"
                value={formData.plotNumber}
                onChange={handleChange}
                className={`px-4 py-2 border rounded-md ${getOutlineClass('plotNumber')} transition duration-300`} />

            <input
                type="number"  // Changed from number to text to allow + symbol
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className={`px-4 py-2 border rounded-md ${getOutlineClass('price')} transition duration-300`} />

            <input
                type="text"  // Changed from number to text to allow + symbol
                name="number"
                placeholder="Number"
                maxLength={13}  // Maximum length to allow +92 plus 11 digits
                value={formData.number}
                onChange={handleChange}
                className={`px-4 py-2 border rounded-md ${getOutlineClass('number')} transition duration-300`} />

            <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className={`px-4 py-2 border rounded-md ${getOutlineClass('propertyType')} transition duration-300`}
            >
                <option value="" disabled>Select Property Type</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
            </select>
            <ReactQuill
                name="description"
                theme="snow"
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Enter property description"
                className="mb-4 overflow-y-scroll"

            />
            {/* <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className={`px-4 py-2 border w-80 rounded-md ${getOutlineClass('description')} transition duration-300`} /> */}

            <input
                type="file"
                name="images"
                multiple
                onChange={handleImageChange}
                className="px-4 py-2 border rounded-md" />

            <button type="submit" className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 transition duration-300">
                {property._id ? 'Update' : 'Add'} Property
            </button>
            <ToastContainer />
        </form>
    );
};

export default PropertyForm;
