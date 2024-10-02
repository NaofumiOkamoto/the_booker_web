import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useAuth } from '../auth/AuthProvider'
import ReactLoading from 'react-loading';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        <button className="cancel-button" onClick={handleCancel}>×</button>
        <h3>{t('watchlist')}</h3>
        {loading ?
          <div className="loading-container">
            <ReactLoading type={'spokes'} color={'#000'} height={50} width={50} />
          </div>
          :
          <div className="table-container">
            <table>
            {items?.map((item) => {
              return (
                <tbody key={item.item_number}>
                  <tr>
                    <td className='tr-img'><img src={item.image_url} width="100px" /></td>
                    <td className='tr-name'><a href={`https://www.ebay.com/itm/${item.item_number}`} target='_blankt'>{item.title}</a><br />({item.item_number})</td>
                    <td className='tr-ope'><button onClick={() => select(item)}>{t('select')}</button></td>
                  </tr>
                </tbody>
              )
            })}
            </table>
          </div>
        }
      </div>
    </div>
  );
}

export default WatchListModal;
