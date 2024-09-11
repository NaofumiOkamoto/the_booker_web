import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateのインポート
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config';
import axios from 'axios';

// コンテキストの型定義
interface AuthContextType {
  promptLogin: () => void;
  handleLogout: () => void;
  uid: string;
  ebayUserId: string;
  ebayUserName: string;
  ebayCode: string; // あとで消す
  email: string;
  loading: boolean;
  ebayLinkModal: boolean;
  setEbayLinkModal: (b: boolean) => void;
}
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const env = import.meta.env.VITE_EBAY_ENV;
const REDIRECT_URI = env === 'production' ? import.meta.env.VITE_REDIRECT_URI : import.meta.env.VITE_REDIRECT_URI_SAND_BOX // リダイレクトURI
const CLIENT_ID = env === 'production' ? import.meta.env.VITE_CLIENT_ID : import.meta.env.VITE_CLIENT_ID_SAND_BOX // eBayのクライアントIDとシークレット
const EBAY_AUTH_URL = env === 'production' ? import.meta.env.VITE_EBAY_AUTH_URL : import.meta.env.VITE_EBAY_AUTH_URL_SAND_BOX // eBayの認証URL
const SCOPE = env === 'production' ? import.meta.env.VITE_SCOPE : import.meta.env.VITE_SCOPE_SAND_BOX // スコープ

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [ebayUserId, setEbayUserId] = useState<string>('');
  const [ebayUserName, setEbayUserName] = useState<string>('');
  const [ebayCode, setEbayCode] = useState<string>('');
  const [ebayLinkModal, setEbayLinkModal] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [uid, setUid] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)

  /**
   * ebay の認証画面へ遷移
   */
  const promptLogin = async (): Promise<void> => {
    // eBayの認証URLにリダイレクト
    console.log('ebayにリダイレクト')
    const authUrl = `${EBAY_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&prompt=login`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    const handleEbayAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const expiresIn = urlParams.get('expires_in');

      if (code && expiresIn) { // ebay 認証後の画面時
        console.log('ebay認証codeを取得', code)
        setEbayCode(code)
        await authenticateWithBookerServer(code);
      } else if (uid && email) { // booker ログイン時
        // ebayと連携済みかをチェックする
        await checkLinkToEbayWithBookerServer();
        // 連携できてなかったら促す
      }
    }
    if (uid) handleEbayAuth();
  }, [uid]); // uid は必要

  useEffect(() => {
    // bookerのログイン確認（firebase）
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user?.email ?? '')
        setUid(user?.uid ?? '')
      };
    });
  }, []);

  /**
   * ebay のログイン画面で認証後、レダイレクトされて処理する箇所
   * @param code 認証コード
   */
  const authenticateWithBookerServer = async (code: string): Promise<void> => {
    try {
      const partiallyDecodedStr = decodeURIComponent(code)
      const fullyDecodedStr = decodeURIComponent(partiallyDecodedStr)
      console.log('fullyDecodedStr', fullyDecodedStr)
      console.log('email', email)
      setLoading(true)
      const response = await axios.post('/api/authenticate',
        { fullyDecodedStr, uid },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const user = response.data.ebay_user;
      setEbayUserId(user.userId);
      setEbayUserName(user.username);
      setLoading(false)
    } catch (error) {
      console.error('booker api Authentication failed', error);
    } finally {
      navigate('/', { state: { code: ''} });
    }
  };

  /**
   * Booker にログイン時にebayと連携しているか確認する処理
   * Booker の ebay_token テーブルに ログインしているユーザーのレコードが存在するか
   */
  const checkLinkToEbayWithBookerServer = async (): Promise<void> => {
    try {
      console.log('ebayと連携済みかをチェックする')
      console.log('email', email)
      const response = await axios.get(`${env === 'development' ? 'http://localhost:5001' : ''}/api/check-link-ebay?uid=${uid}`);
      const result = response.data.ebay_token;
      console.log('result?.user_id', result?.user_id)
      if (result) {
        console.log('ebayTokenレコードが存在する')
        setEbayUserId(result.user_id)
        setEbayUserName(result.user_name)
        setEbayLinkModal(false)
      } else {
        console.log('ebayTokenレコードが存在しない')
        setEbayUserId('')
        setEbayUserName('')
        setEbayLinkModal(true)
      }
    } catch (error) {
      console.error('booker api check link error', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setEmail('')
    setUid('')
    setEbayUserId('')
    setEbayUserName('')
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={
      {
        promptLogin,
        handleLogout,
        uid,
        ebayUserId,
        ebayUserName,
        ebayCode,
        email,
        loading,
        ebayLinkModal,
        setEbayLinkModal,
      }
    }>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
