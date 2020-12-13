import React from 'react';
import User from './User';
import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';

function Users({
    currentPage,
    onPageChanged,
    totalUsersCount,
    pageSize,
    users,
    ...props
}) {
    return (
        <div>
            <div className={styles.usersPagination}>
                <Paginator
                    className={styles.usersPagination}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                />
            </div>
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
