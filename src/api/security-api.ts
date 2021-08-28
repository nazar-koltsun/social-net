import { instance } from './api';

type GetCaptchaUrlResponceType = {
    url: string
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponceType>('security/get-captcha-url').then(resp => resp.data);
    },
};