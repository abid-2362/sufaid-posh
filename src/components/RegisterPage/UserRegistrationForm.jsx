import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import * as registrationActions from '../../actions/RegisterActions';
import './scss/registration.scss';
import RaisedButton from 'material-ui/RaisedButton/';
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import isEmpty from 'validator/lib/isEmpty';
// import isAlpha from 'validator/lib/isAlpha';
import isAlphanumeric from 'validator/lib/isAlphanumeric';

class UserRegistrationForm extends Component {

  resetErrors = () => {
    return { userRole: 'seeker', username: '', email: '', password: '', name:'',  address:'', city: '', phone: '', cnicNumber: '', bankDetails: '', additionalInfo: '' };
  }
  resetUser = () => {
    return { userRole: 'seeker', username: '', email: '', password: '', name:'',  address:'', city: '', phone: '', cnicNumber: '', bankDetails: '', additionalInfo: '', public: false };
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
    if(!isEmpty(user.email) && !isEmail(user.email)) {
      errors.email = "Please provide a valid email address or leave this field blank"
      valid = false;
    }
    // password
    if(user.password.length < 8) {
      errors.password = "Password must be atleast 8 characters long";
      valid = false;
    }
    // name
    if(user.name.length < 3) {
      errors.name = 'Name Must be atleast 3 characters long';
      valid = false;
    }
    // address
    if(isEmpty(user.address)) {
      errors.address = "Address is required, please provide a valid address";
      valid = false;
    }
    if(user.address.length < 5) {
      errors.address = "Address is too short, please provide a little more clear address";
      valid = false;
    }
    // city
    if(user.city.trim().length < 4) {
      errors.city = "Invalid city name, please provide the complete city name.";
      valid = false;
    }
    // phone
    if(!isEmpty(user.phone) && !isNumeric(user.phone)) {
      errors.phone = "Only numbers are allowed in phone, if you don't have a phone number, please leave this field blank"
      valid = false;
    }
    if( !isEmpty(user.phone) && ( user.phone.length < 10 || user.phone.length > 15) ) {
      errors.phone = "Phone number must be between 10 to 15 numbers, please provide a valid phone number";
      valid = false;
    }

    // cnic Number is optional but if provided then validate it.
    if(!isNumeric(user.cnicNumber)) {
      errors.cnicNumber = "Please provide a valid CNIC number.";
      valid = false;
    }
    if(user.cnicNumber.length != 13) {
      errors.cnicNumber = "CNIC Number must be 13 digits."
      valid = false;
    }

    // bankDetails
    if(!isEmpty(user.bankDetails) && user.bankDetails.length < 50) {
      errors.bankDetails = "Please provide complete bank details, including Bank Name, Bank Account Number, Account Title, Bank Branch Code or and other information required to transfer the money. it should be complete enough that someone can easily transfer money if interested.";
    }

    this.setState({errors});
    if(valid) {
      this.setState({disableRegisterButton: false});
    }else{
      this.setState({disableRegisterButton: true});
    }
    return valid;
  }

  handleUserRegistration = (e) => {
    this.setState({disableRegisterButton: true});
    if(!this.validateRegistrationForm()) {
      this.setState({validateOnInput: true});
      return;
    }

    console.log('handleUserRegistration', this.state.user);
    this.props.actions.registerUser(this.state.user);
  }

  handleChange = (e, val) => {
    // console.log(e.target.name, val, val.length);
    let user = this.state.user;
    user[e.target.name] = val;
    this.setState({user});

    // first set the state and then perform validation so that we can have exact fields to validate.
    if(this.state.validateOnInput) {
      this.validateRegistrationForm();
    }
  }

  handlePublicCheckBox = (e, isInputChecked) => {
    let user = this.state.user;
    if(isInputChecked) {
      user.public = true;
    } else {
      user.public = false;
    }
    this.setState({user});
  }
  // function(event: object, value: undefined) => void
  handleRoleRadioButton = (e, value) => {
    let user = this.state.user;
    user.userRole = value;
    this.setState({user});
  }

  render() {
    const {user, errors} = this.state;
    const styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginTop: 20,
        marginBottom: 16,
      },
      radioButton: {
        marginTop: 16,
        // marginBottom: 16,
        // display: 'inline-block',
        // width: '350px'
      },
    };
    return(
      <section id="registration-page">
        <div className="container">
          {/* <p>
            <strong>Important Note:</strong> if you are making an account for someone else, please provide
            the data of the original user.<br/>
            Please make sure you provide the correct CNIC Number, it may be used to send money to the user,
            so providing wrong/invalid cnic number may create problems.
          </p>
          <p className="urdu">اگر آپ کسی اور کے لیے اکائونٹ بنا رہے ہیں تو براہِ کرم اسی بندے کی تفصیلات فراہم کیجیے۔</p> */}
          <form onSubmit={this.handleUserRegistration} className="donor-form">
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
                  floatingLabelText="Password *"
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
                  floatingLabelText="Name *"
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
                  floatingLabelText="Address *"
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
                  floatingLabelText="City *"
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
                  hintText="Valid CNIC Number"
                  fullWidth={true}
                  name="cnicNumber"
                  id="cnicNumber"
                  floatingLabelText="CNIC Card Number *"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={user.cnicNumber}
                  errorText={errors.cnicNumber}
                />
              </div>
            </div>

            <div className="form-group">
              <TextField
                hintText="Bank Name: Standard Chartered Bank;
                Account Number: 01-xxxxxxxx-01;
                Account Title: User Name;
                Branch Code: 1234;"
                fullWidth={true}
                name="bankDetails"
                id="bankDetails"
                floatingLabelText="Complete Bank Details"
                floatingLabelFixed={true}
                onChange={this.handleChange}
                value={user.bankDetails}
                errorText={errors.bankDetails}
                multiLine={true}
                rows={4}
                rowsMax={4}
              />
            </div>
            <div className="form-group">
              <TextField
                hintText="Additional Information"
                fullWidth={true}
                name="additionalInfo"
                id="additionalInfo"
                floatingLabelText="Additional Information"
                floatingLabelFixed={true}
                onChange={this.handleChange}
                value={user.additionalInfo}
                errorText={errors.additionalInfo}
                multiLine={true}
                rowsMax={4}
              />
            </div>
            <div className="form-group">
              <Checkbox
                checkedIcon={<Visibility />}
                uncheckedIcon={<VisibilityOff />}
                label={ user.public ? "Display my information publicly." : "Display my information only to the interested people." }
                style={styles.checkbox}
                onCheck={this.handlePublicCheckBox}
              />
            </div>
            <div className="form-group">
              <RaisedButton
                label="Register"
                secondary={true}
                style={{marginTop:12}}
                onClick={this.handleUserRegistration}
                disabled={this.state.disableRegisterButton}
              />
            </div>
          </form>
        </div>
      </section>
    );
  }
}

UserRegistrationForm.propTypes = {
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
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserRegistrationForm);