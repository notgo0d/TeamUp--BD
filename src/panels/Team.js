import React, { useState, useEffect, useRef } from 'react';
import './Team.css';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { storage, firestore } from '../bd/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const Team = ({ closePanel, isOpen, loggedInUserName }) => {
  const [filter, setFilter] = useState('');
  const [isCreateTeamOpen, setCreateTeamOpen] = useState(false);
  const [isMyTeamOpen, setMyTeamOpen] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: loggedInUserName, role: 'Team Leader', avatar: 'https://placekitten.com/40/40' },
    { id: 2, name: '+ Add Member', role: '', avatar: '' },
    { id: 3, name: '+ Add Member', role: '', avatar: '' },
    { id: 4, name: '+ Add Member', role: '', avatar: '' },
    { id: 5, name: '+ Add Member', role: '', avatar: '' },
  ]);

  const panelRef = useRef(null);
  const teamListRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        closePanel();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      // Scroll to the top when the panel is opened
      if (teamListRef.current) {
        teamListRef.current.scrollTop = 0;
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, closePanel]);

  const toggleCreateTeam = () => {
    setCreateTeamOpen((prev) => !prev);
    setMyTeamOpen(false);
  };

  const toggleMyTeam = () => {
    setMyTeamOpen((prev) => !prev);
    setCreateTeamOpen(false);
  };

  const handleTeamCreation = async (event) => {
    event.preventDefault();

    try {
      const teamName = event.target.elements.teamName.value;
      const teamGame = event.target.elements.teamGame.value;
      const teamType = event.target.elements.teamType.value;
      const teamPhoto = fileInputRef.current.files[0];

      // Upload team photo to Firebase Storage
      const storageRef = storage.ref();
      const photoRef = storageRef.child(`team-photos/${teamPhoto.name}`);
      await uploadBytes(photoRef, teamPhoto);

      // Get the download URL of the uploaded photo
      const photoURL = await getDownloadURL(photoRef);

      const newTeam = {
        name: teamName,
        game: teamGame,
        type: teamType,
        photo: photoURL, // Store the download URL in Firestore
        members: teamMembers.slice(0, 1),
      };

      // Add team data to Firestore
      const teamDocRef = await addDoc(collection(firestore, 'teams'), newTeam);
      console.log('Team added with ID:', teamDocRef.id);

      // Update the team data in the state with the team ID
      setTeamData((prevTeamData) => [...prevTeamData, { id: teamDocRef.id, ...newTeam }]);

      // Close the create team section
      setCreateTeamOpen(false);

      // Fetch teams after creating a new team
      fetchMyTeams();
    } catch (error) {
      console.error('Error during team creation:', error.message);
    }
  };

  const gameOptions = ['Game A', 'Game B', 'Game C'];

  const handleAddMember = (index) => {
    const friendName = prompt('Enter the name of the friend:');
    if (friendName) {
      const updatedMembers = [...teamMembers];
      updatedMembers[index] = { id: index + 1, name: friendName, role: 'Team Member', avatar: 'https://placekitten.com/40/40' };
      setTeamMembers(updatedMembers);
    }
  };

  // Function to fetch and display teams
  const fetchMyTeams = async () => {
    try {
      const teamsQuery = query(collection(firestore, 'teams'), where('members.0.name', '==', loggedInUserName));
      const teamsSnapshot = await getDocs(teamsQuery);
      const teamsData = teamsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTeamData(teamsData);
    } catch (error) {
      console.error('Error fetching teams:', error.message);
    }
  };

  // Move fetchTeams function outside of useEffect
  const fetchTeams = async () => {
    try {
      const teamsQuery = query(collection(firestore, 'teams'), where('members.0.name', '==', loggedInUserName));
      const teamsSnapshot = await getDocs(teamsQuery);
      const teamsData = teamsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTeamData(teamsData);
      console.log('Fetched Teams:', teamsData);
    } catch (error) {
      console.error('Error fetching teams:', error.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTeams();
    }
  }, [isOpen, loggedInUserName]);


  return (
    <div ref={panelRef} className={`team-panel ${isOpen ? 'open' : ''}`}>
      <h2 onClick={toggleMyTeam}>My Team</h2>
      {isMyTeamOpen && (
        <div className="team-list-container">
          {teamData.map((team) => (
            <div key={team.id}>
              <p>{team.name} - {team.game} - {team.type}</p>
              {team.photo && <img src={URL.createObjectURL(team.photo)} alt={`${team.name}'s team`} style={{ width: '100px', height: '100px' }} />}
            </div>
          ))}
        </div>
      )}

      <h2 className="create-team-header" onClick={toggleCreateTeam}>
        Create a Team
      </h2>
      {isCreateTeamOpen && (
        <div className="create-team-section">
          <form className="create-team-form" onSubmit={handleTeamCreation}>
            <label>
              Team Name:
              <input className="create-team-input" type="text" name="teamName" required />
            </label>
            <label>
              Team Game:
              <select className="create-team-input" name="teamGame">
                {gameOptions.map((game, index) => (
                  <option key={index} value={game}>
                    {game}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Team Type:
              <label className="create-team-radio">
                <input type="radio" name="teamType" value="competitive" />
                Competitive
              </label>
              <label className="create-team-radio">
                <input type="radio" name="teamType" value="casual" />
                Casual
              </label>
            </label>
            <label>
              Team Photo:
              <input ref={fileInputRef} className="create-team-input" type="file" accept="image/*" />
            </label>

            <ul className="team-list">
              {teamMembers.map((member, index) => (
                <li key={member.id} className="team-list-item">
                  <img src={member.avatar} alt={`${member.name}'s avatar`} className="team-avatar" />
                  <div className="team-info">
                    <span className="team-name">{member.name}</span>
                    <span className="team-role">{member.role}</span>
                  </div>
                  {index !== 0 && (
                    <span className="team-invite" onClick={() => handleAddMember(index)}>
                      +
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <button className="create-team-button" type="submit">
              Create Team
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Team;
