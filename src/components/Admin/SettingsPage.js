import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import * as adminActions from '../../actions/AdminActions';
// import './scss/registration.scss';
import RaisedButton from 'material-ui/RaisedButton/';
import isEmail from 'validator/lib/isEmail';
// import isNumeric from 'validator/lib/isNumeric';
import isEmpty from 'validator/lib/isEmpty';
// import isAlpha from 'validator/lib/isAlpha';
// import isAlphanumeric from 'validator/lib/isAlphanumeric';

class SettingsPage extends Component {

  constructor(props) {
    super(props);
    let settings = JSON.parse(JSON.stringify(props.settings));
    this.state = {
      settings: settings,
      errors: this.resetErrors(),
      disableSubmitButton: false,
      validateOnInput: false
    }
  }
  resetErrors = () => {
    return { orgName: '', orgDescription: '', contactHeading: '', contactAddress: '', contactEmail: '', contactPhone: '', thirdColumnHeading: '', thirdColumnText: '' };
  }
  resetSettings = () => {
    return { orgName: '', orgDescription: '', contactHeading: '', contactAddress: '', contactEmail: '', contactPhone: '', thirdColumnHeading: '', thirdColumnText: '' };
  }
  // return true if form is valid, false otherwise, and set the errors in state as well.
  validateSettingsForm = () => {
    let valid = true;
    let errors = this.resetErrors(); // reset errors before validating
    let settings = this.state.settings;

    if(settings.orgName.length < 5) {
      errors.orgName = "Please provide complete organization name";
      valid = false;
    }

    // orgDescription
    if (settings.orgDescription.length < 50) {
      errors.orgDescription = "Please provide a brief description of your organization."
      valid = false;
    }
    // contactHeading
    if (settings.contactHeading.trim().length < 3) {
      errors.contactHeading = "Contact Headnig must be at least 3 characters";
      valid = false;
    }
    // contactAddress
    if (!isEmpty(settings.contactAddress) && settings.contactAddress.length < 3) {
      errors.contactAddress = "Please provide the complete Address or leave it blank if you don't want to provide address";
      valid = false;
    }

    // Contact Email
    if (!isEmpty(settings.contactEmail) && !isEmail(settings.contactEmail)) {
      errors.contactEmail = "Plaease provide correct email address or leave it empty if you dont want to publish email address."
      valid = false;
    }

    // contactPhone
    if (!isEmpty(settings.contactPhone) && /[^0-9-+]+/.test(settings.contactPhone)) {
      errors.contactPhone = "Contact phone number is not valid, either provide valid phone number or leave it empty, if you don't want to provide phone number.";
      valid = false;
    }
    if (!isEmpty(settings.contactPhone) && (settings.contactPhone.trim().length < 10 || settings.contactPhone.trim().length > 16)) {
      errors.contactPhone = "Contact phone number is not valid, Please provide the phone number in between of 10 and 16 characters.";
      valid = false;
    }

    // thirdColumnHeading
    if (!isEmpty(settings.thirdColumnHeading) && settings.thirdColumnHeading.trim().length < 3) {
      errors.thirdColumnHeading = "Please provide proper heading or leave it blank.";
      valid = false;
    }

    if (!isEmpty(settings.thirdColumnText) && settings.thirdColumnText.length < 50) {
      errors.thirdColumnText = "Please provide at least 50 characters or leave it blank."
      valid = false;
    }
    if (!isEmpty(settings.thirdColumnText) && settings.thirdColumnText.length < 250) {
      errors.thirdColumnText = "Please provide maximum 250 characters or leave it blank."
      valid = false;
    }

    this.setState({ errors });
    if (valid) {
      this.setState({ disableSubmitButton: false });
    } else {
      this.setState({ disableSubmitButton: true });
    }
    return valid;
  }

