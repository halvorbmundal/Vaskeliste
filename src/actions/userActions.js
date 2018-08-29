export function isLoggedIn(bool) {
  return{
    type: 'IS_LOGGED_IN',
    payload: bool,
  };
}

export function setUserData(userData) {
  return{
    type: 'USER_DATA',
    payload: userData,
  };
}

