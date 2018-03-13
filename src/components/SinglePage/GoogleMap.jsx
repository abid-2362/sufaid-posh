import React, { Component } from 'react';
import PropTypes from "prop-types";

class GoogleMap extends Component {
  state = {
    lat: this.props.lat,
    lng: this.props.lng
  }

  initMap() {
    let location = {lat: this.state.lat, lng: this.state.lng}; // 31.418746, 73.079123 -Ghanta Ghar Faisalabad.
    let map = new google.maps.Map(document.getElementById('map'), {// eslint-disable-line no-undef
      zoom: 14,
      center: location
    });
    new google.maps.Marker({// eslint-disable-line no-undef
      position: location,
      map: map
    });
  }

  componentDidMount() {
    this.initMap();
  }

  render() {
    return(
      <div id="map"></div>
    );
  }
}

GoogleMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}


export default GoogleMap;
