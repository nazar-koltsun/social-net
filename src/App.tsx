import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { BrowserRouter, Redirect } from 'react-router-dom';
import store, { AppStateType } from './components/Redux/redux-store';
import { Provider } from 'react-redux';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Nav from './components/Nav/Nav';
import UsersPage from './components/Users/UsersPage';
import { LoginPage } from './components/Login/Login';
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

type MapPropsType = ReturnType<typeof mapStatetoProps>;
type DispatchPropsType = {
    initializeApp: () => void;
};

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors(e: PromiseRejectionEvent) {
        alert('Some error occured');
    }
    
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
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
                    <Switch>
                        <Route exact
                            path='/'
                            render={() => <Redirect to={'/profile'} />}/>
                        <Route
                            path='/profile/:userId?'
                            render={() => <SuspendedProfile />}/>
                        <Route
                            path='/dialogs'
                            render={() => <SuspendedDialogs />}/>

                        <Route path='/users' render={() => <UsersPage pageTitle={"Cамурай"} />} />
                        <Route path='/login' render={() => <LoginPage />} />
                        <Route path='*' render={() => <div>404 NOT FOUND</div>} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStatetoProps, { initializeApp })
)(App);

const SamuraiJSApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
};

export default SamuraiJSApp;
