import React from 'react';
import styles from '../common/FormControls/FormControls.module.css';
import { login } from '../Redux/auth-reducer';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Input, createField, GetStringKeys } from '../common/FormControls/FormControls';
import { required } from '../../utils/validators/validators';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../Redux/redux-store';
import { useDispatch, useSelector } from 'react-redux';

type LoginFormOwnProps = {
    captchaUrl: string | null
}

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", 'email', [required], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type: "password"})}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            { captchaUrl && <img src={captchaUrl} alt='captcha' />}
            { captchaUrl &&  createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {}) }


            {error && <div className={styles.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

export const LoginPage: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const dispatch = useDispatch();

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
    };

    if (isAuth) {
        return <Redirect to={'/profile'} />;
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login',})(LoginForm);

