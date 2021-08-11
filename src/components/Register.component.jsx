import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { signup } from '../firebaseService';

export default function Register({ setShowRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handleSignup = async () => {
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    try {
      await signup(email, password);
      history.push('/profile');
    } catch (e) {
      console.log(e);
      if (e.code === 'auth/invalid-email') {
        setError('Please enter a valid email');
      } else if (e.code === 'auth/weak-password') {
        setError('Password must be atleast 6 characters long');
        setPassword('');
      } else if (e.code === 'auth/email-already-in-use') {
        setError('Email is already registered');
      } else {
        setError('Something went wrong');
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
      <Header>Signup</Header>
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

      <Button backgroundColor="black" color="white" onClick={handleSignup}>
        Sign up
      </Button>
      <SwitchingText>
        Already have an account?{' '}
        <span
          style={{ color: 'purple' }}
          onClick={() => setShowRegister(false)}
        >
          Log in!
        </span>
      </SwitchingText>
    </>
  );
}

export const Header = styled.h1`
  font-style: italic;
  color: #00000095;
  text-align: center;
`;

export const InputsContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

export const Input = styled.input`
  outline: none;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #ccc;
  margin: 1rem 0;
  padding: 5px 7px;
  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  padding: 7px 11px;
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 0.7px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-radius: 17px;
  margin-top: 1rem;
  text-transform: uppercase;
`;

export const SwitchingText = styled.p`
  text-align: center;
  margin-top: 0.5rem;

  span {
    cursor: pointer;
  }
`;

export const Error = styled.div`
  color: white;
  background-color: rgba(255, 0, 0, 0.5);
  border: 1px solid red;
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Cross = styled.div`
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
