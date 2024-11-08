// src/components/LandingPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './LandingPage.css';

function LandingPage({ addDiaryEntry }) {
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const predefinedCategories = [
        'Trouble in Love',
        'Conflict with Friends',
        'Overwhelming Work',
        'Academic Pressure',
        'Uncertain About Life',
    ];

    const handleAddEntryAndNavigate = (category) => {
        if (category && category.trim() !== '') {
            addDiaryEntry(category, ''); // Add diary entry with selected category
            navigate('/chat', { state: { initialCategory: category } }); // Navigate to ChatPage with state
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim() !== '') {
            addDiaryEntry('Custom', userInput); // Add diary entry with 'Custom' category
            navigate('/chat', { state: { initialCategory: 'Custom', initialText: userInput } }); // Navigate to ChatPage with state
            setUserInput('');
        }
    };

    return (
        <div className="landing-container">
            <h1>Drop your stones to the pond</h1>
            {/* <p>The mission of the Magic Mirror is: to listen to your present, illuminate your future</p> */}

            <div className="button-container">
                {predefinedCategories.map((category, index) => (
                    <button
                        key={index}
                        className="concern-button"
                        onClick={() => handleAddEntryAndNavigate(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="input-form">
                <input
                    type="text"
                    placeholder="Mirror, mirror, tell me..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="input-field"
                />
                <button type="submit" className="submit-button">Add Diary</button>

            </form>

        </div>
    );
}

export default LandingPage;
