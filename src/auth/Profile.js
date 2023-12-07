// Profile.js
import React, { useEffect } from 'react';
import './Profile.css';

const Profile = ({ userData, handleLogout, setProfileOpen }) => {
  useEffect(() => {
    console.log('UserData:', userData);
  }, [userData]);

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
  };

  return (
    <div className="profile-container">
      {userData && (
        <div className="profile-content" onClick={toggleProfile}>
          {userData.profilePictureUrl ? (
            <img className="profile-image" src={userData.profilePictureUrl} alt="Profile" />
          ) : (
            <img className="profile-image default-cat-picture" src="path/to/cat-picture.jpg" alt="Default Cat" />
          )}
          <span className="profile-username">{userData.username}</span>
        </div>
      )}
    </div>
  );
};

export default Profile;

































