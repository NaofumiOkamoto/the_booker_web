import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useAuth } from '../auth/AuthProvider'

interface Item {
  id: number;
  item_number: string;
  title: string;
  bid_amount: number;
  end_time: Date;
  current_price: number;
  currency: string;
  shipping_cost: number;
  image_url: string;
}
const WatchListModal: React.FC<{
  setModal: (b: boolean) => void
  setItem: (item: Item) => void
  setIsSearched: (b:boolean) => void
}> = ({setModal, setItem, setIsSearched}) => {
  const env = import.meta.env.VITE_ENV;
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const { uid } = useAuth()
  const handleCancel = () => {
    setModal(false)
  }

  useEffect(() => {
    console.log('effect')
    const getWathcList = async () => {
      setLoading(true)
      const res = await axios.get(`${
          env === 'development' ? 'http://localhost:5001' : ''
        }/api/get-watchlist?uid=${uid}`)
      setLoading(false)
      console.log(res.data.watchlist)
      setItems(res.data.watchlist)
    }
    getWathcList()
  }, [])

  const select = (list: Item) => {
    setItem(list)
    setModal(false)
    setIsSearched(true)
  }

  return (
    <div id='overlay'>
      <div className='modal'>
        <h3>ウォッチリスト</h3>
        <button className="cancel-button" onClick={handleCancel}>閉じる</button>
        {loading ?
          <p>取得中</p>
          :
          <table>
            {items?.map((item) => {
              return (
                <tbody key={item.item_number}>
                  <tr>
                    <td className='tr-img'><img src={item.image_url} width="100px" /></td>
                    <td className='tr-name'><a href={`https://www.ebay.com/itm/${item.item_number}`} target='_blankt'>{item.title}</a><br />({item.item_number})</td>
                    <td className='tr-ope'><button onClick={() => select(item)}>選択<br />（まだ）</button></td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        }
      </div>
    </div>
  );
}

export default WatchListModal;
