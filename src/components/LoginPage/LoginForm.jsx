import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const LoginForm = ({ handleChange, handleSubmit, state }) => {
  const {
    user,
    errors
  } = state;

  return (
    <div>
      <h2 style={styles.headline}>User Login</h2>
      <form id="userLoginForm">
      <div className="form-group">
        <TextField
          fullWidth={true}
          hintText="Enter your username"
          name="username"
          type="text"
          floatingLabelText="Username"
          onChange={handleChange}
          value={user.username}
          errorText={errors.username}
        />
      </div>

      <div className="form-group">
        <TextField
          fullWidth={true}
          hintText="Enter your password"
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
          icon={<i style={{ color: '#fff' }} className="fa fa-login"></i>}
          onClick={() => { handleSubmit() }}
        />
      </div>
    </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
}

export default LoginForm;
