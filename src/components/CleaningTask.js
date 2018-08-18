import React from 'react';

const CleaningTask = ({id, task, checkTask}) => (
  <div className="Task-container">
    <p>{task}</p>
    <div className="Button-box">
      <button onClick={() => checkTask(id)}>Check</button>
    </div>
  </div>
);

export default CleaningTask;
