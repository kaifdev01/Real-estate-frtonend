'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export default function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('') // New username state
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setUsername('')
        setAgreeTerms(false)
        setError('')
        setSuccess('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!email || !password) {
            setError('Please fill in all fields')
            return
        }

        // Login specific validation
        if (isLogin) {
            if (!email || !password) {
                setError('Please fill in all fields')
                return
            }
            try {
                const response = await axios.post('https://real-estate-kaif-uzu3.vercel.app/api/auth/login', { email, password })
                const { token } = response.data
                localStorage.setItem('token', token)
                const decodedToken = jwtDecode(token)
                localStorage.setItem('userRole', decodedToken.role)

                if (decodedToken.role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/')
                }
                setSuccess('Login successful!')
            } catch (error) {
                setError(error.response?.data?.error || 'Error occurred. Please try again.')
                console.error('Login error:', error)
            }
        } else {
            // Signup specific validation
            if (!username || !confirmPassword) {
                setError('Please fill in all fields')
                return
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match')
                return
            }

            if (!agreeTerms) {
                setError('Please agree to the terms and conditions')
                return
            }

            try {
                const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password })
                setSuccess(response.data.message)
                if (response.status === 201) {
                    navigate('/login')
                }
            } catch (error) {
                setError(error.response?.data?.message || 'Error occurred. Please try again later.')
                console.error('Signup error:', error)
            }
        }
    }

    const passwordStrength = () => {
        if (password.length === 0) return ''
        if (password.length < 8) return 'Weak'
        if (password.length < 12) return 'Medium'
        return 'Strong'
    }

    const strengthColor = () => {
        switch (passwordStrength()) {
            case 'Weak':
                return 'bg-red-500'
            case 'Medium':
                return 'bg-yellow-500'
            case 'Strong':
                return 'bg-green-500'
            default:
                return 'bg-gray-200'
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-indigo-900 p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin ? 'login' : 'signup'}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-3xl font-bold text-center mb-6">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none h-8 p-2"
                                    required
                                />
                            </div>

                            {!isLogin && (
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none h-8 p-2"
                                        required
                                    />
                                </div>
                            )}

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative mt-1">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="outline-none h-8 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {!isLogin && (
                                    <div className="mt-1 h-1 w-full bg-gray-200 rounded">
                                        <div
                                            className={`h-1 rounded transition-all duration-300 ${strengthColor()}`}
                                        ></div>
                                    </div>
                                )}
                            </div>

                            {!isLogin && (
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="outline-red-50 h-8 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>
                            )}

                            {!isLogin && (
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="agreeTerms"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
                                        I agree to the{' '}
                                        <a href="#" className="text-indigo-600 hover:text-indigo-500">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ffb536] hover:bg-[#cc963a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffb456S]"
                                >
                                    {isLogin ? 'Login' : 'Sign Up'}
                                </button>
                            </div>
                        </form>

                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        {success && <p className="mt-2 text-sm text-green-600">{success}</p>}

                        <div className="mt-4 text-center">
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin)
                                    resetForm()
                                }}
                                className="text-sm text-indigo-600 hover:text-indigo-500"
                            >
                                {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
