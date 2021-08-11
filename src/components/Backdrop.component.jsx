import React from 'react';
import styled from 'styled-components';

const Backdrop = ({ setShow }) => {
  return (
    <>
      <Container onClick={() => setShow(false)}></Container>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgb(0, 0, 0, 0.8);
`;

export default Backdrop;
