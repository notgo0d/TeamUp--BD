import React from 'react';
import './App.css';
import Team from './panels/Team';
import FriendsPanel from './panels/FriendsPanel';

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Competitive from './components/Competitive';
import Casual from './components/Casual';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Casual />
      <Competitive />
      <Routes>
        <Route
          path="/friends"
          element={<FriendsPanel closeFriendsPanel={() => {}} isOpen={false} />} // Pass props
        />
        <Route path="/team" element={<Team />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/competitive" element={<Competitive />} />
        <Route path="/casual" element={<Casual />} />
      </Routes>
    </div>
  );
}

export default App;

















