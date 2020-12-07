import React from 'react';
import User from './User';
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
            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
            />
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
