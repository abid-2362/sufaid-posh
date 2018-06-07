import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingActions from '../../actions/ListingActions';
import CreateListingForm from '../CreateListingPage/CreateListingForm';
import uf from '../../constants/UtilityFunctions';
import objectAssign from "object-assign";

// import objectAssign from 'object-assign';

class EditListingPage extends Component {
  constructor(props) {
    super(props);
    if(props.user.userType != "seeker") {
      return props.history.push('/');
    }
    this.state = {
      // myListings: props.myListings
    };
  }

  render() {
    let listing = uf.getListingById(this.props.myListings, this.props.match.params.id);
    // to avoid state mutation, we need a copy of the listing but not the exact reference.
    // so listing without JSON.parse(JSON.stringify(listing)); will give us the reference but not
    // the new copy of the listing, that is why I made a copy by first converting it to string and then
    // converting back to the object.
    // listing = JSON.parse(JSON.stringify(listing));
    // alternatively, the same effect can be obtained by ObjectAssign
    listing = objectAssign({} , listing);
    if(!listing) {
      listing = {};
    }
    return (
      // <div><i className="fa fa-spinner rotate"></i> Loading...</div>
      <CreateListingForm serverAction={this.props.actions.updateListing}
        listing={listing} pageTitle="Update Listing" buttonLabel="Update Listing"
      />
    );
  }
}

EditListingPage.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.object,
  listings: PropTypes.array,
  myListings: PropTypes.array
}

function mapStateToProps(state) {
  return {
    user: state.session.user,
    authenticated: state.session.authenticated,
    listings: state.listings,
    // myListings: objectAssign([], [...state.myListings])
    myListings: state.myListings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(listingActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditListingPage);
