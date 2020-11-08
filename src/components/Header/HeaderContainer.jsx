import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {
    setAuthtUserData,
    setAuthtUserPhotos,
    getAuthUserData,
    logout,
} from '../Redux/auth-reducer';

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        photos: state.auth.photos,
    };
};

class HeaderContainer extends React.Component {
    componentDidMount() {
        console.log(this.props);
        // authApi.authMe()
        //     .then((data) => {
        //         if (data.resultCode === 0) {
        //             let { email, login, id } = data.data;

        //             this.props.setAuthtUsetData(email, login, id);
        //         }
        //         authApi.authMeSecond(this.props.userId)
        //             .then((data) => {
        //                 this.props.setAuthtUserPhotos(data.photos);
        //             });
        //     });

        this.props.getAuthUserData();
    }

    render() {
        return <Header {...this.props} />;
    }
}

export default connect(mapStateToProps, {
    setAuthtUserData,
    setAuthtUserPhotos,
    getAuthUserData,
    logout
})(HeaderContainer);
