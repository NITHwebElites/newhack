import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signin } from '../firebaseService';
import {
  Button,
  Cross,
  Error,
  Header,
  Input,
  InputsContainer,
  SwitchingText,
} from './Register.component';

export default function Login({ setShowRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Invalid email or password');
      return;
    }
    try {
      await signin(email, password);
      history.push('/profile');
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        setError('User not found. Sign up to continue');
      }
      if (e.code === 'auth/wrong-password') {
        toast.error(e.message);
        setError('Wrong email or password');
      }
    }
  };
  return (
    <>
      {!!error && (
        <Error>
          <p>{error}</p>
          <Cross onClick={() => setError('')}>X</Cross>
        </Error>
      )}
      <Header>Login</Header>
      <InputsContainer>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter your email address"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
        />
      </InputsContainer>

      <Button backgroundColor="black" color="white" onClick={handleLogin}>
        Login
      </Button>
      <SwitchingText onClick={() => setShowRegister(true)}>
        Don't have an account? <span style={{ color: 'purple' }}>Signup!</span>
      </SwitchingText>
    </>
  );
}
