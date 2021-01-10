import React from 'react';
import styles from '../common/FormControls/FormControls.module.css';
import { login, getCaptchaUrl } from '../Redux/auth-reducer';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Input, createField } from '../common/FormControls/FormControls';
import { required } from '../../utils/validators/validators';
import { Redirect } from 'react-router-dom';


const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    };
};

const LoginForm = ({ handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField(Input, 'email', 'Email', [required])}
            {createField(Input, 'password', 'Password', [required], {type: 'password'})}
            {createField(Input, 'rememberMe', null, null, {type: 'checkbox'}, 'remember me')}

            {captchaUrl && <img src={captchaUrl} width='100' height='50' />}
            {captchaUrl && createField(Input, 'captcha', 'Symbols from image', [required])}

            {error && <p className={styles.formSummaryError}>{error}</p>}
            <button>Login</button>
        </form>
    );
};

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'} />;
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    );
};

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login',
})(LoginForm);

export default connect(mapStateToProps, { login, getCaptchaUrl })(Login);
