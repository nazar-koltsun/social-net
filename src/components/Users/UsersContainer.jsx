import React from "react";
import Users from "./Users";
import {
  requestUsers,
  follow,
  unFollow
} from "../Redux/users-reducer";
import {
  getPageSize, 
  getUsers,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching, 
  getFollowingInProgress} from '../Redux/users-selectors';
import { connect } from "react-redux";
import Loader from "../common/Loader/Loader";
import { compose } from "redux";


// let mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//     isAuth: state.auth.isAuth
//   };
// };

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.totalUsersCount);
  }

  onPageChanged = (pageNumber) => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Loader />
        ) : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          currentPage={this.props.currentPage}
          pageSize={this.props.pageSize}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          followingInProgress={this.props.followingInProgress}
          follow={this.props.follow}
          unFollow={this.props.unFollow}
        />
      </>
    );
  }
}

export default compose(
  connect(mapStateToProps, {requestUsers, follow, unFollow}),
)(UsersContainer);