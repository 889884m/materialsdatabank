import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button';

import InputIcon from '@material-ui/icons/Input';

import { selectAuthProvider }  from '../../redux/ducks/app'

// temp for login page, maybe delete later
import { push } from 'connected-react-router'

class Login extends Component {

  // temp for login page
  pushRoute = (route) => this.props.dispatch(push(route));
  //
  
  render = () => {
    return (
        // <Button onClick={this.handleTouchTap}>
        //   <InputIcon/>&nbsp;
        //   Log in / Register
        // </Button>
      <Button onClick={ () => this.pushRoute('/login') }>
        <InputIcon/>&nbsp;
        Log in / Register
      </Button>
    );
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.props.dispatch(selectAuthProvider(true))
  };
}

function mapStateToProps(state, ownProps) {
  return {}
}

export default connect(mapStateToProps)(Login)


