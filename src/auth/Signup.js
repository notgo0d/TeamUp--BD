// Signup.js

import React, { useState } from 'react';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../bd/firebase';

const Signup = ({ closeSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const authObject = getAuth();

      // Check if the username or email is already taken
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

      // Create user in Firebase Authentication with email, password, and additional data (username)
      const userCredential = await createUserWithEmailAndPassword(authObject, email, password);
      const user = userCredential.user;

      // Add user data to Firestore (including username)
      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        username: username,
      });

      // Add username and email to separate collections to check for duplicates
      await setDoc(doc(firestore, 'usernames', username), { uid: user.uid });
      await setDoc(doc(firestore, 'emails', email), { uid: user.uid });

      // Close the signup modal
      closeSignup();
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <div className="auth-modal">
      <span className="close-btn" onClick={closeSignup}>×</span>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <button type="submit">Sign Up</button>

        {/* Display error message if present */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Signup;











