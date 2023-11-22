import React, { useState, useEffect } from 'react';
import './Team.css';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../bd/firebase';

const TeamViewer = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsQuery = query(collection(firestore, 'teams'));
        const teamsSnapshot = await getDocs(teamsQuery);
        const teamsData = teamsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTeamData(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error.message);
        setError('Error fetching teams. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        teamData.map((team) => (
          <div key={team.id}>
            {/* Display team information */}
            {/* ... (your existing code) */}
          </div>
        ))
      )}
    </div>
  );
};

export default TeamViewer;

