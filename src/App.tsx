import React from 'react';
import { Route, withRouter, Switch, Link } from 'react-router-dom';
import { BrowserRouter, Redirect } from 'react-router-dom';
import store, { AppStateType } from './components/Redux/redux-store';
import { Provider } from 'react-redux';
import './App.css';
import 'antd/dist/antd.css';
import AppHeader from './components/Header/Header';
import Nav from './components/Nav/Nav';
import UsersPage from './components/Users/UsersPage';
import { LoginPage } from './components/Login/Login';
import { compose } from 'redux';
import Loader from './components/common/Loader/Loader';
import { initializeApp } from './components/Redux/app-reducer';
import { connect } from 'react-redux';
import withSuspense from './hoc/withSuspense';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, Avatar, Row, Col } from 'antd';
import { autofill } from 'redux-form';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


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
            <>
                <Layout>
                    <AppHeader />
                    <Content style={{ margin: '0 auto', padding: 'var(--content-padding)', maxWidth: 'var(--content-max-width)', width: '100%' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                            <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                                    <Menu.Item key="1">
                                        <Link to='/profile'>Profile</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Link to='/dialogs'>Messages</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                                    <Menu.Item key="5">
                                        <Link to='/developers'>Developers</Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
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

                                    <Route path='/developers' render={() => <UsersPage pageTitle={"Cамурай"} />} />
                                    <Route path='/login' render={() => <LoginPage />} />
                                    <Route path='*' render={() => <div>404 NOT FOUND</div>} />
                                </Switch>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Samurai Social Network ©2021 Created by IT-KAMASUTRA</Footer>
                </Layout>
            </>
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
