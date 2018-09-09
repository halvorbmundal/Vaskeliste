import React from 'react';
import {Button} from 'reactstrap';

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
      <td>{props.showDelete ? <Button onClick={(e) => props.deleteTask(props.taskNumber, props.id, e)}> delete </Button> : null}</td>
    </tr>

  );
};

export default CleaningTask;

