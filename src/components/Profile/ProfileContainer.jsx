import React from "react";
import Profile from "./Profile";
import {
    getUserProfile,
    getUserStatus,
    updateUserStatus
} from "../Redux/profile-reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import {Redirect} from 'react-router-dom';


let mapStateToProps = (state) => {
    return {
        userInfo: state.profilePage.userInfo,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authUserId: state.auth.userId,
    };
};

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;

        if (!userId) {
            userId = this.props.authUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }

        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        if (!this.props.isAuth) return <Redirect to="/login" />
        return (
            <Profile 
                {...this.props} 
                profile={this.props.userInfo} 
                status={this.props.status} 
                updateUserStatus={this.props.updateUserStatus}
            />
        )
    }
}

export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),  
    withRouter,
)(ProfileContainer);
