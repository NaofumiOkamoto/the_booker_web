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
      "edit": `Edit`,
      "delete": `Delete`,
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
      "bid_change": `* You can change "Bid Price" and "Bid Time" at least 1 minute before the end of the auction.`,
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
      // 料金
      "pricing": `Pricing`,
      "free_trial": `Free trial for 7 days from the date of registration to The Booker!`,
      "fee_description": `1% fee from the winning bid price`,
      "fee_description_1": `1% fee on the price of the item. Other prices such as shipping are not included.`,
      "fee_description_2": `Example: if you win a bid with an item price of $100 + $10 shipping, $1 fee.`,
      "fee_description_3": `Only if the bid is won, the above fee will be charged.`,
      "fee_description_4": `No other fees are charged.`,
      "fee_description_5": `After the free trial ends, you can use The Booker service at this rate.`,
      "subscribe_description": `Suppscription of JPY480 per month`,
      "subscribe_description_1": `A great subscription plan for those who use a lot each month.`,
      "subscribe_description_2": `A flat rate of JPY480 per month is available no matter how many bids you win each month.`,
      "subscribe_description_3": `It can be cancelled at any time and there are no other fees.`,
      "subscribe": `Subscribe`,
      "payment_method": `Payment methods are credit card and Paypal.`,
      // 問い合わせ
      "contact_us": `Contact Us`,
      "name": `Name`,
      "email": `Email`,
      "message": `Message`,
      "send": `Send`,
      // 設定
      "account_information": `Account Information`,
      "account": `Account`,
      "log_out": `Log Out`,
      "delete_account": `Delete Account`,
      "notification": `Notification`,
      "when_won": `Won(When the auction ends and your bid is won)`,
      "when_lost": `Lost(When the auction ends and your bid is lost)`,
      "when_outbid": `Outbid(When the current price exceeds your reserved bid price)`,
      "notificate_description_1": `*Notification will be sent to your registered Email.`,
      "notificate_description_2": `*Outbid notification will be sent only once, 5 minutes before the end of the auction. If the high price has not been renewed at that time, no notification will be sent.`,
      // ウォッチリスト
      "watchlist": `Watchlist`,
      "select": `Select`,
      // プライバシーポリシー
      "privacy_policy": `Privacy Policy`,
      "privacy_policy_1": `Thank you very much for using the services provided by Funcathon (hereinafter, “we/our/us”).
                          The Privacy Policy (hereinafter, “the Policy”) sets forth our privacy information handling principles. You or users are deemed to have agreed with the Policy if you use our services.`,
      "what_privacy": `What is privacy information?`,
      "what_privacy_1": `Privacy information includes both personal information; and history information and characteristic information.
                        Personal information refers to the personal information prescribed in the Act on the Protection of Personal Information or information relating to a living individual, specifically the name, date of birth, address, telephone number and other contact information, and any other described information that can identify individuals.
                        Information other than personal information corresponds to history and characteristic information, such as services used, products purchased, history of pages/ads viewed, search keywords used by users, time and date of use, methods of using, using environment, postal code, gender, occupation, age, user’s IP address, cookie information, location information, and terminal identification information.`,
      "how_privacy": `How do you collect privacy information?`,
      "how_privacy_1": `We may collect personal information when a user makes a user registration or use any of our services and/or history and characteristic information of a user when a user uses any of our services or views any of the pages of our website.
                        If a user performs settings in such a way that the use of the services is linked with any external service, we will collect the ID to be used by the user in the external service and/or the information that the user agrees to disclose to the linked service under the external service’s privacy settings.`,
      "purpose_privacy": `For what purpose do you use privacy information?`,
      "purpose_privacy_1": `The following gives purposes of our collection and use of privacy information.
                            A) To present registered information including the user’s name, address, contact, and payment methods, used services, purchased products, and charges for such services/products so that users can view and/or correct their registered information and/or view the status of use
                            B) To use an e-mail address to notify or contact users, to use contact information such as name and address in order to send products to users, contact users as necessary
                            C) To use such information such as name, date of birth, address, telephone number, bank account number, credit card number, driving license number, and arrival of mails with delivery certificate for user identity verification
                            D) To use payment-related information such as names/quantities of products purchased, types/periods of services used, number of times of using services, amount billed, name, address, bank account number, and credit card number, in order to charge users
                            E) To display information registered to us on an input screen so that users can enter data easily or forward such information to external services under instructions of users
                            F) To use information for identify individuals, such as state of using, name and address, to refuse the use of the Service by those users who violate the Terms of Use of the Service, for example, failing to pay charge and causing damage to a third party or by those users who try to use the Service for unjust/unlawful purposes
                            G) To use information necessary for our provision of services for users, such as information about details of inquiries and billing, status of use of services by users, and contact information of users so as to answer inquires by users
                            H) To prepare statistical data that is processed in the form that does not permit personal identification in connection with our services
                            I) To distribute or display advertisements of us or a third party
                            J) To use privacy information for marketing
                            K) Purposes incidental to the purposes of using above`,
      "provide_privacy": `Do you provide privacy information for a third party?`,
      "provide_privacy_1": `We will not provide privacy information for a third party without the prior approval of users except for the following. However, this excludes cases in which the provision is permitted under the Act on the Protection of Personal Information or any other laws and regulations.
                            A) Where requested under laws and regulations
                            B) Where the provision is required for protecting human life, body or property and it is difficult to obtain an approval of the user him/herself
                            C) Where it is especially necessary to improve public health or promote the sound growth of children and it is difficult to obtain the approval of the user him/herself
                            D) Where it is necessary to help any national organization, a local public organization, or a contractor perform the clerical work prescribed in laws and regulations and the approval of the user him/herself could disturb the performance of the clerical work
                            If we outsource all or part of privacy information handling to the extent necessary to achieve the purpose of the use or privacy information is provided along with succession of business due to merger or for any other reasons, it will not correspond to the provision of privacy information to a third party.
                            We may share or disclose privacy information upon user’s request if a user links any our services with any external services when using our services.
                            `,
      "check_privacy": `Can I check my privacy information or request you to correct it?`,
      "check_privacy_1": `If a user himself/herself requests the disclosure of the privacy information (excluding history or characteristic information) to the user himself/herself, we will disclose it without delay. However, if disclosure could harm the life, body, property, or other interests of the user or a third party, could cause significant hindrance to the proper performance of our business, or violates laws and regulations, we will refrain from disclosing all or part of the information. If we decide not to disclose the information, we will inform you without delay.
                          We will charge you 1000 yen for each instance of disclosure of personal information.
                          If any user’s personal information we own is incorrect, the user can request us to correct or delete the personal information by the procedure stipulated by us. If a user makes such a request and we judge it is necessary to meet the request, we will correct or delete the personal information and inform the user without delay.
                          `,
      "request_privacy": `Can I request you to discontinue the use of my privacy information?`,
      "request_privacy_1": `When the user requests discontinuation of the use of his/her privacy information (hereinafter, “Discontinuation of the Use”) claiming the privacy information is handled beyond the scope of the purposes of use or the privacy information is obtained by unjust means, we will conduct a necessary investigation, and based on the outcome of the investigation make take measures such as Discontinuation of the Use, and inform the user without delay.
                            However, we will take alternative measures if Discontinuation of the Use of privacy information involves an inordinate expense or if it is difficult and alternative measures are possible so as to protect rights and benefits of the users`,
      "change_privacy": `Change of Privacy Policy`,
      "change_privacy_1": `This Privacy Policy is subject to changes without notice to users.
                          The changed Privacy Policy will take effect when it is placed on this website unless otherwise specified by us.
                          `,
      "contact_privacy": `Inquiry contact`,
      "contact_privacy_1": `If you have any question about the policy, please contact us at the following contact
                            E-mail address: thebooker.jp@gmail.com
                            Established on: October 1, 2024
                            `,
      // 利用規約
      "terms_of_use": `Terms of Use`,


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
      "bid_change": `※予約価格、予約時間の変更は、オークション終了1分前まで変更できます。`,
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
      //　料金
      "pricing": `料金`,
      "free_trial": `The Bookerへ登録した日より7日間は無料トライアル！`,
      "fee_description": `落札価格より1%の手数料`,
      "fee_description_1": `商品価格より1%の手数料となり、送料などその他の価格は含まれません。`,
      "fee_description_2": `例: 商品価格100ドル+送料10ドルで落札した場合は、1ドルの手数料。`,
      "fee_description_3": `落札が成功した場合のみ、上記の手数料が発生いたします。`,
      "fee_description_4": `その他の手数料はありません。`,
      "fee_description_5": `無料トライアル終了後は本料金にてThe Bookerのサービスをご利用いただけます。`,
      "subscribe_description": `月額480円のサブスクリプション`,
      "subscribe_description_1": `毎月多く利用する方にはお得なサブスクリプションプラン。`,
      "subscribe_description_2": `毎月何件落札しても一律480円でご利用いただけます。`,
      "subscribe_description_3": `いつでも解約可能で、その他の手数料はありません。`,
      "subscribe": `サブスクリプションに登録`,
      "payment_method": `お支払い方法はクレジットカード、Paypalとなります。`,
      // 問い合わせ
      "contact_us": `お問合せ`,
      "name": `お名前`,
      "email": `メールアドレス`,
      "message": `お問合せ内容`,
      "send": `送信する`,
      // 設定
      "account_information": `アカウント設定`,
      "account": `アカウント`,
      "log_out": `ログアウト`,
      "delete_account": `アカウント削除`,
      "notification": `通知設定`,
      "when_won": `落札成功(オークションが終了して落札が成功した時)`,
      "when_lost": `落札失敗(オークションが終了して落札が失敗した時)`,
      "when_outbid": `高値更新(現在価格が予約した価格を上回った時)`,
      "notificate_description_1": `※ ご登録されたメールアドレスへ通知いたします。`,
      "notificate_description_2": `※ 高値更新通知は、オークション終了5分前に1回のみ通知されます。その時点で高値更新されてない場合は通知されません。`,
      // ウォッチリスト
      "watchlist": `ウォッチリスト`,
      "select": `選択`,
      // プライバシーポリシー
      "privacy_policy": `プライバシーポリシー`,
      "privacy_policy_1": `Funcathon（以下、「当社」といいます。）のサービスをご利用いただきありがとうございます。
                          このプライバシーポリシー（以下、「本ポリシー」といいます。）は、当社におけるプライバシー情報の取扱方針です。ユーザーの皆さまが当社のサービスを利用した場合には、本ポリシーに同意したものとみなされます。
                          `,
      "what_privacy": `プライバシー情報とは何ですか？`,
      "what_privacy_1": `プライバシー情報とは、「個人情報」と「履歴情報および特性情報」の両方です。
                        「個人情報」とは、個人情報保護法にいう「個人情報」を指し、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報を指します。
                        「履歴情報および特性情報」とは、「個人情報」以外のもので、ご利用いただいたサービスやご購入いただいた商品、ご覧になったページや広告の履歴、ユーザーが検索された検索キーワード、ご利用日時、ご利用の方法、ご利用環境、郵便番号や性別、職業、年齢、ユーザーのIPアドレス、クッキー情報、位置情報、端末の個体識別情報などを指します。`,
      "how_privacy": `どのようにプライバシー情報を収集するのですか？`,
      "how_privacy_1": `当社は、ユーザーが当社のサービスに利用登録をしまたは利用する際に「個人情報
                        を、ユーザーが当社のサービスを利用しまたはページを閲覧する際にユーザーの「履歴情報および特性情報を、それぞれ収集することがあります。
                        また，ユーザーが本サービスを利用するにあたり、外部サービスとの連携を設定した場合には、その外部サービスでユーザーが利用するIDやその他その外部サービスのプライバシー設定によりユーザーが連携先に開示を認めた情報を、その外部サービスから収集します。`,
      "purpose_privacy": `プライバシー情報はどのような目的で利用されますか？`,
      "purpose_privacy_1": `当社がプライバシー情報を収集・利用する目的は、次のとおりです。
                            ア）ユーザーに自分の登録情報の閲覧や修正、利用状況の閲覧を行っていただくために、氏名、住所、連絡先、支払方法などの登録情報、利用されたサービスや購入された商品、およびそれらの代金などに関する情報を表示する目的
                            イ）ユーザーにお知らせや連絡をするためにメールアドレスを利用する場合やユーザーに商品を送付したり必要に応じて連絡したりするため、氏名や住所などの連絡先情報を利用する目的
                            ウ）ユーザーの本人確認を行うために、氏名、生年月日、住所、電話番号、銀行口座番号、クレジットカード番号、運転免許証番号、配達証明付き郵便の到達結果などの情報を利用する目的
                            エ）ユーザーに代金を請求するために、購入された商品名や数量、利用されたサービスの種類や期間、回数、請求金額、氏名、住所、銀行口座番号やクレジットカード番号などの支払に関する情報などを利用する目的
                            オ）ユーザーが簡便にデータを入力できるようにするために、当社に登録されている情報を入力画面に表示させたり、ユーザーのご指示に基づいて外部のサービスなどに転送したりする目的
                            カ）代金の支払を遅滞したり第三者に損害を発生させたりするなど、本サービスの利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの利用をお断りするために、利用態様、氏名や住所など個人を特定するための情報を利用する目的
                            キ）ユーザーからのお問い合わせに対応するために、お問い合わせ内容や代金の請求に関する情報など当社がユーザーに対してサービスを提供するにあたって必要となる情報や、ユーザーのサービス利用状況、連絡先情報などを利用する目的
                            ク）当社のサービスに関連して、個人を識別できない形式に加工した統計データを作成する目的
                            ケ）当社又は第三者の広告の配信又は表示をする目的
                            コ）マーケティングに利用する目的
                            サ）上記の各利用目的に付随する目的
                            `,
      "provide_privacy": `プライバシー情報は第三者に提供されることがありますか？`,
      "provide_privacy_1": `当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者にプライバシー情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
                            ア） 法令に基づく場合
                            イ） 人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
                            ウ） 公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
                            エ） 国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
                            もっとも、当社が利用目的の達成に必要な範囲内においてプライバシー情報の取扱いの全部または一部を委託する場合や合併その他の事由による事業の承継に伴ってプライバシー情報が提供される場合は、プライバシー情報の第三者提供には該当しないものとします。
                            なお，当社は、ユーザーが，当社のサービスを外部サービスと連携させて利用する等の場合には、ユーザーからの依頼に従って、プライバシー情報を共有または開示することがあります。
                            `,
      "check_privacy": `自分のプライバシー情報を確認したり、訂正を求めることができますか？`,
      "check_privacy_1": `当社は、本人から「個人情報」（「履歴情報および特性情報」を含みません。）の開示を求められたときは、本人に対し、遅滞なくこれを開示します。ただし、開示することにより、本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合、当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合または法令に違反することとなる場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。
                          なお、個人情報の開示に際しては、1件あたり1,000円の手数料を申し受けます。
                          また、ユーザーは、当社の保有する自己の個人情報が誤った情報である場合には、当社が定める手続きにより、当社に対して個人情報の訂正または削除を請求することができます。　当社は、ユーザーからこれらの請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正または削除を行い、これをユーザーに通知します。
                          `,
      "request_privacy": `プライバシー情報の利用停止を求めることができますか？`,
      "request_privacy_1": `当社は、本人から、プライバシー情報が、利用目的の範囲を超えて取り扱われているという理由、または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下、「利用停止等」といいます。）を求められた場合には、遅滞なく必要な調査を行い、その結果に基づき、プライバシー情報の利用停止等を行い、その旨本人に通知します。
                            ただし、プライバシー情報の利用停止等に多額の費用を要する場合その他利用停止等を行うことが困難な場合であって、本人の権利利益を保護するために必要なこれに代わるべき措置をとれる場合は、この代替策を講じます。`,
      "change_privacy": `プライバシーポリシーの変更`,
      "change_privacy_1": `本ポリシーの内容は、ユーザーに通知することなく、変更することができるものとします。
                          当社が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。`,
      "contact_privacy": `お問い合わせ窓口`,
      "contact_privacy_1": `本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
                            Ｅメールアドレス：thebooker.jp@gmail.com
                            制定日　2024年10月1日
                            `,
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