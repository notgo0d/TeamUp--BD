import React, { useState } from 'react';
import './App.css';
import Team from './panels/Team';
import FriendsPanel from './panels/FriendsPanel';

import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Competitive from './components/Competitive';
import Casual from './components/Casual';
import Publication from './pages/Publication';

function App() {
  // Placeholder for authentication state and function
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Placeholder for handleLogin function
  const handleLogin = () => {
    // Perform authentication logic and set isLoggedIn to true
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <Navbar />
      {/* Additional components (Casual, Competitive) if needed */}
      <Routes>
        <Route
          path="/friends"
          element={isLoggedIn ? <FriendsPanel closeFriendsPanel={() => {}} isOpen={false} /> : <Navigate to="/login" />}
        />
        <Route path="/team" element={isLoggedIn ? <Team /> : <Navigate to="/login" />} />
        <Route path="/competitive" element={isLoggedIn ? <Competitive /> : <Navigate to="/login" />} />
        <Route path="/casual" element={isLoggedIn ? <Casual /> : <Navigate to="/login" />} />
        <Route
          path="/publication"
          element={isLoggedIn ? <Publication /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;




















