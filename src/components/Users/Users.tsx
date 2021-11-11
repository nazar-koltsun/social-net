import React, { useEffect } from 'react';
import User from './User';
import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import UsersSearchForm from './UsersSearchForm';
import { FilterType, requestUsers, follow, unFollow } from '../Redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../Redux/users-selectors';
import { useHistory } from 'react-router-dom';
import queryString from 'querystring';

type PropsType = {
}

let Users: React.FC<PropsType> = (props) => {
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress= useSelector(getFollowingInProgress);

    const dispatch = useDispatch();
    const history = useHistory();

    type QeryParemsType = {
        term?: string;
        page?: string;
        friend?: string;
    };

    useEffect(() => {

        const parsed = queryString.parse(history.location.search.substring(1)) as
        QeryParemsType;

        let actualPage = currentPage;
        let actualFilter = filter;

        if (!!parsed.page) actualPage = Number(parsed.page);

        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string};

        switch(parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null};
                break;
            case 'true':
                actualFilter = {...actualFilter, friend: true};
                break;
            case 'false':
                actualFilter = {...actualFilter, friend: false};
                break;
        }
       
        dispatch(requestUsers(actualPage, totalUsersCount, actualFilter));
    }, [])

    useEffect(() => {
        const query: QeryParemsType = {};
        if (!!filter.term) query.term = filter.term;
        if (filter.friend !== null) query.friend = String(filter.friend);
        if (currentPage !== 1) query.page = String(currentPage);

        history.push({
            pathname: '/developers',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage]);

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    };

    const followUser = (userId: number) => {
        dispatch(follow(userId));
    }

    const unFollowUser = (userId: number) => {
        dispatch(unFollow(userId));
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <div className={styles.usersPagination}>
                <Paginator currentPage={currentPage}
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
                            followingInProgress={followingInProgress}
                            follow={followUser}
                            unFollow={unFollowUser}
                        /> 
                    </div>
                );
            })}
        </div>
    );
}

export default Users;