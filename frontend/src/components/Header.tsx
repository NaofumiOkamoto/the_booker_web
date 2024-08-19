// src/components/Header.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config';

const Header: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [isOpenHistory, setIsOpenHistory] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const openHistory = () => {
    setIsOpenHistory(!isOpenHistory)
  }

  return (
    <header>
      <div className='header'>
        <div className='flex'></div>
        <div className="title-section flex">
          <h1>The Booker</h1>
          <div className="lang-buttons">
            <button className="fi fi-jp" />
            <button className="fi fi-us" />
          </div>
        </div>
        <div className='auth-button-area flex'>
          {email ? (
            <div className="auth-buttons">
              <span>{email}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login"><button>ログイン</button></Link>
              <Link to="/signup"><button>登録</button></Link>
            </div>
          )}
        </div>
      </div>
      <nav className="nav">
        <Link to="/"><button>ホーム</button></Link>
        <div>
          <p><button onClick={openHistory}>履歴</button></p>
          {isOpenHistory && (
            <div>
              <p><Link to="/book-history"><button>予約履歴</button></Link></p>
              <p><Link to="/buy-history"><button>購入履歴</button></Link></p>
            </div>
          )}
        </div>
        <Link to="/manual"><button>使い方</button></Link>
        <Link to="/fee"><button>料金</button></Link>
        <Link to="/contact"><button>お問い合わせ</button></Link>
        <Link to="/setting"><button>設定</button></Link>
      </nav>
    </header>
  );
};

export default Header;
