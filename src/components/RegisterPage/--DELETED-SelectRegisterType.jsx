import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const SelectRegisterType = ({closeRegistrationDialog}) => {
  const style = {margin: 12};
  return(
    <section>
      <p>Please select your registration type.</p>
      <div className="text-center">
        <Link to="/donor-registration">
          <RaisedButton
            label="I want to donate"
            primary
            style={style}
            onClick={closeRegistrationDialog}
          />
        </Link>
        <Link to="/user-registration">
          <RaisedButton
            label="Seeking for help"
            secondary
            style={style}
            onClick={closeRegistrationDialog}
          />
        </Link>
      </div>
    </section>
  );
};

SelectRegisterType.propTypes =  {
  closeRegistrationDialog: PropTypes.func.isRequired
}

export default SelectRegisterType;