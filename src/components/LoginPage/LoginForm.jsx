import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { API_URL as url } from "../../constants/constants";
const LoginForm = ({handleChange, handleSubmit, state}) => {
  const {
    user,
    errors
  } = state;
  return(
    <form id="registrationForm">
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
          hintText="Password"
          name="password"
          type="password"
          floatingLabelText="Password"
          onChange={handleChange}
          value={user.password}
          errorText={errors.password}
        />
      </div>

      <div className="form-group">
        <RaisedButton
          label="Login"
          secondary={true}
          // style={styles.button}
          icon={<i style={{color: '#fff'}} className="fa fa-login"></i>}
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
}

export default LoginForm;
