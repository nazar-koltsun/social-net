import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/img/user-default.png';

function Header(props) {
    console.log(props.photos);

    let getUserPhoto = () => {
        if (props.photos) {
            if (props.photos.large != null) {
                return props.photos.large;
            }
        }
        return userPhoto;
    };

    return (
        <header className={classes.header}>
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJubvac5LtNOwJtYNtNx6m67AKuexoQ3KxfZJxjtdkVQPaaN0c'
                alt='Logo'
            />

            <div className={classes.loginBlock}>
                {props.isAuth ? (
                    <div>
                        <img
                            className={classes.userPhoto}
                            src={getUserPhoto()}
                            alt=''
                        />
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
