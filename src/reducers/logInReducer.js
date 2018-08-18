export default function reducer(state = { loggedIn: false }, action) {
  switch (action.type) {
  case "LOG_IN":
    state = { ...state, loggedIn: true };
    break;
  case "LOG_OUT":
    state = { ...state, loggedIn: false };
    break;
  }
  return state;
}
