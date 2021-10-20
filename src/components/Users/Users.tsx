import React from 'react';
import User from './User';
import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import { UserType } from '../../types/types';

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({
    currentPage,
    onPageChanged,
    totalUsersCount,
    pageSize,
    users,
    ...props
}) => {
    return (
        <div>
            <div className={styles.usersPagination}>
                <Paginator currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                />
            </div>
            {console.log(users.length)}
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <User
                            key={user.id}
                            user={user}
                            followingInProgress={props.followingInProgress}
                            follow={props.follow}
                            unFollow={props.unFollow}
                        /> 
                        
                    </div>
                );
            })}
        </div>
    );
}

export default Users;
