import React from 'react';
import { InjectedFormProps, reduxForm } from "redux-form";
import styles from './ProfileInfo.module.css';
import { Input, createField, Textarea, GetStringKeys } from '../../common/FormControls/FormControls';
import { ProfileType } from '../../../types/types';

type PropsType = {
    profile: ProfileType
};
type ProfileDataFormTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <button onClick={() => {}}>Save</button>
            <div>
                <b>Full name: </b>
                {createField<ProfileDataFormTypeKeys>('Ful Name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job: </b>
                {createField<ProfileDataFormTypeKeys>('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills: </b>
                {createField<ProfileDataFormTypeKeys>('My proffesional skills', 'lookingForAJobDescription', [], Textarea, {type: 'checkbox'})}
            </div>
            <div>
                <b>About me: </b>
                {createField('about Me', 'aboutMe', [], Input)}
            </div>
            <div>
                <b>Socials</b>
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <div className={styles.contact} key={key}>
                            {key}
                            {createField(key, 'contacts.' + key, [], Input)}
                        </div>
                    );
                })}
            </div>
        </form>
    );
}

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm;