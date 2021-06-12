import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';
import { getSingleAthlete, addAthlete } from '../helpers/data/athleteData';

function App() {
  const [coach, setCoach] = useState(null);
  const [athlete, setAthlete] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed && (authed.uid === process.env.REACT_APP_COACH_UID)) {
        const coachInfoObject = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          coachUid: authed.uid,
          username: authed.email.split('@')[0],
        };
        setCoach(coachInfoObject);
        setAthlete(false);
      } else if (authed && (authed.uid !== process.env.REACT_APP_COACH_UID)) {
        const athleteInfoObject = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          athleteUid: authed.uid,
          username: authed.email.split('@')[0],
        };
        // Make sure to check that the athlete does not already exist in Firebase
        // create an call to the API to create an athlete in Firebase
        // .then() setAthlete from respsonse
        if (authed.uid) {
          getSingleAthlete(authed.uid, athleteInfoObject).then((response) => setAthlete(response));
        } else {
          addAthlete(athleteInfoObject).then((response) => getSingleAthlete(response)).then((response) => setAthlete(response));
        }
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
    </div>
  );
}

export default App;
