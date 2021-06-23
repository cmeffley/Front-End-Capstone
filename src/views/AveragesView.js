import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import WorkoutAverages from '../components/WorkoutAverages';
import { seeWorkoutsForRace } from '../helpers/data/raceWorkoutsData';

function AveragesView() {
  const [singlerace, setSingleRace] = useState({});
  const [workData, setWorkData] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const { raceId } = useParams();
  useEffect(() => {
    seeWorkoutsForRace(raceId).then((response) => {
      if (isMounted.current) {
        setSingleRace(response.race);
        setWorkData(response.workout);
      }
      isMounted.current = true;
    });
  }, []);

  return (
    <div className='workoutdataContainer'>
      <header>
        <h2>{singlerace.raceName} Data</h2>
      </header>
      <br />
      <div>
        <WorkoutAverages
          workData={workData}
        />
      </div>
    </div>
  );
}

// AveragesView.propTypes = {
//   coach: PropTypes.any,
//   athlete: PropTypes.any
// };

export default AveragesView;
