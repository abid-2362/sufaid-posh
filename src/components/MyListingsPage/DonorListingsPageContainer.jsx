import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import * as donorListingActions from '../../actions/donorListingActions';
import {bindActionCreators} from 'redux';
import MyListingPage from './MyListingPage';

class MyListingsPageContainer extends Component {
  constructor(props) {
    super(props);
    if (props.user.userType != "donor") {
      return props.history.push('/');
    } else {
      props.actions.loadDonorListings(props.user);
    }

    this.state = {
      listings: this.props.myListings,
      deleteDialogOpen: false,
      listingTobeDeleted: { id: '', title: ''}
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.listings.length != nextProps.myListings.length) {
      this.setState({listings: nextProps.myListings});
    }
  }

  handleCloseDeleteDialog = (id, title) => {
    let listing = this.state.listingTobeDeleted;
    listing['id'] = id;
    listing['title'] = title;
    this.setState({deleteDialogOpen: !this.state.deleteDialogOpen, listingTobeDeleted: listing});
  }
  deleteListing = (listingId) => {
    this.handleCloseDeleteDialog(null, null);
    this.props.actions.deleteDonorListing(listingId, this.props.user.id);
  }

  render() {
    if(!this.state) {
      return <div></div>
    } else {
      return (
        <MyListingPage
          listings={this.state.listings} state={this.state}
          deleteListing={this.deleteListing} handleCloseDeleteDialog={this.handleCloseDeleteDialog}
          user={this.props.user}
          deleteMessage={"Are you sure you want to delete this listing from your favored listings?"}
        />
      );
    }
  }
}

MyListingsPageContainer.propTypes = {
  myListings: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    // listings: state.listings,
    myListings: state.donorListings,
    user: state.session.user,
    authenticated: state.session.authenticated
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(donorListingActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MyListingsPageContainer);
