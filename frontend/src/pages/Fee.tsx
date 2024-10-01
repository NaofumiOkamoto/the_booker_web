import React from 'react';
import '../Fee.css';
import { useTranslation } from 'react-i18next';

const Fee: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="fee-container">
      <h2>{t('pricing')}</h2>
      <p className="trial-text">{t('free_trial')}</p>

      <div className="fee-plans">
        <div className="plan">
          <h2>{t('fee_description')}</h2>
          <ul>
            <li>{t('fee_description_1')}</li>
            <li>{t('fee_description_2')}</li>
            <li>{t('fee_description_3')}</li>
            <li>{t('fee_description_4')}</li>
            <li>{t('fee_description_5')}</li>
          </ul>
        </div>
        <div className="plan">
          <h2>{t('subscribe_description')}</h2>
          <ul>
            <li>{t('subscribe_description_1')}</li>
            <li>{t('subscribe_description_2')}</li>
            <li>{t('subscribe_description_3')}</li>
          </ul>
          <button className="subscribe-button">{t('subscribe')}</button>
        </div>
      </div>

      <p className="payment-method">{t('payment_method')}</p>
    </div>
  );
};

export default Fee;