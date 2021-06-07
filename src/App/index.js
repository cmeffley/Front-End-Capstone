import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';

function App() {
  const [coach, setCoach] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObject = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          username: authed.email.split('@gmail.com')[0],
          uid: authed.uid
        };
        setCoach(userInfoObject);
      } else if (coach || coach === null) {
        setCoach(false);
      }
    });
  }, []);

  return (
    <div className='App'>
       <Router>
        <NavBar coach={coach}/>
        <Routes coach={coach}/>
      </Router>
    </div>
  );
}

export default App;
