import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { API_URL as url } from "../../constants/constants";
import { Tabs, Tab } from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const LoginForm = ({ handleChange, handleSubmit, state, formSelector }) => {
  const {
    user,
    errors
  } = state;

  const donorLoginForm = (
    <form id="donorLoginForm">
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
          icon={<i style={{ color: '#fff' }} className="fa fa-login"></i>}
          onClick={() => {handleSubmit('donor')}}
        />
      </div>
    </form>
  );

  const userLoginForm = (
    <form id="userLoginForm">
      <div className="form-group">
        <TextField
          fullWidth={true}
          hintText="CNIC Number"
          name="cnicNumber"
          type="text"
          floatingLabelText="CNIC Number"
          onChange={handleChange}
          value={user.cnicNumber}
          errorText={errors.cnicNumber}
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
          icon={<i style={{ color: '#fff' }} className="fa fa-login"></i>}
          onClick={() => {handleSubmit('user')}}
        />
      </div>
    </form>
  );

  return (
    <Tabs
      value={state.tab}
      onChange={formSelector}
    >
      <Tab label="Donor Login" value="donor">
        <div>
          <h2 style={styles.headline}>Donor Login</h2>
          {donorLoginForm}
        </div>
      </Tab>
      <Tab label="User Login" value="user">
        <div>
          <h2 style={styles.headline}>User Login</h2>
          {userLoginForm}
        </div>
      </Tab>
    </Tabs>
  );
};

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  formSelector: PropTypes.func.isRequired
}

export default LoginForm;
