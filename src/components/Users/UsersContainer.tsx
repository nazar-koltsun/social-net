import React from 'react';
import Users from './Users';
import { requestUsers, follow, unFollow, toggleFollowingInProgress, setCurrentPage } from '../Redux/users-reducer';
import {
    getPageSize,
    getUsers,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress,
} from '../Redux/users-selectors';
import { UserType } from '../../types/types'
import { AppStateType } from '../Redux/redux-store';
import { connect } from 'react-redux';
import Loader from '../common/Loader/Loader';
import { compose } from 'redux';

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, totalUsersCount:number) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}

type OwnPropsType = {
    pageTitle: string;
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    
    componentDidMount() {
        const { currentPage, totalUsersCount } = this.props;
        this.props.requestUsers(currentPage, totalUsersCount);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.requestUsers(pageNumber, pageSize);
    };
    
    render() {
        return (
            <>
                <h2>{this.props.pageTitle}</h2>
                {this.props.isFetching ? <Loader /> : null}
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
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {requestUsers, follow, unFollow})
)(UsersContainer);
