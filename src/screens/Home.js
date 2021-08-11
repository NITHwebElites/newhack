import React, { useState } from 'react';
import styled from 'styled-components';
import Login from '../components/Login.component';
import Register from '../components/Register.component';
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';

export default function Home() {
  const [showRegister, setShowRegister] = useState(false);
  if (firebase.auth().currentUser) {
    return <Redirect to="/profile" />;
  }

  return (
    <Container>
      <Card>
        {showRegister ? (
          <Register setShowRegister={setShowRegister} />
        ) : (
          <Login setShowRegister={setShowRegister} />
        )}
      </Card>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  max-width: 600px;
  height: auto;
  padding: 2rem 0.7rem;
  border-radius: 13px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
