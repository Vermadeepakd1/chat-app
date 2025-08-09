import React, { useState, useEffect, useRef } from 'react'
import { collection, query, orderBy, onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns'
import { GLOBAL_CHAT_ID } from '../constants/chatConstants';

function TypingIndicator() {
    const { currentUser } = useAuth();
    const [isTyping, setIsTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "chats", GLOBAL_CHAT_ID), (docSnap) => {
            if (docSnap.exists()) {
                const typing = docSnap.data().typing || {};
                // Find all typing users except current user
                const typingUsersList = Object.entries(typing)
                    .filter(([uid, status]) => uid !== currentUser.uid && status === true)
                    .map(([uid, _]) => uid);

                setTypingUsers(typingUsersList);
                setIsTyping(typingUsersList.length > 0);
            }
        });
        return () => unsubscribe();
    }, [currentUser.uid]);

    return (
        isTyping && <p className='text-sm italic text-gray-500 px-4'>
            {typingUsers.length > 1 ? 'Several people are typing...' : 'Someone is typing...'}
        </p>
    );
}

function MessageList() {
    const [messages, setMessages] = useState([]);
    const { currentUser } = useAuth();
    const scrollRef = useRef(null);

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('createdAt'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        scrollToElement();
    }, [messages]);

    const scrollToElement = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }

    return (
        <div className='p-4 flex flex-col gap-4 overflow-y-auto h-[80vh] w-full'>
            {messages.map(msg => {
                const isSender = msg.uid === currentUser?.uid;
                return (
                    <div
                        key={msg.id}
                        className="w-full flex px-4 animate-fade-in"
                    >
                        <div className={`w-full flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex items-start gap-3 max-w-[70%] ${isSender ? 'flex-row-reverse' : 'flex-row'}`}>
                                <img
                                    src={msg.photoURL || '/avatar.png'}
                                    alt={msg.displayName}
                                    className='w-8 h-8 rounded-full object-cover flex-shrink-0 border-2 border-white/20'
                                />
                                <div className="flex flex-col gap-1">
                                    <div
                                        className={`p-3 rounded-2xl ${isSender
                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-tr-none'
                                            : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-900 rounded-tl-none'
                                            } shadow-lg`}
                                    >
                                        <p className='text-sm font-medium opacity-90 mb-1'>{msg.displayName}</p>
                                        <p className='text-base break-words'>{msg.text}</p>
                                    </div>
                                    <p className={`text-xs text-neutral-700/60 ${isSender ? 'text-right' : 'text-left'} px-2`}>
                                        {msg.createdAt?.seconds && format(new Date(msg.createdAt.seconds * 1000), 'dd MMM, p')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div ref={scrollRef}></div>
                    </div>
                )
            })}
            <TypingIndicator />
        </div>
    )
}

export default MessageList
