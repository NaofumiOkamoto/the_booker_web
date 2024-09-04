import React from 'react';
import { useAuth } from '../auth/AuthProvider'

const CustomConfirm: React.FC = () => {
  const { promptLogin, setEbayLinkModal } = useAuth()
  const handleCancel = () => {
    setEbayLinkModal(false)
  }
  return (
    <div id='overlay'>
      <div className='modal'>
        <p>ebayと連携してください</p>
        <p>ebayと連携することで The Booker のサービスを利用することができます</p>
        <button className="link-button" onClick={promptLogin}>ebay連携ページに移動する</button>
        <button className="cancel-button" onClick={handleCancel}>閉じる</button>
      </div>
    </div>
  );
}

export default CustomConfirm;
