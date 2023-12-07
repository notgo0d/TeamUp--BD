// ProfilePanel.js
import React from 'react';
import './ProfilePanel.css';  // Check the capitalization and file extension
import { useNavigate } from 'react-router-dom';

const ProfilePanel = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // Your logout logic here
    handleLogout();
    navigate('/'); // Navigate to the home page or login page after logout
  };

  const handleOptionClick = () => {
    // Handle option button click
    // Add your logic here
  };

  const handleProfileClick = () => {
    // Handle profile button click
    // Add your logic here
  };

  return (
    <div className="profile-panel">
      <ul>
        {/* Logout button */}
        <li>
          <button className="logout-button" onClick={handleLogoutClick}>
            Logout
          </button>
        </li>
        {/* Option button */}
        <li>
          <button className="option-button" onClick={handleOptionClick}>
            Option
          </button>
        </li>
        {/* Profile button */}
        <li>
          <button className="profile-button" onClick={handleProfileClick}>
            Profile
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfilePanel;





