import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import '/node_modules/flag-icons/css/flag-icons.min.css'

const Home: React.FC = () => {
  const [isSearched, setIsSearched] = useState(false)

  const clickSearch = () => {
    setIsSearched(true)
  }

  const clickConfirm = () => {
    setIsSearched(false)
  }

  return (
    <div className="container">
        <div className="auth-buttons">
          <button>ログイン</button>
          <button>登録</button>
        </div>
      <header className="header">
        <div className="title-section">
          <h1>The Booker</h1>
          <div className="lang-buttons">
            <button className="fi fi-jp" />
            <button className="fi fi-us" />
          </div>
        </div>
      </header>

      <nav className="nav">
        <Link to="/"><button>ホーム</button></Link>
        <Link to="/history"><button>履歴</button></Link>
        <Link to="/manual"><button>使い方</button></Link>
        <Link to="/fee"><button>料金</button></Link>
        <Link to="/question"><button>よくある質問</button></Link>
        <Link to="/contact"><button>お問い合わせ</button></Link>
        <Link to="/setting"><button>設定</button></Link>
      </nav>

     <main className="main-content">
       <p>The Bookerは世界最大オークション「eBay」の予約入札サービスです。</p>
      <p>オークション形式で出品されている商品に、入札する「金額」「時間」を予約登録して自動入札する便利な機能を提供しております。</p>
     </main>

     <div>
      <h2>予約登録</h2>
      <input className="input" placeholder=' eBay item number'></input>
      <button onClick={clickSearch}>検索</button>
      {isSearched && (
        <>
        <div className='searched-product'>
          <div><p>商品名</p><p>aaa</p></div>
          <div><p>現在価格</p><p>aaa</p></div>
          <div><p>終了日時</p><p>aaa</p></div>
        </div>
        <div>
          <p><input className="input" placeholder=' 入札金額'></input></p>
          <p><input className="input" placeholder=' 入札時間'></input></p>
        </div>
        <button onClick={clickConfirm}>登録</button>
        </>
      )}

     </div>

   </div>
  );
};

export default Home;