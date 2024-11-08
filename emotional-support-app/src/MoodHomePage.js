import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodHomePage.css';

function MoodHomePage() {
    const navigate = useNavigate();
    const [angle, setAngle] = useState(0); // Angle in degrees (0 to 360)

    const handleMouseDown = (e) => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        let theta = Math.atan2(dy, dx) * (180 / Math.PI);
        theta = theta < 0 ? theta + 360 : theta;
        setAngle(theta);
    };

    const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e) => {
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        const rect = e.target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = touch.clientX - centerX;
        const dy = touch.clientY - centerY;
        let theta = Math.atan2(dy, dx) * (180 / Math.PI);
        theta = theta < 0 ? theta + 360 : theta;
        setAngle(theta);
    };

    const handleTouchEnd = () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
    };

    const handleSubmit = () => {
        // Map angle to mood score (1 to 100)
        const moodScore = Math.ceil((angle / 360) * 100);
        navigate('/landing', { state: { mood: moodScore } });
    };

    return (
        <div className="mood-home-container">
            {/* <>How Are You Feeling Today?</> */}
            <button onClick={handleSubmit} className="submit-button">Submit Mood</button>

            <div className="circle-container">
                <svg width="500" height="500" className="mood-circle">
                    <defs>
                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#4d5258', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#00bfff', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <circle cx="250" cy="250" r="200" stroke="transparent" strokeWidth="10" fill="url(#blueGradient)" />
                    <line
                        x1="250"
                        y1="250"
                        x2={250 + 200 * Math.cos((angle - 90) * (Math.PI / 180))}
                        y2={250 + 200 * Math.sin((angle - 90) * (Math.PI / 180))}
                        stroke="#6c9ad2"
                        strokeWidth="4"
                    />
                    <circle
                        cx={250 + 200 * Math.cos((angle - 90) * (Math.PI / 180))}
                        cy={250 + 200 * Math.sin((angle - 90) * (Math.PI / 180))}
                        r="4"
                        fill="#00bfff"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                        style={{ cursor: 'pointer' }}
                    />
                </svg>
                {/* <div className="mood-score">Mood Score: {Math.ceil((angle / 360) * 100)}</div> */}
            </div>
        </div>
    );
}

export default MoodHomePage;