import Myposts, { DispatchPropsType, MapPropsType } from './Myposts';
import {
  actions
} from '../../Redux/profile-reducer';
import { connect } from 'react-redux';
import { AppStateType } from '../../Redux/redux-store';

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  }
}

const MypostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
  mapStateToProps, 
  {addPost: actions.addPostActionCreator }
)(Myposts);

export default MypostsContainer;
