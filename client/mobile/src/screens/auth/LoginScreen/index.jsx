import React, { useState } from 'react';
import { useUser } from '../../../contexts/userContext';
import { signInUser } from '../../../contexts/userContext';
import LoginPanel from './LoginPanel';

export default function LoginScreen() {
  const { signInUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    try {
      setError('');
      await signInUser({ email, password });
    } catch {
      setError('Email ou senha inválidos');
    }
  }

  return (
    <LoginPanel
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onSubmit={handleLogin}
      error={error}
    />
  );
}