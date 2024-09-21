import React, { useState } from 'react';
import '../index.css';
import '/node_modules/flag-icons/css/flag-icons.min.css'
import axios from 'axios'
import { useAuth } from '../auth/AuthProvider'
import WatchListModal from '../components/WatchListModal'
import dayjs from 'dayjs'

interface Item {
  id: number;
  item_number: string;
  title: string;
  bid_amount: number;
  end_time: Date;
  current_price: number;
  shipping_cost: number;
  image_url: string;
}
const Home: React.FC = () => {
  const env = import.meta.env.VITE_ENV;
  const { promptLogin, uid, ebayUserId, email, loading } = useAuth()

  const [isSearched, setIsSearched] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [duplicate, setDuplicate] = useState(false)
  const [loding, setLoding] = useState(false)
  const [watchListModal, setWatchListModal] = useState(false)

  const [itemNumber, setItemNumber] = useState('')
  const [item, setItem] = useState<Item | undefined>(undefined)
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
    setDuplicate(false)
    const res = await axios.get(`${
        env === 'development' ? 'http://localhost:5001' : ''
      }/api/search-item?uid=${uid}&item_number=${itemNumber}`)
    setLoding(false)
    if (!res.data.item) return setNotFound(true)
    if (res.data.item === 'duplicate') {
      return setDuplicate(true)
    }

    setNotFound(false)
    setItem(res.data.item)
    setIsSearched(true)
  }

  const clickConfirm = async() => {
    await axios.post(`${env === 'development' ? 'http://localhost:5001' : ''}/api/book`,
      { 'book': {
          ...item,
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

  const clickWatchList = () => {
    setWatchListModal(true)
  }

  return (
    <div className="container">
      {watchListModal && (
        <WatchListModal
          setModal={setWatchListModal}
          setItem={setItem}
          setIsSearched={setIsSearched}
        />
      )}
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

      <div className="watch-list">
        <button onClick={clickWatchList}>ウォッチリストから選択する</button>
      </div>
      {isSearched && (
        <>
          <div className='searched-product'>
            <div>
              <img src={item?.image_url} alt="" width="200px"/>
            </div>
            <div>
              <p>商品名</p>
              <p>{item?.title}</p>
            </div>
            <div>
              <p>現在価格</p>
              <p>${item?.current_price} （送料: ${item?.shipping_cost}）</p>
            </div>
            <div>
              <p>終了日時</p>
              <p>{item?.end_time && dayjs(item.end_time).format('YYYY/MM/DD hh:mm:ss')}</p></div>
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
                <label>終了</label>
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
                 秒前
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
      {duplicate &&
        <div>この商品はすでに予約済みです</div>
      }
      {loding &&
        <div>商品を検索中</div>
      }

     </div>

   </div>
  );
};

export default Home;