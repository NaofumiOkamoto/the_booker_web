// src/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider'
import CustomConfirm from '../components/EbayLinkModal'
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { email, ebayUserId, ebayLinkModal } = useAuth()
  const { i18n, t } = useTranslation();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <header>
      {ebayLinkModal && email && (<CustomConfirm />)}
      <div className='header'>
        <div className='flex'></div>
        <div className="title-section flex">
          <h1>The Booker</h1>
          {/* <div className="lang-buttons">
            <button className="fi fi-jp" />
            <button className="fi fi-us" />
          </div> */}
          <label>{t('language')}</label>
          <select onChange={changeLanguage} defaultValue={i18n.language}>
            <option value="ja">日本語</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className='auth-button-area flex'>
          {email ? (
            <div className="auth-buttons">
              <span>{email}</span>でログイン中
              {ebayUserId && <p>ebayと接続済み { ebayUserId }</p>}
              
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login"><button>ログイン</button></Link>
              <Link to="/signup"><button>登録</button></Link>
            </div>
          )}
        </div>
      </div>
      {email && (
        <nav className="nav">
          <Link to="/"><button>{t('home')}</button></Link>
          <Link to="/book-history"><button>{t('history')}</button></Link>
          <Link to="/manual"><button>{t('how_to_use')}</button></Link>
          <Link to="/fee"><button>{t('price')}</button></Link>
          <Link to="/contact"><button>{t('contact_us')}</button></Link>
          <Link to="/setting"><button>{t('settings')}</button></Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
