import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateのインポート
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config';
import axios from 'axios';

// コンテキストの型定義
interface AuthContextType {
  promptLogin: () => void;  // ログイン関数
  handleLogout: () => void;
  ebayUser: string;
  ebayCode: string; // あとで消す
  email: string;
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
  const [ebayUser, setEbayUser] = useState<string>('');
  const [ebayCode, setEbayCode] = useState<string>('');
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [uid, setUid] = useState<string>('');

  // ログイン関数
  const promptLogin = async (): Promise<void> => {
    // eBayの認証URLにリダイレクト
    console.log('ebayにリダイレクト')
    const authUrl = `${EBAY_AUTH_URL_SAND_BOX}?client_id=${CLIENT_ID_SAND_BOX}&redirect_uri=${REDIRECT_URI_SAND_BOX}&response_type=code&scope=${SCOPE_SAND_BOX}&prompt=login`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    // bookerのログイン確認
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email ?? '')
        setUid(user.uid)
      };
    });

    const handleEbayAuth = async () => {
      console.log('useEffect: ebay code')
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const expiresIn = urlParams.get('expires_in');
      if (code && expiresIn) {
        console.log('ebay認証codeを取得', code)
        setEbayCode(code)
        await authenticateWithBookerServer(code);
      } else {
        // ebayと連携済みかをチェックする
        await checkLinkToEbayWithBookerServer();
        // 連携できてなかったら促す
      }
    }

    unsubscribe();
    handleEbayAuth();
  }, []);

  const authenticateWithBookerServer = async (code: string): Promise<void> => {
    try {
      console.log('start authenticateWithBookerServer')
      const partiallyDecodedStr = decodeURIComponent(code)
      const fullyDecodedStr = decodeURIComponent(partiallyDecodedStr)
      console.log('fullyDecodedStr', fullyDecodedStr)
      const response = await axios.post('/api/authenticate',
        { fullyDecodedStr, uid },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const user = response.data.ebay_user;
      setEbayUser(user.username);
      navigate('/');
    } catch (error) {
      console.error('booker api Authentication failed', error);
    }
  };

  const checkLinkToEbayWithBookerServer = async (): Promise<void> => {
    try {
      console.log('start checkLinkToEbayWithBookerServer')
      const response = await axios.get(`http://localhost:5001/api/check-link-ebay?uid=${uid}`);
      const result = response.data.result;
      console.log(response.data)
      console.log(result)
    } catch (error) {
      console.error('booker api check link', error);
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
        ebayUser,
        ebayCode,
        email
      }
    }>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
