// in polls/logic.js
import { createLogic } from 'redux-logic';
import * as types from '../constants/constants';
import * as adminActions from '../actions/AdminActions';
import axios from 'axios';
const url = types.API_URL;
import toastr from 'toastr';

// loading dashboard information from server
const loadDashboardInfoLogic = createLogic({
  type: types.LOAD_DASHBOARD_INFO,
  // cancelType: types.LOAD_ALL_LISTINGS_CANCELL,
  latest: true,

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'admin/getDashboardInfo')
    .then(response => {
      dispatch(adminActions.loadDashboardInfoSuccess(response.data));
    }).catch(error => {
    }).then(() => done());
  }
});

const LoadAllUsersLogic = createLogic({
  type: types.LOAD_ALL_USERS,
  // cancelType: types.LOAD_ALL_LISTINGS_CANCELL,
  latest: true,

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'admin/getAllUsers')
    .then(response => {
      dispatch(adminActions.loadAllUsersSuccess(response.data));
    }).catch(error => {
    }).then(() => done());
  }
});

const DeleteUserLogic = createLogic({
  type: types.DELETE_USER_BY_ADMIN,
  latest: true,

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'admin/deleteUser', {
      userId: action.payload
    })
    .then(response => {
      toastr.success('User has been deleted successfully');
      dispatch(adminActions.loadAllUsers());
    }).catch(error => {
    }).then(() => done());
  }
});

const blockUserLogic = createLogic({
  type: types.BLOCK_USER_BY_ADMIN,
  latest: true,

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'admin/blockUser', {
      userId: action.payload
    })
    .then(response => {
      toastr.success(response.data.message);
      dispatch(adminActions.loadAllUsers());
    }).catch(error => {
    }).then(() => done());
  }
});

const unblockUserLogic = createLogic({
  type: types.UNBLOCK_USER_BY_ADMIN,
  latest: true,

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'admin/unblockUser', {
      userId: action.payload
    })
    .then(response => {
      toastr.success(response.data.message);
      dispatch(adminActions.loadAllUsers());
    }).catch(error => {
    }).then(() => done());
  }
});

const loadSiteSettingsLogic = createLogic({
  type: types.LOAD_SITE_SETTINGS,
  latest: true,

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'admin/loadSettings')
    .then(response => {
      // there will be only one element in returned array. so get first one only.
      dispatch(adminActions.loadSiteSettingsSuccess(response.data[0]));
    }).catch(error => {
    }).then(() => done());
  }
});

const updateSettingsLogic = createLogic({
  type: types.ADMIN_SAVE_SETTINGS,
  latest: true,

  process: function ({ getState, action }, dispatch, done) {
    axios.post(url+'admin/saveSettings', {
      settings: action.payload
    })
    .then(response => {
      toastr.success(response.data.message);
      dispatch(adminActions.loadSettings());
    }).catch(error => {
    }).then(() => done());
  }
});
// pollsLogic
export default [
  loadDashboardInfoLogic,
  LoadAllUsersLogic,
  DeleteUserLogic,
  blockUserLogic,
  unblockUserLogic,
  loadSiteSettingsLogic,
  updateSettingsLogic,
];