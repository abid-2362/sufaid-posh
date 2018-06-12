import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import userIcon from '../../assets/img/user.png';
import {API_URL} from '../../constants/constants';

const MyListingTemplate = ({ listing, handleCloseDeleteDialog, donor, admin }) => {
  return (
    <Card style={{marginBottom: 20}}>
      <CardHeader
        title={listing.title}
        subtitle={listing.city}
        avatar={userIcon}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardMedia
        overlay={<CardTitle title={listing.title} subtitle={listing.city ? listing.category + ' - ' + listing.city : listing.category } />}
        expandable={true}
      >
        <img src={`${API_URL}image/${listing.img[0]}`} alt={listing.title} />
      </CardMedia>
      <CardTitle title={listing.title} subtitle={listing.city} expandable={true}/>
      <CardText style={{whiteSpace: 'pre-wrap'}} expandable={true}>
        {listing.description}
      </CardText>
      <CardActions>
        {!donor && !admin && <Link to={`/edit-listing/${listing._id}`} className="btn btn-default btn-sm"><i className="fa fa-edit"></i> Edit Listing</Link>}
        <Link to={`/single-page/${listing._id}`} className="btn btn-default btn-sm"><i className="fa fa-eye"></i> View Details</Link>
        <a href="javascript:void(0)" onClick={() => {handleCloseDeleteDialog(listing._id, listing.title)}} className="btn btn-default btn-sm text-danger"><i className="fa fa-trash"></i> { donor ? "Delete from my favorites" : "Delete Listing" }</a>
      </CardActions>
    </Card>
  );
}

MyListingTemplate.propTypes = {
  listing: PropTypes.object.isRequired,
  handleCloseDeleteDialog: PropTypes.func.isRequired,
  donor: PropTypes.bool,
  admin: PropTypes.bool
}

export default MyListingTemplate;
