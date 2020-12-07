import React from 'react';
import styles from './FormControls.module.css';
import { Field } from 'redux-form';

const FormControll = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControll + ' ' + (hasError ? styles.error : '')}>
            {children}
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControll {...props}>
            <textarea {...input} {...restProps} />
        </FormControll>
    ) 
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControll {...props}>
            <input {...input} {...restProps} />
        </FormControll>
    );
};

export const createField = (
    component,
    name,
    placeholder,
    validate,
    props = {}, 
    text=''
) => {
    return (
        <div>
            <Field
                component={component}
                name={name}
                placeholder={placeholder}
                validate={validate}
                {...props}
            />
            {text}
        </div>
    );
};
