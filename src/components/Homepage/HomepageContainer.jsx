import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
import Homepage from './Homepage';
import $ from 'jquery';
// import './scss/homepage.scss';
import dummyImg from '../../assets/img/uploads/430x275.png';
class HomepageContainer extends Component {
  state = {
    selectValue: '',
    listings: this.props.listings,
  }

  handleChange = (event, index, value) => this.setState({ selectValue: value });
  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();
    $('.btn-help').tooltip({
      title: 'I want to help, let me see the complete information.',
      placement: 'bottom'
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listings.length > 0) {
      this.setState({ listings: nextProps.listings });
    }
  }

  componentWillUnmount() {
    // cleanup
  }
  render() {
    let selectOptions = {
      value: this.state.selectValue,
      options: ['Food', 'Medical', 'Clothes', 'Qarz-e-Hasan', 'Education']
    };
    const listings = [
      {
        img: dummyImg,
        description: 'Some Description of the listing'
      },
      {
        img: dummyImg,
        description: 'Some Description of the listing'
      },
      {
        img: dummyImg,
        description: 'Some Description of the listing'
      },
      {
        img: dummyImg,
        description: 'Some Description of the listing'
      },
      {
        img: dummyImg,
        description: 'Some Description of the listing'
      },
      {
        img: dummyImg,
        description: 'Some Description of the listing'
      }
    ]

    return (
      <Homepage onChange={this.handleChange} selectOptions={selectOptions} listings={this.state.listings} />
    );
  }
}

HomepageContainer.propTypes = {
  // myProp: PropTypes.string.isRequired
  listings: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    listings: state.listings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(actions, dipatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomepageContainer);
