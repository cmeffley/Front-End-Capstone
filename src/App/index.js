import React, { useState } from 'react';
// import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import 'firebase/auth';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';

function App() {
  // When you set up firebase add setUser method and change useState to null.
  const [user] = useState(false);

  // Checking for authenticated users. You must set up firebase authentication for this to work!
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((authed) => {
  //     if (authed) {
  //       const userInfoObject = {
  //         fullName: authed.displayName,
  //         profileImage: authed.photoURL
  //         username: authed.email.split('@gmail.com')[0],
  //         uid: authed.uid
  //       };
  //       setUser(userInfoObject);
  //     } else if (user || user === null) {
  //       setUser(false);
  //     }
  //   });
  // }, []);

  return (
    <div className='App'>
       <Router>
        <NavBar user={user}/>
        <Routes user={user}/>
      </Router>
    </div>
  );
}

export default App;
