import React from 'react';
import { Button } from 'reactstrap';

const CleaningTask = props => {
  const { name, isComplete } = props.task;
  return (
    <tr>
      <th scope="row">
        <div className={'flex-row'}>
          <input
            className="small-margin-right"
            name="isGoing"
            type="checkbox"
            checked={isComplete}
            onChange={() =>
              props.checkTask(
                props.sectionNumber,
                props.taskNumber,
                props.id,
                isComplete
              )
            }
          />{' '}
          <p>{name}</p>
        </div>
      </th>

      {props.showDelete ? (
        <th>
          <Button
            size="sm"
            onClick={e => props.deleteTask(props.taskNumber, props.id, e)}
          >
            Slett
          </Button>
        </th>
      ) : null}
    </tr>
  );
};

export default CleaningTask;
