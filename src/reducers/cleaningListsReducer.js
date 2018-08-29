function updateCheckedTask(cleaningLists, sectionNumber, taskNumber) {
  let deepCopy = JSON.parse(JSON.stringify(cleaningLists));
  deepCopy[sectionNumber].cleaningTasks[taskNumber].isComplete = !deepCopy[
    sectionNumber
  ].cleaningTasks[taskNumber].isComplete;
  return deepCopy;
}

export default function cleaningLists(
  state = {
    cleaningLists: undefined
  },
  action
) {
  switch (action.type) {
    case "SET_CLEANINGLIST":
      state = { ...state, cleaningLists: action.payload };
      break;
    case "CHECK_TASK":
      state = {...state, cleaningLists: updateCheckedTask(
        state.cleaningLists,
        action.payload.sectionNumber,
        action.payload.taskNumber)};
      break;
    default:
    // do nothing
  }
  return state;
}
