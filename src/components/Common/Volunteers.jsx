import React from 'react';
import {Link} from 'react-router-dom';

const Volunteers = (props) => {
  return (
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
          {/* <a href="javascript:void(0)" className="btn btn-success">Post a new story</a> */}
          <Link to="/register" className="btn btn-success">Register to post new stories</Link>
        </div>
      </div>
    </section>
  );
};

export default Volunteers;
