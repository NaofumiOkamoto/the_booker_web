import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateのインポート
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config';
import axios from 'axios';

// コンテキストの型定義
interface AuthContextType {
  promptLogin: () => void;  // ログイン関数
  handleLogout: () => void;
  ebayUserId: string;
  ebayUserName: string;
  ebayCode: string; // あとで消す
  email: string;
  loading: boolean;
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

const CLIENT_ID_SAND_BOX = import.meta.env.VITE_CLIENT_ID_SAND_BOX; // eBayのクライアントIDとシークレット
const EBAY_AUTH_URL_SAND_BOX = import.meta.env.VITE_EBAY_AUTH_URL_SAND_BOX; // eBayの認証URL
const SCOPE_SAND_BOX = import.meta.env.VITE_SCOPE_SAND_BOX; // スコープ
const REDIRECT_URI_SAND_BOX = import.meta.env.VITE_REDIRECT_URI_SAND_BOX // リダイレクトURI

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [ebayUserId, setEbayUserId] = useState<string>('');
  const [ebayUserName, setEbayUserName] = useState<string>('');
  const [ebayCode, setEbayCode] = useState<string>('');
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [uid, setUid] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)

  // ログイン関数
  const promptLogin = async (): Promise<void> => {
    // eBayの認証URLにリダイレクト
    console.log('ebayにリダイレクト')
    const authUrl = `${EBAY_AUTH_URL_SAND_BOX}?client_id=${CLIENT_ID_SAND_BOX}&redirect_uri=${REDIRECT_URI_SAND_BOX}&response_type=code&scope=${SCOPE_SAND_BOX}&prompt=login`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    // bookerのログイン確認（firebase）
    console.log('useEffect!!!!')
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user?.email ?? '')
        setUid(user?.uid ?? '')
      };

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
    });
  }, [uid]); // uid は必要

  const authenticateWithBookerServer = async (code: string): Promise<void> => {
    try {
      console.log('-----start authenticateWithBookerServer------')
      const partiallyDecodedStr = decodeURIComponent(code)
      const fullyDecodedStr = decodeURIComponent(partiallyDecodedStr)
      console.log('fullyDecodedStr', fullyDecodedStr)
      console.log('uid', uid)
      setLoading(true)
      const response = await axios.post('/api/authenticate',
        { fullyDecodedStr, uid },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const user = response.data.ebay_user;
      setEbayUserId(user.user_id);
      setEbayUserName(user.username);
      setLoading(false)
    } catch (error) {
      console.error('booker api Authentication failed', error);
    } finally {
      navigate('/', { state: { code: ''} });
      console.log('-----end authenticateWithBookerServer------')
    }
  };

  const checkLinkToEbayWithBookerServer = async (): Promise<void> => {
    try {
      console.log('---start checkLinkToEbayWithBookerServer----')
      // const response = await axios.get(`/api/check-link-ebay?uid=${uid}`);
      const response = await axios.get(`http://localhost:5001/api/check-link-ebay?uid=${uid}`);
      const result = response.data.ebay_token;
      console.log('result: ', result)
      if (result) {
        setEbayUserId(result.user_id)
        setEbayUserName(result.username)
      }
    } catch (error) {
      console.error('booker api check link', error);
    } finally {
      console.log('-----end checkLinkToEbayWithBookerServer----')
    }
  };

  const handleLogout = async () => {
    setEmail('')
    await signOut(auth);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={
      {
        promptLogin,
        handleLogout,
        ebayUserId,
        ebayUserName,
        ebayCode,
        email,
        loading
      }
    }>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
