import React from 'react';
import * as api from '../../api/index';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import connect from 'react-redux/es/connect/connect';
import CreateCollective from '../CreateCollective';
import JoinCollective from '../JoinCollective';
import AppNavbar from '../Navbar';
import CleaningChecklist from './CleaningChecklist';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.getUserData();

    this.state = {
      createCollective: false
    };
  }

  getUserData = () => {
    api.getUser().then(res => {
      const user = res.data;
      this.props.actions.setUserData(user);
    });
  };

  updateCreateCollective = boolean => {
    this.setState({ createCollective: boolean });
  };

  joinCollective = event => {
    event.preventDefault();
    api.joinCollective(event.target.elements.collectiveName.value)
      .then(
        res =>
          res.status === 200 ? this.props.actions.setUserData(res.data) : null
      )
      .catch(err => window.alert(err.response.data.message));
  };

  createCollective = event => {
    event.preventDefault();
    api.createCollective(event.target.elements.collectiveName.value)
      .then(
        res =>
          res.status === 200 ? this.props.actions.setUserData(res.data) : null
      )
      .catch(err => window.alert(err.response.data.message));
  };

  render() {
    return (
      <div>
        <AppNavbar/>

        <CleaningChecklist />

        {this.state.createCollective ? (
          <CreateCollective
            hasCollective={this.props.user.hasCollective}
            isLoggedIn={this.props.actions.isLoggedIn}
            setHomeState={this.updateCreateCollective}
            createCollective={this.createCollective}
          />
        ) : (
          <JoinCollective
            hasCollective={this.props.user.hasCollective}
            isLoggedIn={this.props.actions.isLoggedIn}
            setHomeState={this.updateCreateCollective}
            joinCollective={this.joinCollective}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
