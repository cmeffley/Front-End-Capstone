import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';

function App() {
  const [coach, setCoach] = useState(null);
  const [athlete, setAthlete] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed && (authed.uid === process.env.REACT_APP_COACH_UID)) {
        setCoach(true);
        setAthlete(false);
      } else if (coach || coach === null) {
        setCoach(false);
      }
    });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((auth) => {
      if (auth) {
        const userInfoObject = {
          fullName: auth.displayName,
          profileImage: auth.photoURL,
          uid: auth.uid,
          user: auth.email.split('@')[0],
          coach: false
        };
        setAthlete(userInfoObject);
        setCoach(false);
      } else if (athlete || athlete === null) {
        setAthlete(false);
      }
    });
  }, []);

  return (
    <div className='App'>
       <Router>
        <NavBar
          coach={coach}
          athlete={athlete}
        />
        <Routes
          coach={coach}
          athlete={athlete}
        />
      </Router>
    </div>
  );
}

export default App;
