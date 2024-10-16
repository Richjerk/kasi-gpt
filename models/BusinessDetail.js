import React from 'react';
import Feedback from './Feedback';

const BusinessDetail = ({ business }) => {
  return (
    <div>
      <h2>{business.name}</h2>
      <p>{business.description}</p>
      <p>Email: {business.email}</p>
      <p>Phone: {business.phone}</p>
      <p>Address: {business.address}</p>
      <img src={`/uploads/${business.image}`} alt={business.name} />
      {/* Include the Feedback component here */}
      <Feedback businessId={business._id} />
    </div>
  );
};

export default BusinessDetail;
