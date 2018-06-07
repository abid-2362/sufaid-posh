import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingActions from '../../actions/ListingActions';
import CreateListingForm from './CreateListingForm';


class CreateListingPageContainer extends Component {
  constructor(props) {
    super(props);
    if(props.user.userType != "seeker") {
      return props.history.push('/');
    }
  }

  render() {
    return (
      <CreateListingForm serverAction={this.props.actions.createListing}
      />
    );
  }
}

CreateListingPageContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.object
}

function mapStateToProps(state) {
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
