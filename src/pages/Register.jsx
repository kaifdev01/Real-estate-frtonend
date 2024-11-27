// src/Signup.js
import React, { useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('api/auth/register', formData);
            setMessage(response.data.message);
            if (response.status === 201) {
                navigate("/login")
            }
        } catch (error) {
            setMessage(error.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
            <Link to="/login">Already have an account? Login</Link>
        </div>
    );
}

export default Signup;
