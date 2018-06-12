import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Dashboard from './Dashboard';
import ListingsPage from './AdminListings';
// import Homepage from './Homepage';
import * as adminActions from '../../actions/AdminActions';
import * as listingActions from '../../actions/ListingActions';
import AdminLeftMenu from './AdminLeftMenu';
import UsersPage from './UsersPage';
import SettingsPage from './SettingsPage';
// import $ from 'jquery';

let combinedActions = {
  ...adminActions,
  ...listingActions
}

class AdminPageContainer extends Component {
  constructor(props) {
    super(props);
    if (props.user.userType != "admin") {
      return props.history.push('/');
    } else {
      props.actions.loadDashboardInfo();
      props.actions.loadAllListings();
      props.actions.loadAllUsers();
    }
    this.state = {
      listings: this.props.listings,
      page: props.match.params.page,
      deleteDialogOpen: false,
      listingTobeDeleted: { id: '', title: ''},
      userTobeDeleted: { id: '', username: ''}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ listings: nextProps.listings });
  }
  // deleting for listing
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

  // deleting for User
  handleCloseDeleteUserDialog = (id, username) => {
    let user = this.state.userTobeDeleted;
    user['id'] = id;
    user['username'] = username;
    this.setState({deleteDialogOpen: !this.state.deleteDialogOpen, userTobeDeleted: user});
  }
  deleteUser = (userId) => {
    this.handleCloseDeleteUserDialog(null, null);
    this.props.actions.deleteUser(userId);
  }
  handleBlockUser = (userId) => {
    this.props.actions.blockUser(userId);
  }
  handleUnBlockUser = (userId) => {
    this.props.actions.unblockUser(userId);
  }

  render() {
    return (
      <section id="admin-dashboard">
        <div className="container">
          <h2>Admin Dashboard</h2>
          <div className="row">
            <aside className="col-12 col-md-3">
              <AdminLeftMenu />
            </aside>
            <div className="col-12 col-md-9">
              { this.props.match.params.page == "dashboard" &&  <Dashboard info={this.props.admin.dashboard} /> }
              {
                this.props.match.params.page == "listings"
                &&
                <ListingsPage
                  listings={this.props.listings}
                  state={this.state}
                  deleteListing={this.deleteListing}
                  handleCloseDeleteDialog={this.handleCloseDeleteDialog}
                  user={this.props.user}
                />
              }
              {
                this.props.match.params.page == "users"
                &&
                <UsersPage
                  users={this.props.admin.users}
                  state={this.state}
                  deleteUser={this.deleteUser}
                  handleCloseDeleteUserDialog={this.handleCloseDeleteUserDialog}
                  handleBlockUser={this.handleBlockUser}
                  handleUnBlockUser={this.handleUnBlockUser}
                />
              }
              {
                this.props.match.params.page == "settings"
                &&
                <SettingsPage />
              }
            </div>
          </div>
        </div>
      </section>
    );
  }
}

AdminPageContainer.propTypes = {
  listings: PropTypes.array.isRequired,
  user: PropTypes.object,
  actions: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  admin: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    listings: state.listings,
    user: state.session.user,
    admin: state.admin  //containing all the information related to the admin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(combinedActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPageContainer);
