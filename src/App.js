import React, { Suspense } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import store from './components/Redux/redux-store';
import { Provider } from 'react-redux';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Nav from './components/Nav/Nav';
import UsersContainer from './components/Users/UsersContainer';
import LoginPage from './components/Login/Login';
import { compose } from 'redux';
import Loader from './components/common/Loader/Loader';
import { initializeApp } from './components/Redux/app-reducer';
import { connect } from 'react-redux';
import withSuspense from './hoc/withSuspense';

const DialogsContainer = React.lazy(() =>
    import('./components/Dialogs/DialogsContainer')
);

const ProfileContainer = React.lazy(() =>
    import('./components/Profile/ProfileContainer')
);
class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if (!this.props.initialized) {
            return <Loader />;
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Nav />
                <div className='app-wrapper-content'>
                    <Route
                        path='/profile/:userId?'
                        render={withSuspense(ProfileContainer)}/>
                    <Route
                        path='/dialogs'
                        render={withSuspense(DialogsContainer)}/>

                    <Route path='/users' render={() => <UsersContainer />} />
                    <Route path='/login' render={() => <LoginPage />} />
                </div>
            </div>
        );
    }
}

const mapStatetoProps = (state) => ({
    initialized: state.app.initialized,
});

let AppContainer = compose(
    withRouter,
    connect(mapStatetoProps, { initializeApp })
)(App);

const SamuraiJSApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
};

export default SamuraiJSApp;
