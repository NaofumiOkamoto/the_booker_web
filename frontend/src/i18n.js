import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "language": "Language",
      "home": "Home",
      "history": "History",
      "how_to_use": "How To Use",
      "price": "Pricing",
      "contact_us": "Contact Us",
      "settings": "Settings",

      "add_auction": "Add Auction",
      "home_discription_1": `The Booker is an automatic bidding service(Auction Sniper) for the world's largest auction "eBay"`,
      "home_discription_2": `We provide a convenient service that sets "price" and "time" for bidding on items listed in an auction format and automatically bidding.  `,
      "search": `Search`,
      "select_watchlist": `Select From Your Watchlist`
    }
  },
  ja: {
    translation: {
      "language": "言語",
      "home": "ホーム",
      "history": "履歴",
      "how_to_use": "使い方",
      "price": "料金",
      "contact_us": "お問合せ",
      "settings": "設定",

      "add_auction": "予約登録",
      "home_discription_1": "The Bookerは世界最大オークション「eBay」の予約入札サービスです。",
      "home_discription_2": "オークション形式で出品されている商品に、入札したい「金額」「時間」を予約登録して、オークション終了直前に自動入札(スナイプ入札)する便利な機能を提供しております。",
      "search": `検索`,
      "select_watchlist": `ウォッチリストから選択する`
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