import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsOfUse: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='privacy-policy-container'>
      <h2>{t('terms_of_use')}</h2>
      <p>{t('terms_of_use_1')}</p>
      <p>{t('terms_of_use_2')}</p>

      <h2>{t('user_registration')}</h2>
      <p>{t('user_registration_1')}</p>

      <h2>{t('management_terms')}</h2>
      <p>{t('management_terms_1')}</p>
      <p>{t('management_terms_2')}</p>

      <h2>{t('use_service')}</h2>
      <p>{t('use_service_1')}</p>

      <h2>{t('charge_and_payment')}</h2>
      <p>{t('charge_and_payment_1')}</p>

      <h2>{t('personal_information')}</h2>
      <p>{t('personal_information_1')}</p>

      <h2>{t('discontinuation')}</h2>
      <p>{t('discontinuation_1')}</p>

      <h2>{t('limitation_liability')}</h2>
      <p>{t('limitation_liability_1')}</p>
      <p>{t('limitation_liability_2')}</p>

      <h2>{t('changes_in_details')}</h2>
      <p>{t('changes_in_details_1')}</p>
      <p>{t('changes_in_details_2')}</p>
      <p>{t('changes_in_details_3')}</p>
      <p>{t('changes_in_details_4')}</p>
      <p>{t('changes_in_details_5')}</p>

      <h2>{t('notice_or_contact')}</h2>
      <p>{t('notice_or_contact_1')}</p>

      <h2>{t('governing_law')}</h2>
      <p>{t('governing_law_1')}</p>
      <p>{t('governing_law_2')}</p>
      <p>{t('governing_law_3')}</p>
    </div>
  );
};

export default TermsOfUse;