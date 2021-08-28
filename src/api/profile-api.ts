import { instance } from './api';
import { PhotosType, ProfileType } from '../types/types';
import { APIResponseType } from './api';

type SavePhotoResponceDataType = {
    photos: PhotosType
}

export const profileApi = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(resp => resp.data);
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(resp => resp.data);
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>('profile/status', { status: status }).then(resp => resp.data);
    },

    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType<ProfileType>>('profile', profile).then(resp => resp.data);
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<APIResponseType<SavePhotoResponceDataType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(resp => resp.data);
    },
};