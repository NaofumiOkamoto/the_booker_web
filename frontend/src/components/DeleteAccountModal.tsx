import React from 'react';

const DeleteAccountModal: React.FC<{setModal: (b: boolean) => void}> = ({setModal}) => {
  const handleCancel = () => {
    setModal(false)
  }
  return (
    <div id='overlay'>
      <div className='modal'>
        <p>どうする？</p>
        <button className="delete-button" onClick={() => {}}>削除する</button>
        <button className="cancel-button" onClick={handleCancel}>キャンセル</button>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
