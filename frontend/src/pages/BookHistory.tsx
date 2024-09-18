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
  const [filter, setFilter] = useState<'reservation' | 'finished'>('reservation')
  const [sort, setSort] = useState('endtime_shot')
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
    changeFilter('reservation', 'close_time_shortest', res.data.books)
  }

  useEffect(() => {
  }, [bidAmount, seconds])

  const changeFilter = (selectFilter: 'reservation' | 'finished', selectSort: string, allBooks: Book[]) => {
    const filtered = allBooks.filter((book) => {
      switch (selectFilter) {
        case 'reservation':
          return dayjs(book.close_time) >= dayjs()
        case 'finished':
          return dayjs(book.close_time) <= dayjs()
        default:
          break;
      }
    })

    switch (selectSort) {
      case 'close_time_shortest': // close_timeまでの時間が短い順
        if (selectFilter === 'reservation') filtered.sort((a, b) => dayjs(a.close_time).diff(dayjs(b.close_time)))
        if (selectFilter === 'finished') filtered.sort((a, b) => dayjs(b.close_time).diff(dayjs(a.close_time)))
        break;
      case 'close_time_longest': // close_timeまでの時間が長い順
        if (selectFilter === 'reservation') filtered.sort((a, b) => dayjs(b.close_time).diff(dayjs(a.close_time)))
        if (selectFilter === 'finished') filtered.sort((a, b) => dayjs(a.close_time).diff(dayjs(b.close_time)))
        break;
      case 'current_price_highest': // current_priceが高い順
        filtered.sort((a, b) => b.current_price - a.current_price);
        break;
      case 'current_price_lowest': // current_priceが安い順
        filtered.sort((a, b) => a.current_price - b.current_price);
        break;
      case 'created_at_newest': // created_atが新しい順
        filtered.sort((a, b) => dayjs(b.created_at).diff(dayjs(a.created_at)));
        break;
      case 'created_at_oldest': // created_atが古い順
        filtered.sort((a, b) => dayjs(a.created_at).diff(dayjs(b.created_at)));
        break;
      default:
        break;
    }

    setFilteredBooks(filtered)
    setFilter(selectFilter)
    setSort(selectSort)
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
          <select value={filter} onChange={(e) => {changeFilter(e.target.value as 'reservation' | 'finished', sort, books)}}>
            <option value="reservation">予約中</option>
            <option value="finished">予約終了</option>
          </select>
          <label>並べ替え：</label>
          {filter === 'reservation' && (
            <select value={sort} onChange={(e) => {changeFilter(filter, e.target.value, books)}}>
              <option value="close_time_shortest">終了日時までに時間が短い順</option>
              <option value="close_time_longest">終了日時までの時間が長い順</option>
              <option value="current_price_highest">価格が高い順</option>
              <option value="current_price_lowest">価格が安い順</option>
              <option value="created_at_newest">予約登録日時が新しい順</option>
              <option value="created_at_oldest">予約登録日時が古い順</option>
            </select>
          )}
          {filter === 'finished' && (
            <select value={sort} onChange={(e) => {changeFilter(filter, e.target.value, books)}}>
              <option value="close_time_shortest">終了日時が新しい順</option>
              <option value="close_time_longest">終了日時が古い順</option>
              <option value="current_price_highest">価格が高い順</option>
              <option value="current_price_lowest">価格が安い順</option>
            </select>
          )}
        </div>
      </div>

    
      {(filter === 'reservation') &&
        <>
          <h3>予約中</h3>
            <table>
              <thead>
                <tr>
                  <th className='tr-img'>画像</th>
                  <th className='tr-name'>商品名<br />（eBay item number）</th>
                  <th className='tr-closetime'>終了日時<br />残り時間</th>
                  <th className='tr-currente-price'>現在価格 <br />（送料）</th>
                  <th className='tr-bid-price'>入札価格</th>
                  <th className='tr-second'>入札時間</th>
                  <th className='tr-ope'>操作</th>
                </tr>
              </thead>
            {filteredBooks?.map((book) => {
              return (
                <tbody key={book.id}>
                  <tr>
                    <td className='tr-img'><img src={book?.image_url} width="100px" /></td>
                    <td className='tr-name'><a href={`https://www.ebay.com/itm/${book.item_number}`} target='_blankt'>{book.product_name}</a><br />({book.item_number})</td>
                    <td className='tr-closetime'>{dayjs(book.close_time).format('YYYY/MM/DD hh:mm:ss')}</td>
                    <td className='tr-currente-price'>${book.current_price}<br /> {`($${book.shipping_cost})`} </td>
                    { isEdit && bookId === String(book.id)?
                      <td className='tr-bid-price'>$<input className='book-edit-input' value={bidAmount} onChange={(t) => setBidAmount(Number(t.target.value))} /></td>
                      : 
                      <td className='tr-bid-price'>${book.bid_amount}</td>
                    }
                    { isEdit && bookId === String(book.id) ? 
                      <td className='tr-second'>終了<br /><input className='book-edit-input' value={seconds} onChange={(t) => setSeconds(Number(t.target.value))} />秒前</td>
                      :
                      <td className='tr-second'>終了<br />{book.seconds}秒前</td>
                    }
                    { isEdit && bookId === String(book.id) ?
                      <td className='tr-ope'>
                        <button onClick={() => save()}>保存</button>
                        <button onClick={() => editCancel()}>キャンセル</button>
                      </td>
                      : 
                      <td className='tr-ope'>
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
              <table>
                <thead>
                  <tr>
                    <th className='tr-img'>画像</th>
                    <th className='tr-name'>商品名<br />（eBay item number）</th>
                    <th className='tr-closetime'>終了日時</th>
                    <th className='tr-currente-price'>最終価格<br />（送料）</th>
                    <th className='tr-bid-price'>入札価格</th>
                    <th className='tr-bid-price'>入札結果</th>
                    <th className='tr-ope'>操作</th>
                  </tr>
                </thead>
                {filteredBooks?.map((book) => {
                  return (
                  <tbody>
                    <tr>
                      <td className='tr-img'><img src={book?.image_url} width="100px" /></td>
                      <td className='tr-name'><a href={`https://www.ebay.com/itm/${book.item_number}`} target='_blankt'>{book.product_name}</a><br />({book.item_number})</td>
                      <td className='tr-closetime'>{dayjs(book.close_time).format('YYYY/MM/DD hh:mm:ss')}</td>
                      <td className='tr-currente-price'>$99999</td>
                      <td className='tr-bid-price'>${book.bid_amount}</td>
                      <td className='tr-bid-price'>落札</td>
                      <td className='tr-ope'>
                        <button onClick={() => clickDelete(book.id)}>削除</button>
                      </td>
                    </tr>
                  </tbody>
                  )
                })}
              </table>
        </>
    }
    </div>
  );
};

export default BookHistory;
