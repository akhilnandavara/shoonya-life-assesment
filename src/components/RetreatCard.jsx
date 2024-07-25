// src/components/RetreatCard.jsx
import React from 'react';

const RetreatCard = ({ image, title, description, date, location, price }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-4">
      <img className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className="text-gray-600 text-sm">{date}</p>
        <p className="text-gray-600 text-sm">{location}</p>
        <p className="text-gray-600 text-sm">{price}</p>
      </div>
    </div>
  );
};

export default RetreatCard;
