// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import FriendsPanel from '../panels/FriendsPanel';
import Team from '../panels/Team';
import ProfilePanel from '../auth/ProfilePanel';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setLoginOpen] = useState(true);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isFriendsPanelOpen, setFriendsPanelOpen] = useState(false);
  const [isTeamPanelOpen, setTeamPanelOpen] = useState(false);
  const [isProfilePanelOpen, setProfilePanelOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulate user login
    // Commenting out to start the page without a user
    // setLoggedIn(true);
  }, []);

  const openLogin = () => {
    setLoginOpen(true);
    setSignupOpen(false);
  };

  const closeLogin = () => {
    setLoginOpen(false);
  };

  const openSignup = () => {
    setSignupOpen(true);
    setLoginOpen(false);
  };

  const closeSignup = () => {
    setSignupOpen(false);
  };

  const closeFriendsPanel = () => {
    setFriendsPanelOpen(false);
  };

  const handleLogin = (user) => {
    setLoggedIn(true);
    // Assuming user.displayName is where the username is stored in Firebase
    setUserData({
      uid: user.uid,
      email: user.email,
      username: user.displayName,
      profilePictureUrl: user.photoURL,
    });
    console.log('User Data:', user.displayName); // Add this line
    closeLogin();
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserData(null);
    setProfilePanelOpen(false); // Close the profile panel on logout
  };

  const toggleTeamPanel = () => {
    setTeamPanelOpen((prev) => !prev);
  };

  const toggleProfilePanel = () => {
    setProfilePanelOpen((prev) => !prev);
  };

  return (
    <nav>
      <ul className="left-links">
        <li>
          <img
            src={`${process.env.PUBLIC_URL}/T.png`}  // Use process.env.PUBLIC_URL to get the base URL
            alt="Logo"
            style={{ width: '40px', height: '40px', cursor: 'pointer' }}
            onClick={() => navigate('/homePage')}
          />
        </li>
        {isLoggedIn && (
          <li>
            <div onClick={toggleTeamPanel}>
              <Link to="/team">Team</Link>
            </div>
            {isTeamPanelOpen && <Team closePanel={() => setTeamPanelOpen(false)} />}
          </li>
        )}
      </ul>
      <ul className="right-links">
        <li>
          <Link to="/publication" onClick={() => navigate('/publication')}>
            Publications
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/friends" onClick={() => setFriendsPanelOpen(!isFriendsPanelOpen)}>
                F
              </Link>
            </li>
            <li className="login-link">
              {userData ? (
                <div>
                  <span onClick={toggleProfilePanel}>User</span>
                  {isProfilePanelOpen && (
                    <ProfilePanel handleLogout={handleLogout} setProfileOpen={setProfilePanelOpen} />
                  )}
                </div>
              ) : (
                <Link to="#">User</Link>
              )}
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li className="login-link">
              <Link to="/login" onClick={openLogin}>
                Login
              </Link>
              {isLoginOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <Login closeLogin={closeLogin} onLogin={handleLogin} />
                  </div>
                </div>
              )}
            </li>
            <li className="signup-link">
              <Link to="/signup" onClick={openSignup}>
                Sign Up
              </Link>
              {isSignupOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <Signup closeSignup={closeSignup} />
                  </div>
                </div>
              )}
            </li>
          </>
        )}
      </ul>
      {isFriendsPanelOpen && <FriendsPanel closeFriendsPanel={closeFriendsPanel} isOpen={isFriendsPanelOpen} />}
    </nav>
  );
};

export default Navbar;









