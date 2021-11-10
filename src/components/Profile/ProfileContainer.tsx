import React, { useEffect } from 'react';
import Profile from './Profile';
import {
    getUserProfile,
    getUserStatus,
} from '../Redux/profile-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AppStateType } from '../Redux/redux-store';

type pageType = {}

const ProfileContainer: React.FC<pageType> = (props) => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const authUserId = useSelector((state: AppStateType) => state.auth.userId);
    
    type ParamsType = {
        userId?: string | undefined
    }
    const params: ParamsType = useParams();

    const dispatch = useDispatch();
    const getProfile = (userId: number) => {
        dispatch(getUserProfile(userId))
    }
    const getStatus = (userId: number) => {
        dispatch(getUserStatus(userId))
    }

    const history = useHistory();
    
    const refreshProfile = () => {
        let userId: string | undefined | number | null = params.userId;
        if (!userId) {
            userId = authUserId; 
            if (!userId) {
                history.push('/login');
            }
        }
        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            getProfile(+userId as number);
            getStatus(+userId as number); 
        }
    }

    useEffect(() => { 
        refreshProfile();
    });

    if (!isAuth) {
        history.push('/login');
    }
    return (
        <Profile />
    );
}

export default ProfileContainer;