import React from 'react';
import { useTranslation } from 'react-i18next';

const Manual: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='manual-container'>
      <h2>{t('how_to_use')}</h2>
      <h3>{t('how_to_use_first')}</h3>

      <div className='manual-process'>
        <p>1. {t('how_to_use_first_1')}</p>
        <p>2. {t('how_to_use_first_2')}</p>
        <p>3. {t('how_to_use_first_3')}</p>
      </div>

      <h3>{t('how_to_use_second')}</h3>

      <div className='manual-process'>
        <p>1. {t('how_to_use_second_1')}</p>
        <p>2. {t('how_to_use_second_2')}</p>
        <p>3. {t('how_to_use_second_3')}</p>
      </div>

    </div>
  );
};

export default Manual;