import React from 'react';
import PropTypes from 'prop-types';
import UserTemplate from './UserTemplate';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const UsersPage = (
  {
    users, deleteMessage, state, deleteUser, handleCloseDeleteUserDialog,
    handleBlockUser, handleUnBlockUser
  }
) => {
  // const categories = UtilityFunctions.getCategories();

  let usersList;
  if(users.length < 1) {
    usersList = <div>No users found.</div>;
  } else {
    usersList = users.map((user, index) => {
      return (
        <div key={index} className="col-12 col-lg-6">
          <UserTemplate
            user={user}
            handleCloseDeleteUserDialog={handleCloseDeleteUserDialog}
            handleBlockUser={handleBlockUser}
            handleUnBlockUser={handleUnBlockUser}
          />
        </div>
      );
    });
  }


  const actions = [
    <RaisedButton
      key={1}
      label="Delete"
      primary={true}
      onClick={() => {deleteUser(state.userTobeDeleted.id)}}
      style={{marginRight: 10}}
    />,
    <FlatButton
      key={2}
      label="Cancel"
      primary={false}
      onClick={handleCloseDeleteUserDialog}
    />,
  ];

  return (
      <div>
        <h5 className="underline mt-3">All Users</h5>
        <div className="row">
          {usersList}
        </div>
        <Dialog
          actions={actions}
          modal={false}
          open={state.deleteDialogOpen}
          onRequestClose={handleCloseDeleteUserDialog}
        >
          {deleteMessage}<br/>
          <b>{state.userTobeDeleted.username}</b>
        </Dialog>
      </div>
  );
};

UsersPage.defaultProps = {
  deleteMessage: 'Deleting a listing is irreversible process, Are you sure you want to delete the following listing?',
}

UsersPage.defaultProps = {
  deleteMessage: "Are you sure you want to delete this user ?"
}
UsersPage.propTypes = {
  users: PropTypes.array,
  deleteMessage: PropTypes.string,
  state: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  handleCloseDeleteUserDialog: PropTypes.func.isRequired,
  handleBlockUser: PropTypes.func,
  handleUnBlockUser: PropTypes.func,
}
export default UsersPage;
