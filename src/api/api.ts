import axios from 'axios';
import { UserType } from '../types/types';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'APi-KEY': '23593d60-c22c-47da-81ff-747dcfc87e16',
    },
});


instance.get<string>('auth/me').then((resp) => resp.data);

export const loginApi = {
    validUserData(email: string, password: any) {
        return instance.post('auth/login', { email, password });
    },
};

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}