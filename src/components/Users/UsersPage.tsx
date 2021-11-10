import React from 'react';
import Users from './Users';
import {
    getIsFetching,
} from '../Redux/users-selectors';
import { useSelector } from 'react-redux';
import Loader from '../common/Loader/Loader';

type UsersPagePropsType = {
    pageTitle: string
}

const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching);
    return (
        <>
            <h2>{props.pageTitle}</h2>
            {isFetching ? <Loader /> : null}
            <Users />
        </>
    );
}


export default UsersPage;
