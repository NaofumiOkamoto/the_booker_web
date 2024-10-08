import React, { useState } from 'react';
import '../index.css';
import '/node_modules/flag-icons/css/flag-icons.min.css'
import axios from 'axios'
import { useAuth } from '../auth/AuthProvider'
import WatchListModal from '../components/WatchListModal'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import ReactLoading from 'react-loading';
dayjs.extend(utc);
dayjs.extend(timezone);

interface Item {
  id: number;
  item_number: string;
  title: string;
  bid_amount: number;
  end_time: Date;
  current_price: number;
  currency: string;
  shipping_cost: number;
  shippingOptions: Array<string>;
  image_url: string;
}
const Home: React.FC = () => {
  const env = import.meta.env.VITE_ENV;
  const { i18n, t } = useTranslation();
  const { promptLogin, uid, ebayUserId, email, loading } = useAuth()

  const [isSearched, setIsSearched] = useState(false)
  const [alert, setAlert] = useState('')
  const [loding, setLoding] = useState(false)
  const [watchListModal, setWatchListModal] = useState(false)
  const [shipTo, setShipTo] = useState('US')

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
    setAlert('')
    setIsSearched(false)
    const res = await axios.get(`${
        env === 'development' ? 'http://localhost:5001' : ''
      }/api/search-item?uid=${uid}&item_number=${itemNumber}&ship_to=${shipTo}`)
    setLoding(false)
    if (!res.data.item) return setAlert('商品が見つかりませんでした')
    if (res.data.item === 'duplicate') return setAlert('この商品はすでに予約済みです')
    if (res.data.item === 'not_auction') return setAlert('この商品はオークション対象ではありません')

    setAlert('')
    // 終了時間は世界時間で取得されるが、表示時に日本時間で表示される
    setItem(res.data.item)
    console.log(res.data.item)
    setIsSearched(true)
  }

  const clickConfirm = async() => {
    const params = { 
      'book': {
        ...item,
        ...{user_id: uid},
        ...{item_number: itemNumber},
        ...{bid_amount: Number(bidAmount + '.' + (bidAmountDecimal ? bidAmountDecimal : 0))},
        ...{seconds: seconds},
        ...{end_time: dayjs(item?.end_time).format('YYYY-MM-DD HH:mm:ss')}, // 日本時間で登録
      }
    }
    await axios.post(`${env === 'development' ? 'http://localhost:5001' : ''}/api/book`, params)
    setIsSearched(false)
    setSeconds(5)
    setBidAmountDecimal('')
    setBidAmount('')
  }

  const clickWatchList = () => {
    setWatchListModal(true)
  }

  const validConfirm = seconds && bidAmount

  const handleBidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 数字のみ許可
    if (/^\d*$/.test(value)) {
      setBidAmount(value);
    }
  };

  const handleBidAmountDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 2桁数字のみ許可
    if (/^\d{0,2}$/.test(value)) {
      setBidAmountDecimal(value);
    }
  };

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
        <p>{t('home_discription_1')}</p>
        <p>{t('home_discription_2')}</p>
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
      <h2>{t('add_auction')}</h2>

      {/* ship to */}
      <div className='shipp-to'>
        <label>Ship to</label>
        <select value={shipTo} onChange={(e) => {setShipTo(e.target.value)}}>
          <option value="US">United States</option>
          <option value="JP">Japan</option>
        </select>
      </div>

      <input className="input" placeholder=' eBay item number' value={itemNumber} onChange={(t) => setItemNumber(t.target.value)}></input>
      <button className={!itemNumber ? 'disable-button' : ''} onClick={clickSearch} disabled={!itemNumber}>{t('search')}</button>


      {/* ウォッチリスト */}
      <div className="watch-list">
        <button onClick={clickWatchList}>{t('select_watchlist')}</button>
      </div>
      {isSearched && (
        <>
          <div className='searched-product'>
            <p className='searched-product-img'>
              <img src={item?.image_url} alt="" width="280px"/>
            </p>
            <div>
              <p>{t('title')}</p>
              <p>{item?.title}</p>
            </div>
            <div>
              <p>{t('current_price')}</p>
              <p>
                {item?.currency} {item?.current_price} <br />
                {item?.shippingOptions?.length ? 
                '(' + t('shipping') + `: ${item?.currency} ${item?.shipping_cost}）
                `: '選択した配送先へ配送されない場合があります。詳細はebayの商品ページを確認してください。'}
              </p>
            </div>
            <div>
              <p>{t('end_date')}</p>
              {/* 終了時間は世界時間で取得されるが、表示時に日本時間で表示される */}
              <p>{item?.end_time && dayjs(item.end_time).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss')}</p></div>
            <div>
              <p>{t('bid_price')}</p>
              <p>
                $<input
                  className="input"
                  value={bidAmount}
                  onChange={handleBidAmountChange}
                  placeholder='0'
                />.
                <input
                  className="input decimal"
                  value={bidAmountDecimal}
                  onChange={handleBidAmountDecimalChange}
                  placeholder='00'
                />
              </p>
            </div>
            <div>
              <p>{t('bid_time')}</p>
              <p>
                { i18n.language === 'ja' && (<label>終了</label>)}
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
              </p>
            </div>
              <p>*{t('bid_cautionary_note')}</p>
          </div>
          <button className={!validConfirm ? 'disable-button' : ''} onClick={clickConfirm} disabled={!validConfirm}>登録</button>
        </>
      )}
      {alert && <div>{alert}</div> }
      {loding &&
        <div className="loading-container">
          <ReactLoading type={'spokes'} color={'#000'} height={50} width={50} />
        </div>
      }

     </div>

   </div>
  );
};

export default Home;