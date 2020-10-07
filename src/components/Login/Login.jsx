import React from 'react';
import { getLoginUserData } from '../Redux/auth-reducer';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        photos: state.auth.photos
    };
};

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="">
                <Field component="input" name="Login" placeholder={'Login'} />
            </div>
            <div className="">
                <Field component="input" name="Password" type="password" placeholder={'Password'} />
            </div>
            <div className="">
                <Field component="input" name="rememberMe" type={'checkbox'} />
                remember me
            </div>
            <button>Login</button>
        </form>
    );
};

const Login = (props) => {
    const onSubmit = (formData) => {
        props.getLoginUserData(formData.Login, formData.Password);
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

export default connect(mapStateToProps, { getLoginUserData })(Login);
