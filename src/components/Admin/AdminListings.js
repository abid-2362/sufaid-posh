import React from 'react';
import PropTypes from 'prop-types';
import MyListingTemplate from '../Common/MyListingTemplate';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const AdminListingsPage = ({ listings, state, deleteListing, deleteMessage, handleCloseDeleteDialog, user }) => {
  // const categories = UtilityFunctions.getCategories();

  let myListings;
  if(listings.length < 1) {
    myListings = <div>No listings available yet, please create new listings to see them here.</div>;
  } else {
    myListings = listings.map((listing, index) => {
      return (
        <div key={index} className="col-12 col-lg-6">
          <MyListingTemplate
            listing={listing}
            handleCloseDeleteDialog={handleCloseDeleteDialog}
            donor={user.userType=="donor"}
            admin={true}
            // user={this.props.user}
          />
        </div>
      );
    });
  }


  const actions = [
    <RaisedButton
      key={1}
      label="Delete"
      primary={true}
      onClick={() => {deleteListing(state.listingTobeDeleted.id)}}
      style={{marginRight: 10}}
    />,
    <FlatButton
      key={2}
      label="Cancel"
      primary={false}
      onClick={handleCloseDeleteDialog}
    />,
  ];

  return (
      <div>
        <h5 className="underline mt-3">All Listings</h5>
        <div className="row">
          {myListings}
        </div>
        <Dialog
          actions={actions}
          modal={false}
          open={state.deleteDialogOpen}
          onRequestClose={handleCloseDeleteDialog}
        >
          {deleteMessage}<br/>
          <b>{state.listingTobeDeleted.title}</b>
        </Dialog>
      </div>
  );
};

AdminListingsPage.defaultProps = {
  deleteMessage: 'Deleeing a listing is irreversible process, Are you sure you want to delete the following listing?',
}

AdminListingsPage.propTypes = {
  // onChange: PropTypes.func.isRequired,
  // selectOptions: PropTypes.object.isRequired,
  listings: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired,
  handleCloseDeleteDialog: PropTypes.func.isRequired,
  deleteListing: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteMessage: PropTypes.string.isRequired
}

export default AdminListingsPage;
