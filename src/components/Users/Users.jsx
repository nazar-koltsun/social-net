import React from 'react';
import styles from './Users.module.css';
import userDefaultPhoto from '../../assets/img/user-default.png';
import { NavLink } from 'react-router-dom';

function Users(props) {
    console.log(props);
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            <div>
                {pages.map((item) => {
                    return (
                        <button
                            key={item}
                            className={
                                props.currentPage === item
                                    ? styles.selectedPage
                                    : ''
                            }
                            onClick={() => {
                                props.onPageChanged(item);
                            }}
                        >
                            {item}
                        </button>
                    );
                })}
            </div>
            {props.users.map((user) => {
                return (
                    <div key={user.id}>
                        <span>
                            <NavLink
                                to={'/profile/' + user.id}
                                className={styles.user_link}
                            >
                                <img
                                    className={styles.userPhoto}
                                    width='70'
                                    height= '70'
                                    src={
                                        user.photos.small != null
                                            ? user.photos.small
                                            : userDefaultPhoto
                                    }
                                    alt='User avatar'
                                />
                            </NavLink>

                            <div>
                                {user.followed ? (
                                    <button
                                        type='button'
                                        disabled={props.followingInProgress.some(
                                            (id) => id == user.id
                                        )}
                                        onClick={() => {
                                            props.unFollow(user.id);
                                        }}
                                    >
                                        Unfollow
                                    </button>
                                ) : (
                                    <button
                                        type='button'
                                        disabled={props.followingInProgress.some(
                                            (id) => id == user.id
                                        )}
                                        onClick={() => {
                                            props.follow(user.id);
                                        }}
                                    >
                                        Follow
                                    </button>
                                )}
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{user.name}</div>
                                <div>{user.status}</div>
                            </span>
                            <span>
                                {/* <div>{user.location.country}</div> */}
                                {/* <div>{user.location.city}</div> */}
                            </span>
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export default Users;
