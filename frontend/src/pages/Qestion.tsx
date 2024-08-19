import React from 'react';
import { Link } from 'react-router-dom';

const Question: React.FC = () => {
  window.confirm("これが確認ダイアログです。");
  return (
    <div>
      <h1>よくある質問</h1>
      <Link to="/"><button>Go to Home</button></Link>
    </div>
  );
};

export default Question;