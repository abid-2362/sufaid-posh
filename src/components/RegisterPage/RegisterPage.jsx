import React from 'react';
import PropTypes from 'prop-types';
import RegisterationForm from './RegistrationForm';
const RegisterPage = (props) => {
  return(

      <div className="container">
        <RegisterationForm data={props} />
      </div>

  );
};

RegisterPage.propTypes = {
  handleChange: PropTypes.func.isRequired
}

export default RegisterPage;
