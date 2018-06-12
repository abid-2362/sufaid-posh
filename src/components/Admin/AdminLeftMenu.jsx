import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';

const AdminLeftMenu = () => {
  return(
    <div>
      <List>
        <Link to="/admin/dashboard"><ListItem primaryText="Dashboard" /></Link>
        <Divider />
        <Link to="/admin/listings"><ListItem primaryText="Listings" /></Link>
        <Divider />
        <Link to="/admin/users"><ListItem primaryText="Users" /></Link>
        <Divider />
        <Link to="/admin/settings"><ListItem primaryText="Settings" /></Link>
        <Divider />
      </List>
    </div>
  );
};

export default AdminLeftMenu;
