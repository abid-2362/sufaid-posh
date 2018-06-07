import React from 'react';
import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import PeopleListing from '../Common/PeopleListing';
import UtilityFunctions from '../../constants/UtilityFunctions';
import Volunteers from '../Common/Volunteers';

const Homepage = ({handleSearchChange, selectOptions, listings, user, wannaHelp, handleCategoryChange, handleCityFilter, handleCategoryFilter, handleSearchFilter}) => {
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
            wannaHelp={wannaHelp}
            handleCityFilter={handleCityFilter}
            handleCategoryFilter={handleCategoryFilter}
          />
        </div>
      );
    });
  }

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
    </div>
  );
};

Homepage.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  selectOptions: PropTypes.object.isRequired,
  listings: PropTypes.array.isRequired,
  user : PropTypes.object,
  wannaHelp: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func,
  handleCityFilter: PropTypes.func,
  handleCategoryFilter: PropTypes.func,
  handleSearchFilter: PropTypes.func
}

export default Homepage;
