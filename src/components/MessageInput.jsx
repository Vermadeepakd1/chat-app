import React, { useState } from 'react'
import { db } from '../firebase/firebase-config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'

function MessageInput() {
    const [message, setMessage] = useState('');
    const { currentUser } = useAuth();

    const handleSendMessage = async (e) => {
        // console.log(currentUser)
        e.preventDefault();
        if (!message.trim()) return;

        try {
            await addDoc(collection(db, 'messages'), {
                text: message,
                createdAt: serverTimestamp(),
                uid: currentUser.uid || '',
                displayName: currentUser.displayName || 'Anonymous',
                photoUrl: currentUser.photoURL || '',
            });
            setMessage('');
        } catch (error) {
            console.error("Error sending message :", error)
        }
    }

    return (
        <form onSubmit={handleSendMessage} className='flex items-center gap-2 px-4 py-2 border-t bg-white'>
            <input type="text"
                className='grow border rounded px-4 py-2 focus:outline-none'
                placeholder='Type your message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                type="submit"
                className='bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600'
            >
                Send
            </button>
        </form>
    )
}

export default MessageInput
