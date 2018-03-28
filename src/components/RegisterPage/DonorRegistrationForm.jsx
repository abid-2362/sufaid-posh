import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import * as registrationActions from '../../actions/RegisterActions';
import './scss/registration.scss';
import RaisedButton from 'material-ui/RaisedButton/';
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import isEmpty from 'validator/lib/isEmpty';
import isAlpha from 'validator/lib/isAlpha';
import isAlphanumeric from 'validator/lib/isAlphanumeric';

class DonorRegistrationForm extends Component {

  resetErrors = () => {
    return { username: '', email: '', password: '', name: '', address: '', city: '', phone: '', cnicNumber: '' };
  }
  resetUser = () => {
    return { username: '', email: '', password: '', name: '', address: '', city: '', phone: '', cnicNumber: '', userRole: 'donor' };
  }

  state = {
    user: this.resetUser(),
    errors: this.resetErrors(),
    disableRegisterButton: false,
    validateOnInput: false
  }
  // return true if form is valid, false otherwise, and set the errors in state as well.
  validateRegistrationForm = () => {
    // console.log('validating Registration Form');
    let valid = true;
    let errors = this.resetErrors(); // reset errors before validating
    let user = this.state.user;

    if(user.username.length < 3 || user.username.length > 20) {
      errors.username = "Username must be between 3 to 20 characters long";
      valid = false;
    }
    if(!isAlphanumeric(user.username)) {
      errors.username = "Username must be alphanumeric value";
      valid = false;
    }

    // email
    if (!isEmail(user.email)) {
      errors.email = "Please provide a valid email address."
      valid = false;
    }
    // password
    if (user.password.length < 8) {
      errors.password = "Password must be atleast 8 characters long";
      valid = false;
    }
    // name
    if (user.name.length < 3) {
      errors.name = 'Name Must be atleast 3 characters long';
      valid = false;
    }
    // address
    if (isEmpty(user.address)) {
      errors.address = "Address is required, please provide a valid address";
      valid = false;
    }
    if (user.address.length < 5) {
      errors.address = "Address is too short, please provide a little more clear address";
      valid = false;
    }
    // city
    if (!isAlpha(user.city)) {
      errors.city = "Invalid city name, please provide the correct city name";
      valid = false;
    }
    // phone
    if (!isNumeric(user.phone)) {
      errors.phone = "Only numbers are allowed in phone"
      valid = false;
    }
    if (user.phone.length < 10 || user.phone.length > 15) {
      errors.phone = "Phone number must be between 10 to 15 numbers, please provide a valid phone number";
      valid = false;
    }

    // cnic Number is optional but if provided then validate it.
    if (!isEmpty(user.cnicNumber) && !isNumeric(user.cnicNumber)) {
      errors.cnicNumber = "Please provide a valid id card number or leave this field blank if you dont want to provide your cnic number.";
      valid = false;
    }

    if (!isEmpty(user.cnicNumber) && user.cnicNumber.length != 13) {
      errors.cnicNumber = "CNIC Number must be 13 digits."
    }

    this.setState({ errors });
    if (valid) {
      this.setState({ disableRegisterButton: false });
    } else {
      this.setState({ disableRegisterButton: true });
    }
    return valid;
  }

  handleDonorRegistration = (e) => {
    this.setState({ disableRegisterButton: true });
    if (!this.validateRegistrationForm()) {
      this.setState({ validateOnInput: true });
      return;
    }

    this.props.actions.registerDonorUser(this.state.user);

    // send user registration request, if registered then

    // create an action to create the user in the store.

    //
  }

  handleChange = (e, val) => {
    // console.log(e.target.name, val, val.length);
    let user = this.state.user;
    user[e.target.name] = val;
    this.setState({ user });

    // first set the state and then perform validation so that we can have exact fields to validate.
    if (this.state.validateOnInput) {
      this.validateRegistrationForm();
    }
  }

  render() {
    const { user, errors } = this.state;

    return (
      <section id="registration-page">
        <div className="container">
          <form onSubmit={this.handleDonorRegistration} className="donor-form">
            <div className="form-group row">
              <div className="col-12 col-sm-6">
                <TextField
                  hintText="Chose your username for login"
                  fullWidth={true}
                  name="username"
                  type="text"
                  floatingLabelText="Username *"
                  onChange={this.handleChange}
                  value={user.username}
                  errorText={errors.username}
                  floatingLabelFixed={true}
                />
              </div>
              <div className="col-12 col-sm-6">
                <TextField
                  hintText="Chose your password."
                  fullWidth={true}
                  name="password"
                  type="password"
                  floatingLabelText="Password"
                  onChange={this.handleChange}
                  value={user.password}
                  errorText={errors.password}
                  floatingLabelFixed={true}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-12 col-sm-6">
                <TextField
                  hintText="Full Name"
                  fullWidth={true}
                  name="name"
                  type="text"
                  floatingLabelText="Name"
                  onChange={this.handleChange}
                  value={user.name}
                  errorText={errors.name}
                  floatingLabelFixed={true}
                />
              </div>

              <div className="col-12 col-sm-6">
                <TextField
                  hintText="Email"
                  fullWidth={true}
                  name="email"
                  type="text"
                  floatingLabelText="Email"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={user.email}
                  errorText={errors.email}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-12 col-sm-6">
                <TextField
                  hintText="Complete Address"
                  fullWidth={true}
                  name="address"
                  type="text"
                  floatingLabelText="Address"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={user.address}
                  errorText={errors.address}
                />
              </div>
              <div className="col-12 col-sm-6">
                <TextField
                  hintText="City"
                  fullWidth={true}
                  name="city"
                  type="text"
                  floatingLabelText="City"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={user.city}
                  errorText={errors.city}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-12 col-sm-6">
                <TextField
                  hintText="Phone Number"
                  fullWidth={true}
                  name="phone"
                  type="text"
                  floatingLabelText="Phone"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={user.phone}
                  errorText={errors.phone}
                />
              </div>
              <div className="col-12 col-sm-6">
                <TextField
                  hintText="3310012345678"
                  fullWidth={true}
                  name="cnicNumber"
                  id="cnicNumber"
                  floatingLabelText="CNIC Card Number"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={user.cnicNumber}
                  errorText={errors.cnicNumber}
                />
              </div>
            </div>
            <div className="form-group">
              <RaisedButton
                label="Register"
                secondary={true}
                style={{ marginTop: 12 }}
                onClick={this.handleDonorRegistration}
                disabled={this.state.disableRegisterButton}
              />
            </div>

          </form>
        </div>
      </section>
    );
  }
}

DonorRegistrationForm.propTypes = {
  // myProp: PropTypes.string.isRequired
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    // state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(registrationActions, dispatch)
    // actions: bindActionCreators(actions, dipatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DonorRegistrationForm);
