export function isLoggedIn(bool) {
  return {
    type: 'IS_LOGGED_IN',
    payload: bool
  };
}

export function setUserData(userData) {
  return {
    type: 'USER_DATA',
    payload: userData
  };
}

export function setPendingRequests(list) {
  return {
    type: 'SET_REQUESTS',
    payload: list
  };
}

export function setUsersInCollectve(list) {
  return {
    type: 'SET_USERS_IN_COLLECTIVE',
    payload: list
  };
}
