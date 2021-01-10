import React from 'react';
import Profile from './Profile';
import {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    saveProfile,
    savePhoto
} from '../Redux/profile-reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authUserId: state.auth.userId,
        profileEditSuccess: state.profilePage.profileEditSuccess
    };
};

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;

        if (!userId) {
            userId = this.props.authUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }

        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }

        if (this.props.profileEditSuccess ==! prevProps.profileEditSuccess) {
            this.refreshProfile();
        }

    }
    
    render() {
        if (!this.props.isAuth) return <Redirect to='/login' />;
        return (
            <Profile
                {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateUserStatus={this.props.updateUserStatus}
                saveProfile={this.props.saveProfile}
                savePhoto={this.props.savePhoto}
            />
        );
    }
}

export default compose(
    connect(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        updateUserStatus,
        saveProfile,
        savePhoto,
    }),
    withRouter
)(ProfileContainer);
