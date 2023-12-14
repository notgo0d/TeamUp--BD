import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../bd/firebase';

const Login = ({ closeLogin, onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const authObject = getAuth();

      // Check if the identifier (email or username), password are provided
      if (!identifier || !password) {
        setErrorMessage('Please enter email/username and password.');
        return;
      }

      // Sign in user with email or username and password
      const userCredential = await signInWithEmailAndPassword(authObject, identifier, password);

      // Call the onLogin prop to update the login state in the parent component
      onLogin(userCredential.user);

      // Redirect the user to their profile page
      navigate('/profile');

      // Close the login modal
      closeLogin();
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('Invalid email/username or password. Please try again.');
    }
  };

  return (
    <div className="auth-modal">
      <span className="close-btn" onClick={closeLogin}>×</span>
      <h2>Ready to teamUp!</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="identifier">Email/Username:</label>
        <input
          type="text"
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Link to the signup page with updated styles */}
        <p className="signup-link">
          Don't have an account? <Link to="/signup" style={{ color: '#4caf50', fontSize: '14px' }}>Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
















