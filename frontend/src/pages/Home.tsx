import React, { useState } from 'react';
import '../index.css';
import '/node_modules/flag-icons/css/flag-icons.min.css'
import axios from 'axios'
import { useAuth } from '../auth/AuthProvider'
import dayjs from 'dayjs'

interface Product {
  title: string;
  end_time: Date;
  current_price: number;
  img_url: string;
}
const Home: React.FC = () => {
  const env = import.meta.env.VITE_ENV;
  const { promptLogin, uid, ebayUserId, email, loading } = useAuth()
  const [isSearched, setIsSearched] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [loding, setLoding] = useState(false)
  const [itemNumber, setItemNumber] = useState('')
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [bidAmount, setBidAmount] = useState('')
  const [bidAmountDecimal, setBidAmountDecimal] = useState('')
  const [seconds, setSeconds] = useState(5)

  const ebay = async() => {
    await promptLogin()
  }

  const clickSearch = async () => {
    setLoding(true)
    setNotFound(false)
    setIsSearched(false)
    const res = await axios.get(`${
        env === 'development' ? 'http://localhost:5001' : ''
      }/api/search-item?uid=${uid}&item_number=${itemNumber}`)
    setLoding(false)
    if (!res.data.item) return setNotFound(true)

    setNotFound(false)
    setProduct(res.data.item)
    setIsSearched(true)
  }

  const clickConfirm = async() => {
    await axios.post(`${env === 'development' ? 'http://localhost:5001' : ''}/api/book`,
      { 'book': {
          ...product,
          ...{user_id: uid},
          ...{item_number: itemNumber},
          ...{bid_amount: Number(bidAmount + '.' +bidAmountDecimal)},
          ...{seconds: seconds},
        }
      },
    )
    setIsSearched(false)
    setSeconds(5)
    setBidAmountDecimal('')
    setBidAmount('')
  }

  return (
    <div className="container">
     <main className="main-content">
       <p>The Bookerは世界最大オークション「eBay」の予約入札サービスです。</p>
      <p>オークション形式で出品されている商品に、入札する「金額」「時間」を予約登録して自動入札する便利な機能を提供しております。</p>
     </main>

    <div>
      {email && (ebayUserId ? <></> : (
        loading ? ( <div>ただいまebayと連携中</div>) : (
          <button onClick={() => { void (async () => { await ebay() })() }}>
            {loading ? 'ただいま連携中' : 'ebayと連携'}
          </button>
      )))}
    </div>
     <div>
      <h2>予約登録</h2>
      <input className="input" placeholder=' eBay item number' value={itemNumber} onChange={(t) => setItemNumber(t.target.value)}></input>
      <button className={!itemNumber ? 'disable-button' : ''} onClick={clickSearch} disabled={!itemNumber}>検索</button>
      {isSearched && (
        <>
          <div className='searched-product'>
            <div>
              <img src={product?.img_url} alt="" width="200px"/>
            </div>
            <div>
              <p>商品名</p>
              <p>{product?.title}</p>
            </div>
            <div>
              <p>現在価格</p>
              <p>${product?.current_price}</p>
            </div>
            <div>
              <p>終了日時</p>
              <p>{dayjs(product?.end_time).format('YYYY/MM/DD hh:mm:ss')}</p></div>
            <div>
              <p>入札金額</p>
              <p>
                $<input
                  className="input"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder='0'
                />.
                <input
                  className="input decimal"
                  value={bidAmountDecimal}
                  onChange={(e) => setBidAmountDecimal(e.target.value)}
                  placeholder='00'
                />
              </p>
            </div>
            <div>
              <p>入札時間</p>
              <p>
                終了 <input className="input" value={seconds} onChange={(e) => setSeconds(Number(e.target.value))}></input> 秒前
              </p>
            </div>
              <p>※時間帯によりeBayのシステムの負荷が高い場合がございます。入札時間を3秒以内に設定した場合、入札が遅延して入札されない可能性がございますこと、あらかじめご了承ください。</p>
          </div>
          <button onClick={clickConfirm}>登録</button>
        </>
      )}
      {notFound &&
        <div>商品が見つかりませんでした。 </div>
      }
      {loding &&
        <div>商品を検索中</div>
      }

     </div>

   </div>
  );
};

export default Home;