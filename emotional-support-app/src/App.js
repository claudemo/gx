// src/App.js
import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ChatPage from './ChatPage';
import DiaryPage from './DiaryPage';
import LandingPage from './LandingPage';
import MoodHomePage from './MoodHomePage';

function App() {
  const [diaryEntries, setDiaryEntries] = useState(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    return savedEntries ? JSON.parse(savedEntries) : [
      { id: 1, category: 'Trouble in Love', text: 'Confused about human relationships.', timestamp: '2024-11-05' },
      { id: 2, category: 'Academic Pressure', text: 'The course load is really heavy', timestamp: '2024-11-06' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  const addDiaryEntry = (category, text) => {
    const today = new Date().toISOString().split('T')[0];
    setDiaryEntries([
      ...diaryEntries,
      {
        id: diaryEntries.length + 1,
        category,
        text,
        timestamp: today,
      },
    ]);
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/diary" className="nav-link">Journal</Link>
          {/* <Link to="/chat" className="nav-link">AI Chat</Link> */}
        </nav>
        <Routes>
          <Route path="/" element={<MoodHomePage />} /> {/* Set MoodHomePage as Home */}
          <Route path="/landing" element={<LandingPage addDiaryEntry={addDiaryEntry} />} />
          <Route path="/diary" element={<DiaryPage diaryEntries={diaryEntries} />} />
          <Route path="/chat" element={<ChatPage addDiaryEntry={addDiaryEntry} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
