export default function reducer(
  state={
    {
      1: {
        1: {done: false, task: "vaske do"},
        2: {done: false, task: "rydde støv"},
        3: {done: true, task: "klippe hund"},
        4: {done: true, task: "vaske plen"}},
      2 : {
        1: {done: false, task: "vaske do"},
        2: {done: false, task: "rydde støv"},
        3: {done: true, task: "klippe hund"},
        4: {done: true, task: "vaske plen"}
      }
    }, action) {

  switch (action.type) {
    case "CHECK_TASK":
      state = {...state, payload.listID}
      break;
    case "DELETE_TASK":
      state = {...state, loggedIn: false}
      break;
    case "CREATE_TASK":
      state = {...state, loggedIn: false}
      break;
    case "DELETE_TASK_LIST":
      state = {...state, loggedIn: false}
      break;
    case "CREATE_TASK_LIST":
      state = {...state, loggedIn: false}
      break;
  }

  return state;
}
