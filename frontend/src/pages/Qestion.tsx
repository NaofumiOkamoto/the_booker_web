import React from 'react';

const Question: React.FC = () => {
  window.confirm("これが確認ダイアログです。");
  return (
    <div>
      <h1>よくある質問</h1>
    </div>
  );
};

export default Question;