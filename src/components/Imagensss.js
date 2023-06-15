import React from 'react';

const Imagensss= ({ card }) => {
  if (!card) {
    return null;
  }

  return (
    <div>
    <img src={card.image} alt={card.code} />
    <h2>{card.value} of {card.suit}</h2>
  </div>
  );
};

export default Imagensss;