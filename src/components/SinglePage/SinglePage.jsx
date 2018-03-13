import React, {Component} from 'react';
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
    this.setState({locationDialogOpen: true});
    setTimeout(() => {
      $('.google-location').niceScroll();
    }, 50);
  };

  handleLocationDialogClose = () => {
    $('.google-location').hide(); // avoids flashing the scroller at closing of dialog
    this.setState({locationDialogOpen: false});
  };

  render() {
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
        <main>
          <section id="single-details">
            <div className="container">
              <div id="image-slider" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item peopleCarouselImg active">
                    <img
                      className="d-block w-100"
                      src="http://via.placeholder.com/850x450"
                      alt="First slide"/>
                  </div>
                  <div className="carousel-item peopleCarouselImg">
                    <img
                      className="d-block w-100"
                      src="http://via.placeholder.com/1050x550"
                      alt="Second slide"/>
                  </div>
                  <div className="carousel-item peopleCarouselImg">
                    <img
                      className="d-block w-100"
                      src="http://via.placeholder.com/1500x650"
                      alt="Third slide"/>
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
                <h2 className="mt-4">Need the monthly food for this old lady.</h2>
                <div className="post-date">Monday, 19th February, 2018</div>
                <p>
                  Mein ne 1 80 saal ki mai ko kaghaz chunte dekha he. Inka monthly kharcha kitna
                  hoga, shayad 3 se 5 hazar tk. Agar koi help karna chahta he to ye unka address
                  he, unki madad kar sakta he.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non modi debitis
                  minus, recusandae inventore aliquam veritatis, ad cupiditate praesentium veniam,
                  deleniti incidunt labore voluptates. Quaerat, mollitia? Doloribus
                  exercitationem, inventore dolore nihil odio praesentium eligendi quos sapiente
                  ipsa quidem qui enim!
                </p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat modi,
                  voluptatum recusandae libero optio, quibusdam in architecto voluptates laborum
                  obcaecati magnam ipsam eaque minima assumenda culpa autem animi tempore.
                  Obcaecati, voluptatem quae? Ipsam dolores porro iste placeat quos maiores
                  blanditiis saepe laborum distinctio nostrum libero, ullam quasi et optio. Quidem
                  cupiditate officiis ipsa atque doloribus in nobis esse iste, incidunt, minima
                  autem sunt exercitationem accusamus excepturi ab ea blanditiis totam.
                </p>
                <div className="info-summary row">
                  <div className="col-12 col-sm-6">
                    <h4>Requirement</h4>
                    <ul>
                      <li>Monthly Food.</li>
                      <li>Propper Clothing.</li>
                    </ul>
                  </div>
                  <div className="col-12 col-sm-6">
                    <h4>Estimated Cost</h4>
                    <p className="cost">Rs. 5000 per month</p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <h4>Address</h4>
                    <address>
                      123, free web town. Faisalabad, Pakistan.
                    </address>
                  </div>
                  <div className="col-12 col-sm-6">
                    <h4>Contact Information</h4>
                    <p>
                      Phone: +92-321-123 4567
                    </p>
                  </div>
                </div>
              </div>
              <h4>Location</h4>
              <div className="open-map">
                <a href="javascript:void()" onClick={()=> this.handleLocationDialogOpen() }>
                  See location on map.
                </a>
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

            <Dialog
              title="Location"
              actions={locationActions}
              modal={false}
              open={this.state.locationDialogOpen}
              onRequestClose={this.handleLocationDialogClose}
              autoScrollBodycontent={true}
              bodyClassName="google-location"
            >
              <GoogleMap lat={this.props.lat} lng={this.props.lng} />
            </Dialog>
          </section>
        </main>
      </div>
    );
  }
}

SinglePage.propTypes = {
  // onChange: PropTypes.func.isRequired,
  // selectOptions: PropTypes.object.isRequired,
  // listings: PropTypes.array.isRequired
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

export default SinglePage;
