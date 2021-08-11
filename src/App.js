import { Route, Switch } from 'react-router-dom';
import firebase from './firebase';

import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import Home from './screens/Home';
import Profile from './screens/Profile';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Header } from './components/Register.component';

function App() {
  const [loading, setLoading] = useState(true);

  firebase.auth().onAuthStateChanged((res) => {
    if (res) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  });

  if (loading) {
    return <Header>Loading...</Header>;
  }
  return (
    <>
      <ToastContainer position="top-center" hideProgressBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </>
  );
}

export default App;
