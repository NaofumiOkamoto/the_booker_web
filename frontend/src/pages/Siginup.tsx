// src/components/Signup.js

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log('singup res:', res)
      navigate('/');
      // 登録成功後の処理
    } catch (e) {
      console.log(e)
      setError("新規登録に失敗しました");
    }
  };

  return (
    <div>
      <h2>新規登録</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignup}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
          />
        </div>
        <button type="submit">登録</button>
      </form>
      <div>
        <Link to="/"><button>Go to Home</button></Link>
      </div>
    </div>
  );
};

export default Signup;
