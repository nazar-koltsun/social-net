import Myposts from './Myposts';
import {
  addPostActionCreator,
  unpdateNewPostTextActionCreator
} from '../../Redux/profile-reducer';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onPostChange: (text) => {
      let action = unpdateNewPostTextActionCreator(text);
      dispatch(action);
    },

    addPost: () => {
      dispatch(addPostActionCreator());
    }
  }
}

const MypostsContainer = connect(mapStateToProps, mapDispatchToProps)(Myposts);

export default MypostsContainer;
