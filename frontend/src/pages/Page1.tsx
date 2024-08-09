import React from 'react';
import { Link } from 'react-router-dom';

const Page1: React.FC = () => {
  return (
    <div>
      <h1>Page 1</h1>
      <Link to="/"><button>Go to Home</button></Link>
    </div>
  );
};

export default Page1;