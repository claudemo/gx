// src/App.js
import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ChatPage from './components/ChatPage'; // Import ChatPage
import DiaryPage from './components/DiaryPage';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="nav-link">主页</Link>
          <Link to="/diary" className="nav-link">日记</Link>
          <Link to="/chat" className="nav-link">AI 聊天</Link> {/* Add Chat Link */}
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/chat" element={<ChatPage />} /> {/* Add Chat Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
