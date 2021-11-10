import React, { ChangeEvent, useEffect } from 'react';
import Loader from '../../common/Loader/Loader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataReduxForm from './ProfileDataForm';
import userPhoto from '../../../assets/img/user-default.png';
import { useState } from 'react';
import { ContactsType, ProfileType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../Redux/redux-store';
import { savePhoto, saveProfile  } from '../../Redux/profile-reducer';
import { useParams } from 'react-router';

type ProfileInfoPropsType = {}

const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {
    const profile = useSelector((state: AppStateType) => state.profilePage.profile);

    type ParamsType = {
        userId?: string | undefined
    }
    const params: ParamsType = useParams();

    const isOwner = !params.userId;

    const dispatch = useDispatch();

    const saveUserPhoto = (file: File) => {
        dispatch(savePhoto(file));
    }

    const saveUserProfile = (formData: ProfileType) => {
        dispatch(saveProfile(formData));
    }
    
    let [editMode, setEditMode] = useState(false);
    
    if (!profile) {
        return <Loader />;
    }
    
    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length) {
            saveUserPhoto(e.target.files[0]);
        }
    };

    const onSubmit = async (formData: ProfileType) => {
        await saveUserProfile(formData)
        setEditMode(false);
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

                <ProfileStatusWithHooks />

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
