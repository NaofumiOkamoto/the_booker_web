import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateのインポート
import axios from 'axios';

// コンテキストの型定義
interface AuthContextType {
  authToken: string | null;
  promptLogin: () => void;  // ログイン関数
  logout: () => void;       // ログアウト関数
  ebayUser: string;
  ebayCode: string; // あとで消す
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

// eBayのクライアントIDとシークレット
const CLIENT_ID_SAND_BOX = import.meta.env.VITE_CLIENT_ID_SAND_BOX;

// eBayの認証URL
const EBAY_AUTH_URL_SAND_BOX = import.meta.env.VITE_EBAY_AUTH_URL_SAND_BOX;

// スコープとリダイレクトURIの設定
const SCOPE_SAND_BOX = import.meta.env.VITE_SCOPE_SAND_BOX;
const REDIRECT_URI_SAND_BOX = import.meta.env.VITE_REDIRECT_URI_SAND_BOX

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [ebayUser, setEbayUser] = useState<string>('');
  const [ebayCode, setEbayCode] = useState<string>('');
  const navigate = useNavigate();  // useNavigateをAuthProviderの中で使用

  // ログイン関数
  const promptLogin = async (): Promise<void> => {
    // eBayの認証URLにリダイレクト
    console.log('ebayにリダイレクト')
    const authUrl = `${EBAY_AUTH_URL_SAND_BOX}?client_id=${CLIENT_ID_SAND_BOX}&redirect_uri=${REDIRECT_URI_SAND_BOX}&response_type=code&scope=${SCOPE_SAND_BOX}&prompt=login`;
    window.location.href = authUrl;
  };

  // 認証後の処理
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      // authenticateWithBookerServer(code);
      console.log('codeを取得!!!', code)
      setEbayCode(code)
    }
  }, []);

  // const authenticateWithBookerServer = async (code: string): Promise<void> => {
  //   try {
  //     const response = await axios.post('/api/authenticate', { code });
  //     const bookerToken = response.data.token;
  //     const user = response.data.ebay_user;
  //     setAuthToken(bookerToken);
  //     setEbayUser(user.username);
  //     navigate('/');  // ログイン後にルートページに遷移
  //   } catch (error) {
  //     console.error('Authentication failed', error);
  //   }
  // };

  // ログアウト関数
  const logout = (): void => {
    setAuthToken(null);
    setEbayUser('');
    navigate('/login');  // ログアウト後にログインページに遷移
  };

  return (
    <AuthContext.Provider value={{ authToken, promptLogin, logout, ebayUser, ebayCode }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
