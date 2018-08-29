import React from "react";
import { connect } from "react-redux";
import { CleaningTask } from "../index";
import { Table } from "reactstrap";
import {bindActionCreators} from 'redux';
import * as cleaningListsActions from '../../actions/cleaningListsActions';
import * as api from '../../api';

class CleaningSection extends React.Component {
  checkTask = (sectionNumber, taskNumber, id, isComplete) => {
    this.props.actions.checkTask(sectionNumber, taskNumber);
    api.setTaskComplete(isComplete, id)
  };

  taskList = (tasks, sectionNumber) => tasks.map((task, i)  => (<CleaningTask key={task.id} id={task.id} task={task} sectionNumber={sectionNumber} taskNumber={i} checkTask={this.checkTask}/>
  ));

  render() {
    const { name, responsibleUser, cleaningTasks } = this.props.list;
    const { sectionNumber } = this.props;
    console.log("responsibleUser",  responsibleUser); //TODO hvordan blir dette når man legger til bruker?
    return (
      <div className={"cleaning-section"}>
        <Table>
          <thead>
            <tr>
              <th>{name}</th>
              <th />
              <th />
              <th />
            </tr>
          </thead>

          <tbody>{this.taskList(cleaningTasks, sectionNumber)}</tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { cleaningListsReducer: state.cleaningListsReducer };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(cleaningListsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CleaningSection);
