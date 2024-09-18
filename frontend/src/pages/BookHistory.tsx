import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../BookHistory.css';
import { useAuth } from '../auth/AuthProvider'
import DeleteBookModal from '../components/DeleteBookModal'
import dayjs from 'dayjs'

interface Book {
  id: number;
  user_id: string;
  item_number: string;
  product_name: string;
  seconds: number;
  bid_amount: number;
  close_time: Date;
  current_price: number;
  shipping_cost: number;
  image_url: string;
  created_at: Date;
}
const BookHistory: React.FC = () => {
  const [filter, setFilter] = useState('reservation')
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [bidAmount, setBidAmount] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [bookId, setBookId] = useState('')
  const [modal, setModal] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const { uid } = useAuth()
  const env = import.meta.env.VITE_ENV;

  useEffect(() => {
    if (uid) getBooks()
  }, [uid])

  const getBooks = async () => {
    const res = await axios.get(`${
        env === 'development' ? 'http://localhost:5001' : ''
      }/api/book?uid=${uid}`)

    setBooks(res.data.books)
    changeFilter('reservation', res.data.books)
  }

  useEffect(() => {
  }, [bidAmount, seconds])

  const changeFilter = (filter: 'reservation' | 'finished', bookss: Book[]) => {
    console.log('filter')
    const filtered = bookss.filter((book) => {
      console.log(book)
      if (filter === 'reservation') {
        return dayjs(book.close_time) >= dayjs()
      } else if (filter === 'finished'){
        return dayjs(book.close_time) <= dayjs()
      }
    })
    setFilteredBooks(filtered)
    setFilter(filter)
  }

  const edit = (book_id: number, amo: number, seco: number) => {
    setBookId(String(book_id))
    setIsEdit(true)
    setBidAmount(amo)
    setSeconds(seco)
  }

  const editCancel = () => {
    setIsEdit(false)
    setBookId('')
  }

  const save = async () => {
    const saveRes = await axios.put(`${env === 'development' ? 'http://localhost:5001' : ''}/api/book/${Number(bookId)}`,
      {
        ...{user_id: uid},
        ...{bid_amount: Number(bidAmount)},
        ...{seconds: seconds},
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    console.log('saveRes', saveRes)
    const updatedBooks = books.map(book => 
      book.id === Number(bookId) 
        ? { ...book, bid_amount: Number(bidAmount), seconds: seconds } 
        : book
    );
    
    setBooks(updatedBooks);
    setIsEdit(false);
    setBookId('');
  }

  const clickDelete = (id: number) => {
    setDeleteId(String(id))
    setModal(true)
  }

  const deleteBook = async (bookId: string) => {
    const deleteRes = await axios.delete(`${env === 'development' ? 'http://localhost:5001' : ''}/api/book/${Number(bookId)}`,
      { headers: { 'Content-Type': 'application/json' } }
    )
    console.log(deleteRes)
    getBooks()
  }

  return (
    <div className="reservation-history">
      {modal && (
        <DeleteBookModal
          setModal={setModal}
          deleteBook={deleteBook}
          deleteId={deleteId}
        />
      )}
      <h2>予約履歴</h2>
      <div className="summary">
        <span>全{filteredBooks.length}件</span>
        <div className="filters">
          <label>絞り込み：</label>
          <select value={filter} onChange={(e) => {changeFilter(e.target.value as 'reservation' | 'finished', books)}}>
            <option value="reservation">予約中</option>
            <option value="finished">予約終了</option>
          </select>
          <label>並べ替え：</label>
          <select>
            <option value="newest">閲覧日時の新しい順</option>
          </select>
        </div>
      </div>

    
      {(filter === 'reservation') &&
        <>
          <h3>予約中</h3>
            <table>
              <thead>
                <tr>
                  <th>画像</th>
                  <th>商品名<br />（eBay item number）</th>
                  <th>終了日時<br />残り時間</th>
                  <th>現在価格 <br />（送料）</th>
                  <th>入札価格</th>
                  <th>入札時間</th>
                  <th>操作</th>
                </tr>
              </thead>
            {filteredBooks?.map((book) => {
              return (
                <tbody key={book.id}>
                  <tr>
                    <td><img src={book?.image_url} width="100px" /></td>
                    <td>{book.product_name}<br />({book.item_number})</td>
                    <td>{dayjs(book.close_time).format('YYYY/MM/DD hh:mm:ss')}</td>
                    <td>${book.current_price}<br /> {`($${book.shipping_cost})`} </td>
                    { isEdit && bookId === String(book.id)?
                      <td>$<input className='book-edit-input' value={bidAmount} onChange={(t) => setBidAmount(Number(t.target.value))} /></td>
                      : 
                      <td>${book.bid_amount}</td>
                    }
                    { isEdit && bookId === String(book.id) ? 
                      <td>終了 <input className='book-edit-input' value={seconds} onChange={(t) => setSeconds(Number(t.target.value))} />秒前</td>
                      :
                      <td>終了{book.seconds}秒前</td>
                    }
                    { isEdit && bookId === String(book.id) ?
                      <td>
                        <button onClick={() => save()}>保存</button>
                        <button onClick={() => editCancel()}>キャンセル</button>
                      </td>
                      : 
                      <td>
                        <button onClick={() => edit(book.id, book.bid_amount, book.seconds)}>編集</button>
                        <button onClick={() => clickDelete(book.id)}>削除</button>
                      </td>
                    }
                  </tr>
                </tbody>
              )
            })}
            </table>
        </>
      }
      {(filter === 'finished') &&
        <>
          <h3>予約終了</h3>
          {filteredBooks?.map((book) => {
            return (
              <table>
                <thead>
                  <tr>
                    <th>画像</th>
                    <th>商品名<br />（eBay item number）</th>
                    <th>終了日時</th>
                    <th>最終価格<br />（送料）</th>
                    <th>入札価格</th>
                    <th>入札結果</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><img src={book?.image_url} width="100px" /></td>
                    <td>{book.product_name}<br />({book.item_number})</td>
                    <td>{dayjs(book.close_time).format('YYYY/MM/DD hh:mm:ss')}</td>
                    <td>$99999</td>
                    <td>$99999</td>
                    <td>落札</td>
                    <td>
                      <button onClick={() => clickDelete(book.id)}>削除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )
          })}
        </>
    }
    </div>
  );
};

export default BookHistory;
