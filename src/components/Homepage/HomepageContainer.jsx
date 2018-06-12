import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Homepage from './Homepage';
import * as listingActions from '../../actions/ListingActions';
import $ from 'jquery';
// import './scss/homepage.scss';
// import dummyImg from '../../assets/img/uploads/430x275.png';
class HomepageContainer extends Component {
  constructor(props) {
    super(props);
    props.actions.loadAllListings();
  }
  state = {
    selectValue: '',
    listings: this.props.listings,
    searchFilter: '',
    deleteDialogOpen: false,
    listingTobeDeleted: { id: '', title: ''}
  }

  // handleChange = (event, index, value) => this.setState({ selectValue: value });
  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();
    $('.btn-help').tooltip({
      title: 'I want to help, let me see the complete information.',
      placement: 'bottom'
    });
  }

  componentWillReceiveProps(nextProps) {
    /*
    to apply filters, please don't uncomment the following lines.
    it will not allow to update the state if the filters does not match
    any listings, so we will not be able to re-render the component without listings.
    //  if (nextProps.listings.length > 0) {
    //   this.setState({ listings: nextProps.listings });
    // }
    */
    this.setState({ listings: nextProps.listings });
  }
  // --to provide delete functionality in admin view of the home page
  handleCloseDeleteDialog = (id, title) => {
    let listing = this.state.listingTobeDeleted;
    listing['id'] = id;
    listing['title'] = title;
    this.setState({deleteDialogOpen: !this.state.deleteDialogOpen, listingTobeDeleted: listing});
  }
  deleteListing = (id) => {
    this.handleCloseDeleteDialog(null, null);
    this.props.actions.deleteListing(id);
  }
  // --/to provide delete functionality in admin view of the home page

  wannaHelp = (listingId) => {
    this.props.actions.wannaHelp(listingId, this.props.user.id);
  }
  // category change filter
  handleCategoryChange = (event, key, payload) => {
    this.setState({selectValue: payload});
    this.props.actions.filterListings('category', payload);
  }
  // handle city filter
  handleCityFilter = (city) => {
    this.props.actions.filterListings('city', city);
  }
  handleCategoryFilter = (category) => {
    this.props.actions.filterListings('category', category);
  }
  // search filter
  // function(event: object, newValue: string) => void
  // event: Change event targeting the text field.
  // newValue: The new value of the text field.
  handleSearchChange = (event) => {
    this.setState({searchFilter: event.target.value});
  }
  handleSearchFilter = () => {
    this.props.actions.searchListings(this.state.searchFilter);
  }
  render() {
    let selectOptions = {
      value: this.state.selectValue,
      options: ['Food', 'Medical', 'Clothes', 'Qarz-e-Hasan', 'Education']
    };

    return (
      <Homepage
        handleSearchChange={this.handleSearchChange}
        selectOptions={selectOptions}
        listings={this.state.listings}
        user={this.props.user}
        wannaHelp={this.wannaHelp}
        handleCategoryChange={this.handleCategoryChange}
        handleSearchFilter={this.handleSearchFilter}
        handleCityFilter={this.handleCityFilter}
        handleCategoryFilter={this.handleCategoryFilter}
        state={this.state}
        deleteListing={this.deleteListing}
        handleCloseDeleteDialog={this.handleCloseDeleteDialog}
      />
    );
  }
}

HomepageContainer.propTypes = {
  // myProp: PropTypes.string.isRequired
  listings: PropTypes.array.isRequired,
  user: PropTypes.object,
  actions: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    listings: state.listings,
    user: state.session.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(listingActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomepageContainer);
