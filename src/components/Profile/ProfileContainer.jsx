import React from "react";
import Profile from "./Profile";
import {
    getUserProfile,
    getUserStatus,
    updateUserStatus
} from "../Redux/profile-reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { withAuthRedirect } from "../../hoc/AuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
    return {
        userInfo: state.profilePage.userInfo,
        status: state.profilePage.status,
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
        this.props.getUserStatus(userId);
    }

    render() {
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
    // withAuthRedirect
)(ProfileContainer);

// let authRedirectComponent = withAuthRedirect(ProfileContainer);

// let withUrlDataContainerComponent = withRouter(authRedirectComponent);
// export default connect(mapStateToProps, { getUserProfile })(
//     withUrlDataContainerComponent
// );
