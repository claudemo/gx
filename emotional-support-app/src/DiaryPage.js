// src/components/DiaryPage.js
import React from 'react';
import './DiaryPage.css';

function DiaryPage({ diaryEntries }) {
    return (
        <div className="diary-container">
            <h1>My Emotional Diary</h1>
            <p>Record each of your days, reflect on the past, and look forward to the future</p>

            <div className="diary-entries">
                {diaryEntries.map((entry) => (
                    <div key={entry.id} className="diary-entry">
                        <h3>{entry.category}</h3>
                        <p>{entry.text}</p>
                        <p className="timestamp">{entry.timestamp}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiaryPage;