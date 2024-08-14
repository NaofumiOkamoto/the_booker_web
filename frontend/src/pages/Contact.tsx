import React from 'react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  return (
    <div>
      <h1>お問い合わせ</h1>
      <Link to="/"><button>Go to Home</button></Link>
    </div>
  );
};

export default Contact;