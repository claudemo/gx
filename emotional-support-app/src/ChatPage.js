// src/components/ChatPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ChatPage.css';

function ChatPage({ addDiaryEntry }) { // Destructure addDiaryEntry from props
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location.state) {
            const { initialCategory, initialText } = location.state;

            if (initialCategory) {
                const initialAIMessage = {
                    sender: 'ai',
                    text: `${initialCategory}... I understand. Did anything happen recently that made you feel this way?`,
                };
                setMessages([initialAIMessage]);
            }

            if (initialText) {
                const initialUserMessage = {
                    sender: 'user',
                    text: initialText,
                };
                setMessages((prevMessages) => [...prevMessages, initialUserMessage]);
                addDiaryEntry(initialCategory, initialText);
                handleSend(initialText, initialCategory);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);

    const handleSend = async (messageText = input, category = 'Chat') => {
        if (messageText.trim() === '') return;

        const userMessage = { sender: 'user', text: messageText };
        setMessages((prev) => [...prev, userMessage]);
        addDiaryEntry(category, messageText);

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'http://ec2-3-22-95-161.us-east-2.compute.amazonaws.com:5000/api/chat',
                // 'http://localhost:5000/api/chat',

                { message: messageText },
                { headers: { 'Content-Type': 'application/json' } } // Set header
            );
            const aiReply = response.data.reply;

            const aiMessage = { sender: 'ai', text: aiReply };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            console.error(err);
            setError('Failed to get response from AI.');
            const aiMessage = { sender: 'ai', text: 'Sorry, I am unable to respond at the moment.' };
            setMessages((prev) => [...prev, aiMessage]);
        } finally {
            setLoading(false);
            setInput('');
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <div className="message-text">
                            {msg.text}
                        </div>
                        <div className="message-timestamp">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="message ai">
                        <div className="message-text">AI is typing...</div>
                        <div className="message-timestamp">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                )}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your message..."
                />
                <button onClick={() => handleSend()} disabled={loading}>
                    Send
                </button>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default ChatPage;