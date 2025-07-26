import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase-config'

function Navbar() {
    const { currentUser } = useAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout Error: ', error);
        }
    }
    return (
        <div className='navbarcontainer  w-full bg-teal-200'>
            <nav className='flex justify-between items-center px-8 h-10'>
                <h1 className='logo font-bold text-lg'>ChitChat</h1>
                {currentUser && (
                    <button onClick={handleLogout} className='bg-cyan-300 border-none shadow-2xs px-3 rounded hover:bg-cyan-400'>LogOut</button>
                )}

            </nav>
        </div>
    )
}

export default Navbar
