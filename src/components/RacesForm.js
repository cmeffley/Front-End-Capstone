import React from 'react';
import PropTypes from 'prop-types';

function RacesForm({

  editRaces,
}) {
  return (
    <div>
      {editRaces}
    </div>
  );
}

RacesForm.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
  editRaces: PropTypes.array,
  setEditRaces: PropTypes.func
};

export default RacesForm;
