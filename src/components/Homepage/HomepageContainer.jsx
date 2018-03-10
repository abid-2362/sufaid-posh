import React, {Component} from 'react';
// import PropTypes from "prop-types";
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import Homepage from './Homepage';
import $ from 'jquery';
class HomepageContainer extends Component {
  state = {
    selectValue: ''
  }

  handleChange = (event, index, value) => this.setState({selectValue: value});
  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();
    $('.btn-help').tooltip({
      title: 'I want to help, let me see the complete information.',
      placement: 'bottom'
    });
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
      <Homepage onChange={this.handleChange} selectOptions={selectOptions} listings={listings} />
    );
  }
}

HomepageContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomepageContainer);
