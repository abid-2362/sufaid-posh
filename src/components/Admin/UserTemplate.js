import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import userIcon from '../../assets/img/user.png';
import {API_URL} from '../../constants/constants';
/*
address,
city,
cnicNumber,
email,
name,
password,
phone,
public,
userRole,
username,
__v,
_id,
*/
const UserTemplate = ({ user, handleCloseDeleteUserDialog, handleBlockUser, handleUnBlockUser }) => {
  return (
    <Card style={{marginBottom: 20}}>
      <CardHeader
        title={`${user.name} (${user.username})`}
        subtitle={user.userRole}
        avatar={userIcon}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardTitle title={user.address} subtitle={user.email} expandable={true}/>
      {/* <CardText style={{whiteSpace: 'pre-wrap'}} expandable={true}>
        {user.address}
      </CardText> */}
      <CardActions>
        <a href="javascript:void(0)" onClick={() => {handleCloseDeleteUserDialog(user._id, user.username)}} className="btn btn-default btn-sm text-danger"><i className="fa fa-trash"></i> Delete User</a>
        {!user.blocked && <a href="javascript:void(0)" onClick={() => {handleBlockUser(user._id)}} className="btn btn-default btn-sm text-danger"><i className="fa fa-ban"></i> Block User</a>}
        {user.blocked && <a href="javascript:void(0)" onClick={() => {handleUnBlockUser(user._id)}} className="btn btn-default btn-sm text-danger"><i className="fa fa-user-circle"></i> Unblock User</a>}
      </CardActions>
    </Card>
  );
}

UserTemplate.propTypes = {
  user: PropTypes.object.isRequired,
  handleCloseDeleteUserDialog: PropTypes.func.isRequired,
  // admin: PropTypes.bool
  handleBlockUser: PropTypes.func,
  handleUnBlockUser: PropTypes.func
}

export default UserTemplate;
