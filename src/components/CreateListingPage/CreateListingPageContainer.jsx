import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as createListingActions from '../../actions/CreateListingActions';
import CreateListingForm from './CreateListingForm';

class CreateListingPageContainer extends Component {

  resetListing = () => {
    return {
      category: "",
      title: "",
      description: "",
      requirements: "",
      estimatedCost: "",
      costRepeater: "",
      address: "",
      city: "",
      phone: "",
      public: false,
      requirementsArray: []
    }
  };

  state = {
    listing: this.resetListing(),
    errors: this.resetListing(),
    disableSubmitListing: false
  };

  handleChange = (e, val) => {
    let listing = this.state.listing;
    listing[e.target.name] = val;
    if(e.target.name.toLowerCase() == "requirements") {
      this.handleRequirements(this.state.listing.requirements);
    }
    this.setState({ listing });
  }

  handleCostRepeater = (event, key, payload) => {
    let listing = this.state.listing;
    listing.costRepeater = payload;
    this.setState({listing});
  }
  handleCategory = (event, key, payload) => {
    let listing = this.state.listing;
    listing.category = payload;
    this.setState({listing});
  }
  handleRequirements = (requirements) => {
    let listing = this.state.listing;
    const requirementsArray = requirements.split(",");
    listing.requirementsArray = requirementsArray;
    this.setState({listing});
  }
  handleCheckBox = (e, isInputChecked) => {
    let listing = this.state.listing;
    if(isInputChecked) {
      listing.public = true;
    } else {
      listing.public = false;
    }
    this.setState({listing});
  }

  submitListing = () => {
    console.log('listing is submitting', this.state.listing);
  }

  render() {
    return (
      <CreateListingForm state={this.state}
        handleChange={this.handleChange} submitListing={this.submitListing}
        handleCostRepeater={this.handleCostRepeater} handleCheckBox={this.handleCheckBox}
        handleCategory={this.handleCategory}
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
    actions: bindActionCreators(createListingActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateListingPageContainer);
