import React, { useState, useEffect } from 'react';
import Formularioss from './components/Formularioss';
import Imagensss from './components/Imagensss';

const App = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerCard, setPlayerCard] = useState(null);
  const [playerDeckId, setPlayerDeckId] = useState(null);
  const [oppositeCard, setOppositeCard] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);

  useEffect(() => {
    const fetchInitialCard = async () => {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
      const data = await response.json();
      setPlayerCard(data.cards[0]);
      setPlayerDeckId(data.deck_id);
    };

    fetchInitialCard();
  }, []);

  useEffect(() => {
    if (playerCard && drawnCards.length > 0) {
      const opposite = drawnCards.find(card => isOppositeCard(playerCard, card));
      setOppositeCard(opposite);
    }
  }, [playerCard, drawnCards]);

  const isOppositeCard = (card1, card2) => {
    const opposites = {
      'CLUBS': 'DIAMONDS',
      'DIAMONDS': 'CLUBS',
      'HEARTS': 'SPADES',
      'SPADES': 'HEARTS',
    };

    return opposites[card1.suit] === card2.suit && card1.value === card2.value;
  };

  const handleDrawCard = async () => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${playerDeckId}/draw/?count=1`);
    const data = await response.json();

    if (data.cards && data.cards.length > 0) {
      const drawnCard = data.cards[0];

      if (isOppositeCard(playerCard, drawnCard)) {
        setOppositeCard(drawnCard);
      } else {
        setDrawnCards((prevDrawnCards) => [drawnCard]);
      }
    }
  };

  return (
    <div>
      {playerName ? (
        <div>
          <h2>Player: {playerName}</h2>
          <Imagensss card={playerCard} />
          {oppositeCard ? (
            <>
              <h2>Opposite card: {oppositeCard.value} of {oppositeCard.suit}</h2>
              <img src={oppositeCard.image} alt={oppositeCard.code} />
            </>
          ) : (
            <div>
              <button onClick={handleDrawCard}>Draw Card</button>
              <h3>Drawn Cards:</h3>
              {drawnCards.map((card, index) => (
                <Imagensss key={index} card={card} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Formularioss onStartGame={setPlayerName} />
      )}
    </div>
  );
};

export default App;