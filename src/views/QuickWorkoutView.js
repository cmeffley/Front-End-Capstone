// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter
// } from 'reactstrap';
// import QuickWorkout from '../components/QuickWorkout';
// import { getQuickWorkouts } from '../helpers/data/quickWorkoutsData';

// function QuickWorkoutView({ coach, athlete }) {
//   const [quickWork, setQuickWork] = useState([]);
//   const [randomQuickWork, setRandomQuickWork] = useState({});
//   const [modal, setModal] = useState(false);
//   console.warn(randomQuickWork);
//   const toggle = () => setModal(!modal);
//   useEffect(() => {
//     getQuickWorkouts().then((response) => {
//       setQuickWork(response);
//       setRandomQuickWork(response[Math.floor(Math.random() * response.length)]);
//     });
//   }, []);

//   return (
//     <div>
//       <Button color="danger" onClick={toggle}>Open Modal</Button>
//       <Modal isOpen={modal} toggle={toggle} className='quickWorkModal'>
//         <ModalHeader toggle={toggle}>Modal title</ModalHeader>
//         <ModalBody>
//           {quickWork.map((quickObject) => (
//           <QuickWorkout
//             key={quickObject.firebaseKey}
//             {...quickObject}
//             coach={coach}
//             athlete={athlete}
//           />
//           ))}
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
//           <Button color="secondary" onClick={toggle}>Cancel</Button>
//         </ModalFooter>
//       </Modal>

//     </div>
//   );
// }

// QuickWorkoutView.propTypes = {
//   coach: PropTypes.any,
//   athlete: PropTypes.any
// };

// export default QuickWorkoutView;
