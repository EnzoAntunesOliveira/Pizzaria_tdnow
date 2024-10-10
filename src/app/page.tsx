'use client';

import React, { useState } from 'react';
import LoginButton from './components/loginbutton';
import getLogin from './services/loginService';

export default function Home() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = async () => {
    if (email && senha) {
      try {
        await getLogin(email, senha); 
      } catch (error) {
        console.error('Erro durante o login:', error);
        alert('Erro ao tentar fazer login.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div className="login-container">
      <h2>Faça o Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <LoginButton onLogin={login} />
    </div>
  );
}
