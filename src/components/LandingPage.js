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
    <div>
      <h1>Welcome to Trainer</h1>
      { coach !== null
          && <div>
            {
              coach ? <Button color='warning' onClick={signOutUser}>Coach SignOut?</Button>
                : <Button color='info' onClick={signInAndGo}>Coach Sign In</Button>
            }
              </div>
      }<br />
      { athlete !== null
          && <div>
            {
              athlete ? <Button color='danger' onClick={signOutUser}>Athlete SignOut?</Button>
                : <Button color='success' onClick={signInAndGo}>Athlete Sign In</Button>
            }
              </div>
            }
    </div>
  );
}

LandingPage.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
};

export default LandingPage;
