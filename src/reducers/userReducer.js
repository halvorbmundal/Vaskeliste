export default function userReducer(
  state = {
    loggedIn: false,
    hasCollective: true,
    collective: undefined,
    username: undefined,
    isAccepted: true,
    isCollectiveAdmin: false,
    requests: [],
    usersInCollective: []
  },
  action
) {
  switch (action.type) {
    case 'IS_LOGGED_IN':
      state = { ...state, loggedIn: action.payload };
      break;
    case 'SET_REQUESTS':
      state = { ...state, requests: action.payload };
      break;
    case 'SET_USERS_IN_COLLECTIVE':
      state = { ...state, usersInCollective: action.payload };
      break;
    case 'USER_DATA':
      state = {
        ...state,
        username: action.payload.username,
        isAccepted: action.payload.acceptedInCollective,
        isCollectiveAdmin: action.payload.collectiveAdmin,
        collective:
          action.payload.collective === null && action.payload.collective
            ? undefined
            : action.payload.collective.name,
        hasCollective: action.payload.collective !== null
      };
      break;
    default:
    // do nothing
  }

  return state;
}
