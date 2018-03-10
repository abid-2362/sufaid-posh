import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import PropTypes from 'prop-types';

const RegistrationForm = ({data}) => {
  const {
    handleChange, user, errors, handleSubmit
  } = data;
  return(
    <form action="" id="registrationForm">
      <div className="form-group">
        <TextField
          fullWidth={true}
          hintText="Name"
          name="name"
          type="text"
          floatingLabelText="Name"
          onChange={handleChange}
          value={user.name}
          errorText={errors.name}
        />
      </div>

      <div className="form-group">
        <TextField
          fullWidth={true}
          hintText="Phone Number"
          name="phone"
          type="text"
          floatingLabelText="Phone Number"
          onChange={handleChange}
          value={user.phone}
          errorText={errors.phone}
        />
      </div>

      <div className="form-group">
        <TextField
          fullWidth={true}
          hintText="Email"
          name="email"
          type="email"
          floatingLabelText="Email"
          onChange={handleChange}
          value={user.email}
          errorText={errors.email}
        />
      </div>

      <div className="form-group">
        <TextField
          fullWidth={true}
          hintText="City"
          name="city"
          type="text"
          floatingLabelText="City"
          onChange={handleChange}
          value={user.city}
          errorText={errors.city}
        />
      </div>

      <div className="form-group">
        <RaisedButton
          label="Register"
          secondary={true}
          // style={styles.button}
          icon={<i style={{color: '#fff'}} className="fa fa-plus-circle"></i>}
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};
RegistrationForm.propTypes = {
  // handleChange: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
  // errors: PropTypes.object.isRequired
  data: PropTypes.object.isRequired,
}

export default RegistrationForm;
