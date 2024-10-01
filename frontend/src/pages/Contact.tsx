import React from 'react';
import '../Contact.css';  // CSSファイルをインポート
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="contact-form-container">
      <h2>{t('contact_us')}</h2>
      <form>
        <div className="contact-form-group">
          <label>{t('name')}</label>
          <input type="text" required />
        </div>
        <div className="contact-form-group">
          <label>{t('email')}</label>
          <input type="email" required />
        </div>
        <div className="contact-form-group">
          <label>{t('message')}</label>
          <textarea required />
        </div>
        <button type="submit" className="contact-form-button">{t('send')}</button>
      </form>
    </div>
  );
};

export default Contact;
