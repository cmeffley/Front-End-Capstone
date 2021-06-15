import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';
import { getSingleAthlete } from '../helpers/data/athleteData';
import { getSingleCoach } from '../helpers/data/coachData';

function App() {
  const [coach, setCoach] = useState(null);
  const [athlete, setAthlete] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed && (authed.uid === process.env.REACT_APP_COACH_UID)) {
        const coachInfoObject = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          coachUid: authed.uid,
          username: authed.email.split('@')[0],
        };
        getSingleCoach(authed.uid, coachInfoObject).then((response) => {
          if (isMounted.current) {
            setCoach(response);
          }
          isMounted.current = true;
        });
        setAthlete(false);
      } else if (authed && (authed.uid !== process.env.REACT_APP_COACH_UID)) {
        const athleteInfoObject = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          athleteUid: authed.uid,
          username: authed.email.split('@')[0],
        };
        getSingleAthlete(authed.uid, athleteInfoObject).then((response) => {
          if (isMounted.current) {
            setAthlete(response);
          }
          isMounted.current = true;
        });
        setCoach(false);
      } else if ((coach || coach === null) || (athlete || athlete === null)) {
        if (isMounted.current) {
          setAthlete(false);
          setCoach(false);
        }
        isMounted.current = true;
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
