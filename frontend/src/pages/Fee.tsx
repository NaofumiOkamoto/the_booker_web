import React from 'react';
import { Link } from 'react-router-dom';

const Fee: React.FC = () => {
  return (
    <div>
      <h1>料金</h1>
      <Link to="/"><button>Go to Home</button></Link>
    </div>
  );
};

export default Fee;