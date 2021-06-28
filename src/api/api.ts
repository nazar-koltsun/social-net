import axios, {AxiosResponse} from 'axios';
import { ProfileType } from '../types/types';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'APi-KEY': '23593d60-c22c-47da-81ff-747dcfc87e16',
    },
});

export const usersApi = {
    getUsers(currentPage = 1, totalUsersCount = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${totalUsersCount}`)
            .then((response) => {
                return response.data;
            });
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`);
    },

    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`);
    },

    getProfile(userId: number) {
        console.warn('Obsolete method. Please use profileApi object');
        return profileApi.getProfile(userId);
    },
};

export const profileApi = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`);
    },

    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`);
    },

    updateStatus(status: string) {
        return instance.put('profile/status', { status: status });
    },

    saveProfile(profile: ProfileType) {
        return instance.put('profile', profile);
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchIsRequired = 10
}

type MeResponceType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type LoginResponceType = {
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>
    data: {
        userId: number
    }
}

export const authApi = {
    me() {
        return instance.get<MeResponceType>('auth/me').then(resp => resp.data);
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponceType>('auth/login', { email, password, rememberMe, captcha })
            .then(res => res.data);
    },

    logout() {
        return instance.delete('auth/login');
    },
};

instance.get<string>('auth/me').then((resp) => resp.data);

export const loginApi = {
    validUserData(email: string, password: any) {
        return instance.post('auth/login', { email, password });
    },
};

export const securityApi = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url');
    },
};
