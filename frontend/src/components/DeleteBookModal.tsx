import React from 'react';

const DeleteBookModal: React.FC<
    {
      setModal: (b: boolean) => void,
      deleteBook: (id: string) => void,
      deleteId: string
    }
  > = ({setModal, deleteBook, deleteId}) => {

  const clickDelete = () => {
    deleteBook(deleteId)
    setModal(false)
  }
  return (
    <div id='overlay'>
      <div className='modal'>
        <p>本当に削除しますか？</p>
        <button className="delete-button" onClick={() => clickDelete()}>削除する</button>
        <button className="cancel-button" onClick={() => setModal(false)}>キャンセル</button>
      </div>
    </div>
  );
}

export default DeleteBookModal;
