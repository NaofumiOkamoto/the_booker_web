import React from 'react';
import { useTranslation } from 'react-i18next';

const Manual: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='privacy-policy-container'>
      <h2>{t('privacy_policy')}</h2>
      <p>{t('privacy_policy_1')}</p>
      <h2>{t('what_privacy')}</h2>
      <p>{t('what_privacy_1')}</p>
      <h2>{t('how_privacy')}</h2>
      <p>{t('how_privacy_1')}</p>
      <h2>{t('purpose_privacy')}</h2>
      <p>{t('purpose_privacy_1')}</p>
      <h2>{t('provide_privacy')}</h2>
      <p>{t('provide_privacy_1')}</p>
      <h2>{t('check_privacy')}</h2>
      <p>{t('check_privacy_1')}</p>
      <h2>{t('request_privacy')}</h2>
      <p>{t('request_privacy_1')}</p>
      <h2>{t('change_privacy')}</h2>
      <p>{t('change_privacy_1')}</p>
      <h2>{t('contact_privacy')}</h2>
      <p>{t('contact_privacy_1')}</p>
    </div>
  );
};

export default Manual;