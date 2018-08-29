import React from "react";
import { connect } from "react-redux";
import * as api from "../../api/index";
import { bindActionCreators } from "redux";
import * as cleaningListsActions from "../../actions/cleaningListsActions";
import CleaningSection from "./CleaningSection";

class CleaningChecklist extends React.Component {
  constructor(props) {
    super(props);

    api.getSections().then(res => this.props.actions.setCleaninglist(res.data));

    this.state = {
      editChecklist: false
    };
  }

  setCleaninglists = data => {
    this.props.actions.setCleaninglist(data);
  };

  sections = () =>
    this.props.cleaningListsReducer.cleaningLists.map((list, i) => (
      <CleaningSection key={list.id} list={list} sectionNumber={i}/>
    ));

  render() {
    return (
      <div className={"cleaning-lists center-center"}>
        {this.props.cleaningListsReducer.cleaningLists ? this.sections() : null}
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
)(CleaningChecklist);
