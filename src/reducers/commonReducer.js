export default function userReducer(
  state = {
    isLoading: false
  },
  action
) {
  switch (action.type) {
    case "IS_LOADING":
      state = { ...state, isLoading: action.payload };
      break;
    default:
    // do nothing
  }

  return state;
}