import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider'
import ToggleSwitch from '../components/ToggleSwitch';

const Setting: React.FC = () => {
  const { email, ebayUserName, handleLogout, promptLogin } = useAuth()
  const [success, setSuccess] = useState(false)
  console.log(success)
  return (
    <div className="account-settings-container">
      <h2 className="title">アカウント設定</h2>

      <div className="account-info">
        <div className="info-item">
          <span>The Bookerメールアドレス</span>
          <span>{email}</span>
          <button className="change-button">変更</button>
        </div>

        <div className="info-item">
          <span>eBayアカウント</span>
          <span>{ebayUserName || '連携されていません'}</span>
          <button onClick={promptLogin} className="change-button">変更</button>
        </div>
      </div>

      <div className="button-container">
        <button className="logout-button" onClick={handleLogout}>ログアウト</button>
        <button className="delete-button">アカウント削除（どうする？）</button>
      </div>

      <h3 className="notification-title">通知設定</h3>

      <div className="notification-settings">
        <div className="notification-item">
          <ToggleSwitch label="落札成功(オークションが終了して落札が成功した時)" onChange={setSuccess} />
        </div>

        <div className="notification-item">
          <ToggleSwitch label="落札失敗(オークションが終了して落札が失敗した時)" onChange={setSuccess} />
        </div>

        <div className="notification-item">
          <ToggleSwitch label="高値更新(現在価格が予約した価格を上回った時)" onChange={setSuccess} />
        </div>
      </div>

      <p className="notification-note">※ご登録されたメールアドレスへ通知いたします。</p>
    </div>
  );
};

export default Setting;