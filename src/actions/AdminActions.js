import * as types from '../constants/constants';

export function loadDashboardInfo() {
  return {
    type: types.LOAD_DASHBOARD_INFO,
  }
}

export function loadDashboardInfoSuccess(dashboardInfo) {
  return {
    type: types.LOAD_DASHBOARD_INFO_SUCCESS,
    payload: dashboardInfo,
  }
}

export function loadAllUsers() {
  return {
    type: types.LOAD_ALL_USERS
  }
}

export function loadAllUsersSuccess(users) {
  return {
    type: types.LOAD_ALL_USERS_SUCCESS,
    payload: users
  }
}

export function deleteUser(userId) {
  return {
    type: types.DELETE_USER_BY_ADMIN,
    payload: userId
  }
}


export function blockUser(userId) {
  return {
    type: types.BLOCK_USER_BY_ADMIN,
    payload: userId
  }
}
export function unblockUser(userId) {
  return {
    type: types.UNBLOCK_USER_BY_ADMIN,
    payload: userId
  }
}

export function loadSettings() {
  return {
    type: types.LOAD_SITE_SETTINGS
  }
}

export function loadSiteSettingsSuccess(settings) {
  return {
    type: types.LOAD_SITE_SETTINGS_SUCCESS,
    payload: settings,
  }
}

export function saveSettings(settings) {
  return {
    type: types.ADMIN_SAVE_SETTINGS,
    payload: settings
  }
}
