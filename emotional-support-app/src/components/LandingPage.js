// components/LandingPage.js
import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage({ addDiaryEntry }) {
    const [userInput, setUserInput] = useState('');

    const predefinedCategories = [
        '恋情不顺利',
        '和朋友闹矛盾了',
        '工作太累了',
        '学业压力很大',
        '不知道人生该怎么办',
    ];

    const handleAddEntry = (category) => {
        if (category && category.trim() !== '') {
            addDiaryEntry(category, '');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim() !== '') {
            addDiaryEntry('自定义', userInput);
            setUserInput('');
        }
    };

    return (
        <div className="landing-container">
            <h1>哈喽，和魔镜聊聊心事吧～</h1>
            <p>魔镜的使命是：倾听你的现在，照亮你的未来</p>

            <div className="button-container">
                {predefinedCategories.map((category, index) => (
                    <button
                        key={index}
                        className="concern-button"
                        onClick={() => handleAddEntry(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="input-form">
                <input
                    type="text"
                    placeholder="魔镜魔镜告诉我..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="input-field"
                />
                <button type="submit" className="submit-button">添加日记</button>
            </form>
        </div>
    );
}

export default LandingPage;
