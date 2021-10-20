import React from 'react';
import classes from './Nav.module.css';
import { NavLink } from 'react-router-dom';

const Nav: React.FC = () => {
    return (
        <nav className={classes.nav}>
            <ul>
                <li className={classes.item}>
                    <NavLink to='/profile' activeClassName={classes.active}>
                        Profile
                    </NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink to='/dialogs' activeClassName={classes.active}>
                        Messages
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/users'
                        className={classes.users_link}
                        activeClassName={classes.active}
                    >
                        Users
                    </NavLink>
                </li>
                <li className={classes.item}>
                    <a href='link'>News</a>
                </li>
                <li className={classes.item}>
                    <a href='link'>Music</a>
                </li>
                <li className={classes.item}>
                    <a href='link'>Settings</a>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
