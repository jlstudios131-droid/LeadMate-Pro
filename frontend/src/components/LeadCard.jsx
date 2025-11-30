import React from 'react';

const LeadCard = ({ lead }) => {
  const { name, email, phone, property, score, status } = lead;
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Property: {property}</p>
      <p>Lead Score: <span className="font-bold">{score}</span></p>
      <p>Status: <span className="font-semibold">{status}</span></p>
    </div>
  );
};

export default LeadCard;
