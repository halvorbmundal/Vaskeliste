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