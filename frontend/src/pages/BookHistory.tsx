import React, { useState } from 'react';
import '../BookHistory.css';

const BookHistory: React.FC = () => {
  const [filter, setFilter] = useState('reservation')
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
          {['a', 'b'].map(() => {
            return (
              <table>
                <thead>
                  <tr>
                    <th>画像</th>
                    <th>予約登録日時</th>
                    <th>eBay item number</th>
                    <th>商品名</th>
                    <th>現在の価格</th>
                    <th>送料</th>
                    <th>残り時間</th>
                    <th>入札価格</th>
                    <th>入札時間</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>画像</td>
                    <td>2024/09/06</td>
                    <td>123456789</td>
                    <td>商品名</td>
                    <td>5000円</td>
                    <td>1000円</td>
                    <td>5日</td>
                    <td>5100円</td>
                    <td>10:00 AM</td>
                    <td>
                      <button>編集</button>
                      <button>削除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )
          })}
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
