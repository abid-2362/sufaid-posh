import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class Abstract extends Component {
  state = {

  }

  render() {
    return(
      <section>
        <div className="container">
          <p>
            Hello Sir,<br/>
            I am Abid Ali. I am learning web technologies and have been awarded a final assignment, and I have an idea related to the general public. on which I need your valueable thoughts so that
            I can have some feedback about my idea and may improve this platform as much as possible.
          </p>
          <h2>Abstract for <q>Sufaiad-Posh</q>(React + Redux)</h2>
          <p>
            An independent platform named as <q>Sufaid Posh</q> for general public to help the needy people, The idea is, a platform from the public, for the public.
          </p>
          <p>
            Idea came into my mind by seeing a lot of people who are in real need and most of people ignore them, (The real inspiration for me is that when I was student, I have seen an old lady(age >= 80) picking up the used bottles, papers, from the garbage baskets and hopefully she was doing that for living.) Those who have some good reputation in public, usually post the snaps/videos on the social media with some details of the people in need with their needs and the relevant phone numbers to contact them. Another example of this is "Naiki" segment in the month of the Ramazan where Iqrar, Wasim and Junaid(Late) etc. present the needy people on the television screen live to the audience and people help them.
          </p>
          <p>
            The idea is to create a platform and keep that open for general public where if someone came to know a real needy person, in his family, relatives, neighbors etc. He can have a little interview of him, some snaps, some details and the relevant phone number with complete details of the need and the required amount. (A video could also be an option) and place it on the website and then share it on his social media account. in this way, the complete information about the person will be on a single place and everyone having the link would be able to see the complete details of that and, if he wants to, he can contact/help in which way possible for him.
          </p>
          <h3>Problems</h3>
          <ul>
            <li>Maintaining the website (We don't have honesty factor built in. and it is too hard to built it in our characters, so we don't have a solid option to get informed that which person has gained the help and at which extent, so we can remove him from the website.)</li>
            <li>
              Only big picture in my mind, currently I don't have the complete details of this project.
              You are requested to share your thoughts about this project.
            </li>
          </ul>
          <p>
            Please see this project as much critically as possible and give your valuable feedback.
          </p>
          <p>
            Please send your thoughts/ideas to my email address <b>abdsoftfsd@gmail.com</b> and please include <b>Sufaid-Posh</b> in the email title so that I can easily filter out the results.
          </p>
        </div>
      </section>
    );
  }
}

Abstract.propTypes = {
  // myProp: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(actions, dipatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Abstract);