import React, {Component} from 'react';
// import PropTypes from "prop-types";
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import SinglePage from './SinglePage';
import $ from 'jquery';

class SinglePageContainer extends Component {
  state = {
    selectValue: '',
    lat: 31.418746,
    lng: 73.079123,
  }

  handleChange = (event, index, value) => this.setState({selectValue: value});

  componentDidMount() {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
      $('.btn-help').tooltip({
        title: 'I want to help, let me see the complete information.',
        placement: 'bottom'
      });
    });
    // this.initMap();
  }
  render() {
    let selectOptions = {
      value: this.state.selectValue,
      options: ['Food', 'Medical', 'Clothes', 'Qarz-e-Hasan']
    };
    const listings = [
      {
        img: 'http://via.placeholder.com/430x275',
        description: 'Some Description of the listing'
      },
      {
        img: 'http://via.placeholder.com/430x275',
        description: 'Some Description of the listing'
      },
      {
        img: 'http://via.placeholder.com/430x275',
        description: 'Some Description of the listing'
      },
      {
        img: 'http://via.placeholder.com/430x275',
        description: 'Some Description of the listing'
      },
      {
        img: 'http://via.placeholder.com/430x275',
        description: 'Some Description of the listing'
      },
      {
        img: 'http://via.placeholder.com/430x275',
        description: 'Some Description of the listing'
      }
    ]


    return (
      <SinglePage
        onChange={this.handleChange} selectOptions={selectOptions} listings={listings}
        lat={this.state.lat} lng={this.state.lng}
      />
    );
  }
}

SinglePageContainer.propTypes = {
  // myProp: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {state: state}
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(actions, dipatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePageContainer);
