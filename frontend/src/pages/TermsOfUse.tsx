import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsOfUse: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='manual-container'>
      <h2>{t('terms_of_use')}</h2>
    </div>
  );
};

export default TermsOfUse;