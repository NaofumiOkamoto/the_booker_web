import React from 'react';
import { Link } from 'react-router-dom';

const BookHistory: React.FC = () => {
  return (
    <div>
      <h1>予約履歴</h1>
      <Link to="/"><button>Go to Home</button></Link>
    </div>
  );
};

export default BookHistory;