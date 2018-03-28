import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const PeopleListing = ({ listing }) => {
  console.log('peopleListing', listing);
  const img = listing.img[0];
  const description = listing.description.substring(0, 105) + '...';
  return (
    <div className="single-profile-outer-container">
      <div className="img-container">
        <img src={img} />
      </div>
      <p className="additional-info">
        <span className="category">Food</span>
        <span className="city">Faisalabad</span>
        <span className="requirement">Rs. 1000</span>
      </p>
      <p className="description-container">
        {description}
      </p>
      <div className="button-container">
        <Link to={`/single-page/${listing._id}`} className="btn btn-info">View details</Link>&nbsp;
        <button className="btn btn-success btn-help">I want to help</button>
      </div>
    </div>
  );
};

PeopleListing.propTypes = {
  // img: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired
  listing: PropTypes.object.isRequired
}

export default PeopleListing;