  handleSubmitSettings = (e) => {
    this.setState({ disableSubmitButton: true });
    if (!this.validateSettingsForm()) {
      this.setState({ validateOnInput: true });
      return;
    }
    this.props.actions.saveSettings(this.state.settings);
  }

  handleChange = (e, val) => {
    let settings = this.state.settings;
    settings[e.target.name] = val;
    this.setState({ settings });

    // first set the state and then perform validation so that we can have exact fields to validate.
    if (this.state.validateOnInput) {
      this.validateSettingsForm();
    }
  }

  render() {
    const { settings, errors } = this.state;
    return (
        <div className="mt-3">
          <h5 className="underline">Footer Settings</h5>
          <form onSubmit={this.handleSubmitSettings} className="donor-form">
            <div className="form-group row">
              <div className="col-12">
                <TextField
                  hintText="Organization Name"
                  fullWidth={true}
                  name="orgName"
                  type="text"
                  floatingLabelText="Organization Name *"
                  onChange={this.handleChange}
                  value={settings.orgName}
                  errorText={errors.orgName}
                  floatingLabelFixed={true}
                />
              </div>
              <div className="col-12">
                <TextField
                  hintText="Organization Descripton"
                  fullWidth={true}
                  name="orgDescription"
                  multiLine={true}
                  floatingLabelText="Organization Description"
                  floatingLabelFixed={true}
                  rows={2}
                  rowsMax={8}
                  onChange={this.handleChange}
                  value={settings.orgDescription}
                  errorText={errors.orgDescription}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-12 col-lg-6">
                <TextField
                  hintText="Contact Heading"
                  fullWidth={true}
                  name="contactHeading"
                  type="text"
                  floatingLabelText="Contact Heading"
                  onChange={this.handleChange}
                  value={settings.contactHeading}
                  errorText={errors.contactHeading}
                  floatingLabelFixed={true}
                />
              </div>

              <div className="col-12 col-lg-6">
                <TextField
                  hintText="Contact Address"
                  fullWidth={true}
                  name="contactAddress"
                  type="text"
                  floatingLabelText="Contact Address"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={settings.contactAddress}
                  errorText={errors.contactAddress}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-12 col-lg-6">
                <TextField
                  hintText="Contact Email"
                  fullWidth={true}
                  name="contactEmail"
                  type="text"
                  floatingLabelText="Contact Email"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={settings.contactEmail}
                  errorText={errors.contactEmail}
                />
              </div>
              <div className="col-12 col-lg-6">
                <TextField
                  hintText="Contact Phone"
                  fullWidth={true}
                  name="contactPhone"
                  type="text"
                  floatingLabelText="Contact Phone"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={settings.contactPhone}
                  errorText={errors.contactPhone}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-12">
                <TextField
                  hintText="Footer Third Column Heading"
                  fullWidth={true}
                  name="thirdColumnHeading"
                  type="text"
                  floatingLabelText="Third Column Heading"
                  floatingLabelFixed={true}
                  onChange={this.handleChange}
                  value={settings.thirdColumnHeading}
                  errorText={errors.thirdColumnHeading}
                />
              </div>
              <div className="col-12">
                <TextField
                  hintText="Additioal information, this information will be visible in the footer's third column"
                  fullWidth={true}
                  name="thirdColumnText"
                  multiLine={true}
                  floatingLabelText="Third Column Text"
                  floatingLabelFixed={true}
                  rows={2}
                  rowsMax={8}
                  onChange={this.handleChange}
                  value={settings.thirdColumnText}
                  errorText={errors.thirdColumnText}
                />
              </div>
            </div>
            <div className="form-group">
              <RaisedButton
                label="Update Settings"
                secondary={true}
                style={{ marginTop: 12 }}
                onClick={this.handleSubmitSettings}
                disabled={this.state.disableSubmitButton}
              />
            </div>

          </form>
        </div>
    );
  }
}

SettingsPage.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    settings: state.admin.siteSettings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(adminActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
