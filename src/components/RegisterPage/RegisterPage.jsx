import React from 'react';
import PropTypes from 'prop-types';
// import RegisterationForm from './RegistrationForm';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import UserRegistrationForm from './UserRegistrationForm';
import DonorRegistrationForm from './DonorRegistrationForm';

const styles = {
      radioButton: {
        marginTop: 16,
      },
    };

const RegisterPage = (props) => {
    const {user, handleRoleRadioButton} = props;
  return(
    <section>
      <div className="container">
        <h2>Signup</h2>
        <div className="form-group">
          <RadioButtonGroup
            name="userRole"
            defaultSelected={user.userRole}
            valueSelected={user.userRole}
            className="row"
            style={{marginTop: 20}}
            >
            <RadioButton
              value="donor"
              label="I want to donate"
              style={styles.radioButton}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              onClick={() => {handleRoleRadioButton(event, 'donor')}}
            />
            <RadioButton
              value="seeker"
              label="I am seeking for help"
              style={styles.radioButton}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              onClick={() => {handleRoleRadioButton(event, 'seeker')}}
            />
          </RadioButtonGroup>
        </div>
      </div>
      { user.userRole.toLowerCase() == 'seeker' ?
        <UserRegistrationForm /> : <DonorRegistrationForm /> }
    </section>
  );
};

RegisterPage.propTypes = {
  handleRoleRadioButton: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default RegisterPage;
