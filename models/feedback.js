import React, { useEffect, useState } from 'react';

const Feedback = ({ businessId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`/api/feedback/${businessId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch feedback');
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFeedback();
  }, [businessId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Feedback</h3>
      {feedbacks.length > 0 ? (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback._id}>{feedback.userFeedback}</li>
          ))}
        </ul>
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
};

export default Feedback;

