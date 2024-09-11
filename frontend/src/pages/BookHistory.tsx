import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../BookHistory.css';
import { useAuth } from '../auth/AuthProvider'
import dayjs from 'dayjs'

interface Book {
  id: number;
  user_id: string;
  item_number: string;
  product_name: string;
  seconds: number;
  bid_amount: Float32Array;
  close_time: Date;
  current_price: Float32Array;
  created_at: Date;
}
const BookHistory: React.FC = () => {
  const [filter, setFilter] = useState('reservation')
  const [books, setBooks] = useState<Book[]>([])
  const { uid } = useAuth()
  const env = import.meta.env.VITE_ENV;

  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get(`${
          env === 'development' ? 'http://localhost:5001' : ''
        }/api/book?uid=${uid}`)
        setBooks(res.data.books)
    }
    if (uid) getBooks()
  }, [uid])

  return (
    <div className="reservation-history">
      <h2>予約履歴</h2>
      <div className="summary">
        <span>全88件</span>
        <div className="filters">
          <label>絞り込み：</label>
          <select value={filter} onChange={(e) => {setFilter(e.target.value)}}>
            <option value="all">全て</option>
            <option value="reservation">予約中</option>
            <option value="finish">予約終了</option>
          </select>
          <label>並べ替え：</label>
          <select>
            <option value="newest">閲覧日時の新しい順</option>
          </select>
        </div>
      </div>

    
      {(filter === 'reservation'  || filter === 'all') &&
        <>
          <h3>予約中</h3>
            <table>
              <thead>
                <tr>
                  <th>画像</th>
                  <th>商品名</th>
                  <th>予約登録日時</th>
                  <th>eBay item number</th>
                  <th>現在価格 <br />（送料）</th>
                  <th>終了日時 残り時間</th>
                  <th>入札価格</th>
                  <th>入札時間</th>
                  <th>操作</th>
                </tr>
              </thead>
            {books?.map((book) => {
              return (
                <tbody key={book.id}>
                  <tr>
                    <td>画像</td>
                    <td>{book.product_name}</td>
                    <td>{dayjs(book.created_at).format('YYYY/MM/DD hh:mm:ss')}</td>
                    <td>{book.item_number}</td>
                    <td>${book.current_price}<br /> {`(${'xxx円'})`}</td>
                    <td>x日</td>
                    <td>${book.bid_amount}</td>
                    <td>終了{book.seconds}秒前</td>
                    <td>
                      <button>編集</button>
                      <button>削除</button>
                    </td>
                  </tr>
                </tbody>
              )
            })}
            </table>
        </>
      }
      {(filter === 'finish' || filter === 'all') &&
        <>
          <h3>予約終了</h3>
          {['a', 'b'].map(() => {
            return (
              <table>
                <thead>
                  <tr>
                    <th>画像</th>
                    <th>終了日時</th>
                    <th>eBay item number</th>
                    <th>商品名</th>
                    <th>入札価格</th>
                    <th>入札時間</th>
                    <th>入札結果</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>画像</td>
                    <td>2024/09/05</td>
                    <td>987654321</td>
                    <td>商品名</td>
                    <td>5500円</td>
                    <td>09:00 AM</td>
                    <td>落札</td>
                    <td>
                      <button>削除</button>
                    </td>
                  </tr>
                  {/* 他の予約終了の商品もここに追加 */}
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
