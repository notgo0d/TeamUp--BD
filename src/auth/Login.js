import React, { useState } from 'react';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../bd/firebase';

const Login = ({ closeLogin, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const authObject = getAuth();

      // Sign in user with email and password
      const userCredential = await signInWithEmailAndPassword(authObject, email, password);

      // Call the onLogin prop to update the login state in the parent component
      onLogin(userCredential.user);

      // Redirect the user to their profile page
      navigate('/profile');

      // Close the login modal
      closeLogin();
    } catch (error) {
      console.error('Error during login:', error.message);

      // Update the error message state
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="auth-modal">
      <span className="close-btn" onClick={closeLogin}>×</span>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {/* Your form fields */}
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>

        {/* Display error message if present */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;








