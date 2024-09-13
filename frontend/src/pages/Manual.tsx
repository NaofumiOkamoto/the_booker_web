import React from 'react';

const Manual: React.FC = () => {
  return (
    <div className='manual-container'>
      <h1>使い方</h1>
      <h3>まずはThe Bookerでアカウント作成をして、ご自身のeBayアカウントを連携してください。<br />eBay連携までの手順は以下となります。 </h3>

      <div className='manual-process'>
        <p>1. 右上の「登録」ボタンよりThe Bookerへのアカウント登録。</p>
        <p>2. その後eBayへ連携するためのアラートが表示されますので、「ebay連携ページに移動する」ボタンを押すとeBayのログイン画面へ。</p>
        <p>3. 入札したいアカウントでeBayへログイン後、「Grant Application Access: The Booker」の画面にてAgreeボタンを押すと連携完了。</p>
      </div>

      <h3>The BookerとeBayの連携が完了した後、ホーム下部の「予約登録」より入札予約が可能となります。<br />予約登録の手順は以下となります。</h3>

      <div className='manual-process'>
        <p>1. ホーム下部の「予約登録」にて入札予約したいeBay item numberを入力して検索。(「ウォッチリストから選択する」のボタンより商品を選択することも可能です。) </p>
        <p>2. 入札予約したい商品が表示されたら、「入札したい価格」「入札したい時間」を設定。</p>
        <p>3. 「登録」ボタンで完了。</p>
      </div>

    </div>
  );
};

export default Manual;