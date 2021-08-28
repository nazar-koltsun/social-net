import { instance, APIResponseType, ResultCodeEnum } from './api';

type MeResponceDataType = {
    id: number
    email: string
    login: string    
}

type LoginResponceDataType = {
    userId: number
}

type LoginResponceResultCodeType = {
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
}

export enum ResultCodeForCaptcha {
    CaptchIsRequired = 10
}

export const authApi = {
    me() {
        return instance.get<APIResponseType<MeResponceDataType>>('auth/me').then(resp => resp.data);
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponceDataType, LoginResponceResultCodeType['resultCode']>>('auth/login', { email, password, rememberMe, captcha })
            .then(res => res.data);
    },

    logout() {
        return instance.delete('auth/login');
    },
};