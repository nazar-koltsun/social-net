import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import { Avatar, Button, Col, Menu, Row } from 'antd';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/auth-reducer';
import { selectLogin, selectIsAuth } from '../Redux/auth-selectors';

type PropsType = {};

const AppHeader: React.FC<PropsType> = (props) => {
    const { Header } = Layout;
    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectLogin);

    const dispatch = useDispatch();

    const userLogout = () => {
        dispatch(logout());
    }

    return (
        <div>
            <Header className={classes.header} style={{padding: '0', height: 'auto'}}>
                <Row gutter={15} style={{ margin: '0 auto', padding: 'var(--content-padding)',maxWidth: 'var(--content-max-width)', width: '100%' }}> 
                    <Col className={classes.logoWrapper} flex="60px">
                        <img
                            className={classes.logo}
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJubvac5LtNOwJtYNtNx6m67AKuexoQ3KxfZJxjtdkVQPaaN0c'
                            alt='Logo'
                        />
                    </Col>
                    <Col className={classes.headerLinksWrapper} flex="auto">
                        <Menu className={classes.headerLinksList} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1">
                                <Link to='/developers'>Developers</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col className={classes.loginBlockWrapper} flex="auto">
                        <div className={classes.loginBlock}>
                            <Row className={classes.loginBlockRow} gutter={15} justify="end">
                                <Col flex="32px">
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                </Col>
                                <Col flex="fill">
                                    {isAuth ? (
                                        <Row gutter={15}>
                                            <Col className="gutter-row" flex='auto'>
                                                <span className={classes.userName} title={login as string}>{login}</span>
                                            </Col>
                                            <Col flex='85px'>
                                                <Button onClick={() => {userLogout();}}>
                                                Log out
                                                </Button>
                                            </Col>
                                        </Row>
                                    ) : (
                                        <Row>
                                            <Col span={15}>
                                                <Link to={'/login'} className={classes.login}>Login</Link>
                                            </Col>
                                        </Row>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Header>
        </div>
    );
}

export default AppHeader;
