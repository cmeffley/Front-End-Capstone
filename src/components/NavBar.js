import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { signOutUser } from '../helpers/auth';
import getWeather from '../helpers/data/weatherData';
import WeatherCard from './WeatherCard';

const NavBar = ({ coach, athlete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(false);

  const modaltoggle = () => setModal(true);
  const closeModalToggle = () => {
    setModal(false);
    setCity('');
  };
  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();

  async function forecastRequest() {
    await getWeather(city)
      .then((response) => setData(response));
  }

  const signOutToHome = () => {
    signOutUser();
    history.push('/');
  };

  const coachOnly = () => (
    <>
      <NavItem>
        <Link className="nav-link" to="/addworkouts">Create Workouts</Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/editquickworkouts">Edit Quick Workouts</Link>
      </NavItem>
    </>
  );

  return (
    <div>
      <>
        <Modal isOpen={modal} toggle={modaltoggle} className='weathermodal'>
          <ModalHeader toggle={modaltoggle}>Weather</ModalHeader>
          <ModalBody>
            <WeatherCard
              data={data}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={closeModalToggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
      <Navbar className='navigation' dark expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/raceSchedule">Race Schedule</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/addrace">Add Race</Link>
            </NavItem>
            {/* <NavItem>
              <Link className="nav-link" to="/workouts">Workouts</Link>
            </NavItem> */}
            { coach && coachOnly()}
          </Nav>
            <div className='auth-btn-container'>
              <Form
                id='searchweatherform'
                autoComplete='off'
                onSubmit={(e) => {
                  e.preventDefault();
                  forecastRequest();
                  modaltoggle();
                }}>
                <input
                  name='city'
                  type='text'
                  placeholder='Enter City'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Button type='submit'>Check Weather</Button>
              </Form>
            </div>
            <div className='line'></div>
          { (coach !== null || athlete !== null)
            && <div>
                {
                  coach || athlete ? <Button id='authbutton' onClick={signOutToHome}>SignOut</Button>
                    : ''
                }
              </div>
            }
        </Collapse>
      </Navbar>
    </div>
  );
};
NavBar.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any
};
export default NavBar;
