import React, { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStatus } from '../../Redux/profile-reducer';
import { AppStateType } from '../../Redux/redux-store';

type PropsType = {
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    const initStatus = useSelector((state: AppStateType) => state.profilePage.status);

    const dispatch = useDispatch();

    const updateStatusAfterBlur = (status: string) => {
        dispatch(updateUserStatus(status));
    }
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(initStatus);


    useEffect(() => {
        setStatus(status);
    }, [initStatus]);

    const activateMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        updateStatusAfterBlur(status);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <>
            {!editMode && (
                <div>
                    <span onDoubleClick={activateMode}>
                        <b>Status: </b> {status || '---'}
                    </span>
                </div>
            )}
            {editMode && (
                <div>
                    <input
                        onBlur={deactivateEditMode}
                        onChange={onStatusChange}
                        value={status}
                        autoFocus
                    />
                </div>
            )}
        </>
    );
};

export default ProfileStatusWithHooks;
