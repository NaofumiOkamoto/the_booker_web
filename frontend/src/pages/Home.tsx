import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import '/node_modules/flag-icons/css/flag-icons.min.css'

const Home: React.FC = () => {
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

     </div>

   </div>
  );
};

export default Home;