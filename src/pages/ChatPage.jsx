import React from 'react'
import Navbar from '../components/Navbar'
import MessageInput from '../components/MessageInput'
import MessageList from '../components/MessageList'

const ChatPage = () => {
    return (
        <div className='w-full flex flex-col items-center justify-between'>
            <Navbar />
            <MessageList />
            <MessageInput />
        </div>
    )
}

export default ChatPage
