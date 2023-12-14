// Updated Team.js

import React, { useState, useEffect, useRef } from 'react';
import './Team.css';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { storage, firestore } from '../bd/firebase';

const TeamMember = ({ member, index, onAddMember }) => (
  <li key={member.id} className="team-list-item">
    <img src={member.avatar} alt={`${member.name}'s avatar`} className="team-avatar" />
    <div className="team-info">
      <span className="team-name">{member.name}</span>
      <span className="team-role">{member.role}</span>
    </div>
    {index !== 0 && (
      <span className="team-invite" onClick={() => onAddMember(index)}>
        +
      </span>
    )}
  </li>
);

const Team = ({ closePanel, isOpen, loggedInUserName }) => {
  const [isCreateTeamOpen, setCreateTeamOpen] = useState(false);
  const [isMyTeamOpen, setMyTeamOpen] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: loggedInUserName, role: 'Team Leader', avatar: 'https://placekitten.com/40/40' },
    ...Array.from({ length: 4 }).map((_, index) => ({ id: index + 2, name: '', role: '', avatar: '' })),
  ]);

  const panelRef = useRef(null);
  const teamListRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        closePanel();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
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

      const isConfirmed = window.confirm(`Are you sure you want to create the team "${teamName}"?`);

      if (!isConfirmed) {
        return;
      }

      const photoRef = storageRef(storage, `team-photos/${teamPhoto.name}`);
      await uploadBytes(photoRef, teamPhoto);

      const photoURL = await getDownloadURL(photoRef);

      const actualTeamMembers = teamMembers.slice(0, 1);
      const filteredMembers = actualTeamMembers.filter(member => member.name && member.role);

      const newTeam = {
        name: teamName,
        game: teamGame,
        type: teamType,
        photo: photoURL,
        members: filteredMembers,
      };

      const teamDocRef = await addDoc(collection(firestore, 'teams'), newTeam);
      console.log('Team added with ID:', teamDocRef.id);

      setTeamData((prevTeamData) => [...prevTeamData, { id: teamDocRef.id, ...newTeam }]);

      setCreateTeamOpen(false);

      fetchTeams();
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
  }, [isOpen, loggedInUserName, fetchTeams]);

  return (
    <div ref={panelRef} className={`team-panel ${isOpen ? 'open' : ''}`}>
      <div className="team-content">
        <h2 onClick={toggleMyTeam}>My Team</h2>
        {isMyTeamOpen && (
          <div className="team-list-container">
            {teamData.map((team) => (
              <div key={team.id}>
                <p>{team.name} - {team.game} - {team.type}</p>
                {team.photo && <img src={team.photo} alt={`${team.name}'s team`} style={{ width: '100px', height: '100px' }} />}
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
                <div className="create-team-type">
                  <label className="create-team-radio">
                    <input type="radio" name="teamType" value="competitive" />
                    Competitive
                  </label>
                  <label className="create-team-radio">
                    <input type="radio" name="teamType" value="casual" />
                    Casual
                  </label>
                </div>
              </label>
              <label>
                Team Photo:
                <input ref={fileInputRef} className="create-team-input" type="file" accept="image/*" />
              </label>

              <ul className="team-list">
                {teamMembers.map((member, index) => (
                  <TeamMember key={member.id} member={member} index={index} onAddMember={handleAddMember} />
                ))}
              </ul>

              <button className="create-team-button" type="submit">
                Create Team
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;











