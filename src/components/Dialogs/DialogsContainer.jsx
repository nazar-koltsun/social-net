import React from 'react';
import Dialogs from './Dialogs';
import { updateMessageTextActionCreator, addMessageActionCreator } from '../Redux/dialogs-reducer';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onMessageChange: (text) => {
      let action = updateMessageTextActionCreator(text);
      dispatch(action);
    },

    addMessage: () => {
      dispatch(addMessageActionCreator());
    }
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;