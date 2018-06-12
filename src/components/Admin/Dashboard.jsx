import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
const paperStyle = {
  height: 200,
  width: 200,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
const Dashboard = ({info}) => {
  const {totalDonors, totalListings, totalSeekers, totalUsers} = info;
  return (
    <div>
      <h5 className="underline mt-3">Dashboard</h5>
      <div>
        <Paper className="paper-element" style={paperStyle} zDepth={1} circle={true} >
          <div className="paper-content">
            <div className="number">{totalListings}</div>
            <div className="text">{totalListings > 1 ? "Listings" : "Listing"}</div>
          </div>
        </Paper>
        <Paper className="paper-element" style={paperStyle} zDepth={1} circle={true} >
          <div className="paper-content">
            <div className="number">{totalUsers}</div>
            <div className="text">{totalUsers > 1 ? "Users" : "User"}</div>
          </div>
        </Paper>
        <Paper className="paper-element" style={paperStyle} zDepth={1} circle={true} >
          <div className="paper-content">
            <div className="number">{totalDonors}</div>
            <div className="text">{totalDonors > 1 ? "Donors" : "Donor"}</div>
          </div>
        </Paper>
        <Paper className="paper-element" style={paperStyle} zDepth={1} circle={true} >
          <div className="paper-content">
            <div className="number">{totalSeekers}</div>
            <div className="text">{totalSeekers > 1 ? "Seekers" : "Seeker"}</div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  info: PropTypes.object.isRequired,
}

export default Dashboard;
