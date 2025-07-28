import React from 'react'
import Navbar from '../components/Navbar'
import MessageInput from '../components/MessageInput'
import MessageList from '../components/MessageList'
import TypingIndicator from '../components/TypingIndicator'

const ChatPage = () => {
    return (
        <div className='w-full flex flex-col items-center justify-between min-h-screen bg-gradient-to-r from-cyan-200 via-teal-100  to-blue-200 animate-gradient backdrop-blur-sm bg-white/30  rounded-xl shadow-lg'>
            <Navbar />
            <MessageList />
            <TypingIndicator />
            <MessageInput />
        </div>
    )
}

export default ChatPage
