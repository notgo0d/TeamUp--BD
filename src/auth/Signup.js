// Signup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Login from './Login';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../bd/firebase';

const Signup = ({ closeSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please enter matching passwords.');
        return;
      }

      const authObject = getAuth();
      const usernameDoc = await getDoc(doc(firestore, 'usernames', username));
      const emailDoc = await getDoc(doc(firestore, 'emails', email));

      if (usernameDoc.exists()) {
        setErrorMessage('Username is already taken. Please choose a different one.');
        return;
      }

      if (emailDoc.exists()) {
        setErrorMessage('Email is already taken. Please use a different one.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(authObject, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        username: username,
      });

      await setDoc(doc(firestore, 'usernames', username), { uid: user.uid });
      await setDoc(doc(firestore, 'emails', email), { uid: user.uid });

      navigate('/login');
      closeSignup();
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  const toggleLogin = () => {
    setLoginOpen(!isLoginOpen);
    closeSignup();
  };

  return (
    <div className="auth-modal">
      <span className="close-btn" onClick={closeSignup}>×</span>
      <h2>Welcome Gamer!</h2>
      <form onSubmit={handleSignup}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <button type="submit">Sign Up</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Have an account? <span className="login-link" onClick={toggleLogin}>Login</span></p>
      </form>

      {isLoginOpen && <Login closeLogin={() => setLoginOpen(false)} />}
    </div>
  );
};

export default Signup;















