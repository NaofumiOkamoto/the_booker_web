import React from 'react';
import { Link } from 'react-router-dom';

const History: React.FC = () => {
  return (
    <div>
      <h1>履歴</h1>
      <Link to="/"><button>Go to Home</button></Link>
    </div>
  );
};

export default History;