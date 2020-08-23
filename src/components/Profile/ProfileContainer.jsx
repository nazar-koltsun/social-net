import React from "react";
import * as axios from "axios";
import Profile from "./Profile";
import {
    getUserProfile,
    unpdateNewPostTextActionCreator,
} from "../Redux/profile-reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { usersApi } from "../../api/api";
import { Redirect } from 'react-router-dom';

let mapStateToProps = (state) => {
    return {
        userInfo: state.profilePage.userInfo,
        isAuth: state.auth.isAuth
    };
};

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;

        if (!userId) {
            userId = 2;
        }

        this.props.getUserProfile(userId);
    }

    render() {
        if (!this.props.isAuth) return <Redirect to="/login" />;
        return <Profile {...this.props} profile={this.props.userInfo} />;
    }
}

let withUrlDataContainerComponent = withRouter(ProfileContainer);
export default connect(mapStateToProps, { getUserProfile })(
    withUrlDataContainerComponent
);
