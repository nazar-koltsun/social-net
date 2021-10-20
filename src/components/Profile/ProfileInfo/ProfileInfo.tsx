import React, { ChangeEvent } from 'react';
import Loader from '../../common/Loader/Loader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataReduxForm from './ProfileDataForm';
import userPhoto from '../../../assets/img/user-default.png';
import { useState } from 'react';
import { ContactsType, ProfileType } from '../../../types/types';

type ProfileInfoPropsType = {
    profile: ProfileType | null
    isOwner: boolean
    status: string
    updateUserStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<void>
    savePhoto: (file: File) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
    profile,
    status,
    updateUserStatus,
    isOwner,
    savePhoto,
    saveProfile
}) => {
    let [editMode, setEditMode] = useState(false);
    
    if (!profile) {
        return <Loader />;
    }
    
    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(() => {
            console.log(formData);
            setEditMode(false) 
        })
    }

    return (
        <div>
            <img src='https://sites.google.com/site/prirodanasevseegooglgfgf/_/rsrc/1463456237313/home/priroda_gory_nebo_ozero_oblaka_81150_1920x1080.jpg' alt="Profile background" />
            <div className={s.descriptionBlock}>
                <img
                    src={profile.photos.large || userPhoto}
                    className={s.mainPhoto}
                    alt='Avatar'
                />
                {isOwner && <input type='file' onChange={mainPhotoSelected} />}

                <ProfileStatusWithHooks
                    status={status}
                    updateUserStatus={updateUserStatus}
                />

                { editMode ? <ProfileDataReduxForm profile={profile} onSubmit={onSubmit} /> : 
                <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)} /> }
            </div>
        </div>
    );
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <button type='button' onClick={goToEditMode}>Edit</button>}
            <div>
                <b>Full name: </b>
                {profile.fullName}
            </div>
            <div>
                <b>Looking for a job: </b>
                {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJobDescription && (
                <div>
                    <b>My professional skills: </b>
                    {profile.lookingForAJobDescription}
                </div>
            )}
            <div>
                <b>About me: </b>
                {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>:{' '}
                
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <Contacts
                            key={key}
                            contactTitle={key}
                            contactValue={profile.contacts[key as keyof ContactsType]}
                        />
                    );
                })}
            </div>
        </div>
    );
};

type ConContactsType = {
    contactTitle: string
    contactValue: string
}

const Contacts = ({ contactTitle, contactValue = '' }: ConContactsType) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    );
};

export default ProfileInfo;
