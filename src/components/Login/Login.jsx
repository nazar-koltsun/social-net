import React from 'react';
import { getLoginUserData } from '../Redux/auth-reducer';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import {Input} from '../common/FormControls/FormControls';
import {required} from '../../utils/validators/validators';

let mapStateToProps = (state) => {
    return {};
};

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field 
                    component={Input} 
                    name="Login" 
                    placeholder={'Login'} 
                    validate={[required]}
                />
            </div>
            <div>
                <Field 
                    component={Input} 
                    name="Password" 
                    type="password" 
                    placeholder={'Password'} 
                    validate={[required]}
                />
            </div>
            <div>
                <Field component={Input} name="rememberMe" type={'checkbox'} />
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
