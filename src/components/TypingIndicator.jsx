import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { useAuth } from '../context/AuthContext';

function TypingIndicator() {
    const { currentUser } = useAuth();
    const [isSomeoneTyping, setIsSomeoneTyping] = useState(false);

    useEffect(() => {
        const chatRef = doc(db, "chats", "global_chat");

        const unsubscribe = onSnapshot(chatRef, (docSnap) => {
            const typingData = docSnap.data()?.typing || {};

            const othersTyping = Object.entries(typingData).some(
                ([uid, isTyping]) => uid !== currentUser.uid && isTyping
            );

            setIsSomeoneTyping(othersTyping);
        });

        return () => unsubscribe();
    }, [currentUser.uid]);

    if (!isSomeoneTyping) return null;

    return (
        <div className="text-sm text-gray-500 px-4 py-1 italic">
            Someone is typing...
        </div>
    );
}

export default TypingIndicator;
