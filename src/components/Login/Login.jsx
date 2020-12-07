import React from 'react';
import styles from '../common/FormControls/FormControls.module.css';
import { login } from '../Redux/auth-reducer';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Input, createField } from '../common/FormControls/FormControls';
import { required } from '../../utils/validators/validators';
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    };
};

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field
                    component={Input}
                    name='email'
                    placeholder={'Email'}
                    validate={[required]}
                />
            {/* {createField(Input, 'email', 'Email', [required])} */}

            <Field
                    component={Input}
                    name='password'
                    type='password'
                    placeholder={'Password'}
                    validate={[required]}
                />
            {/* {createField(Input, 'password', 'Password', [required], {type: 'password'})} */}
            
            <Field component={Input} name='rememberMe' type={'checkbox'} />
            {/* {createField(Input, 'rememberMe', null, null, {type: 'checkbox'}, 'remember me')} */}
            {console.log(error)}
            {error && <p className={styles.formSummaryError}>{error}</p>}

            <button>Login</button>
        </form>
    );
};

const Login = (props) => {
    console.log(props);
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'} />;
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login',
})(LoginForm);

export default connect(mapStateToProps, { login })(Login);
