import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider'
import ToggleSwitch from '../components/ToggleSwitch';
import DeleteAccountModal from '../components/DeleteAccountModal'
import { useTranslation } from 'react-i18next';

const Setting: React.FC = () => {
  const { t } = useTranslation();
  const { email, ebayUserId, handleLogout, promptLogin } = useAuth()
  const [success, setSuccess] = useState(false)
  const [modal, setModal] = useState(false)
  const showModal = () => {
    setModal(true)
  }
  console.log(success)
  return (
    <div className="account-settings-container">
      {modal && (
        <DeleteAccountModal
          setModal={setModal}
        />
      )}
      <h2 className="title">{t('account_information')}</h2>

      <div className="account-info">
        <div className="info-item">
          <span>The Booker {t('email')}</span>
          <span>{email}</span>
          {/* <button className="change-button">変更</button> */}
        </div>

        <div className="info-item">
          <span>eBay {t('account')}</span>
          <span>{ebayUserId || '連携されていません'}</span>
          { ebayUserId
            ? <span>連携済み</span>
            : <button onClick={promptLogin} >連携する</button>
          }
        </div>
      </div>

      <div className="button-container">
        <button className="logout-button" onClick={handleLogout}>{t('log_out')}</button>
        <button onClick={showModal} className="delete-button">{t('delete_account')}</button>
      </div>

      <h3 className="notification-title">{t('notification')}</h3>

      <div className="notification-settings">
        <div className="notification-item">
          <ToggleSwitch label={t('when_won')} onChange={setSuccess} />
        </div>

        <div className="notification-item">
          <ToggleSwitch label={t('when_lost')} onChange={setSuccess} />
        </div>

        <div className="notification-item">
          <ToggleSwitch label={t('when_outbid')} onChange={setSuccess} />
        </div>
      </div>

      <p className="notification-note">{t('notificate_description_1')}</p>
      <p className="notification-note">{t('notificate_description_2')}</p>
    </div>
  );
};

export default Setting;