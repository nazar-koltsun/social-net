import React from 'react';
import { connect } from 'react-redux';
import Header, { DispatchPropsType, MapPropsType } from './Header';
import {
    logout,
} from '../Redux/auth-reducer';
import { AppStateType } from '../Redux/redux-store';

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    };
};

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
    render() {
        return <Header {...this.props} />;
    }
}

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {logout})(HeaderContainer);
