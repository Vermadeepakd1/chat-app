// src/pages/AuthPage.jsx
import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/chat'); // Redirect to chat page after login
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('/background.svg')] bg-cover bg-center">

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Welcome to ChitChat</h1>
                <p className="mb-6 text-gray-600">Connect. Converse. ChitChat.</p>
                <button
                    onClick={handleGoogleSignIn}
                    className="bg-cyan-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
