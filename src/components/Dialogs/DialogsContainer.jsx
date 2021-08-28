import React from 'react';
import Dialogs from './Dialogs';
import { actions } from '../Redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from "../../hoc/AuthRedirect";
import { compose } from 'redux';

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(actions.sendMessageCreator(newMessageBody));
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);