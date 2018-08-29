import React from 'react';

const CleaningTask = (props) => {
  const {name, isComplete} = props.task;
  return (
    <tr>
      <th scope="row" ><input
        name="isGoing"
        type="checkbox"
        checked={isComplete}
        onChange={() => props.checkTask(props.sectionNumber, props.taskNumber, props.id, isComplete)} /></th>
      <td>{name}</td>
    </tr>
  );
};

export default CleaningTask;

