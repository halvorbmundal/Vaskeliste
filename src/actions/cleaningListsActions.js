export function setCleaninglist(cleaninglist) {
  return{
    type: 'SET_CLEANINGLIST',
    payload: cleaninglist,
  };
}

export function checkTask(sectionNumber, taskNumber) {
  return{
    type: 'CHECK_TASK',
    payload: {sectionNumber, taskNumber}
  };
}

export function setIsModifying(boolean) {
  return{
    type: 'SET_IS_MODIFYING',
    payload: boolean
  };
}

export function addSection(section) {
  return{
    type: 'ADD_SECTION',
    payload: section
  };
}

export function addTask(task, sectionNumber) {
  return{
    type: 'ADD_TASK',
    payload: {task, sectionNumber}
  };
}

export function deleteSection(sectionNumber) {
  return{
    type: 'DELETE_SECTION',
    payload: sectionNumber
  };
}

export function deleteTask(sectionNumber, taskNumber) {
  return{
    type: 'DELETE_TASK',
    payload: {taskNumber, sectionNumber}
  };
}

