import React from 'react';
import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import PeopleListing from '../Common/PeopleListing';
import UtilityFunctions from '../../constants/UtilityFunctions';
import Volunteers from '../Common/Volunteers';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const Homepage = ({
  handleSearchChange, selectOptions, listings, user, wannaHelp,
  handleCategoryChange, handleCityFilter, handleCategoryFilter,
  handleSearchFilter,
  deleteMessage, handleCloseDeleteDialog, state, deleteListing
}) => {
  let {value} = selectOptions;
  const categories = UtilityFunctions.getCategories();
  let peopleListings;
  if(listings.length < 1) {
    peopleListings = <h5>No Listings Found.</h5>
  }else {
    peopleListings = listings.map((listing, index) => {
      return (
        <div key={index} className="col-sm-12 col-md-6 col-lg-4">
          <PeopleListing
            listing={listing}
            donor={user.userType=="donor"}
            admin={user.userType=="admin"}
            wannaHelp={wannaHelp}
            handleCityFilter={handleCityFilter}
            handleCategoryFilter={handleCategoryFilter}
            handleCloseDeleteDialog={handleCloseDeleteDialog}
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
  return(
    <div>
      <main>
        <section id="people-details">
          <div className="container">
            <h2>Needy People</h2>
            <div className="row">
              <div className="form-group col-12 col-sm-6 col-md-4">
                <SelectField
                  value={value}
                  onChange={handleCategoryChange}
                  hintText="Category"
                >
                  {categories}
                </SelectField>
              </div>
              <div className="col-12 col-sm-6 col-md-4 offset-md-4">
                <TextField
                  hintText="Search Box"
                  fullWidth={true}
                  name="search"
                  onChange={handleSearchChange}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      // Do code here
                      ev.preventDefault();
                      handleSearchFilter();
                    }
                  }}
                  // errorText="Error Occured"
                  // defaultValue={'Testing'}
                  // value={'Learning'}
                  // className="class-name"
                />
              </div>
            </div>

            <div className="row">
              {peopleListings}
            </div>
          </div>
        </section>

        {user.id ? "" : <Volunteers />}
      </main>
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
Homepage.defaultProps = {
  deleteMessage: 'Deleeing a listing is irreversible process, Are you sure you want to delete the following listing?',
}

Homepage.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  selectOptions: PropTypes.object.isRequired,
  listings: PropTypes.array.isRequired,
  user : PropTypes.object,
  wannaHelp: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func,
  handleCityFilter: PropTypes.func,
  handleCategoryFilter: PropTypes.func,
  handleSearchFilter: PropTypes.func,
  state: PropTypes.object,
  handleCloseDeleteDialog: PropTypes.func.isRequired,
  deleteListing: PropTypes.func.isRequired,
  deleteMessage: PropTypes.string.isRequired
}

export default Homepage;
