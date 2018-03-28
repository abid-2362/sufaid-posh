import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import GoogleMap from './GoogleMap';
import $ from 'jquery';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
// import TextField from 'material-ui/TextField';
// import PropTypes from 'prop-types';
// import PeopleListing from '../Common/PeopleListing';
class SinglePage extends Component {

  state = {
    locationDialogOpen: false,
  }

  handleLocationDialogOpen = () => {
    this.setState({ locationDialogOpen: true });
    setTimeout(() => {
      $('.google-location').niceScroll();
    }, 50);
  };

  handleLocationDialogClose = () => {
    $('.google-location').hide(); // avoids flashing the scroller at closing of dialog
    this.setState({ locationDialogOpen: false });
  };

  render() {
    const { listing } = this.props;
    const locationActions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleLocationDialogClose}
        key={1}
      />
    ];
    return (
      <div>
          <section id="single-details">
            <div className="container">
              <div id="image-slider" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item peopleCarouselImg active">
                    <img
                      className="d-block w-100"
                      src="http://via.placeholder.com/850x450"
                      alt="First slide" />
                  </div>
                  <div className="carousel-item peopleCarouselImg">
                    <img
                      className="d-block w-100"
                      src="http://via.placeholder.com/1050x550"
                      alt="Second slide" />
                  </div>
                  <div className="carousel-item peopleCarouselImg">
                    <img
                      className="d-block w-100"
                      src="http://via.placeholder.com/1500x650"
                      alt="Third slide" />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#image-slider"
                  role="button"
                  data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#image-slider"
                  role="button"
                  data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>

              <div className="complete-info">
                <h2 className="mt-4">{listing.title}</h2>
                <div className="post-date">Monday, 19th February, 2018</div>
                <p>
                  {listing.description}
                </p>
                <div className="info-summary row">
                  <div className="col-12 col-sm-6">
                    <h4>Requirement</h4>
                    <ul>
                      {listing.requirements.map((requirement, index) => <li key={index}>{requirement}</li>)}
                    </ul>
                  </div>
                  <div className="col-12 col-sm-6">
                    <h4>Estimated Cost</h4>
                    <p className="cost">Rs. {`${listing.estimatedCost} ${listing.costRepeater}`}</p>
                  </div>
                </div>

                <h2>Personal Information</h2>
                <div className="personal-information row">
                  <div className="col-12 col-sm-6">
                    <h5>Name</h5>
                    <p>
                      {listing.name}
                    </p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <h5>Address</h5>
                    <address>
                      {listing.address}
                    </address>
                  </div>
                  <div className="col-12 col-sm-6">
                    <h5>Contact Information</h5>
                    <p>
                      {listing.phone}
                    </p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <h5>Location</h5>
                    <div className="open-map">
                      <a href="javascript:void()" onClick={() => this.handleLocationDialogOpen()}>
                        See location on map.
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <Dialog
            title="Location"
            actions={locationActions}
            modal={false}
            open={this.state.locationDialogOpen}
            onRequestClose={this.handleLocationDialogClose}
            autoScrollBodycontent={true}
            bodyClassName="google-location"
          >
            <GoogleMap lat={31.418692} lng={73.079042} />
          </Dialog>
      </div>
        );
      }
    }

SinglePage.propTypes = {
          // onChange: PropTypes.func.isRequired,
          // selectOptions: PropTypes.object.isRequired,
          // listings: PropTypes.array.isRequired
          // lat: PropTypes.number,
          // lng: PropTypes.number
          listing: PropTypes.object.isRequired
      }

      export default SinglePage;
