import React, { useState } from 'react';
import '../index.css';
import '/node_modules/flag-icons/css/flag-icons.min.css'
import axios from 'axios'
import { useAuth } from '../auth/AuthProvider'

const Home: React.FC = () => {
  const { promptLogin, ebayUserId, ebayUserName, email, loading } = useAuth()
  const [isSearched, setIsSearched] = useState(false)

  const ebay = async() => {
    await promptLogin()
  }

  const clickSearch = async () => {
    const res = await axios.get('http://localhost:5001/test')
    console.log(res.data)
    setIsSearched(true)
  }

  const clickConfirm = () => {
    setIsSearched(false)
  }

  return (
    <div className="container">
     <main className="main-content">
       <p>The Bookerは世界最大オークション「eBay」の予約入札サービスです。</p>
      <p>オークション形式で出品されている商品に、入札する「金額」「時間」を予約登録して自動入札する便利な機能を提供しております。</p>
     </main>

    <div>
      {email && (ebayUserId ? (
        <div>
          <p>ebayと接続済み</p>
          <p>ebayUserId: { ebayUserId }</p>
          <p>ebayUserName: { ebayUserName }</p>
        </div>
      ) : (
        loading ? ( <div>ただいま連携中</div>) : (
          <button onClick={() => { void (async () => { await ebay() })() }}>
            {loading ? 'ただいま連携中' : 'ebayと連携'}
          </button>
      )))}
    </div>
     <div>
      <h2>予約登録</h2>
      <input className="input" placeholder=' eBay item number'></input>
      <button onClick={clickSearch}>検索</button>
      {isSearched && (
        <>
        <div className='searched-product'>
          <div><p>商品名</p><p>aaa</p></div>
          <div><p>現在価格</p><p>aaa</p></div>
          <div><p>終了日時</p><p>aaa</p></div>
        </div>
        <div>
          <p><input className="input" placeholder=' 入札金額'></input></p>
          <p><input className="input" placeholder=' 入札時間'></input></p>
        </div>
        <button onClick={clickConfirm}>登録</button>
        </>
      )}

     </div>

   </div>
  );
};

export default Home;