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
      "current_price": `Current Price\n(Shipping)`,
      "end_date": `End Date\n(Time Left)`,
      "bid_price": `Bid Price`,
      "bid_time": `Bid Time`,
      "bid_cautionary_note": `Please note that if you set within 3 seconds, your bid may not reach the eBay system due to high load of the eBay system.`,
      "shipping": `Shipping`,
      "seconds_before": `seconds before the end`,
      // 予約履歴
      "history": `History`,
      "bids": `Bids`,
      "edit": `edit`,
      "delete": `delete`,
      "save": `Save`,
      "cancel": `Cancel`,
      "active": `Active`,
      "ended": `Ended`,
      "status": `Status`,
      "sort": `Sort`,
      "end_soon_to_last": `End Soon To Last`,
      "end_last_to_soon": `End Last To Soon`,
      "price_high_to_low": `Price High To Low`,
      "price_low_to_high": `Price Low To High`,
      "add_new_to_old": `Add New To Old`,
      "add_old_to_new": `Add Old To New`,
      "date_new_to_old": `Date New To Old`,
      "date_old_to_new": `Date Old To New`,
      "image": `Image`,
      "operation": `Operation`,
      "result": `Result`,
      "end_price": `End Price\n(Shipping)`,
      "won": `Won`,
      "lost": `Lost`,
      // 使い方
      "how_to_use": `How To Use`,
      "how_to_use_first": `First, please create an account with The Booker and link your eBay account to it.`,
      "how_to_use_first_1": `Register an account with The Booker by clicking the “Sign Up” button in the upper right corner. `,
      "how_to_use_first_2": `After that, you will receive an alert to link to eBay, so press the “Go to eBay Linkage Page” button to go to the eBay login screen.`,
      "how_to_use_first_3": `After logging in to eBay with the account you wish to bid with, press the Agree button on the “Grant Application Access: The Booker” screen to complete the linkage.`,
      "how_to_use_second": `After the linkage between The Booker and eBay is completed, you can use automatic bidding on “Add Auction” at the bottom of the home page. Please confirm the follwing procedure.`,
      "how_to_use_second_1": `Enter the eBay item number for which you wish to reserve a bid in the “Add Auction” section at the bottom of the home page and search for the item. (Also, you can select an item from "Select From Your Watchlist" button.)`,
      "how_to_use_second_2": `When the item you wish to reserve for bidding is displayed, set the “Bid Price” and “Bid Time".`,
      "how_to_use_second_3": `Click the “Add” button to complete the process.`,
    }
  },
  ja: {
    translation: {
      // header
      "language": "Language",
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
      "current_price": `現在価格\n（送料）`,
      "end_date": `終了日時\n（残り時間）`,
      "bid_price": `入札金額`,
      "bid_time": `入札時間`,
      "bid_cautionary_note": `時間帯によりeBayのシステムの負荷が高い場合がございます。入札時間を3秒以内に設定した場合、入札が遅延して入札されない可能性がございますこと、あらかじめご了承ください。`,
      "shipping": `送料`,
      "seconds_before": `秒前`,
      // 予約履歴
      "history": `予約履歴`,
      "bids": `件`,
      "edit": `編集`,
      "delete": `削除`,
      "save": `保存`,
      "cancel": `キャンセル`,
      "active": `予約中`,
      "ended": `予約終了`,
      "status": `ステータス`,
      "sort": `並べ替え`,
      "end_soon_to_last": `終了日時までの時間が短い順`,
      "end_last_to_soon": `終了日時までの時間が長い順`,
      "price_high_to_low": `価格が高い順`,
      "price_low_to_high": `価格が安い順`,
      "add_new_to_old": `予約登録日時が新しい順`,
      "add_old_to_new": `予約登録日時が古い順`,
      "date_new_to_old": `終了日時が新しい順`,
      "date_old_to_new": `終了日時が古い順`,
      "image": `画像`,
      "operation": `操作`,
      "result": `入札結果`,
      "end_price": `最終価格\n（送料）`,
      "won": `落札成功`,
      "lost": `落札失敗`,
      // 使い方
      "how_to_use": `使い方`,
      "how_to_use_first": `まずはThe Bookerでアカウント作成をして、ご自身のeBayアカウントを連携してください。\n eBay連携までの手順は以下となります。`,
      "how_to_use_first_1": `右上の「登録」ボタンよりThe Bookerへのアカウント登録。`,
      "how_to_use_first_2": `その後eBayへ連携するためのアラートが表示されますので、「ebay連携ページに移動する」ボタンを押すとeBayのログイン画面へ。`,
      "how_to_use_first_3": `入札したいアカウントでeBayへログイン後、「Grant Application Access: The Booker」の画面にてAgreeボタンを押すと連携完了。`,
      "how_to_use_second": `The BookerとeBayの連携が完了した後、ホーム下部の「予約登録」より入札予約が可能となります。予約登録の手順は以下となります。`,
      "how_to_use_second_1": `ホーム下部の「予約登録」にて入札予約したいeBay item numberを入力して検索。(「ウォッチリストから選択する」のボタンより商品を選択することも可能です。)`,
      "how_to_use_second_2": `入札予約したい商品が表示されたら、「入札したい価格」「入札したい時間」を設定。`,
      "how_to_use_second_3": `「登録」ボタンで完了。`,
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