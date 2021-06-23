import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { signInUser, signOutUser } from '../helpers/auth';

function LandingPage({ coach, athlete }) {
  const history = useHistory();

  const signInAndGo = () => {
    signInUser();
    history.push('/raceSchedule');
  };

  return (
    <div className='landingContent'>
      <div className='welcome'>
        <h1>Welcome to Traine<span className='letter'>R</span></h1>
      </div>
      <div className='landingButtons'>
      { coach !== null
          && <>
            {
              coach ? <Button color='warning' onClick={signOutUser}>Coach SignOut?</Button>
                : <Button color='info' onClick={signInAndGo}>Coach Sign In</Button>
            }
            </>
      }
      { athlete !== null
          && <>
            {
              athlete ? <Button color='danger' onClick={signOutUser}>Athlete SignOut?</Button>
                : <Button color='success' onClick={signInAndGo}>Athlete Sign In</Button>
            }
              </>
            }
      </div>
    </div>
  );
}

LandingPage.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
};

export default LandingPage;
