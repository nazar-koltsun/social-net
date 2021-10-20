import React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Textarea, createField, GetStringKeys } from '../../../common/FormControls/FormControls';
import classes from '../Myposts.module.css';
import {
    required
} from '../../../../utils/validators/validators';

type PropsType = {};

export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

const AddPostForm: React.FC<InjectedFormProps <AddPostFormValuesType, PropsType> & PropsType> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<AddPostFormValuesTypeKeys>("Enter your message", 'newPostText', [required], Textarea)}
            <button className={classes.addPostBtn}>Add post</button>
        </form>
    );
};

export default reduxForm<AddPostFormValuesType, PropsType>({form: 'profile-add-post'})(AddPostForm);