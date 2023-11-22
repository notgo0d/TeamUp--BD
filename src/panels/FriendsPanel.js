// FriendsPanel.js
import React, { useState, useEffect, useRef } from 'react';
import './friends.css';

const FriendsPanel = ({ closeFriendsPanel, isOpen }) => {
  const [filter, setFilter] = useState('');
  const friends = [
    { id: 1, name: 'John Doe', avatar: 'https://placekitten.com/40/40', status: 'connected' },
    { id: 2, name: 'Jane Doe', avatar: 'https://placekitten.com/41/41', status: 'offline' },
    { id: 3, name: 'Alice', avatar: 'https://placekitten.com/42/42', status: 'idle' },
    { id: 4, name: 'Bob', avatar: 'https://placekitten.com/43/43', status: 'in-game' },
  ];

  const panelRef = useRef(null);

  const closeFriendsPanelOnOutsideClick = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      console.log("FriendsPanel - Closing panel");
      closeFriendsPanel();
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filterFriends = (filter, friendsList) => {
    return friendsList.filter((friend) =>
      friend.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredFriends = filterFriends(filter, friends);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', closeFriendsPanelOnOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', closeFriendsPanelOnOutsideClick);
    };
  }, [isOpen, closeFriendsPanel]);

  return (
    <div ref={panelRef} className={`friends-panel ${isOpen ? 'open' : ''}`}>
      <h2>
        Friends
        <input
          type="text"
          className="filter-input"
          placeholder="looking for a friend?"
          value={filter}
          onChange={handleFilterChange}
        />
      </h2>
      <ul className="friend-list">
        {filteredFriends.map((friend) => (
          <li key={friend.id} className="friend-list-item">
            <img src={friend.avatar} alt={`${friend.name}'s avatar`} className="friend-avatar" />
            <div className="friend-info">
              <span className="friend-name">{friend.name}</span>
              <span className={`friend-status ${friend.status}`}>{friend.status}</span>
            </div>
            <span className="friend-invite">+</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsPanel;








