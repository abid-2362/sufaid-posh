import React from 'react';
import PropTypes from 'prop-types';

const PeopleListing = ({img, description}) => {
  return (
    <div className="single-profile-outer-container">
      <div className="img-container">
        <img src={img}/>
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
        <button type="button" id="" className="btn btn-info">View details</button>&nbsp;
        <button className="btn btn-success btn-help">I want to help</button>
      </div>
    </div>
  );
};

PeopleListing.propTypes = {
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default PeopleListing;
