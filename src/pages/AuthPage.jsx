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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-white/10 backdrop-blur-lg p-12 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4 border border-white/20">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-white">Welcome to ChitChat</h1>
                    <p className="text-lg text-white/80">Where conversations come alive</p>
                </div>
                <button
                    onClick={handleGoogleSignIn}
                    className="group bg-white/20 hover:bg-white/30 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-3 w-full backdrop-blur-sm border border-white/20 hover:border-white/40"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>
                <p className="mt-8 text-white/60 text-sm">Experience seamless conversations with a modern touch</p>
            </div>
        </div>
    );
};

export default AuthPage;
