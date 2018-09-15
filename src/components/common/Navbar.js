import React from 'react';
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from 'reactstrap';
import { logOut } from './common';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import * as cleaningListsActions from '../../actions/cleaningListsActions';
import connect from 'react-redux/es/connect/connect';

class AppNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {this.props.isModifying ? (
                  <Button
                    onClick={() => this.props.listActions.setIsModifying(false)}
                  >
                    Stop redigering
                  </Button>
                ) : (
                  <Button
                    onClick={() => this.props.listActions.setIsModifying(true)}
                  >
                    Rediger vaskelister
                  </Button>
                )}
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://github.com/halvorbmundal/Vaskeliste"
                  target="_blank"
                >
                  GitHub
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  onClick={() => logOut(this.props.actions.isLoggedIn)}
                >
                  Log out
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isModifying: state.cleaningListsReducer.isModifying };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
  listActions: bindActionCreators(cleaningListsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavbar);
