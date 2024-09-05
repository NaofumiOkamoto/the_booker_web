import React from 'react';
import '../Fee.css';

const Fee: React.FC = () => {
  return (
    <div className="fee-container">
      <h2>料金</h2>
      <p className="trial-text">The Bookerへ登録した日より7日間は無料トライアル！</p>

      <div className="fee-plans">
        <div className="plan">
          <h2>落札価格より1%の手数料</h2>
          <ul>
            <li>商品価格より1%の手数料となり、送料などその他の価格は含まれません。</li>
            <li>例: 商品価格100ドル+送料10ドルで落札した場合は、1ドルの手数料。</li>
            <li>落札が成功した場合のみ、上記の手数料が発生いたします。</li>
            <li>その他の手数料はありません。</li>
            <li>無料トライアル終了後は本料金にてThe Bookerのサービスをご利用いただけます。</li>
          </ul>
        </div>
        <div className="plan">
          <h2>月額480円のサブスクリプション</h2>
          <ul>
            <li>毎月多く利用する方にはお得なサブスクリプションプラン。</li>
            <li>毎月何件落札しても一律480円でご利用いただけます。</li>
            <li>いつでも解約可能で、その他の手数料はありません。</li>
          </ul>
          <button className="subscribe-button">サブスクリプションに登録</button>
        </div>
      </div>

      <p className="payment-method">お支払い方法はクレジットカード、Paypalとなります。</p>
    </div>
  );
};

export default Fee;