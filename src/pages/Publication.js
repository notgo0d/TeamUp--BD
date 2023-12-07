// Publication.js
import React from 'react';
import Navbar from '../components/navbar';
import './Publication.css'; // Add your custom styles here

const Publication = () => {
  return (
    <div>
      <Navbar />
      <div className="publication-container">
        <h1 className="publication-title">Publications</h1>
        <div className="publication-list">
          <div className="publication-item">
            <h2 className="publication-item-title">Publication Title 1</h2>
            <p className="publication-item-content">Publication content goes here...</p>
          </div>
          <div className="publication-item">
            <h2 className="publication-item-title">Publication Title 2</h2>
            <p className="publication-item-content">More content for the second publication...</p>
          </div>
          {/* Add more publication items as needed */}
        </div>
      </div>
    </div>
  );
};

export default Publication;






















