import React, { useState, useEffect, useRef } from 'react'
import { collection, query, orderBy, onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns'

function TypingIndicator({ chatId }) {
    const { currentUser } = useAuth();
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "chats", chatId), (docSnap) => {
            if (docSnap.exists()) {
                const typing = docSnap.data().typing || {};

                const othersTyping = Object.entries(typing).find(
                    ([uid, status]) => uid !== currentUser.uid && status === true
                );
                setIsTyping(!!othersTyping);
            }
        });
        return () => unsubscribe();
    }, [chatId, currentUser.uid]);

    return (
        isTyping && <p className='text-sm italic text-gray-500 px-4'>Typing...</p>
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
        <div className='p-4 flex flex-col gap-3 overflow-y-auto h-[calc(100vh-120px)] w-full'>
            {messages.map(msg => {
                const isSender = msg.uid === currentUser?.uid;
                return (
                    <div
                        key={msg.id}
                        className="w-full flex px-5"
                    >
                        <div className={`w-full flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex items-start gap-2 max-w-[60%] ${isSender ? 'flex-row-reverse' : 'flex-row '}`}>
                                <img
                                    src='/avatar.png'
                                    alt={msg.name}
                                    className='w-8 h-8 rounded-full object-cover flex-shrink-0'
                                />
                                <div
                                    className={`p-3 rounded-lg ${isSender
                                        ? 'bg-blue-500 text-white rounded-tr-none'
                                        : 'bg-gray-200 text-black rounded-tl-none'
                                        }`}
                                >
                                    <p className='text-sm font-semibold'>{msg.displayName}</p>
                                    <p className='text-base break-words'>{msg.text}</p>
                                </div>
                                <p className='text-xs text-gray-500 self-center'>
                                    {msg.createdAt?.seconds && format(new Date(msg.createdAt.seconds * 1000), 'dd MMM, p')}
                                </p>
                            </div>
                        </div>
                        <div ref={scrollRef}></div>
                    </div>
                )
            })}
            <TypingIndicator chatId={currentUser.uid} />
        </div>
    )
}

export default MessageList
