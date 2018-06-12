import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {API_URL, allowedTitleChars} from '../../constants/constants';
const PeopleListing = ({ listing, donor, admin, wannaHelp, handleCityFilter, handleCategoryFilter, handleCloseDeleteDialog}) => {
  const img = listing.img[0];
  // const description = listing.description.substring(0, 105) + '...';
  const description = (listing.title.length > allowedTitleChars) ? listing.title.substring(0, allowedTitleChars) + '...' : listing.title;
  return (
    <div className="single-profile-outer-container">
      <div className="img-container">
        <img src={`${API_URL}image/${((!listing.public && (donor || admin)) || listing.public) ? img : '430x275.png'}`} alt={listing.title} />
      </div>
      <p className="additional-info">
        <span
          onClick={() => handleCategoryFilter(listing.category)}
          className="category"
        >
          {listing.category}
        </span>
        <span
          className="city"
          onClick={() => handleCityFilter(listing.city)}
        >
          {listing.city}
        </span>
        <span className="requirement">Rs. {listing.estimatedCost}</span>
      </p>
      <p className="description-container">
        {description}
      </p>
      <div className="button-container text-right">
        {admin && <a className="btn btn-link text-danger" href="javascipt:void(0);" onClick={() => handleCloseDeleteDialog(listing._id, listing.title)}><i className="fa fa-trash"></i> Delete Listing</a>}
        <Link to={`/single-page/${listing._id}`} className="btn btn-link">View details</Link>&nbsp;
        {donor && <a className="btn btn-link text-success" href="javascipt:void(0);" onClick={() => wannaHelp(listing._id)}>I want to help</a>}
      </div>
    </div>
  );
};

PeopleListing.propTypes = {
  listing: PropTypes.object.isRequired,
  donor: PropTypes.bool,
  admin: PropTypes.bool,
  wannaHelp: PropTypes.func.isRequired,
  handleCityFilter: PropTypes.func.isRequired,
  handleCategoryFilter: PropTypes.func.isRequired,
  handleCloseDeleteDialog: PropTypes.func
}

export default PeopleListing;
