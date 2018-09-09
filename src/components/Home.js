import React from "react";
import * as api from "../api/index";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/userActions";
import connect from "react-redux/es/connect/connect";
import CreateCollective from "./common/CreateCollective";
import JoinCollective from "./common/JoinCollective";
import AppNavbar from "./common/Navbar";
import CleaningChecklist from "./cleaningLists/CleaningChecklists";
import { Button } from "reactstrap";
import { logOut } from "./common/common";
import JoinCollectiveRequest from "./common/JoinCollectiveRequest";
import * as cloneDeep from "lodash/cloneDeep";

class Home extends React.Component {
  constructor(props) {
    super(props);

    api.getUser().then(res => {
      this.props.actions.setUserData(res.data);
      res.data.collective
        ? api
            .getUsersInCollective(res.data.collective.name)
            .then(res => this.props.actions.setUsersInCollectve(res.data))
        : null;
    });

    api
      .getPendingRequests()
      .then(res => this.props.actions.setPendingRequests(res.data));

    this.state = {
      createCollective: false
    };
  }

  updateCreateCollective = boolean => {
    this.setState({ createCollective: boolean });
  };

  joinCollective = event => {
    event.preventDefault();
    api
      .joinCollective(event.target.elements.collectiveName.value)
      .then(
        res =>
          res.status === 200 ? this.props.actions.setUserData(res.data) : null
      )
      .catch(err => window.alert(err.response.data.message));
  };

  createCollective = event => {
    event.preventDefault();
    api
      .createCollective(event.target.elements.collectiveName.value)
      .then(
        res =>
          res.status === 200 ? this.props.actions.setUserData(res.data) : null
      )
      .catch(err => window.alert(err.response.data.message));
  };

  removeRequest = () => {
    let list = cloneDeep(this.props.user.requests);
    list.splice(0, 1);
    this.props.actions.setPendingRequests(list);
  };

  render() {
    if (this.props.user.isAccepted || !this.props.user.collective) {
      return (
        <div>
          <AppNavbar />

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
          {console.log(this.props.user.requests[0])}
          {this.props.user.requests.length > 0 ? (
            <JoinCollectiveRequest
              hasRequests={this.props.user.requests.length > 0}
              user={this.props.user.requests[0]}
              removeRequest={this.removeRequest}
            />
          ) : null}
        </div>
      );
    } else {
      return (
        <div className={"center-center"}>
          Du er ikke akseptert i kollektivet enda. Vennligst vent til
          administratoren av kollektivet legger deg til.
          <Button onClick={() => logOut(this.props.actions.isLoggedIn)}>
            Log ut
          </Button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
