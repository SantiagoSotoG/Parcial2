import React, { useState } from 'react';

const Formularioss = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('');

  const handleInputChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onStartGame(playerName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter player name" value={playerName} onChange={handleInputChange} />
      <button type="submit">Start Game</button>
    </form>
  );
};

export default Formularioss;
