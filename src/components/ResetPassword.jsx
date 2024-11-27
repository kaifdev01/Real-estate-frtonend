// src/components/ResetPassword.js
import React, { useState } from 'react';
import api from "../api"

const ResetPassword = () => {
    const [form, setForm] = useState({ email: '', otp: '', newPassword: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/auth/reset-password", form)
        } catch (error) {
            alert('Failed to reset password.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="otp" placeholder="OTP" onChange={handleChange} required />
            <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} required />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword;
