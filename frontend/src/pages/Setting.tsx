import React from 'react';
import { Link } from 'react-router-dom';

const Setting: React.FC = () => {
  return (
    <div>
      <h1>設定</h1>
      <Link to="/"><button>Go to Home</button></Link>
    </div>
  );
};

export default Setting;