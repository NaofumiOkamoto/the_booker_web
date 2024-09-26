import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // header
      "language": "Language",
      "home": "Home",
      "history": "History",
      "how_to_use": "How To Use",
      "price": "Pricing",
      "contact_us": "Contact Us",
      "settings": "Settings",
      // home画面
      "add_auction": "Add Auction",
      "home_discription_1": `The Booker is an automatic bidding service(Auction Sniper) for the world's largest auction "eBay"`,
      "home_discription_2": `We provide a convenient service that sets "price" and "time" for bidding on items listed in an auction format and automatically bidding.  `,
      "search": `Search`,
      "select_watchlist": `Select From Your Watchlist`,
      "title": `Title`,
      "current_price": `Current Price(Shipping)`,
      "end_date": `End Date(Time Left)`,
      "bid_price": `Bid Price`,
      "bid_time": `Bid Time`,
      "bid_cautionary_note": `Please note that if you set within 3 seconds, your bid may not reach the eBay system due to high load of the eBay system.`,
      // 予約履歴
      "bid_history": `Bid History`,
      "edit": `edit`,
      "delete": `delete`,

    }
  },
  ja: {
    translation: {
      // header
      "language": "言語",
      "home": "ホーム",
      "history": "履歴",
      "how_to_use": "使い方",
      "price": "料金",
      "contact_us": "お問合せ",
      "settings": "設定",
      // home
      "add_auction": "予約登録",
      "home_discription_1": "The Bookerは世界最大オークション「eBay」の予約入札サービスです。",
      "home_discription_2": "オークション形式で出品されている商品に、入札したい「金額」「時間」を予約登録して、オークション終了直前に自動入札(スナイプ入札)する便利な機能を提供しております。",
      "search": `検索`,
      "select_watchlist": `ウォッチリストから選択する`,
      "title": `商品名`,
      "current_price": `現在価格（送料）`,
      "end_date": `終了日時（残り時間）`,
      "bid_price": `入札金額`,
      "bid_time": `入札時間`,
      "bid_cautionary_note": `時間帯によりeBayのシステムの負荷が高い場合がございます。入札時間を3秒以内に設定した場合、入札が遅延して入札されない可能性がございますこと、あらかじめご了承ください。`,
      // 予約履歴
      "bid_history": `予約履歴`,
      "edit": `編集`,
      "delete": `削除`,
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n;