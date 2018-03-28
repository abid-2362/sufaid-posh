import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingActions from '../../actions/ListingActions';
import CreateListingForm from './CreateListingForm';
import isNumeric from 'validator/lib/isNumeric';
import isEmpty from 'validator/lib/isEmpty';

class CreateListingPageContainer extends Component {
  constructor(props) {
    super(props);
    if(props.user.userType != "seeker") {
      return props.history.push('/');
    }
  }

  resetListing = () => {
    return {
      category: "",
      title: "",
      description: "",
      requirements: "",
      estimatedCost: "",
      costRepeater: "",
      name: "",
      address: "",
      city: "",
      phone: "",
      public: false,
      requirementsArray: [],
      cnicNumber: ''
    }
  };

  state = {
    listing: this.resetListing(),
    errors: this.resetListing(),
    disableSubmitButton: false,
    validateOnInput: false,
  };

  handleChange = (e, val) => {
    let listing = this.state.listing;
    listing[e.target.name] = val;
    if(e.target.name.toLowerCase() == "requirements") {
      this.handleRequirements(this.state.listing.requirements);
    }
    this.setState({ listing });

    // first set the state and then perform validation so that we can have exact fields to validate.
    if(this.state.validateOnInput) {
      this.validateListingForm();
    }
  }

  handleCostRepeater = (event, key, payload) => {
    let listing = this.state.listing;
    listing.costRepeater = payload;
    this.setState({listing});
    if(this.state.validateOnInput) {
      this.validateListingForm();
    }
  }
  handleCategory = (event, key, payload) => {
    let listing = this.state.listing;
    listing.category = payload;
    this.setState({listing});
    if(this.state.validateOnInput) {
      this.validateListingForm();
    }
  }
  /*
  handleRequirements = (requirements) => {
    let listing = this.state.listing;
    const requirementsArray = requirements.split(",");
    listing.requirementsArray = requirementsArray;
    this.setState({listing});
  }
  */
  handleCheckBox = (e, isInputChecked) => {
    let listing = this.state.listing;
    if(isInputChecked) {
      listing.public = true;
    } else {
      listing.public = false;
    }
    this.setState({listing});
  }

  onRequirementChange = (addedOrRemovedTag, allTags) => {
    let listing = this.state.listing;
    listing.requirementsArray = allTags.map((tag) => tag.label);
    this.setState({listing});
    if(this.state.validateOnInput) {
      this.validateListingForm();
    }
  }

  validateListingForm = () => {
    let valid = true;
    let errors = this.resetListing(); // reset errors before validating
    let listing = this.state.listing;
    // category: "",
    if(listing.category.length < 1) {
      errors.category = "Please select the category.";
      valid = false;
    }
    // title: "",
    if(listing.title.length < 10 || listing.title.length > 75) {
      errors.title = "Title must be between 10 to 75 characters."
      valid = false;
    }
    // description: "",
    if(listing.description.length < 25) {
      errors.description = "Please provide detailed description";
      valid = false;
    }
    if(listing.description.length > 2500) {
      errors.description = "Description is too long, please reduce the description to maximum of 2500 characers";
      valid = false;
    }
    // requirementsArray: [],
    if(listing.requirementsArray.length < 1) {
      errors.requirements = "Please provide at least one requirement";
      valid = false;
    }
    // estimatedCost: "",
    if(!isNumeric(listing.estimatedCost)) {
      errors.estimatedCost = "Please provide the amount in digits";
      valid = false;
    }
    // costRepeater: "",
    if(listing.costRepeater.length < 1) {
      errors.costRepeater = "Please select the duration repeater option";
      valid = false;
    }
    // name
    if(listing.name.length < 4) {
      errors.name = "Please provide full name";
      valid = false;
    }
    // address: "",
    if(isEmpty(listing.address)) {
      errors.address = "Address is required";
      valid = false;
    }
    if(listing.address.length < 10) {
      errors.address = "Address is too short, please provide the complete address clearly.";
      valid = false;
    }
    // city: "",
    if(isEmpty(listing.city)) {
      errors.city = "City is required";
      valid = false;
    }
    if(listing.city.length < 4) {
      errors.city = "Please provide the complete name of the city";
      valid = false;
    }
    // phone: "",
    if(!isEmpty(listing.phone) && !isNumeric(listing.phone)) {
      errors.phone = "Please provide the phone number in digits or leave it blank, if you dont have one";
      valid = false;
    }
    if(listing.phone.length < 11 || listing.phone.length > 15) {
      errors.phone = "Please provide a valid phone number.";
      valid = false;
    }
    // cnicNumber
    if(isEmpty(listing.cnicNumber)) {
      errors.cnicNumber = "CNIC number is required";
      valid = false;
    }else if(!isNumeric(listing.cnicNumber)) {
      errors.cnicNumber = "Only digits are allowed in cnic number.";
      valid = false;
    }else if(listing.cnicNumber.length != 13) {
      errors.cnicNumber = "Please provide valid cnic number without dashes";
      valid = false;
    }

    this.setState({errors});
    if(valid) {
      this.setState({disableSubmitButton: false});
    }else{
      this.setState({disableSubmitButton: true});
    }
    return valid;
  };

  submitListing = () => {
    this.setState({disableSubmitButton: true});
    if(!this.validateListingForm()) {
      this.setState({validateOnInput: true});
      return;
    }
    console.log('listing is submitting', this.state.listing);
    this.props.actions.createListing(this.state.listing);
  }

  render() {
    return (
      <CreateListingForm state={this.state}
        handleChange={this.handleChange} submitListing={this.submitListing}
        handleCostRepeater={this.handleCostRepeater} handleCheckBox={this.handleCheckBox}
        handleCategory={this.handleCategory} onRequirementChange={this.onRequirementChange}
      />
    );
  }
}

CreateListingPageContainer.propTypes = {
  // myProp: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.session.user,
    authenticated: state.session.authenticated
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(listingActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateListingPageContainer);
