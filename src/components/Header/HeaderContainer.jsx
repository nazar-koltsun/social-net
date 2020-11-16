import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {
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
    render() {
        return <Header {...this.props} />;
    }
}

export default connect(mapStateToProps, {
    logout
})(HeaderContainer);
