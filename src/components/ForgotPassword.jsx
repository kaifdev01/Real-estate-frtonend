// src/components/ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { forgotPassword } from '../services/authService';
import api from "../api"
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await api.post('/api/auth/forgot-password', email)
            await axios.post("https://real-estate-kaif-uzu3.vercel.app/api/auth/forgot-password", { email })
            // await forgotPassword({ email });
            alert('OTP sent to email.');
            navigate("/reset")
        } catch (error) {
            alert('Failed to send OTP.');
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <button type="submit">Send OTP</button>
        </form>
    );
};

export default ForgotPassword;
