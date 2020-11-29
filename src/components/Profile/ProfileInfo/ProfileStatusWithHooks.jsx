import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status] );

    const activateMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    
    return (
        <>
            {!editMode && (
                <div>
                    <span
                        onDoubleClick={activateMode}
                    >
                        {status || '---'}
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
