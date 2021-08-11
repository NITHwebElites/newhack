import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Backdrop from '../components/Backdrop.component';
import Modal from '../components/Modal.component';
import {
  Button,
  Cross,
  Error,
  Header,
  Input,
} from '../components/Register.component';
import firebase from '../firebase';
import { signout } from '../firebaseService';
import {
  createWeightDocument,
  dataFromSnapshot,
  deleteWeightDocument,
  listenToWeightCollection,
  updateWeightDocument,
} from '../firestore';

export default function Profile() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [weight, setWeight] = useState('');
  const [addValueError, setAddValueError] = useState('');

  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState('');

  const [data, setData] = useState(null);
  const [editWeight, setEditWeight] = useState('');
  const [editValueError, setEditValueError] = useState('');

  const history = useHistory();
  const user = firebase.auth().currentUser;

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    listenToWeightCollection(user.uid).onSnapshot(
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => dataFromSnapshot(doc));
        setData(docs);
        setLoading(false);
      },

      (error) => {
        toast.error('Something went wrong');
        setLoading(false);
        console.log(error);
      }
    );
  }, [user]);

  const logout = async () => {
    await signout();
    history.push('/');
  };

  if (!firebase.auth().currentUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async () => {
    if (!parseInt(weight)) {
      setAddValueError('Please enter a valid number');

      return;
    }
    setSending(true);
    try {
      await createWeightDocument({ weight: weight });
      setShowCreateModal(false);
      setSending(false);
      setWeight('');
      setAddValueError('');
      toast.success('Record added successfully.');
    } catch (e) {
      toast.error('Error creating record');
      setSending(false);
      setWeight('');
      setAddValueError('');
    }
  };

  const handleUpdate = async () => {
    if (!parseInt(editWeight)) {
      setEditValueError('Please enter a valid number');
      return;
    }
    try {
      setSending(true);
      await updateWeightDocument(id, editWeight);
      setSending(false);
      setEditWeight('');
      setEditValueError('');
      setShowEditModal(false);
      toast.success('Record updated successfully');
    } catch (e) {
      setEditValueError('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWeightDocument(id);
      toast.success('Record deleted successfully');
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      {showCreateModal && <Backdrop setShow={setShowCreateModal} />}
      {showEditModal && <Backdrop setShow={setShowEditModal} />}

      {showCreateModal && (
        <Modal open={showCreateModal}>
          {!!addValueError && (
            <Error>
              {addValueError}{' '}
              <Cross onClick={() => setAddValueError('')}>X</Cross>
            </Error>
          )}
          <FormHeading>
            Create a record and keep track on your weight
          </FormHeading>
          <Input
            placeholder="Enter the weight in numbers"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          {!sending ? (
            <Button
              color="white"
              backgroundColor="#0C4370"
              onClick={handleSubmit}
            >
              Save
            </Button>
          ) : (
            <Button color="white" backgroundColor="#ccc">
              Saving...
            </Button>
          )}
        </Modal>
      )}
      {showEditModal && (
        <Modal open={showEditModal}>
          {!!editValueError && (
            <Error>
              {editValueError}{' '}
              <Cross onClick={() => setEditValueError('')}>X</Cross>
            </Error>
          )}
          <FormHeading>Enter a new value to change this record</FormHeading>
          <Input
            placeholder="Enter the weight in numbers"
            value={editWeight}
            onChange={(e) => setEditWeight(e.target.value)}
          />
          {!sending ? (
            <Button
              color="white"
              backgroundColor="#0C4370"
              onClick={handleUpdate}
            >
              Update
            </Button>
          ) : (
            <Button color="white" backgroundColor="#ccc">
              Updating...
            </Button>
          )}
        </Modal>
      )}
      <TopContainer>
        <Button
          backgroundColor="white"
          color="#000"
          onClick={() => {
            setShowCreateModal(true);
          }}
        >
          New entry
        </Button>
        <Button backgroundColor="white" color="#000" onClick={logout}>
          Logout
        </Button>
      </TopContainer>
      <Header
        style={{
          fontSize: '1rem',
          letterSpacing: '1px',
          marginTop: '0.3rem',
          fontStyle: 'normal',
        }}
      >
        {user.email}'s data
      </Header>
      {loading && <Header>Loading...</Header>}
      {data && !loading && data.length === 0 && (
        <Header
          style={{
            fontSize: '1rem',
            letterSpacing: '1px',
            fontStyle: 'normal',
          }}
        >
          No record found. Create a new one.
        </Header>
      )}

      {data && (
        <DataContainer>
          {data.map((d) => (
            <Card key={d.id}>
              <Header
                style={{
                  fontSize: '1rem',
                  letterSpacing: '1px',
                  fontStyle: 'normal',
                }}
              >
                Weight: {d.weight}Kg
              </Header>
              <RightContainer>
                <Button
                  onClick={() => {
                    setShowEditModal(true);
                    setId(d.id);
                  }}
                  color="white"
                  backgroundColor="#0c4370"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(d.id)}
                  color="white"
                  backgroundColor="red"
                >
                  Delete
                </Button>
              </RightContainer>
            </Card>
          ))}
        </DataContainer>
      )}
    </>
  );
}

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: #000000;
  padding: 1rem 0.5rem;

  & > button {
    margin: 0;
    margin: 0 1rem;
  }
`;

const FormHeading = styled.p`
  color: #0c4370;
  font-weight: bold;
  font-size: 0.8rem;
  text-align: center;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-top: 2.5rem;
  padding: 1rem 0.5rem;
  justify-content: flex-start;
  align-items: center;
  max-height: 80vh;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    height: 6px;
    width: 2px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #0c4370;
    border-radius: 10px;
  }
`;

const Card = styled.div`
  display: flex;
  border-radius: 17px;
  background: #ffffff;
  box-shadow: inset 10px 10px 36px #f0f0f0, inset -10px -10px 36px #ffffff;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  max-width: 600px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0.5rem;
  margin-top: 9px;

  @media only screen and (max-width: 250px) {
    margin-top: 1rem;
    justify-content: flex-start;
    padding: 0;
    width: 100%;
  }
  button {
    margin: 0 1rem;
  }
`;
