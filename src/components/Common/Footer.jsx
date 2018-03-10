import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {NavLink, Link} from 'react-router-dom';
import RegisterPage from "../RegisterPage/RegisterPageContainer";
import LoginPage from '../LoginPage/LoginPageContainer';
import $ from 'jquery';
class Footer extends Component {
  state = {
    registerDialogOpen: false,
    loginDialogOpen: false
  };

  handleRegisterOpen = () => {
    this.setState({registerDialogOpen: true});
    setTimeout(() => {
      $('.registration-form').niceScroll();
    }, 50);
  };

  handleRegisterClose = () => {
    $('.registration-form').hide(); // avoids flashing the scroller at closing of dialog
    this.setState({registerDialogOpen: false});
  };

  handleLoginOpen = () => {
    this.setState({loginDialogOpen: true});
    setTimeout(() => {
      $('.registration-form').niceScroll();
    }, 50);
  };

  handleLoginClose = () => {
    $('.login-form').hide(); // avoids flashing the scroller at closing of dialog
    this.setState({loginDialogOpen: false});
  };

  componentDidMount() {

  }


  render() {
    const registerActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleRegisterClose}
        key={1}
      />
    ];
    const loginActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleLoginClose}
        key={1}
      />
    ];
    return (
      <section id="footer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <h4>Org Name</h4>
              <p>
                A project by the people for the people.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur architecto ea quidem perspiciatis dolores magni veniam corrupti fugiat. Provident, ut.
              </p>
            </div>
            <div className="col-12 col-md-4">
              <h4>Contact Info</h4>
              <address>
                123 free webtown
                Faisalabad
                Pakistan
              </address>
              <p>Email: learning@something.com</p>
              <p>Phone: +92-123-456 7890</p>
            </div>
            <div className="col-12 col-md-4">
              <h4>More Information</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, officia. Accusantium numquam porro quidem! Dolorem exercitationem voluptates commodi consequatur quaerat cumque magnam repudiandae reiciendis perspiciatis ipsum ut voluptatum, quibusdam repellendus?
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Footer;