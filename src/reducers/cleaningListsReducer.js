import * as cloneDeep from 'lodash/cloneDeep';

export default function cleaningLists(
  state = {
    cleaningLists: [],
    isModifying: false
  },
  action
) {
  switch (action.type) {
    case 'SET_CLEANINGLIST':
      state = { ...state, cleaningLists: action.payload };
      break;
    case 'SET_IS_MODIFYING':
      state = { ...state, isModifying: action.payload };
      break;
    case 'ADD_SECTION':
      state = {
        ...state,
        cleaningLists: addSection(state.cleaningLists, action.payload)
      };
      break;
    case 'ADD_TASK':
      state = {
        ...state,
        cleaningLists: addTask(
          state.cleaningLists,
          action.payload.sectionNumber,
          action.payload.task
        )
      };
      break;
    case 'DELETE_SECTION':
      state = {
        ...state,
        cleaningLists: deleteSection(state.cleaningLists, action.payload)
      };
      break;
    case 'DELETE_TASK':
      state = {
        ...state,
        cleaningLists: deleteTask(
          state.cleaningLists,
          action.payload.sectionNumber,
          action.payload.taskNumber
        )
      };
      break;
    case 'CHECK_TASK':
      state = {
        ...state,
        cleaningLists: updateCheckedTask(
          state.cleaningLists,
          action.payload.sectionNumber,
          action.payload.taskNumber
        )
      };
      break;
    default:
    // do nothing
  }
  return state;
}

function updateCheckedTask(cleaningLists, sectionNumber, taskNumber) {
  let deepCopy = JSON.parse(JSON.stringify(cleaningLists));
  deepCopy[sectionNumber].cleaningTasks[taskNumber].isComplete = !deepCopy[
    sectionNumber
  ].cleaningTasks[taskNumber].isComplete;
  return deepCopy;
}

function addSection(cleaningList, section) {
  let deepCopy = cloneDeep(cleaningList);
  deepCopy.push(section);
  return deepCopy;
}

function addTask(cleaningList, sectionNumber, task) {
  let deepCopy = cloneDeep(cleaningList);
  deepCopy[sectionNumber].cleaningTasks.push(task);
  console.log(deepCopy);
  return deepCopy;
}

function deleteSection(cleaningList, sectionNumber) {
  let deepCopy = cloneDeep(cleaningList);
  deepCopy.splice(sectionNumber, 1);
  return deepCopy;
}

function deleteTask(cleaningList, sectionNumber, taskNumber) {
  let deepCopy = cloneDeep(cleaningList);
  deepCopy[sectionNumber].cleaningTasks.splice(taskNumber, 1);
  return deepCopy;
}
