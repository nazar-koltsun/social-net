import React from "react";
import Users from "./Users";
import {
  getUsers,
  follow,
  unFollow
} from "../Redux/users-reducer";
import { connect } from "react-redux";
import Loader from "../common/Loader/Loader";
import { compose } from "redux";


let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
    isAuth: state.auth.isAuth
  };
};

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.totalUsersCount);
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Loader />
        ) : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
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
  connect(mapStateToProps, {getUsers, follow, unFollow}),
)(UsersContainer);