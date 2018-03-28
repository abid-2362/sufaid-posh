import React from 'react';
import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import PeopleListing from '../Common/PeopleListing';
import UtilityFunctions from '../../constants/UtilityFunctions';
import Volunteers from '../Common/Volunteers';

const Homepage = ({onChange, selectOptions, listings}) => {
  let {value} = selectOptions;
  const categories = UtilityFunctions.getCategories();

  let peopleListings = listings.map((listing, index) => {
    return (
      <div key={index} className="col-sm-12 col-md-6 col-lg-4">
        {/* <PeopleListing img={listing.img} description={listing.description} /> */}
        <PeopleListing listing={listing} />
      </div>
    );
  });

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
                  onChange={onChange}
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
                  // onChang={this.onChange}
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

        <Volunteers />
      </main>
    </div>
  );
};

Homepage.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectOptions: PropTypes.object.isRequired,
  listings: PropTypes.array.isRequired
}

export default Homepage;
