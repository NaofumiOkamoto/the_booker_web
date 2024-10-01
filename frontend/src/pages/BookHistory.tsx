import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../BookHistory.css';
import { useAuth } from '../auth/AuthProvider'
import DeleteBookModal from '../components/DeleteBookModal'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next';

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
  const { i18n, t } = useTranslation();
  const [filter, setFilter] = useState<'reservation' | 'finished'>('reservation')
  const [sort, setSort] = useState('endtime_shot')
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [bidAmount, setBidAmount] = useState(0)
  const [bidAmountDecimal, setBidAmountDecimal] = useState(0)
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
        ...{bid_amount: Number(bidAmount + '.' + (bidAmountDecimal ? bidAmountDecimal : 0))},
        ...{seconds: seconds},
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    console.log('saveRes', saveRes)
    const updatedBooks = books.map(book => 
      book.id === Number(bookId) 
        ? { ...book, bid_amount: Number(bidAmount + '.' + (bidAmountDecimal ? bidAmountDecimal : 0)), seconds: seconds } 
        : book
    );
    
    setBooks(updatedBooks);
    setIsEdit(false);
    setBookId('');
    getBooks();
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

  const calculateTimeLeft = (closeTime: Date) => {
    const targetDate = new Date(closeTime);
    const currentDate = new Date();
    const difference = targetDate.getTime() - currentDate.getTime();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  const [timeLefts, setTimeLefts] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const timers = filteredBooks.map((book) => {
      return setInterval(() => {
        setTimeLefts((prevTimeLefts) => ({
          ...prevTimeLefts,
          [book.id]: calculateTimeLeft(book.close_time),
        }));
      }, 1000);
    });

    // コンポーネントがアンマウントされる際にタイマーをクリア
    return () => timers.forEach((timer) => clearInterval(timer));
  }, [filteredBooks]);

  return (
    <div className="reservation-history">
      {modal && (
        <DeleteBookModal
          setModal={setModal}
          deleteBook={deleteBook}
          deleteId={deleteId}
        />
      )}
      <h2>{t('history')}</h2>
      <div className="summary">
        <span>{i18n.language === 'ja' && '全'} {filteredBooks.length} {t('bids')}</span>
        <div className="filters">
          <label>{t('status')}</label>
          <select value={filter} onChange={(e) => {changeFilter(e.target.value as 'reservation' | 'finished', sort, books)}}>
            <option value="reservation">{t('active')}</option>
            <option value="finished">{t('ended')}</option>
          </select>
          <label>{t('sort')}</label>
          {filter === 'reservation' && (
            <select value={sort} onChange={(e) => {changeFilter(filter, e.target.value, books)}}>
              <option value="close_time_shortest">{t('end_soon_to_last')}</option>
              <option value="close_time_longest">{t('end_last_to_soon')}</option>
              <option value="current_price_highest">{t('price_high_to_low')}</option>
              <option value="current_price_lowest">{t('price_low_to_high')}</option>
              <option value="created_at_newest">{t('date_new_to_old')}</option>
              <option value="created_at_oldest">{t('date_old_to_new')}</option>
            </select>
          )}
          {filter === 'finished' && (
            <select value={sort} onChange={(e) => {changeFilter(filter, e.target.value, books)}}>
              <option value="close_time_shortest">{t('date_new_to_old')}</option>
              <option value="close_time_longest">{t('add_old_to_new')}</option>
              <option value="current_price_highest">{t('price_high_to_low')}</option>
              <option value="current_price_lowest">{t('price_low_to_high')}</option>
            </select>
          )}
        </div>
      </div>
    
      {(filter === 'reservation') &&
        <>
          <h3>{t('active')}</h3>
          <p>※予約価格、予約時間の変更は、オークション終了1分前まで変更できます。</p>
            <table>
              <thead>
                <tr>
                  <th className='tr-img'>{t('image')}</th>
                  <th className='tr-name'>{t('title')}<br />（eBay item number）</th>
                  <th className='tr-closetime'>{t('end_date')}</th>
                  <th className='tr-currente-price'>{t('current_price')}</th>
                  <th className='tr-bid-price'>{t('bid_price')}</th>
                  <th className='tr-second'>{t('bid_time')}</th>
                  <th className='tr-ope'>{t('operation')}</th>
                </tr>
              </thead>
            {filteredBooks?.map((book) => {
              const timeLeft = timeLefts[book.id] || calculateTimeLeft(book.close_time);
              return (
                <tbody key={book.id}>
                  <tr>
                    <td className='tr-img'><img src={book?.image_url} width="100px" /></td>
                    <td className='tr-name'><a href={`https://www.ebay.com/itm/${book.item_number}`} target='_blankt'>{book.product_name}</a><br />({book.item_number})</td>
                    <td className='tr-closetime'>
                      {dayjs(book.close_time).format('YYYY/MM/DD HH:mm:ss')}
                      <br />
                      ({timeLeft.days}日{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds})
                    </td>
                    <td className='tr-currente-price'>${book.current_price}<br /> {`($${book.shipping_cost})`} </td>
                    { isEdit && bookId === String(book.id)?
                      <td className='tr-bid-price'>
                        $<input className='book-edit-input' value={bidAmount} onChange={(t) => setBidAmount(Number(t.target.value))} />
                        .<input className='book-edit-input' value={bidAmountDecimal} onChange={(t) => setBidAmountDecimal(Number(t.target.value))}></input>
                      </td>
                      : 
                      <td className='tr-bid-price'>${book.bid_amount}</td>
                    }
                    { isEdit && bookId === String(book.id) ? 
                      <td className='tr-second'>{i18n.language === 'ja' && '終了'}<br />
                        {/* <input className='book-edit-input' value={seconds} onChange={(t) => setSeconds(Number(t.target.value))} /> */}
                        <select value={seconds} onChange={(e) => {setSeconds(Number(e.target.value))}}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                          <option value="30">30</option>
                          <option value="35">35</option>
                          <option value="40">40</option>
                          <option value="45">45</option>
                          <option value="50">50</option>
                          <option value="55">55</option>
                          <option value="60">60</option>
                        </select>
                        {t('seconds_before')}
                      </td>
                      :
                      <td className='tr-second'>{i18n.language === 'ja' && '終了'}<br />{book.seconds} {t('seconds_before')}</td>
                    }
                    { isEdit && bookId === String(book.id) ?
                      <td className='tr-ope'>
                        <button onClick={() => save()}>{t('save')}</button>
                        <button onClick={() => editCancel()}>{t('cancel')}</button>
                      </td>
                      : 
                      <td className='tr-ope'>
                        <button onClick={() => edit(book.id, book.bid_amount, book.seconds)}>{t('edit')}</button>
                        <button onClick={() => clickDelete(book.id)}>{t('delete')}</button>
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
          <h3>{t('ended')}</h3>
          <table>
            <thead>
              <tr>
                <th className='tr-img'>{t('image')}</th>
                <th className='tr-name'>{t('title')}<br />（eBay item number）</th>
                <th className='tr-closetime'>{t('end_date')}</th>
                <th className='tr-currente-price'>{t('end_price')}</th>
                <th className='tr-bid-price'>{t('bid_price')}</th>
                <th className='tr-bid-price'>{t('result')}</th>
                <th className='tr-ope'>{t('operation')}</th>
              </tr>
            </thead>
            {filteredBooks?.map((book) => {
              return (
              <tbody>
                <tr>
                  <td className='tr-img'><img src={book?.image_url} width="100px" /></td>
                  <td className='tr-name'><a href={`https://www.ebay.com/itm/${book.item_number}`} target='_blankt'>{book.product_name}</a><br />({book.item_number})</td>
                  <td className='tr-closetime'>
                    {dayjs(book.close_time).format('YYYY/MM/DD HH:mm:ss')}
                  </td>
                  <td className='tr-currente-price'>$99999</td>
                  <td className='tr-bid-price'>${book.bid_amount}</td>
                  <td className='tr-bid-price'>{t('won')}</td>
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
