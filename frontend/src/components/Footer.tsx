// src/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider'
import CustomConfirm from './EbayLinkModal'
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <p> <Link to="/privacy-policy">{t('privacy_policy')}</Link> </p>
      <p> <Link to="/terms-of-use">{t('terms_of_use')}</Link> </p>
    </footer>
  );
};

export default Footer;
