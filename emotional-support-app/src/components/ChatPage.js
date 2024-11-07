// src/components/ChatPage.js
import axios from 'axios';
import React, { useState } from 'react';
import './ChatPage.css';

function ChatPage() {
    const [messages, setMessages] = useState([
        { sender: 'ai', text: '你好！有什么我可以帮助你的吗？' },
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedModel, setSelectedModel] = useState('grok'); // Default model

    const handleSend = async () => {
        if (userInput.trim() === '') return;

        const newMessages = [...messages, { sender: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/chat', {
                message: userInput,
                model: selectedModel, // Send selected model
            });

            const aiReply = response.data.reply;
            setMessages([...newMessages, { sender: 'ai', text: aiReply }]);
        } catch (err) {
            console.error(err);
            setError('获取AI回复失败。');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
    };

    return (
        <div className="chat-container">
            <h1>AI 聊天</h1>
            <div className="model-selection">
                <label htmlFor="model">选择AI模型:</label>
                <select id="model" value={selectedModel} onChange={handleModelChange}>
                    <option value="grok">Grok</option>
                    <option value="llama">LLaMA</option>
                </select>
            </div>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === 'ai' ? 'ai' : 'user'}`}
                    >
                        <div className="message-text">{msg.text}</div>
                    </div>
                ))}
                {isLoading && (
                    <div className="message ai">
                        <div className="message-text">正在思考...</div>
                    </div>
                )}
                {error && <div className="error">{error}</div>}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="输入你的消息..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                <button onClick={handleSend} disabled={isLoading}>
                    发送
                </button>
            </div>
        </div>
    );
}

export default ChatPage;
