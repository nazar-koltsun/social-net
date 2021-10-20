import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return (
        <header className={classes.header}>
            <img
                className={classes.logo}
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJubvac5LtNOwJtYNtNx6m67AKuexoQ3KxfZJxjtdkVQPaaN0c'
                alt='Logo'
            />

            <div className={classes.loginBlock}>
                {props.isAuth ? (
                    <div>
                        <div>{props.login}</div>
                        <button onClick={() => {props.logout();}}>
                            Log out
                        </button>
                    </div>
                ) : (
                    <NavLink to={'/login'}>Login</NavLink>
                )}
            </div>
        </header>
    );
}

export default Header;
