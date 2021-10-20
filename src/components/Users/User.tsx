import React from 'react';
import styles from './Users.module.css';
import userDefaultPhoto from '../../assets/img/user-default.png';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}

let User: React.FC<PropsType> = ({user, followingInProgress, unFollow, follow}) => {
    return (
        <div>
            <span>
                <NavLink
                    to={'/profile/' + user.id}
                    className={styles.user_link}
                >
                    <img
                        className={styles.userPhoto}
                        width='70'
                        height='70'
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
                            disabled={followingInProgress.some(
                                (id) => id === user.id
                            )}
                            onClick={() => {
                                unFollow(user.id);
                            }}
                        >
                            Unfollow
                        </button>
                    ) : (
                        <button
                            type='button'
                            disabled={followingInProgress.some(
                                (id) => id === user.id
                            )}
                            onClick={() => {
                                follow(user.id);
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
}

export default User;
