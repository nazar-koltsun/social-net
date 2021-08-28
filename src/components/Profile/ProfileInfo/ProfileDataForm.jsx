import React from 'react';
import {reduxForm, SubmissionError} from "redux-form";
import styles from './ProfileInfo.module.css';
import formContStyles from '../../common/FormControls/FormControls.module.css';
import { Input, createField, Textarea } from '../../common/FormControls/FormControls';

const ProfileDataForm = ({handleSubmit, initialValues, error}) => {
    const showError = (error, social) => {
        let regex = new RegExp(`${social}`, 'i');

        for (let i = 0; i < error.length; i++) {
            const result = regex.test(error[i]);
            if (result) {
                return (
                    <p className={formContStyles.formSummaryError}>{error[i]}</p>
                )
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <button onClick={() => {}}>Save</button>
            <div>
                <b>Full name: </b>
                {createField('Ful Name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job: </b>
                {createField('', 'LookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills: </b>
                {createField('My proffesional skills', 'lookingForAJobDescription', [], Textarea, {type: 'checkbox'})}
            </div>
            <div>
                <b>About me: </b>
                {createField('about Me', 'aboutMe', [], Input)}
            </div>
            <div>
                <b>Socials</b>
                {Object.keys(initialValues.contacts).map((social) => {
                    return (
                        <div className={styles.contact} key={social}>
                            {social}
                            {createField(social, 'contacts.' + social, [], Input)}
                            {error && showError(error, social)}
                        </div>
                    );
                })}
            </div>
        </form>
    );
}

const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm;