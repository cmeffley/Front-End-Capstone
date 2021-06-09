import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';
import RacesFormView from '../views/RacesFormView';

function App() {
  const [coach, setCoach] = useState(null);
  const [athlete, setAthlete] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed && (authed.uid === process.env.REACT_APP_COACH_UID)) {
        const coachInfoObject = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          username: authed.email.split('@')[0],
        };
        setCoach(coachInfoObject);
        setAthlete(false);
      } else if (authed && (authed.uid !== process.env.REACT_APP_COACH_UID)) {
        const athleteInfoObject = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          username: authed.email.split('@')[0],
        };
        setAthlete(athleteInfoObject);
        setCoach(false);
      } else if ((coach || coach === null) || (athlete || athlete === null)) {
        setAthlete(false);
        setCoach(false);
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
      <RacesFormView/>
    </div>
  );
}

export default App;
