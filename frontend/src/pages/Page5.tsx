import React from 'react';
import { Link } from 'react-router-dom';

const Page5: React.FC = () => {
  return (
    <div>
      <h1>Page 5</h1>
      <Link to="/"><button>Go to Home</button></Link>
    </div>
  );
};

export default Page5;