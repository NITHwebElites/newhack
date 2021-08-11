import React from 'react';
import styled from 'styled-components';

export default function ModalWrapper({ children, open, width = '400px' }) {
  return (
    <Modal
      width={width}
      className={open ? 'show modal__schedule' : 'modal__schedule'}
    >
      {children}
    </Modal>
  );
}

const Modal = styled.div`
  position: fixed;
  border-radius: 15px;
  top: 50%;
  left: 50%;
  z-index: 200;
  padding: 2rem;
  border: 1px solid #ccc;
  background: white;
  /* opacity: 0; */
  transform: translate(-50%, -50%);
  &.modal__schedule {
    width: ${(props) => props.width};
  }
  @media screen and (max-width: 600px) {
    &.modal__schedule {
      width: 80%;
    }
  }
`;
