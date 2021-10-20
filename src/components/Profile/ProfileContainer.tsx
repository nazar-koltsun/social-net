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
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../Redux/redux-store';
import { ProfileType } from '../../types/types';

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authUserId: state.auth.userId,
        profileEditSuccess: state.profilePage.profileEditSuccess
    };
};

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    savePhoto: (photos: File) => void
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;
class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;

        if (!userId) {
            userId = this.props.authUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }

        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            this.props.getUserProfile(userId as number);
            this.props.getUserStatus(userId as number);
        }

    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }

        if (this.props.profileEditSuccess !== prevProps.profileEditSuccess) {
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

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        updateUserStatus,
        saveProfile,
        savePhoto,
    }),
    withRouter
)(ProfileContainer);
