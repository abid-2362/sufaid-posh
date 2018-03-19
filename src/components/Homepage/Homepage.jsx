import React from 'react';
import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import PeopleListing from '../Common/PeopleListing';
import UtilityFunctions from '../../constants/UtilityFunctions';
const Homepage = ({onChange, selectOptions, listings}) => {
  let {value} = selectOptions;
  const categories = UtilityFunctions.getCategories();

  let peopleListings = listings.map((listing, index) => {
    return (
      <div key={index} className="col-sm-12 col-md-6 col-lg-4">
        <PeopleListing img={listing.img} description={listing.description} />
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

        <section id="volunteers">
          <div className="container">
            <h2>Volunteers</h2>
            <p className="volunteer-description text-justify">
              No one is boss here. Every one in this website is a volunteer. There is no
              special requirement to be a volunteer. The main purpose of this platform is to
              help others. If you find someone who is in need and you want to share his voice
              to others so that someone can help him, simply get some snaps and a breif
              description and post it on the website. Copy the link and share the link to your
              social media circle. Hopefully we will find someone, who will be interested to
              help that needy person. If we get only one member fulfilled his need from this
              platform, it would be enough reward for our time on this platform.
            </p>
            <div>
              <a href="javascript:void(0)" className="btn btn-success">Post a new story</a>
            </div>
          </div>
        </section>
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
