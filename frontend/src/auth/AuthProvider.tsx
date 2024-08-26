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
  const [ebayUserId, setEbayUserId] = useState<string>('');
  const [ebayCode, setEbayCode] = useState<string>('');
  const [paramsCode, setparamsCode] = useState<string>('');
  const [expiresIn, setExpiresIn] = useState<string>('');
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
    const urlParams = new URLSearchParams(window.location.search);
    setparamsCode(urlParams.get('code') ?? '')
    setExpiresIn(urlParams.get('expiresIn') ?? '')
    if (paramsCode && expiresIn) navigate('/', { state: { code: ''} });

    // bookerのログイン確認（firebase）
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('--user.uid---', user.uid)
        setEmail(user?.email ?? '')
        setUid(user?.uid ?? '')
      };

      const handleEbayAuth = async () => {
        console.log('uid', uid)

        if (paramsCode && expiresIn) { // ebay 認証後の画面時
          console.log('ebay認証codeを取得', paramsCode)
          setEbayCode(paramsCode)
          await authenticateWithBookerServer(paramsCode);
        } else if (uid && email) { // booker ログイン時
          // ebayと連携済みかをチェックする
          await checkLinkToEbayWithBookerServer();
          // 連携できてなかったら促す
        }
      }

      if (paramsCode && expiresIn) handleEbayAuth();
    });
  }, [uid, email]);

  const authenticateWithBookerServer = async (code: string): Promise<void> => {
    try {
      console.log('start authenticateWithBookerServer')
      const partiallyDecodedStr = decodeURIComponent(code)
      const fullyDecodedStr = decodeURIComponent(partiallyDecodedStr)
      console.log('fullyDecodedStr', fullyDecodedStr)
      console.log('uid', uid)
      const response = await axios.post('/api/authenticate',
        { fullyDecodedStr, uid },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const user = response.data.ebay_user;
      setEbayUserId(user.username);
    } catch (error) {
      console.error('booker api Authentication failed', error);
    } finally {
      navigate('/', { state: { code: ''} });
    }
  };

  const checkLinkToEbayWithBookerServer = async (): Promise<void> => {
    try {
      console.log('start checkLinkToEbayWithBookerServer')
      const response = await axios.get(`/api/check-link-ebay?uid=${uid}`);
      // const response = await axios.get(`http://localhost:5001/api/check-link-ebay?uid=${uid}`);
      const result = response.data.ebay_token;
      console.log('result: ', result)
      if (result) setEbayUserId(result.user_id)
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
        ebayUserId,
        ebayCode,
        email
      }
    }>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
