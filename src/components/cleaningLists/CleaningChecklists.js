import React from 'react';
import { connect } from 'react-redux';
import * as api from '../../api/index';
import { bindActionCreators } from 'redux';
import * as cleaningListsActions from '../../actions/cleaningListsActions';
import CleaningSection from './CleaningSection';
import { FieldGroup } from '../common/common';
import * as userActions from '../../actions/userActions';
import { isLoading } from '../../actions/commonActions';
import { Button } from 'reactstrap';

class CleaningChecklists extends React.Component {
  constructor(props) {
    super(props);

    this.getSections();

    this.state = {
      editChecklist: false
    };
  }

  setCleaninglists = data => {
    this.props.actions.setCleaninglist(data);
  };

  getSections = () => {
    api.getSections().then(res => this.props.actions.setCleaninglist(res.data));
  };

  sections = () =>
    this.props.cleaningListsReducer.cleaningLists.map((list, i) => (
      <CleaningSection
        key={list.id}
        id={list.id}
        list={list}
        sectionNumber={i}
        getData={this.getSections}
      />
    ));

  addNewSection = event => {
    event.preventDefault();
    const name = event.target.elements.newSection.value;
    if (name !== '') {
      this.props.isLoading(true);
      api.addSection(name).then(res => {
        this.props.isLoading(false);
        this.props.actions.addSection(res.data);
      });
      event.target.elements.newSection.value = '';
    }
  };

  editButton = () => (
    <Button className={"padding-bottom-big"} onClick={() => this.props.actions.setIsModifying(true)}>
      Legg til seksjoner
    </Button>
  );

  render() {
    return (
      <div>
        <p className={'center padding-top'}>
          Seksjonene roteres og tildeles brukerene hver søndag.
        </p>
        <div className={'cleaning-lists center-center'}>
          {this.props.cleaningListsReducer.cleaningLists.length === 0 &&
          !this.props.cleaningListsReducer.isModifying
            ? this.editButton()
            : null}
          {this.props.cleaningListsReducer.cleaningLists
            ? this.sections()
            : null}
          {this.props.cleaningListsReducer.isModifying ? (
            <form onSubmit={this.addNewSection} className={'padding-left'}>
              {FieldGroup({
                id: 'newSection',
                type: 'section',
                placeholder: 'Legg til ny seksjon'
              })}
            </form>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { cleaningListsReducer: state.cleaningListsReducer };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(cleaningListsActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
  isLoading: bindActionCreators(isLoading, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CleaningChecklists);
