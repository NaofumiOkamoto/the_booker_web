import React from 'react';
import '../Contact.css';  // CSSファイルをインポート

const Contact: React.FC = () => {
  return (
    <div className="contact-form-container">
      <h2>お問い合わせ</h2>
      <form>
        <div className="contact-form-group">
          <label>お名前*</label>
          <input type="text" required />
        </div>
        <div className="contact-form-group">
          <label>メールアドレス*</label>
          <input type="email" required />
        </div>
        <div className="contact-form-group">
          <label>お問い合わせ内容*</label>
          <textarea required />
        </div>
        <button type="submit" className="contact-form-button">
            送信する
        </button>
      </form>
    </div>
  );
};

export default Contact;
