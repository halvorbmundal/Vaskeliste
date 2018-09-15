import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as cleaningListsActions from '../../actions/cleaningListsActions';
import * as api from '../../api';
import { FieldGroup } from '../common/common';
import { isLoading } from '../../actions/commonActions';
import CleaningTask from './CleaningTask';

class CleaningSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  checkTask = (sectionNumber, taskNumber, id, isComplete) => {
    this.props.actions.checkTask(sectionNumber, taskNumber);
    api.setTaskComplete(isComplete, id);
  };

  taskList = (tasks, sectionNumber) =>
    tasks.map((task, i) => (
      <CleaningTask
        key={task.id}
        id={task.id}
        task={task}
        sectionNumber={sectionNumber}
        taskNumber={i}
        checkTask={this.checkTask}
        deleteTask={this.deleteTask}
        showDelete={this.props.cleaningListsReducer.isModifying}
      />
    ));

  addNewTask = event => {
    event.preventDefault();
    const name = event.target.elements.newTask.value;
    this.props.isLoading(true);
    api.addTask(name, this.props.id).then(res => {
      this.props.isLoading(false);
      this.props.actions.addTask(res.data, this.props.sectionNumber);
    });
    event.target.elements.newTask.value = '';
  };

  deleteSection = event => {
    event.preventDefault();
    this.props.isLoading(true);
    api.deleteSection(this.props.id).then(res => {
      this.props.isLoading(false);
      this.props.actions.deleteSection(this.props.sectionNumber);
    });
  };

  deleteTask = (taskNumber, taskId, event) => {
    event.preventDefault();
    this.props.isLoading(true);
    api.deleteTask(taskId).then(res => {
      this.props.isLoading(false);
      this.props.actions.deleteTask(this.props.sectionNumber, taskNumber);
    });
  };

  dropdown = () => (
    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      <DropdownToggle caret>Who is responsible?</DropdownToggle>
      <DropdownMenu>
        {this.props.usersInCollective.map(user => (
          <div key={user.id}>
            <DropdownItem onClick={() => null}>{user.username}</DropdownItem>
            <DropdownItem divider />
          </div>
        ))}
      </DropdownMenu>
    </Dropdown>
  );

  render() {
    const { name, responsibleUser, cleaningTasks } = this.props.list;
    const { sectionNumber } = this.props;
    console.log('responsibleUser', responsibleUser); //TODO hvordan blir dette når man legger til bruker?
    return (
      <div className={'cleaning-section'}>
        <Table>
          <thead>
            <tr>
              <th>{name}</th>
              <th>
                Responsible: {responsibleUser ? responsibleUser : 'Not set'}
              </th>
              <th>
                {this.props.cleaningListsReducer.isModifying ? (
                  <Button onClick={this.deleteSection}> delete </Button>
                ) : null}
              </th>
            </tr>
          </thead>

          <tbody>{this.taskList(cleaningTasks, sectionNumber)}</tbody>
          {this.props.cleaningListsReducer.isModifying ? (
            <thead>
              <tr>
                <td />
                <td>
                  <form className={'remove_padding'} onSubmit={this.addNewTask}>
                    {FieldGroup({
                      id: 'newTask',
                      type: 'section',
                      placeholder: 'New task'
                    })}
                  </form>
                </td>
                <td />
              </tr>
            </thead>
          ) : null}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cleaningListsReducer: state.cleaningListsReducer,
    usersInCollective: state.user.usersInCollective
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(cleaningListsActions, dispatch),
  isLoading: bindActionCreators(isLoading, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CleaningSection);
